async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `请求失败(${res.status})`)
  return data
}

// 流式请求：解析后端 SSE（event: xxx / data: {...}），按事件名分发到 handlers
async function streamRequest(path, payload, handlers) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `请求失败(${res.status})`)
  }
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split('\n\n')
    buffer = parts.pop()
    for (const part of parts) {
      let event = 'message'
      let dataStr = ''
      for (const line of part.split('\n')) {
        const t = line.trim()
        if (t.startsWith('event:')) event = t.slice(6).trim()
        else if (t.startsWith('data:')) dataStr += t.slice(5).trim()
      }
      if (!dataStr) continue
      let data
      try {
        data = JSON.parse(dataStr)
      } catch {
        continue
      }
      handlers[event]?.(data)
    }
  }
}

export const api = {
  register: (nickname) => request('/api/users', { method: 'POST', body: { nickname } }),
  generateStream: (payload, handlers) => streamRequest('/api/generate', payload, handlers),
  listApps: (userId) => request(`/api/apps?userId=${encodeURIComponent(userId)}`),
  getApp: (id) => request(`/api/apps/${id}`),
  publish: (id, published) => request(`/api/apps/${id}/publish`, { method: 'POST', body: { published } }),
  adminUsers: () => request('/api/admin/users'),
  adminApps: () => request('/api/admin/apps'),
  deleteUser: (id) => request(`/api/admin/users/${id}`, { method: 'DELETE' }),
  deleteApp: (id) => request(`/api/admin/apps/${id}`, { method: 'DELETE' })
}

// 分享链接：HashRouter 下用 #/app/:id，任何环境（IP:端口）都可用
export function shareUrl(id) {
  return `${location.origin}/#/app/${id}`
}

// 发布链接：独立访问地址，直接加载生成应用
export function publishUrl(id) {
  return `${location.origin}/p/${id}`
}

// 生成应用的原始 HTML 地址（供 iframe 直接加载）
export function appHtmlUrl(id) {
  return `${location.origin}/api/apps/${id}/html`
}
