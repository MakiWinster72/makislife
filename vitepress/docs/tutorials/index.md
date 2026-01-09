# 教程（Tutorials）总览

本章节收录与桌面环境、窗口管理、显示器配置及常用桌面优化相关的实用教程。教程以中文撰写，文件和目录使用英文命名以便维护与引用。核心目标是帮助你在完成系统安装后，快速搭建并调优一个稳定、实用的桌面环境 —— 我个人推荐使用 Niri 作为 Wayland 桌面管理器，但也保留部分历史 Hyprland 配置作为参考。

快速导航

- Niri 主页（Getting Started）：`/tutorials/niri/`
- Niri 双屏（Dual monitor）：`/tutorials/niri/dual-monitor`
- Niri 键位与工作流（Keybindings）：`/tutorials/niri/keybinds`（如无该页我会补充）
- 显示器与多屏常见问题（Troubleshooting）：见每篇 Niri 教程的故障排查小节
- 迁移指南（从 Hyprland 或其它 WM）：见 Niri 教程内的迁移提示

为什么放在这里

- 安装（Guides）部分负责系统层面的安装与初始化；本章节负责“用起来的体验”——如何配置 compositor、bar、截图、截屏、输入法整合、以及常用工具（例如 Wayland 下的截图、音量与亮度快捷键）。
- 将配置与示例代码组织为可以直接复制到 `~/.config` 的片段，便于复现与调试。

本章节示例页面（将持续完善）

1. `/tutorials/niri/` — Niri 入门与环境准备
   - 安装建议（发行版包、依赖项，例如 `xdg-desktop-portal`、Wayland 支持包）
   - 启动方法：display manager 或 `niri-session`
   - 推荐配套：alacritty / alacritty 配置、fuzzel（launcher）、waybar 或相容 panel
2. `/tutorials/niri/dual-monitor` — Niri 双屏配置与坐标示例（包含常见布局：左右、上下、旋转）
   - 如何使用 `~/.config/niri/config.kdl` 的 `outputs` 段定义分辨率、位置与 scale
   - NVIDIA 常见问题与 render device 配置示例
3. `/tutorials/niri/keybinds` — 常用键位与工作流（示例）
   - 聚焦/移动窗口、切换 workspace、浮动/平铺切换、截屏/录制快捷键
   - 建议的键位映射样式与迁移要点（从 Hyprland 到 Niri）
4. `/tutorials/niri/screencast-and-screenshot` — 截图与录屏（slurp, grim, wf-recorder / obs）
   - 区域截图、窗口截图、剪贴板复制方案与常见脚本
5. 未来拓展：手势、无障碍、layer-shell 组件、应用特定适配

如何使用本章节

1. 先确认系统已完成基础安装（参见 `docs/guides/`），并已能登录桌面会话。
2. 阅读 Niri Getting Started（`/tutorials/niri/`）以安装必要依赖与启用 session。
3. 根据硬件（尤其是显卡：Intel/AMD/NVIDIA）选择适当的驱动与 kernel 参数；如果是 NVIDIA，请特别查看 Niri/官方 Wiki 中的兼容性说明。
4. 在修改 `~/.config/niri/config.kdl` 前，做好备份：
   ```bash
   cp ~/.config/niri/config.kdl ~/.config/niri/config.kdl.bak
   ```
5. 修改后用 `systemctl --user restart niri.service`（或注销重启会话）重载配置，调试时建议查看 `journalctl --user -u niri.service` 的日志。

约定与风格

- 每篇教程包含：简介 → 前提条件 → 操作步骤（可复制命令）→ 配置片段（标注路径）→ 故障排查 → 参考链接。
- 配置片段尽量短小并带注释，避免一次性粘贴过多内容导致理解困难。
- 文件命名与路径保持英文：例如 `docs/tutorials/niri/dual-monitor.md`，以便侧边栏与部署一致。

贡献与反馈

- 若你发现示例不可复现或需要补充某个硬件/软件场景，请在仓库中发起 Issue 或提交 PR。
- 贡献时请在文档头部注明“测试环境”（发行版与版本、Niri 版本、GPU 型号、测试日期）以便他人复现。

下一步（我将为你完成）

- 完善并补全缺失的 Niri 教程子页（`keybinds`、`screencast` 等），并把 Hyprland 历史配置保留于 `docs/drafts/`（不影响站点主导航）。
- 修正本章节与子页面中任何 404 链接，确保侧边栏的每个项都能正确访问。

参考

- Niri Getting Started: https://github.com/YaLTeR/niri/wiki/Getting-Started
- ArchWiki（Wayland, Xwayland, GPU 驱动等相关条目）

欢迎现在告诉我你希望我优先完善的子页面（例如“先把 keybinds 做成 Niri config 示例”或“把双屏页面补上更多故障排查”），我会按优先级逐个完成并确保所有教程、软件与服务器页面不会再返回 404。
