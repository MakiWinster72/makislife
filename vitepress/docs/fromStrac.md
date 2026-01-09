## 联网

> arch 现在必须联网安装

有线网络（一般都配有 DHCP）可直接使用

```bash
ping www.baidu.com  # 测试是否正常联网
```

使用 iwctl 进行无线联网

> 注意 wifi 名只能是英文和数字的组合。

```bash
iwctl
station list                                                      # 列出可用设备，一般为wlan0
station wlan0 scan                                        # 扫描网络
station wlan0 connect 网络名称                  # 网络名称可以配合tab操作防止输错
(输入密码)                                                      # 如果密码成功不会有任何提示
exit                                                                 # 退出 iwctl
ping www.baidu.com                                    # 测试是否正常联网
```

## 同步时钟

启用并且启动服务

```bash
sudo systemctl enable --now systemd-timesyncd
```

启用 NTP

```bash
sudo timedatectl set-ntp true
```

设置时区

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

## 运行 Archinstall
