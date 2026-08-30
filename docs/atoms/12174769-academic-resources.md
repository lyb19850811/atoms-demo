# 访问学术资料

> 来源：https://help.atoms.dev/zh/articles/12174769-academic-resources
> 更新时间：2026年7月29日

Atoms 与全球顶尖大学和研究机构合作，产出有关多智能体框架、LLM 推理、上下文增强和自动化工作流的前沿研究。

这些成果不仅推动了理论进展，也增强了 Atoms 在多智能体协作、数据解读、RAG 增强推理和提示词优化等领域的产品能力。

## **1\. 不点击就不知道：用于生产就绪软件评估的自动化 GUI 测试**

**摘要**

随着大语言模型（LLM）和代码智能体从生成孤立代码片段发展到构建带有 GUI、交互逻辑和动态行为的完整应用，现有基准已无法有效评估生产就绪软件。静态检查或二元通过/失败脚本忽视了现实世界中的可用性，而这种可用性只有通过交互才能显现。

为了解决这一问题，作者提出了 **RealDevWorld** ，这是一个端到端自动化评估框架，用于测试 LLM 从零生成生产就绪代码仓库的能力。

**主要贡献**

-   首个面向生产就绪应用的基于 GUI 的端到端评估框架。
    
-   提出了 **RealDevBench** ，一个包含 194 个多样化多模态工程任务的基准。
    
-   提出了 **AppEvalPilot** ，一种作为评审者的智能体系统，通过模拟基于 GUI 的用户交互进行整体评估。
    
-   在减少人工审查依赖的同时，实现了较高的人类一致性（准确率 0.92，相关性 0.85）。
    

