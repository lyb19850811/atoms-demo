export default function PreviewFrame({ html, error }) {
  return (
    <div className="preview">
      <div className="preview-toolbar">
        <span>预览</span>
        <span className="ws-spacer" />
        {html && <span style={{ color: '#5b6478' }}>沙箱隔离运行</span>}
      </div>
      <div className="preview-stage">
        {html ? (
          <iframe
            key={html}
            className="frame"
            sandbox="allow-scripts allow-forms allow-modals"
            srcDoc={html}
            title="应用预览"
          />
        ) : (
          <div className="preview-empty">
            <div className="big">🖥️</div>
            <p>生成的应将会显示在这里</p>
            <p style={{ fontSize: 13, color: '#5b6478' }}>
              {error ? error : '在左侧描述你的想法，智能体将为你构建可交互的应用。'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
