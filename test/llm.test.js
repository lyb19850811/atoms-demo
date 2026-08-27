import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractJson, parseResult } from '../server/llm.js'

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
