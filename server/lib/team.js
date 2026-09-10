import db from '../db.js'
import { streamCompletion, getTeamAgent, extractJson } from '../llm.js'

// 固定并行流水线：层级数组，层内智能体并行执行、层间串行
// 拓扑：pm（PRD）→ [architect（架构）∥ designer（UI 设计）] → engineer（合并生成代码）
const TEAM_PIPELINE = [
  [{ id: 'pm', agent: 'pm', task: '整理产品需求文档' }],
  [
    { id: 'architect', agent: 'architect', task: '输出技术架构方案' },
    { id: 'designer', agent: 'designer', task: '输出 UI 设计规范' }
  ],
  [{ id: 'engineer', agent: 'engineer', task: '生成项目代码' }]
]

function kindOf(path) {
  if (path.startsWith('frontend/')) return 'frontend'
  if (path.startsWith('backend/')) return 'backend'
  if (path.startsWith('docs/')) return 'doc'
  return 'config'
}

// 单次智能体调用：转发 thinking，累积 content，结束产出 turn_done{content}
async function* complete(system, user) {
  let content = ''
  for await (const c of streamCompletion({ system, user })) {
    if (c.type === 'content') content += c.text
    else if (c.type === 'done') content = c.content
  }
  yield { type: 'turn_done', content }
}

// 阶段一：Team Leader 规划（产出计划）
export async function* streamTeamPlan({ prompt }) {
  const leader = getTeamAgent('leader')
  let content = ''
  for await (const ev of complete(leader.system, `需求：${prompt}`)) {
    if (ev.type === 'turn_done') content = ev.content
  }
  const obj = extractJson(content) || {}
  yield { type: 'done', title: obj.title || '我的项目', plan: obj.plan || content }
}

// 阶段二：并行流水线执行（层内并发、层间串行），写 files/steps
export async function* streamTeamBuild({ appId, prompt, plan }) {
  const summaries = {} // stepId -> summary（累计已完成的各步摘要）
  const allFiles = []
  let entry = ''

  // 单步执行：以上游摘要为上下文调用对应智能体，写 files/steps
  async function runStep({ step, level }) {
    const def = getTeamAgent(step.agent)
    const upstream = Object.values(summaries).filter(Boolean)
    let user = `需求：${prompt}\n团队计划：\n${plan}`
    if (upstream.length) user += `\n\n上游产出摘要：\n${upstream.join('\n')}`

    let content = ''
    for await (const ev of complete(def.system, user)) {
      if (ev.type === 'turn_done') content = ev.content
    }

    const obj = extractJson(content) || {}
    const summary = obj.summary || ''
    const files = Array.isArray(obj.files) ? obj.files.filter((f) => f && f.path && f.content) : []

    const now = Date.now()
    const insertFile = db.prepare(
      'INSERT OR REPLACE INTO files (app_id, path, content, kind, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    for (const f of files) {
      insertFile.run(appId, f.path, f.content, kindOf(f.path), now, now)
      allFiles.push({ path: f.path, content: f.content })
    }
    db.prepare(
      'INSERT INTO steps (app_id, seq, agent_id, agent_name, task, status, output, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(appId, level + 1, step.agent, def.name, step.task, 'done', summary, now, now)

    return { id: step.id, agentId: step.agent, summary, files, entry: obj.entry || '' }
  }

  for (let level = 0; level < TEAM_PIPELINE.length; level++) {
    const steps = TEAM_PIPELINE[level]
    for (const step of steps) {
      const def = getTeamAgent(step.agent)
      yield { type: 'step_start', id: step.id, level, agentId: step.agent, agentName: def.name, task: step.task }
    }

    // 同一层内的智能体并行执行
    const results = await Promise.all(steps.map((step) => runStep({ step, level })))

    for (const r of results) {
      if (r.files.length) yield { type: 'files', files: r.files }
      yield { type: 'step_done', id: r.id, level, agentId: r.agentId, summary: r.summary }
      summaries[r.id] = r.summary
      if (r.entry) entry = r.entry
    }
  }

  yield { type: 'done', entry, files: allFiles }
}
