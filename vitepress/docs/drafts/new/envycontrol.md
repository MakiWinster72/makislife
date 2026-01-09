- EnvyControl 是一个用于在 Linux 笔记本（尤其是带 Intel / AMD 核显 + NVIDIA 独显的 Optimus 架构）上切换显卡模式的小工具。
- 支持三种模式：
  - `integrated` — 只用集显（关闭独显）
  - `hybrid` — 混合模式（集显 + NVIDIA Prime offload）
  - `nvidia` — 只用 NVIDIA 独显（Xorg）
- 切换后需要重启系统才能生效。

---

### 2. 安装（Arch）

```bash
# 使用 AUR helper (例如 yay)
yay -S envycontrol
```

AUR 上有 `envycontrol` 包。 ([AUR](https://aur.archlinux.org/packages/envycontrol?utm_source=chatgpt.com "AUR (en) - envycontrol"))  
（也可以从 GitHub 克隆或 pip 安装，但用 AUR 更方便） ([GitHub](https://github.com/bayasdev/envycontrol?utm_source=chatgpt.com "GitHub - bayasdev/envycontrol: Easy GPU switching for Nvidia Optimus laptops under Linux"))

---

### 3. 使用命令（切换显卡模式）

```bash
sudo envycontrol -s integrated   # 切换到集显（关闭独显）
sudo envycontrol -s hybrid       # 切换到混合模式
sudo envycontrol -s nvidia       # 切换到只用独显（NVIDIA）
```

- 查询当前模式：
  ```bash
  envycontrol --query
  ```
- 如果你用的是 SDDM（显示管理器 / 显示管理服务），可以指定 DM：
  ```bash
  sudo envycontrol -s nvidia --dm sddm
  ```
- 如果想还原 EnvyControl 对 SDDM 的改动（恢复原来的配置）：
  ```bash
  sudo envycontrol --reset_sddm
  ```

---

### 4. 注意事项 /风控

- 切换到 `integrated`（只用核显）后，如果你登录界面 /图形界面出问题（黑屏等），可能是模式不兼容或配置问题。 > 有人反馈切换后黑屏。 ([Reddit](https://www.reddit.com/r/archlinux/comments/1eo3hx6?utm_source=chatgpt.com 'Black screen after going into "integrated" mode on EnvyControl'))
- EnvyControl 是一种轻量切换方案，不像某些工具需要后台守护进程。 ([ArchWiki](https://wiki.archlinux.org.cn/title/NVIDIA_Optimus?utm_source=chatgpt.com "NVIDIA Optimus - ArchWiki - Arch Linux 百科"))
- 确保你的 NVIDIA 驱动、Xorg（如果用 X）等都已正确安装。

---

### 5. 参考链接

- EnvyControl 官方 / GitHub 仓库 ([GitHub](https://github.com/DaVikingMan/EnvyControl?utm_source=chatgpt.com "GitHub - DaVikingMan/EnvyControl: Easy GPU switching for Nvidia Optimus laptops under Linux"))
- aishukander 的中文 /繁体指南介绍了安装和切换模式。 ([aishukander](https://aishukander.github.io/posts/EnvyControl/?utm_source=chatgpt.com "EnvyControl | aishukander"))
- Arch Wiki 上关于 NVIDIA Optimus 的说明，其中提到 EnvyControl 作为一种切换方案。 ([ArchWiki](https://wiki.archlinux.org.cn/title/NVIDIA_Optimus?utm_source=chatgpt.com "NVIDIA Optimus - ArchWiki - Arch Linux 百科"))
