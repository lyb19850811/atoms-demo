import { Router } from 'express'
import crypto from 'node:crypto'
import db from '../db.js'
import { streamTeamPlan, streamTeamBuild } from '../lib/team.js'

const router = Router()

function sse(res) {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()
  return (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

// 阶段一：Team Leader 规划
router.post('/plan', async (req, res) => {
  const prompt = String(req.body?.prompt || '').trim()
  if (!prompt) return res.status(400).json({ error: '请输入需求描述' })
  if (prompt.length > 2000) return res.status(400).json({ error: '需求描述过长' })
  const send = sse(res)

  let app = null
  if (req.body?.appId) {
    app = db.prepare('SELECT * FROM apps WHERE id = ?').get(req.body.appId)
    if (!app) return res.status(404).json({ error: '应用不存在' })
  } else {
    const id = crypto.randomUUID()
    const now = Date.now()
    db.prepare(
      "INSERT INTO apps (id, user_id, title, prompt, html, mode, status, created_at, updated_at, published) VALUES (?, ?, ?, ?, '', 'team', 'planning', ?, ?, 0)"
    ).run(id, req.body?.userId || null, '规划中…', prompt, now, now)
    app = { id }
  }

  let title = ''
  let plan = ''
  try {
    for await (const ev of streamTeamPlan({ prompt })) {
      if (ev.type === 'done') {
        title = ev.title
        plan = ev.plan
      }
    }
    const now = Date.now()
    db.prepare('UPDATE apps SET title = ?, plan = ?, status = ?, updated_at = ? WHERE id = ?').run(
      title,
      plan,
      'awaiting_confirm',
      now,
      app.id
    )
    send('done_plan', { id: app.id, title, plan })
  } catch (e) {
    console.error('[team/plan]', e.message)
    send('error', { message: e.message })
  }
  res.end()
})

// 阶段二：流水线构建
router.post('/build', async (req, res) => {
  const appId = req.body?.appId
  if (!appId) return res.status(400).json({ error: '缺少 appId' })
  const app = db.prepare('SELECT * FROM apps WHERE id = ?').get(appId)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const send = sse(res)

  const plan = req.body?.plan || app.plan || app.prompt
  const prompt = app.prompt

  try {
    db.prepare("UPDATE apps SET status = 'building', updated_at = ? WHERE id = ?").run(Date.now(), appId)
    let entry = ''
    let files = []
    for await (const ev of streamTeamBuild({ appId, prompt, plan })) {
      if (ev.type === 'step_start') send('step_start', ev)
      else if (ev.type === 'files') send('files', ev)
      else if (ev.type === 'step_done') send('step_done', ev)
      else if (ev.type === 'done') {
        entry = ev.entry
        files = ev.files
      }
    }
    const now = Date.now()
    db.prepare("UPDATE apps SET status = 'done', entry = ?, updated_at = ? WHERE id = ?").run(entry || '', now, appId)
    db.prepare('INSERT INTO messages (app_id, role, content, thinking, created_at) VALUES (?, ?, ?, ?, ?)').run(
      appId,
      'user',
      prompt,
      null,
      now
    )
    db.prepare('INSERT INTO messages (app_id, role, content, thinking, created_at) VALUES (?, ?, ?, ?, ?)').run(
      appId,
      'assistant',
      `团队已完成「${app.title}」`,
      null,
      now
    )
    send('done', { id: appId, title: app.title, entry, files })
  } catch (e) {
    console.error('[team/build]', e.message)
    db.prepare("UPDATE apps SET status = 'idle' WHERE id = ?").run(appId)
    send('error', { message: e.message })
  }
  res.end()
})

export default router
