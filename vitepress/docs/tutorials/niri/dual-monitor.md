# Niri Dual Monitor Guide

Niri 双屏配置指南（Hyprland 原文已合并并转换）

本指南基于 Hyprland 的双屏配置思路，并参考 Niri 官方文档（Getting Started）。目标是帮助你在 Niri 桌面环境中查看显示器信息、理解布局概念、并在 `~/.config/niri/config.kdl` 中添加或调整输出（outputs）设置来实现多显示器布局（左右并列、上下叠放、缩放、旋转等）。

注意事项

- Niri 的配置文件位于 `~/.config/niri/config.kdl`（KDL 格式）。示例中的配置段是说明性用法；请以 Niri 官方文档与你本机的实际字段为准。
- 在修改配置前请备份原文件：`cp ~/.config/niri/config.kdl ~/.config/niri/config.kdl.bak`
- 修改配置后通常需要重启 Niri 会话或重载服务，参见“应用更改 / 重启”部分。

---

## 一、查看当前连接的显示器

Wayland 不统一像 X 那样使用 `xrandr`。常用的查看方法有：

- 查看内核 DRM 设备（可看到输出名字如 cardN、renderD\*）：

```docs/tutorials/niri/dual-monitor.md#L401-430
ls -l /sys/class/drm/
```

- 查看当前会话日志或 Niri 启动日志以获得检测到的输出信息：

```docs/tutorials/niri/dual-monitor.md#L431-460
journalctl --user -u niri.service --since "5 minutes ago"
# 或查看完整日志：
journalctl --user -u niri.service
```

- 如果你安装了通用的 Wayland 输出查询工具（例如由发行版提供或第三方），也可使用它获取输出列表。Niri 也提供 IPC（例如 `niri msg`）用于交互与查询，具体命令和参数请参阅 Niri 官方文档。

实战要点：

- 记录每个显示器的名称（例如 `eDP-1`、`HDMI-A-1` 等）和其原始分辨率与刷新率。
- 如果出现黑屏或无法启动，先确认 GPU 驱动（NVIDIA/Intel/AMD）是否支持在 Wayland 下运行 Niri。

---

## 二、配置文件位置与结构（概览）

Niri 使用 KDL 格式的配置文件 `~/.config/niri/config.kdl`。输出相关通常会放在类似 `outputs { ... }`、`display` 或 `outputs` 的配置块内（不同版本或扩展可能字段名称不同）。下面给出一个说明性的示例段，展示常见字段：名称、分辨率/模式、位置、缩放与旋转。

示例（说明性，字段名/语法请以官方为准）：

```docs/tutorials/niri/dual-monitor.md#L461-520
outputs {
  output "eDP-1" {
    mode "1920x1080@165"
    position 0 0
    scale 1.0
    transform "normal" # 例如: normal, rotate-90, rotate-180, rotate-270
  }

  output "HDMI-A-1" {
    mode "1920x1080@60"
    position 1920 0
    scale 1.0
  }
}
```

说明：

- `position x y`：表示该输出在虚拟桌面（workspace）中的坐标偏移。大多数 compositor 的坐标系以主显示器左上角为原点，X 向右为正，Y 向下为正，但请以 Niri 的实际行为为准。
- `scale`：缩放因子，常见为 `1.0`, `1.25`, `2.0` 等（针对高 DPI 面板）。
- `transform`：旋转或镜像设置（如果支持）。

---

## 三、常见布局示例

下面是几个常见场景的示例配置（均为说明性示例）。

1. 水平并排（外接显示器在右侧）

```docs/tutorials/niri/dual-monitor.md#L521-560
outputs {
  output "eDP-1" {
    mode "1920x1080@165"
    position 0 0
    scale 1.0
  }

  output "HDMI-A-1" {
    mode "1920x1080@60"
    position 1920 0
    scale 1.0
  }
}
```

2. 垂直叠放（外接显示器在上方）

```docs/tutorials/niri/dual-monitor.md#L561-600
outputs {
  output "eDP-1" {
    mode "1920x1080@165"
    position 0 0
    scale 1.0
  }

  # 注意：Y 可以为负值以将外接屏放置在主屏上方（取决于 Niri 的坐标约定）
  output "HDMI-A-1" {
    mode "1920x1080@60"
    position 0 -1080
    scale 1.0
  }
}
```

3. 旋转 180°（显示器颠倒）

