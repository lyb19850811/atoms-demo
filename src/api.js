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

export const api = {
  register: (nickname) => request('/api/users', { method: 'POST', body: { nickname } }),
  generate: (payload) => request('/api/generate', { method: 'POST', body: payload }),
  listApps: (userId) => request(`/api/apps?userId=${encodeURIComponent(userId)}`),
  getApp: (id) => request(`/api/apps/${id}`)
}

// 分享链接：HashRouter 下用 #/app/:id，任何环境（IP:端口）都可用
export function shareUrl(id) {
  return `${location.origin}/#/app/${id}`
}

// 生成应用的原始 HTML 地址（供 iframe 直接加载）
export function appHtmlUrl(id) {
  return `${location.origin}/api/apps/${id}/html`
}
