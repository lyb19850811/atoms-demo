import 'dotenv/config'
import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import app from './app.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Mini Atoms] HTTP server listening on :${PORT}`)
})

// HTTPS 监听（自签名证书）：为语音输入提供 secure context（麦克风权限要求）
const HTTPS_PORT = Number(process.env.HTTPS_PORT) || 8443
const keyPath = process.env.HTTPS_KEY || path.join(__dirname, 'key.pem')
const certPath = process.env.HTTPS_CERT || path.join(__dirname, 'cert.pem')
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  https
    .createServer({ key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }, app)
    .listen(HTTPS_PORT, '0.0.0.0', () => {
      console.log(`[Mini Atoms] HTTPS server listening on :${HTTPS_PORT}`)
    })
} else {
  console.log('[Mini Atoms] HTTPS 未启用：缺少证书文件（server/key.pem 与 server/cert.pem）')
}
