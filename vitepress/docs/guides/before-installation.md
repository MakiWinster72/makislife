# 安装前的准备

## 1. 确保网络环境

- **有线网络**：若通过路由器 DHCP 自动上网，无需额外设置。
- **无线网络**：请提前将 Wi‑Fi 改为**英文数字组合名称**。

## 2. 下载安装镜像

可从开源镜像站或 Arch 官方页面下载 ISO。国内常用镜像站：

- [阿里巴巴](https://mirrors.aliyun.com/archlinux/iso/)
- [清华大学开源软件镜像站（TUNA）](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/)

镜像通常路径为 iso > 20XX.XX.XX > archlinux-20XX.XX.XX-x86_64.iso。

> Arch Linux 是滚动更新系统，不存在版本号的概念，直接下载最新就行。不同月份iso在`sudo pacman -Syu`后是一样的。

## 3. 刻录安装 U 盘（≥5GB）

- **Windows**：推荐 Ventoy、Rufus。
- **Linux**：可用 Ventoy、balenaEtcher，或直接使用 dd 命令。

## 4. 为 Arch 分出硬盘空间（双系统在同一个硬盘）

- **系统盘**：若与 Windows 共用同一硬盘，建议在 Windows 的“磁盘管理”中压缩出至少 30GB 空间给 Arch。**不用新建分区**。
- **EFI 分区**：与 Windows 同盘时，请确认 EFI 分区容量 ≥256MB。

## 5. 获取 BitLocker 恢复密钥(如果启用)

（说实话拿到电脑就该第一时间关了）
若 Windows 分区使用 BitLocker，请提前在微软账号页面获取恢复密钥，以防后续启动修复或引导配置时需要解锁。

## 6. 进入 BIOS 关闭 Secure Boot

查询“xx品牌电脑如何进入BIOS”，一般可能为F2/F8/F10/DEL等，乱按总有一次会进的。在 Security 相关选项中将 Secure Boot 设置为 Disabled。极少数设备无法关闭且仅允许加载 Windows 签名，此类设备不适合原生安装。

## 7. 启动方式调整为 UEFI

旧主板可能需将 Boot Mode 设为 UEFI Only，而非 Legacy/CSM。

## 8. 调整启动顺序

在 Boot 选项中将 U 盘置于第一启动项，如果改不了就启动启动选项，而不是 BIOS，因为有的品牌 BIOS 中无法更改启动顺序。

# 安装

制作好启动盘后，进入选择 Arch 的 ISO，会进入如下界面：选择第一个

![](https://img.makis-life.cn/images/20260109114308583.png)

等待进入如下界面
![](https://img.makis-life.cn/images/20260109114308584.png)

### 无线联网

（有线无需设置）

输入`iwctl`

```
station list  #这会列出你的网络设备
station wlan0 scan  #wlan0是你的设备，scan扫描附近的无线网络
station wlan0 connect (WIFI名字)  #注意此时无法输入中文，只能连接英文wifi
(这一步输入 wifi 密码)
exit
```

测试是否成功联网

```
ping www.baidu.com -c 3
```

![](https://img.makis-life.cn/images/20260109114308585.png)

## （可选）调整字体

```
setfont ter-132n
```

![](https://img.makis-life.cn/images/20260109114308586.png)

> 舒服多了
