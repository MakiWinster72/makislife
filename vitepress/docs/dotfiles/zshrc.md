下方是我的 zshrc 文件：

```zsh
# =======================================
#        PYENV 初始化（Python版本管理）
# =======================================
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# =======================================
#        Oh My Zsh 核心配置
# =======================================
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="sammy"
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-history-substring-search
  fzf
)
source $ZSH/oh-my-zsh.sh

# =======================================
#        补全
# =======================================
autoload -Uz compinit && compinit
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'

# =======================================
#        历史记录
# =======================================
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_SPACE
setopt HIST_VERIFY
bindkey '^P' history-substring-search-up
bindkey '^N' history-substring-search-down

# =======================================
#        自动建议与语法高亮
# =======================================
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'

# =======================================
#        文件/文件夹显示增强
# =======================================
if command -v lsd &>/dev/null; then
  alias ls='lsd --group-dirs=first --icons'
  alias ll='lsd -lh --group-dirs=first --icons'
  alias la='lsd -lha --group-dirs=first --icons'
elif command -v exa &>/dev/null; then
  alias ls='exa --icons --group-directories-first'
  alias ll='exa -lh --icons --group-directories-first'
  alias la='exa -lha --icons --group-directories-first'
fi

# =======================================
#        FZF（模糊查找）
# =======================================
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# =======================================
#        常用别名
# =======================================
alias cat='bat --style=plain --paging=never 2>/dev/null || cat'
alias grep='grep --color=auto'

# =======================================
#        Node.js / Cargo / WinApps / zoxide
# =======================================
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
export EDITOR="nvim"
export FREERDP_COMMAND="xfreerdp3"
export WINAPPS_SRC_DIR="$HOME/.local/bin/winapps-src"
export BROSWER="/usr/bin/firefox"

eval "$(zoxide init --cmd cd zsh)"

# =======================================
#        快捷函数
# =======================================
nf() { nvim $(fzf); }
:q() { exit; }

# =======================================
#        加载密钥文件（可选）
# =======================================
[ -f ~/.env_keys ] && source ~/.env_keys

```

## env_keys

另外存放密钥文件安全，这时候如果要把配合之文件村道 github 也不担心会泄漏

```keys
export GEMINI_API_KEY =
export GITHUB_PERSONAL_ACCESS_TOKEN =
...
```

## 安装 zsh 插件

```bash
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# zsh-history-substring-search
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search

# fzf（若未安装）
# sudo pacman -S fzf
# 或手动安装 https://github.com/junegunn/fzf
```

## 切换默认 shell 为 zsh：

```bash
chsh -s $(which zsh)
```

## 重新打开终端或立即加载配置：

```bash
source ~/.zshrc
```
