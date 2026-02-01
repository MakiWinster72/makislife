# 安装 Heroic Games Launcher（Arch Linux）

1. 安装 **AUR helper**（如果还没有）

```bash
sudo pacman -S --needed base-devel git
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

2. 用 yay 安装 Heroic Launcher 包

```bash
yay -S heroic-games-launcher-bin
```

这个包是从 AUR 的预编译二进制版本，安装会自动处理依赖。

3. 安装后用命令启动它：

```bash
heroic
```

4. 在 Heroic 界面里登录你的 **Epic Games 账号**，然后你可以浏览、下载和运行你拥有的游戏。

### 用 Lutris + Epic 安装器（备选）

如果你更喜欢用 Lutris，可以这样做：

1. 安装 Lutris

```bash
sudo pacman -S lutris
```

2. 启动 Lutris，在 Lutris 里查找 **Epic Games Store** 这一项安装脚本。通常它会下载 Epic 安装器，然后用 Wine 在你的系统上运行。
3. 跟随 Lutris 的引导登陆 Epic 账号，安装 Epic 客户端，然后通过它安装和启动游戏。

### 注意事项和限制

- 不是所有游戏都能在 Linux 下正常运行，尤其是需要 **Easy Anti-Cheat（EAC）** 的游戏经常无法运行。Epic 官方和游戏开发商目前对 Linux 不提供官方完整支持。
- 性能和兼容性取决于你的 Wine/Proton 版本、显卡驱动（NVIDIA/AMD Vulkan 支持）以及单个游戏本身。
