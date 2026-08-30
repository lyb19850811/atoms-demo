# 优化积分使用

> 来源：https://help.atoms.dev/zh/articles/12130438-optimizing-credit-usage
> 更新时间：2026年7月29日

你需要积分来与智能体互动。为避免浪费积分，请从简单的提示词开始，选择合适的模型，有效规划你的项目，并高效利用克隆功能。此外，这里还有一些与智能体对话的策略。

## 从基础开始

-   **简单开始：** 先尝试轻量级功能，例如 "sheets"、"docs" 或 "工程师模式"。这有助于你了解 Atoms 的功能，并逐步发现相关的使用场景。
    
-   **有序迭代**：
    

1.  先构建最小可行产品（MVP），然后逐步迭代完善。
    
2.  **克隆** 可帮助你启用版本摘要，防止积分快速消耗。
    

## 控制对话长度

积分消耗会随着对话长度增加而上升。尽量保持对话简短以节省积分。你可以通过以下方式减少消耗：

-   为基础的、与项目无关的问答创建单独的聊天。
    
-   一旦需求明确，就总结关键点并开启新的聊天进行构建。
    
-   将 MVP 的细节总结到 **README.md** 文件中，归档代码（在 GitHub、GitLab 或本地）。然后与智能体开启新的聊天，逐步构建，每次只添加一个功能/模块。
    

## 保持需求精确

-   充分规划：逐步规划项目，并清晰描述，包括所有必要细节。
    
-   总结所有必要改动：修改同一模块时，将所有改动汇总到一次请求中，以避免重复。
    
-   使用技术快捷方式：技术用户可使用 "#" 指定文件，或高亮特定内容进行编辑。
    

## 策略性对话

-   避免重复：不要在对话中多次重复讨论同一个问题。
    
-   拆解复杂性：对于复杂任务，手动将其拆解，并逐步引导智能体完成。
    
-   限制互动轮次：限制单次对话或单个项目中的互动轮数。
    
-   避免长篇任务：尽量避免冗长的写作任务（例如完整博客文章），因为它们会消耗大量积分。
    

## 建立最佳实践

-   使用模板：使用用户案例模板来快速搭建项目。
    
-   高效使用文件交互：例如，让 David 输出格式化文件（如 JSON、Markdown），并让 Alex 在新的聊天中基于这些文件继续构建，从而减少额外处理。
    
-   模块化开发：对于大型项目，将其拆分为较小模块，在不同聊天中分别完成，并使用 GitHub、GitLab 或本地工具进行集成。
    

## 克隆

你也可以通过 r**emix** 过去的项目版本来继续开发。

**克隆的三种方式：**

1.  直接点击聊天框中的克隆图标
    
2.  从交互式进度条中选择特定版本，从任意检查点进行克隆。
    
3.  前往页面顶部的 "Versions" 部分，查看过往迭代，并克隆你偏好的版本。
    

更多信息请参见：[克隆](https://help.atoms.dev/en/articles/12129010-remix)。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"715f9efd-5b83-4236-a29f-f76d2c580fc0","title":"技巧与教程","articles":[{"slug":"12129349-choosing-llms","title":"选择 LLM","href":"/zh/articles/12129349-choosing-llms","iconId":"icon-general-language"},{"slug":"13362318-ai-integrations","title":"集成 AI 工具","href":"/zh/articles/13362318-ai-integrations","iconId":"icon-page-ai"},{"slug":"12175569-how-to-modify-files-or-content","title":"编辑文件和内容","href":"/zh/articles/12175569-how-to-modify-files-or-content","iconId":"icon-viewer-design"},{"slug":"12129489-content-formatting-guide","title":"格式化内容和图表","href":"/zh/articles/12129489-content-formatting-guide","iconId":"icon-sheet-visualization"},{"slug":"12130438-optimizing-credit-usage","title":"优化积分使用","href":"/zh/articles/12130438-optimizing-credit-usage","iconId":"icon-page-user-credit"},{"slug":"13361567-build-your-own-e-commerce-website-on-atoms","title":"构建电子商务网站","href":"/zh/articles/13361567-build-your-own-e-commerce-website-on-atoms","iconId":"icon-page-ui-builder"},{"slug":"12255658-how-to-scale-up-your-business-with-atoms","title":"拓展您的业务","href":"/zh/articles/12255658-how-to-scale-up-your-business-with-atoms","iconId":"icon-home-finance"},{"slug":"12174769-academic-resources","title":"访问学术资料","href":"/zh/articles/12174769-academic-resources","iconId":"icon-help-academic"},{"slug":"12255829-how-to-explore-your-creative-ideas-on-atoms","title":"探索创意想法","href":"/zh/articles/12255829-how-to-explore-your-creative-ideas-on-atoms","iconId":"icon-menu-explorer-program"}],"children":[]},{"id":"2105a5c9-094c-48b9-a189-03f6a1fae7a2","title":"故障排查","articles":[{"slug":"12129490-error-message-guide","title":"错误信息指南","href":"/zh/articles/12129490-error-message-guide","iconId":"icon-general-warning"},{"slug":"12129491-agent-performance-issues","title":"智能体性能问题","href":"/zh/articles/12129491-agent-performance-issues","iconId":"icon-backend-ai-capabilities"},{"slug":"12129492-data-display-issues","title":"数据与显示问题","href":"/zh/articles/12129492-data-display-issues","iconId":"icon-sheet-data"},{"slug":"12129493-code-file-management","title":"代码与文件管理","href":"/zh/articles/12129493-code-file-management","iconId":"icon-chat-create-code-file"},{"slug":"12129494-deployment-preview-errors","title":"部署与预览错误","href":"/zh/articles/12129494-deployment-preview-errors","iconId":"icon-editor-preview"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"7cfaf1f1-207a-49e2-85e3-44edf3f76f0a","articleSlug":"12130438-optimizing-credit-usage","path":"/zh/articles/12130438-optimizing-credit-usage"}],["$","$L26",null,{"locale":"zh","articleId":"7cfaf1f1-207a-49e2-85e3-44edf3f76f0a","articleSlug":"12130438-optimizing-credit-usage","path":"/zh/articles/12130438-optimizing-credit-usage","title":"优化积分使用","summary":"对于初学者，我们提供了一些节省积分的建议。","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"639a792e-2d7c-4e5e-a22b-7363afd1198d","title":"选择 LLM","href":"/zh/articles/12129349-choosing-llms"},{"key":"6d167326-69ec-45c5-9046-396176fd819a","title":"集成 AI 工具","href":"/zh/articles/13362318-ai-integrations"},{"key":"48dbad87-adb8-4415-910b-05984100b5e8","title":"编辑文件和内容","href":"/zh/articles/12175569-how-to-modify-files-or-content"}],"prevArticle":{"slug":"12129489-content-formatting-guide","title":"格式化内容和图表","href":"/zh/articles/12129489-content-formatting-guide"},"nextArticle":{"slug":"13361567-build-your-own-e-commerce-website-on-atoms","title":"构建电子商务网站","href":"/zh/articles/13361567-build-your-own-e-commerce-website-on-atoms"},"iconId":"icon-page-user-credit","sectionTitle":"技巧与教程"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
