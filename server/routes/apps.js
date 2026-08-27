import { Router } from 'express'
import db from '../db.js'

const router = Router()

// 某用户的应用列表
router.get('/', (req, res) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: '缺少 userId' })
  const rows = db
    .prepare('SELECT id, title, prompt, published, created_at, updated_at FROM apps WHERE user_id = ? ORDER BY updated_at DESC')
    .all(userId)
  res.json(rows)
})

// 单个应用详情（含对话历史）
router.get('/:id', (req, res) => {
  const app = db.prepare('SELECT * FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const messages = db
    .prepare('SELECT role, content, thinking, created_at FROM messages WHERE app_id = ? ORDER BY id ASC')
    .all(app.id)
  res.json({ ...app, messages })
})

// 生成应用的原始 HTML（供分享页 iframe 直接加载）
router.get('/:id/html', (req, res) => {
  const app = db.prepare('SELECT html FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).send('应用不存在')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.send(app.html)
})

// 发布 / 取消发布：切换应用在 /p/:id 的独立访问状态
router.post('/:id/publish', (req, res) => {
  const app = db.prepare('SELECT id FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const published = req.body?.published !== false ? 1 : 0
  db.prepare('UPDATE apps SET published = ? WHERE id = ?').run(published, app.id)
  res.json({ published: published === 1, url: `/p/${app.id}` })
})

export default router
