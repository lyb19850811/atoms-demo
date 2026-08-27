import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import usersRouter from './routes/users.js'
import appsRouter from './routes/apps.js'
import generateRouter from './routes/generate.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json({ limit: '3mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }))
app.use('/api/users', usersRouter)
app.use('/api/apps', appsRouter)
app.use('/api/generate', generateRouter)

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

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Mini Atoms] server listening on :${PORT}`)
})
