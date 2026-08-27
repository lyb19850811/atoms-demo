import { useState } from 'react'

export default function PublishDialog({ url, onClose }) {
  const [copied, setCopied] = useState(false)
  if (!url) return null

  function copy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-icon">🎉</div>
        <h2>发布成功！</h2>
        <p>你的应用已发布，任何人都可通过以下地址直接访问：</p>
        <div className="dialog-url">{url}</div>
        <div className="dialog-actions">
          <button className="btn btn-sm btn-primary" onClick={copy}>
            {copied ? '✓ 已复制' : '复制链接'}
          </button>
          <button className="btn btn-sm btn-ghost" onClick={() => window.open(url, '_blank', 'noopener')}>
            打开链接
          </button>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
