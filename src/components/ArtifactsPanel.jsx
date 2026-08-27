import { useState } from 'react'
import FileTree from './FileTree.jsx'
import ContentViewer from './ContentViewer.jsx'

// 中间栏：产物浏览（文件树 + 按类型的查看器）
export default function ArtifactsPanel({ files }) {
  const list = files || []
  const [selectedPath, setSelectedPath] = useState(list[0]?.path || '')
  const selected = list.find((f) => f.path === selectedPath) || list[0]

  return (
    <div className="artifacts-panel">
      <div className="artifacts-head">📦 产物</div>
      <div className="artifacts-tree">
        <FileTree files={list} selectedPath={selectedPath} onSelect={setSelectedPath} />
      </div>
      <div className="artifacts-content">
        <ContentViewer key={selected?.path} file={selected} />
      </div>
    </div>
  )
}
