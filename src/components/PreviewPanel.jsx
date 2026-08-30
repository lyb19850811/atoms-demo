import { useEffect, useRef, useState } from 'react'
import { highlightCode } from '../lib/code.js'

// AtomsData 桥脚本：注入到 iframe，让生成的应用通过 window.AtomsData 读写持久化数据
// 应用代码用 `await AtomsData.get(key)` / `await AtomsData.set(key, value)` 存取数据（自动 JSON 序列化）
const ATOMS_BRIDGE = `<script data-atoms-inject>(function(){
  function call(op, key, value) {
    return new Promise(function(resolve, reject) {
      var id = 'd' + Date.now() + Math.random().toString(36).slice(2);
      function handler(e) {
        if (e.data && e.data.__atomsId === id) {
          window.removeEventListener('message', handler);
          if (e.data.error) reject(new Error(e.data.error)); else resolve(e.data.result);
        }
      }
      window.addEventListener('message', handler);
      parent.postMessage({ __atoms: true, __atomsId: id, op: op, key: key, value: value }, '*');
      setTimeout(function() { window.removeEventListener('message', handler); reject(new Error('AtomsData timeout')); }, 8000);
    });
  }
  function parse(v) { try { return JSON.parse(v); } catch (e) { return v; } }
  window.AtomsData = {
    get: function(key) { return call('get', key).then(parse); },
    set: function(key, value) { return call('set', key, JSON.stringify(value)); },
    remove: function(key) { return call('remove', key); },
    all: function() {
      return call('all').then(function(obj) {
        var out = {}; for (var k in obj) out[k] = parse(obj[k]); return out;
      });
    }
  };
})();</script>`

