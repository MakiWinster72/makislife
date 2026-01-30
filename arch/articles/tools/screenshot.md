# 截屏工具
## 安装

```bash
sudo pacman -S grim slurp satty wl-clipboard
```

> grim slurp 用于截屏
> wl-clipboard 配合 satty 复制到剪贴板
> satty 方便编辑图片

## 使用

截图并交给 satty 编辑：

```bash
grim -g \"$(slurp)\" -t ppm - | satty --filename -
```

截图并直接复制：

```bash
grim -g "$(slurp)" - | wl-copy
```

## 注意配置satty中文字体
配置文件在
`~/.config/satty/config.toml`
没有就新建。
参考我的配置
```toml
[general]
fullscreen = false
early-exit = false
initial-tool = "brush"
copy-command = "wl-copy"
annotation-size-factor = 2
output-filename = "/tmp/test-%Y-%m-%d_%H:%M:%S.png"
save-after-copy = false
default-hide-toolbars = false
disable-notifications = true

[font]
family = "HarmonyOS Sans SC"
style = "Regular"

[color-palette]

palette = [
  "#8aadf4", # Blue
  "#ed8796", # Red
  "#a6da95", # Green
  "#eed49f", # Yellow
  "#c6a0f6", # Mauve
  "#cad3f5", # White
```