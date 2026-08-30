# 云与 AI 钱包

> 来源：https://help.atoms.dev/zh/articles/14432563-cloud-ai-wallet
> 更新时间：2026年7月12日

## **什么是云与 AI 钱包？**

云与 AI 钱包用于管理云（计算、存储、网络）和 AI（模型使用、智能体等）的余额。

共有三种类型的余额：

-   **云与 AI（钱包余额）：** 用于支付云和 AI 使用费用的预付金额。
    
-   **云：** 您剩余的云使用免费额度。
    
-   **AI：** 您剩余的 AI 使用免费额度。
    

## **如何为云与 AI 钱包充值？**

1.  在云与 AI 页面点击 **充值**。
    
2.  选择金额（预设选项或自定义输入，范围为 10 美元到 1,000 美元）。
    
3.  选择支付方式（信用卡/借记卡、Amazon Pay、支付宝等）并确认。
    
4.  支付成功后，您的余额会立即更新。如果支付失败，请尝试其他支付方式。
    

## **何时会使用 AI 钱包？**

AI 钱包会在预览和生产环境中用于您应用内的 AI能力（例如文本、图像和视频生成）。一旦您的 **免费 AI 额度（1 美元）** 用尽，您将需要为云与 AI 钱包充值，才能继续使用这些能力。

## **如何设置余额提醒和月度限额？**

可在云与 AI 页面右上角进入相关设置。

-   **余额提醒：**
    
    当您的余额低于设定阈值时，接收电子邮件或应用内通知。您可以使用默认阈值（通常为 5 美元）启用，也可以自定义。
    
-   **月度限额：**
    
    为您的钱包设置每月总支出上限（例如默认 500 美元）。
    
    此限额适用于合并后的云与 AI 使用费用。
    
    例如，若限额为 100 美元，云 40 美元 + AI 60 美元将触发该限额。
    
    达到限额后，您可以选择：
    
    -   **暂停所有应用（默认）：** 停止所有与云和 AI 相关的应用。
        
    -   **仅通知：** 发送提醒但不暂停服务。
        
    
    如果您设置的新限额低于当前使用金额，它会立即生效，并可能会暂停您的应用。
    

**注意：**

实际每月费用可能会略微超过所设限额，原因如下：

-   使用费用是在消费后计费的。
    
-   云存储按小时计费，因此即使暂停后，暂停前已累积的费用仍可能继续计入。这属于正常情况，原因包括：
    
    -   **后付费计费：** 使用是在消费后收费，因此已经产生的使用量仍会被计费。
        
    -   **按小时存储计费：** 存储费用按小时收取；暂停前产生的使用量仍会被计费。
        
    -   **触发时机：** 只有在达到或超过阈值后才会执行该限额，因此总额可能会略微超出。
        
-   月度限额旨在控制风险并防止无限制支出，而不是强制性的硬性停止。
    

## **如何查看云和 AI 使用情况？**

前往云与 AI 钱包中的 **Usage** 选项卡：

-   查看 **AI Usage** 和 **Cloud Usage** 汇总
    
    （云使用情况还会进一步细分为计算、存储、网络和其他）。
    
-   按**项目**查看使用情况，包括：
    
    -   AI 使用情况
        
    -   云使用情况
        
    -   Open Chat 入口，便于快速访问并调整配置或流量
        

使用数据每天更新一次（UTC 0:00），帮助您识别高成本项目并进行相应优化。

## **我可以在 Transactions 中看到什么？**

**Transactions** 选项卡仅显示资金流动（不显示详细的使用费用）。

类型包括：

-   手动充值
    
-   自动充值
    
-   发放的赠金（平台积分）
    
-   退款/调整
    

点击任意记录即可查看详情，以便对账或确认。

## **支持哪些支付方式？**

您可以在 **Manage Billing**、充值或自动充值流程中添加和管理支付方式，包括：

-   信用卡/借记卡
    
-   Amazon Pay
    
-   支付宝
    

添加后，这些支付方式可同时用于手动充值和自动充值。

## **免费套餐用户可以为钱包充值吗？**

