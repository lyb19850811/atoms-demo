import { Router } from 'express'
import db from '../db.js'

const router = Router()

// 管理后台鉴权：配置 ADMIN_TOKEN 后，请求头需带 X-Admin-Token
router.use((req, res, next) => {
  const token = process.env.ADMIN_TOKEN
  if (!token) return next() // 未配置则开放（开发环境）
  if (req.headers['x-admin-token'] === token) return next()
  return res.status(401).json({ error: '未授权：访问令牌错误' })
})

// 用户列表（含应用数）
router.get('/users', (req, res) => {
  const rows = db
    .prepare(
      `SELECT u.id, u.nickname, u.created_at,
        (SELECT COUNT(*) FROM apps a WHERE a.user_id = u.id) AS app_count
       FROM users u ORDER BY u.created_at DESC`
    )
    .all()
  res.json(rows)
})

// 应用列表（含创建者昵称与 HTML 大小）
router.get('/apps', (req, res) => {
  const rows = db
    .prepare(
      `SELECT a.id, a.title, a.prompt, a.published, a.created_at, a.updated_at,
        LENGTH(a.html) AS html_size, u.nickname AS owner
       FROM apps a LEFT JOIN users u ON a.user_id = u.id
       ORDER BY a.updated_at DESC`
    )
    .all()
  res.json(rows)
})

// 删除用户（级联删除其应用与消息）
router.delete('/users/:id', (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id)
  if (!user) return res.status(404).json({ error: '用户不存在' })
  db.prepare('DELETE FROM messages WHERE app_id IN (SELECT id FROM apps WHERE user_id = ?)').run(user.id)
  db.prepare('DELETE FROM apps WHERE user_id = ?').run(user.id)
  db.prepare('DELETE FROM users WHERE id = ?').run(user.id)
  res.json({ ok: true })
})

// 删除应用（级联删除其消息）
router.delete('/apps/:id', (req, res) => {
  const app = db.prepare('SELECT id FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  db.prepare('DELETE FROM messages WHERE app_id = ?').run(app.id)
  db.prepare('DELETE FROM apps WHERE id = ?').run(app.id)
  res.json({ ok: true })
})

export default router
