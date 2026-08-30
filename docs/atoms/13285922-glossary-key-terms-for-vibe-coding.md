# 关键术语与词汇表

> 来源：https://help.atoms.dev/zh/articles/13285922-glossary-key-terms-for-vibe-coding
> 更新时间：2026年7月29日

本指南将拆解你在使用代码和 AI 工具时会遇到的常见术语。我们尽量保持定义简单，帮助你快速上手。

## Atoms 专属术语

-   **团队模式：** 启用一支 AI 智能体团队来为你处理复杂需求，包括产品经理、工程师、数据科学家、深度研究员和架构师。
    
-   **工程师模式：** 仅分配工程师智能体 Alex 来处理你的项目。
    
-   **赛马模式：** 允许你同时在多个模型上运行相同的提示词，以比较它们的输出结果。
    
-   **深度研究：** 一项用于 **开展** 深度研究并 **生成** 专业报告的功能，包括学术论文、商业分析和市场报告。
    
-   **App 预览：** 允许 **你** 预览结果，并直接在页面上修改任何可视元素。
    
-   **克隆：** 让你将任何项目复制到你自己的聊天中，以便从那里继续构建或编辑。
    
-   **发布：** 为你当前的应用生成一个稳定链接，便于分享。
    
-   **App 世界：** Atoms 的创意平台，你可以在这里展示你的作品，并在首页 **突出展示** 你的技能。
    

## LLM 与 Vibe Coding

-   **Vibe Coding：** 一种通过用通俗英语告诉 AI 你的需求（即“感觉”或意图），再由它生成实际代码的软件编写方式。你关注的是应用是否 _感觉_ 正确、运行是否正常，而不是去纠结分号或具体逻辑。
    
-   **人工智能（AI）：** 一个广义术语，指能够执行通常需要人类智能才能完成任务的计算机系统——例如语音识别、决策或语言翻译。
    
-   **LLM（大型语言模型）：** 一种基于海量文本训练的 AI。这项技术支撑了 ChatGPT 和 Claude 等工具。它非常擅长预测一句话中的下一个词，因此能够撰写文章、回答问题和编写代码。
    
-   **幻觉：** 指 AI 非常自信地给出完全错误的答案。AI 模型很擅长让自己听起来很有说服力，因此你应该始终仔细核查它生成的代码或事实。
    
-   **提示词：** 你输入给 AI 以获取答案的文本。“提示词工程”其实只是一个更花哨的说法，意思是“学习如何提出正确的问题，以获得最佳结果”。
    
-   **Token：** AI 的计数方式。AI 看到的不是“单词”，而是“Token”。一个 Token 大约相当于四个文本字符。例如，单词 “apple” 是一个 Token，但一个又长又复杂的单词可能是三个 Token。AI 的成本和限制通常都以 Token 来衡量。
    
-   **人工介入机制：** 那就是你。即使 AI 在编写代码，你也是流程中的“管理者”。你负责审查工作、抽查检查，并在 AI 偏离方向时引导它。你不再是 _编写者_，而成为了 _审阅者_。
    
-   **迭代：** 通过对话不断完善代码的过程。在 vibe coding 中，你很少能第一次就做到完美。你会通过说“把那个按钮调大一点”“修复第 10 行的错误”或“不，换个颜色”这样的话来进行“迭代”。
    

## 编码基础

-   **API（应用程序编程接口）：** 一座让两个不同程序彼此通信的桥梁。你可以把它想象成餐厅里的服务员：你（用户）把订单交给服务员（API），然后他们从厨房（系统）把食物端给你，而你不需要知道食物是怎么做出来的。
    
-   **Bug：** 代码中的错误或故障，会导致软件崩溃或出现异常行为。
    
-   **版本控制（Git）：** 代码的“时光机”。它会追踪任何人做出的每一次修改，所以如果哪里出了问题，你可以轻松回退到一个可正常工作的版本。
    
-   **前端（客户端）：** 这是你在屏幕上能看到并能操作的一切。包括按钮、文本、图片和动画。如果你正在浏览一个网站，“前端”就是在你的浏览器中运行的部分。
    
-   **后端（服务器端）：** 这是运行在远程计算机（服务器）上的应用“大脑”。它处理数据、保存你的文件，并管理用户看不到的逻辑。
    
-   **UI（用户界面）：** 应用的具体设计与布局。它指的是“外观与体验”——配色方案、按钮形状以及文本的可读性。
    
-   **全栈：** 指能够同时处理 _前端_ 和 _后端_ 的开发者（或工具）。
    

## 软件开发概念

-   **产品经理：** 决定要构建 _什么_ 以及 _为什么_ 构建的人。他们就像某个具体功能的“CEO”，需要在用户需求和业务需求之间取得平衡。他们撰写方案（PRD），但通常不编写代码。
    
-   **工程师：** 构建者。他们接收产品经理的方案，并编写真正让功能运作起来的代码。他们会思考 _如何_ 高效且安全地构建它。
    
-   **架构师：** 软件领域的“城市规划师”。他们通常不会编写每一行代码；相反，他们负责做出高层决策，例如使用哪些技术，以及系统不同部分应如何连接，从而确保整个系统在不断扩展时不会崩塌。
    
-   **数据科学家：** 侦探。他们会查看应用产生的大量数据（如用户点击或销售数据），并利用数学和代码寻找模式，帮助企业做出更明智的决策。
    
-   **深度研究员：** 一个专注于研究复杂未知主题的角色（有时也是一种专门的 AI 智能体）。与普通搜索不同，深度研究员会深入查阅学术论文、技术文档和长篇报告，从而针对困难主题综合出全面的答案。
    

