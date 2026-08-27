import { AGENTS } from '../data/agents.js'

// 智能体团队头像行（占位：目前仅展示，后续接入 @提及 / 团队模式）
export default function AgentBar({ activeId }) {
  return (
    <div className="agent-bar">
      {AGENTS.map((a) => (
        <div
          key={a.id}
          className={`agent-avatar-wrap${a.id === activeId ? ' active' : ''}`}
          title={`${a.name} · ${a.role}`}
        >
          <div className="agent-avatar" style={{ background: a.color }}>{a.emoji}</div>
        </div>
      ))}
    </div>
  )
}
