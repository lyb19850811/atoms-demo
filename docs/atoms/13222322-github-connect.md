# GitHub 集成

> 来源：https://help.atoms.dev/zh/articles/13222322-github-connect
> 更新时间：2026年7月12日

## **什么是 GitHub？**

GitHub 是一个用于存储、管理和协作开发代码的在线平台，同时也是全球最大的开源社区。你可以将项目上传到 GitHub，以清晰地追踪代码何时发生了更改以及为什么发生这些更改。GitHub 允许多个人同时在同一个项目上工作、相互审查更改、提出建议并展开讨论。

总体而言，这种体验类似于一个支持完整版本历史的多人在线文档。正因如此，GitHub 已成为现代软件开发中几乎不可或缺的基础设施。

从核心来看，GitHub 最擅长的是版本控制。它构建于 Git 之上，而 Git 是一种能够持续记录项目演进过程的版本控制系统。无论你是独立开发，还是与他人并行协作，这项能力都能显著降低试错成本，让复杂项目中的协作更加可控和透明。

GitHub 还提供稳定可靠的代码托管。每个项目都会存储在一个仓库中，所有源代码和相关文件都集中保存在同一处。仓库可以是公开的，供任何人浏览和学习；也可以是私有的，仅特定成员可访问，从而满足不同项目阶段和类型下的隐私与安全需求。借助基于云的托管，代码不再绑定于某一台计算机，而是成为可长期保存、随时可访问的数字资产。

从协作角度来看，GitHub 让团队开发更有结构且更高效。讨论、缺陷跟踪和功能规划都可以直接围绕代码本身进行。这些对话和决策也会作为项目历史的一部分被保留下来。这种“以代码为中心的协作”模式，是许多团队选择 GitHub 的关键原因之一。

此外，GitHub 还是一个高度活跃的社区。大量高质量的开源项目在这个平台上持续演进。任何人都可以阅读其代码、学习其实现方式，甚至直接参与贡献。开发者通过给项目加星、关注和 fork 项目，彼此之间建立了紧密联系。因此，GitHub 不仅是一个工具，更是一个持续推动软件创新的生态系统。

## **我应该在什么时候使用 GitHub？**

当你希望将代码安全地存储在云端，作为长期资产保存；当你需要与他人协作，并希望协作过程可记录、可追溯；或者当你想参与开源项目、向社区学习并分享自己的成果时，GitHub 都是自然而高效的选择。

从使用方式上看，GitHub 的核心逻辑很直接：你为一个项目创建仓库，在其中持续进行更改，并在适当的时候与他人同步这些更改，或者拉取他们的更新。在 Atoms 这样的工具中，这一工作流被进一步简化。用户只需完成授权、创建或连接仓库，并通过直观的 Push 和 Pull 操作与 GitHub 协作，而无需深入理解底层技术细节。

## **GitHub 在 Atoms 中如何工作？**

在 Atoms 中，GitHub 充当长期存储与协作的可信基础。Atoms 负责生成、修改和组织代码，而 GitHub 负责可靠地保存成果，并提供版本历史和协作能力。二者结合后，用户无需掌握复杂的工程流程，也能以接近专业开发团队的方式开展工作。

当你在 Atoms 中启动一个项目时，可以选择将其连接到 GitHub。完成授权后，你需要在 Atoms 中手动创建一个新仓库。从那时起，项目的每一个重要里程碑都可以同步到 GitHub，形成清晰且可追溯的历史记录。这意味着即使你切换设备、更换工具，或将项目暂停一段时间，你的工作仍然会被完整、安全地保留下来，并可随时继续。

在实践中，你可以将 Atoms 视为“活跃工作区”，将 GitHub 视为“最终归档与协作中心”。你在 Atoms 中借助智能体迭代需求、生成代码并修复问题；当某个阶段稳定后，再将结果 push 到 GitHub。这样既能避免频繁同步带来的不必要打断，又能确保关键里程碑被安全保存。

要启用 GitHub 集成，请进入工作区，点击右上角的 **Integrations**，然后在下拉菜单中启用 GitHub。此操作也会反映在 **Settings** 面板中。你也可以直接在 **Settings** 页面启用 GitHub。你需要登录你的 GitHub 账户并授权 Atoms，以完成连接。