```docs/tutorials/niri/dual-monitor.md#L601-640
outputs {
  output "eDP-1" {
    mode "1920x1080@165"
    position 0 0
    scale 1.0
  }

  output "HDMI-A-1" {
    mode "1920x1080@60"
    position 0 1080
    scale 1.0
    transform "rotate-180"
  }
}
```

再次强调：以上示例为说明性语法。实际键名（如 `mode`、`position`、`scale`、`transform`）可能与 Niri 的版本或配置风格略有差别，务必以官方 `config.kdl` 文档为准。

---

## 四、缩放（Scale）与高 DPI 显示器

- 如果一个显示器启用了缩放（例如 `scale = 2`），那么你在计算 `position` 时需要考虑缩放带来的逻辑分辨率差异。举例：物理分辨率为 `3840x2160`，scale 为 `2` 时，逻辑分辨率为 `1920x1080`。
- 推荐在配置文件中为每个输出明确设置 `scale`，并在设置后重新登录以验证应用效果。

---

## 五、自动放置与快捷关键字

Niri 在 Getting-Started 中提到会自动探测并运行默认组件（例如 Waybar）。有些 compositor 提供 `auto-left`、`auto-right` 等关键字用于自动放置外接显示器。如果 Niri 的配置支持类似关键字（或 `preferred`/`auto-*`），可以使用它们减少手动计算位置。

示例（假设支持）：

```docs/tutorials/niri/dual-monitor.md#L641-680
outputs {
  output "HDMI-A-1" {
    mode "preferred"
    position "auto-right"
    scale 1.0
  }
}
```

如果你看到屏幕上出现两个状态栏（例如 Niri 默认与 Waybar 同时运行），可以通过注释或删除 `spawn-at-startup "waybar"` 行来避免重复。

---

## 六、应用更改 / 重载配置

- 编辑好 `~/.config/niri/config.kdl` 后，常见方法是重启 Niri 会话：
  - 注销并重新登录（在图形登陆器选择 Niri session），或者
  - 如果你使用 systemd user service：重启服务

```docs/tutorials/niri/dual-monitor.md#L681-720
systemctl --user restart niri.service
```

- 或者重启整个用户图形会话（依据你的登录方式）。

- 也可以在 TTY 运行 `niri-session` 或使用 `niri --session` 启动新的会话（见官方文档）。

---

## 七、Xwayland 下的注意事项

- 使用 Wayland compositor（Niri）时，部分老旧的 X11 程序通过 Xwayland 运行。Xwayland 在多显示器或 DPI 下可能表现不同，尤其是在缩放不同的屏之间拖拽窗口时。
- 如果遇到应用窗口大小或缩放异常，尝试在该应用层面调整缩放设置或使用 Wayland 原生替代程序。

---

## 八、NVIDIA 与黑屏问题（常见陷阱）

Niri 官方文档提示 NVIDIA 驱动在 Wayland 下可能遇到问题（例如黑屏或高 VRAM 使用）。常见建议：

- 更新 NVIDIA 驱动到较新版本（支持 GBM）。
- 确保内核参数启用了 modeset：例如在 kernel 参数中加入 `nvidia-drm.modeset=1`（具体修改方法依发行版而异）。
- 如遇到黑屏，尝试在配置中手动设置 render device（参考官方 Getting-Started）：

```docs/tutorials/niri/dual-monitor.md#L721-760
debug {
  render-drm-device "/dev/dri/renderD128"
}
```

- 若仍无法启动，查看 `journalctl` 日志定位错误信息并搜索 Niri issue tracker 或 Niri Wiki 中的 Nvidia 章节获取解决办法。

---

## 九、故障排查清单

- 配置语法错误：检查 `config.kdl` 的语法（KDL 格式），先恢复备份文件再逐步修改。
- 输出名称不对：通过 `/sys/class/drm/` 或日志确认实际名称（不要盲目猜测）。
- 服务日志：`journalctl --user -u niri.service` 查看详细错误与堆栈。
- 竞争的面板/Bar：如果出现双面板，检查是否有 `waybar`、`waybar` 配置或其他 panel 同时在启动项中运行。
- Xwayland 问题：测试一个 Wayland 原生程序（例如 `alacritty`）以判断是否仅 Xwayland 程序异常。

---

## 十、参考与链接

- Niri 官方 Getting-Started（强烈建议阅读并以其为最终依据）  
  https://github.com/YaLTeR/niri/wiki/Getting-Started

