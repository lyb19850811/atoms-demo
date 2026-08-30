# 域名管理

> 来源：https://help.atoms.dev/zh/articles/13362391-connect-and-manage-domains
> 更新时间：2026年7月29日

通过连接自定义域名（例如 `yourname.com`）或自定义你的免费 `.atoms.world` 子域名，来个性化你的项目。本指南将带你完成编辑默认地址、连接你已拥有的域名或购买新域名的流程。

## 自定义你的免费子域名

当你首次发布项目时，系统会为其分配一个随机子域名（例如 `1r945lo.atoms.world`）。

1. 打开你的项目，点击右上角的 **Update**。
2. 在 **Publish** 窗口中，找到 **Connected Domains**，然后点击当前地址旁边的 **Edit** 图标。
3. 输入你想要的名称（例如 alex），然后点击 **Update**。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F13362391%2F36eaaebe577f9a92-E6-88-AA-E5-B1-8F2026-01-11-19_46_46.png)
4. 你的网站现在已通过你的新子域名上线（例如 `alex.atoms.world`）。

## 连接你已拥有的域名

如果你已从服务商（如 Alibaba Cloud、GoDaddy 或 Namecheap）购买了域名，请按照以下步骤进行连接。

### 第 1 步：开始连接

1. 前往 **Settings**，并从侧边栏选择 **Domains** 标签页。
2. 点击 **Connect Existing Domain**（必须是二级域名，例如 docs.example.com）。

   ![](/api/public/assets?key=uploads%2Fhelpcenters%2Fb609caf5-d676-4b4e-8268-b8d59db1b941%2Fcontent%2Fintercom%2F13362391%2F7d8595bed0c00167-connect-domain.png)
3. 在文本框中输入你的完整域名（例如 xxx.`alex.com`），然后点击 **Connect domain**。

### 第 2 步：配置 DNS 记录

系统会尝试识别你的服务商。如果不支持自动连接，你必须手动更新 DNS 记录。

1. 如有提示，请选择 **Manual Setup**。
2. 系统将显示你需要添加到域名服务商设置中的两条记录：一条 **A Record** 和一条 **TXT Record**。

   - **A Record：** 将其指向显示的 IP 地址（例如 `000.000.000.0`）。
   - **TXT Record：** 添加所提供的特定验证字符串。

### 第 3 步：更新你的服务商设置

1. 登录你的域名注册商账户。
2. 进入你的域名的 **DNS Settings** 或 **DNS Resolution** 部分。
3. 严格按照 Atoms 设置界面中显示的内容添加记录：

   1. **Type:** A | **Value:** \[第 2 步中的 IP 地址\]。
   2. **Type:** TXT | **Host:** `_mgx_verify` | **Value:** \[第 2 步中的验证码\]。

      **重要：** 根域名和子域名的 TXT 记录主机名不同：

      根域名：（例如 `alex.com`）：`_mgx_verify`

      子域名（例如 `app.alex.com`）：`_mgx_verify.app`

      子域名（例如 `staging.alex.com`）：`_mgx_verify.staging`
4. 保存你的更改。

### 第 4 步：验证并上线

1. 返回 Atoms 的 **Settings** 页面，点击按钮以确认你已添加这些记录。
2. 配置完成后，你将看到一条“You're all set!”消息。你的域名状态将变为 **Live**。
3. 等待验证完成。

**注意：** DNS 更新在全球生效最多可能需要 48 小时，但通常会更快完成。

