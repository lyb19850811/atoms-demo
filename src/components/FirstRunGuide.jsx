const STEPS = [
  { icon: '💬', title: '描述你的想法', desc: '在左侧输入一句话需求，例如「做一个番茄钟」' },
  { icon: '🧠', title: '智能体思考并生成', desc: '查看真实思考过程，AI 为你编写完整应用代码' },
  { icon: '🖥️', title: '沙箱实时预览', desc: '右侧即时预览，支持桌面 / 移动端切换' },
  { icon: '🔁', title: '对话式迭代', desc: '继续描述修改想法，直到满意' },
  { icon: '🚀', title: '发布分享', desc: '一键发布为独立链接，分享给任何人' }
]

export default function FirstRunGuide({ onClose }) {
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog guide" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-icon">👋</div>
        <h2>欢迎来到 Mini Atoms</h2>
        <p>一句话，让智能体帮你把想法变成可运行的应用</p>
        <div className="guide-steps">
          {STEPS.map((s, i) => (
            <div className="guide-step" key={i}>
              <div className="guide-step-icon">{s.icon}</div>
              <div className="guide-step-body">
                <div className="guide-step-title">{i + 1}. {s.title}</div>
                <div className="guide-step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="dialog-actions">
          <button className="btn btn-primary" onClick={onClose}>开始创作 →</button>
        </div>
      </div>
    </div>
  )
}
