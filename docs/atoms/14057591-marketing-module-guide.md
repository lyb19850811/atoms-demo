# 营销模块指南

> 来源：https://help.atoms.dev/zh/articles/14057591-marketing-module-guide
> 更新时间：2026年7月12日

## **概览**

营销模块与 [Google Analytics 4](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F14057591%2F6ae12797509f856f-analytics) 集成，用于跟踪网站流量、用户行为和转化信号。GA4 可整合 Web 和移动环境中的数据，并包含预测分析能力，例如购买概率和流失风险。

连接 GA4 后，Markting 可以：

-   监控流量来源和用户获取情况
    
-   跟踪用户跨页面行为
    
-   识别高价值访客
    
-   优化营销活动和增长策略
    

## **开始之前**

请确保已完成以下前置条件：

1.  已有可用的 Google 账户。
    
2.  已在 [Google Analytics 4](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F14057591%2F6ae12797509f856f-analytics) 中创建 GA4 属性。（如果你尚未创建，系统会先引导你在 Atoms 工作区内注册 GA4。）
    
3.  注册 GA4 时，请不要跳过开始收集数据的第五步。
    
    ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F14057591%2F528331740d28d7ec-data-2Bcollection-2Bstep.png)
    
4.  你的网站已拥有正式域名或临时域名。你可以通过 Atoms 购买新域名。有关域名的更多信息，请参阅 [自定义你的域名。](https://help.atoms.dev/en/articles/13362391-connect-and-manage-domains)
    

## **GA4 分步指南**

**步骤 1**：先发布你的网站，如果你有域名，请完成域名自定义。

**步骤 2**：进入营销模块并授权 GA4。

**步骤 3**：在 Google Analytics 中设置站点。

**步骤 4**：如果智能体检测到你的 GA4 脚本不在 index.html 中，你可以点击检查状态。Atoms 的智能体会自动完成设置。

![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F14057591%2Fa7988150bf024bce-Screenshot-2026-03-13-at-16_38_24.png)

**什么是 GA4 脚本？**

-   GA4 脚本是一段 JavaScript 跟踪代码，用于将 Google Analytics 4 集成到网站或应用中。它的作用是收集用户行为数据并将其发送到 GA4 进行分析。
    

-   GA4 脚本的典型结构如下：
    


<!-- Google tag (gtag.js) --> <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script> <script>   window.dataLayer = window.dataLayer || [];   function gtag(){dataLayer.push(arguments);}   gtag('js', new Date());    gtag('config', 'G-XXXXXXX'); </script>


-   **gtag.js**：其官方名称为 **Global Site Tag**，是 **Google Analytics 4** 使用的 JavaScript 跟踪库。这是 Google 提供的一段可复用代码，用于收集网站上的用户行为数据，并将其发送到 Google 的分析或广告系统。
    
-   G-XXXXXXX：GA4 的 Measurement ID，即 GA4 中 Web 数据流的唯一标识符。它会告诉跟踪脚本应将从你的网站收集到的数据发送到哪里。
    

## SEO 表现与运营分步说明

SEO 表现关注的是 SEO 工作是否带来了业务价值。如果你想监控网站表现，只需将其连接到你的域名。

常见指标包括：

-   **自然流量：** 来自搜索引擎的流量
    
-   **关键词排名：** 目标关键词在搜索结果中的位置
    
-   **CTR：** 搜索结果中的点击率
    
-   **展示次数：** 你的页面在搜索结果中出现的频率
    
-   **转化：** 由 SEO 流量带来的转化
    
-   **落地页表现：** 各个 SEO 落地页的表现情况
    

**SEO 运营仪表板** 用于监控网站在被搜索引擎收录后的表现。如果你希望更多人发现你的项目，Atoms 会自动将其提交到 Google Search Console**。** 如果自动设置失败，你也可以[手动连接](https://help.atoms.dev/en/articles/12752284-boosting-your-seo)。

![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F14057591%2F56bc9ee0a8c33a8c-Screenshot-2026-03-13-at-19_17_26.png)

目前，**Atoms 营销模块** 支持监控以下指标：

-   **已收录页面总数：** 被搜索引擎收录的页面数量。
    
-   **点击次数：** 来自搜索结果的点击数量。
    
-   **展示次数：** 你的页面在搜索结果中出现的次数。
    
-   **CTR：** 搜索结果中的点击率。
    
-   **排名：** 关键词在搜索结果中的平均排名位置。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"8656fc04-80dc-4f3a-b98a-8631c404eb81","title":"智能体与模式","articles":[{"slug":"12129380-your-agents-team","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team","iconId":"icon-help-agent-team"},{"slug":"12129385-mode-switching-guide","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide","iconId":"icon-help-star"},{"slug":"12129504-race-mode","title":"赛马模式","href":"/zh/articles/12129504-race-mode","iconId":"icon-race-boost"},{"slug":"12136255-deep-research","title":"深度研究","href":"/zh/articles/12136255-deep-research","iconId":"icon-chat-dr"},{"slug":"14342754-adrian-ads-agent-for-automated-campaigns","title":"Adrian：广告智能体","href":"/zh/articles/14342754-adrian-ads-agent-for-automated-campaigns","iconId":"icon-logo-google-ads"}],"children":[]},{"id":"47aab372-483c-41ca-a8b7-d9686ab73e8b","title":"构建与项目","articles":[{"slug":"12129478-build-export","title":"构建与导出","href":"/zh/articles/12129478-build-export","iconId":"icon-mobile-build-progress"},{"slug":"12129483-deployment-options","title":"部署选项","href":"/zh/articles/12129483-deployment-options","iconId":"icon-setting-ai-cloud"},{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions","iconId":"icon-setting-branches"},{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management","iconId":"icon-menu-projects"},{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer","iconId":"icon-block-app-viewer"},{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report","iconId":"icon-chat-issue-report"},{"slug":"12129010-remix","title":"克隆","href":"/zh/articles/12129010-remix","iconId":"icon-chat-remix"},{"slug":"12129484-publish","title":"发布","href":"/zh/articles/12129484-publish","iconId":"icon-menu-publish"},{"slug":"12129279-share","title":"分享","href":"/zh/articles/12129279-share","iconId":"icon-menu-share"},{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace","iconId":"icon-chat-team"}],"children":[]},{"id":"5d5b4afb-9440-4c5f-817e-30645d4536b4","title":"云 · SEO · 增长","articles":[{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud","iconId":"icon-page-cloud"},{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet","iconId":"icon-setting-payment-history"},{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo","iconId":"icon-block-seo"},{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide","iconId":"icon-general-compass"},{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains","iconId":"icon-setting-domain"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"f4a5744a-d424-44d6-8e9e-295a1296c41d","articleSlug":"14057591-marketing-module-guide","path":"/zh/articles/14057591-marketing-module-guide"}],["$","$L26",null,{"locale":"zh","articleId":"f4a5744a-d424-44d6-8e9e-295a1296c41d","articleSlug":"14057591-marketing-module-guide","path":"/zh/articles/14057591-marketing-module-guide","title":"营销模块指南","summary":"Atoms 营销模块与 GA4 集成，用于跟踪网站流量、用户行为、转化和 SEO 表现。","updatedAt":"2026年7月12日","markdown":"$27","relatedArticles":[{"key":"f6e5e0ef-e9fa-4495-a0c3-d74c2a16209c","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team"},{"key":"a621f1b0-c0cf-4f4d-a461-294f5b1a6568","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide"},{"key":"07ce9141-5b0f-455f-8395-8d8bf4cdb51a","title":"赛马模式","href":"/zh/articles/12129504-race-mode"}],"prevArticle":{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo"},"nextArticle":{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains"},"iconId":"icon-general-compass","sectionTitle":"云 · SEO · 增长"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
