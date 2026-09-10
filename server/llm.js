// LLM Provider 抽象层：目前对接 DeepSeek（流式），可通过环境变量切换 base/model
const BASE = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'
const FALLBACK_MODEL = process.env.DEEPSEEK_FALLBACK_MODEL || 'deepseek-v4-flash'

// 通用输出格式规则（单文件模式）
const THINKING_HINT = `\n\n【思考要求】不要展开思考，直接列出你的产出要点清单，每条一句话，然后立即输出 JSON。`

const OUTPUT_RULES = `严格输出规则：
1. 只输出一个 JSON 对象，格式为 {"title":"简短标题","html":"完整HTML代码字符串"}。不要输出任何其他文字、解释或 markdown 代码块标记。
2. html 必须是完整自包含的单文件 HTML（包含 <!DOCTYPE html>），所有 CSS 写在 <style> 内，所有 JS 写在 <script> 内。
3. 禁止引用任何外部资源：不要 <link>、<script src>、@import、外部图片/字体/CDN。图标用 emoji 或内联 SVG。
4. 禁止使用 localStorage/sessionStorage/cookie，也不要发网络请求（fetch/XMLHttpRequest）。若应用需要持久化数据（待办事项、笔记、用户设置、统计数据等），使用全局对象 AtomsData 的异步方法：await AtomsData.get(key) 读取（返回反序列化后的值，无则 undefined）、await AtomsData.set(key, value) 写入（value 可为对象/数组/字符串，自动序列化）、await AtomsData.remove(key) 删除、await AtomsData.all() 读取全部。这些方法返回 Promise，须在 async 函数中 await；数据会跨会话持久保存。
5. 界面精美现代：合适的配色、留白、圆角、阴影、字体层级，桌面端和移动端都好看。

当用户是「修改」需求时，我会在用户消息里提供当前内容的完整代码，请基于它做最小必要修改，保留未提及的原有部分，然后输出修改后的完整新代码。`

// 各智能体角色的系统提示词（单文件模式）
const AGENT_PROMPTS = {
  engineer: {
    name: '工程师',
    system: `你是 Mini Atoms 的应用生成引擎，角色是资深工程师。目标：写出正确、完整、健壮、可维护的代码。

【硬性约束】
- COMPLETE CODE：输出完整可运行的代码，DON'T 留 TODO、占位符或省略号。
- 代码正确可运行：逻辑正确，处理空值、边界、异常，避免运行时错误。
- 交互真实可用：每个按钮、输入框都要有可用的逻辑，能响应用户操作，状态更新后重新渲染界面。

【交互正确性】输出前逐条核查：
- 输入类控件：连续点击/输入必须「拼接」而非「覆盖」（例如数字键用 display += '3'，绝不用 display = '3'，否则无法输入多位数）。
- 运算类：正确处理运算符优先级、连续运算、小数、除零防护。
- 列表/数据类：增删改查逻辑完整，数据用 AtomsData 持久化，刷新后能恢复。

${OUTPUT_RULES}`
  },
  pm: {
    name: '产品经理',
    system: `你是 Mini Atoms 的产品经理智能体。把用户的描述整理成一份清晰的产品需求文档（PRD），用单文件 HTML 精美排版呈现。
- PRD 应包含：产品概述、目标用户、核心功能列表、用户故事与交互流程、成功指标。
${OUTPUT_RULES}`
  },
  architect: {
    name: '架构师',
    system: `你是 Mini Atoms 的架构师智能体。把用户的需求整理成一份技术架构设计方案，用单文件 HTML 精美排版呈现。
- 架构文档应包含：技术选型、模块划分、数据流、目录结构、关键设计决策。
${OUTPUT_RULES}`
  },
  designer: {
    name: '设计师',
    system: `你是 Mini Atoms 的设计师智能体。针对用户的需求，输出一份 UI/UX 设计方案，用单文件 HTML 精美排版呈现。
- 设计方案应包含：色彩方案、字体层级、布局栅格、组件清单、交互说明、暗色/亮色适配。
${OUTPUT_RULES}`
  },
  research: {
    name: '深度研究',
    system: `你是 Mini Atoms 的深度研究智能体。针对用户提出的主题，输出一份简明的调研报告，用单文件 HTML 精美排版呈现。
- 报告应包含：背景、关键发现（分点）、对比分析、结论与建议。
${OUTPUT_RULES}`
  },
  data: {
    name: '数据分析师',
    system: `你是 Mini Atoms 的数据分析师智能体。针对用户的问题，输出一份数据分析报告，用单文件 HTML 精美排版呈现。
- 报告应包含：数据说明、关键指标、分析结论、可视化要点（可用内联 SVG / CSS 图表）。
${OUTPUT_RULES}`
  },
  qa: {
    name: '质检',
    system: `你是 Mini Atoms 的质检智能体。针对用户的需求或描述，输出一份质量检查报告（测试要点、潜在风险、改进建议），用单文件 HTML 精美排版呈现。
${OUTPUT_RULES}`
  },
  leader: {
    name: '团队组长',
    system: `你是 Mini Atoms 的团队组长。针对用户的需求，输出一份项目计划（目标、任务拆解、实施步骤、风险），用单文件 HTML 精美排版呈现。
${OUTPUT_RULES}`
  }
}

