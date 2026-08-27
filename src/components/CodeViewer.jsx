import { useState } from 'react'

export default function CodeViewer({ html, onClose }) {
  const [copied, setCopied] = useState(false)
  if (!html) return null

  function copy() {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog code-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="code-head">
          <h2>💻 应用代码</h2>
          <span className="code-meta">{html.length} 字符 · 单文件 HTML</span>
          <div className="code-actions">
            <button className="btn btn-sm btn-primary" onClick={copy}>
              {copied ? '✓ 已复制' : '复制代码'}
            </button>
            <button className="btn btn-sm btn-ghost" onClick={onClose}>关闭</button>
          </div>
        </div>
        <pre className="code-view">{html}</pre>
      </div>
    </div>
  )
}
