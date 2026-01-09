# Niri 快速上手（Getting Started）

本页为 Niri（推荐的 Wayland compositor）在 Arch 环境下的快速上手指南。内容包括：安装建议、必要依赖、如何启动会话、常用配置片段（KDL）、多屏配置要点、常见问题与排查方法。假定你已经完成系统安装并能进入图形环境或 TTY。

> 注意：Niri 的官方文档为最终权威，本文旨在提供一个可复现的快速入门流程与常见情形的示例配置。官方文档： https://github.com/YaLTeR/niri/wiki/Getting-Started

---

## 一、准备与依赖（Arch）

在 Arch 上推荐安装下列软件包（示例）：

```docs/tutorials/niri/index.md#L241-280
# 推荐的基础包（示例）
sudo pacman -Syu
sudo pacman -S niri xwayland-satellite xdg-desktop-portal-gnome xdg-desktop-portal-gtk \
  alacritty fuzzel waybar wl-clipboard slurp grim
# 可选 AUR 包（例如 DankMaterialShell、dms-shell-bin 等）使用 paru/yay:
# paru -S dms-shell-bin matugen
```

说明：

- `niri`：核心 compositor 包（如果你的发行版仓库提供）。
- `xwayland-satellite`：Xwayland 的支持组件（视发行版而定）。
- `xdg-desktop-portal-*`：确保桌面门户（文件选择、打印、屏幕共享）工作。
- `alacritty`、`fuzzel`、`waybar`：常用的 terminal、launcher 与 panel，便于示例说明。

---

## 二、启动 Niri 会话

1. 使用登录管理器（GDM / SDDM / LightDM 等）：

   - 安装并在登录界面选择 Niri 会话后登录。

2. 从 TTY 启动（无登录管理器）：
   - 使用 systemd 用户会话脚本（推荐）：

```docs/tutorials/niri/index.md#L281-320
# 以 systemd 用户服务启动 Niri（若系统提供 niri-session）
niri-session
# 或手动：
niri --session
```

- `niri-session` 会把会话信息导入 systemd-user，并启动必要的服务（portals、dbus 等）。
- 若在已有桌面会话中运行 `niri`，会以窗口模式启动（主要用于开发/调试，不推荐用于日常工作）。

---

## 三、配置文件位置与基本结构

Niri 使用 KDL 作为配置格式，默认位置：

```docs/tutorials/niri/index.md#L321-360
~/.config/niri/config.kdl
```

典型配置结构包含：`outputs`（显示器）、`input`（输入配置）、`keybinds`、`spawn-at-startup` 等模块。配置采用 KDL 语法（键值与块结构），请以官方 Wiki 为准。

---

## 四、输出（多屏）示例（KDL）

下面是一个说明性的 `outputs` 配置示例，演示两个显示器并排（外接在右侧）与垂直叠放的写法。请以你的输出名称与实际模式替换示例值。

```docs/tutorials/niri/index.md#L361-440
outputs {
  output "eDP-1" {
    mode "1920x1080@165"
    position 0 0
    scale 1.0
  }

  output "HDMI-A-1" {
    mode "1920x1080@60"
    position 1920 0    # 放在主屏右侧
    scale 1.0
  }
}
```

垂直叠放（外接在上方）示例：

```docs/tutorials/niri/index.md#L441-480
outputs {
  output "eDP-1" {
    mode "1920x1080@165"
    position 0 0
    scale 1.0
  }

  output "HDMI-A-1" {
    mode "1920x1080@60"
    position 0 -1080   # 使用负 Y 将显示器放在上方（以 Niri 行为为准）
    scale 1.0
  }
}
```

注意：

- `mode` 可以使用 `preferred` 或指定分辨率与刷新率。
- `position x y` 使用逻辑像素（若使用 scale，请注意计算逻辑分辨率）。
- 某些版本或扩展可能使用不同字段名或受限于 compositor 版本，遇到问题请参照官方配置页。

---

## 五、常用 Keybindings（快速样例）

Niri 的默认热键示例（可在 config.kdl 中自定义）：

```docs/tutorials/niri/index.md#L481-520
# 以下仅为示例性说明，具体语法请参考 Niri 的 keybind 文档
# Mod 键在 TTY 为 Super，在窗口模式为 Alt
# 示例动作（逻辑）
Mod+T -> 打开终端（alacritty）
Mod+D -> 启动程序启动器（fuzzel）
Mod+Q -> 关闭窗口
Mod+H/L/J/K -> 左/右/下/上 聚焦窗口
Mod+Ctrl+H/L/J/K -> 移动窗口
Mod+F -> 最大化/切换全屏
```

