// 简单内存限流（滑动窗口）：单进程适用，无需外部依赖
// 注意：每个 rateLimit() 调用创建独立的 bucket，避免不同路由互相挤占额度
export function rateLimit({ windowMs = 60000, max = 10, message = '请求过于频繁，请稍后再试' } = {}) {
  const buckets = new Map() // ip -> { count, resetAt }（本实例私有）
  return (req, res, next) => {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown'
    const now = Date.now()
    let b = buckets.get(ip)
    if (!b || now > b.resetAt) {
      b = { count: 0, resetAt: now + windowMs }
      buckets.set(ip, b)
    }
    b.count += 1
    if (b.count > max) {
      return res.status(429).json({ error: message })
    }
    next()
  }
}
