import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractJson, parseResult, validateHtml } from '../server/llm.js'

test('extractJson：解析直接 JSON', () => {
  const o = extractJson('{"title":"番茄钟","html":"<h1>hi</h1>"}')
  assert.equal(o.title, '番茄钟')
  assert.equal(o.html, '<h1>hi</h1>')
})

test('extractJson：解析带 --- 前缀的 JSON（推理模型偶发场景）', () => {
  const o = extractJson('--- {"title":"x","html":"<p>y</p>"}')
  assert.equal(o.title, 'x')
})

test('extractJson：解析 markdown 代码块包裹的 JSON', () => {
  const o = extractJson('```json\n{"title":"a","html":"<b>c</b>"}\n```')
  assert.equal(o.title, 'a')
})

test('extractJson：从包裹文本中提取 JSON 对象', () => {
  const o = extractJson('前置说明 {"title":"t","html":"<div>d</div>"} 后置说明')
  assert.equal(o.title, 't')
})

test('parseResult：正常解析 {title, html}', () => {
  const r = parseResult('{"title":"番茄钟","html":"<!DOCTYPE html><html><body>x</body></html>"}')
  assert.equal(r.title, '番茄钟')
  assert.ok(r.html.includes('<!DOCTYPE html>'))
})

test('parseResult：兜底从纯文本提取 HTML', () => {
  const r = parseResult('前言 <!DOCTYPE html><html><body>hi</body></html> 后记')
  assert.ok(r.html.includes('<body>hi</body>'))
})

test('parseResult：空内容返回空 html', () => {
  const r = parseResult('')
  assert.equal(r.html, '')
})

test('parseResult：非法 JSON 也能从文本中提取', () => {
  const r = parseResult('这不是JSON <html><body>hello</body></html>')
  assert.ok(r.html.includes('hello'))
})

test('validateHtml：完整可交互的 HTML 无问题', () => {
  const html = '<!DOCTYPE html><html><head><style>body{color:red}</style></head><body><h1>hi</h1><script>document.querySelector("h1").onclick=()=>{};</script></body></html>'
  assert.deepEqual(validateHtml(html), [])
})

test('validateHtml：识别外部资源与静态展示', () => {
  const issues = validateHtml('<html><head><link rel="stylesheet" href="https://cdn.example.com/x.css"></head><body><p>hi</p></body></html>')
  assert.ok(issues.some((x) => x.includes('外部 CSS')))
  assert.ok(issues.some((x) => x.includes('缺少 <script>')))
})

test('validateHtml：识别 localStorage 与 fetch 违规', () => {
  const html = '<html><body><script>localStorage.setItem("x", 1); fetch("/api")</script></body></html>'
  const issues = validateHtml(html)
  assert.ok(issues.some((x) => x.includes('localStorage')))
  assert.ok(issues.some((x) => x.includes('网络请求')))
})

test('validateHtml：识别 script 语法错误', () => {
  const html = '<html><body><script>function f( { return 1; }</script></body></html>'
  const issues = validateHtml(html)
  assert.ok(issues.some((x) => x.includes('语法错误')))
})
