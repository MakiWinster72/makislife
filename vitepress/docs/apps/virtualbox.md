## Install VirtualBox on Arch Linux

尝试了好多遍，VMWare应该是装不了了。

### 1. 安装核心软件包

首先安装 `virtualbox` 包，并根据你的内核版本选择合适的主机模块包：

- 对于 Linux 内核，安装 `virtualbox-host-modules-arch`。
    
- 对于其他内核（包括 `linux-lts`），安装 `virtualbox-host-dkms`。
    

```bash
sudo pacman -S virtualbox
```

### 2. 确定内核版本

使用以下命令查看当前内核版本：

```bash
uname -r
```

这个命令会返回内核版本号，如 `6.6.19-1-MANJARO`。根据内核版本，选择合适的 VirtualBox 主机模块包。

例如，如果内核版本是 `6.6.19-1-MANJARO`，你需要选择 `linux66-virtualbox-host-modules` 选项。

### 3. 选择合适的主机模块包

安装过程中，当系统提示选择一个主机模块包时，选择与你的内核版本匹配的选项。

例子：

```
:: There are 12 providers available for VIRTUALBOX-HOST-MODULES:
:: Repository extra
   1) linux419-virtualbox-host-modules  
   2) linux510-virtualbox-host-modules  
   3) linux515-virtualbox-host-modules  
   4) linux54-virtualbox-host-modules  
   5) linux61-rt-virtualbox-host-modules  
   6) linux61-virtualbox-host-modules  
   7) linux66-rt-virtualbox-host-modules  
   8) linux66-virtualbox-host-modules  
   9) linux67-rt-virtualbox-host-modules  
   10) linux67-virtualbox-host-modules  
   11) linux68-virtualbox-host-modules  
   12) virtualbox-host-dkms
```

你需要选择与内核版本相匹配的选项。例如，如果是 `linux66`，则选择选项 `8`。

### 4. 验证安装

安装完成后，你可以从应用菜单中启动 VirtualBox，或者在终端运行以下命令启动：

```bash
virtualbox
```

### 5. 后续配置

#### 5.1 加载内核模块

VirtualBox 需要某些内核模块加载，使用以下命令确保它们已经加载：

```bash
sudo modprobe vboxdrv
```

如果出现错误，说明 VirtualBox 的内核模块未正确安装或配置。

#### 5.2 将用户添加到 vboxusers 组

为了允许用户访问 VirtualBox 设备，需要将当前用户添加到 `vboxusers` 组：

```bash
sudo usermod -aG vboxusers $USER
```

你可以使用 `echo $USER` 确认用户名。

#### 5.3 启用并启动 VirtualBox 服务（可选）

如果你想通过 Web 界面远程管理 VirtualBox，可以启用 `vboxweb.service` 服务：

```bash
sudo systemctl enable --now vboxweb.service
```

#### 5.4 安装虚拟机附加工具（可选）

如果你计划在虚拟机中运行操作系统，建议安装 VirtualBox Guest Additions。这些附加组件提供更好的主机与客机之间的集成，如共享文件夹、剪贴板共享和无缝鼠标集成。

你可以在客机操作系统中选择 "Insert Guest Additions CD Image" 选项来安装。