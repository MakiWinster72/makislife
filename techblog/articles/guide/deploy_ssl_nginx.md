# 部署服务器 SSL 访问并配置 Nginx

## 1. **申请域名证书**

在阿里云等证书颁发机构申请域名证书，选择 **DV 单域名** 证书类型。
证书包括：
**私钥**（`.key`）
**证书文件**（`.crt` 或 `.pem`）
**中间证书**（`DigiCertCA.crt`）
下载证书后，将其保存到服务器。

## 2. **上传证书到服务器**

将下载的证书文件上传到服务器指定目录（如：`/etc/nginx/ssl/`）。
使用 `scp` 或其他文件传输工具上传：

```bash
scp domain.key domain.pem DigiCertCA.crt username@server:/etc/nginx/ssl/
```

## 3. **安装 Nginx**

在服务器上安装 Nginx：

```bash
sudo apt update
sudo apt install nginx
```

## 4. **配置 Nginx 实现 SSL**

创建一个新的配置文件来配置域名和 SSL 证书，通常放在 `/etc/nginx/sites-available/` 目录下。

配置示例：

```nginx
server {
listen 80;
# TODO 更改为域名
server_name example.com www.example.com;

# 强制将 HTTP 请求重定向到 HTTPS
return 301 https://$host$request_uri;
}

server {
listen 443 ssl;
# TODO 更改为域名
server_name example.com www.example.com;

# TODO 配置 SSL 证书路径
ssl_certificate /etc/nginx/ssl/example.com.pem;
ssl_certificate_key /etc/nginx/ssl/example.com.key;
ssl_trusted_certificate /etc/nginx/ssl/DigiCertCA.crt;

# SSL 配置（协议和加密套件）
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256';
ssl_prefer_server_ciphers off;

# TODO 网站根目录和索引文件
root /home/maki/website/;
index index.html index.htm;

# 其他配置
location / {
  try_files $uri $uri/ =404;
}
}
```

## 5. **创建符号链接并启用配置**

创建符号链接将新配置启用：

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

如果 `/etc/nginx/sites-enabled/` 目录下已有同名文件，先删除再创建符号链接：

```bash
sudo rm /etc/nginx/sites-enabled/example.com
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

## 6. **检查 Nginx 配置文件是否正确**

执行以下命令检查 Nginx 配置文件是否有语法错误：

```bash
sudo nginx -t
```

## 7. **重新加载 Nginx**

如果配置文件没有错误，重新加载 Nginx 使配置生效：

```bash
sudo systemctl reload nginx
```

## 8. **确保文件和目录权限正确**

确保网站目录 `/home/maki/website/` 和文件对 `www-data` 用户可读：

```bash
sudo chown -R www-data:www-data /home/maki/website/
sudo chmod -R 755 /home/maki/website/
```

## 9. **检查防火墙设置**

确保服务器的防火墙允许 443 端口流量：

```bash
sudo ufw allow 443
sudo ufw allow 80
```

## 10. **测试 SSL 证书**

测试 SSL 是否配置正确，可以使用浏览器访问 `https://example.com`，或者使用 SSL Labs 的工具进行测试：
[SSL Labs SSL Test](https://www.ssllabs.com/ssltest/)

## 11. **查看 Nginx 错误日志**

如果遇到问题，可以通过查看 Nginx 错误日志来调试：

```bash
sudo tail -f /var/log/nginx/error.log
```
