import { highlightCode } from '../lib/code.js'

// 中间栏：顶部「预览/代码」两个 tab；代码 tab 下再叠一层文件 tab
export default function PreviewPanel({ mode, onModeChange, previewHtml, tabs, activePath, onActivate, onClose }) {
  const active = tabs.find((f) => f.path === activePath)

  return (
    <div className="preview-panel">
      <div className="pp-top-tabs">
        <button className={mode === 'preview' ? 'active' : ''} onClick={() => onModeChange('preview')}>预览</button>
        <button className={mode === 'code' ? 'active' : ''} onClick={() => onModeChange('code')}>代码</button>
      </div>

      {mode === 'preview' ? (
        <div className="pp-preview">
          {previewHtml ? (
            <iframe sandbox="allow-scripts allow-forms allow-modals" srcDoc={previewHtml} title="预览" />
          ) : (
            <div className="preview-empty">
              <div className="big">🖥️</div>
              <p>暂无预览，生成应用后在这里查看</p>
            </div>
          )}
        </div>
      ) : (
        <div className="pp-code">
          <div className="pp-code-tabs">
            {tabs.map((f) => (
              <div
                key={f.path}
                className={`pp-file-tab${f.path === activePath ? ' active' : ''}`}
                onClick={() => onActivate(f.path)}
              >
                <span className="pp-file-name">{f.path.split('/').pop()}</span>
                <span
                  className="pp-file-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose(f.path)
                  }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
          <div className="pp-code-content">
            {active ? (
              <pre className="cv-code">
                <code dangerouslySetInnerHTML={{ __html: highlightCode(active.content, active.path) }} />
              </pre>
            ) : (
              <div className="preview-empty"><p>点击右侧产物文件，在代码标签中查看</p></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
