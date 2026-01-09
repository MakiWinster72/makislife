# 安装指南（Guides）

本章节为 Arch Linux 的安装与初始配置入口页。本站以“安装为主线”，将安装流程拆分为更易理解的步骤：安装前准备、脚本安装（archinstall）与手动安装、以及常见的输入法配置与安装后注意事项。建议依序阅读：先阅读安装前准备 → 选择脚本安装或手动安装 → 安装后依据需要阅读应用与 dotfiles 部分。

快速链接

- 安装前准备：/guides/before-installation  
  介绍 UEFI 与分区准备、制作启动盘、BIOS 设置、网络与备份建议。
- 安装步骤（archinstall 与手动安装）：/guides/installation  
  提供 archinstall 脚本使用流程以及完整的手动安装步骤（分区、挂载、pacstrap、引导安装等）。
- 输入法（fcitx5 + 拼音）：/guides/fcitx5-pinyin  
  安装与配置 fcitx5、环境变量与自启设置。

安装前建议（快速清单）

- 备份重要数据到外部存储或云端。
- 准备一只启动 U 盘（≥2GB），并验证 ISO 校验和。
- 确认主机使用 UEFI（推荐）或 BIOS（特殊情况），并关闭 Secure Boot（如需）。
- 若与 Windows 共存，提前在 Windows 中缩减分区并保存 BitLocker key。
- 确认网络（有线优先，Wi‑Fi 可在安装环境中配置）。

所需时间估计

- 准备与制作启动盘：10–30 分钟
- 脚本安装（archinstall）：20–60 分钟（取决于网络与选项）
- 手动安装：约 45–90 分钟（含分区、包安装与基本配置）

快速命令示例（更新系统）

```/dev/null/example.sh#L1-3
sudo pacman -Syu
```

脚本安装快速提示

- 若想快速完成基础系统并进行自动化分区/配置，`archinstall` 是推荐的方式：它会提供交互式向导帮助选择镜像、分区策略、引导器与用户设置。安装完成后仍需手动调整某些自定义配置（例如 dotfiles、桌面环境、主题等）。

手动安装要点

- 手动安装会让你更清楚每一步的原理（分区、文件系统、fstab、chroot 等），适合愿意学习底层细节或需要更精细分区策略的用户。强烈建议阅读手动安装完整步骤并备份配置示例。

安装后常见下一步

- 网络服务：启用并测试 NetworkManager 或其他网络管理器。
- 字体与 locale：正确配置系统 locale 与终端字体以避免乱码。
- Shell 与 dotfiles：安装 zsh / p10k、WezTerm / Kitty 等并启用配置。
- 桌面环境：选择你偏好的 DM / compositor（我推荐 Niri 作为 Wayland 选项；教程在 Tutorials → Niri）。

故障排查（快速指南）

- 无网络：在安装环境中优先使用有线；Wi‑Fi 请使用 `iwctl` 或 `nmcli` 检查设备与连接。
- 引导丢失：检查 EFI 分区是否正确挂载并确认 grub 或 systemd-boot 的安装步骤与生成的配置有效。
- 屏幕/显卡问题：Wayland 下 GPU（尤其是 NVIDIA）可能需要额外参数或驱动支持，参考 Niri 与显卡驱动的兼容说明。

如何使用本章节

1. 先打开「安装前准备」页面，完成硬件与镜像准备。
2. 决定使用脚本（archinstall）还是手动安装，然后访问「安装步骤」页并严格按步骤操作。
3. 安装完成后，可根据需要阅读输入法、dotfiles 与软件安装页面完成桌面环境配置。

下一步（推荐顺序）

1. /guides/before-installation
2. /guides/installation
3. /guides/fcitx5-pinyin
4. /dotfiles/（启用 zsh、WezTerm 示例）
5. /tutorials/niri/（若使用 Wayland 与 Niri）

贡献与反馈

- 若你发现某步骤不可复现或有更优实践，欢迎以 Issue 或 PR 的方式提交改进建议。文档以中文为主，文件/目录名使用英文以利维护与链接管理。

页面模板说明（给维护者）

- 每个安装性页面请保持同样结构：摘要 → 前提（Prerequisites）→ 步骤（Steps）→ 示例（含命令）→ 故障排查 → 参考链接。图片与命令尽量贴合实际测试结果，并在文件顶部标注最后更新日期。

如果你希望我现在开始将其他相关页面（如 dotfiles、apps、tutorials 的索引页）补全并把 `guide` 目录中冗余的草稿整理为草稿目录，请回复“继续整理”，我会列出将要移动或删除的文件清单供你确认。
