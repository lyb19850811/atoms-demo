# Supabase 集成

> 来源：https://help.atoms.dev/zh/articles/12129788-supabase-connect
> 更新时间：2026年7月29日

## 概述

Supabase 是一个开源后端平台，使用户能够存储数据并提供类似后端的功能。您可以将 Supabase 连接到 Atoms，以解决您的 Atoms 团队仅存储在浏览器内存中的问题，因为这些数据会在刷新或关闭时丢失。通过将 Atoms 与 Supabase 集成，您可以将您的网站转变为具有持久化存储和高级功能的完整应用程序。

在此查看更多说明：

<iframe src="https://www.youtube.com/embed/iQclR5N5b40?rel=0" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen; picture-in-picture; encrypted-media"></iframe>

## 主要优势

除了无需开发经验外，它还有另外三项关键优势：

1. **快速设置：** 搭建您的后端并加速开发流程。
2. **高度可扩展：** 适应用户增长，让您的项目能够不受限制地扩展。
3. **高性价比：** 提供适合小型项目和初创公司的免费层级。

## 将 Supabase 连接到 Atoms

以下是将 Atoms 连接到 Supabase 的简短指南。

1. **在 Atoms 中启动 Supabase 集成**

   - 打开 **Settings**。
   - 从左侧边栏中选择 **Connectors**。
   - 找到 Supabase 连接器并点击 **Connect**。

     ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12129788%2Fd59562b107515cca-image.png)
   - Atoms 将展示一个连接设置界面，您可以按照提示进行操作。
2. **认证并配置您的项目**

   将会出现一个弹窗，提示您登录您的 Supabase 账户。

   - 从下拉菜单中选择您的组织。
   - 点击 **Authorize Atoms** 以授权您的 Supabase 账户。_(连接会在几秒内完成——无需手动配置)_
   - 授权完成后，您可以：

     - 从列表中选择一个现有的 Supabase 项目，或
     - 点击 +**Add New One** 立即添加一个新组织。_(如果您需要指导，Atoms Assistant 可协助您完成将 Supabase 连接到 Atoms 的过程。)_
3. **自动配置**

   - 选择项目后，Atoms 将自动连接到您的 Supabase 项目。它会收集您的数据库结构、表和安全设置。
   - 当您看到 "**Supabase Connected**" 通知时，表示您的后端已完成配置并可立即使用。

## 用户认证

在 Atoms 中创建应用后，您可能还想实现用户认证。Supabase Auth 简化了为您的应用添加身份验证和授权的过程。在此过程中，Atoms 将引导您使用两种方法：(1) **Email and Password** 和 (2) **Social Logins (Google)**。

### 邮箱和密码

1. 将 Supabase 连接到 Atoms

   - 确保您拥有有效的 Supabase 账户。
   - 点击聊天界面右上角的授权按钮，以授权您的 Supabase 账户。
   - 选择您要使用的 Supabase 项目。
2. 告诉智能体您的需求

   - 在聊天中输入您的需求。例如，您可以直接输入提示词："Add authentication"。
   - 这通常会生成一个连接到 Supabase 身份验证系统的基础登录和注册页面。
3. 创建用户进行测试

   - 使用新添加的登录/注册界面创建一个测试用户。
   - 刷新页面以验证用户会话是否持续存在。
   - 或者，前往您的 Supabase 控制台，导航至 **Authentication** > **Users**，然后手动添加一个用户进行测试。
4. 部署您的应用

### 社交登录（Google）

1. 在 Supabase 项目中配置 Google OAuth

   - 导航到您的 Supabase 控制台中的 Authentication 页面。
   - 进入 Sign In/Up 子页面。
   - 找到 Google 选项并切换开关以启用它。_(有关 Supabase 详细配置步骤，请参阅在 Supabase 中配置 Google OAuth 或 [Supabase Docs](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12129788%2Fbce031a97618e1f9-docs)。)_
2. 告诉智能体您的需求

   - 在聊天中输入您的需求。例如：`"Add Google authentication"`。
   - 这会在您的登录页面中添加一个 Continue with Google 按钮。
3. 测试 Google 身份验证

   - 前往登录页面。
   - 点击 Continue with Google 按钮。
   - 使用 Google 账户登录，并验证用户资料是否已正确更新。
   - 完成 Google OAuth 流程，以确保用户被重定向回您的应用。
4. 将您的应用部署到 Atoms 的 App 世界

### 在 Supabase 中配置 Google OAuth

1. **创建 Google Cloud 项目**

   - **访问 Google Cloud Console**

     - 打开 [Google Cloud Console](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12129788%2F01dfe237e8e43e50-asset) 并登录您的 Google 账户。
   - **创建新项目**

     - 点击顶部的下拉菜单并选择 **New Project.**
     - 输入项目名称，选择结算账户，然后点击 **Create.**
