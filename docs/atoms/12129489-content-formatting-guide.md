# 格式化内容和图表

> 来源：https://help.atoms.dev/zh/articles/12129489-content-formatting-guide
> 更新时间：2026年7月29日

了解如何使用 Markdown 格式化文本，并在 Atoms 中渲染交互式 Mermaid 图表。

## 显示格式化的 Markdown 内容

Atoms 原生支持在聊天回复、文档和渲染视图中使用 Markdown 格式。

### 支持的 Markdown 元素

- **标题**：使用 `#`、`##` 或 `###` 创建结构化章节标题。
- **强调**：使用 `**bold**` 或 `*italic*` 文本。
- **列表**：使用 `-` 或 `1.` 创建项目符号列表和编号列表。
- **代码块**：使用三个反引号（）包裹代码片段，并启用语言语法高亮。

若要请求格式化输出，只需这样指示你的 AI 智能体：
- *"请使用清晰的 Markdown 格式来组织回复，并包含小标题和项目符号。"*

---

## 显示与渲染 Mermaid 图表

Atoms 支持使用 **Mermaid.js** 渲染流程图、时序图和架构图。

### 如何生成 Mermaid 图表

提示你的 AI 智能体生成 Mermaid 图表：
- *"生成一个 Mermaid 流程图，说明用户身份验证生命周期。"*

你的智能体会输出一个标准的 Mermaid 代码块：

mermaid
graph TD;
    A[User Submits Login] --> B{Valid Credentials?};
    B -- Yes --> C[Issue JWT Token & Redirect];
    B -- No --> D[Show Error Message];


Atoms 会自动解析此代码块，并在你的视图中将其渲染为交互式可视化图表。
