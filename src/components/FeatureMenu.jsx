import { useState } from 'react'

// 功能菜单（仿 Atoms：团队模式 / 附件 / 连接器 / 视频 / 深度研究 / 竞赛模式）
// 目前为 UI 占位：开关仅切换本地状态，后续逐个接入真实功能
export default function FeatureMenu() {
  const [open, setOpen] = useState(false)
  const [teamMode, setTeamMode] = useState(false)
  const [deepResearch, setDeepResearch] = useState(false)

  return (
    <div className="feature-menu">
      <button className="btn btn-sm btn-ghost" onClick={() => setOpen((v) => !v)}>
        ⚙️ 功能 ▾
      </button>
      {open && (
        <div className="feature-popover">
          <div className="feature-item" onClick={() => setTeamMode((v) => !v)}>
            <span>👥 团队模式</span>
            <span className={`toggle${teamMode ? ' on' : ''}`}><span className="knob" /></span>
          </div>
          <div className="feature-item"><span>📎 附件</span><span className="chev">›</span></div>
          <div className="feature-item"><span>🔌 连接器</span><span className="chev">›</span></div>
          <div className="feature-item"><span>🎬 视频</span><span className="chev">›</span></div>
          <div className="feature-item" onClick={() => setDeepResearch((v) => !v)}>
            <span>🔍 深度研究</span>
            <span className={`toggle${deepResearch ? ' on' : ''}`}><span className="knob" /></span>
          </div>
          <div className="feature-item"><span>🏁 竞赛模式</span><span className="chev">›</span></div>
        </div>
      )}
    </div>
  )
}
