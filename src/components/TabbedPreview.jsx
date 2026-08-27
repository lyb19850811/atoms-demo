import ContentViewer from './ContentViewer.jsx'

// 右侧预览栏：多标签页展示文件
export default function TabbedPreview({ tabs, activePath, onActivate, onClose }) {
  const active = tabs.find((f) => f.path === activePath)

  return (
    <div className="tabbed-preview">
      <div className="tp-tabs">
        {tabs.map((f) => (
          <div
            key={f.path}
            className={`tp-tab${f.path === activePath ? ' active' : ''}`}
            onClick={() => onActivate(f.path)}
          >
            <span className="tp-tab-name">{f.path.split('/').pop()}</span>
            <span
              className="tp-tab-close"
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
      <div className="tp-content">
        {active ? (
          <ContentViewer key={active.path} file={active} />
        ) : (
          <div className="preview-empty">
            <div className="big">🖥️</div>
            <p>点击左侧产物文件，在标签页中预览</p>
          </div>
        )}
      </div>
    </div>
  )
}