// 团队模式各阶段智能体（输出多文件项目）
const TEAM_AGENTS = {
  leader: {
    name: '团队组长',
    system: `你是 Mini Atoms 的团队组长 Mike。用户会描述一个需求，你把它拆解成一个清晰的开发计划。
严格输出一个 JSON 对象，格式：{"title":"简短项目名","plan":"markdown 格式的开发计划"}
- plan 用 markdown，应包含：项目概述、功能拆解、技术栈建议、实施步骤。
- 团队将按「产品经理 → 架构师/设计师并行 → 工程师」的流水线接力实现，你只需给出高质量的计划。`
  },
  pm: {
    name: '产品经理',
    system: `你是 Mini Atoms 的产品经理智能体。根据用户需求与团队计划，输出一份产品需求文档（PRD）。
严格输出一个 JSON 对象，格式：{"summary":"一句话摘要","files":[{"path":"docs/requirements.md","content":"markdown 格式的 PRD"}]}
- PRD 应包含：产品概述、目标用户、核心功能、用户故事、成功指标。`
  },
  architect: {
    name: '架构师',
    system: `你是 Mini Atoms 的架构师智能体。根据需求与 PRD，输出技术架构设计方案。
严格输出一个 JSON 对象，格式：{"summary":"一句话摘要","files":[{"path":"docs/architecture.md","content":"markdown 架构文档"}]}
- 架构文档应包含：技术选型、模块划分、数据模型、目录结构、关键设计决策。`
  },
  designer: {
    name: '设计师',
    system: `你是 Mini Atoms 的 UI 设计师智能体。根据需求与产品经理 PRD，输出 UI/视觉设计规范。
严格输出一个 JSON 对象，格式：{"summary":"一句话摘要","files":[{"path":"docs/design.md","content":"markdown 格式的 UI 设计规范"}]}
- 设计规范应包含：配色方案、字体与层级、布局结构、组件清单、关键交互细节（与 PRD 对齐）。`
  },
  engineer: {
    name: '工程师',
    system: `你是 Mini Atoms 的全栈工程师智能体。根据需求、PRD、架构方案、UI 设计规范，生成一个可运行的前端页面 + 后端代码骨架。
严格输出一个 JSON 对象，格式：{"summary":"一句话摘要","entry":"frontend/index.html","files":[{"path":"...","content":"..."}, ...]}
files 至少包含：
- frontend/index.html：完整自包含的单文件 HTML（CSS 在 <style>、JS 在 <script>、禁止外部资源、真实可交互、可作为预览入口）。交互逻辑严格遵循 PRD、架构方案与 UI 设计规范中的定义。
- backend/main.py：FastAPI 应用骨架（含路由占位与数据模型）
- backend/models.py：数据模型
- requirements.txt
- README.md：项目说明`
  }
}

export function getAgentInfo(agent) {
  return AGENT_PROMPTS[agent] || AGENT_PROMPTS.engineer
}

export function getTeamAgent(agent) {
  return TEAM_AGENTS[agent] || TEAM_AGENTS.engineer
}

