## Arch 安装微信

① 使用 **yay** 安装  

```bash
yay -S wechat-universal-bwrap
````

② 其它选择

- Web 封装版（轻量，功能少）：
    

```bash
yay -S electronic-wechat
```

- Wine 版（运行 Windows 微信）：
    
> 其实我感觉wine并没有说的那么好用，并且多了一个 wine 层，会增加耗电。
```bash
yay -S wine-wechat
```

③ 运行命令

```bash
wechat
```
