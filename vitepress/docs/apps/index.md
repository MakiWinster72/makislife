# 常用软件（Apps）总览

本目录收集在 Arch（或基于 Arch 的发行版）下常用应用的安装与配置说明。内容以中文为主，文件与路径使用英文以便引用和维护。每个子页面包含安装命令、运行/授权示例与常见故障排查。

快速入口（页面）
- `/apps/onedrive` — OneDrive 客户端（AUR/官方封装）与同步命令  
- `/apps/virtualbox` — VirtualBox 安装、内核模块与用户组配置  
- `/apps/wechat` — 微信在 Arch 下的安装方案（wechat-universal-bwrap / electronic-wechat / wine-wechat）  
- `/apps/yesplaymusic` — 网易云音乐（第三方客户端）安装与启动示例  
- `/apps/fix-alist-pdf` — 修复 Alist 无法访问 PDF 的技巧与配置  
- `/apps/common-software` — 常用软件清单与一键安装建议  
- 备注：若某应用页面不存在，请在仓库内搜索对应文件名（path：`docs/apps/`）或提交 Issue 请求补充。

通用安装与 AUR 使用建议
- 优先使用官方仓库（`pacman`）；当需要 AUR 包时使用 `yay` / `paru` 等 AUR helper：
  - 安装 AUR helper（若尚未安装）：
    - 推荐先安装 `base-devel` 与 `git`，然后手动构建 `yay` 或使用系统包管理器安装。
- 常用命令示例（Arch）：
  ```bash
  # 更新系统
  sudo pacman -Syu

  # 从官方仓库安装
  sudo pacman -S package-name

  # 使用 AUR helper（例如 yay）安装
  yay -S aur-package-name
  ```
- AUR 安全提示：
  - 在构建前查看 PKGBUILD，避免无意执行恶意脚本；
  - 使用受信任的 AUR helper，定期审查 AUR 包更新。

每个应用页应包含
1. 简介：用途与适用场景。  
2. 前提：必要的系统依赖、服务或内核模块。  
3. 安装命令：`pacman` 与 `yay` 示例。  
4. 启动/授权命令：例如 OneDrive 的登录流程、VirtualBox 的内核模块加载与用户组。  
5. 常见问题与排查：服务无法启动、权限问题、显示/音频问题等。  
6. 参考链接：官方文档或 ArchWiki 页面。

快速故障排查（通用）
- 日志与状态查看：
  - systemd 服务：`systemctl status --user servicename` 或 `systemctl status servicename`（系统服务）
  - 日志查看：`journalctl -u servicename --since "1 hour ago"`
- 权限问题：
  - VirtualBox 需要将用户加入 `vboxusers` 组：`sudo usermod -aG vboxusers $USER`
  - 磁盘或文件访问问题检查文件/目录权限与 SELinux/AppArmor（若启用）
- 显示/Wayland 相关：
  - 某些基于 X11 的应用在 Wayland（如 Niri）下需通过 Xwayland 运行，可能存在缩放或剪贴板问题。

示例：OneDrive 快速参考
- 安装（AUR）：
  ```bash
  yay -S onedrive
  ```
- 首次运行并授权：
  ```bash
  onedrive
  # 按提示打开浏览器完成 OAuth 授权
  ```
- 常用命令：
  - 同步：`onedrive --synchronize`
  - 查看状态：`onedrive --status`
  - 关闭：`onedrive --shutdown`
- 常见问题：若自动启动不可用，建议使用 systemd user service 或在 `.profile` / `.zshrc` 中添加启动脚本。

示例：VirtualBox 快速参考
- 安装（官方仓库）：
  ```bash
  sudo pacman -S virtualbox
  ```
- 安装内核模块（根据内核版本选择合适包）：
  - 常见选项：`virtualbox-host-modules-arch` 或 `virtualbox-host-dkms`
- 加入用户组：
  ```bash
  sudo usermod -aG vboxusers $USER
  ```
- 加载内核模块（如需）：
  ```bash
  sudo modprobe vboxdrv
  ```
- 常见问题：内核版本与模块不匹配、Secure Boot 导致模块无法加载（需签名或禁用 Secure Boot）。

如何贡献或请求新增 App
- 若缺少某应用页面，可在仓库中提交 Issue 或 PR，格式建议：
  - 标题：Add `docs/apps/<appname>.md`  
  - 内容：简介、安装命令、运行示例、故障排查、参考链接
- 文档风格：每页统一采用“简介 → 前提 → 安装 → 启动/授权 → 排错 → 参考”的结构。

最后
- 我会在每个子页面中补充尽量完整的安装命令、示例与排查步骤；若你希望我优先处理某个应用（例如把 OneDrive、WeChat、VirtualBox 做成带示例脚本的页面），请告知优先级，我将首先完善对应页面。