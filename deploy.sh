#!/usr/bin/env bash
# Mini Atoms 一键部署脚本（multi-agent 分支独立部署：与 main/improve 分支完全隔离）
set -euo pipefail

# ===== 配置（multi-agent 分支专用，勿与 main/improve 分支混用）=====
HOST="aliyun-ecs"                         # SSH 别名（~/.ssh/config）或 root@<IP>
REMOTE_DIR="/opt/atoms-demo-multi-agent"  # 独立部署目录（main 用 /opt/atoms-demo，improve 用 /opt/atoms-demo-improve）
PM2_APP="atoms-demo-multi-agent"          # 独立 pm2 进程名
PORT="8084"                               # 独立服务端口（8082/8083 已被占用）
NPM_REGISTRY="https://registry.npmmirror.com"
# ======================================================
# 数据库隔离：db.js 默认使用相对部署目录的 data/（即 $REMOTE_DIR/data），
# 独立目录 -> 独立 SQLite，天然与其它分支隔离，无需额外配置。

echo "==> [1/5] 运行测试"
npm test

echo "==> [2/5] 构建前端"
npm run build

echo "==> [3/5] 上传服务端 + 前端产物 + 依赖清单 + .env"
ssh "$HOST" "mkdir -p $REMOTE_DIR/server/routes $REMOTE_DIR/server/middleware $REMOTE_DIR/server/lib"
scp server/app.js server/index.js server/llm.js server/db.js "$HOST:$REMOTE_DIR/server/"
scp server/routes/*.js       "$HOST:$REMOTE_DIR/server/routes/"
scp server/middleware/*.js   "$HOST:$REMOTE_DIR/server/middleware/"
scp server/lib/*.js          "$HOST:$REMOTE_DIR/server/lib/"
scp package.json package-lock.json "$HOST:$REMOTE_DIR/"
scp .env                     "$HOST:$REMOTE_DIR/.env"
scp -r dist                  "$HOST:$REMOTE_DIR/"

# 强制隔离端口：无论本地 .env 里 PORT 写什么，远程一律使用 improve 专属端口
ssh "$HOST" "cd $REMOTE_DIR && (grep -q '^PORT=' .env && sed -i \"s/^PORT=.*/PORT=$PORT/\" .env || echo \"PORT=$PORT\" >> .env)"

echo "==> [4/5] 安装生产依赖"
ssh "$HOST" "cd $REMOTE_DIR && npm install --omit=dev --registry=$NPM_REGISTRY"

echo "==> [5/5] 启动/重启并健康检查"
ssh "$HOST" "cd $REMOTE_DIR && (pm2 restart $PM2_APP >/dev/null 2>&1 || pm2 start server/index.js --name $PM2_APP >/dev/null 2>&1) && for i in 1 2 3 4 5 6 7 8 9 10; do sleep 1; curl -sf -m 3 http://localhost:$PORT/api/health && exit 0; done; exit 1"

echo "==> 部署完成 ✅"
