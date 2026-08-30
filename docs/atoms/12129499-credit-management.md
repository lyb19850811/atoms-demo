# 积分管理

> 来源：https://help.atoms.dev/zh/articles/12129499-credit-management
> 更新时间：2026年7月29日

了解积分在 Atoms 中的运作方式、每日额度、订阅分配、积分结转政策和余额跟踪。

<AccordionGroup>
<Accordion title="我可以获得积分补偿吗？">
我们理解，在构建过程中可能会发生意外问题。
​
如果您的问题仍未解决，或您需要进一步帮助，请联系我们的支持团队并附上：
​
- 问题的清晰描述
- 相关截图
​
在某些情况下，我们可能会以 **积分** 的形式提供补偿（不可兑换为现金）。
​
**以下情况将不予提供补偿：**
​
- AI 输出质量问题、不满意的结果，或由自定义提示词/用户设置导致的问题。
- 用户环境问题、平台计划内维护、速率限制或第三方服务中断。
​
与同一问题相关的多次补偿请求将一并审核和处理。
</Accordion>
<Accordion title="如果我的积分用完了，可以购买额外积分吗？">
可以。您可以随时在 **Settings → Plans and Billing** 页面或 **Pricing → Payment** 页面升级到更高等级的套餐，以立即获得额外积分。
​
升级月度套餐时，您只需支付按比例计算的差价。
​
- **Pro Users**：可从三档积分中选择：每月 100、250 或 350 积分。
- **Max Users**：可根据您的工作负载，从每月 500 到 10,000 积分的多档积分中选择。
</Accordion>
<Accordion title="我未使用的积分会被重置为零吗？">
未使用积分是否会过期，取决于您的套餐和积分类型：
​
### 积分结转规则
​
在以下情况下，未使用的积分将自动结转到下一个计费周期，且 **仅可结转一个月**（不会无限累积）：
​
1. 月度订阅用户在周期中途升级时产生的未使用积分。
2. 特殊情况下发放的奖励积分（不包括每日赠送的 15 积分）。
3. 通过邀请新用户获得的推荐积分。
4. 通过积分兑换码兑换的积分。
​
*注意：所有结转积分都会在额外一个月后过期。*
​
### 年度订阅
​
对于年度套餐，积分将在您 12 个月的计费周期内，按照年度结转规则保持可用。
​
### 取消订阅
​
如果您取消付费订阅，所有未使用和已结转的积分都将在当前计费周期结束时过期。
</Accordion>
<Accordion title="免费的每日积分何时重置？">
免费每日积分会在每天 **00:00 (America/Los_Angeles)** 重置。
​
- **每日额度**：每天 15 积分。
- **月度上限**：每个套餐月度周期内，免费每日积分总计最多 25 积分。
​
一旦您达到每月 25 免费积分的上限，每日刷新将暂停，直到下一个计费周期开始。
​
*注意：升级到 Pro 或 Max 套餐不会重置您的计费周期日期。新套餐积分将按您的时间表发放。*
</Accordion>
<Accordion title="我如何查看我的积分余额或剩余余额？">
您可以随时在 **Settings** 下查看您的剩余积分余额：
​
- **深紫色区域**：显示您账户中剩余的可用积分。
- **灰色区域**：显示已消耗的积分。
- **使用指标**：进度条旁会直接显示精确的数值使用明细。
</Accordion>
<Accordion title="什么是积分，以及它们如何使用？">
积分是在 Atoms 中用于兑换 AI 智能体服务的通用货币。
​
### 获得积分的 3 种方式
​
1. **每日赠送**：每天 15 个免费积分（每月最多 25 个）。
2. **月度/年度订阅**：分配的档位积分。
3. **奖励积分**：推荐奖励、促销代码和支持补偿。
​
### 系统扣减顺序
​
执行操作时，Atoms 会按以下优先顺序自动扣减积分：
​
1. 每日免费积分
2. 订阅积分
3. 奖励积分
</Accordion>
<Accordion title="为什么我付款了却没有收到积分？">
在大多数情况下，这是因为交易未能成功完成。即使您已发起充值，付款也可能 **静默失败**。常见原因包括：
​
- 付款被 **您的发卡银行拒绝**。
- 交易在完成前 **超时**。
​
### 如何确认付款状态
​
1. **Stripe Checkout Page**：检查您交易的最终状态。
2. **Email Inbox**：检查您是否收到了与交易失败相关的通知。
3. **Settings → Plans and Billing → Manage Billing**：查看您的有效订阅和交易历史。
​
*如果您看到付款失败，请联系您的发卡银行。付款成功处理后，积分将自动添加到您的账户中。*
</Accordion>
<Accordion title="为什么我今天的免费每日积分没有刷新？">
您的每日积分没有刷新，是因为您已达到每月上限。每个账户每月最多可获得 25 个免费积分。虽然每日分配为 7.5 积分，但每月总数不能超过 25。一旦您在一个月内达到 25，每日刷新将暂停，直到下一个月度周期开始。
</Accordion>
</AccordionGroup>10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"05a9598c-b9ef-4a44-b961-1fc3145b4eeb","title":"联盟计划","articles":[{"slug":"12129496-affiliate-participation-guide","title":"联盟计划参与指南","href":"/zh/articles/12129496-affiliate-participation-guide","iconId":"icon-mobile-workspace"},{"slug":"12128527-affiliate-terms-of-service","title":"联盟计划服务条款","href":"/zh/articles/12128527-affiliate-terms-of-service","iconId":"icon-blog-use-cases"},{"slug":"12129495-affiliate-marketing-policies","title":"联盟计划营销政策","href":"/zh/articles/12129495-affiliate-marketing-policies","iconId":"icon-model-cheapest"},{"slug":"12129497-payouts-withdrawals","title":"付款与提现","href":"/zh/articles/12129497-payouts-withdrawals","iconId":"icon-setting-payment-history"}],"children":[]},{"id":"7d9550d3-a722-4cc1-9edb-e948049a98b2","title":"套餐与定价","articles":[{"slug":"12164711-subscription-management","title":"订阅管理","href":"/zh/articles/12164711-subscription-management","iconId":"icon-mobile-collaboration"},{"slug":"12129498-plan-comparisons-details","title":"套餐对比与详情","href":"/zh/articles/12129498-plan-comparisons-details","iconId":"icon-setting-plan"}],"children":[]},{"id":"74bc1ef5-e389-4c1c-863f-0b835797ce05","title":"积分与使用情况","articles":[{"slug":"12129499-credit-management","title":"积分管理","href":"/zh/articles/12129499-credit-management","iconId":"icon-model-low-cost"},{"slug":"12164701-credits-usage-instructions","title":"积分使用说明","href":"/zh/articles/12164701-credits-usage-instructions","iconId":"icon-model-advanced"}],"children":[]},{"id":"2d43f90a-664b-4f67-85ef-9f9532381d36","title":"付款 · 账单 · 退款","articles":[{"slug":"12129500-billing-refunds","title":"账单与退款","href":"/zh/articles/12129500-billing-refunds","iconId":"icon-a-menu-redemption"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"558741e7-ccd6-4d1a-a4bd-a39bc4c3f4fa","articleSlug":"12129499-credit-management","path":"/zh/articles/12129499-credit-management"}],["$","$L26",null,{"locale":"zh","articleId":"558741e7-ccd6-4d1a-a4bd-a39bc4c3f4fa","articleSlug":"12129499-credit-management","path":"/zh/articles/12129499-credit-management","title":"积分管理","summary":"关于积分使用、每日限额、订阅等级、结转政策和余额跟踪的指南","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"e2dae4da-1f84-4a74-8230-99eb5281b0f7","title":"联盟计划参与指南","href":"/zh/articles/12129496-affiliate-participation-guide"},{"key":"91a91f2d-0c1c-4069-9c04-5420c4902548","title":"联盟计划服务条款","href":"/zh/articles/12128527-affiliate-terms-of-service"},{"key":"4f2b9786-b661-40f3-beef-62080a1fa8c9","title":"联盟计划营销政策","href":"/zh/articles/12129495-affiliate-marketing-policies"}],"prevArticle":{"slug":"12129498-plan-comparisons-details","title":"套餐对比与详情","href":"/zh/articles/12129498-plan-comparisons-details"},"nextArticle":{"slug":"12164701-credits-usage-instructions","title":"积分使用说明","href":"/zh/articles/12164701-credits-usage-instructions"},"iconId":"icon-model-low-cost","sectionTitle":"积分与使用情况"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
