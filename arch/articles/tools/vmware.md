# 安装 Vmware workstation

参考教程[视频教程](https://www.youtube.com/watch?v=2u2HoIhlZQ0&pp=2AZ6)

## 环境

确保你开启虚拟化

```bash
lscpu | grep Virtualization
```

安装 AUR 助手
[install_AUR_Assis](../install_AUR_Assis.md)

查看自己是否是 lts Linux

```bash
uname -r
```

安装必要工具

```bash
sudo pacman -S --needed linux-headers
# 如果你是lts
sudo pacman -S --needed linux-lts-headers
```

## 安装

```bash
yay -S vmware-keymaps
yay -S vmware-workstation
```

## 使用

查看 vmware 相关服务

```bash
systemctl list-unit-files | grep vmware
```

开启相关服务

```bash
# vmware网络
sudo systemctl enable --now vmware-networks.service
# vmware usb
sudo systemctl enable --now vmware-usbarbitrator.service
```

开启必须模块

```bash
sudo modprobe vmmon
sudo modprobe vmnet
sudo modprobe vmw_vmci
```

然后你就可以打开 Vmware workstation 了！
