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

paru 也是 AUR 助手，但它更“积极一点”，界面更简洁，交互更友好，默认安全策略也更严格一些，比如会更明显地提示你 PKGBUILD 的内容改没改过。

```bash
sudo pacman -S --needed base-devel git
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
cd .. && rm -rf paru
```
