download nvim

```bash
wget https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
```

install nvim

```bash
tar -xvzf nvim-linux-x86_64.tar.gz
mv nvim(tab) /opt/
sudo ln -s /opt/nvim(tab)/bin/nvim /usr/local/bin/nvim

# check
nvim --version
```

## lazyvim

- Make a backup of your current Neovim files:

  ```
  # requiredmv ~/.config/nvim{,.bak}# optional but recommendedmv ~/.local/share/nvim{,.bak}mv ~/.local/state/nvim{,.bak}mv ~/.cache/nvim{,.bak}
  ```

- Clone the starter
  ```
  git clone https://github.com/LazyVim/starter ~/.config/nvim
  ```
- Remove the `.git` folder, so you can add it to your own repo later
  ```
  rm -rf ~/.config/nvim/.git
  ```

Start Neovim!

```
nvim
```

Refer to the comments in the files on how to customize **LazyVim**.
