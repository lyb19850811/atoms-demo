import { test, mock } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// 独立临时数据库，避免污染生产数据
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'atoms-team-test-'))
process.env.DATA_DIR = tmpDir

// 先取真实导出（供 mock.module 透传），再 mock 掉流式补全
const { getTeamAgent, extractJson } = await import('../server/llm.js')

// 每次 LLM 调用按角色返回可控响应，并记录入参用于断言上下文传播
const calls = []
const RESPONSES = {
  产品经理智能体: { summary: 'PM摘要', files: [{ path: 'docs/requirements.md', content: '# PRD' }] },
  架构师智能体: { summary: '架构摘要', files: [{ path: 'docs/architecture.md', content: '# 架构' }] },
  设计师智能体: { summary: '设计摘要', files: [{ path: 'docs/design.md', content: '# 设计' }] },
  工程师智能体: { summary: '工程摘要', entry: 'frontend/index.html', files: [{ path: 'frontend/index.html', content: '<h1>hi</h1>' }] }
}
async function* fakeStream({ system, user }) {
  calls.push({ system, user })
  const key = Object.keys(RESPONSES).find((k) => system.includes(k)) || '工程师智能体'
  yield { type: 'done', content: JSON.stringify(RESPONSES[key]) }
}

mock.module('../server/llm.js', { namedExports: { getTeamAgent, extractJson, streamCompletion: fakeStream } })

const { streamTeamBuild } = await import('../server/lib/team.js')
const { default: db } = await import('../server/db.js')

test('并行流水线：架构师与设计师并行，工程师串行合并', async () => {
  const events = []
  for await (const ev of streamTeamBuild({ appId: 'test-app', prompt: '做一个五子棋', plan: '开发计划' })) {
    events.push(ev)
  }

  const idx = (type, id) => events.findIndex((e) => e.type === type && e.id === id)
  const starts = events.filter((e) => e.type === 'step_start')

  // 四个步骤按层级顺序启动
  assert.deepEqual(starts.map((e) => e.id), ['pm', 'architect', 'designer', 'engineer'])

  // 并行：designer 在 architect 完成之前已启动（两分支重叠）
  const archStart = idx('step_start', 'architect')
  const desStart = idx('step_start', 'designer')
  const archDone = idx('step_done', 'architect')
  const desDone = idx('step_done', 'designer')
  assert.ok(archStart < desStart && desStart < archDone, '架构师与设计师应并行启动')

  // 依赖：engineer 在架构师与设计师都完成后才启动
  const engStart = idx('step_start', 'engineer')
  assert.ok(engStart > archDone && engStart > desDone, '工程师应等待两个并行分支完成')

  // done 携带 entry 与全部产物文件
  const done = events.find((e) => e.type === 'done')
  assert.equal(done.entry, 'frontend/index.html')
  assert.equal(done.files.length, 4)

  const engCall = calls.find((c) => c.system.includes('工程师智能体'))
  assert.ok(engCall.user.includes('架构摘要'), '工程师应拿到架构师摘要')
  assert.ok(engCall.user.includes('设计摘要'), '工程师应拿到设计师摘要')

  // 数据库：steps 的 seq 等于层级（pm=1，architect/designer=2，engineer=3）
  const rows = db.prepare('SELECT seq, agent_id FROM steps WHERE app_id = ? ORDER BY id').all('test-app')
  assert.deepEqual(
    rows.map((r) => [r.seq, r.agent_id]),
    [[1, 'pm'], [2, 'architect'], [2, 'designer'], [3, 'engineer']]
  )
})
