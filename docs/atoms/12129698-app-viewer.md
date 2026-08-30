# App 预览

> 来源：https://help.atoms.dev/zh/articles/12129698-app-viewer
> 更新时间：2026年7月27日

## 什么是 App 预览？

当 AI 智能体完成任务后，App 预览会显示在页面顶部。它让你可以预览正在运行的应用，并直接进行可视化编辑——无需编写代码。

## 开始之前

* 智能体处理可能需要一点时间——请耐心等待。
* 查看右侧的终端面板以了解详细进度。终端面板会显示 AI 智能体正在执行操作的实时日志，包括文件创建、代码生成以及构建过程中遇到的任何错误。
* 你可以随时点击刷新图标重新加载预览。
  ![20260726-213650.png](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2F1785073931002-20260726-213650.png)

![](https://deepwisdom.feishu.cn/space/api/box/stream/download/asynccode/?code=M2FiMDM0NGNjZjNjMWFiNjBiZDkyMTMzNjk1NDI4OWVfb0VsbVNUY2ZOWXB6MFR5QUFNMllZV2hGSGQ3dmVvblNfVG9rZW46SWkzZWJvYUV0b1dFS0F4ZXY2YmN6RGFYbkpiXzE3ODQwOTc2MTg6MTc4NDEwMTIxOF9WNA&add_watermark=true&scene_type=CCM)

## 如何使用 App 预览

### 步骤 1：等待预览加载

智能体完成后，App 预览会在主预览窗口中加载你的预览内容。

⏱️ 通常需要几秒到一分钟。

如果超过 2 分钟仍未完成：点击 App 预览工具栏中的刷新图标。如果仍然卡住，请检查终端面板中是否有错误（见下方步骤 3）。

### 步骤 2：预览你的应用

加载完成后，你就可以在预览窗口中看到正在运行的应用。

* **桌面 / 平板 / 移动设备** — 使用预览窗口顶部的设备工具栏在不同视图间切换，并测试响应式效果。工具栏会显示三个图标，分别代表桌面、平板和移动设备。点击各个图标，即可在不离开当前页面的情况下查看你的应用在不同屏幕尺寸下的显示效果。
* **在新标签页中打开**— 点击预览窗口右上角的箭头图标，可在单独的浏览器标签页中打开预览。如果嵌入式预览卡住或无响应，这会特别有用。
  ![20260726-213647.png](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2F1785073969166-20260726-213647.png)

![](https://deepwisdom.feishu.cn/space/api/box/stream/download/asynccode/?code=YzIxNTFkZTVlODI1YzNlYmY1NzhmMDU3OWI1NzQ2MjBfa1BNSUZmZkw1dUJDaXFIZmVacFhEOUxicjlySEx4UVRfVG9rZW46VDBDQmJuZFFib1R2Wjh4YjlzcmNZQ1B6bkloXzE3ODQwOTc2MTg6MTc4NDEwMTIxOF9WNA&add_watermark=true&scene_type=CCM)

### 步骤 3：检查错误（如果界面看起来不对）

如果你的应用无法加载或显示异常，请检查 Console 面板中的错误信息。

Console 面板位于屏幕右侧，在终端标签下方。它会显示构建过程中生成的系统日志和错误信息。

如果你看到红色错误信息，通常会包括：

* 问题的具体描述
* 出错的文件和行号
* 用于帮助定位根本原因的堆栈跟踪

**要修复这些错误：**<u>（更多详情，请参阅：</u>[问题报告](https://help.atoms.dev/en/articles/12129264-issue-report)<u>）</u>

* 点击“Resolve”——AI 会自动分析并修复所有已识别的问题。
* 修复完成后，预览会重新加载。你可以通过终端面板实时查看进度。

**没有 “Resolve” 按钮？**

点击智能体最新消息旁边的“...” （更多选项），然后选择“Feedback”向我们的支持团队报告问题。请附上你的 Chat Link 和错误截图。

### 步骤 4：修改你的应用

**方法 1：点击编辑（推荐用于视觉变更）**

直接点击预览窗口中的任意元素。屏幕左侧会出现一个可视化编辑器，你可以在其中调整：

* 颜色 — 使用取色器更改文字颜色、背景颜色或边框颜色
* 间距 — 调整内边距、外边距以及元素之间的间隔
* 排版 — 修改字体大小、字重和字体系列
* 布局 — 更改对齐方式、flexbox 设置或网格属性
* 文本内容 — 直接在编辑器中编辑文本

完成更改后，预览会立即更新，让你可以实时查看效果。

可视化编辑器还包含一个 **Library** 选项卡，你可以在其中浏览并向项目中添加预构建资源，例如图标、图片和 UI 组件。

**方法 2：在聊天中描述**

用自然语言告诉 AI 智能体你想做什么更改。例如：

* *“让背景颜色更深一些”*
* *“减少页眉周围的内边距”*
* *“把按钮颜色改成蓝色”*

AI 会理解你的请求，并将更改应用到你的应用中。

![20260726-213643.png](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2F1785074006742-20260726-213643.png)

![](https://deepwisdom.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmI4MjNlNTQ5NzI0OWIxN2E0MmQ3N2YyZWMwNTkwMzNfbUI4d0NjNlRpZG95NE9wR2J3WjFLcHNkNFNCUVVXaU1fVG9rZW46RmxGOWJlNGJIb0tieHF4ejVoSmNqMzdVblBlXzE3ODQwOTc2MTg6MTc4NDEwMTIxOF9WNA&add_watermark=true&scene_type=CCM)

### 快速参考

* **刷新预览** – 点击 App 预览工具栏中的刷新图标以重新加载预览窗口。
* **切换设备视图** – 使用预览工具栏中的桌面、平板或移动设备图标，测试你的应用在不同屏幕尺寸下的显示效果。
* **在新标签页中打开** – 点击预览窗口右上角的箭头图标，在单独的浏览器标签页中打开预览。
* **查看错误日志** – 检查屏幕右侧的 Console 面板，查看错误信息和系统日志。
* **自动修复错误** – 点击问题报告通知中的“Resolve”按钮，让 AI 修复所有已识别的问题。
* **编辑可视元素** – 点击预览窗口中的任意元素，在左侧打开可视化编辑器。
* **报告问题** – 点击任意智能体消息上的“...” → “Feedback”，向支持团队报告问题。

## 常见问题

<AccordionGroup>
<Accordion title="为什么我的 App 预览会显示加载画面？">
出现加载画面表示网站正在加载中。App 预览功能本身是正常的。请稍等片刻，让预览正常加载。如果超过 2 分钟仍未完成，请尝试点击刷新图标或检查 Console 面板中是否有错误。
</Accordion>
</AccordionGroup>

<AccordionGroup>
<Accordion title="为什么我的 App 预览会显示红色错误信息？">
智能体在构建过程中可能会遇到问题，这有时会导致网页报错。点击“Resolve”，智能体会为你修复该错误。修复完成后，App 预览就会恢复正常显示，因此无需担心出现红色错误信息。
</Accordion>
</AccordionGroup>

<AccordionGroup>
<Accordion title="为什么我无法从已发布页面中移除 Atoms 徽标？">
移除徽标需要 Pro 套餐或更高版本。你可以随时在“设置 → 套餐与账单”中升级。升级后，徽标会自动从你的已发布页面中移除。

要升级，请点击右上角的头像，选择“设置”，然后进入“套餐与账单”。选择 Pro 套餐或 Max 套餐并完成升级流程。升级后，Atoms 徽标将不再显示在你的已发布页面上。
</Accordion>
</AccordionGroup>

![20260726-213637.png](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2F1785074275897-20260726-213637.png)10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"8656fc04-80dc-4f3a-b98a-8631c404eb81","title":"智能体与模式","articles":[{"slug":"12129380-your-agents-team","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team","iconId":"icon-help-agent-team"},{"slug":"12129385-mode-switching-guide","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide","iconId":"icon-help-star"},{"slug":"12129504-race-mode","title":"赛马模式","href":"/zh/articles/12129504-race-mode","iconId":"icon-race-boost"},{"slug":"12136255-deep-research","title":"深度研究","href":"/zh/articles/12136255-deep-research","iconId":"icon-chat-dr"},{"slug":"14342754-adrian-ads-agent-for-automated-campaigns","title":"Adrian：广告智能体","href":"/zh/articles/14342754-adrian-ads-agent-for-automated-campaigns","iconId":"icon-logo-google-ads"}],"children":[]},{"id":"47aab372-483c-41ca-a8b7-d9686ab73e8b","title":"构建与项目","articles":[{"slug":"12129478-build-export","title":"构建与导出","href":"/zh/articles/12129478-build-export","iconId":"icon-mobile-build-progress"},{"slug":"12129483-deployment-options","title":"部署选项","href":"/zh/articles/12129483-deployment-options","iconId":"icon-setting-ai-cloud"},{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions","iconId":"icon-setting-branches"},{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management","iconId":"icon-menu-projects"},{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer","iconId":"icon-block-app-viewer"},{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report","iconId":"icon-chat-issue-report"},{"slug":"12129010-remix","title":"克隆","href":"/zh/articles/12129010-remix","iconId":"icon-chat-remix"},{"slug":"12129484-publish","title":"发布","href":"/zh/articles/12129484-publish","iconId":"icon-menu-publish"},{"slug":"12129279-share","title":"分享","href":"/zh/articles/12129279-share","iconId":"icon-menu-share"},{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace","iconId":"icon-chat-team"}],"children":[]},{"id":"5d5b4afb-9440-4c5f-817e-30645d4536b4","title":"云 · SEO · 增长","articles":[{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud","iconId":"icon-page-cloud"},{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet","iconId":"icon-setting-payment-history"},{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo","iconId":"icon-block-seo"},{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide","iconId":"icon-general-compass"},{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains","iconId":"icon-setting-domain"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"c7e82189-b8ed-4c8c-b315-d774b7994883","articleSlug":"12129698-app-viewer","path":"/zh/articles/12129698-app-viewer"}],["$","$L26",null,{"locale":"zh","articleId":"c7e82189-b8ed-4c8c-b315-d774b7994883","articleSlug":"12129698-app-viewer","path":"/zh/articles/12129698-app-viewer","title":"App 预览","summary":"实时预览并修改你的应用。","updatedAt":"2026年7月27日","markdown":"$27","relatedArticles":[{"key":"f6e5e0ef-e9fa-4495-a0c3-d74c2a16209c","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team"},{"key":"a621f1b0-c0cf-4f4d-a461-294f5b1a6568","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide"},{"key":"07ce9141-5b0f-455f-8395-8d8bf4cdb51a","title":"赛马模式","href":"/zh/articles/12129504-race-mode"}],"prevArticle":{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management"},"nextArticle":{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report"},"iconId":"icon-block-app-viewer","sectionTitle":"构建与项目"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