// 可视化编辑脚本：点元素改文本/颜色/字号，保存时回传完整 HTML
const EDIT_SCRIPT = `<script data-atoms-inject>(function(){
  var enabled = false, selected = null, panel = null, hovered = null;
  function rgbToHex(c) {
    var m = c.match(/\\d+/g);
    if (!m || m.length < 3) return '#000000';
    return '#' + m.slice(0, 3).map(function(x) { return (+x).toString(16).padStart(2, '0'); }).join('');
  }
  function snapshot() {
    var clone = document.documentElement.cloneNode(true);
    clone.querySelectorAll('[data-atoms-inject],.atoms-edit-ui').forEach(function(n) { n.remove(); });
    clone.querySelectorAll('*').forEach(function(n) { n.style.outline = ''; });
    return '<!DOCTYPE html>\\n' + clone.outerHTML;
  }
  function removePanel() { if (panel) { panel.remove(); panel = null; } }
  function select(el) {
    if (selected) selected.style.outline = '';
    selected = el;
    el.style.outline = '2px solid #3b82f6';
    showPanel(el);
  }
  function showPanel(el) {
    removePanel();
    panel = document.createElement('div');
    panel.className = 'atoms-edit-ui';
    panel.style.cssText = 'position:fixed;z-index:999999;background:#fff;border:1px solid #ddd;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.18);padding:12px;font:13px/1.5 -apple-system,sans-serif;width:230px;color:#111;';
    var r = el.getBoundingClientRect();
    panel.style.left = Math.max(4, Math.min(r.left, window.innerWidth - 250)) + 'px';
    panel.style.top = Math.max(4, r.top - 8) + 'px';
    panel.innerHTML =
      '<div style="font-weight:600;margin-bottom:8px;font-size:13px">编辑元素</div>' +
      '<label style="display:block;margin-bottom:6px">文本<input id="ae-text" style="width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;padding:4px 6px"></label>' +
      '<div style="display:flex;gap:6px;margin-bottom:6px">' +
      '<label style="flex:1;font-size:12px">文字色<input id="ae-color" type="color" style="width:100%;border:0;padding:0;height:26px"></label>' +
      '<label style="flex:1;font-size:12px">背景色<input id="ae-bg" type="color" style="width:100%;border:0;padding:0;height:26px"></label>' +
      '</div>' +
      '<label style="display:block;margin-bottom:10px;font-size:12px">字号(px)<input id="ae-size" type="number" min="8" max="120" style="width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;padding:4px 6px"></label>' +
      '<div style="display:flex;gap:6px"><button id="ae-save" style="flex:1;background:#3b82f6;color:#fff;border:0;border-radius:6px;padding:6px;cursor:pointer">保存</button><button id="ae-cancel" style="flex:1;background:#eee;border:0;border-radius:6px;padding:6px;cursor:pointer">取消</button></div>';
    document.body.appendChild(panel);
    var text = panel.querySelector('#ae-text');
    var color = panel.querySelector('#ae-color');
    var bg = panel.querySelector('#ae-bg');
    var size = panel.querySelector('#ae-size');
    var cs = getComputedStyle(el);
    text.value = (el.textContent || '').trim().slice(0, 200);
    color.value = rgbToHex(cs.color);
    var bgc = cs.backgroundColor;
    bg.value = (bgc === 'rgba(0, 0, 0, 0)' || bgc === 'transparent') ? '#ffffff' : rgbToHex(bgc);
    size.value = parseInt(cs.fontSize) || 16;
    text.oninput = function() { if (selected) selected.textContent = text.value; };
    color.oninput = function() { if (selected) selected.style.color = color.value; };
    bg.oninput = function() { if (selected) selected.style.backgroundColor = bg.value; };
    size.oninput = function() { if (selected) selected.style.fontSize = size.value + 'px'; };
    panel.querySelector('#ae-save').onclick = function() {
      parent.postMessage({ __atomsEdit: true, html: snapshot() }, '*');
      disable();
    };
    panel.querySelector('#ae-cancel').onclick = disable;
  }
  function enable() { enabled = true; }
  function disable() {
    enabled = false; removePanel();
    if (selected) { selected.style.outline = ''; selected = null; }
    if (hovered) { hovered.style.outline = ''; hovered = null; }
  }
  document.addEventListener('mouseover', function(e) {
    if (!enabled) return;
    var el = e.target;
    if (el.closest('.atoms-edit-ui')) return;
    if (hovered && hovered !== el) hovered.style.outline = '';
    hovered = el;
    el.style.outline = '2px dashed #3b82f6';
  }, true);
  document.addEventListener('mouseout', function(e) {
    if (!enabled) return;
    if (hovered === e.target) { hovered.style.outline = ''; hovered = null; }
  }, true);
  document.addEventListener('click', function(e) {
    if (!enabled) return;
    var el = e.target;
    if (el.closest('.atoms-edit-ui')) return;
    e.preventDefault(); e.stopPropagation();
    select(el);
  }, true);
  window.addEventListener('message', function(e) {
    if (!e.data || e.data.__atomsEditCmd !== true) return;
    if (e.data.enabled) enable(); else disable();
  });
})();</script>`

// 把桥脚本 + 编辑脚本注入到预览 HTML 的 <head>/<html> 之后
function injectScripts(html) {
  if (!html) return html
  if (html.includes('window.AtomsData')) return html
  const payload = ATOMS_BRIDGE + EDIT_SCRIPT
  const head = html.match(/<head[^>]*>/i)
  if (head) return html.replace(head[0], head[0] + payload)
  const htmlTag = html.match(/<html[^>]*>/i)
  if (htmlTag) return html.replace(htmlTag[0], htmlTag[0] + payload)
  return payload + html
}

