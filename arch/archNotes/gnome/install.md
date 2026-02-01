# Gnome 安装教程

## 安装

**如果**直接执行

```bash
sudo pacman -S gnome
```

![](https://img.makis-life.cn/imagesNew/2026-01-28-1.png?x-oss-process=style/yasuo)

> 这会安装非常多的软件，包括你很可能用不上的一些地图啊乱七八糟的。

精简安装的话使用如下即可：

```bash
sudo pacman -S gdm gnome-session gnome-shell gnome-control-center gnome-settings-daemon gnome-backgrounds nautilus xdg-desktop-portal-gnome gnome-keyring
```

> 上面的 gnome-backgrounds 也可以不用，不过设置桌面壁纸对观感影响还是比较高的，所以还是添加了哈哈

记得在环境变量设置

```profile
export XDG_CURRENT_DESKTOP=GNOME
```

如果你希望开机后直接进入 Gnome 的登录界面，也就是 gdm，那么

```bash
sudo systemctl enable gdm.service
```

如果你和我一样希望开机后只是 tty, 自己手动进入的话。那么在每次开机后自己手动

```bash
sudo systemctl start gdm.service
```
