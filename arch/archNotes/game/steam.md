**1. 启用 multilib 仓库**
编辑 `/etc/pacman.conf`，找到下面两行并去掉前面的 `#`：

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

保存后更新软件包数据库：

```
sudo pacman -Sy
```

**2. 安装 Steam 客户端**

```
sudo pacman -S steam
```

**3. 安装显卡 32 位驱动**  
Steam 自身是 32 位应用，所以你必须安装对应显卡的 32 位支持库，例如：

- NVIDIA 专有驱动：

```
sudo pacman -S nvidia lib32-nvidia-utils
```

- AMD 开源驱动（一般 mesa 就够）：

```
sudo pacman -S mesa lib32-mesa
```

**4. 运行 Steam**  
在终端输入：

```
steam
```

首次运行会自动下载更新，并初始化你的 `~/.local/share/Steam` 配置目录。登录你的 Steam 账号后就可以安装游戏了。
