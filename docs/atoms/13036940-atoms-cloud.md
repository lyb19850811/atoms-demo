# Atoms 云

> 来源：https://help.atoms.dev/zh/articles/13036940-atoms-cloud
> 更新时间：2026年7月29日

**Atoms 云** 为希望快速发布真实、可用应用程序的用户提供一体化后端解决方案。无需复杂的服务器配置或代码集成，您就可以直接在 Atoms 中构建数据存储、用户身份验证、支付集成和 AI 集成。

**Atoms 云非常适合以下场景：** 电商网站、内部工具、多人游戏、实时应用程序，以及任何需要可部署后端的多页面应用程序。

## Atoms 云是什么？

Atoms 云是一项内置服务，旨在解决氛围编程的“最后一公里”问题——让您的应用为真实世界做好准备。

<iframe src="https://www.youtube.com/embed/QOnS9iB4ln0?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

**核心功能：**

1. **数据库 (DB)：** 内置的高可靠性数据库。对于管理用户数据、产品目录和订单历史至关重要。
2. **用户身份验证 (Auth)：** 安全处理注册、登录、权限和会话管理。支持标准的电子邮件/密码流程以及社交登录，例如“使用 Google 登录”。
3. **支付：** 轻松实现 **Stripe** 集成。如果您希望通过项目获利，只需点击一下即可设置收款。
4. **自定义域名：** 连接您自己的网址，例如 `www.yoursite.com`，让您的应用程序呈现更专业的形象。
5. **API 密钥管理：** 安全生成和管理 API 密钥，以连接第三方服务。
6. **AI 集成：** 原生支持 LLM 和 AI 智能体，让您能够将智能直接嵌入后端逻辑中。

## 如何启用 Atoms 云

1. Atoms 云会自动检测您项目的后端需求并自行完成配置。
2. 为确保您的数据库结构与代码保持一致，**历史版本已被禁用**。系统仅保留最新构建，以防止数据冲突。

<iframe src="https://www.youtube.com/embed/US1hKlqkVGE?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

## 使用场景：何时使用 Atoms 云

1. **电子商务：** 您需要处理支付、管理库存并跟踪订单。
2. **内部工具：** 您的团队需要一个具有特定用户角色和权限的仪表板。
3. **迷你 SaaS：** 您的应用需要用户账户、订阅和持久化数据存储。
4. **实时 / 多人游戏：** 例如在线国际象棋或排行榜等需要在用户之间即时同步数据的应用。

## 为什么使用 Atoms 云？

- **零 DevOps：** 无需管理服务器、数据库、SSL 证书或域名。
- **深度集成：** Atoms 会自动处理您的前端与后端之间的连接。

  - _示例：_ 当用户提交表单时，智能体会自动将数据写入您的 DB。
  - _示例：_ 当用户注册时，会立即创建一条 Auth 记录。

## 常见问题

<AccordionGroup>
<Accordion title="Atoms 云的费用是多少？">
- **免费套餐：** 允许 1 个后端项目。
- **Pro Plan：** 无限后端项目。
- _注意：_ 云功能会消耗系统资源，因此我们建议仅为活跃项目创建。
</Accordion>
<Accordion title="我的项目是公开的吗？">
- **Pro/Pro+ Users：** 连接到 Atoms 云的项目默认为 **Private**。
- **Free Users：** 项目默认为 **Public**。您必须升级到 Pro 才能将其设为 Private。
</Accordion>
</AccordionGroup>10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"8656fc04-80dc-4f3a-b98a-8631c404eb81","title":"智能体与模式","articles":[{"slug":"12129380-your-agents-team","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team","iconId":"icon-help-agent-team"},{"slug":"12129385-mode-switching-guide","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide","iconId":"icon-help-star"},{"slug":"12129504-race-mode","title":"赛马模式","href":"/zh/articles/12129504-race-mode","iconId":"icon-race-boost"},{"slug":"12136255-deep-research","title":"深度研究","href":"/zh/articles/12136255-deep-research","iconId":"icon-chat-dr"},{"slug":"14342754-adrian-ads-agent-for-automated-campaigns","title":"Adrian：广告智能体","href":"/zh/articles/14342754-adrian-ads-agent-for-automated-campaigns","iconId":"icon-logo-google-ads"}],"children":[]},{"id":"47aab372-483c-41ca-a8b7-d9686ab73e8b","title":"构建与项目","articles":[{"slug":"12129478-build-export","title":"构建与导出","href":"/zh/articles/12129478-build-export","iconId":"icon-mobile-build-progress"},{"slug":"12129483-deployment-options","title":"部署选项","href":"/zh/articles/12129483-deployment-options","iconId":"icon-setting-ai-cloud"},{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions","iconId":"icon-setting-branches"},{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management","iconId":"icon-menu-projects"},{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer","iconId":"icon-block-app-viewer"},{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report","iconId":"icon-chat-issue-report"},{"slug":"12129010-remix","title":"克隆","href":"/zh/articles/12129010-remix","iconId":"icon-chat-remix"},{"slug":"12129484-publish","title":"发布","href":"/zh/articles/12129484-publish","iconId":"icon-menu-publish"},{"slug":"12129279-share","title":"分享","href":"/zh/articles/12129279-share","iconId":"icon-menu-share"},{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace","iconId":"icon-chat-team"}],"children":[]},{"id":"5d5b4afb-9440-4c5f-817e-30645d4536b4","title":"云 · SEO · 增长","articles":[{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud","iconId":"icon-page-cloud"},{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet","iconId":"icon-setting-payment-history"},{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo","iconId":"icon-block-seo"},{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide","iconId":"icon-general-compass"},{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains","iconId":"icon-setting-domain"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"0b2236b5-6dba-467c-bd35-8985aa99cd40","articleSlug":"13036940-atoms-cloud","path":"/zh/articles/13036940-atoms-cloud"}],["$","$L26",null,{"locale":"zh","articleId":"0b2236b5-6dba-467c-bd35-8985aa99cd40","articleSlug":"13036940-atoms-cloud","path":"/zh/articles/13036940-atoms-cloud","title":"Atoms 云","summary":"将您的演示转变为可投入生产的应用程序","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"f6e5e0ef-e9fa-4495-a0c3-d74c2a16209c","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team"},{"key":"a621f1b0-c0cf-4f4d-a461-294f5b1a6568","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide"},{"key":"07ce9141-5b0f-455f-8395-8d8bf4cdb51a","title":"赛马模式","href":"/zh/articles/12129504-race-mode"}],"prevArticle":{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace"},"nextArticle":{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet"},"iconId":"icon-page-cloud","sectionTitle":"云 · SEO · 增长"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
