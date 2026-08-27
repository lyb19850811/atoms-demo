import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import { getCurrentUser, setCurrentUser } from '../user.js'

export default function Register() {
  const nav = useNavigate()
  const existing = getCurrentUser()
  const [nickname, setNickname] = useState(existing?.nickname || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!nickname.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const user = await api.register(nickname)
      setCurrentUser(user)
      nav('/workspace')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="center-card">
        <form className="card" onSubmit={submit}>
          <h2>👋 注册 / 登录</h2>
          <p className="hint">
            {existing
              ? `欢迎回来，${existing.nickname}！可直接继续，或换个昵称。`
              : '输入昵称即可开始：首次使用会为你注册，之后输入相同昵称即登录并回到你的应用。'}
          </p>
          <input
            className="field"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="输入你的昵称"
            maxLength={30}
            autoFocus
          />
          {error && <div className="error-banner">{error}</div>}
          <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }} disabled={loading || !nickname.trim()}>
            {loading ? '创建中…' : '进入工作台'}
          </button>
        </form>
      </div>
    </div>
  )
}
