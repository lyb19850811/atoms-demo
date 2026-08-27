import { useRef, useState, useEffect } from 'react'

export default function ChatPanel({ messages, generating, samples, onSend }) {
  const [input, setInput] = useState('')
  const listRef = useRef(null)
  const taRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, generating])

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
            <div className="bubble">{m.content}</div>
          </div>
        ))}
        {generating && (
          <div className="typing">
            <span>正在生成</span>
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
          <span className="tip">Enter 发送 · Shift+Enter 换行</span>
          <button className="btn btn-primary" onClick={submit} disabled={generating || !input.trim()}>
            {generating ? '生成中…' : '生成'}
          </button>
        </div>
      </div>
    </div>
  )
}
