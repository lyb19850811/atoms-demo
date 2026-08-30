# Stripe 集成

> 来源：https://help.atoms.dev/zh/articles/12129347-stripe-connect
> 更新时间：2026年7月29日

## 要求

在集成 Stripe 之前，请确保您已具备：

- 一个可正常运行的 MGX 应用。
- MGX 项目已连接到一个 Supabase Project。（[了解有关 Supabase 的更多信息](https://help.atoms.dev/en/articles/12129788-supabase-connect)。）
- 已在您的 **Stripe dashboard** 中创建产品及其对应价格。

**注意：** 预览模式无法用于测试支付功能。请部署您的 MGX 应用，并将 Stripe 切换到 Test Mode 以验证集成。

**测试卡：**

- 卡号：`4242 4242 4242 4242`
- 到期日期：任意未来日期
- CVC：任意 3 位数字

## Stripe 支付设置

1. 连接 Supabase

   - 点击 MGX 右上角的 Supabase 按钮
   - 按照 [Supabase 集成 Guides](https://help.atoms.dev/en/articles/12129788-supabase-connect) 选择您的目标 Supabase Project
   - 连接完成后，您可以通过 Supabase 配置支付设置
2. 使用自然语言描述您的订阅需求

   - 示例：创建一个支付系统，支持三种订阅套餐，价格分别为每周 $4.99、每月 $14.99 和每年 $149.99。

   提交后，MGX 智能体 将生成配置按钮。您至少需要填写两个字段。
3. 点击 `Add Stripe Secret Key` 按钮

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fbf1e54e6b083876f-stripeImage_01.png)

   - 在 **STRIPE\_SECRET\_KEY** 字段下输入您的 Stripe secret key。
   - 对于每个套餐，在以 PRICE\_ID 结尾的字段中输入其对应的 Stripe Price ID。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F9067960b5a31a395-stripeImage_02.png)

   您可以在此处获取您的 Stripe secret key：**[https://dashboard.stripe.com/test/apikeys](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F93a721fc463b8db9-apikeys)**

   前往 **Product Catalog > Products**，使用以下任一方法获取 price ID：

   - 在“Pricing”列表中，点击对应价格右侧的“More”按钮，然后点击“Copy Price ID”。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fe0ab58eea27e8967-stripeImage_03.png)

   您也可以直接点击价格名称打开详情页，然后复制右上角显示的 price ID。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fb97b2917c7dff487-stripeImage_04-281-29.png)

   最后，将每个 price ID 准确粘贴到对应的输入字段中。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fe63ef0de5d17435e-stripeImage_05.png)

   **注意：** 为了隐私和安全，请勿直接将您的 secret key 粘贴到 MGX 聊天中。泄露可能会导致未经授权访问您的 Stripe 账户。请改用 MGX 的 **"Add API Key"** 按钮进行安全存储。
4. 点击 `Add Stripe Webhook Secret Key` 按钮

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F20d7a2e0e4faa59b-stripeImage_06.png)

   - 输入您的 Webhook Secret Key
5. 如何查找 Webhook Secret Key：

   在 Stripe 中，点击左下角的“Developers”，然后选择 Webhooks 选项。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F256802c3232951cd-stripeImage_07.png)

   在 Webhooks 页面，点击 "Add destination" 按钮。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fa65d96cc6f0191df-stripeImage_08.png)

   选择与您的项目需求匹配的 webhook 事件：

   - `checkout.session.async_payment_failed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.completed`
   - `checkout.session.expired`

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fdb778223f6bdf43d-stripeImage_09.png)

   点击 "Continue" 后，选择 "Webhook endpoint."

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fec2d2d652983b0f5-stripeImage_10.png)

   输入来自 Supabase 的 endpoint URL。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F7659b959c42a0327-stripeImage_12.png)
6. 如何查找您的 Supabase Endpoint URL：

   在 MGX 中点击 `View Edge Function`。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F5610c84f9b40a9d7-stripeImage_13-281-29.png)

   - 点击选择带有对应 `_webhook` 后缀的 edge function。

     ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2Fb3986357aec54fcc-stripeImage_14.png)
   - 在对应 edge function 的 Details 面板中，复制 Endpoint URL 并将其粘贴到 Stripe Event Destination 中。

     ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F12130240%2F44e1b3bfc0e38a6a-stripeImage_15.png)
7. 测试您的集成

   使用 Stripe 的 Test Mode 测试支付。

   测试卡详情：

   - 卡号：4242 4242 4242 4242
   - 任意未来到期日期
   - 任意 3 位 CVC

## 常见问题

<AccordionGroup>
<Accordion title="为什么我无法在预览模式中测试支付？">
预览模式运行在本地环境中，不提供可公开访问的 Webhook URL。您必须部署应用才能接收 Stripe 事件。
</Accordion>
<Accordion title="如何切换到 Production Mode？">
您可以在 Stripe Dashboard 中禁用 Test Mode，并使用您的 live Secret Key 和 Webhook Secret。
</Accordion>
<Accordion title="如何验证测试支付是否成功？">
完成测试支付后，前往 Stripe 中的 Payments 页面查看您的测试交易记录。
</Accordion>
</AccordionGroup>10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"61276e2d-bb2d-4f51-b934-311c2c263395","title":"关于","articles":[{"slug":"15112407-connect-and-use-integrations","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations","iconId":"icon-menu-integrations"}],"children":[]},{"id":"6a4530b3-036b-4bee-8f0e-304b46563166","title":"连接器","articles":[{"slug":"13222322-github-connect","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect","iconId":"icon-logo-github"},{"slug":"12129788-supabase-connect","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect","iconId":"icon-menu-supabase"},{"slug":"12129347-stripe-connect","title":"Stripe 集成","href":"/zh/articles/12129347-stripe-connect","iconId":"icon-logo-stripe"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"e9fa65b1-5ad8-4755-b94b-56f2ecb88769","articleSlug":"12129347-stripe-connect","path":"/zh/articles/12129347-stripe-connect"}],["$","$L26",null,{"locale":"zh","articleId":"e9fa65b1-5ad8-4755-b94b-56f2ecb88769","articleSlug":"12129347-stripe-connect","path":"/zh/articles/12129347-stripe-connect","title":"Stripe 集成","summary":"MGX 现已支持通过 Supabase Edge Functions 快速配置 Stripe 支付。","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"75a48b71-fdf7-4012-854d-eb3b6b143811","title":"连接并使用集成","href":"/zh/articles/15112407-connect-and-use-integrations"},{"key":"48ccd53e-f47a-450f-8574-0ea33db3adfc","title":"GitHub 集成","href":"/zh/articles/13222322-github-connect"},{"key":"9c7605d4-565e-48f3-8517-586c2d590979","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect"}],"prevArticle":{"slug":"12129788-supabase-connect","title":"Supabase 集成","href":"/zh/articles/12129788-supabase-connect"},"nextArticle":"$undefined","iconId":"icon-logo-stripe","sectionTitle":"连接器"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
