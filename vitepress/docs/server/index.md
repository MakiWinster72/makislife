# 服务器（Server）总览

本目录汇总与服务器部署、运维与常见服务配置相关的文档。此页面作为 `/server/` 的索引页，解决导航到“服务器”时出现 404 的问题。

快速入口

- [部署与 SSL（Nginx）](/server/deploy-ssl-nginx) — 证书申请、Nginx 配置与常见检查项

建议的子主题（可按需新增）

- 反向代理与负载均衡（Nginx / HAProxy）
- 自动化部署（Ansible / Fabric / GitHub Actions）
- 容器与编排（Docker / docker-compose / Kubernetes）
- 数据库部署与备份（PostgreSQL / MySQL）
- 监控与告警（Prometheus / Grafana）
- 日志与集中化（ELK / Loki）
- 安全加固（防火墙、SSH 配置、Fail2ban）
- 证书自动更新（Let's Encrypt + certbot / acme）

如何贡献或扩展文档

1. 在 `docs/server/` 下新增对应的 Markdown 文件（例如 `docker.md`、`reverse-proxy.md`）。
2. 在本目录下的 `index.md` 中添加到新页面的快速入口链接，或在 `.vitepress/config.js` 中为侧边栏添加条目。
3. 提交 PR 时请保持文档风格一致：简介 → 前提 → 操作步骤 → 常见问题 → 参考链接。

故障排查提示（快速参考）

- 页面 404：确认目录存在 `index.md`，并且路径与导航/侧边栏中的 `link` 对应（路径以 `/server/` 开头）。
- 链接小写/大小写问题：VitePress 在多数部署下对 URL 是区分大小写的，确保文件名和链接一致。
- 本地预览：使用 `vitepress dev` 在本地查看站点并确认侧边栏/导航是否按预期工作。

需要我帮你：

- 将上面列出的某个子主题补成完整页面（例如写一份 `docker.md`）？
- 或者我可以根据当前 `.vitepress/config.js` 自动为侧边栏补齐缺失的 `index.md` 页面内容并生成更多示例。

选择一个或多个任务，我来继续帮你实现。
