6 月 22，躺椅子上不想学了(考古：挂科咯～)，除了看视频就是吃外卖。刷到了 Linux 的视频，想起了我以前一直用 Linux 都是虚拟机，从来没试过在真机上安装 Linux 。按视频操作了一遍，把 Ubuntu 装在了另一个硬盘。Of course, 我把这个硬盘叫做 nvme-yao

自从进军 Linux,时不时都能刷到视频讲 Ubuntu/Arch，“Arch or Ubuntu, whos better？”，“why i choose Arch？”等，加上 hyprland 一开始就是为 Arch 生的，查的有关 hyprland 的问题多半（80%）都是 Arch 论坛。so,我又试了下 Arch，依然是装在 nvme-yao。好在她给我选的是 1TB，也许对很多人来说其实满小的，但对我来说，我有丰沛的云端存储和本地存储管理方案，除了如果要装很多游戏的话，真的完全够了，这硬盘我得用一辈子舍不得！换电脑也得装上，坏了也得留在电脑上哈哈哈。

# 用 Linux 的好处

用上 Arch/Ubuntu 后，深知 Linux 可 DIY 程度很高。

## 省电

装上系统，查看 powertop 后，震惊，居然才 8 ～ 10W，打开了 chrome 的情况下看视频只有 13 ～ 17W。在 Win 的情况下，一节课我的电脑几乎就要歇了，省着点用才能勉强两节课。现在日用续航直接到 5 ～ 6 个小时了。

## 美化

美化嘛，年轻人都爱折腾的事。心情不好，没有闲情慢慢一点点配置和折腾定义各种细节，看到网上有一键的安装，配置了 Hyprland,很好看，而且平铺式窗口深得我心。

<video style="width:100%" controls muted>
    <source src="https://img.makis-life.cn/images/202508271821415.mp4" type="video/mp4">
    您的浏览器不支持 HTML5 视频标签。
</video>
> 2026 考古，这是 Hyprland，只是一个 Desktop Environment...

别说什么实用性，年轻人就是喜欢这种花里胡哨的。折腾点自己喜欢的让自己打开电脑心情好点不好吗，这和人都爱接近高颜值干净的人无差的。
平铺式窗口对我来说就是效率很高。我平时（前一个月）用电脑 80%是`leetcode+ChatGPT+Neovim`,就三个窗口无时无刻都是平铺好的，我要调整大小，切换位置，也都是完全键盘运行。已经不再需要鼠标了现在。

当然了，现在我其实就只看看视频，不努力了。
<img class="responsive-img" src="./assets/images/article/rag/rag1.png" alt="Arch Linux screenshot">
like, of course 我可以安慰自己在学习英语。至少这两个月我英语提升非常多。
尤其口语吧，认识了几个奥地利、德国、丹麦、瑞典的朋友，听得懂、接得上话。

说回美化，高度的可 DIY 化可以让你只要愿意折腾，桌面环境可以变成任意适合自己的样子，提高效率，如果懒也有人家开发的一键安装脚本。这是 win 无法比的，当然稳定性也是比不上 win 的。

## 效率

日常使用其实比 win 差一些，主要差在没有专业的工具，以及稀有的小众工具。也许问题出在我还不熟悉 linux 应用市场，还没收集认识够需要的软件。
对编程工作来说，其实差不多，因为在 win 的情况下如果需要用到什么终端，或者 linux,wsl 可以解决，也是点几下可以呼出来的事情。
唯一好在系统运行效率高了，没有各种乱七八糟的服务，ubuntu 好一些，Arch 更好，有什么需要什么我都清楚。并且他们可以选择各种桌面环境，平铺、窗口化随意切换。

# 切换系统的难点

既然用 Linux 那肯定离不开终端，我没受过系统性的学习，非常依靠网上的教程以及 AI, AI 真的是我们这代人的宝贝，省掉了阅读长篇英文教程以及在中文网的垃圾堆里面淘金的过程，至少 ai 恰是在我高三毕业那一年兴起的，刚好即将拥有自己的电脑，刚好即将“自由”。
==难点就在不认识这是什么、需要什么、会影响什么。==

## 安装

