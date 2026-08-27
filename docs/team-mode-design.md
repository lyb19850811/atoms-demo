# 团队模式（Multi-Agent）改造技术设计

> 目标：把当前「单智能体生成单文件 HTML」升级为「多智能体团队协作生成完整项目」，
> 对齐 Atoms 团队模式的体验（规划 → 确认 → 多智能体接力 → 项目文件树 + IDE 浏览）。

## 1. 现状与目标

**现状**
- 单次 LLM 调用 → 生成单文件 HTML → 存入 `apps.html` → iframe 预览。
- 单智能体（用户选一个角色，各自有 system prompt）。
- 界面：聊天 + 预览。

**目标（团队模式）**
- Team Leader 先规划 → 用户确认 → 多个专业智能体接力（产品经理/架构师/工程师）→ 产出多文件项目。
- 界面：聊天 + 文件树 + 编辑器/预览。

**核心取舍（必须提前声明）**
- 团队模式产出的是「完整项目代码」，但**后端/数据库无法在 demo 里真正运行**；
- 只能：前端入口静态预览 + 后端/配置作为代码浏览。这是「完整项目」在 demo 落地的硬约束。

---

## 2. 数据模型改造

在现有 `users / apps / messages` 之上扩展：

```sql
-- apps 表扩展（含迁移）
ALTER TABLE apps ADD COLUMN mode   TEXT NOT NULL DEFAULT 'single'; -- 'single' | 'team'
ALTER TABLE apps ADD COLUMN status TEXT NOT NULL DEFAULT 'idle';   -- idle|planning|awaiting_confirm|building|done
ALTER TABLE apps ADD COLUMN plan   TEXT;      -- 团队模式的计划（markdown）
ALTER TABLE apps ADD COLUMN entry  TEXT;      -- 预览入口文件路径，如 frontend/index.html

-- 项目文件（团队模式产物）
CREATE TABLE IF NOT EXISTS files (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id     TEXT NOT NULL,
  path       TEXT NOT NULL,          -- 相对路径 backend/main.py / frontend/index.html
  content    TEXT NOT NULL,
  kind       TEXT,                   -- frontend|backend|config|doc
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE(app_id, path)
);

-- 智能体执行步骤（团队流水线记录，对应截图里「已处理 N 步」）
CREATE TABLE IF NOT EXISTS steps (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id     TEXT NOT NULL,
  seq        INTEGER NOT NULL,
  agent_id   TEXT NOT NULL,          -- leader/pm/architect/engineer/...
  agent_name TEXT NOT NULL,
  task       TEXT NOT NULL,
  status     TEXT NOT NULL,          -- pending|running|done|failed
  output     TEXT,                   -- 步骤产出摘要
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

**为什么**：多文件项目需要按路径存取（文件树/编辑器依赖）；`steps` 用于展示「哪个智能体做了哪一步」，是团队协作可视化的数据来源；`plan/status` 支撑「计划-确认」状态机。

---

## 3. 编排与生成层（Orchestrator）

新增 `server/lib/orchestrator.js`，负责团队模式的编排。

### 3.1 两阶段 API（比单条长 SSE 更易实现确认暂停）

```
POST /api/team/plan    body: { appId?, prompt, userId? }
  阶段一：Team Leader 规划，流式输出「计划」，写 apps.plan，status=awaiting_confirm
  SSE 事件：
    meta       {agentId:'leader', agentName:'团队组长'}
    thinking   {text}           # 真实思考
    plan       {plan}           # 计划 markdown（可流式追加）
    done_plan  {plan, title}    # 结束，前端显示计划 + 「确认」按钮

POST /api/team/build   body: { appId, confirmedPlan? }
  阶段二：用户确认后，按固定流水线执行各专业智能体
  SSE 事件：
    step_start {seq, agentId, agentName, task}
    thinking   {text}
    files      {files:[{path, content}]}   # 该步骤产出的文件
    step_done  {seq, agentId, summary}
    ...（依次走完流水线）
    done       {title, entry, files:[...]}
