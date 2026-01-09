使用 archinstall 安装
nmtui 联网

# Basic

sudo pacman -S curl wget git openssh zip unzip tar vim

安装 wm
enable sshd
fcitx5
安装 yay

## 在 Arch 安装 **yay**

① 安装构建工具（Arch 默认没 `base-devel`）

```
sudo pacman -S --needed git base-devel
```

② 克隆 yay

```
git clone https://aur.archlinux.org/yay.git
```

③ 进入目录

```
cd yay
```

④ 编译并安装

```
makepkg -si
```

⑤ 测试

```
yay --version
```

你现在就能用 yay 装 AUR 包，比如：

```
yay -S google-chrome
```

# 安装 firefox

# clash-verge-rev-bin

# paru

## 在 Arch Linux 安装 `paru`（AUR 辅助工具）

1. 更新系统并安装基础构建工具：

   ```bash
   sudo pacman -Syu
   sudo pacman -S --needed base-devel git
   ```

2. 克隆 paru 的 AUR 仓库：

   ```bash
   git clone https://aur.archlinux.org/paru.git
   cd paru
   ```

3. 构建并安装 paru：

   ```bash
   makepkg -si
   ```

   - `-s`：同步并安装依赖
   - `-i`：构建完成后安装

4. 安装完成后，可以用 `paru` 管理 AUR 和官方包。几个常见命令：

   - 更新系统（包括 AUR）：`paru`
   - 安装包：`paru -S <包名>`
   - 升级所有 AUR 包：`paru -Sua`
   - 查看 AUR 更新：`paru -Qua`

# yazi

```
sudo pacman -S yazi ffmpeg 7zip jq poppler fd ripgrep fzf zoxide resvg imagemagick
```

If you want to use the latest Git version, you can install it from [AUR](https://aur.archlinux.org/packages/yazi-git/) or [Arch Linux CN](https://github.com/archlinuxcn/repo/):

```
paru -S yazi-git ffmpeg 7zip jq poppler fd ripgrep fzf zoxide resvg imagemagick
```

You can also install the [official nightly release binary](https://github.com/sxyazi/yazi/releases/tag/nightly) from [AUR](https://aur.archlinux.org/packages/yazi-nightly-bin), which is built from the latest code within the past 6 hours:

```
paru -S yazi-nightly-bin ffmpeg 7zip jq poppler fd ripgrep fzf zoxide resvg imagemagick
```
