import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, clearCurrentUser } from '../user.js'

// 用户信息：默认只显示头像+昵称，hover/点击后展开「退出登录」
export default function UserMenu() {
  const nav = useNavigate()
  const user = getCurrentUser()
  const [open, setOpen] = useState(false)
  if (!user) return null

  function logout(e) {
    e.stopPropagation()
    clearCurrentUser()
    nav('/')
  }

  return (
    <div
      className="user-menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="user-avatar">{user.nickname?.charAt(0) || '?'}</div>
      <span className="user-name" title={user.nickname}>{user.nickname}</span>
      {open && (
        <div className="user-dropdown">
          <button className="user-dropdown-item" onClick={logout}>退出登录</button>
        </div>
      )}
    </div>
  )
}