2. **配置 Google OAuth 凭据**

   - **设置同意屏幕**

     - 在搜索栏中输入 OAuth 并打开 OAuth consent screen。
     - 填写您应用的名称、用户支持邮箱以及其他必填字段。
     - 选择 External 或 Internal，然后点击 Create。
   - **创建 OAuth Client ID**

     - 点击 Create OAuth Client，然后选择 OAuth Client ID。
     - 对于 Application Type，选择 Web application。
     - 在 Authorized redirect URIs 中，添加来自 Supabase 控制台的回调 URL。
     - 点击 Create，并记下生成的 Client ID 和 Client Secret。
3. **在 Supabase 中配置 Google OAuth**

   - **登录 Supabase 控制台**

     - 打开 [Supabase Dashboard](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12129788%2Ff637107128b2e484-asset) 并登录您的项目。
   - **启用 Google OAuth**

     - 导航到 **Authentication** 页面。
     - 在 **Providers** 部分中，找到 **Google** 选项并启用它。
     - 将先前生成的 **Client ID** 和 **Client Secret** 分别添加到对应字段中。
   - **保存配置**

     - 点击 **Save** 以应用更改。

## 数据存储

在为您的 web/app 配置用户认证后，您可能还想存储用户数据。

连接到 Supabase 后，只需告诉 Atoms 您希望将哪些数据保存到数据库中。智能体将自动配置数据库表，并将其直接集成到您的 UI 中。

1. 定义您的需求

   - 在聊天中输入您的需求。例如：`"Please ensure that new trip records are saved to the database"`。
   - 尽可能清楚地描述您想要存储的数据。
   - Atoms 将根据您的输入自动配置所需的数据库结构。
2. 在 Atoms 中测试功能

   - 在您的应用中创建示例数据，例如通过 UI 添加几条“trip records”。
   - 保存数据并刷新页面。数据将同步到 Supabase 数据库。
   - 登录 Supabase 并验证新添加的数据是否存在于数据库中。
3. 验证 Atoms 与 Supabase 之间的数据同步

   - 打开 Supabase 控制台并导航到 Table Editor。
   - 修改现有数据或创建新数据。
   - 在 Supabase 中所做的更改将实时同步到您的 Atoms 应用。
   - 返回 Atoms 并验证修改后或新创建的数据是否正确显示。
   - 如果数据同步成功，则说明您的配置已完成。
4. 部署您的应用

## Edge Functions

Supabase Edge Functions 是部署在靠近用户的服务器节点上的无服务器后端程序。它们无需构建和维护传统服务器，让您能够以更低的网络延迟和更快的响应时间运行任何自定义逻辑。在大多数 Web 应用中，前端（按钮、表单、UI）负责处理基本交互，但某些关键操作必须在后端运行，例如：

- 用户注册后自动发送欢迎邮件；
- 在表单提交时调用 AI API 分析或评分内容；
- 在结账过程中集成第三方支付网关并记录订单详情。

所有这些操作都通过 Edge Functions 实现。

## 使用场景

在 Atoms 中使用 Supabase Edge Functions，您可以：

- 发送欢迎邮件：在新用户注册后，自动通过电子邮件向其发送带有后续步骤指引的欢迎消息，从而提升参与度和引导体验。
- 处理用户表单提交：在反馈、注册或评论提交后，自动生成并发送确认通知（例如：“我们已收到您的反馈，并将尽快审核”），让用户知道其操作已成功。
- 安排提醒：通过电子邮件或推送设置每日或每周通知（用于会议、任务或事件），帮助用户管理时间并保持高效。
- 利用 AI 服务：在用户输入文本后，自动调用 OpenAI 等 AI API 进行语法检查或智能改写，并将优化后的结果返回给用户。
- 处理在线支付：当用户在您的电商或服务平台上发起支付时，与 Stripe 等网关集成，以安全地处理交易，并显示带有订单详情的清晰成功或失败页面。

## 密钥存储与管理

许多应用需要密钥或 API 凭据来连接第三方服务（例如 Stripe、OpenAI）。连接 Supabase 后，Atoms 提供了一种安全的方式来管理和使用这些秘密信息。通过 Atoms 与 Supabase 的集成，每当某个函数需要秘密信息时，Atoms 都会自动检测并提示您输入所需的值。您只需点击智能体的 "Add API Key" 按钮并输入您的密钥；随后，Atoms 会将其加密并存储在 Supabase 的 Edge Functions Secrets Manager 中。在运行时，这些密钥会被安全地注入到函数中，从而避免凭据以明文形式存储。

## 添加并部署后端函数

