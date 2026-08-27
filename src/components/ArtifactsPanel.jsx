import FileTree from './FileTree.jsx'

// 中间栏：产物文件树（点击文件在右侧标签页打开）
export default function ArtifactsPanel({ files, activePath, onOpenFile }) {
  const list = files || []
  return (
    <div className="artifacts-panel">
      <div className="artifacts-head">📦 产物</div>
      <div className="artifacts-tree">
        <FileTree files={list} selectedPath={activePath} onSelect={onOpenFile} />
      </div>
    </div>
  )
}