建议：把常用的 launcher、截屏、音量控制、屏幕亮度等快捷键也写入配置并测试。

---

## 六、Xwayland 与 X11 应用

- 大部分 X11 应用通过 Xwayland 运行。某些老旧应用在 Wayland 下可能存在缩放或输入法兼容问题。
- 如果遇到窗口尺寸异常或拖拽问题，优先检查该程序是否在 Xwayland 下运行，并尝试原生 Wayland 版本（若可用）。

---

## 七、NVIDIA 常见问题与解决建议

Niri 官方 Wiki 提示 NVIDIA 驱动在 Wayland 下可能有兼容性问题（例如黑屏或高 VRAM 使用）。常见建议：

- 确保 NVIDIA 驱动支持 GBM，更新驱动到较新版本。
- 在内核启动参数中启用 modeset，例如：

```docs/tutorials/niri/index.md#L521-560
# 在 bootloader 的 kernel 参数中添加（示例）
nvidia-drm.modeset=1
```

- 若从 TTY 启动遇到黑屏，尝试在 `~/.config/niri/config.kdl` 中手动指定 render device：

```docs/tutorials/niri/index.md#L561-600
debug {
  render-drm-device "/dev/dri/renderD128"
}
```

- 若仍问题严重，参考 Niri issue tracker 与 NVIDIA 社区的相关讨论，或考虑使用 mesa/llvmpipe 等替代方案做测试。

---

## 八、应用更改与重载服务

修改 `~/.config/niri/config.kdl` 后，建议重启 Niri 会话：

```docs/tutorials/niri/index.md#L601-640
# 使用 systemd user service 重启
systemctl --user restart niri.service

# 或注销并重新登录（若使用登录管理器）
```

查看日志定位问题：

```docs/tutorials/niri/index.md#L641-680
journalctl --user -u niri.service -b
# 或
journalctl --user --since "10 minutes ago" -u niri.service
```

---

## 九、常见故障排查清单

- 黑屏或无法启动
  - 检查 GPU 驱动与 kernel modeset 设置；查看 `journalctl` 日志。
  - 尝试在 TTY 使用 `niri` 查看是否以窗口模式启动并观察错误信息。
- 显示器未检测或位置错误
  - 使用 `/sys/class/drm/` 确认设备名称，确保 `output` 名称与系统一致。
- 重复面板/状态栏
  - 默认配置可能 spawn waybar，若出现双 bar，请删除或注释 spawn-at-startup 中重复的 bar。
- Xwayland 应用缩放或输入法异常
  - 尝试使用 Wayland 原生客户端或调整 Xwayland 相关设置；检查输入法（fcitx5 / ibus）是否启用 portal 支持。
- 截图/录屏问题
  - 在 Wayland 下推荐使用 `slurp` + `grim`（截图）与 `wf-recorder` / `obs`（录屏）；确保 portal 与权限配置正确。

---

## 十、推荐软件清单（与 Niri 配套）

- Terminal: `alacritty`, `wezterm`
- Launcher: `fuzzel`
- Panel/status: `waybar` 或 compatible bars
- Screenshots/record: `slurp`, `grim`, `wf-recorder`, `obs`
- Portals: `xdg-desktop-portal-gnome` / `xdg-desktop-portal-gtk`
- Extras: `wl-clipboard`, `cliphist`, `cava`（音频可视化）

---

## 十一、参考链接

- Niri 官方 Wiki — Getting Started: https://github.com/YaLTeR/niri/wiki/Getting-Started
- Niri 配置说明（Configuration）: 请在官方 Wiki 中查找 `Configuration`、`Outputs`、`Key Bindings` 等章节。
- ArchWiki — Wayland、Xwayland 与 NVIDIA 相关条目： https://wiki.archlinux.org/

---

如果你希望我把本页的某个示例（例如完整的 `config.kdl` 可复制模板，或将你的 Hyprland keybind 全部尝试转换为 Niri 格式）生成成一个可直接粘贴并测试的文件，请告诉我优先项（例如 “生成完整 niri config 模板” 或 “转换 keybinds”），我会继续为你完成并把文件放到 `docs/tutorials/niri/` 下。
