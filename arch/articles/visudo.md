> <font color="#c0504d">自己把控风险</font> > <font color="#c0504d">AT UR OWN RISK</font>

都是自己的电脑，平时也都是自己用，提权每次要输入密码实在是有些麻烦(及时我已经是 4 位数字密码 hhh)，修改 visudo 可以指定用户使用 sudo 时无需密码。

```bash
sudo visudo -f /etc/sudoers.d/00_(你的用户名)
```

然后你会看见

```bash
(用户名) ALL=(ALL) ALL
```

修改为

```bash
(用户名) ALL=(ALL) NOPASSWD: ALL
```

保存并退出后，使用`sudo ls`测试即可
