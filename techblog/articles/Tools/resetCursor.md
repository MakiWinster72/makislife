> 原项目地址：<https://github.com/yuaotian/go-cursor-help>

这是一款用于 **重置 Cursor 本地设备标识** 的工具，适用于 Cursor 2.x.x 版本，支持 Windows / macOS / Linux。使用方式分为 **一键脚本** 和 **手动可执行文件** 两种。

一、使用前准备
确认 Cursor 已关闭。
确认当前 Cursor 版本为 2.x.x。
Windows 需要管理员权限（Administrator）。

二、一键脚本用法（推荐）

macOS
在终端（Terminal）执行：

```bash
curl -fsSL https://raw.githubusercontent.com/yuaotian/go-cursor-help/refs/heads/master/scripts/run/cursor_mac_id_modifier.sh -o ./cursor_mac_id_modifier.sh && sudo bash ./cursor_mac_id_modifier.sh && rm ./cursor_mac_id_modifier.sh
```

Linux
在终端执行：

```bash
curl -fsSL https://raw.githubusercontent.com/yuaotian/go-cursor-help/refs/heads/master/scripts/run/cursor_linux_id_modifier.sh | sudo bash
```

Windows
以管理员身份打开 PowerShell（Run as administrator），执行：

```powershell
irm https://raw.githubusercontent.com/yuaotian/go-cursor-help/refs/heads/master/scripts/run/cursor_win_id_modifier.ps1 | iex
```

国内网络（推荐）
把上述链接中的 `raw.githubusercontent.com` 换成 `wget.la/https://raw.githubusercontent.com`，命令结构不变。

三、脚本做了什么
修改 Cursor 的 `storage.json` 配置文件，路径如下：
Windows：
`%APPDATA%\Cursor\User\globalStorage\storage.json`

macOS：
`~/Library/Application Support/Cursor/User/globalStorage/storage.json`

Linux：
`~/.config/Cursor/User/globalStorage/storage.json`

会重新生成以下字段：

- telemetry.machineId
- telemetry.macMachineId
- telemetry.devDeviceId
- telemetry.sqmId

Windows 额外修改：

- 注册表 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography\MachineGuid`
  修改前会自动备份，备份目录在：
  `%APPDATA%\Cursor\User\globalStorage\backups`

四、使用完成后
重新启动 Cursor。
若未生效，确认：

- Cursor 是否自动更新
- 是否多设备同时登录
- Windows 是否未以管理员权限运行脚本
