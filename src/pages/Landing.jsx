import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../user.js'

export default function Landing() {
  const nav = useNavigate()
  const user = getCurrentUser()

  return (
    <div className="page">
      <div className="hero">
        <div className="logo">
          <span className="logo-badge">✦</span> Mini Atoms
        </div>
        <h1>
          一句话，<span className="grad">生成你的应用</span>
        </h1>
        <p className="sub">
          描述你的想法，智能体为你编写代码并实时预览。像 Atoms 一样，让想法直接变成可运行、可分享的产品。
        </p>
        <div className="cta-row">
          <button className="btn btn-primary" onClick={() => nav(user ? '/workspace' : '/register')}>
            开始创作 →
          </button>
          {user && (
            <button className="btn btn-ghost" onClick={() => nav('/apps')}>
              我的应用
            </button>
          )}
        </div>
      </div>

      <div className="container">
        <div className="features">
          <div className="feature">
            <div className="icon">🤖</div>
            <h3>智能体驱动生成</h3>
            <p>输入自然语言需求，AI 理解意图并生成完整可运行的应用代码。</p>
          </div>
          <div className="feature">
            <div className="icon">🖥️</div>
            <h3>可视化实时预览</h3>
            <p>生成结果即时呈现在沙箱环境中，桌面/移动端一键切换。</p>
          </div>
          <div className="feature">
            <div className="icon">💬</div>
            <h3>对话式迭代</h3>
            <p>不满意？继续对话让它改样式、加功能，直到满意为止。</p>
          </div>
          <div className="feature">
            <div className="icon">🔗</div>
            <h3>一键分享</h3>
            <p>每个应用都有独立链接，把成品直接分享给任何人体验。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
