# 配置文件（Dotfiles）总览

本目录汇集了在 Arch Linux 桌面环境下常用的配置示例，便于在新系统中快速启用常用的 shell、终端与窗口管理配置。内容以中文说明为主，文件与目录使用英文命名以便维护与引用。

目录结构（重要页面）

- `/dotfiles/zshrc` — 推荐的 `~/.zshrc` 配置（Powerlevel10k、常用插件与别名），包含安装与启用步骤。
- `/dotfiles/wezterm` — WezTerm 终端示例配置（字体、快捷键、外观与启动项）。
- `/dotfiles/kitty` — Kitty 终端配置示例（字体、透明度、快捷键映射）。
- `/dotfiles/hyprKeybind` — Hyprland / Niri keybinds 与窗口管理示例（保留历史 Hyprland 配置并注释如何迁移到 Niri）。
- `/dotfiles/change-default-font` — 修改系统/终端默认字体的方法与注意事项。

使用说明（快速上手）

1. 在 `~/.config` 下创建对应目录（若尚不存在）：
   ```bash
   mkdir -p ~/.config/wezterm
   mkdir -p ~/.config/kitty
   ```
2. 将仓库中的配置文件复制或链接到对应位置。例如以 `zshrc` 为例（请先打开并核对内容）：

   ```bash
   # 假设你在仓库根目录
   cp docs/dotfiles/zshrc.md ~/.zshrc   # 注意：请只复制 code block 中的纯 shell 内容
   # 或者更推荐：手动复制 code block 内部内容到你的 ~/.zshrc
   ```

   对于 WezTerm / Kitty 等 GUI 配置文件，请把内容复制到：

   - `~/.config/wezterm/wezterm.lua`
   - `~/.config/kitty/kitty.conf`

3. 安装所需依赖与字体：
   - 常见依赖（Arch 示例）：
     ```bash
     sudo pacman -Syu zsh git neovim fzf lsd bat
     ```
   - 安装 Powerlevel10k、zsh 插件：
     ```bash
     git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
     git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
     git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
     ```
   - 字体：若配置使用 Nerd Font 或中文字体，请确保安装对应字体（AUR 或系统包），并在终端配置中正确指定字体名称。

配置说明模板（建议）

- 每个配置文件的页面都按以下结构组织，便于阅读与复用：
  1. 简介：此配置的用途与适用场景。
  2. 前提条件：必要的软件包与字体。
  3. 配置片段：关键配置与注释（可直接复制）。
  4. 应用步骤：如何放置文件并使其生效（例如 `source ~/.zshrc`、重启终端）。
  5. 故障排查：常见问题与解决方案。
  6. 参考：外部链接与官方文档。

迁移与备份建议

- 在覆盖任何现有配置前，请先备份原文件：
  ```bash
  cp ~/.zshrc ~/.zshrc.backup.$(date +%Y%m%d)
  cp -r ~/.config/wezterm ~/.config/wezterm.backup.$(date +%Y%m%d)
  ```
- 逐步迁移：先在新终端会话中加载配置并验证，再把配置作为默认启动配置。

关于 Hyprland 与 Niri keybinds

- 本仓库中保留了原始的 Hyprland keybinds 作为参考（文件名以 `hypr*` 开头）。
- 若你使用 Niri，某些键位与语法需要手动迁移（dual-monitor、transform、scale 等选项的语法差异）。建议参考 Niri 官方 Wiki 并在 `~/.config/niri/config.kdl` 中进行测试性修改。

贡献与风格约定

- 保持 Markdown 文档简洁：每个配置页优先提供可复制的配置代码块，并在顶部注明「适用范围 / 测试平台 / 最后更新日期」。
- 提交 PR 时请说明测试环境（发行版、版本、终端、字体）。
- 若提交 dotfile，请同时提供最小化版本与完整注释版，便于新手理解。

常见问题（FAQ）

- 我可以直接把仓库中的 Markdown 文件拷贝到 `~/.zshrc` 吗？
  - 不建议直接拷贝整份 Markdown。请复制 code block 内的纯 shell 配置到 `~/.zshrc`，或在本地把该 Markdown 转为纯文本后再使用。
- 字体显示不对或中文乱码怎么办？
  - 确认终端使用的字体包含中文字符或已安装替代中文字体（例如 Noto Sans CJK / Source Han Sans）。检查 locale 是否为 `en_US.UTF-8` 或 `zh_CN.UTF-8`（终端中推荐使用 UTF-8）。
- 插件未生效？
  - 检查插件目录是否存在且路径正确，确认 `source $ZSH/oh-my-zsh.sh` 在 `.zshrc` 中已执行，`zsh-syntax-highlighting` 应放在其他插件之后。

参考与链接

- ArchWiki — Shells / Zsh / Dotfiles（英文）：https://wiki.archlinux.org/
- Powerlevel10k: https://github.com/romkatv/powerlevel10k
- WezTerm docs: https://wezfurlong.org/wezterm/
- Kitty docs: https://sw.kovidgoyal.net/kitty/

如果你希望我继续：

- 我可以把 `docs/dotfiles/zshrc.md` 的纯配置片段提取为单独 `scripts/install-zshrc.sh` 帮助自动部署；
- 或者把 WezTerm / Kitty 的配置示例扩展成带注释的版本并加入截图/演示。

请输入你的优先项（例如 “完善 zshrc 安装脚本”，或 “扩展 WezTerm 配置”），我会继续完成剩余工作并把变更提交到文档中。
