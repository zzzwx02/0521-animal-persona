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

## Vercel 部署

Vercel 版本可以直接运行测试页；如果要在线查看后台数据，需要接 Supabase。

Vercel 构建设置：

```text
Build Command: node scripts/build-static.js
Output Directory: public
```

项目已包含 `vercel.json`，正常情况下 Vercel 会自动读取这些配置。

## 线上后台数据

1. 新建 Supabase 项目。
2. 在 Supabase SQL Editor 里运行：

```text
supabase/schema.sql
```

3. 在 Vercel 项目里添加环境变量：

```text
SUPABASE_URL=你的 Supabase Project URL
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service_role key
ADMIN_TOKEN=你自己设置的后台口令
ANIMAL_PERSONA_IP_SALT=任意一段随机字符串
```

4. 重新部署 Vercel。

之后打开：

```text
https://你的域名/admin.html
```

输入 `ADMIN_TOKEN`，就能查看线上测试结果和导出 CSV。

注意：`SUPABASE_SERVICE_ROLE_KEY` 只能放在 Vercel 环境变量里，不要写进前端代码，也不要公开。