## 策略与增长

-   **SEO（搜索引擎优化）：** 一门通过优化你的网站，让它出现在 Google 搜索结果顶部的技术。它包括使用正确的关键词、让网站足够快，以及确保其他网站链接到你。
    
-   **增长：** 营销与工程的结合，唯一目标就是获得 _更多_ 用户。“增长工程师”可能会专门构建某些功能，鼓励人们邀请朋友，或更快完成注册。
    
-   **PRD（产品需求文档）：** 某项功能的“蓝图”。这份文档由产品经理撰写，准确说明新功能应该做什么、应该呈现什么样子，以及如何衡量成功。工程师会把它当作操作说明书来使用。
    

## 页面结构与导航

-   **标题（Titles）：** 页面内容的大纲。在代码中，它们标记为 H1、H2、H3 等。H1 是主标题（像书名），H2 则是章节标题。它们能帮助用户和 Google 理解你的页面内容是什么。
    
-   **页脚：** 每个页面最底部的区域。它就像网站的“杂物抽屉”——放置那些重要但不是主要焦点的内容，比如法律政策、联系信息和社交媒体链接。
    
-   **Favicon：** 出现在网页浏览器标签页上的小图标（位于页面标题旁边）。当用户同时打开二十个标签页时，它能帮助他们快速识别你的网站。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"c4d67508-c9f1-4b56-b857-136153265571","title":"欢迎与概念","articles":[{"slug":"13285922-glossary-key-terms-for-vibe-coding","title":"关键术语与词汇表","href":"/zh/articles/13285922-glossary-key-terms-for-vibe-coding","iconId":"icon-general-bookmark"},{"slug":"12174595-community-support","title":"社区与支持","href":"/zh/articles/12174595-community-support","iconId":"icon-page-support"},{"slug":"12129503-project-scope-capabilities","title":"项目范围与功能","href":"/zh/articles/12129503-project-scope-capabilities","iconId":"icon-block-overview"}],"children":[]},{"id":"f855ab47-f6ae-4eda-9adc-098ad394117b","title":"快速开始","articles":[{"slug":"12129501-before-you-start","title":"开始之前","href":"/zh/articles/12129501-before-you-start","iconId":"icon-planner-tick"},{"slug":"12128979-quick-start","title":"快速开始","href":"/zh/articles/12128979-quick-start","iconId":"icon-viewer-select-to-edit"},{"slug":"12129533-video-tutorials","title":"视频教程","href":"/zh/articles/12129533-video-tutorials","iconId":"icon-help-video-tutorials"}],"children":[]},{"id":"38470dcb-7944-4824-8d3d-c963ce5ad986","title":"与智能体协作","articles":[{"slug":"12174308-communicating-with-agents","title":"与智能体沟通","href":"/zh/articles/12174308-communicating-with-agents","iconId":"icon-help-community"},{"slug":"12175565-how-do-i-correct-an-agent-s-work","title":"纠正智能体工作的指南","href":"/zh/articles/12175565-how-do-i-correct-an-agent-s-work","iconId":"icon-viewer-fix"},{"slug":"12129477-using-multiple-agents","title":"使用多个智能体","href":"/zh/articles/12129477-using-multiple-agents","iconId":"icon-page-agent"}],"children":[]},{"id":"36e14504-e4d2-4ff6-a937-206fda0ba367","title":"账户与设置","articles":[{"slug":"12129480-managing-your-account","title":"管理您的账户","href":"/zh/articles/12129480-managing-your-account","iconId":"icon-setting-user-circle"},{"slug":"12129486-configuration-preferences","title":"配置与偏好设置","href":"/zh/articles/12129486-configuration-preferences","iconId":"icon-setting-preference"}],"children":[]},{"id":"c3097b18-a6d1-467e-b629-15f2f0eeb1d2","title":"政策与法律","articles":[{"slug":"12174753-privacy-policy","title":"隐私政策","href":"/zh/articles/12174753-privacy-policy","iconId":"icon-help-privacy"},{"slug":"12174746-terms-of-service","title":"服务条款","href":"/zh/articles/12174746-terms-of-service","iconId":"icon-page-terms"},{"slug":"12129481-commercial-use-licensing","title":"商业使用与许可","href":"/zh/articles/12129481-commercial-use-licensing","iconId":"icon-home-business-card"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"393bf48c-10c8-4d0a-9806-e4497c7e410c","articleSlug":"13285922-glossary-key-terms-for-vibe-coding","path":"/zh/articles/13285922-glossary-key-terms-for-vibe-coding"}],["$","$L26",null,{"locale":"zh","articleId":"393bf48c-10c8-4d0a-9806-e4497c7e410c","articleSlug":"13285922-glossary-key-terms-for-vibe-coding","path":"/zh/articles/13285922-glossary-key-terms-for-vibe-coding","title":"关键术语与词汇表","summary":"通过这份快速参考指南，掌握 Vibe Coding 的语言。","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"ba7dde8e-ca17-4076-8015-0317a86b75a7","title":"社区与支持","href":"/zh/articles/12174595-community-support"},{"key":"76d969ba-291b-4109-8d53-2b206fbb4ea7","title":"项目范围与功能","href":"/zh/articles/12129503-project-scope-capabilities"},{"key":"4d3cd16d-33f3-4343-8d89-8b32ff1c8438","title":"开始之前","href":"/zh/articles/12129501-before-you-start"}],"prevArticle":"$undefined","nextArticle":{"slug":"12174595-community-support","title":"社区与支持","href":"/zh/articles/12174595-community-support"},"iconId":"icon-general-bookmark","sectionTitle":"欢迎与概念"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
