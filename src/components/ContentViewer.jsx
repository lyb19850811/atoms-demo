import { useState } from 'react'
import hljs from 'highlight.js'
import { marked } from 'marked'
import 'highlight.js/styles/atom-one-dark.css'

const LANG_MAP = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  py: 'python',
  json: 'json',
  css: 'css',
  html: 'xml',
  htm: 'xml',
  xml: 'xml',
  sh: 'bash',
  yml: 'yaml',
  yaml: 'yaml',
  ini: 'ini',
  conf: 'ini'
}

function extOf(path) {
  const i = path.lastIndexOf('.')
  return i >= 0 ? path.slice(i + 1).toLowerCase() : ''
}

function highlight(code, lang) {
  try {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    }
    return hljs.highlightAuto(code).value
  } catch {
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

// 内容查看器：按文件类型展示（HTML 预览/代码、Markdown 渲染、代码高亮）
export default function ContentViewer({ file }) {
  const [tab, setTab] = useState('preview')
  if (!file) {
    return <div className="preview-empty"><div className="big">📦</div><p>选择一个文件查看</p></div>
  }

  const ext = extOf(file.path)

  if (ext === 'html' || ext === 'htm') {
    return (
      <div className="content-viewer">
        <div className="cv-tabs">
          <button className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>预览</button>
          <button className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>代码</button>
        </div>
        {tab === 'preview' ? (
          <iframe className="cv-html" sandbox="allow-scripts allow-forms allow-modals" srcDoc={file.content} title={file.path} />
        ) : (
          <pre className="cv-code"><code dangerouslySetInnerHTML={{ __html: highlight(file.content, 'xml') }} /></pre>
        )}
      </div>
    )
  }

  if (ext === 'md') {
    const html = marked.parse(file.content || '')
    return <div className="cv-markdown" dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <pre className="cv-code">
      <code dangerouslySetInnerHTML={{ __html: highlight(file.content || '', LANG_MAP[ext]) }} />
    </pre>
  )
}