1\. 验证 A 记录。使用 \`ping\` 命令检查你的域名是否解析到我们的网关 IP 地址（**107.150.101.9**）。


# 例如，你的域名根域 ping <yourdomainname.com> # 例如，你的域名 app 子域名 ping <app.yourdomainname.com>


2\. 验证 TXT 记录。


# For root domain (yourdomainname.com) nslookup -type=TXT _mgx_verify.yourdomainname.com  # For subdomain (app.yourdomainname.com) nslookup -type=TXT _mgx_verify.app.yourdomainname.com


## 购买新域名

如果你还没有域名，可以直接通过我们的设置购买一个。

1. 前往 **Settings > Domains**。
2. 点击 **Purchase New Domain**。
3. 搜索你想要的名称（例如 `hhhh-hhhh.com`）以查看是否可用及其价格。
4. 将域名加入购物车，并通过我们的合作伙伴 IONOS 完成结账流程。
5. 购买完成后，按照提示将其连接到你的项目。

## 设置主域名

如果你连接了多个域名（例如免费子域名 _and_ 自定义域名），你应该将其中一个设置为 **Primary Domain**。这样可以确保访客始终被重定向到你首选的地址。

1. 在 **Settings > Domains** 中，找到你想要设为主地址的域名。
2. 点击该域名旁边的 **Star icon** 或选择 **Primary domain**。
3. 这样可以确保访问你的其他地址（如 `alex.atoms.world`）的流量会重定向到你的自定义域名（`alex.com`）。

   <AccordionGroup>
   <Accordion title="我可以自定义我的域名吗？">
   目前，Atoms 不支持绑定自定义域名。项目无法直接部署到你自己的网站。你可以修改域名的一部分（Atoms 后缀将保留）。
   </Accordion>
   </AccordionGroup>10:["$","div",null,{"className":"min-h-screen flex flex-col","children":["$L22",["$","div",null,{"className":"w-full max-w-[var(--layout-max-width)] mx-auto px-4 min-[768px]:px-8 flex-1 flex pt-[var(--nav-height)]","children":[["$","aside",null,{"data-sidebar-scroll-container":true,"className":"hidden min-[768px]:block w-[var(--sidebar-width)] shrink-0 sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] overflow-y-auto border-r border-borderNeutralWhite8 p-4","children":["$","$L23",null,{"sections":[{"id":"8656fc04-80dc-4f3a-b98a-8631c404eb81","title":"智能体与模式","articles":[{"slug":"12129380-your-agents-team","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team","iconId":"icon-help-agent-team"},{"slug":"12129385-mode-switching-guide","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide","iconId":"icon-help-star"},{"slug":"12129504-race-mode","title":"赛马模式","href":"/zh/articles/12129504-race-mode","iconId":"icon-race-boost"},{"slug":"12136255-deep-research","title":"深度研究","href":"/zh/articles/12136255-deep-research","iconId":"icon-chat-dr"},{"slug":"14342754-adrian-ads-agent-for-automated-campaigns","title":"Adrian：广告智能体","href":"/zh/articles/14342754-adrian-ads-agent-for-automated-campaigns","iconId":"icon-logo-google-ads"}],"children":[]},{"id":"47aab372-483c-41ca-a8b7-d9686ab73e8b","title":"构建与项目","articles":[{"slug":"12129478-build-export","title":"构建与导出","href":"/zh/articles/12129478-build-export","iconId":"icon-mobile-build-progress"},{"slug":"12129483-deployment-options","title":"部署选项","href":"/zh/articles/12129483-deployment-options","iconId":"icon-setting-ai-cloud"},{"slug":"12129485-environment-extensions","title":"环境与扩展","href":"/zh/articles/12129485-environment-extensions","iconId":"icon-setting-branches"},{"slug":"12129487-project-file-management","title":"项目文件管理","href":"/zh/articles/12129487-project-file-management","iconId":"icon-menu-projects"},{"slug":"12129698-app-viewer","title":"App 预览","href":"/zh/articles/12129698-app-viewer","iconId":"icon-block-app-viewer"},{"slug":"12129264-issue-report","title":"问题报告","href":"/zh/articles/12129264-issue-report","iconId":"icon-chat-issue-report"},{"slug":"12129010-remix","title":"克隆","href":"/zh/articles/12129010-remix","iconId":"icon-chat-remix"},{"slug":"12129484-publish","title":"发布","href":"/zh/articles/12129484-publish","iconId":"icon-menu-publish"},{"slug":"12129279-share","title":"分享","href":"/zh/articles/12129279-share","iconId":"icon-menu-share"},{"slug":"12129353-team-workspace","title":"团队工作区","href":"/zh/articles/12129353-team-workspace","iconId":"icon-chat-team"}],"children":[]},{"id":"5d5b4afb-9440-4c5f-817e-30645d4536b4","title":"云 · SEO · 增长","articles":[{"slug":"13036940-atoms-cloud","title":"Atoms 云","href":"/zh/articles/13036940-atoms-cloud","iconId":"icon-page-cloud"},{"slug":"14432563-cloud-ai-wallet","title":"云与 AI 钱包","href":"/zh/articles/14432563-cloud-ai-wallet","iconId":"icon-setting-payment-history"},{"slug":"12129510-search-engine-optimization-seo","title":"搜索引擎优化（SEO）","href":"/zh/articles/12129510-search-engine-optimization-seo","iconId":"icon-block-seo"},{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide","iconId":"icon-general-compass"},{"slug":"13362391-connect-and-manage-domains","title":"域名管理","href":"/zh/articles/13362391-connect-and-manage-domains","iconId":"icon-setting-domain"}],"children":[]}]}]}],["$","main",null,{"className":"flex-1 min-w-0 px-6 py-6 min-[768px]:px-14 min-[768px]:py-8 min-[1024px]:px-20 min-[1440px]:px-28 mx-auto w-full","children":["$","$L24",null,{"children":[["$","$L25",null,{"locale":"zh","articleId":"e8919477-8ed4-492b-ad88-87e3a6352252","articleSlug":"13362391-connect-and-manage-domains","path":"/zh/articles/13362391-connect-and-manage-domains"}],["$","$L26",null,{"locale":"zh","articleId":"e8919477-8ed4-492b-ad88-87e3a6352252","articleSlug":"13362391-connect-and-manage-domains","path":"/zh/articles/13362391-connect-and-manage-domains","title":"域名管理","summary":"使用个性化自定义域名，让你的项目脱颖而出。","updatedAt":"2026年7月29日","markdown":"$27","relatedArticles":[{"key":"f6e5e0ef-e9fa-4495-a0c3-d74c2a16209c","title":"你的智能体团队","href":"/zh/articles/12129380-your-agents-team"},{"key":"a621f1b0-c0cf-4f4d-a461-294f5b1a6568","title":"模式切换指南","href":"/zh/articles/12129385-mode-switching-guide"},{"key":"07ce9141-5b0f-455f-8395-8d8bf4cdb51a","title":"赛马模式","href":"/zh/articles/12129504-race-mode"}],"prevArticle":{"slug":"14057591-marketing-module-guide","title":"营销模块指南","href":"/zh/articles/14057591-marketing-module-guide"},"nextArticle":"$undefined","iconId":"icon-setting-domain","sectionTitle":"云 · SEO · 增长"}]]}]}],"$L28"]}],"$L29","$L2a"]}]