阅读更多：[https://arxiv.org/abs/2508.14104](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F9bae721ee7f89114-2508.14104)

## **2\. 基础智能体的进展与挑战：从类脑智能到演化式、协作式与安全系统**

**摘要**

LLM 的出现推动了 AI 的变革性转变，使能够跨领域进行推理、感知和行动的智能体成为可能。设计、评估并持续改进此类智能体面临多方面挑战。

这篇综述全面概述了 **Foundation Agents** ，并通过类脑模块化架构进行阐释，融合了认知科学、神经科学与计算领域的见解。

**主要贡献**

-   提出一个模块化框架，将智能体组件映射到大脑功能（记忆、建模、目标、情绪）。
    
-   探索通过演化机制实现自我提升和持续适应。
    
-   研究多智能体系统与涌现的群体智能。
    
-   讨论现实部署中的安全性、鲁棒性和对齐挑战。
    

阅读更多：[https://arxiv.org/abs/2504.01990](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F140c2173bc270f39-2504.01990)

## **3\. 用于马尔可夫 LLM 测试时扩展的 Atom of Thoughts**

**摘要**

LLM 能从训练阶段的扩展中受益，而 **test-time scaling** 进一步增强了推理能力。然而，累积的历史上下文可能会浪费计算资源并阻碍推理。

该论文提出了 **Atom of Thoughts (AoT)** ，它将复杂推理分解为 **原子化、无记忆的子问题** ，从而形成类似马尔可夫过程的推理流程。

**主要贡献**

-   定义了 **原子推理** ：将问题分解为 DAG 子问题并对其进行收缩。
    
-   可作为插件兼容现有的测试时扩展方法。
    
-   通过减少上下文冗余和计算浪费来提升效率。
    
-   在六项基准测试中展示了显著的性能提升。
    

阅读更多：[https://arxiv.org/abs/2502.12018](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F0fe4f66233f76779-2502.12018)

## **4\. Self-Supervised Prompt Optimization (SPO)**

**摘要**

高质量提示词对于增强 LLM 推理至关重要，但手动设计提示词需要专业知识和反复迭代。现有自动化方法高度依赖带标注的参考数据，限制了其在现实场景中的适用性。

**SPO** 提出了一种自监督框架，无需外部参考即可为封闭式和开放式任务发现有效提示词。

**主要贡献**

-   完全从 LLM 输出中获得自监督信号。
    
-   将 LLM 同时用作评估器和优化器。
    
-   以传统方法 **1–5% 的成本** 达到最先进性能。
    

阅读更多：[https://arxiv.org/abs/2502.06855](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F3d753e3d8315715c-2502.06855)

## **5\. 通过原生检索增强推理（CARE）提升上下文保真度**

**摘要**

LLM 经常会产生与给定上下文不一致的幻觉答案。传统解决方案要么需要昂贵的监督数据集，要么依赖外部检索，无法充分利用用户提供的上下文。

**CARE** 提出了一种 **原生检索增强推理** 框架，使 LLM 能够将上下文内证据动态直接整合到推理链中。

**主要贡献**

-   将上下文内检索引入为推理过程的一部分。
    
-   只需极少标注数据，并对复杂任务使用课程学习。
    
-   在问答基准上优于 SFT、传统 RAG 和外部检索方法。
    

阅读更多：[https://openreview.net/forum?id=qTsU1QLOph](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F14aba8bacae33b91-forum)

## 6\. **FACT：考察用于多事实检索的迭代式上下文重写效果**

**摘要**

大语言模型（LLM）擅长从长上下文中检索单一事实，但在需要同时检索多个事实时表现欠佳。观察到的一个关键限制是 **“lost-in-the-middle” 现象** ，即 LLM 在生成过程中会逐渐丢失对重要信息的追踪，从而导致输出不完整或不准确。

为了解决这一问题，作者提出了 **Find All Crucial Texts (FACT)** ——一种 **迭代式上下文重写方法** ，通过逐步优化输入，使模型能够一步步捕获关键信息。

**主要贡献**

-   识别并分析了多事实检索中的“lost-in-the-middle”现象。
    
-   提出了 **FACT** ，一种通过迭代检索与重写来逐步提升事实覆盖率的方法。
    
-   在多事实检索基准中展示了显著性能提升，但在通用问答任务上的提升较小。
    
-   强调了在长上下文检索中需要更稳健的策略。
    

阅读更多：[https://arxiv.org/abs/2410.21012](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F5483011491700581-2410.21012)

## **7\. SELA：用于自动化机器学习的树搜索增强 LLM 智能体**

**摘要**

基于 LLM 的 AutoML 智能体往往会生成多样性较低且次优的流水线。 **SELA** 利用蒙特卡洛树搜索（MCTS）来优化智能体决策和流水线探索。

**主要贡献**

-   应用树搜索方法来提升 AutoML 探索效果。
    
-   结合实验反馈对流水线进行迭代优化。
    
-   在 20 个数据集上优于传统和基于智能体的 AutoML 基线。
    

阅读更多：[https://arxiv.org/abs/2410.17238](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F89dbe78710ffc7b9-2410.17238)

## **8\. AFlow：自动生成智能体式工作流**

**摘要**

为 LLM 构建智能体式工作流既费时费力，也尚未实现完全自动化。 **AFlow** 将工作流优化重新表述为代码图上的搜索问题，并利用 MCTS 结合执行反馈对工作流进行迭代优化。

**主要贡献**

-   将工作流优化定义为代码图搜索。
    
-   使更小的模型能够以极低成本超越 GPT-4o。
    
-   相比最先进基线实现了 **5.7% 的提升** 。
    

阅读更多：[https://arxiv.org/abs/2410.10762](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F9641fb4f7e4bbacc-2410.10762)

## **9\. Data Interpreter：用于数据科学的 LLM 智能体**

**摘要**

现有方法在端到端数据科学工作流、动态任务依赖关系和领域专业知识要求方面面临困难。

**Data Interpreter** 引入了：

-   **分层图建模** ：将问题拆分为带有动态节点的子问题。
    
-   **可编程节点生成** ：通过迭代优化和验证代码来提升稳健性。
    

**主要贡献**

-   首个专为完整数据科学工作流打造的 LLM 智能体。
    
-   在 InfiAgent-DABench 上实现 **25% 的准确率提升** 。
    
-   显著提升了机器学习、开放式任务和 MATH 数据集上的表现。
    

阅读更多：[https://arxiv.org/abs/2402.18679](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2F8def13d0c408f6f1-2402.18679)

## **10\. MetaGPT：用于多智能体协作框架的元编程**

**摘要**

基于 LLM 的多智能体系统在复杂任务上常因级联幻觉而失败。 **MetaGPT** 将 **标准操作流程（SOP）** 编码进提示词序列，从而简化工作流并减少错误。

**主要贡献**

-   为多智能体协作引入元编程。
    
-   将基于 SOP 的人工工作流纳入智能体提示词中。
    
-   实现高效的角色分配和任务拆解。
    
-   在协作式软件工程任务中展示出更优的稳定性和准确性。
    

阅读更多：[https://arxiv.org/abs/2308.00352](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12174769%2Fa269c568b98611fd-2308.00352)10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"715f9efd-5b83-4236-a29f-f76d2c580fc0","title":"技巧与教程","articles":[{"slug":"12129349-choosing-llms","title":"选择 LLM","href":"/zh/articles/12129349-choosing-llms","iconId":"icon-general-language"},{"slug":"13362318-ai-integrations","title":"集成 AI 工具","href":"/zh/articles/13362318-ai-integrations","iconId":"icon-page-ai"},{"slug":"12175569-how-to-modify-files-or-content","title":"编辑文件和内容","href":"/zh/articles/12175569-how-to-modify-files-or-content","iconId":"icon-viewer-design"},{"slug":"12129489-content-formatting-guide","title":"格式化内容和图表","href":"/zh/articles/12129489-content-formatting-guide","iconId":"icon-sheet-visualization"},{"slug":"12130438-optimizing-credit-usage","title":"优化积分使用","href":"/zh/articles/12130438-optimizing-credit-usage","iconId":"icon-page-user-credit"},{"slug":"13361567-build-your-own-e-commerce-website-on-atoms","title":"构建电子商务网站","href":"/zh/articles/13361567-build-your-own-e-commerce-website-on-atoms","iconId":"icon-page-ui-builder"},{"slug":"12255658-how-to-scale-up-your-business-with-atoms","title":"拓展您的业务","href":"/zh/articles/12255658-how-to-scale-up-your-business-with-atoms","iconId":"icon-home-finance"},{"slug":"12174769-academic-resources","title":"访问学术资料","href":"/zh/articles/12174769-academic-resources","iconId":"icon-help-academic"},{"slug":"12255829-how-to-explore-your-creative-ideas-on-atoms","title":"探索创意想法","href":"/zh/articles/12255829-how-to-explore-your-creative-ideas-on-atoms","iconId":"icon-menu-explorer-program"}],"children":[]},{"id":"2105a5c9-094c-48b9-a189-03f6a1fae7a2","title":"故障排查","articles":[{"slug":"12129490-error-message-guide","title":"错误信息指南","href":"/zh/articles/12129490-error-message-guide","iconId":"icon-general-warning"},{"slug":"12129491-agent-performance-issues","title":"智能体性能问题","href":"/zh/articles/12129491-agent-performance-issues","iconId":"icon-backend-ai-capabilities"},{"slug":"12129492-data-display-issues","title":"数据与显示问题","href":"/zh/articles/12129492-data-display-issues","iconId":"icon-sheet-data"},{"slug":"12129493-code-file-management","title":"代码与文件管理","href":"/zh/articles/12129493-code-file-management","iconId":"icon-chat-create-code-file"},{"slug":"12129494-deployment-preview-errors","title":"部署与预览错误","href":"/zh/articles/12129494-deployment-preview-errors","iconId":"icon-editor-preview"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"feed1709-0a5e-4c33-b9a5-e9c3d7aacb2b","articleSlug":"12174769-academic-resources","path":"/zh/articles/12174769-academic-resources"}],["$","$L26",null,{"locale":"zh","articleId":"feed1709-0a5e-4c33-b9a5-e9c3d7aacb2b","articleSlug":"12174769-academic-resources","path":"/zh/articles/12174769-academic-resources","title":"访问学术资料","summary":"关于 Atoms 多智能体、推理和工作流能力的研究论文与学术资料。","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"639a792e-2d7c-4e5e-a22b-7363afd1198d","title":"选择 LLM","href":"/zh/articles/12129349-choosing-llms"},{"key":"6d167326-69ec-45c5-9046-396176fd819a","title":"集成 AI 工具","href":"/zh/articles/13362318-ai-integrations"},{"key":"48dbad87-adb8-4415-910b-05984100b5e8","title":"编辑文件和内容","href":"/zh/articles/12175569-how-to-modify-files-or-content"}],"prevArticle":{"slug":"12255658-how-to-scale-up-your-business-with-atoms","title":"拓展您的业务","href":"/zh/articles/12255658-how-to-scale-up-your-business-with-atoms"},"nextArticle":{"slug":"12255829-how-to-explore-your-creative-ideas-on-atoms","title":"探索创意想法","href":"/zh/articles/12255829-how-to-explore-your-creative-ideas-on-atoms"},"iconId":"icon-help-academic","sectionTitle":"技巧与教程"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
