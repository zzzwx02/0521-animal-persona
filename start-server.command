#!/bin/zsh
cd "$(dirname "$0")"

echo "正在启动动物塑测试服务..."
echo ""
echo "测试页：http://localhost:4173/"
echo "后台页：http://localhost:4173/admin.html"
echo ""
echo "请保持这个窗口打开。关闭窗口后，测试页和后台数据服务都会停止。"
echo ""

node server.js

echo ""
echo "服务已停止。按回车关闭窗口。"
read
