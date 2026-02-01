在 niri 中运行 java 程序，可能会出现黑屏的现象，需要在 config.kdl 中设置 environment

![](https://img.makis-life.cn/imagesNew/Pasted%20image%2020260130021542.png?x-oss-process=style/yasuo)

```kdl
  _JAVA_AWT_WM_NONREPARENTING "1"
```
