import { Router } from 'express'
import { streamPlan } from '../llm.js'

const router = Router()

// 单文件模式：规划（生成开发计划，供用户确认/编辑）
router.post('/', async (req, res) => {
  const prompt = String(req.body?.prompt || '').trim()
  if (!prompt) return res.status(400).json({ error: '请输入需求描述' })
  if (prompt.length > 2000) return res.status(400).json({ error: '需求描述过长' })

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)

  let title = ''
  let plan = ''
  try {
    for await (const ev of streamPlan({ prompt })) {
      if (ev.type === 'thinking') send('thinking', { text: ev.text })
      else if (ev.type === 'done') {
        title = ev.title
        plan = ev.plan
      }
    }
    send('done_plan', { title, plan })
  } catch (e) {
    console.error('[plan]', e.message)
    send('error', { message: e.message })
  }
  res.end()
})

export default router
