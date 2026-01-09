首先下载好需要安装的 font 文件，一般以 ttf, otf 等结尾

```bash
# 创建用户字体文件夹
mkdir -p ~/.local/share/fonts
# 移动字体到上述文件夹
mv path/to/fonts*.ttf(或者otf) ~/.local/share/fonts
# 刷新字体缓存
fc-cache -fv
```
