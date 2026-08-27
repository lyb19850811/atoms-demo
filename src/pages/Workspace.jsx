import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api, shareUrl, publishUrl } from '../api.js'
import { getCurrentUser } from '../user.js'
import ChatPanel from '../components/ChatPanel.jsx'
import PreviewFrame from '../components/PreviewFrame.jsx'
import Fireworks from '../components/Fireworks.jsx'
import PublishDialog from '../components/PublishDialog.jsx'

const SAMPLES = ['做一个番茄钟', '做一个待办清单', '做一个 BMI 计算器', '做一个成语接龙游戏']

export default function Workspace() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const user = getCurrentUser()
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

  useEffect(() => {
    if (!user) {
      nav('/register')
      return
    }
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
  }, [user, editId, nav])

  function flashToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  async function handleSend(prompt) {
    if (generating) return
    setError('')
    setGenerating(true)
    setMessages((m) => [...m, { role: 'user', content: prompt }])
    try {
      const res = await api.generate({ appId: app?.id, prompt, userId: user?.id })
      setApp(res)
      if (!app?.id) setPublished(false)
      setMessages((m) => [...m, { role: 'assistant', content: `已生成「${res.title}」，可在右侧预览。继续描述你的修改想法即可迭代。` }])
    } catch (e) {
      setError(e.message)
      setMessages((m) => [...m, { role: 'assistant', content: `⚠️ ${e.message}` }])
    } finally {
      setGenerating(false)
    }
  }

  function copyText(text, prefix) {
    navigator.clipboard.writeText(text).then(() => flashToast(prefix + text)).catch(() => flashToast(text))
  }

  function copyShare() {
    if (!app?.id) return
    copyText(shareUrl(app.id), '分享链接已复制：')
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
        <button className="btn btn-sm btn-ghost" onClick={() => nav('/apps')}>我的应用</button>
        <button className="btn btn-sm btn-ghost" onClick={copyShare} disabled={!app?.id}>🔗 分享</button>
        {published ? (
          <>
            <button className="btn btn-sm btn-ghost" onClick={unpublish}>取消发布</button>
            <button className="btn btn-sm btn-primary" onClick={showPublishInfo}>✅ 已发布</button>
          </>
        ) : (
          <button className="btn btn-sm btn-primary" onClick={publish} disabled={!app?.id}>🚀 发布</button>
        )}
      </header>

      <div className="ws-body">
        <ChatPanel
          messages={messages}
          generating={generating}
          samples={SAMPLES}
          onSend={handleSend}
        />
        <PreviewFrame html={app?.html || ''} device={device} error={error} />
      </div>
      {toast && <div className="toast">{toast}</div>}
      <Fireworks active={fireworks} onDone={() => setFireworks(false)} />
      <PublishDialog url={publishDialog?.url} onClose={() => setPublishDialog(null)} />
    </div>
  )
}
