import hljs from 'highlight.js'
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
  conf: 'ini',
  md: 'markdown'
}

export function extOf(path) {
  const i = path.lastIndexOf('.')
  return i >= 0 ? path.slice(i + 1).toLowerCase() : ''
}

// 语法高亮，返回 HTML（供 dangerouslySetInnerHTML 使用）
export function highlightCode(code, path) {
  const lang = LANG_MAP[extOf(path)]
  try {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code || '', { language: lang, ignoreIllegals: true }).value
    }
    return hljs.highlightAuto(code || '').value
  } catch {
    return (code || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}
