import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { appHtmlUrl } from '../api.js'

export default function AppView() {
  const { id } = useParams()
  const nav = useNavigate()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/apps/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('应用不存在或已删除')
        return r.json()
      })
      .then(setInfo)
      .catch((e) => setError(e.message))
  }, [id])

  if (error) {
    return (
      <div className="page">
        <div className="center-card">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48 }}>😕</div>
            <p className="hint" style={{ marginTop: 16 }}>{error}</p>
            <button className="btn btn-primary" onClick={() => nav('/')}>去创作自己的应用</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="share-top">
        <div className="title">
          <span className="logo-badge" style={{ width: 26, height: 26, fontSize: 13 }}>✦</span>
          {info?.title || '加载中…'}
        </div>
        <button className="btn btn-sm btn-primary" onClick={() => nav('/')}>用 Mini Atoms 创作</button>
      </div>
      <div className="share-frame">
        {info && <iframe title={info.title} src={appHtmlUrl(id)} sandbox="allow-scripts allow-forms allow-modals" />}
      </div>
    </div>
  )
}
