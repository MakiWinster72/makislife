1. **更新系统**：  
    首先，确保你的系统是最新的：
    
    ```bash
    sudo pacman -Syu
    ```
    
2. **安装 OneDrive**：  
    Arch Linux 官方仓库中没有 OneDrive，但你可以通过 AUR（Arch User Repository）安装它。首先安装 `yay[install yay and Paru](tools/install%20yay%20and%20Paru.md)`

    然后，使用 `yay` 安装 OneDrive：
    
    ```bash
    yay -S onedrive
    ```
    
    在安装过程中，`yay` 会自动下载并编译 OneDrive 的 AUR 包。
    
3. **启动 OneDrive**：  
    安装完成后，可以直接通过以下命令启动 OneDrive：
    
    ```bash
    onedrive
    ```
    
    这会启动 OneDrive 客户端并提示你进行身份验证。如果这是第一次运行，系统会提供一个授权链接。
    
4. **授权 OneDrive**：  
    打开浏览器并访问提供的链接，登录你的 Microsoft 账号并授权应用程序访问你的 OneDrive。
    
5. **同步 OneDrive 文件夹**：  
    一旦完成授权，OneDrive 会开始同步文件夹。你可以通过以下命令检查同步状态：
    
    ```bash
    onedrive --status
    ```
    
6. **自动启动 OneDrive（可选）**：  
    如果你希望 OneDrive 每次启动时自动运行，可以将其添加到系统的启动项中。编辑你的 `~/.bashrc` 或 `~/.zshrc` 文件，添加以下行：
    
    ```bash
    onedrive --synchronize --resync &
    ```
    

## 常用命令

- **开始同步**：
    
    ```bash
    onedrive --synchronize
    ```
    
- **停止同步**：
    
    ```bash
    onedrive --shutdown
    ```
    
- **查看同步状态**：
    
    ```bash
    onedrive --status
    ```
    
- **同步特定文件夹**：
    
    ```bash
    onedrive --synchronize --download-only --single-directory "FolderName"
    ```
    