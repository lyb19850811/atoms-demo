# 项目文件管理

> 来源：https://help.atoms.dev/zh/articles/12129487-project-file-management
> 更新时间：2026年7月29日

了解如何在 Atoms 中上传素材、导入现有本地项目，以及将项目源代码下载到你的本地设备。

## 上传文件、文件夹和图片

上传代码文件、文档或图片可为你的 AI 智能体团队提供必要的上下文，以便他们准确构建你的项目。

### 如何上传和引用素材

1. **上传文件和文件夹**:
   - 点击聊天输入框左下角的 **+ Add** 按钮以选择文件或文件夹（每个文件最多 100MB）。
   - 上传后，素材会在提示词框中显示为 `# FileName`。
   - 若要在后续聊天中引用已上传的文件，只需输入 `#` 即可从自动补全下拉列表中选择。
2. **上传和粘贴图片**:
   - 通过文件选择器上传图片，或使用 `Ctrl+V` 直接粘贴到聊天输入框中。
   - 上传的图片会显示为 `# ImageName`。

## 导入本地项目

你可以将现有的本地代码库导入 Atoms 进行增量开发：

1. **打包并上传**: 将你的本地项目代码压缩为 Zip 文件并直接拖入聊天对话框，或点击左上角的 **Global Folder** 图标 → **Add New File**。
2. **解压到工作区**: 请 Alex 将压缩包解压到你当前激活的工作区。  
   *示例提示词*: `@Alex, please help extract this zip file #/data/chats/chatid/workspace/upload/project.zip to workspace/project_name`
3. **阅读项目说明**: 让你的智能体先阅读代码库并检查 `README.md`，再发起新的功能需求。

## 下载项目文件和源代码

Atoms 提供了多种便捷方式，可将你的代码和项目文件导出到本地存储：

### 3 种下载方式

1. **下载目录**:
   - 点击右侧导航面板中的 **Editor**。
   - 在文件树中右键单击任意目录或文件夹。
   - 点击 **Download**。
2. **下载单个文件**:
   - 打开 **Editor** 面板。
   - 选择特定文件，然后点击右下角的下载图标。
3. **通过全局文件夹下载**:
   - 点击左上角的 **Folder** 图标。
   - 在 `chats` 目录中找到目标文件并点击 **Download**。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"8656fc04-80dc-4f3a-b98a-8631c404eb81","title":"智能体与模式","articles":[{"slug":"12129380-your-agents-team","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team","iconId":"icon-help-agent-team"},{"slug":"12129385-mode-switching-guide","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide","iconId":"icon-help-star"},{"slug":"12129504-race-mode","title":"赛马模式","href":"/zh/articles/12129504-race-mode","iconId":"icon-race-boost"},{"slug":"12136255-deep-research","title":"深度研究","href":"/zh/articles/12136255-deep-research","iconId":"icon-chat-dr"},{"slug":"14342754-adrian-ads-agent-for-automated-campaigns","title":"Adrian：广告智能体","href":"/zh/articles/14342754-adrian-ads-agent-for-automated-campaigns","iconId":"icon-logo-google-ads"}],"children":[]},{"id":"47aab372-483c-41ca-a8b7-d9686ab73e8b","title":"构建与项目","articles":[{"slug":"12129478-build-export","title":"构建与导出","href":"/zh/articles/12129478-build-export","iconId":"icon-mobile-build-progress"},{"slug":"12129483-deployment-options","title":"部署选项","href":"/zh/articles/12129483-deployment-options","iconId":"icon-setting-ai-cloud"},{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions","iconId":"icon-setting-branches"},{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management","iconId":"icon-menu-projects"},{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer","iconId":"icon-block-app-viewer"},{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report","iconId":"icon-chat-issue-report"},{"slug":"12129010-remix","title":"克隆","href":"/zh/articles/12129010-remix","iconId":"icon-chat-remix"},{"slug":"12129484-publish","title":"发布","href":"/zh/articles/12129484-publish","iconId":"icon-menu-publish"},{"slug":"12129279-share","title":"分享","href":"/zh/articles/12129279-share","iconId":"icon-menu-share"},{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace","iconId":"icon-chat-team"}],"children":[]},{"id":"5d5b4afb-9440-4c5f-817e-30645d4536b4","title":"云 · SEO · 增长","articles":[{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud","iconId":"icon-page-cloud"},{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet","iconId":"icon-setting-payment-history"},{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo","iconId":"icon-block-seo"},{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide","iconId":"icon-general-compass"},{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains","iconId":"icon-setting-domain"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"d64db6ff-08ae-4501-a364-c7b7e19e0172","articleSlug":"12129487-project-file-management","path":"/zh/articles/12129487-project-file-management"}],["$","$L26",null,{"locale":"zh","articleId":"d64db6ff-08ae-4501-a364-c7b7e19e0172","articleSlug":"12129487-project-file-management","path":"/zh/articles/12129487-project-file-management","title":"项目文件管理","summary":"上传素材、导入本地项目和下载项目源代码指南","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"f6e5e0ef-e9fa-4495-a0c3-d74c2a16209c","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team"},{"key":"a621f1b0-c0cf-4f4d-a461-294f5b1a6568","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide"},{"key":"07ce9141-5b0f-455f-8395-8d8bf4cdb51a","title":"赛马模式","href":"/zh/articles/12129504-race-mode"}],"prevArticle":{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions"},"nextArticle":{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer"},"iconId":"icon-menu-projects","sectionTitle":"构建与项目"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
