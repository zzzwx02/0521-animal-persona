# 动物塑测试线上版

这是给 Vercel 部署的线上版本。你不需要在自己电脑上运行本地服务。

## 在线访问

测试页：

[https://0521-animal-persona.vercel.app](https://0521-animal-persona.vercel.app)

后台页：

[https://0521-animal-persona.vercel.app/admin.html](https://0521-animal-persona.vercel.app/admin.html)

数据接口检查：

[https://0521-animal-persona.vercel.app/api/results](https://0521-animal-persona.vercel.app/api/results)

如果设置了 `ADMIN_TOKEN`，直接打开接口会提示需要后台口令，这是正常的。

## 用户区分方式

系统会给每个浏览器生成一个匿名 `visitor_id`，每次测试生成一个 `result_id` 和 `session_id`。后台不会保存明文 IP，只保存用服务端盐值生成的 `ip_hash`，主要用于粗略去重和风控。

## Vercel 部署

Vercel 版本可以直接运行测试页；如果要在线查看后台数据，需要接 Supabase。

Vercel 构建设置：

```text
Build Command: npm run build
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

`SUPABASE_URL` 推荐填基础地址：

```text
https://你的-project-ref.supabase.co
```

如果你填成了带 `/rest/v1` 的 Data API 地址，新版代码也会自动兼容。

4. 重新部署 Vercel。

之后打开：

```text
https://你的域名/admin.html
```

输入 `ADMIN_TOKEN`，就能查看线上测试结果和导出 CSV。

注意：`SUPABASE_SERVICE_ROLE_KEY` 只能放在 Vercel 环境变量里，不要写进前端代码，也不要公开。

## 常见检查

后台显示没有数据时，优先检查：

1. 是否已经在 Vercel 里配置了环境变量。
2. 配置后是否点了 Redeploy 重新部署。
3. 是否已经从线上测试页完整提交过一次测试结果。
4. 后台输入的口令是否等于 Vercel 里的 `ADMIN_TOKEN`。

如果后台显示 `PGRST125 Invalid path specified in request URL`，通常是 `SUPABASE_URL` 填成了带 `/rest/v1` 的地址。当前代码已兼容这两种写法：

```text
https://你的-project-ref.supabase.co
https://你的-project-ref.supabase.co/rest/v1
```
