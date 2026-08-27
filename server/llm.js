// LLM Provider 抽象层：目前对接 DeepSeek，可通过环境变量切换 base/model
const BASE = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat'

const SYSTEM_PROMPT = `你是 Mini Atoms 的应用生成引擎，能把用户的一句话需求变成完整、可运行、真实可交互的单文件网页应用。

严格输出规则：
1. 只输出一个 JSON 对象，格式为 {"title":"简短中文应用名","html":"完整HTML代码字符串"}。不要输出任何其他文字、解释或 markdown 代码块标记。
2. html 必须是完整自包含的单文件 HTML：包含 <!DOCTYPE html>，所有 CSS 写在 <style> 内，所有 JS 写在 <script> 内。
3. 禁止引用任何外部资源：不要 <link>、<script src>、@import、外部图片/字体/CDN。图标用 emoji 或内联 SVG。
4. 不要使用 localStorage/sessionStorage/cookie，也不要发网络请求（fetch/XMLHttpRequest），状态用内存变量即可（沙箱环境限制）。
5. 应用必须真实可交互：有状态、有事件监听，能响应用户的点击/输入等操作，而不是纯静态展示。
6. 界面精美现代：合适的配色、留白、圆角、阴影、字体层级，桌面端和移动端都好看。
7. 代码健壮：处理边界情况，避免运行时错误。

当用户是「修改」需求时，我会在用户消息里提供当前应用的完整代码，请你基于它做最小必要修改，保留未提及的原有功能和样式，然后输出修改后的完整新代码。`

function parseResult(content) {
  // 首选：直接 JSON
  try {
    const obj = JSON.parse(content)
    if (obj && typeof obj.html === 'string' && obj.html.trim()) {
      return { title: String(obj.title || '未命名应用').slice(0, 60), html: obj.html.trim() }
    }
  } catch {
    /* fall through */
  }
  // 兜底：从文本中提取 HTML
  let html = content
  const fence = content.match(/```(?:html)?\s*([\s\S]*?)```/i)
  if (fence) html = fence[1]
  const doc = html.match(/<!DOCTYPE html>[\s\S]*<\/html>/i) || html.match(/<html[\s\S]*<\/html>/i)
  if (doc) html = doc[0]
  return { title: '我的应用', html: html.trim() || content }
}

export async function generateApp({ prompt, currentHtml }) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('服务端未配置 DEEPSEEK_API_KEY')

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }]
  if (currentHtml) {
    messages.push({
      role: 'user',
      content: `这是我当前应用的完整代码：\n\`\`\`html\n${currentHtml}\n\`\`\`\n\n用户的新需求：${prompt}\n请基于上面的代码做最小必要修改，输出修改后的完整新代码（JSON 格式）。`
    })
  } else {
    messages.push({ role: 'user', content: `请生成一个应用，需求：${prompt}` })
  }

  // 100s 超时保护，避免请求悬挂
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 100000)
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
        messages,
        temperature: 0.5,
        max_tokens: 8192,
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

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error?.message || `LLM 请求失败(${res.status})`
    if (res.status === 402) throw new Error('API 余额不足，请检查 DeepSeek 账户余额')
    if (res.status === 401) throw new Error('API Key 无效')
    throw new Error(msg)
  }

  const content = data?.choices?.[0]?.message?.content
  if (!content) throw new Error('模型未返回内容')
  return parseResult(content)
}
