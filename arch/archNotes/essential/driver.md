## AMD

```bash
sudo pacman -S mesa vulkan-radeon
```

## nvidia

### 开启 multilib

```bash
sudo vim /etc/pacman.conf
```

取消注释
![](https://img.makis-life.cn/imagesNew/Pasted%20image%2020260130020701.png?x-oss-process=style/yasuo)
刷新数据库

```bash
sudo pacman -Syyu
```

### 安装

```bash
sudo pacman -S nvidia-open-dkms nvidia-utils lib32-nvidia-utils
```
