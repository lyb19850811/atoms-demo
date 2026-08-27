#!/usr/bin/env bash
# Mini Atoms 一键部署脚本：本地构建前端 → 上传 → pm2 重启 → 健康检查
set -euo pipefail

# ===== 配置（按需修改）=====
HOST="aliyun-ecs"            # SSH 别名（~/.ssh/config）或 root@<IP>
REMOTE_DIR="/opt/atoms-demo"
PM2_APP="atoms-demo"
# =======================

echo "==> [1/4] 运行测试"
npm test

echo "==> [2/4] 构建前端"
npm run build

echo "==> [3/4] 上传服务端 + 前端产物 + .env"
scp server/app.js server/index.js server/llm.js server/db.js "$HOST:$REMOTE_DIR/server/"
scp server/routes/*.js "$HOST:$REMOTE_DIR/server/routes/"
scp .env "$HOST:$REMOTE_DIR/.env"
scp -r dist "$HOST:$REMOTE_DIR/"

echo "==> [4/4] 重启并健康检查"
ssh "$HOST" "cd $REMOTE_DIR && pm2 restart $PM2_APP >/dev/null 2>&1 && sleep 1 && curl -s -m 5 http://localhost:8082/api/health && echo"

echo "==> 部署完成 ✅"
