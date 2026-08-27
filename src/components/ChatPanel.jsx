import { useRef, useState, useEffect } from 'react'
import FeatureMenu from './FeatureMenu.jsx'
import { getAgent } from '../data/agents.js'

export default function ChatPanel({ messages, generating, thinkingText, phase, samples, onSend, onStop, teamMode, onToggleTeamMode, plan, steps = [], building, onConfirmPlan }) {
  const [input, setInput] = useState('')
  const [thinkingOpen, setThinkingOpen] = useState(true)
  const [planDraft, setPlanDraft] = useState('')
  const listRef = useRef(null)
  const taRef = useRef(null)
  const thinkingRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, generating, thinkingText])

  // 思考内容流式增长时，自动滚到底部
  useEffect(() => {
    if (thinkingRef.current) thinkingRef.current.scrollTop = thinkingRef.current.scrollHeight
  }, [thinkingText])

  // 计划生成后，同步到可编辑草稿
  useEffect(() => {
    if (plan) setPlanDraft(plan.plan)
  }, [plan])

  function submit() {
    const v = input.trim()
    if (!v || generating) return
    onSend(v, 'engineer')
    setInput('')
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="chat">
      <div className="chat-messages" ref={listRef}>
        {messages.length === 0 && (
          <div className="chat-empty">
            <div style={{ fontSize: 40, marginBottom: 12 }}>💡</div>
            <p>描述你想做的应用，智能体会帮你生成并预览。</p>
            <div className="chips">
              {samples.map((s) => (
                <button key={s} className="chip" onClick={() => onSend(s, 'engineer')} disabled={generating}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="avatar">{m.role === 'user' ? '🧑' : '✦'}</div>
            <div className="msg-main">
              {m.role === 'assistant' && m.thinking && (
                <details className="msg-thinking">
                  <summary>🧠 思考过程</summary>
                  <div className="msg-thinking-body">{m.thinking}</div>
                </details>
              )}
              <div className="bubble">{m.content}</div>
            </div>
          </div>
        ))}

        {generating && phase === 'thinking' && (
          <div className="thinking-box">
            <div className="thinking-head" onClick={() => setThinkingOpen((v) => !v)}>
              <span>🧠 思考过程</span>
              <span className="thinking-spinner" />
              <span className="ws-spacer" />
              <span className="thinking-toggle">{thinkingOpen ? '收起' : '展开'}</span>
            </div>
            {thinkingOpen && (
              <div className="thinking-body" ref={thinkingRef}>
                {thinkingText || '…'}
              </div>
            )}
          </div>
        )}

        {generating && phase === 'writing' && (
          <div className="typing">
            <span>正在编写代码</span>
            <span className="dots"><span /><span /><span /></span>
          </div>
        )}

        {plan && !building && (
          <div className="plan-card">
            <div className="plan-card-head">📋 {plan.title || '团队开发计划'} <span className="plan-edit-hint">（可编辑，改后确认）</span></div>
            <textarea
              className="plan-edit"
              value={planDraft}
              onChange={(e) => setPlanDraft(e.target.value)}
              rows={10}
            />
            <div className="plan-card-actions">
              <button className="btn btn-primary" onClick={() => onConfirmPlan(planDraft)}>✅ 确认开发</button>
            </div>
          </div>
        )}

        {steps.length > 0 && (
          <div className="steps-card">
            <div className="steps-card-head">🤝 团队协作</div>
            {steps.map((s) => (
              <div key={s.seq} className={`step-item ${s.status}`}>
                <span className="step-agent">{getAgent(s.agentId).emoji} {s.agentName}</span>
                <span className="step-task">{s.task}</span>
                <span className="step-status">{s.status === 'done' ? '✓' : '…'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-input">
        {teamMode && (
          <div className="chat-team-note">🤝 团队模式：团队组长自动编排（产品经理 → 架构师 → 工程师）</div>
        )}
        <textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={teamMode ? '描述你的项目需求，例如：做一个五子棋游戏（支持人机对战）' : '描述你想要的应用，例如：做一个番茄钟'}
          disabled={generating}
        />
        <div className="row">
          <div className="row-left">
            <FeatureMenu teamMode={teamMode} onToggleTeamMode={onToggleTeamMode} />
            <button className="btn btn-sm btn-ghost" title="主题（即将上线）">🎨 主题 ▾</button>
          </div>
          {generating ? (
            <button className="btn btn-stop" onClick={onStop}>⏹ 停止</button>
          ) : (
            <button className="btn btn-primary" onClick={submit} disabled={!input.trim()}>
              {teamMode ? '开始规划' : '构建'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
