import { useRef, useState, useEffect } from 'react'

export default function ChatPanel({ messages, generating, thinkingText, phase, samples, onSend }) {
  const [input, setInput] = useState('')
  const [thinkingOpen, setThinkingOpen] = useState(true)
  const [listening, setListening] = useState(false)
  const listRef = useRef(null)
  const taRef = useRef(null)
  const thinkingRef = useRef(null)
  const recRef = useRef(null)

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
    onSend(v)
    setInput('')
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  // 卸载时停止语音识别
  useEffect(() => () => recRef.current?.stop(), [])

  function toggleVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      window.alert('当前浏览器不支持语音输入，请使用 Chrome / Edge')
      return
    }
    if (listening) {
      recRef.current?.stop()
      setListening(false)
      return
    }
    const rec = new SR()
    rec.lang = 'zh-CN'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript || ''
      if (text) setInput((prev) => (prev ? prev + text : text))
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recRef.current = rec
    try {
      rec.start()
      setListening(true)
    } catch {
      setListening(false)
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
                <button key={s} className="chip" onClick={() => onSend(s)} disabled={generating}>
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
        <textarea
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={messages.length > 0 ? '继续描述修改想法，例如：把配色改成深色…' : '描述你想要的应用，例如：一个可以计时的番茄钟'}
          disabled={generating}
        />
        <div className="row">
          <div className="row-left">
            <button
              className={`btn btn-sm btn-ghost mic-btn${listening ? ' listening' : ''}`}
              onClick={toggleVoice}
              disabled={generating}
              title="语音输入"
            >
              {listening ? '🔴 聆听中…' : '🎤 语音'}
            </button>
            <span className="tip">Enter 发送 · Shift+Enter 换行</span>
          </div>
          <button className="btn btn-primary" onClick={submit} disabled={generating || !input.trim()}>
            {generating ? (phase === 'thinking' ? '思考中…' : '生成中…') : '生成'}
          </button>
        </div>
      </div>
    </div>
  )
}
