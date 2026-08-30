# 连接并使用集成

> 来源：https://help.atoms.dev/zh/articles/15112407-connect-and-use-integrations
> 更新时间：2026年7月28日

连接后，智能体可以使用你授权的权限来帮助完成任务，例如查找信息、总结文件或任务、创建后续跟进、更新记录，或准备项目交接。

可用操作取决于服务、连接器以及你在设置过程中批准的权限。

## 连接集成

你可以从设置中连接集成。

### 从设置中

![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F15112407%2F67f2e81c2ec48ecc-asynccode)

1. 打开 **Settings**。
2. 从左侧边栏中选择 **Connectors**。
3. 找到你想要使用的连接器。
4. 点击 **Connect**。
5. 在详情面板中，点击 **\+ Connect**。

![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F15112407%2Fb20bb148b9afa954-asynccode)

1. 如果出现提示，请登录外部服务。
2. 查看并批准所请求的权限。
3. 返回产品并确认服务器已连接。

## 使用集成的提示

当你要求智能体使用集成时，请提供足够的上下文来识别正确的项目。有帮助的详细信息包括：

- 项目或团队名称
- 任务名称或问题 ID
- 日期范围或截止日期
- 受派人或负责人
- 状态或优先级

你的请求越具体，结果就越准确。

## Linear

[Linear](https://linear.app/docs/mcp) 连接器让智能体能够访问 Linear 的问题、项目、团队和工程工作流。

Linear 适用于通过问题、周期、项目、缺陷和发布来管理软件开发的产品和工程团队。

连接 Linear 后，智能体可以帮助你：

- 按团队、状态、受派人、标签、优先级或项目查找并总结问题
- 查看问题详情、描述、评论和相关上下文
- 根据缺陷报告、规范、客户反馈或内部备注创建问题
- 更新问题字段，例如状态、受派人、优先级、标签或截止日期
- 准备冲刺规划说明、站会总结、发布说明或交接简报
- 识别未完成工作、阻塞项和即将到来的优先事项

**示例提示词：**

- "总结分配给我的高优先级 Linear 问题。"
- "根据这份缺陷报告创建一个 Linear 问题。"
- "当前周期中有哪些变更？"
- "查找与计费相关的未解决问题，并按优先级分组。"

## Asana

[Asana](https://developers.asana.com/docs/mcp-server) 连接器让智能体能够访问 Asana 项目、任务和团队工作流。

Asana 适用于管理项目、营销活动、上线发布、运营和共享任务负责制的跨职能团队。

连接 Asana 后，智能体可以帮助你：

- 跨项目、负责人、截止日期和状态搜索并总结任务
- 根据会议记录、请求、项目计划或客户对话创建任务
- 更新任务详情，例如受派人、截止日期、完成状态、描述或项目
- 向任务添加后续备注或评论
- 查看项目进展并识别逾期、受阻或未分配的工作
- 将计划、简报或清单转换为结构化的项目任务

**示例提示词：**

- "根据这份上线计划创建 Asana 任务。"
- "总结营销项目中逾期的任务。"
- "本周分配给设计团队的任务有哪些？"
- "将这些会议记录整理成 Asana 后续跟进事项。"

## Todoist

[Todoist](https://www.todoist.com/help) 连接器让智能体能够访问 Todoist 任务、项目、标签和个人生产力工作流。

Todoist 适用于需要以轻量方式记录、组织和完成任务的个人或小团队。

连接 Todoist 后，智能体可以帮助你：

- 根据消息、笔记、电子邮件或对话创建任务
- 将任务组织到项目、分区、标签或优先级中
- 设置或更新截止日期、提醒和重复任务
- 按项目、状态、优先级、标签或截止日期查找任务
- 总结今天、本周或特定项目中到期的事项
- 将较大的目标拆解为更小的可执行任务

**示例提示词：**

- "根据这份会议记录创建 Todoist 任务。"
- "我今天需要完成什么？"
- "把这个目标拆解成 Todoist 清单。"

## 权限与访问

集成会使用你在授权流程中授予的权限。智能体只能访问连接账户可用且该连接器支持的信息。

要断开某个集成，请前往 **Settings > Connectors** 并选择你想移除的连接器。根据外部服务的不同，你可能还需要在该服务的账户设置中撤销访问权限。

## 故障排查

如果智能体无法找到或更新某项内容，请检查以下几点：

- 集成已连接（在 **Settings > Connectors** 中确认状态）。
- 已连接账户在外部服务中拥有对所请求项目的访问权限。
- 你的请求包含足够的细节，例如项目名称、问题 ID 或日期范围，以便智能体定位正确的项目。
- 你请求的操作受该连接器支持。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"61276e2d-bb2d-4f51-b934-311c2c263395","title":"关于","articles":[{"slug":"15112407-connect-and-use-integrations","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations","iconId":"icon-menu-integrations"}],"children":[]},{"id":"6a4530b3-036b-4bee-8f0e-304b46563166","title":"连接器","articles":[{"slug":"13222322-github-connect","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect","iconId":"icon-logo-github"},{"slug":"12129788-supabase-connect","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect","iconId":"icon-menu-supabase"},{"slug":"12129347-stripe-connect","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect","iconId":"icon-logo-stripe"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"75a48b71-fdf7-4012-854d-eb3b6b143811","articleSlug":"15112407-connect-and-use-integrations","path":"/zh/articles/15112407-connect-and-use-integrations"}],["$","$L26",null,{"locale":"zh","articleId":"75a48b71-fdf7-4012-854d-eb3b6b143811","articleSlug":"15112407-connect-and-use-integrations","path":"/zh/articles/15112407-connect-and-use-integrations","title":"连接并使用集成","summary":"集成可让你将外部服务连接到你的 AI 构建体验中。","updatedAt":"2026年7月28日","markdown":"$27","relatedArticles":[{"key":"48ccd53e-f47a-450f-8574-0ea33db3adfc","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect"},{"key":"9c7605d4-565e-48f3-8517-586c2d590979","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect"},{"key":"e9fa65b1-5ad8-4755-b94b-56f2ecb88769","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect"}],"prevArticle":"$undefined","nextArticle":{"slug":"13222322-github-connect","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect"},"iconId":"icon-menu-integrations","sectionTitle":"关于"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
