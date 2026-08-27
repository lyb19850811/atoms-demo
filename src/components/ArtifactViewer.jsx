import { useState } from 'react'
import ProjectViewer from './ProjectViewer.jsx'

// 产物浏览：单文件 = 预览/代码；团队项目 = 文件树 + 预览/代码
export default function ArtifactViewer({ app, files, onClose }) {
  const isTeam = (files?.length || 0) > 0
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(false)

  function copy(text) {
    navigator.clipboard.writeText(text || '').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog artifact-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="code-head">
          <h2>📦 产物{app?.title ? ` · ${app.title}` : ''}</h2>
          <div className="code-actions">
            {!isTeam && (
              <button className="btn btn-sm btn-primary" onClick={() => copy(app?.html)}>
                {copied ? '✓ 已复制' : '复制代码'}
              </button>
            )}
            <button className="btn btn-sm btn-ghost" onClick={onClose}>关闭</button>
          </div>
        </div>

        {isTeam ? (
          <div className="artifact-project-wrap">
            <ProjectViewer files={files} entry={app?.entry} />
          </div>
        ) : (
          <>
            <div className="artifact-tabs">
              <button className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>预览</button>
              <button className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>代码</button>
            </div>
            {tab === 'preview' ? (
              <div className="artifact-preview">
                <iframe sandbox="allow-scripts allow-forms allow-modals" srcDoc={app?.html || ''} title="产物预览" />
              </div>
            ) : (
              <pre className="code-view">{app?.html || ''}</pre>
            )}
          </>
        )}
      </div>
    </div>
  )
}
