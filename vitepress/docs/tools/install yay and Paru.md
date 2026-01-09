# yay

yay 是 Arch 系里的 AUR 助手（AUR helper）。AUR（Arch User Repository）是用户维护的软件仓库，很多官方仓库没有的软件都在这里。

```bash
sudo pacman -S --needed base-devel git
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
cd .. && rm -rf yay
```

# paru

paru 也是 AUR 助手，但它更“积极一点”，界面更简洁，交互更友好，默认安全策略也更严格一些，比如会更明显地提示你 PKGBUILD 的内容改没改过。许多用户会说 paru 更现代化一些。

```bash
sudo pacman -S --needed base-devel git
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
cd .. && rm -rf paru
```

### 常用命令

- 更新系统（包括 AUR 包）
  - `yay -Syu`
  - `paru -Syu`
- 搜索包
  - `yay -Ss <包名>`
  - `paru -Ss <包名>`
- 安装 AUR 包
  - `yay -S <aur-包名>`
  - `paru -S <aur-包名>`
- 删除包及其依赖（不保留无用依赖）
  - `yay -Rns <包名>`
  - `paru -Rns <包名>`
