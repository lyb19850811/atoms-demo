import { Router } from 'express'
import crypto from 'node:crypto'
import db from '../db.js'

const router = Router()

// 轻量「注册」：输入昵称即创建用户（演示流程，不做密码体系）
router.post('/', (req, res) => {
  const nickname = String(req.body?.nickname || '').trim().slice(0, 30) || '匿名创造者'
  const id = crypto.randomUUID()
  db.prepare('INSERT INTO users (id, nickname, created_at) VALUES (?, ?, ?)').run(id, nickname, Date.now())
  res.json({ id, nickname })
})

export default router
