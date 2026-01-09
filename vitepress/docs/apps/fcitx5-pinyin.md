## Arch 安装 fcitx5

① 安装必要包：

```bash
sudo pacman -S fcitx5 fcitx5-im fcitx5-chinese-addons
```

- **fcitx5** → 输入法框架
    
- **fcitx5-im** → 常见输入法模块（自动拉齐依赖）
    
- **fcitx5-chinese-addons** → 中文输入支持（拼音、双拼等）
    

② 配置环境变量，在 `~/.profile` 或 `~/.bashrc`、`~/.zshrc` 中加入：

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

③ 启动并设置自启：

```bash
fcitx5 &
```

可设置自启：

```bash
systemctl --user enable --now fcitx5
```

④ 打开配置工具(启动后也会看见托盘图标，右键打开`configure`也可以)：

```bash
fcitx5-configtool
```
![](https://img.makis-life.cn/images/20260109114250006.png)
在其中添加 **拼音输入法**（ _Pinyin_ ）。

⑤ 也可以安装主题美化：

```bash
sudo pacman -S fcitx5-material-color
```

在 Global Options中可以设置快捷键
![](https://img.makis-life.cn/images/20260109114250007.png)
这里设置成了 Super + Space，Windows养成的习惯!
