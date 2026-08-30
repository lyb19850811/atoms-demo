import db from '../db.js'
import { streamCompletion, getTeamAgent, extractJson } from '../llm.js'

const PIPELINE = [
  { agent: 'pm', task: '整理产品需求文档' },
  { agent: 'architect', task: '输出技术架构方案' },
  { agent: 'engineer', task: '生成项目代码' }
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

// 阶段二：三阶段流水线执行（pm → architect → engineer），写 files/steps
export async function* streamTeamBuild({ appId, prompt, plan }) {
  const context = { pmSummary: '', archSummary: '' }
  let seq = 1
  let entry = ''
  const allFiles = []

  for (const step of PIPELINE) {
    const def = getTeamAgent(step.agent)
    yield { type: 'step_start', seq, agentId: step.agent, agentName: def.name, task: step.task }

    let user = `需求：${prompt}\n团队计划：\n${plan}`
    if (step.agent !== 'pm' && context.pmSummary) user += `\n\n产品经理 PRD：\n${context.pmSummary}`
    if (step.agent === 'engineer' && context.archSummary) user += `\n\n架构师方案：\n${context.archSummary}`

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
    ).run(appId, seq, step.agent, def.name, step.task, 'done', summary, now, now)

    if (step.agent === 'pm') context.pmSummary = summary
    if (step.agent === 'architect') context.archSummary = summary
    if (step.agent === 'engineer' && obj.entry) entry = obj.entry

    yield { type: 'files', files }
    yield { type: 'step_done', seq, agentId: step.agent, summary }
    seq++
  }

  yield { type: 'done', entry, files: allFiles }
}
