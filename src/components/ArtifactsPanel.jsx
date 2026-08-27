import { useState } from 'react'
import FileTree from './FileTree.jsx'

// 中间栏：产物浏览（文件树 + 代码/文档内容）
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
      <div className="artifacts-code">
        {selected ? (
          <pre>{selected.content}</pre>
        ) : (
          <div className="preview-empty"><div className="big">📦</div><p>暂无产物</p></div>
        )}
      </div>
    </div>
  )
}
