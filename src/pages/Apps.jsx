import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import { getCurrentUser } from '../user.js'

function relTime(ts) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return '刚刚'
  if (m < 60) return `${m} 分钟前`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} 小时前`
  return `${Math.floor(h / 24)} 天前`
}

export default function Apps() {
  const nav = useNavigate()
  const user = getCurrentUser()
  const [apps, setApps] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      nav('/register')
      return
    }
    api.listApps(user.id).then(setApps).catch((e) => setError(e.message))
  }, [user, nav])

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h2>我的应用</h2>
          <button className="btn btn-primary" onClick={() => nav('/workspace')}>＋ 新建应用</button>
        </div>
        {error && <div className="error-banner">{error}</div>}
        {apps.length === 0 && !error ? (
          <div className="preview-empty" style={{ margin: '40px auto' }}>
            <div className="big">🗂️</div>
            <p>还没有应用，去工作台创建第一个吧！</p>
          </div>
        ) : (
          <div className="apps-grid">
            {apps.map((a) => (
              <div className="app-card" key={a.id}>
                <h3>{a.title}{a.published ? <span className="badge">已发布</span> : null}</h3>
                <p className="desc">{a.prompt}</p>
                <div className="meta">更新于 {relTime(a.updated_at)}</div>
                <div className="actions">
                  <button className="btn btn-sm btn-primary" onClick={() => nav(`/app/${a.id}`)}>查看</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => nav(`/workspace?edit=${a.id}`)}>继续编辑</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
