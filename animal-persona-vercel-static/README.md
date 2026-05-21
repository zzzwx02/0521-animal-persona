# 动物塑测试

## 本地启动

```bash
node server.js
```

打开：

- 测试页：http://localhost:4173/
- 数据后台：http://localhost:4173/admin.html

用户完成测试后，结果会自动提交到本地文件：

```text
data/results.json
```

## 后台口令

本地预览默认不需要口令。线上部署时建议设置：

```bash
ADMIN_TOKEN=your-password node server.js
```

设置后，打开后台页会要求输入口令。

## 用户区分方式

系统会给每个浏览器生成一个匿名 `visitor_id`，每次测试生成一个 `result_id` 和 `session_id`。后台不会保存明文 IP，只保存用服务端盐值生成的 `ip_hash`，主要用于粗略去重和风控。

## Vercel 部署测试页

当前 Vercel 版本先保证测试页正常运行，不包含本地后台数据服务。

Vercel 构建设置：

```text
Build Command: node scripts/build-static.js
Output Directory: public
```

项目已包含 `vercel.json`，正常情况下 Vercel 会自动读取这些配置。
