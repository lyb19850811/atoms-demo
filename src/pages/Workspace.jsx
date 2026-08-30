import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api, publishUrl } from '../api.js'
import { getCurrentUser, isOnboarded, markOnboarded } from '../user.js'
import { getAgent } from '../data/agents.js'
import ChatPanel from '../components/ChatPanel.jsx'
import PreviewPanel from '../components/PreviewPanel.jsx'
import Fireworks from '../components/Fireworks.jsx'
import PublishDialog from '../components/PublishDialog.jsx'
import UserMenu from '../components/UserMenu.jsx'
import FirstRunGuide from '../components/FirstRunGuide.jsx'
import ArtifactsPanel from '../components/ArtifactsPanel.jsx'

const SAMPLES = ['做一个番茄钟', '做一个待办清单', '做一个 BMI 计算器', '做一个成语接龙游戏']

export default function Workspace() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const user = getCurrentUser()
  const userId = user?.id
  const editId = params.get('edit')

  const [app, setApp] = useState(null) // { id, title, html, ... }
  const [messages, setMessages] = useState([])
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [published, setPublished] = useState(false)
  const [fireworks, setFireworks] = useState(false)
  const [publishDialog, setPublishDialog] = useState(null)
  const [thinkingAgent, setThinkingAgent] = useState(null)
  const [phase, setPhase] = useState(null) // 'thinking' | 'writing' | null
  const [showGuide, setShowGuide] = useState(false)
  const abortRef = useRef(null)
  const [teamMode, setTeamMode] = useState(false)
  const [plan, setPlan] = useState(null) // {id, title, plan}
  const [steps, setSteps] = useState([]) // 团队流水线步骤
  const [building, setBuilding] = useState(false)
  const [files, setFiles] = useState([]) // 团队模式项目文件
  const [entry, setEntry] = useState('')
  const [openTabs, setOpenTabs] = useState([]) // 右侧预览栏打开的文件标签
  const [activeTab, setActiveTab] = useState('')
  const [artifactsCollapsed, setArtifactsCollapsed] = useState(false)
  const [previewMode, setPreviewMode] = useState('preview') // 'preview' | 'code'

  useEffect(() => {
    if (!userId) {
      nav('/register')
      return
    }
    if (!isOnboarded()) setShowGuide(true)
    if (editId) {
      api
        .getApp(editId)
        .then((a) => {
          setApp(a)
          setMessages(a.messages || [])
          setPublished(!!a.published)
          if (a.mode === 'team' && a.files?.length) {
            setFiles(a.files)
            setEntry(a.entry)
            setOpenTabs(a.files)
            setActiveTab(a.entry || a.files[0].path)
          } else if (a.html) {
            const tabs = [{ path: 'index.html', content: a.html }]
            if (a.plan) tabs.push({ path: '计划.md', content: a.plan })
            setFiles([])
            setOpenTabs(tabs)
            setActiveTab('index.html')
          }
        })
        .catch((e) => setError(e.message))
    }
  }, [userId, editId, nav])

  function flashToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  function closeGuide() {
    markOnboarded()
    setShowGuide(false)
  }

  // 在右侧标签页打开文件（去重）
  function openFile(path) {
    const file = artifactFiles.find((f) => f.path === path)
    if (!file) return
    setActiveTab(path)
    setPreviewMode('code')
    setOpenTabs((tabs) => (tabs.some((t) => t.path === path) ? tabs : [...tabs, file]))
  }

  function closeTab(path) {
    const next = openTabs.filter((t) => t.path !== path)
    setOpenTabs(next)
    if (activeTab === path) setActiveTab(next[0]?.path || '')
  }

  async function handleSend(prompt, agent) {
    if (teamMode) {
      handleTeamSend(prompt)
      return
    }
    if (generating) return
    setError('')
    setGenerating(true)
    setPhase('thinking')
    setThinkingAgent('规划智能体')
    setMessages((m) => [...m, { role: 'user', content: prompt }])
    setPlan(null)
    setFiles([])
    setEntry('')
    const controller = new AbortController()
    abortRef.current = controller
    try {
      await api.plan(
        { prompt },
        {
          done_plan: (d) => {
            setPlan({ mode: 'single', title: d.title, plan: d.plan, agent, prompt, appId: app?.id })
            setMessages((m) => [...m, { role: 'assistant', content: '开发计划已生成，请确认或编辑后开始开发。' }])
          },
          error: (d) => {
            setError(d.message)
            setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${d.message}` }])
          }
        },
        controller.signal
      )
    } catch (e) {
      if (e.name === 'AbortError') {
        setMessages((m) => [...m, { role: 'assistant', content: '⏹ 已停止' }])
      } else {
        setError(e.message)
        setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${e.message}` }])
      }
    } finally {
      setGenerating(false)
      setPhase(null)
      setThinkingAgent(null)
      abortRef.current = null
    }
  }

  // 单文件模式：确认计划后执行生成
  async function confirmSingle(editedPlan) {
    if (!plan || generating) return
    const { prompt, agent, appId } = plan
    setError('')
    setGenerating(true)
    setPhase('thinking')
    setThinkingAgent(getAgent(agent).role)
    const controller = new AbortController()
    abortRef.current = controller
    try {
      await api.generateStream(
        { appId, prompt, userId: user?.id, agent, plan: editedPlan },
        {
          writing: () => setPhase('writing'),
          verifying: (d) => {
            setPhase('writing')
            setMessages((m) => [...m, { role: 'assistant', content: `🔍 自动质检发现 ${d.issues.length} 个问题，正在修复…` }])
          },
          verified: (d) => {
            setMessages((m) =>
              d.issues?.length
                ? [...m, { role: 'assistant', content: `⚠️ 修复后仍有 ${d.issues.length} 个问题` }]
                : [...m, { role: 'assistant', content: '✅ 自动修复完成' }]
            )
          },
          done: (d) => {
            setApp(d)
            if (!appId) setPublished(false)
            const agentName = getAgent(agent)?.name || '工程师'
            setPlan(null)
            setFiles([])
            setOpenTabs([{ path: 'index.html', content: d.html }])
            setActiveTab('index.html')
            setMessages((m) => [
              ...m,
              { role: 'assistant', content: `已由 ${agentName} 生成「${d.title}」，可在右侧预览。继续描述你的修改想法即可迭代。` }
            ])
          },
          error: (d) => {
            setError(d.message)
            setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${d.message}` }])
          }
        },
        controller.signal
      )
    } catch (e) {
      if (e.name === 'AbortError') {
        setMessages((m) => [...m, { role: 'assistant', content: '⏹ 已停止生成' }])
      } else {
        setError(e.message)
        setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${e.message}` }])
      }
    } finally {
      setGenerating(false)
      setPhase(null)
      setThinkingAgent(null)
      abortRef.current = null
    }
  }

  // 统一确认入口：单文件/团队分别分发
  function onConfirmPlan(editedPlan) {
    if (plan?.mode === 'team') confirmBuild(editedPlan)
    else confirmSingle(editedPlan)
  }

  function stopGeneration() {
    abortRef.current?.abort()
  }

  // 可视化编辑回写：更新本地状态并持久化产物 HTML
  async function handleHtmlChange(html) {
    if (!app?.id) return
    if (files.length > 0 && entry) {
      setFiles((fs) => fs.map((f) => (f.path === entry ? { ...f, content: html } : f)))
      setOpenTabs((ts) => ts.map((t) => (t.path === entry ? { ...t, content: html } : t)))
    } else {
      setApp((a) => ({ ...a, html }))
      setOpenTabs((ts) => ts.map((t) => (t.path === 'index.html' ? { ...t, content: html } : t)))
    }
    try {
      await api.updateHtml(app.id, html)
      flashToast('已保存编辑')
    } catch (e) {
      setError(e.message)
    }
  }

  async function handleTeamSend(prompt) {
    if (generating || building) return
    setError('')
    setGenerating(true)
    setPhase('thinking')
    setThinkingAgent('团队组长')
    setMessages((m) => [...m, { role: 'user', content: prompt }])
    setPlan(null)
    setSteps([])
    setFiles([])
    setEntry('')
    setApp(null)
    const controller = new AbortController()
    abortRef.current = controller
    try {
      await api.teamPlan(
        { prompt, userId: user?.id },
        {
          done_plan: (d) => {
            setPlan({ ...d, mode: 'team' })
            setApp({ id: d.id, title: d.title, mode: 'team', html: '' })
            setMessages((m) => [...m, { role: 'assistant', content: '团队计划已生成，请确认后开始开发。' }])
          },
          error: (d) => {
            setError(d.message)
            setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${d.message}` }])
          }
        },
        controller.signal
      )
    } catch (e) {
      if (e.name === 'AbortError') {
        setMessages((m) => [...m, { role: 'assistant', content: '⏹ 已停止' }])
      } else {
        setError(e.message)
        setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${e.message}` }])
      }
    } finally {
      setGenerating(false)
      setPhase(null)
      setThinkingAgent(null)
      abortRef.current = null
    }
  }

  async function confirmBuild(editedPlan) {
    if (!plan?.id || building) return
    setBuilding(true)
    setSteps([])
    setFiles([])
    setError('')
    const controller = new AbortController()
    abortRef.current = controller
    try {
      await api.teamBuild(
        { appId: plan.id, plan: editedPlan || plan.plan },
        {
          step_start: (d) => {
            setThinkingAgent(d.agentName)
            setSteps((s) => [...s, { seq: d.seq, agentId: d.agentId, agentName: d.agentName, task: d.task, status: 'running' }])
          },
          step_done: (d) => setSteps((s) => s.map((x) => (x.seq === d.seq ? { ...x, status: 'done' } : x))),
          done: (d) => {
            const fs = d.files || []
            setFiles(fs)
            setEntry(d.entry || '')
            setApp((a) => ({ ...(a || { id: d.id }), mode: 'team', entry: d.entry, title: d.title }))
            setPlan(null)
            setOpenTabs(fs)
            setActiveTab(d.entry || fs[0]?.path || '')
            setMessages((m) => [...m, { role: 'assistant', content: `团队已完成「${d.title}」，可在右侧浏览项目文件与预览。` }])
          },
          error: (d) => {
            setError(d.message)
            setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${d.message}` }])
          }
        },
        controller.signal
      )
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message)
    } finally {
      setBuilding(false)
      abortRef.current = null
    }
  }

  async function publish() {
    if (!app?.id) return
    try {
      await api.publish(app.id, true)
      setPublished(true)
      setFireworks(true)
      const url = publishUrl(app.id)
      setTimeout(() => setPublishDialog({ url, justPublished: true }), 500)
    } catch (e) {
      setError(e.message)
    }
  }

  function showPublishInfo() {
    if (!app?.id) return
    setPublishDialog({ url: publishUrl(app.id), justPublished: false })
  }

  async function unpublish() {
    if (!app?.id) return
    try {
      await api.publish(app.id, false)
      setPublished(false)
      setPublishDialog(null)
      flashToast('已取消发布')
    } catch (e) {
      setError(e.message)
    }
  }

  // 派生：中间栏产物文件列表
  // 派生：中间栏预览 HTML + 右侧产物文件列表
  const previewHtml = files.length > 0 ? (files.find((f) => f.path === entry)?.content || '') : (app?.html || '')
  const artifactFiles = files.length > 0
    ? files
    : [
        ...(app?.html ? [{ path: 'index.html', content: app.html }] : []),
        ...(app?.plan ? [{ path: '计划.md', content: app.plan }] : [])
      ]

  return (
    <div className="workspace">
      <header className="workspace-header">
        <div className="ws-title">
          <span className="logo-badge" style={{ width: 28, height: 28, fontSize: 14 }}>✦</span>
          <span>Mini Atoms</span>
          {app?.title && <span className="app-name">· {app.title}</span>}
        </div>
        <div className="ws-spacer" />
        <button className="btn btn-sm btn-ghost" onClick={() => nav('/apps')}>我的应用</button>
        {published ? (
          <button className="btn btn-sm btn-primary" onClick={showPublishInfo}>✅ 已发布</button>
        ) : (
          <button className="btn btn-sm btn-primary" onClick={publish} disabled={!app?.id}>🚀 发布</button>
        )}
        <UserMenu />
      </header>

      <div className={`ws-body${artifactsCollapsed ? ' artifacts-collapsed' : ''}`}>
        <ChatPanel
          messages={messages}
          generating={generating || building}
          thinkingAgent={thinkingAgent}
          phase={phase}
          samples={SAMPLES}
          onSend={handleSend}
          onStop={stopGeneration}
          teamMode={teamMode}
          onToggleTeamMode={() => setTeamMode((v) => !v)}
          plan={plan}
          steps={steps}
          building={building}
          onConfirmPlan={onConfirmPlan}
        />
        <PreviewPanel
          mode={previewMode}
          onModeChange={setPreviewMode}
          previewHtml={previewHtml}
          tabs={openTabs}
          activePath={activeTab}
          onActivate={setActiveTab}
          onClose={closeTab}
          appId={app?.id}
          onHtmlChange={handleHtmlChange}
        />
        <ArtifactsPanel
          files={artifactFiles}
          activePath={activeTab}
          onOpenFile={openFile}
          collapsed={artifactsCollapsed}
          onToggle={() => setArtifactsCollapsed((v) => !v)}
        />
      </div>
      {toast && <div className="toast">{toast}</div>}
      {showGuide && <FirstRunGuide onClose={closeGuide} />}
      <Fireworks active={fireworks} onDone={() => setFireworks(false)} />
      <PublishDialog
        url={publishDialog?.url}
        justPublished={publishDialog?.justPublished}
        onUnpublish={unpublish}
        onClose={() => setPublishDialog(null)}
      />
    </div>
  )
}
