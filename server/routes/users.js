import { Router } from 'express'
import crypto from 'node:crypto'
import db from '../db.js'

const router = Router()

// 轻量「注册 / 登录」：昵称即身份，同名复用已有账号（登录），否则新建（注册）
router.post('/', (req, res) => {
  const nickname = String(req.body?.nickname || '').trim().slice(0, 30) || '匿名创造者'

  // 同名即登录：复用最早创建的同名账号，保证数据归属稳定
  const existing = db
    .prepare('SELECT id, nickname FROM users WHERE nickname = ? ORDER BY created_at ASC LIMIT 1')
    .get(nickname)
  if (existing) {
    return res.json({ id: existing.id, nickname: existing.nickname, login: true })
  }

  const id = crypto.randomUUID()
  db.prepare('INSERT INTO users (id, nickname, created_at) VALUES (?, ?, ?)').run(id, nickname, Date.now())
  res.json({ id, nickname, login: false })
})

export default router
