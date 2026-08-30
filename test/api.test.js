import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

// 使用独立临时数据库，避免污染生产数据
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'atoms-test-'))
process.env.DATA_DIR = tmpDir

const { default: app } = await import('../server/app.js')
const { default: db } = await import('../server/db.js')

let server
let base

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      base = `http://127.0.0.1:${server.address().port}`
      resolve()
    })
  })
})

after(async () => {
  await new Promise((resolve) => server.close(resolve))
  fs.rmSync(tmpDir, { recursive: true, force: true })
})

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})

test('健康检查', async () => {
  const r = await fetch(`${base}/api/health`)
  assert.equal(r.status, 200)
  assert.equal((await r.json()).ok, true)
})

test('注册：新昵称创建账号', async () => {
  const r = await fetch(`${base}/api/users`, json('POST', { nickname: '张三' }))
  assert.equal(r.status, 200)
  const d = await r.json()
  assert.equal(d.nickname, '张三')
  assert.equal(d.login, false)
  assert.ok(d.id)
})

test('登录：同名昵称复用同一账号', async () => {
  const r1 = await (await fetch(`${base}/api/users`, json('POST', { nickname: '李四' }))).json()
  const r2 = await (await fetch(`${base}/api/users`, json('POST', { nickname: '李四' }))).json()
  assert.equal(r1.id, r2.id)
  assert.equal(r2.login, true)
})

test('生成接口：空需求返回 400（不触发模型）', async () => {
  const r = await fetch(`${base}/api/generate`, json('POST', { prompt: '   ' }))
  assert.equal(r.status, 400)
})

test('应用：列表 / 详情 / HTML / 独立链接 / 发布', async () => {
  const userId = randomUUID()
  const appId = randomUUID()
  const now = Date.now()
  db.prepare('INSERT INTO users (id, nickname, created_at) VALUES (?, ?, ?)').run(userId, '测试用户', now)
  db.prepare(
    'INSERT INTO apps (id, user_id, title, prompt, html, created_at, updated_at, published) VALUES (?, ?, ?, ?, ?, ?, ?, 0)'
  ).run(appId, userId, '测试应用', '做个测试', '<h1>hi</h1>', now, now)

  const list = await (await fetch(`${base}/api/apps?userId=${userId}`)).json()
  assert.equal(list.length, 1)
  assert.equal(list[0].title, '测试应用')

  const detail = await (await fetch(`${base}/api/apps/${appId}`)).json()
  assert.equal(detail.title, '测试应用')

  const htmlRes = await fetch(`${base}/api/apps/${appId}/html`)
  assert.equal(htmlRes.status, 200)
  assert.equal(await htmlRes.text(), '<h1>hi</h1>')

  const pRes = await fetch(`${base}/p/${appId}`)
  assert.equal(pRes.status, 200)

  const pub = await (await fetch(`${base}/api/apps/${appId}/publish`, json('POST', { published: true }))).json()
  assert.equal(pub.published, true)
  assert.equal(pub.url, `/p/${appId}`)
})

test('对话思考过程可保存与读取', async () => {
  const userId = randomUUID()
  const appId = randomUUID()
  const now = Date.now()
  db.prepare('INSERT INTO users (id, nickname, created_at) VALUES (?, ?, ?)').run(userId, '思考测试', now)
  db.prepare('INSERT INTO apps (id, user_id, title, prompt, html, created_at, updated_at, published) VALUES (?, ?, ?, ?, ?, ?, ?, 0)').run(appId, userId, 't', 'p', '<h1>x</h1>', now, now)
  db.prepare('INSERT INTO messages (app_id, role, content, thinking, created_at) VALUES (?, ?, ?, ?, ?)').run(appId, 'assistant', '已生成', '这是思考过程', now)

  const detail = await (await fetch(`${base}/api/apps/${appId}`)).json()
  const msg = detail.messages.find((m) => m.role === 'assistant')
  assert.equal(msg.thinking, '这是思考过程')
})

test('管理后台：用户/应用列表 + 级联删除用户', async () => {
  const users = await (await fetch(`${base}/api/admin/users`)).json()
  assert.ok(users.length >= 1)
  const apps = await (await fetch(`${base}/api/admin/apps`)).json()
  assert.ok(apps.length >= 1)

  const target = users.find((u) => u.nickname === '测试用户')
  assert.ok(target)
  const del = await fetch(`${base}/api/admin/users/${target.id}`, { method: 'DELETE' })
  assert.equal(del.status, 200)

  // 删除后其应用也应级联消失
  const afterApps = await (await fetch(`${base}/api/admin/apps`)).json()
  assert.ok(!afterApps.some((a) => a.owner === '测试用户'))
})

test('应用数据持久化：写入 / 读取 / 覆盖 / 删除', async () => {
  const appId = randomUUID()
  const now = Date.now()
  db.prepare(
    'INSERT INTO apps (id, user_id, title, prompt, html, created_at, updated_at, published) VALUES (?, ?, ?, ?, ?, ?, ?, 0)'
  ).run(appId, null, '数据应用', '做个数据应用', '<h1>hi</h1>', now, now)

  // 写入
  const put = await fetch(`${base}/api/apps/${appId}/data`, json('PUT', { key: 'todos', value: '["a","b"]' }))
  assert.equal(put.status, 200)

  // 读取单个
  const get1 = await (await fetch(`${base}/api/apps/${appId}/data?key=todos`)).json()
  assert.deepEqual(get1.data, { todos: '["a","b"]' })

  // 覆盖
  await fetch(`${base}/api/apps/${appId}/data`, json('PUT', { key: 'todos', value: '["a","b","c"]' }))
  const get2 = await (await fetch(`${base}/api/apps/${appId}/data?key=todos`)).json()
  assert.deepEqual(get2.data, { todos: '["a","b","c"]' })

  // 读取全部
  await fetch(`${base}/api/apps/${appId}/data`, json('PUT', { key: 'note', value: 'hello' }))
  const all = await (await fetch(`${base}/api/apps/${appId}/data`)).json()
  assert.deepEqual(all.data, { todos: '["a","b","c"]', note: 'hello' })

  // 删除
  await fetch(`${base}/api/apps/${appId}/data`, json('DELETE', { key: 'note' }))
  const after = await (await fetch(`${base}/api/apps/${appId}/data`)).json()
  assert.deepEqual(after.data, { todos: '["a","b","c"]' })

  // 不存在的应用返回 404
  const nf = await fetch(`${base}/api/apps/${randomUUID()}/data`, json('PUT', { key: 'x', value: 'y' }))
  assert.equal(nf.status, 404)
})