连接到 Supabase 后，告诉智能体您的需求：

- 在聊天中输入您的请求。例如："Generate a webpage that calls the Gemini API to estimate food calories and returns the result when I upload a food photo."
- 智能体生成代码后，会出现两个按钮：**Add API Key** 和 **View in Edge Function**。
- 点击 **Add API Key**。
- 输入您的 API 密钥并点击 **Send**。
- 点击 **View in Edge Function**。
- 您将被重定向到 Supabase Edge Function 页面。

  安全说明：所有密钥都会加密并存储在 Supabase 中；Atoms 无法访问它们。

## 常见问题

<AccordionGroup>
<Accordion title="如何将 Supabase 后端功能添加到我的应用中？">
通过三个简单步骤即可将 Supabase 集成到您的应用中：

- 点击聊天界面右上角的授权按钮，以授权您的 Supabase 账户。
- 选择并关联您要使用的 Supabase 项目。
- 在聊天中分享您的需求，智能体将基于您已连接的 Supabase 项目开发功能。
</Accordion>
<Accordion title="Supabase 支持社交登录吗？">
Supabase 支持多种身份验证方式，包括：

- 邮箱和密码。
- 无密码认证：如一次性密码（OTP）或魔法链接等选项。
- 社交登录：支持 Google、Twitter 和 GitHub 等第三方提供商。
- 手机认证。
- 单点登录（SSO）：支持 SAML SSO。
- 匿名登录：允许用户匿名登录。
</Accordion>
<Accordion title="我的应用需要单独创建一个 Supabase 项目吗？">
您可以选择现有的 Supabase 项目，也可以创建一个新项目。每个聊天一次只能连接一个项目。
</Accordion>
<Accordion title="连接到 Supabase 后，如果我克隆我的项目，连接会保留吗？">
克隆后连接将断开，需要重新建立。此外，如果 App 世界中由其他用户共享的某个应用已连接到 Supabase，其他用户将无法克隆它。
</Accordion>
<Accordion title="我可以将一个 Supabase 数据库用于多个 Atoms 项目吗？">
可以，您可以将一个 Supabase 数据库用于多个 Atoms 项目。不过，您需要谨慎管理连接和配置。
</Accordion>
<Accordion title="为什么我的项目没有显示在 Supabase 组织下？">
在 Supabase 免费套餐中，任何连续七天没有活动的项目都会被自动暂停。在 **Atoms** Organizations 列表中，切换到 Inactive 过滤器即可查看任何已被暂停的项目。
</Accordion>
<Accordion title="为什么我在尝试连接到 Supabase 时会看到 \"The organization has been bound by another user\"？">
Supabase 对每个组织与一个 Atoms 账户之间实施一对一的 OAuth 绑定。如果 “Test” 组织已被另一位 Atoms 用户授权，那么随后任何尝试用不同账户进行绑定的操作都会因该错误而被拒绝。要解决此问题，请打开 Supabase Dashboard 侧边栏中的 Settings → API → OAuth Apps，删除该组织现有的 Atoms OAuth 授权，然后返回 Atoms 并使用您自己的账户重新连接。
</Accordion>
</AccordionGroup>10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"61276e2d-bb2d-4f51-b934-311c2c263395","title":"关于","articles":[{"slug":"15112407-connect-and-use-integrations","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations","iconId":"icon-menu-integrations"}],"children":[]},{"id":"6a4530b3-036b-4bee-8f0e-304b46563166","title":"连接器","articles":[{"slug":"13222322-github-connect","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect","iconId":"icon-logo-github"},{"slug":"12129788-supabase-connect","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect","iconId":"icon-menu-supabase"},{"slug":"12129347-stripe-connect","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect","iconId":"icon-logo-stripe"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"9c7605d4-565e-48f3-8517-586c2d590979","articleSlug":"12129788-supabase-connect","path":"/zh/articles/12129788-supabase-connect"}],["$","$L26",null,{"locale":"zh","articleId":"9c7605d4-565e-48f3-8517-586c2d590979","articleSlug":"12129788-supabase-connect","path":"/zh/articles/12129788-supabase-connect","title":"Supabase 集成","summary":"借助 Supabase，您可以轻松为您的网站配置后端——无需开发经验。","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"75a48b71-fdf7-4012-854d-eb3b6b143811","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations"},{"key":"48ccd53e-f47a-450f-8574-0ea33db3adfc","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect"},{"key":"e9fa65b1-5ad8-4755-b94b-56f2ecb88769","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect"}],"prevArticle":{"slug":"13222322-github-connect","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect"},"nextArticle":{"slug":"12129347-stripe-connect","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect"},"iconId":"icon-menu-supabase","sectionTitle":"连接器"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
