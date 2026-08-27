// LLM Provider 抽象层：目前对接 DeepSeek（流式），可通过环境变量切换 base/model
const BASE = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

const SYSTEM_PROMPT = `你是 Mini Atoms 的应用生成引擎，能把用户的一句话需求变成完整、可运行、真实可交互的单文件网页应用。

严格输出规则：
1. 只输出一个 JSON 对象，格式为 {"title":"简短中文应用名","html":"完整HTML代码字符串"}。不要输出任何其他文字、解释或 markdown 代码块标记。
2. html 必须是完整自包含的单文件 HTML：包含 <!DOCTYPE html>，所有 CSS 写在 <style> 内，所有 JS 写在 <script> 内。
3. 禁止引用任何外部资源：不要 <link>、<script src>、@import、外部图片/字体/CDN。图标用 emoji 或内联 SVG。
4. 不要使用 localStorage/sessionStorage/cookie，也不要发网络请求（fetch/XMLHttpRequest），状态用内存变量即可（沙箱环境限制）。
5. 应用必须真实可交互：有状态、有事件监听，能响应用户的点击/输入等操作，而不是纯静态展示。
6. 界面精美现代：合适的配色、留白、圆角、阴影、字体层级，桌面端和移动端都好看。
7. 代码健壮：处理边界情况，避免运行时错误。

当用户是「修改」需求时，我会在用户消息里提供当前应用的完整代码，请你基于它做最小必要修改，保留未提及的原有功能和样式，然后输出修改后的完整新代码。

【思考要求】思考过程简要列出：功能设计、界面布局、交互逻辑、视觉风格四个要点，每点一句话即可，然后直接输出 JSON。`

function buildMessages(prompt, currentHtml) {
  const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
  if (currentHtml) {
    messages.push({
      role: 'user',
      content: `这是我当前应用的完整代码：\n\`\`\`html\n${currentHtml}\n\`\`\`\n\n用户的新需求：${prompt}\n请基于上面的代码做最小必要修改，输出修改后的完整新代码（JSON 格式）。`
    })
  } else {
    messages.push({ role: 'user', content: `请生成一个应用，需求：${prompt}` })
  }
  return messages
}

// 从文本中稳健地提取 JSON 对象（处理直接 JSON、--- 前缀、markdown 代码块、包裹文本等情况）
function extractJson(text) {
  if (!text) return null
  let t = text.trim()
  // 直接解析
  try {
    const o = JSON.parse(t)
    if (o && typeof o === 'object') return o
  } catch {
    /* continue */
  }
  // 去掉 markdown 代码块
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) {
    try {
      return JSON.parse(fence[1].trim())
    } catch {
      /* continue */
    }
  }
  // 去掉可能的 --- 前缀
  t = t.replace(/^---+\s*/, '').trim()
  // 定位第一个 { 到最后一个 } 的 JSON 对象
  const start = t.indexOf('{')
  const end = t.lastIndexOf('}')
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(t.slice(start, end + 1))
    } catch {
      /* continue */
    }
  }
  return null
}

function parseResult(text) {
  const obj = extractJson(text)
  if (obj && typeof obj.html === 'string' && obj.html.trim()) {
    return { title: String(obj.title || '未命名应用').slice(0, 60), html: obj.html.trim() }
  }
  // 兜底：从文本中提取 HTML
  let html = text || ''
  const fence = html.match(/```(?:html)?\s*([\s\S]*?)```/i)
  if (fence) html = fence[1]
  const doc = html.match(/<!DOCTYPE html>[\s\S]*<\/html>/i) || html.match(/<html[\s\S]*<\/html>/i)
  if (doc) html = doc[0]
  html = html.trim()
  return { title: '我的应用', html }
}

// 流式生成：逐块产出事件
//   { type: 'thinking', text }  真实思考过程（reasoning_content）
//   { type: 'writing',  text }  正在输出最终内容
//   { type: 'done', title, html } 完成（已解析）
export async function* streamGenerate({ prompt, currentHtml }) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('服务端未配置 DEEPSEEK_API_KEY')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 180000)
  let res
  try {
    res = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: buildMessages(prompt, currentHtml),
        stream: true,
        temperature: 0,
        max_tokens: 16384,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    })
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('生成超时，请重试')
    throw new Error(`无法连接模型服务：${e.message}`)
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const msg = data?.error?.message || `LLM 请求失败(${res.status})`
    if (res.status === 402) throw new Error('API 余额不足，请检查 DeepSeek 账户余额')
    if (res.status === 401) throw new Error('API Key 无效')
    throw new Error(msg)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let reasoning = ''
  let content = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() // 保留最后一段不完整行
    for (const line of lines) {
      const t = line.trim()
      if (!t.startsWith('data:')) continue
      const d = t.slice(5).trim()
      if (d === '[DONE]') continue
      try {
        const obj = JSON.parse(d)
        const delta = obj.choices?.[0]?.delta || {}
        if (delta.reasoning_content) {
          reasoning += delta.reasoning_content
          yield { type: 'thinking', text: delta.reasoning_content }
        }
        if (delta.content) {
          content += delta.content
          yield { type: 'writing', text: delta.content }
        }
      } catch {
        /* 忽略无法解析的行 */
      }
    }
  }

  // 优先从 content 解析；推理模型偶尔把 JSON 输出到 reasoning_content，回退解析
  let result = parseResult(content)
  if (!result.html) result = parseResult(reasoning)
  if (!result.html) throw new Error('模型未能生成有效内容，请重试')
  yield { type: 'done', title: result.title, html: result.html }
}
