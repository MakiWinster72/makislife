有时候会系统会无法显示中文字体，或者想更换系统默认使用自己喜欢的字体。首先需要安装好字体[installFonts](dotfiles/fonts/installFonts.md)

创建如下文件

```
vim ~/.config/fontconfig/fonts.conf
```

参考以下配置，以下配置为 Mono 字体是 DepartureMono Nerd Fonts,中文字体是 HarmonyOS Sans SC

```conf
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>

  <!-- 默认无衬线字体 -->
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Color Emoji</family>
      <family>HarmonyOS Sans SC</family>
      <family>Noto Sans</family>
    </prefer>
  </alias>

  <!-- 默认衬线字体 -->
  <alias>
    <family>serif</family>
    <prefer>
      <family>Noto Color Emoji</family>
      <family>HarmonyOS Sans SC</family>
      <family>Noto Serif</family>
    </prefer>
  </alias>

  <!-- 默认等宽字体（终端 / 编辑器） -->
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Color Emoji</family>
      <family>CaskaydiaCove Nerd Font Mono</family>
      <family>Noto Sans Mono</family>
    </prefer>
  </alias>

</fontconfig>
```

重启即可应用变更
