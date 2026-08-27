import { useState } from 'react'
import FileTree from './FileTree.jsx'

// 项目查看器：文件树 + 预览/代码
export default function ProjectViewer({ files, entry, selectedPath, onSelect }) {
  const [tab, setTab] = useState('preview')
  const entryFile = (files || []).find((f) => f.path === entry)
  const selectedFile = (files || []).find((f) => f.path === selectedPath) || entryFile

  return (
    <div className="project-viewer">
      <div className="project-filetree">
        <FileTree files={files} selectedPath={selectedPath} onSelect={onSelect} />
      </div>
      <div className="project-content">
        <div className="project-tabs">
          <button className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>预览</button>
          <button className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>代码</button>
        </div>
        {tab === 'preview' ? (
          <div className="project-preview">
            {entryFile ? (
              <iframe sandbox="allow-scripts allow-forms allow-modals" srcDoc={entryFile.content} title="预览" />
            ) : (
              <div className="preview-empty"><div className="big">🖥️</div><p>尚无前端入口文件</p></div>
            )}
          </div>
        ) : (
          <pre className="project-code">
            {selectedFile ? selectedFile.content : '选择一个文件查看代码'}
          </pre>
        )}
      </div>
    </div>
  )
}