```

### 3.2 固定流水线（MVP，先不做自由函数调用 DAG）

| seq | 智能体 | 任务 | 产出 |
|----|--------|------|------|
| 1 | 产品经理 (pm) | 把需求整理成 PRD | `docs/requirements.md` |
| 2 | 架构师 (architect) | 技术选型 + 模块 + 数据模型 | `docs/architecture.md` |
| 3 | 工程师 (engineer) | 生成项目代码（前端可预览 + 后端结构） | `frontend/index.html`、`backend/*.py`、`README.md`、`requirements.txt` |

**为什么固定流水线**：完整的多智能体自由编排需要 function calling + 任务 DAG + 依赖解析，复杂度极高；固定 3 阶段接力已能体现「多智能体分工协作 + 规划确认」的本质，且可控、可测试。

### 3.3 智能体输出契约（约定协议）

每个流水线智能体的 system prompt 要求输出 JSON：

```json
{
  "summary": "本步骤摘要",
  "files": [ { "path": "frontend/index.html", "content": "..." } ]
}
```

Orchestrator 把 `files` 写入 `files` 表，`summary` 写入 `steps`。`entry` 由工程师阶段指定（前端入口文件）。

**函数调用（agent 互相 @调用 / draft_plan 等）**：MVP 不实现，用「固定流水线 + 输出契约」替代；后续可升级为 DeepSeek function calling（把「调用某智能体」「写文件」建模为 tool call）。

---

## 4. 计划-确认状态机

`apps.status` 状态流转：

```
idle ──提交──> planning ──Team Leader 输出计划──> awaiting_confirm
      ──用户点「确认」──> building ──流水线各步 done──> done
      ──用户点「取消/改需求」──> 回到 idle（或重新 planning）
```

- `planning/awaiting_confirm` 由 `/api/team/plan` 完成；
- `building/done` 由 `/api/team/build` 完成；
- 两个请求之间前端用 `status` 判断该显示「计划 + 确认按钮」还是「流水线步骤」。

**为什么**：Atoms 团队模式「先方案、确认后再开发」是工程思维的核心体现，也是人机协作（human-in-the-loop）的关键交互，评审一眼能看懂。

---

## 5. 前端界面改造

### 5.1 团队模式开关接真实逻辑

`FeatureMenu` 的「团队模式」开关不再占位：开启后走 team 流程，关闭走 single 流程（现有）。

### 5.2 工作台三栏布局（仅团队模式）

```
+---------------+------------------+----------------------+
| 对话（chat）   | 文件树（filetree） | 编辑器/预览（viewer）  |
|  - 计划卡       | backend/         |  [预览][代码] 标签      |
|  - 步骤卡       | frontend/        |  （选中文件高亮）        |
|  - 确认按钮     | docs/            |                       |
+---------------+------------------+----------------------+
```

新增/改造组件：
- `TeamPipeline`：对话中渲染「计划卡 + 各步骤卡（智能体头像/任务/状态）」，替代单一 thinking 流。
- `FileTree`：把 `files` 按目录树展示，点击选中文件。
- `ProjectViewer`（右侧）：文件树 + 内容区（预览/代码标签），复用现有 ArtifactViewer 思路，但支持多文件。
- `Workspace`：`teamMode` 状态下，右栏从 `PreviewFrame` 切换为 `ProjectViewer`。

### 5.3 产物浏览（多文件）

`ArtifactViewer` 升级：single 模式仍是单文件预览+代码；team 模式展示文件树 + 逐文件查看 + 前端入口预览。

---

## 6. 预览与运行策略

| 文件类型 | 处理 |
|---------|------|
| 前端入口（`entry`，如 `frontend/index.html`） | 沙箱 iframe 静态预览 |
| 其它前端文件（css/js） | 代码查看（暂不支持拼接运行） |
| 后端/配置（`.py`/`requirements.txt`/schema） | 代码查看，标注「需自行运行」 |

**为什么**：完整运行后端需要运行时环境 + 依赖安装 + 数据库，demo 内不可行；静态预览前端入口是「可运行程度」与「完整性」之间的最优折中。

---

## 7. 分阶段实施计划

| 阶段 | 内容 | 依赖 | 可独立交付 |
|------|------|------|-----------|
| P0 | 数据模型：`files`/`steps` 表 + apps 扩展 + 迁移 | 无 | 是 |
| P1 | `/api/team/plan`：Team Leader 规划 + 计划确认 | P0 | 是 |
| P2 | `/api/team/build`：三阶段流水线 + 写文件 | P1 | 是 |
| P3 | 前端三栏：FileTree + ProjectViewer + TeamPipeline | P2 | 是 |
| P4 | 前端入口预览 + ArtifactViewer 多文件化 | P3 | 是 |
| P5(可选) | function calling、跟随智能体、@自由编排 | P4 | 否 |

每个阶段都可独立测试与部署，避免一次性大改。

---

## 8. 风险与取舍

1. **生成质量与时长**：团队模式一次 3-4 次 LLM 调用，约 30-60s。用流式（每阶段实时展示）缓解等待感；`temperature=0` 保证稳定（沿用现有经验）。
2. **多文件内容一致性**：各阶段独立生成，需在 prompt 里约定文件路径约定 + 工程师阶段「合并前序产出」，避免路径冲突。
3. **预览局限**：后端无法运行，明确标注，不夸大「可运行程度」。
4. **向后兼容**：single 模式完全保留，团队模式是新加路径，不影响现有用户/应用数据（`mode` 默认 `single`）。