不可以。免费套餐用户必须先升级到 Pro 套餐或 Max 套餐，之后才能充值。

云与 AI 钱包页面会引导您进行升级。升级后，充值、自动充值和支付管理功能将立即可用。

## **为什么我的应用突然停止了？**

最可能的原因是您的钱包余额和免费额度都已用完。

请在云与 AI 钱包中检查您的余额。请启用自动充值或余额提醒，以避免服务中断。

## **费用是云还是 AI 产生的？如何识别项目？**

在 **Usage** 选项卡中，您可以按项目查看使用情况，并区分云和 AI 成本。**Transactions** 选项卡仅显示资金变动（充值、退款、积分），不显示详细的使用费用。10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"8656fc04-80dc-4f3a-b98a-8631c404eb81","title":"智能体与模式","articles":[{"slug":"12129380-your-agents-team","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team","iconId":"icon-help-agent-team"},{"slug":"12129385-mode-switching-guide","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide","iconId":"icon-help-star"},{"slug":"12129504-race-mode","title":"赛马模式","href":"/zh/articles/12129504-race-mode","iconId":"icon-race-boost"},{"slug":"12136255-deep-research","title":"深度研究","href":"/zh/articles/12136255-deep-research","iconId":"icon-chat-dr"},{"slug":"14342754-adrian-ads-agent-for-automated-campaigns","title":"Adrian：广告智能体","href":"/zh/articles/14342754-adrian-ads-agent-for-automated-campaigns","iconId":"icon-logo-google-ads"}],"children":[]},{"id":"47aab372-483c-41ca-a8b7-d9686ab73e8b","title":"构建与项目","articles":[{"slug":"12129478-build-export","title":"构建与导出","href":"/zh/articles/12129478-build-export","iconId":"icon-mobile-build-progress"},{"slug":"12129483-deployment-options","title":"部署选项","href":"/zh/articles/12129483-deployment-options","iconId":"icon-setting-ai-cloud"},{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions","iconId":"icon-setting-branches"},{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management","iconId":"icon-menu-projects"},{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer","iconId":"icon-block-app-viewer"},{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report","iconId":"icon-chat-issue-report"},{"slug":"12129010-remix","title":"克隆","href":"/zh/articles/12129010-remix","iconId":"icon-chat-remix"},{"slug":"12129484-publish","title":"发布","href":"/zh/articles/12129484-publish","iconId":"icon-menu-publish"},{"slug":"12129279-share","title":"分享","href":"/zh/articles/12129279-share","iconId":"icon-menu-share"},{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace","iconId":"icon-chat-team"}],"children":[]},{"id":"5d5b4afb-9440-4c5f-817e-30645d4536b4","title":"云 · SEO · 增长","articles":[{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud","iconId":"icon-page-cloud"},{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet","iconId":"icon-setting-payment-history"},{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo","iconId":"icon-block-seo"},{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide","iconId":"icon-general-compass"},{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains","iconId":"icon-setting-domain"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"30e13b30-fa2d-416c-944d-950b5d875d6f","articleSlug":"14432563-cloud-ai-wallet","path":"/zh/articles/14432563-cloud-ai-wallet"}],["$","$L26",null,{"locale":"zh","articleId":"30e13b30-fa2d-416c-944d-950b5d875d6f","articleSlug":"14432563-cloud-ai-wallet","path":"/zh/articles/14432563-cloud-ai-wallet","title":"云与 AI 钱包","summary":"云与 AI 钱包用于支付您的应用的云和 AI 使用费用。","updatedAt":"2026年7月12日","markdown":"$27","relatedArticles":[{"key":"f6e5e0ef-e9fa-4495-a0c3-d74c2a16209c","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team"},{"key":"a621f1b0-c0cf-4f4d-a461-294f5b1a6568","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide"},{"key":"07ce9141-5b0f-455f-8395-8d8bf4cdb51a","title":"赛马模式","href":"/zh/articles/12129504-race-mode"}],"prevArticle":{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud"},"nextArticle":{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo"},"iconId":"icon-setting-payment-history","sectionTitle":"云 · SEO · 增长"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
