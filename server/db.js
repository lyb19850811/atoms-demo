import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

// 用 Node 内置 SQLite：零原生依赖，本地/服务器行为一致，部署简单
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'data')
fs.mkdirSync(dataDir, { recursive: true })

const db = new DatabaseSync(path.join(dataDir, 'atoms.db'))
db.exec('PRAGMA journal_mode = WAL')

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,
  nickname   TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS apps (
  id         TEXT PRIMARY KEY,
  user_id    TEXT,
  title      TEXT NOT NULL,
  prompt     TEXT NOT NULL,
  html       TEXT NOT NULL,
  mode       TEXT NOT NULL DEFAULT 'single',
  status     TEXT NOT NULL DEFAULT 'idle',
  plan       TEXT,
  entry      TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_apps_user ON apps(user_id);

CREATE TABLE IF NOT EXISTS files (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id     TEXT NOT NULL,
  path       TEXT NOT NULL,
  content    TEXT NOT NULL,
  kind       TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE(app_id, path)
);
CREATE INDEX IF NOT EXISTS idx_files_app ON files(app_id);

CREATE TABLE IF NOT EXISTS steps (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id     TEXT NOT NULL,
  seq        INTEGER NOT NULL,
  agent_id   TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  task       TEXT NOT NULL,
  status     TEXT NOT NULL,
  output     TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_steps_app ON steps(app_id);

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id     TEXT NOT NULL,
  role       TEXT NOT NULL,
  content    TEXT NOT NULL,
  thinking   TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_messages_app ON messages(app_id);
`)

// 迁移：为旧库的 apps 表补充列
const appCols = db.prepare('PRAGMA table_info(apps)').all()
const appColNames = new Set(appCols.map((c) => c.name))
const appMigrations = [
  ['published', 'INTEGER NOT NULL DEFAULT 0'],
  ['mode', "TEXT NOT NULL DEFAULT 'single'"],
  ['status', "TEXT NOT NULL DEFAULT 'idle'"],
  ['plan', 'TEXT'],
  ['entry', 'TEXT']
]
for (const [col, def] of appMigrations) {
  if (!appColNames.has(col)) {
    db.exec(`ALTER TABLE apps ADD COLUMN ${col} ${def}`)
  }
}

// 迁移：为旧库的 messages 表补充 thinking 列（保存模型思考过程）
const msgCols = db.prepare('PRAGMA table_info(messages)').all()
if (!msgCols.some((c) => c.name === 'thinking')) {
  db.exec('ALTER TABLE messages ADD COLUMN thinking TEXT')
}

export default db
