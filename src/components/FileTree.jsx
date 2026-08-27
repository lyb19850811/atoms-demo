// 简单文件树（按目录分组）
function buildTree(files) {
  const root = { dirs: new Map(), files: [] }
  for (const f of files) {
    const parts = f.path.split('/')
    let node = root
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node.dirs.has(parts[i])) node.dirs.set(parts[i], { dirs: new Map(), files: [] })
      node = node.dirs.get(parts[i])
    }
    node.files.push(f.path)
  }
  return root
}

function iconOf(path) {
  if (path.endsWith('.html')) return '🌐'
  if (path.endsWith('.md')) return '📄'
  if (path.endsWith('.py')) return '🐍'
  if (path.endsWith('.txt')) return '📃'
  if (path.endsWith('.json')) return '🧾'
  return '📄'
}

function TreeNode({ node, prefix, selectedPath, onSelect }) {
  const items = []
  for (const [dir, child] of node.dirs) {
    items.push(
      <div key={'d:' + prefix + dir} className="filetree-dir">
        📁 {dir}
        <TreeNode node={child} prefix={prefix + dir + '/'} selectedPath={selectedPath} onSelect={onSelect} />
      </div>
    )
  }
  for (const path of node.files) {
    items.push(
      <div
        key={'f:' + path}
        className={`filetree-file${path === selectedPath ? ' active' : ''}`}
        onClick={() => onSelect?.(path)}
      >
        {iconOf(path)} {path.split('/').pop()}
      </div>
    )
  }
  return <div className="filetree-children">{items}</div>
}

export default function FileTree({ files, selectedPath, onSelect }) {
  const tree = buildTree(files || [])
  return (
    <div className="filetree">
      <TreeNode node={tree} prefix="" selectedPath={selectedPath} onSelect={onSelect} />
    </div>
  )
}
