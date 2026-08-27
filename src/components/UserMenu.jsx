import { useNavigate } from 'react-router-dom'
import { getCurrentUser, clearCurrentUser } from '../user.js'

// 用户信息 + 退出登录
export default function UserMenu() {
  const nav = useNavigate()
  const user = getCurrentUser()
  if (!user) return null

  function logout() {
    clearCurrentUser()
    nav('/')
  }

  return (
    <div className="user-menu">
      <div className="user-avatar">{user.nickname?.charAt(0) || '?'}</div>
      <span className="user-name" title={user.nickname}>{user.nickname}</span>
      <button className="btn btn-sm btn-ghost" onClick={() => nav('/admin')}>管理</button>
      <button className="btn btn-sm btn-ghost logout-btn" onClick={logout}>退出</button>
    </div>
  )
}
