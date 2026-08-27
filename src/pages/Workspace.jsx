import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api, publishUrl } from '../api.js'
import { getCurrentUser, isOnboarded, markOnboarded } from '../user.js'
import ChatPanel from '../components/ChatPanel.jsx'
import PreviewFrame from '../components/PreviewFrame.jsx'
import Fireworks from '../components/Fireworks.jsx'
import PublishDialog from '../components/PublishDialog.jsx'
import UserMenu from '../components/UserMenu.jsx'
import FirstRunGuide from '../components/FirstRunGuide.jsx'
import CodeViewer from '../components/CodeViewer.jsx'

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
  const [device, setDevice] = useState('desktop')
  const [toast, setToast] = useState('')
  const [published, setPublished] = useState(false)
  const [fireworks, setFireworks] = useState(false)
  const [publishDialog, setPublishDialog] = useState(null)
  const [thinkingText, setThinkingText] = useState('')
  const [phase, setPhase] = useState(null) // 'thinking' | 'writing' | null
  const [showGuide, setShowGuide] = useState(false)
  const [showCode, setShowCode] = useState(false)

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

  async function handleSend(prompt) {
    if (generating) return
    setError('')
    setGenerating(true)
    setPhase('thinking')
    setThinkingText('')
    setMessages((m) => [...m, { role: 'user', content: prompt }])
    try {
      await api.generateStream(
        { appId: app?.id, prompt, userId: user?.id },
        {
          thinking: (d) => setThinkingText((t) => t + d.text),
          writing: () => setPhase('writing'),
          done: (d) => {
            setApp(d)
            if (!app?.id) setPublished(false)
            setMessages((m) => [...m, { role: 'assistant', content: `已生成「${d.title}」，可在右侧预览。继续描述你的修改想法即可迭代。` }])
          },
          error: (d) => {
            setError(d.message)
            setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${d.message}` }])
          }
        }
      )
    } catch (e) {
      setError(e.message)
      setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${e.message}` }])
    } finally {
      setGenerating(false)
      setPhase(null)
      setThinkingText('')
    }
  }

  async function publish() {
    if (!app?.id) return
    try {
      await api.publish(app.id, true)
      setPublished(true)
      setFireworks(true)
      const url = publishUrl(app.id)
      setTimeout(() => setPublishDialog({ url }), 500)
    } catch (e) {
      setError(e.message)
    }
  }

  function showPublishInfo() {
    if (!app?.id) return
    setPublishDialog({ url: publishUrl(app.id) })
  }

  async function unpublish() {
    if (!app?.id) return
    try {
      await api.publish(app.id, false)
      setPublished(false)
      flashToast('已取消发布')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="workspace">
      <header className="workspace-header">
        <div className="ws-title">
          <span className="logo-badge" style={{ width: 28, height: 28, fontSize: 14 }}>✦</span>
          <span>Mini Atoms</span>
          {app?.title && <span className="app-name">· {app.title}</span>}
        </div>
        <div className="ws-spacer" />
        <div className="seg">
          <button className={device === 'desktop' ? 'active' : ''} onClick={() => setDevice('desktop')}>桌面</button>
          <button className={device === 'mobile' ? 'active' : ''} onClick={() => setDevice('mobile')}>移动</button>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={() => setShowCode(true)} disabled={!app?.id}>代码</button>
        <button className="btn btn-sm btn-ghost" onClick={() => nav('/apps')}>我的应用</button>
        {published ? (
          <>
            <button className="btn btn-sm btn-ghost" onClick={unpublish}>取消发布</button>
            <button className="btn btn-sm btn-primary" onClick={showPublishInfo}>✅ 已发布</button>
          </>
        ) : (
          <button className="btn btn-sm btn-primary" onClick={publish} disabled={!app?.id}>🚀 发布</button>
        )}
        <UserMenu />
      </header>

      <div className="ws-body">
        <ChatPanel
          messages={messages}
          generating={generating}
          thinkingText={thinkingText}
          phase={phase}
          samples={SAMPLES}
          onSend={handleSend}
        />
        <PreviewFrame html={app?.html || ''} device={device} error={error} />
      </div>
      {toast && <div className="toast">{toast}</div>}
      {showGuide && <FirstRunGuide onClose={closeGuide} />}
      {showCode && <CodeViewer html={app?.html || ''} onClose={() => setShowCode(false)} />}
      <Fireworks active={fireworks} onDone={() => setFireworks(false)} />
      <PublishDialog url={publishDialog?.url} onClose={() => setPublishDialog(null)} />
    </div>
  )
}
