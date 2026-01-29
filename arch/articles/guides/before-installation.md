# 安装前的准备

## 网络、ISO、U 盘等准备

### 1\. 确保网络环境

**有线网络**：若通过路由器 DHCP 自动上网，无需额外设置。
**无线网络**：请提前将 Wi‑Fi 改为==英文数字组合名称==。

### 2\. 下载安装镜像

可从开源镜像站或 Arch 官方页面下载 ISO。国内常用镜像站：

[阿里巴巴](https://mirrors.aliyun.com/archlinux/iso/)
[清华大学开源软件镜像站（TUNA）](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/)

镜像通常路径为 iso > 20XX.XX.XX > archlinux-20XX.XX.XX-x86_64.iso。

> Arch Linux 是滚动更新系统，不存在版本号的概念，直接下载最新就行。不同月份 iso 在`sudo pacman -Syu`后是一样的。

### 3\. 刻录安装 U 盘（≥5GB）

**Windows**：推荐 Ventoy、Rufus。
**Linux**：可用 Ventoy、balenaEtcher，或直接使用 dd 命令。

### 4\. 为 Arch 分出硬盘空间

> 如果该盘只安装 Arch ，那使用默认配置就可以了。

**系统盘**：若与 Windows 共用同一硬盘，建议在 Windows 的“磁盘管理”中压缩出至少 30GB ==空闲空间==给 Arch。
**EFI 分区**：与 Windows 同盘时，请确认 EFI 分区容量 ≥ 256MB。

### 5\. 进入 BIOS 关闭 Secure Boot

查询“xx 品牌电脑如何进入 BIOS”，一般可能为 F2/F8/F10/DEL 等，乱按总有一次会进的。

在 Security 相关选项中将 Secure Boot 设置为 Disabled。

> 极少数设备无法关闭且仅允许加载 Windows 签名，此类设备不适合原生安装。

### 6\. 启动方式调整为 UEFI

旧主板可能需将 Boot Mode 设为 UEFI Only，而非 Legacy/CSM。

> 也就是下面第一个图里面，看见有第一个 UEFI 选项即可

### 7\. 调整启动顺序

在 BIOS 中的 Boot 选项中将 U 盘置于第一启动项，如果改不了就启动启动选项，而不是 BIOS，因为有的品牌 BIOS 中无法更改启动顺序 (比如我的暗夜精灵 😎)。

## 开始安装

制作好启动盘后，启动 U 盘，进入选择 Arch 的 ISO，会进入如下界面：选择第一个

![](https://img.makis-life.cn/images/20260109114308583.png?x-oss-process=style/yasuo)

等待进入如下界面

![](https://img.makis-life.cn/images/20260109114308584.png?x-oss-process=style/yasuo)

### （可选）调整字体

![](https://img.makis-life.cn/images/20260109114308586.png?x-oss-process=style/yasuo)

> 舒服多了

### 联网

> arch 现在必须联网安装

有线网络（一般都配有 DHCP）可直接使用

```bash
ping www.baidu.com  # 测试是否正常联网
```

使用 iwctl 进行无线联网

> 注意 wifi 名只能是英文和数字的组合。

```bash
iwctl
station list                                  # 列出可用设备，一般为wlan0
station wlan0 scan                            # 扫描网络
station wlan0 connect <Name>                  # 网络名称可以配合tab操作防止输错
<Password>                                    # 如果密码成功不会有任何提示
exit                                          # 退出 iwctl
ping www.baidu.com                            # 测试是否正常联网
```

### 同步时钟

启用并且启动服务

```bash
sudo systemctl enable --now systemd-timesyncd
```

启用 NTP

```bash
sudo timedatectl set-ntp true
```

设置时区

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

> 现在，你可以输入`timedatectl`查看输出，是否符合当前的时间。
