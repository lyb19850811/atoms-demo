import { useRef, useState, useEffect } from 'react'
import AgentBar from './AgentBar.jsx'
import FeatureMenu from './FeatureMenu.jsx'
import { getAgent } from '../data/agents.js'

export default function ChatPanel({ messages, generating, thinkingText, phase, samples, onSend }) {
  const [input, setInput] = useState('')
  const [thinkingOpen, setThinkingOpen] = useState(true)
  const [activeAgent, setActiveAgent] = useState('engineer')
  const activeInfo = getAgent(activeAgent)
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

  function submit() {
    const v = input.trim()
    if (!v || generating) return
    onSend(v, activeAgent)
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
            <p>描述你想做的应用，或点上方选择一个智能体，@Ta 来负责。</p>
            <div className="chips">
              {samples.map((s) => (
                <button key={s} className="chip" onClick={() => onSend(s, activeAgent)} disabled={generating}>
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
      </div>

      <div className="chat-input">
        <AgentBar activeId={activeAgent} onSelect={setActiveAgent} />
        <div className="chat-agent-status">
          <span>当前智能体：</span>
          <span className="chat-agent-name"><em>{activeInfo.emoji}</em> {activeInfo.name} · {activeInfo.role}</span>
        </div>
        <textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={messages.length > 0 ? `继续描述，@${activeInfo.name} 会接手…` : `请@${activeInfo.name}，例如：做一个番茄钟`}
          disabled={generating}
        />
        <div className="row">
          <div className="row-left">
            <FeatureMenu />
            <button className="btn btn-sm btn-ghost" title="主题（即将上线）">🎨 主题 ▾</button>
          </div>
          <button className="btn btn-primary" onClick={submit} disabled={generating || !input.trim()}>
            {generating ? (phase === 'thinking' ? '思考中…' : '生成中…') : `以${activeInfo.name}构建`}
          </button>
        </div>
      </div>
    </div>
  )
}
