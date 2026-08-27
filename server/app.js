import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import usersRouter from './routes/users.js'
import appsRouter from './routes/apps.js'
import generateRouter from './routes/generate.js'
import teamRouter from './routes/team.js'
import adminRouter from './routes/admin.js'
import { rateLimit } from './middleware/rateLimit.js'
import db from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json({ limit: '3mb' }))

// 请求日志：便于排查网关/超时类问题（确认请求是否真正到达服务端）
app.use((req, res, next) => {
  const start = Date.now()
  const pathname = req.path // 入口即捕获，避免 mounted 路由改写 req.url 后读错
  res.on('finish', () => {
    if (pathname.startsWith('/api')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${pathname} -> ${res.statusCode} (${Date.now() - start}ms)`)
    }
  })
  next()
})

app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }))
app.use('/api/users', usersRouter)
app.use('/api/apps', appsRouter)
app.use('/api/generate', rateLimit({ windowMs: 60000, max: 10 }), generateRouter)
app.use('/api/team', rateLimit({ windowMs: 60000, max: 10 }), teamRouter)
app.use('/api/admin', adminRouter)

// 应用独立访问 URL：单文件模式返回 html；团队模式返回入口文件内容
app.get('/p/:id', (req, res) => {
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

// 生产环境：托管前端构建产物（单端口，无 CORS）
const distDir = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distDir, 'index.html'))
    }
    next()
  })
}

app.use((err, req, res, next) => {
  console.error('[error]', err)
  res.status(500).json({ error: '服务器内部错误' })
})

export default app
