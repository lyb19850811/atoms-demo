import { Router } from 'express'
import crypto from 'node:crypto'
import db from '../db.js'
import { streamGenerate, validateHtml, repairHtml } from '../llm.js'

const router = Router()

// 核心闭环：生成 / 修改应用（SSE 流式，实时推送思考过程与结果）
// body: { appId?, prompt, userId? }  有 appId 表示基于已有应用迭代，否则新建
router.post('/', async (req, res) => {
  const prompt = String(req.body?.prompt || '').trim()
  if (!prompt) return res.status(400).json({ error: '请输入需求描述' })
  if (prompt.length > 2000) return res.status(400).json({ error: '需求描述过长' })

  let app = null
  if (req.body?.appId) {
    app = db.prepare('SELECT * FROM apps WHERE id = ?').get(req.body.appId)
    if (!app) return res.status(404).json({ error: '应用不存在' })
  }

  // SSE 响应头
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()

  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)

  let title = ''
  let html = ''
  try {
    for await (const chunk of streamGenerate({ prompt, currentHtml: app?.html || null, agent: req.body?.agent, plan: req.body?.plan })) {
      if (chunk.type === 'writing') send('writing', { text: chunk.text })
      else if (chunk.type === 'done') {
        title = chunk.title
        html = chunk.html
      }
    }

    // 自动验证 + 修复闭环：发现缺陷时自动喂回模型修复（最多 2 轮）
    let issues = validateHtml(html)
    let fixed = false
    for (let round = 0; issues.length > 0 && round < 2; round++) {
      send('verifying', { issues })
      try {
        const repaired = await repairHtml(html, issues)
        if (repaired && repaired !== html) {
          html = repaired
          fixed = true
        }
        issues = validateHtml(html)
      } catch (e) {
        console.error('[generate] repair failed:', e.message)
        break
      }
    }
    if (fixed) send('verified', { issues })
    // 持久化（含单文件模式的开发计划）
    const now = Date.now()
    const plan = req.body?.plan || null
    let id = app?.id
    if (app) {
      db.prepare('UPDATE apps SET title = ?, html = ?, plan = ?, updated_at = ? WHERE id = ?').run(title, html, plan, now, id)
    } else {
      id = crypto.randomUUID()
      db.prepare(
        'INSERT INTO apps (id, user_id, title, prompt, html, plan, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(id, req.body?.userId || null, title, prompt, html, plan, now, now)
    }

    // 保存对话：用户需求 + 助手结果（含模型思考过程）
    const insertMsg = db.prepare(
      'INSERT INTO messages (app_id, role, content, thinking, created_at) VALUES (?, ?, ?, ?, ?)'
    )
    insertMsg.run(id, 'user', prompt, null, now)
    insertMsg.run(id, 'assistant', `已生成「${title}」`, null, now)

    send('done', { id, title, html, plan })
  } catch (e) {
    console.error('[generate]', e.message)
    send('error', { message: e.message || '生成失败，请稍后重试' })
  }
  res.end()
})

export default router
