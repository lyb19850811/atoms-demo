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
  // 生成耗时较长（约 10-30s），网关可能偶发 5xx，自动重试一次
  generate: async (payload) => {
    for (let attempt = 0; ; attempt++) {
      try {
        return await request('/api/generate', { method: 'POST', body: payload })
      } catch (e) {
        const msg = e?.message || ''
        if (attempt === 0 && /502|503|504|500|fetch|network|Failed to fetch/i.test(msg)) {
          await new Promise((r) => setTimeout(r, 1500))
          continue
        }
        throw e
      }
    }
  },
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
