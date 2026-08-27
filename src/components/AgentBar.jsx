import { AGENTS } from '../data/agents.js'

// 智能体团队头像行：点击选中智能体（即 @提及）
export default function AgentBar({ activeId, onSelect }) {
  return (
    <div className="agent-bar">
      {AGENTS.map((a) => (
        <div
          key={a.id}
          className={`agent-avatar-wrap${a.id === activeId ? ' active' : ''}`}
          title={`${a.name} · ${a.role}`}
          onClick={() => onSelect?.(a.id)}
        >
          <div className="agent-avatar" style={{ background: a.color }}>{a.emoji}</div>
        </div>
      ))}
    </div>
  )
}
