#!/usr/bin/env bash
# Mini Atoms 一键部署脚本（improve 分支独立部署：与 main 分支完全隔离）
set -euo pipefail

# ===== 配置（improve 分支专用，勿与 main 分支混用）=====
HOST="aliyun-ecs"                        # SSH 别名（~/.ssh/config）或 root@<IP>
REMOTE_DIR="/opt/atoms-demo-improve"     # 独立部署目录（main 用 /opt/atoms-demo）
PM2_APP="atoms-demo-improve"             # 独立 pm2 进程名（main 用 atoms-demo）
PORT="8083"                              # 独立服务端口（main 用 8082）
# ======================================================
# 数据库隔离：db.js 默认使用相对部署目录的 data/（即 $REMOTE_DIR/data），
# 独立目录 -> 独立 SQLite，天然与 main 分支（/opt/atoms-demo/data）隔离，无需额外配置。

echo "==> [1/4] 运行测试"
npm test

echo "==> [2/4] 构建前端"
npm run build

echo "==> [3/4] 上传服务端 + 前端产物 + .env"
ssh "$HOST" "mkdir -p $REMOTE_DIR/server/routes $REMOTE_DIR/server/middleware $REMOTE_DIR/server/lib"
scp server/app.js server/index.js server/llm.js server/db.js "$HOST:$REMOTE_DIR/server/"
scp server/routes/*.js       "$HOST:$REMOTE_DIR/server/routes/"
scp server/middleware/*.js   "$HOST:$REMOTE_DIR/server/middleware/"
scp server/lib/*.js          "$HOST:$REMOTE_DIR/server/lib/"
scp .env                     "$HOST:$REMOTE_DIR/.env"
scp -r dist                  "$HOST:$REMOTE_DIR/"

# 强制隔离端口：无论本地 .env 里 PORT 写什么，远程一律使用 improve 专属端口
ssh "$HOST" "cd $REMOTE_DIR && (grep -q '^PORT=' .env && sed -i \"s/^PORT=.*/PORT=$PORT/\" .env || echo \"PORT=$PORT\" >> .env)"

echo "==> [4/4] 启动/重启并健康检查"
ssh "$HOST" "cd $REMOTE_DIR && (pm2 restart $PM2_APP >/dev/null 2>&1 || pm2 start server/index.js --name $PM2_APP >/dev/null 2>&1) && sleep 1 && curl -s -m 5 http://localhost:$PORT/api/health && echo"

echo "==> 部署完成 ✅"
