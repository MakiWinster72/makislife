### ① 安装 Zsh

```bash
sudo pacman -S zsh git
```

### ② 设置默认 Shell 为 Zsh

```bash
chsh -s /bin/zsh
```

### ③ 安装 Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### ④ 安装 Powerlevel10k 主题

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### ⑤ 安装插件

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

git clone https://github.com/zsh-users/zsh-history-substring-search \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
```

### ⑥ 安装工具

```bash
yay -S fzf lsd bat
```

---

## 推荐 `.zshrc` 配置

```zsh
# ========= 基础 =========
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  zsh-history-substring-search
)

source $ZSH/oh-my-zsh.sh

# ========= 补全 =========
autoload -Uz compinit && compinit
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'

# ========= 历史记录 =========
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_SPACE
setopt HIST_VERIFY

bindkey '^P' history-substring-search-up
bindkey '^N' history-substring-search-down

# ========= 自动建议 =========
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'

# ========= Powerlevel10k =========
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# ========= FZF =========
[ -f /usr/share/fzf/key-bindings.zsh ] && source /usr/share/fzf/key-bindings.zsh
[ -f /usr/share/fzf/completion.zsh ] && source /usr/share/fzf/completion.zsh

# ========= 文件与图标 =========
if command -v lsd &>/dev/null; then
  alias ls='lsd --group-dirs=first --icons'
  alias ll='lsd -lh --group-dirs=first --icons'
  alias la='lsd -lha --group-dirs=first --icons'
elif command -v exa &>/dev/null; then
  alias ls='exa --icons --group-directories-first'
  alias ll='exa -lh --icons --group-directories-first'
  alias la='exa -lha --icons --group-directories-first'
fi

alias cat='bat --style=plain --paging=never 2>/dev/null || cat'
alias grep='grep --color=auto'
alias cls='clear'
```