import { useState } from 'react'

// 产物浏览：预览 + 代码 双标签
export default function ArtifactViewer({ html, title, onClose }) {
  const [tab, setTab] = useState('preview')
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
      <div className="dialog artifact-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="code-head">
          <h2>📦 产物{title ? ` · ${title}` : ''}</h2>
          <div className="artifact-tabs">
            <button className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>预览</button>
            <button className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>代码</button>
          </div>
          <div className="code-actions">
            <button className="btn btn-sm btn-primary" onClick={copy}>{copied ? '✓ 已复制' : '复制代码'}</button>
            <button className="btn btn-sm btn-ghost" onClick={onClose}>关闭</button>
          </div>
        </div>
        {tab === 'preview' ? (
          <div className="artifact-preview">
            <iframe sandbox="allow-scripts allow-forms allow-modals" srcDoc={html} title="产物预览" />
          </div>
        ) : (
          <pre className="code-view">{html}</pre>
        )}
      </div>
    </div>
  )
}
