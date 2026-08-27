import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, publishUrl } from '../api.js'

function fmt(ts) {
  return new Date(ts).toLocaleString('zh-CN', { hour12: false })
}

export default function Admin() {
  const [users, setUsers] = useState([])
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const [u, a] = await Promise.all([api.adminUsers(), api.adminApps()])
      setUsers(u)
      setApps(a)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function removeUser(u) {
    if (!window.confirm(`确定删除用户「${u.nickname}」及其全部 ${u.app_count} 个应用吗？此操作不可恢复。`)) return
    try {
      await api.deleteUser(u.id)
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  async function removeApp(a) {
    if (!window.confirm(`确定删除应用「${a.title}」吗？此操作不可恢复。`)) return
    try {
      await api.deleteApp(a.id)
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  const publishedCount = apps.filter((a) => a.published).length

  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <h2>🛠 管理后台</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" onClick={load} disabled={loading}>↻ 刷新</button>
            <Link to="/" className="btn btn-ghost">← 返回首页</Link>
          </div>
        </div>
        {error && <div className="error-banner">{error}</div>}

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-num">{users.length}</div>
            <div className="stat-label">用户数</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{apps.length}</div>
            <div className="stat-label">应用总数</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{publishedCount}</div>
            <div className="stat-label">已发布</div>
          </div>
        </div>

        <h3 className="admin-sec">👥 用户管理（{users.length}）</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>昵称</th><th>用户 ID</th><th>应用数</th><th>注册时间</th><th>操作</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.nickname}</td>
                  <td className="mono">{u.id}</td>
                  <td>{u.app_count}</td>
                  <td>{fmt(u.created_at)}</td>
                  <td><button className="btn btn-sm btn-ghost danger" onClick={() => removeUser(u)}>删除</button></td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={5} className="empty">暂无用户</td></tr>}
            </tbody>
          </table>
        </div>

        <h3 className="admin-sec">📱 应用管理（{apps.length}）</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>标题</th><th>创建者</th><th>需求描述</th><th>状态</th><th>大小</th><th>更新时间</th><th>操作</th></tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.owner || '—'}</td>
                  <td className="truncate" title={a.prompt}>{a.prompt}</td>
                  <td>{a.published ? <span className="badge">已发布</span> : '草稿'}</td>
                  <td>{Math.round(a.html_size / 1024)} KB</td>
                  <td>{fmt(a.updated_at)}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button className="btn btn-sm btn-ghost" onClick={() => window.open(publishUrl(a.id), '_blank', 'noopener')}>查看</button>
                    <button className="btn btn-sm btn-ghost danger" onClick={() => removeApp(a)}>删除</button>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && <tr><td colSpan={7} className="empty">暂无应用</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
