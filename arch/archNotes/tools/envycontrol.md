对于从 win 转到 linux 的用户，一个非常非常大的优势就是续航！
笔者从原来的两小时续航

> Win，且只敢轻度办公，一节课就虚得不行了

换到 linux 后，直接来到了 5-6 小时续航，

> 也是轻度办公，obsidian + firefox，但是明显压力少了很多。两节课完全不在话下，再也没有电量焦虑了！

下图为`btop`界面，右上角显示有 5 小时续航，此时 firefox 打开了六个标签页，其中一个甚至在 bilibili 放歌，我正在使用 Obsidian 写文章，还有一个 vitepress 服务在运行。

![](https://img.makis-life.cn/imagesNew/1-envycontrol.png?x-oss-process=style/yasuo)

才 10W！！！win 你就是给我待机都要十几瓦了，动动办公二十来瓦。。。

> 上图是关闭独显的（4060），不过上文提到没有电量焦虑是在开着独显的情况下，因为 envycontrol 我是才知道的工具。显然我关掉独显后，在平时的续航还要多更多！

有些游戏本会有独显，显然，用上 linux 的，除非计算型用户，这就是这篇文章要介绍的工具 --> envycontrol

## Arch 中使用 **envycontrol**（管理核显/独显切换）

① **安装 envycontrol**

```bash
sudo pacman -S envycontrol
```

或 AUR（你有 yay）：

```bash
yay -S envycontrol
```

② **查看当前模式**

```bash
envycontrol --query
```

③ **切换显卡模式**  
envycontrol 主要有三种模式：

- **integrated（核显）**：关闭独显，最省电
- **hybrid（混合）**：默认的 PRIME 混合，独显参与加速
- **nvidia（独显）**：只用独显

切换命令如下：

**切到核显（integrated）**

```bash
sudo envycontrol -s integrated
```

**切到混合模式（hybrid）**

```bash
sudo envycontrol -s hybrid
```

**切到独显（nvidia）**

```bash
sudo envycontrol --s nvidia
```

==切换后必须重启==

```bash
sudo reboot
```