目前，GitHub 集成功能仅对 Pro+ 用户开放。

GitHub 还为 Atoms 项目带来了内置的协作潜力。你可以邀请他人访问你的仓库，以审查项目结构和实现方式，甚至直接贡献更改。这种协作不要求对方使用 Atoms；它通过 GitHub 这一通用平台进行，从而实现跨工具、跨角色的协作，对个人开发者和小型团队尤其友好。

更重要的是，通过与 GitHub 集成，Atoms 项目不再只是一次性的“生成结果”，而是可以持续演进的长期资产。代码可以被复用、扩展、审查和维护，也可以在合适的时候公开，以加入更广泛的开源生态。这让 Atoms 的价值从“加速今天的开发”延伸到“为未来项目构建可持续的基础”。

## **用户故事**

在真实使用场景中，Atoms 中的 GitHub 集成往往发生在项目一开始。以用户 A 这位首次使用 Atoms 的用户为例。他希望生成的代码能够直接保存到 GitHub，而不是只保留在本地环境中。进入 Atoms 工作区后，他在右上角的 **Integrations** 下拉菜单中点击了 **GitHub 集成**，并在 **Settings** 面板中完成了 GitHub 授权。授权完成后，GitHub 模块显示为已连接状态，表示 Atoms 可以访问他的 GitHub 账户。

接下来，用户 A 直接在聊天中创建了一个新仓库。他输入了符合 GitHub 要求的仓库名称并确认创建。之后，他继续在 Atoms 中生成和完善代码。当他觉得当前阶段已经稳定时，只需点击 **Push**，本地代码更新就会同步到 GitHub。几秒钟内，他就能在 GitHub 上看到对应的 commit，并清楚了解其中包含了哪些更改。

此时，用户 A 继续在 Atoms 中与智能体协作实现具体功能。完成更改后，他再次点击 **Push**，所有更新都会同步回 GitHub。其他团队成员几乎可以立即看到新的 commits。通过点击 **Pull**，用户 A 还可以将远程更新同步回本地环境，确保自己的环境始终与团队进度保持一致。

这些场景展示了 Atoms 如何将 GitHub 用作稳定且通用的协作基础。无论是启动一个全新的项目，还是对接现有的团队仓库，Atoms 都能够无缝融入既有工作流，让生成式开发成为软件生命周期中可持续且可协作的一部分。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"61276e2d-bb2d-4f51-b934-311c2c263395","title":"关于","articles":[{"slug":"15112407-connect-and-use-integrations","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations","iconId":"icon-menu-integrations"}],"children":[]},{"id":"6a4530b3-036b-4bee-8f0e-304b46563166","title":"连接器","articles":[{"slug":"13222322-github-connect","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect","iconId":"icon-logo-github"},{"slug":"12129788-supabase-connect","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect","iconId":"icon-menu-supabase"},{"slug":"12129347-stripe-connect","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect","iconId":"icon-logo-stripe"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"48ccd53e-f47a-450f-8574-0ea33db3adfc","articleSlug":"13222322-github-connect","path":"/zh/articles/13222322-github-connect"}],["$","$L26",null,{"locale":"zh","articleId":"48ccd53e-f47a-450f-8574-0ea33db3adfc","articleSlug":"13222322-github-connect","path":"/zh/articles/13222322-github-connect","title":"GitHub 集成","summary":"将你的 Atoms 项目与 GitHub 连接。","updatedAt":"2026年7月12日","markdown":"$27","relatedArticles":[{"key":"75a48b71-fdf7-4012-854d-eb3b6b143811","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations"},{"key":"9c7605d4-565e-48f3-8517-586c2d590979","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect"},{"key":"e9fa65b1-5ad8-4755-b94b-56f2ecb88769","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect"}],"prevArticle":{"slug":"15112407-connect-and-use-integrations","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations"},"nextArticle":{"slug":"12129788-supabase-connect","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect"},"iconId":"icon-logo-github","sectionTitle":"连接器"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
