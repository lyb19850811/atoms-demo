import FileTree from './FileTree.jsx'

// 第三栏：产物文件树（可收起）
export default function ArtifactsPanel({ files, activePath, onOpenFile, collapsed, onToggle }) {
  const list = files || []

  if (collapsed) {
    return (
      <div className="artifacts-panel collapsed" onClick={onToggle} title="展开产物">
        <div className="artifacts-collapsed-bar">📦 产物</div>
      </div>
    )
  }

  return (
    <div className="artifacts-panel">
      <div className="artifacts-head">
        <span>📦 产物</span>
        <button className="artifacts-toggle" onClick={onToggle} title="收起产物">»</button>
      </div>
      <div className="artifacts-tree">
        <FileTree files={list} selectedPath={activePath} onSelect={onOpenFile} />
      </div>
    </div>
  )
}