// 中间栏：顶部「预览/代码」两个 tab；代码 tab 下再叠一层文件 tab
export default function PreviewPanel({ mode, onModeChange, previewHtml, tabs, activePath, onActivate, onClose, appId, onHtmlChange }) {
  const active = tabs.find((f) => f.path === activePath)
  const iframeRef = useRef(null)
  const appIdRef = useRef(appId)
  appIdRef.current = appId
  const onHtmlChangeRef = useRef(onHtmlChange)
  onHtmlChangeRef.current = onHtmlChange
  const [editing, setEditing] = useState(false)
  const editingRef = useRef(false)
  editingRef.current = editing

  // 代理 iframe 的 AtomsData 数据请求 + 可视化编辑保存
  useEffect(() => {
    function onMessage(e) {
      const d = e.data
      if (!d) return
      if (d.__atomsEdit) {
        onHtmlChangeRef.current?.(d.html)
        setEditing(false)
        return
      }
      if (!d.__atoms) return
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) return
      const { __atomsId, op, key, value } = d
      const id = appIdRef.current
      const reply = (payload) => iframeRef.current?.contentWindow?.postMessage({ __atomsId, ...payload }, '*')
      if (!id) return reply({ error: '应用尚未初始化' })
      const base = `/api/apps/${id}/data`
      const run = async () => {
        try {
          if (op === 'get' || op === 'all') {
            const url = op === 'get' && key ? `${base}?key=${encodeURIComponent(key)}` : base
            const res = await fetch(url)
            const j = await res.json()
            if (!res.ok) throw new Error(j.error || '读取失败')
            reply({ result: op === 'get' ? (key ? j.data[key] : j.data) : j.data })
          } else if (op === 'set') {
            const res = await fetch(base, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key, value })
            })
            const j = await res.json()
            if (!res.ok) throw new Error(j.error || '写入失败')
            reply({ result: true })
          } else if (op === 'remove') {
            const res = await fetch(base, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key })
            })
            const j = await res.json()
            if (!res.ok) throw new Error(j.error || '删除失败')
            reply({ result: true })
          }
        } catch (err) {
          reply({ error: err.message })
        }
      }
      run()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  function toggleEdit() {
    const next = !editing
    setEditing(next)
    iframeRef.current?.contentWindow?.postMessage({ __atomsEditCmd: true, enabled: next }, '*')
  }

  // iframe 重新加载后（srcDoc 变化），若编辑开启则重新下发
  function handleIframeLoad() {
    if (editingRef.current) {
      iframeRef.current?.contentWindow?.postMessage({ __atomsEditCmd: true, enabled: true }, '*')
    }
  }

  return (
    <div className="preview-panel">
      <div className="pp-top-tabs">
        <button className={mode === 'preview' ? 'active' : ''} onClick={() => onModeChange('preview')}>预览</button>
        <button className={mode === 'code' ? 'active' : ''} onClick={() => onModeChange('code')}>代码</button>
      </div>

      {mode === 'preview' ? (
        <div className="pp-preview">
          {previewHtml ? (
            <>
              <div className="pp-preview-toolbar">
                <button
                  className={`pp-edit-btn${editing ? ' active' : ''}`}
                  onClick={toggleEdit}
                  title="开启后点击预览中的元素直接改文本/颜色/字号"
                >
                  {editing ? '✓ 编辑中（点击元素修改，点保存回写）' : '✏️ 编辑'}
                </button>
              </div>
              <iframe
                ref={iframeRef}
                sandbox="allow-scripts allow-forms allow-modals"
                srcDoc={injectScripts(previewHtml)}
                title="预览"
                onLoad={handleIframeLoad}
              />
            </>
          ) : (
            <div className="preview-empty">
              <div className="big">🖥️</div>
              <p>暂无预览，生成应用后在这里查看</p>
            </div>
          )}
        </div>
      ) : (
        <div className="pp-code">
          <div className="pp-code-tabs">
            {tabs.map((f) => (
              <div
                key={f.path}
                className={`pp-file-tab${f.path === activePath ? ' active' : ''}`}
                onClick={() => onActivate(f.path)}
              >
                <span className="pp-file-name">{f.path.split('/').pop()}</span>
                <span
                  className="pp-file-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose(f.path)
                  }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
          <div className="pp-code-content">
            {active ? (
              <pre className="cv-code">
                <code dangerouslySetInnerHTML={{ __html: highlightCode(active.content, active.path) }} />
              </pre>
            ) : (
              <div className="preview-empty"><p>点击右侧产物文件，在代码标签中查看</p></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
