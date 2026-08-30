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

// 应用数据持久化：key-value 存储，供生成的应用通过 AtomsData 桥读写
const DATA_LIMITS = { keyLen: 64, valueLen: 65536, maxItems: 500 }

function getDataApp(req, res) {
  const app = db.prepare('SELECT id FROM apps WHERE id = ?').get(req.params.id)
  if (!app) res.status(404).json({ error: '应用不存在' })
  return app || null
}

router.get('/:id/data', (req, res) => {
  const app = getDataApp(req, res)
  if (!app) return
  const { key } = req.query
  if (key) {
    const row = db.prepare('SELECT key, value FROM app_data WHERE app_id = ? AND key = ?').get(app.id, String(key))
    return res.json({ data: row ? { [row.key]: row.value } : {} })
  }
  const rows = db.prepare('SELECT key, value FROM app_data WHERE app_id = ?').all(app.id)
  const data = {}
  for (const r of rows) data[r.key] = r.value
  res.json({ data })
})

router.put('/:id/data', (req, res) => {
  const app = getDataApp(req, res)
  if (!app) return
  const key = String(req.body?.key ?? '')
  const value = String(req.body?.value ?? '')
  if (!key) return res.status(400).json({ error: '缺少 key' })
  if (key.length > DATA_LIMITS.keyLen) return res.status(400).json({ error: 'key 过长' })
  if (value.length > DATA_LIMITS.valueLen) return res.status(400).json({ error: 'value 过大' })
  const count = db.prepare('SELECT COUNT(*) AS n FROM app_data WHERE app_id = ?').get(app.id).n
  const exists = db.prepare('SELECT 1 FROM app_data WHERE app_id = ? AND key = ?').get(app.id, key)
  if (!exists && count >= DATA_LIMITS.maxItems) return res.status(400).json({ error: '数据条目已达上限' })
  db.prepare(
    'INSERT INTO app_data (app_id, key, value, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(app_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
  ).run(app.id, key, value, Date.now())
  res.json({ ok: true })
})

router.delete('/:id/data', (req, res) => {
  const app = getDataApp(req, res)
  if (!app) return
  const key = String(req.body?.key ?? req.query?.key ?? '')
  if (!key) return res.status(400).json({ error: '缺少 key' })
  db.prepare('DELETE FROM app_data WHERE app_id = ? AND key = ?').run(app.id, key)
  res.json({ ok: true })
})

// 更新产物 HTML（可视化编辑回写）：单文件模式更新 html 字段，团队模式更新入口文件
router.put('/:id/html', (req, res) => {
  const app = db.prepare('SELECT id, mode, entry FROM apps WHERE id = ?').get(req.params.id)
  if (!app) return res.status(404).json({ error: '应用不存在' })
  const html = String(req.body?.html ?? '')
  if (!html) return res.status(400).json({ error: '缺少 html' })
  if (html.length > 3 * 1024 * 1024) return res.status(400).json({ error: 'HTML 过大' })
  const now = Date.now()
  if (app.mode === 'team' && app.entry) {
    db.prepare('UPDATE files SET content = ?, updated_at = ? WHERE app_id = ? AND path = ?').run(html, now, app.id, app.entry)
  } else {
    db.prepare('UPDATE apps SET html = ?, updated_at = ? WHERE id = ?').run(html, now, app.id)
  }
  res.json({ ok: true })
})

export default router
