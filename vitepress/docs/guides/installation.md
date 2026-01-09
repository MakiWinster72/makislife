---
title: "安装指南"
sidebarDepth: 2
---

# 方式一：archinstall

> archinstall 为 Arch 的安装提供了极大的便利，并且对于我们来说已经很够用了，如果你也想 speedRun，那当我没说哈哈哈

> 确认网络正常连接后，在安装环境的终端中运行：

```bash
archinstall
```

运行后根据设备和网速，稍等片刻，会进入 `archinstall` 向导。
![](https://img.makis-life.cn/images/20260109114135715.png)

> 用旧电脑等了超久...但整体来说也比手动安装快很多了，对小白来说也更安全。

![](https://img.makis-life.cn/images/20260109114135716.png)
按照提示选择区域、分区与安装选项。根据你的网络与系统环境，某些步骤可能需要等待下载和检测。

安装向导界面支持使用 vim 键位进行移动，也可以使用方向键选择并确认。按下空格选择，Enter 确认。

1. Archinstall language 和 Locales 保留默认就行

   > 都用上 arch 了，就别选中文了吧 hh

2. Mirrors and repositories
   选择 Select regions，按下 Enter，找到 China 按空格选择，按 Enter 确认
   ![](https://img.makis-life.cn/images/20260109114135718.png)
3. Disk Configuration
   ![](https://img.makis-life.cn/images/20260109114135719.png)
   如果硬盘只安装 Arch，那选择第一个就可以，注意分辨好是哪个硬盘。

如果一个硬盘里有多系统，比如 Win + Linux，那么需要选择第二个手动分区。

安装 btrfs 或者 exf4 都可以，home 目录不必分单独分区，方便后续管理。

4. Swap 建议开启
5. Bootloader 如果是双系统选择 grub，如果只有 arch 那么保留默认即可
6. Authentication 设置好 root 用户密码，然后添加一个普通用户，在选择添加为 sudo group 的时候选择 yes
   ![](https://img.makis-life.cn/images/20260109114135720.png)
   Confirm and exit
7. profile
   ![](https://img.makis-life.cn/images/20260109114135721.png)
   如果要手动安装 Window Manager 的，建议选择 Minimal，最小化安装。

![](https://img.makis-life.cn/images/20260109114135722.png)
在 Desktop 下有非常多的界面可以选择，<u>发现居然也有 Hyprland 和 niri</u>（两个我比较喜欢的 wm）
不过依然会预装小部分比较建议的软件，如果喜欢干干净净的强迫症用户<del>我</del>，还是自己安装 wm 比较好。

8. Applications
   留空就好，不必选择进去，会需要网络加载。

9. Kernels 保持默认
10. Network configuration
    如果无特殊意外选择 Network Manager
11. Timezone 选择 UTC+8
    这里没有北京～，选择上海

接下来就可以 Enter Install 确认安装啦！
安装好后，会询问你是否重启，重启即可进入崭新的 Arch！

跳转到 [完成安装](#完成安装)

---

# 手动安装

> [!tip]
> 后续更新发现参考文章的作者 icekylin 更新了，请前往他的网站[查看](https://arch.icekylin.online/guide/rookie/basic-install)，人家更专业哈哈，有更好的教程那下文就不更新了。🎉

> 该部分参考[Archlinux 基础安装](https://arch.icekylin.online/guide/rookie/basic-install.html)，并做出部分更新
>
> 建议设置字体保护眼睛 setfont ter-132n

### 1. 验证启动模式

检查是否为 UEFI 模式：

```bash
ls /sys/firmware/efi/efivars
```

如果是 UEFI，那么会输出这么一堆玩意儿
![](https://img.makis-life.cn/images/20260109114135723.png)

### 2. 连接网络

- **有线网络**（通常自动连接）：

```bash
ping www.baidu.com
```

- **无线网络**：

```bash
iwctl
[iwd]# device list
[iwd]# station wlan0 scan
[iwd]# station wlan0 get-networks
[iwd]# station wlan0 connect "网络名称"
# 输入密码后回车，如果密码正确不会有任何提醒
[iwd]# exit
```

检测网络连接是否正常：

```bash
ping www.baidu.com
```

### 3. 更新系统时间

```bash
timedatectl set-ntp true
```

### 4. 更换国内软件仓库镜像

```
vim /etc/pacman.d/mirrorlist
```

在顶部添加

```etc
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.aliyun.com/archlinux/$repo/os/$arch
```

输入:wq 保存并退出

### 5. 分区

分区具有破坏性，执行前务必确认磁盘与分区号无误。建议先用 `lsblk` 与 `fdisk -l` 了解磁盘与现有分区情况。

- 查看磁盘与分区：

```bash
lsblk
```

![](https://img.makis-life.cn/images/20260109114135724.png)

> 我这里是虚拟机，20G 就是我的硬盘 hh

- 使用 `cfdisk` 进行分区（以 /dev/sda 为例，NVMe 盘为 /dev/nvmexnx(x 为数字)）：

```bash
cfdisk /dev/sda
```

如果提示如下，选择 gpt 分区（毕竟我们 UEFI 启动了）：
![](https://img.makis-life.cn/images/20260109114135725.png)

首先创建 Swap 分区。选中  `Free space` > 再选中操作  `[New]` > 然后按下回车  `Enter`  以新建  `swap`  分区（类似 Windows 的交换文件）
按下回车后会提示输入  `分区大小`，Swap 分区建议为**电脑内存大小的 60%**，或者和内存大小相等 > 然后按下回车  `Enter`
![](https://img.makis-life.cn/images/20260109114135726.png)
![](https://img.makis-life.cn/images/20260109114135727.png)

默认新建的类型是  `Linux filesystem`，我们需要将类型更改为  `Linux swap`。选中操作  `[Type]` > 然后按下回车  `Enter` > 通过方向键  `↑`  和  `↓`  选中  `Linux swap` > 最后按下回车  `Enter`
![](https://img.makis-life.cn/images/20260109114135728.png)
我们再只需要一个分区即可（因为使用  `Btrfs`  文件系统，所以根目录和用户主目录在一个分区上），所以类似的：选中  `Free space` > 再选中操作  `[New]` > 然后按下回车  `Enter`  以新建分区
![](https://img.makis-life.cn/images/20260109114135729.png)
分区类型默认即可，无需更改。接下来选中操作  `[Write]`  并回车  `Enter` > 输入  `yes`  并回车  `Enter`  确认分区操作

> [!warning]
> 一定要好好检查！！！
> 特别是多系统的，检查好你的 Windows 分区是否还在。
> 有其他文件分区的，检查是否被更改

选择`quit`退出，然后使用 lsblk 查看分区情况：
![](https://img.makis-life.cn/images/20260109114135730.png)

### 5. 格式化分区（以 Btrfs 为例）

> [!attention]
> ⚠️ 若与 Windows 共盘且已有 EFI 分区，请勿重新格式化该 EFI 分区。

- **EFI 分区**：

```bash
mkfs.fat -F32 /dev/sda1
```

- **根分区格式化为 Btrfs**：

```bash
mkfs.btrfs -L myArch /dev/sda2
```

- **创建并启用交换分区**（如使用分区方案）：

```bash
mkswap /dev/sda3
swapon /dev/sda3
```

创建 **Btrfs 子卷**：

- 先临时挂载根分区：

```bash
mount -t btrfs -o compress=zstd /dev/sda2 /mnt
```

- 创建子卷（/ 与 /home）：

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
```

- 卸载临时挂载：

```bash
umount /mnt
```

> 如不使用 **Btrfs**，可将根分区格式化为 **ext4**：
>
> ```bash
> mkfs.ext4 /dev/sda2
> ```
>
> 后续挂载步骤按 ext4 常规挂载即可。

### 6. 挂载分区

- **挂载根子卷**：

```bash
mount -t btrfs -o subvol=/@,compress=zstd /dev/sda2 /mnt
```

- **挂载 /home 子卷**：

```bash
mkdir -p /mnt/home
mount -t btrfs -o subvol=/@home,compress=zstd /dev/sda2 /mnt/home
```

- **挂载 EFI 分区**：

```bash
mkdir -p /mnt/boot
mount /dev/sda1 /mnt/boot
```

### 8. 安装基础系统

**Btrfs** 用户建议包含 **btrfs-progs**；需要 **make/编译** 可加入 **base-devel**：

```bash
pacstrap /mnt base linux linux-firmware btrfs-progs
```

### 9. 生成 fstab

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

### 10. 进入新系统

```bash
arch-chroot /mnt
```

### 11. 设置主机名与时区

首先在 `/etc/hostname` 设置主机名：

```bash
vim /etc/hostname
```

加入你想为主机取的主机名，这里比如叫 `arch`。

随后设置时区，在 `/etc/localtime` 下用 `/usr` 中合适的时区创建符号链接：

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### 13. 硬件时间设置

使用如下命令将系统时间同步到硬件时间：

```bash
hwclock --systohc
```

### 14. 设置 Locale

Locale 决定了软件使用的语言、书写习惯和字符集。

编辑 `/etc/locale.gen`，去掉 `en_US.UTF-8 UTF-8` 以及 `zh_CN.UTF-8 UTF-8` 行前的注释符号（#）：

```bash
vim /etc/locale.gen
```

然后使用如下命令生成 locale：

```bash
locale-gen
```

向 `/etc/locale.conf` 输入内容：

```bash
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

⚠️ 注意：不推荐在此设置任何中文 locale，会导致 tty 乱码。

### 15. 为 root 用户设置密码

```bash
passwd root
```

注意输入密码时不会显示，不要以为键盘坏了。

### 16. 安装微码

通过以下命令安装对应芯片制造商的微码：

```bash
pacman -S intel-ucode  # Intel
pacman -S amd-ucode    # AMD
```

### 17. 安装引导程序

如有需要可以参阅 ArchWiki 相关内容。

安装相应的包：

```bash
pacman -S grub efibootmgr os-prober
```

📑 命令参数说明：

- `-S` 选项后指定要通过 pacman 包管理器安装的包：
  - `grub` —— 启动引导器
  - `efibootmgr` —— efibootmgr 被 grub 脚本用来将启动项写入 NVRAM
  - `os-prober` —— 为了能够引导 win10，需要安装 os-prober 以检测到它

安装 GRUB 到 EFI 分区：

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ARCH
```

📑 命令参数说明：

- `--efi-directory=/boot` —— 将 grubx64.efi 安装到之前的指定位置（EFI 分区）
- `--bootloader-id=ARCH` —— 取名为 `ARCH`

接下来使用 vim 编辑 `/etc/default/grub` 文件：

```bash
vim /etc/default/grub
```

进行如下修改：

- 去掉 `GRUB_CMDLINE_LINUX_DEFAULT` 一行中最后的 `quiet` 参数
- 把 `loglevel` 的数值从 3 改成 5。这样是为了后续如果出现系统错误，方便排错
- 加入 `nowatchdog` 参数，这可以显著提高开关机速度

为了引导 win10，则还需要添加新的一行：

```bash
GRUB_DISABLE_OS_PROBER=false
```

```bash
# GRUB boot loader configuration
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="loglevel=5 nowatchdog"
GRUB_CMDLINE_LINUX=""
GRUB_DISABLE_OS_PROBER=false
```

ℹ️ 提示：`nowatchdog` 参数无法禁用英特尔的看门狗硬件，改为 `modprobe.blacklist=iTCO_wdt` 即可。如有需要可以参考 ArchWiki 对应内容。

最后生成 GRUB 所需的配置文件：

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

若引导了 win10，则输出应该包含倒数第二行：

```bash
os-prober-1
```

若 win10 安装在另一个硬盘中则不会输出。可在进入系统后**挂载硬盘**并重新执行该命令。

> ℹ️ 提示：
>
> 1. 在某些主板安装完成后，你会发现没有启动条目。这是因为某些主板的 UEFI 固件在显示 UEFI NVRAM 引导条目之前，需要在特定的位置存放可引导文件，不支持自定义存放 efi 文件（如微星 Z170-A Gaming PRO）。解决方案是在默认启动路径下安装 GRUB。重新插入安装优盘，按原先顺序挂载目录（不需要再次创建文件夹了），chroot 到 `/mnt`，然后你可以重新用 `--removable` 安装 grub2，如下命令所示。只有安装完成后你的主板不出现启动条目才需要尝试如下命令，正常安装无需执行。如有需要可以参考 ArchWiki 对应内容。
>
> ```bash
> grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ARCH --removable
> ```
>
> 2. `os-prober` 在 chroot 环境中可能无法正常运作。如果遇到这种情况，重启并引导进入系统后再次尝试生成配置文件。

### 18. 完成安装

<span id="完成安装"></span>
输入以下命令：

```bash
exit      # 退回安装环境
umount -R /mnt   # 卸载新分区
reboot    # 重启
```

重启后使用 root 账户登录系统
设置开机自启并立即启动 networkmanager 服务，即可连接网络：

```
systemctl enable --now NetworkManager # 设置开机自启并立即启动 NetworkManager 服务
ping www.baidu.com # 测试网络连接
```

若为无线连接，则需要在启动  `networkmanager`  后使用  `nmcli`  连接网络：

```
nmcli dev wifi list # 显示附近的 Wi-Fi 网络
nmcli dev wifi connect "Wi-Fi名（SSID）" password "网络密码" # 连接指定的无线网络
```

也可以使用  `nmtui`  来配置网络

> 这时候你应该还调不了屏幕亮度，运行 nmtui 前注意保护眼睛！！！🥲

```
nmtui
```

`fastfetch`  可以将系统信息和发行版 logo 一并打印出来。通过  `pacman`  安装  `fastfetch`：

```
pacman -S fastfetch
```

使用  `fastfetch`  打印系统信息：

```
fastfetch
```

> 🎉 恭喜 🎉
>
> 到这里，==一个基础的、无图形界面的 Arch Linux== 已经安装完成！
>
> 即使现在还没有见到桌面，你也应该感到**满满的满足感**。
>
> 好好享受一下成功安装 Arch Linux 的喜悦吧！
