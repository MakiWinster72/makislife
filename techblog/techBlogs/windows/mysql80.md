## 问题描述

在启动 MySQL 8.0 服务时报错：

> 本地计算机上的 MySQL80 服务启动后停止。

进一步检查发现：

- `MySQL Server 8.0` 安装目录下没有 `data` 文件夹
- 也没有 `my.ini` 配置文件
- `_data source explorer_` 中没有显示 mysql 8.0 的服务项

## 解决步骤

① **确认安装路径**

在任务栏搜索「MySQL Server 8.0」，右键点击 → 选择「打开文件所在的位置（Open file location）」

找到真实的安装目录，例如：

```powershell
C:\Program Files\MySQL\MySQL Server 8.0\
```

② **以管理员身份打开命令提示符（cmd）**

使用 Win 键搜索“cmd”，右键点击 → 选择「以管理员身份运行（Run as administrator）」

③ **进入 mysql 的 bin 目录**

bash

```
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

④ **注册服务**

> ⚠️ 如果未以管理员身份运行，会出现注册失败。

⑤ **初始化 MySQL 数据目录**

bash

```
mysqld --initialize-insecure --user=mysql
```

`--initialize-insecure`：不会生成 root 密码，root 用户密码为空。

执行后，系统会自动生成 `data` 文件夹

⑥ **启动 MySQL 服务**

看到 `MySQL 服务启动成功（The MySQL service was started successfully）` 即解决问题 ✅

## 补充说明

如果后续需要添加 `my.ini` 文件，可手动创建于安装目录下，并写入如下基础配置：

ini

```
[mysqld]
basedir="C:/Program Files/MySQL/MySQL Server 8.0/"
datadir="C:/Program Files/MySQL/MySQL Server 8.0/data/"
port=3306
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
```

- 启动失败时可查看 Windows 服务或 `eventvwr.msc` 获取日志
