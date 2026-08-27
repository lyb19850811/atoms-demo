import { describe, it, expect, vi, afterEach } from 'vitest'
import { api } from '../api.js'

function sseResponse(chunks) {
  const enc = new TextEncoder()
  const stream = new ReadableStream({
    start(c) {
      for (const chunk of chunks) c.enqueue(enc.encode(chunk))
      c.close()
    }
  })
  return new Response(stream, { status: 200, headers: { 'Content-Type': 'text/event-stream' } })
}

afterEach(() => vi.unstubAllGlobals())

describe('generateStream SSE 解析', () => {
  it('正确解析 thinking / writing / done 事件', async () => {
    const payload =
      'event: thinking\ndata: {"text":"功能"}\n\n' +
      'event: thinking\ndata: {"text":"设计"}\n\n' +
      'event: writing\ndata: {"text":"{..."}\n\n' +
      'event: done\ndata: {"id":"a","title":"番茄钟","html":"<h1>x</h1>"}\n\n'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(sseResponse([payload])))

    const thinkings = []
    let writingCount = 0
    let done = null
    await api.generateStream({ prompt: 'x' }, {
      thinking: (d) => thinkings.push(d.text),
      writing: () => writingCount++,
      done: (d) => (done = d)
    })

    expect(thinkings).toEqual(['功能', '设计'])
    expect(writingCount).toBe(1)
    expect(done.title).toBe('番茄钟')
    expect(done.html).toBe('<h1>x</h1>')
  })

  it('非 2xx 响应抛错并带服务端信息', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: '输入错误' }), { status: 400 })))
    await expect(api.generateStream({ prompt: 'x' }, {})).rejects.toThrow('输入错误')
  })
})