function buildSingleMessages(agentDef, prompt, currentHtml, plan) {
  const messages = [{ role: 'system', content: agentDef.system + THINKING_HINT }]
  if (currentHtml) {
    messages.push({
      role: 'user',
      content: `这是我当前内容的完整代码：\n\`\`\`html\n${currentHtml}\n\`\`\`\n\n用户的新需求：${prompt}\n请基于上面的代码做最小必要修改，输出修改后的完整新代码（JSON 格式）。`
    })
  } else {
    messages.push({ role: 'user', content: `任务：${prompt}` })
  }
  return messages
}

// 从文本中稳健地提取 JSON 对象（处理直接 JSON、--- 前缀、markdown 代码块、包裹文本等）
export function extractJson(text) {
  if (!text) return null
  let t = text.trim()
  try {
    const o = JSON.parse(t)
    if (o && typeof o === 'object') return o
  } catch {
    /* continue */
  }
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) {
    try {
      return JSON.parse(fence[1].trim())
    } catch {
      /* continue */
    }
  }
  t = t.replace(/^---+\s*/, '').trim()
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

export function parseResult(text) {
  const obj = extractJson(text)
  if (obj && typeof obj.html === 'string' && obj.html.trim()) {
    return { title: String(obj.title || '未命名').slice(0, 60), html: obj.html.trim() }
  }
  let html = text || ''
  const fence = html.match(/```(?:html)?\s*([\s\S]*?)```/i)
  if (fence) html = fence[1]
  const doc = html.match(/<!DOCTYPE html>[\s\S]*<\/html>/i) || html.match(/<html[\s\S]*<\/html>/i)
  if (doc) html = doc[0]
  html = html.trim()
  return { title: '我的应用', html }
}

// 冗长推理异常：推理超过阈值仍未产出内容（触发非推理模型回退）
class VerboseReasoningError extends Error {
  constructor() {
    super('verbose reasoning')
    this.name = 'VerboseReasoningError'
  }
}

// 底层流式调用：逐块产出 thinking/content，结束产出 done { content, reasoning }
// opts.model：模型名；opts.maxReasoning：推理长度阈值，超过且无内容则抛 VerboseReasoningError
async function* rawStream(messages, { model = MODEL, maxReasoning = 10000 } = {}) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('服务端未配置 DEEPSEEK_API_KEY')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 180000)
  let res
  try {
    res = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0,
        max_tokens: 32768,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    })
  } catch (e) {
    clearTimeout(timer)
    if (e.name === 'AbortError') throw new Error('生成超时，请重试')
    throw new Error(`无法连接模型服务：${e.message}`)
  }

  if (!res.ok) {
    clearTimeout(timer)
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

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()
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
            if (reasoning.length > maxReasoning && content.length === 0) {
              throw new VerboseReasoningError()
            }
          }
          if (delta.content) {
            content += delta.content
            yield { type: 'content', text: delta.content }
          }
        } catch (e) {
          if (e instanceof VerboseReasoningError) throw e
          /* 忽略无法解析的行 */
        }
      }
    }
  } catch (e) {
    if (e instanceof VerboseReasoningError) throw e
    if (e.name === 'AbortError') throw new Error('生成超时，请重试')
    throw e
  } finally {
    clearTimeout(timer)
    try {
      controller.abort()
    } catch {
      /* ignore */
    }
  }
  yield { type: 'done', content, reasoning }
}

// 通用流式补全：给定 system + user，产出 thinking/content/done{content}
export async function* streamCompletion({ system, user }) {
  const messages = [{ role: 'system', content: system + THINKING_HINT }, { role: 'user', content: user }]
  try {
    yield* rawStream(messages)
  } catch (e) {
    if (e instanceof VerboseReasoningError) {
      yield* rawStream(messages, { model: FALLBACK_MODEL, maxReasoning: Infinity })
    } else {
      throw e
    }
  }
}

// 规划智能体：为单文件应用生成一份简洁开发计划
export async function* streamPlan({ prompt }) {
  const system = `你是 Mini Atoms 的规划智能体。用户会描述一个应用需求，你输出一份开发计划，供工程师据此实现。
严格输出一个 JSON 对象：{"title":"简短应用名","plan":"markdown 计划"}
plan 保持简洁（总长不超过 400 字），包含四部分，每部分 1-2 句：
1. 功能设计：应用做什么。
2. 界面布局：主要区块。
3. 交互逻辑：关键交互行为与边界（例如数字键要拼接输入多位数、列表要支持增删、除零要提示）。
4. 视觉风格：配色风格。`
  let content = ''
  for await (const c of streamCompletion({ system, user: `需求：${prompt}` })) {
    if (c.type === 'content') content += c.text
    else if (c.type === 'done') content = c.content
  }
  const obj = extractJson(content) || {}
  yield { type: 'done', title: obj.title || '我的应用', plan: obj.plan || content }
}