ubuntu 没什么好说的，唯一难点在做启动盘。后续就是傻瓜操作，注意语言不要选中文就好。
Arch 我是凌晨装的，睡不着（其实这两个月都几乎半夜才开始睡），没有桌面环境，只有 tty，可以理解为当前系统就一个终端给你用。注意的是无法调节屏幕亮度，有时候安装有全屏的选项那种，蓝色的背景要把我眼睛戳瞎了。没有任何提示，只能跟着前辈出的教程一步步走，需要自己判断硬盘等本地会随环境不同而不同的名字，要灵活变化。

## 系统引导

dual launch 就是第一个困难，安装系统的时候要保留原有的 win，好在我直接是两个硬盘，把它安装在了 nvme-yao 那，grub 安装在里面的 EFI 分区了。还好 Ubuntu 会自动检测配置引导好 win,不然我都不知道如何回去了。安装 Arch 的时候就比较难了，这时候我的电脑已经存在了两个系统，并且当时我对 grub 以及系统引导的认识几乎为 0（现在也只是皮毛）。

刚开始装的时候，arch 选了 grub2 模式，也选了同一个 EFI 分区，所以 arch 有了自己的 grub。但是我开机启动的是安装 ubuntu 时装的 grub,所以没有了 arch 的选项。shit，慌了，不知道怎么回到 arch 了。还好有 ai，在 ubuntu 那用 sudo os-probe 检测不到 arch，但是通过一轮又一轮的对话，自己写了 40_custom 把 Arch 的 grub 连接到了 ubuntu 的，于是现在变成了：
ubuntu
win
==arch==（选择之后跳转到 arch 的 grub）
😅
导致我每次开机要两次 enter,并且我也不知道怎么修，和 ai 走了很多轮也没修好。如果有大佬看到我的文章，并且知道如何修复，想帮忙的话请联系我=》<makiiiiiiiho@gmail.com>

安装 Arch 的时候是最难绷的，完全没有桌面环境，无法访问 ai 进行复制粘贴。只能对着教程一个个字母敲（我真有毅力）。特别是每次安装 linux，第一步肯定是装好 VPN，毕竟我用的脚本都不咋有知名度，不一定国内镜像站会有资源。写那一串带 token 的 IRL 我真的是吐了。

## 软件、练习

我几乎没怎么习惯原装 ubuntu，不过也就是 gnome 桌面+终端嘛。除了日常习惯图形化的软件，90%的操作都在终端执行,特别是各种配置啊。不懂命令？那就只能靠社区和 AI 了。

在 ubuntu 的时候，分清了 apt,deb,appimage，到 arch 才明白 pacman 和 yay（我读耶诶没问题吧）的爽。
遇到的问题大多都是 hyprland 使用 wayland 渲染，有的软件在 wayland 就是不现实，比如 wezterm,非要

```
-- 禁用 Wayland，强制使用 X11
config.enable_wayland = false
```

才行。
经常输入法也会出问题（真的好羡慕不受输入法限制的英文母语者）

# 为什么留着原系统？

## Windows

这个必留啊，十几年电脑经验都是 win，真有什么急事问题，linux 上不知道怎么解决的话还是要回到 win。而且身边人 95%都是 win，有什么问题需要演示的话方便。
<img class="responsive-img small" src="./assets/images/article/rag/rag2.png" alt="show with win">
电脑上存了些她在的痕迹，换新系统也舍不得，那时候拿到硬盘还和她说要装上新系统天天用这个硬盘！确实是，但不是那时候想的 win 系统哈哈。

有些专业软件比如 ps、pr、ae 都只能靠他，一些小众软件也都是 win 才有。

## Ubuntu

因为不确定 Arch 用起来合不合适所以保留，也很久没启动过了，应该是打算要删了。当时就是因为它存在，我用不了 omarchy, 这个看起来真的很酷。

Windows -> WSL -> Ubuntu -> Arch 以后会是什么呢？

<center>---END---</center>
<script>
.responsive-img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow-color);
}

.responsive-img.small {
max-width: min(100%, 400px);
}

.responsive-img.large {
max-width: 100%;
}
</script>
