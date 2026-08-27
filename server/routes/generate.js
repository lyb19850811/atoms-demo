import { Router } from 'express'
import crypto from 'node:crypto'
import db from '../db.js'
import { generateApp } from '../llm.js'

const router = Router()

// 核心闭环：生成 / 修改应用
// body: { appId?, prompt, userId? }  有 appId 表示基于已有应用迭代，否则新建
router.post('/', async (req, res) => {
  try {
    const prompt = String(req.body?.prompt || '').trim()
    if (!prompt) return res.status(400).json({ error: '请输入需求描述' })
    if (prompt.length > 2000) return res.status(400).json({ error: '需求描述过长' })

    let app = null
    if (req.body?.appId) {
      app = db.prepare('SELECT * FROM apps WHERE id = ?').get(req.body.appId)
      if (!app) return res.status(404).json({ error: '应用不存在' })
    }

    const { title, html } = await generateApp({ prompt, currentHtml: app?.html || null })
    const now = Date.now()
    let id = app?.id

    if (app) {
      db.prepare('UPDATE apps SET title = ?, html = ?, updated_at = ? WHERE id = ?').run(title, html, now, id)
    } else {
      id = crypto.randomUUID()
      db.prepare(
        'INSERT INTO apps (id, user_id, title, prompt, html, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(id, req.body?.userId || null, title, prompt, html, now, now)
    }

    const insertMsg = db.prepare('INSERT INTO messages (app_id, role, content, created_at) VALUES (?, ?, ?, ?)')
    insertMsg.run(id, 'user', prompt, now)
    insertMsg.run(id, 'assistant', `已生成「${title}」`, now)

    res.json({ id, title, html })
  } catch (e) {
    console.error('[generate]', e.message)
    res.status(500).json({ error: e.message || '生成失败，请稍后重试' })
  }
})

export default router