// 单文件模式：流式生成应用
//   产出 { type:'thinking' } { type:'writing' } { type:'done', title, html }
export async function* streamGenerate({ prompt, currentHtml, agent, plan }) {
  const agentDef = getAgentInfo(agent)
  const messages = buildSingleMessages(agentDef, prompt, currentHtml, plan)
  let content = ''
  let reasoning = ''
  try {
    for await (const c of rawStream(messages)) {
      if (c.type === 'content') {
        content += c.text
        yield { type: 'writing', text: c.text }
      } else if (c.type === 'done') {
        content = c.content
        reasoning = c.reasoning
      }
    }
  } catch (e) {
    if (e instanceof VerboseReasoningError) {
      // 回退到快速档模型（稳定）
      for await (const c of rawStream(messages, { model: FALLBACK_MODEL, maxReasoning: Infinity })) {
        if (c.type === 'content') {
          content += c.text
          yield { type: 'writing', text: c.text }
        } else if (c.type === 'done') {
          content = c.content
        }
      }
    } else {
      throw e
    }
  }
  let result = parseResult(content)
  if (!result.html) result = parseResult(reasoning)
  if (!result.html) throw new Error('模型未能生成有效内容，请重试')
  yield { type: 'done', title: result.title, html: result.html }
}

// 静态质量检查：生成 HTML 后识别常见缺陷（不执行代码，仅规则 + 语法检查）
export function validateHtml(html) {
  const issues = []
  if (!html || !html.trim()) return ['HTML 内容为空']
  if (!/<\/html>/i.test(html)) issues.push('缺少 </html> 闭合标签')
  if (!/<script[\s>]/i.test(html)) issues.push('缺少 <script>：应用是纯静态展示，不符合「真实可交互」要求')
  if (/<link[^>]+href\s*=\s*["']https?:\/\//i.test(html)) issues.push('引用了外部 CSS')
  if (/<script[^>]+src\s*=\s*["']https?:\/\//i.test(html)) issues.push('引用了外部 JS')
  if (/@import/i.test(html)) issues.push('使用了 @import 引入外部样式')
  if (/url\(\s*["']?https?:\/\//i.test(html)) issues.push('引用了外部图片/资源')
  if (/localStorage|sessionStorage|document\.cookie/i.test(html)) issues.push('使用了 localStorage/sessionStorage/cookie（沙箱禁止，应改用 AtomsData）')
  if (/fetch\s*\(|XMLHttpRequest/i.test(html)) issues.push('使用了网络请求（沙箱禁止，应改用 AtomsData）')
  const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).filter((s) => s.trim())
  for (const s of scripts) {
    try {
      // eslint-disable-next-line no-new-func
      new Function(s)
    } catch (e) {
      issues.push(`script 语法错误：${e.message}`)
      break
    }
  }
  return issues
}

// 质检修复：把问题列表喂回模型，返回修复后的 HTML
export async function repairHtml(html, issues) {
  const system = `你是 Mini Atoms 的质检修复智能体。生成的应用 HTML 存在若干问题，请修复后输出完整的新 HTML。
严格输出一个 JSON 对象：{"html":"修复后的完整 HTML 代码字符串"}。不要输出任何其他文字或解释。
修复要求：
- 只修复列出的问题，保持原有功能与视觉风格不变。
- 保持 HTML 完整自包含：无外部资源引用、CSS 在 <style> 内、JS 在 <script> 内。
- 持久化数据使用 AtomsData（禁止 localStorage / fetch / XMLHttpRequest）。
- 确保应用真实可交互。`
  let content = ''
  const user = `问题列表：\n${issues.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n\n原始 HTML：\n\`\`\`html\n${html}\n\`\`\``
  for await (const c of streamCompletion({ system, user })) {
    if (c.type === 'content') content += c.text
    else if (c.type === 'done') content = c.content
  }
  const obj = extractJson(content) || {}
  const repaired = (obj.html && String(obj.html).trim()) || parseResult(content).html
  return repaired || html
}