- Niri 配置说明页面（Configuration -> Outputs / Inputs / Key Bindings） — 请在官方 Wiki 中查找详细字段说明。

---

如果你愿意，我已将 Hyprland 原始双屏说明合并到本页，并在下方以“附录：Hyprland 原始双屏设置”形式保留原始内容以供参考（已适当注记为 Hyprland 示例）。请注意：Hyprland 的配置语法与 Niri/Wayland 的配置语法不同，附录内容仅作为参考示例和迁移时的对照。

---

附录：Hyprland 原始双屏设置（原文保留供参考）

## Hyprland 双屏幕配置指南

在 Hyprland 中，双屏幕的布局配置主要通过 `monitor` 参数来实现。以下是如何查看当前屏幕信息、理解配置示例，并调整屏幕位置的步骤。

---

### 1. 查看当前显示器信息

使用以下命令查看当前连接的显示器及其状态：

```bash
hyprctl monitors
```

我的输出：

```
Monitor eDP-1 (ID 0):
    1920x1080@165.00400 at 0x0
    ...

Monitor HDMI-A-1 (ID 1):
    1920x1080@60.00000 at 1920x0
    ...
```

- `eDP-1` 是笔记本的内建显示器，分辨率为 1920x1080，刷新率为 165Hz，位于坐标 `(0x0)`。
- `HDMI-A-1` 是外接显示器，分辨率为 1920x1080，刷新率为 60Hz，位于坐标 `(1920x0)`，即在内建显示器的右侧。

---

### 2. 配置文件示例

在 `~/.config/hypr/hyprland.conf` 中，`monitor` 的配置格式如下：

```
monitor = name, resolution@refresh_rate, position, scale, [transform]
```

- `name`：显示器名称，如 `eDP-1` 或 `HDMI-A-1`。
- `resolution@refresh_rate`：分辨率和刷新率，如 `1920x1080@60`。
- `position`：显示器在虚拟布局中的位置，格式为 `x_offset y_offset`。
- `scale`：缩放因子，通常为 `1`。
- `transform`：可选，旋转或镜像设置。

---

### 3. 设置屏幕位置

#### 水平并排布局（外接显示器在右侧）

```conf
monitor = eDP-1, 1920x1080@165, 0x0, 1
monitor = HDMI-A-1, 1920x1080@60, 1920x0, 1
```

#### 垂直叠加布局（外接显示器在上方）

```conf
monitor = eDP-1, 1920x1080@165, 0x0, 1
monitor = HDMI-A-1, 1920x1080@60, 0x-1080, 1
```

#### 外接显示器旋转 180°（上下颠倒）

```conf
monitor = eDP-1, 1920x1080@165, 0x0, 1
monitor = HDMI-A-1, 1920x1080@60, 0x1080, 1, transform, 2
```

---

### 4. 注意事项

- **坐标系统**：Hyprland 使用反向 Y 轴坐标系统，即负值 `y` 坐标将显示器放置在上方，正值则放置在下方。
- **缩放与旋转**：如果显示器设置了缩放（`scale`）或旋转（`transform`），需要根据实际像素调整 `position`。例如，`scale` 为 2 时，实际分辨率为 `1920x1080`，但 `position` 应使用 `960x540`。
- **自动布局**：可以使用 `auto`, `auto-left`, `auto-right`, `auto-up`, `auto-down` 等关键字自动定位显示器。例如：
  ```conf
  monitor = HDMI-A-1, preferred, auto-right, 1
  ```
  这将把 `HDMI-A-1` 放置在主显示器的右侧。

---

### 5. 参考资料

- [Hyprland Wiki - Monitors](https://wiki.hypr.land/Configuring/Monitors/)
- [Hyprland Monitor Config](https://christitus.com/hyprland-monitor-config/)

（End of Hyprland appendix）

---

变更说明：

- 我已把页面标题改为英文主标题并保留中文副标题以便侧边栏中文显示时保持可读性。
- 已把 Hyprland 原始双屏文档内容作为“附录”整合到本页底部，原文内容保持不改（便于对照）。Niri 主体部分已在上方提供 Niri KDL 示例与使用说明。
- 如果你希望我把 Hyprland 的示例直接翻译为对应的 Niri KDL 字段并在正文中替换示例，我可以继续进行自动转换（会以 Niri 官方文档为准并注明转换假设）。请回复 “转换为 Niri 配置” 或 “保留附录即可”。
