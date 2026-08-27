import { Router } from 'express'
import db from '../db.js'
import { buildZip } from '../lib/zip.js'

const router = Router()

// 某用户的应用列表
router.get('/', (req, res) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: '缺少 userId' })
  const rows = db
    .prepare('SELECT id, title, prompt, mode, published, created_at, updated_at FROM apps WHERE user_id = ? ORDER BY updated_at DESC')
    .all(userId)
  res.json(rows)
})

// 单个应用详情（含对话历史 + 项目文件）
router.get('/:id', (req, res) => {
  const app = db.prepare('SELECT * FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const messages = db
    .prepare('SELECT role, content, thinking, created_at FROM messages WHERE app_id = ? ORDER BY id ASC')
    .all(app.id)
  const files = db.prepare('SELECT path, content, kind FROM files WHERE app_id = ? ORDER BY path').all(app.id)
  res.json({ ...app, messages, files })
})

// 生成应用的原始 HTML（供分享页 iframe 直接加载）：团队模式返回入口文件
router.get('/:id/html', (req, res) => {
  const app = db.prepare('SELECT id, mode, entry, html FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).send('应用不存在')
  let html = app.html
  if (app.mode === 'team' && app.entry) {
    const f = db.prepare('SELECT content FROM files WHERE app_id = ? AND path = ?').get(app.id, app.entry)
    if (f) html = f.content
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.send(html)
})

// 项目文件列表（团队模式产物）
router.get('/:id/files', (req, res) => {
  const app = db.prepare('SELECT id, mode, entry FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const files = db.prepare('SELECT path, content, kind FROM files WHERE app_id = ? ORDER BY path').all(app.id)
  res.json({ mode: app.mode, entry: app.entry, files })
})

// 下载/导出：单文件返回 HTML，团队项目返回 ZIP
router.get('/:id/download', (req, res) => {
  const app = db.prepare('SELECT * FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const rawName = (app.title || 'app').slice(0, 40) || 'app'
  const asciiName = rawName.replace(/[^\x20-\x7e]/g, '_').replace(/[\\/]/g, '_') || 'app'
  const contentDisposition = (ext) =>
    `attachment; filename="${asciiName}.${ext}"; filename*=UTF-8''${encodeURIComponent(rawName + '.' + ext)}`

  if (app.mode === 'team') {
    const files = db.prepare('SELECT path, content FROM files WHERE app_id = ? ORDER BY path').all(app.id)
    if (files.length === 0) return res.status(404).json({ error: '暂无项目文件' })
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', contentDisposition('zip'))
    return res.send(buildZip(files))
  }

  let html = app.html
  if (app.entry) {
    const f = db.prepare('SELECT content FROM files WHERE app_id = ? AND path = ?').get(app.id, app.entry)
    if (f) html = f.content
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Content-Disposition', contentDisposition('html'))
  res.send(html)
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
