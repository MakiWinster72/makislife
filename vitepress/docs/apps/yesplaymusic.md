## Arch Linux 安装并运行 YesPlayMusic

## 安装

```
ysy -S yesplaymusic
```

① **安装路径**

- 程序默认安装到：`/opt/YesPlayMusic/`
    
- 可执行文件：`/opt/YesPlayMusic/yesplaymusic`
    

② **直接运行测试**

```bash
/opt/YesPlayMusic/yesplaymusic
```

③ **添加软链接到 PATH**

```bash
sudo ln -s /opt/YesPlayMusic/yesplaymusic /usr/local/bin/yesplaymusic
```

之后终端可直接执行：

```bash
yesplaymusic
```

④ **检查 .desktop 文件**

```bash
cat /usr/share/applications/yesplaymusic.desktop
```

确保 `Exec=` 内容为：

```bash
Exec=/opt/YesPlayMusic/yesplaymusic %U
```

⑤ **若不存在 .desktop 文件，可新建**  
路径：`~/.local/share/applications/yesplaymusic.desktop`

```ini
[Desktop Entry]
Name=YesPlayMusic
Exec=/opt/YesPlayMusic/yesplaymusic %U
Icon=yesplaymusic
Type=Application
Categories=Audio;Music;Player;
```

-  终端可执行
    
-  应用菜单可见
    
-  图标正常显示

## 登录

1.登陆网易云网页版  
[https://music.163.com/](https://music.163.com/)  
**确保登陆成功**  
2.在网易云网页版界面按下你键盘的`F12`按钮，找到 `Network/网络` 界面，不同浏览器不一样，但都一定会有

[![Image](https://private-user-images.githubusercontent.com/157946924/473996941-c29259a0-aa1c-482d-972c-b8340808794d.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDczOTk2OTQxLWMyOTI1OWEwLWFhMWMtNDgyZC05NzJjLWI4MzQwODA4Nzk0ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNTY0YWI3OTA0NjdhNDAwYzMyYjk0NTdhZmZkYWIwN2MxNjY3ZDBiZDE1ZGMzNDRmZDNiNzQ2NTJhYTljMGI4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.dcVBWcMEIUoDe3u7kGKrz22ZEra6r2eqni60RjXdA20)](https://private-user-images.githubusercontent.com/157946924/473996941-c29259a0-aa1c-482d-972c-b8340808794d.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDczOTk2OTQxLWMyOTI1OWEwLWFhMWMtNDgyZC05NzJjLWI4MzQwODA4Nzk0ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNTY0YWI3OTA0NjdhNDAwYzMyYjk0NTdhZmZkYWIwN2MxNjY3ZDBiZDE1ZGMzNDRmZDNiNzQ2NTJhYTljMGI4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.dcVBWcMEIUoDe3u7kGKrz22ZEra6r2eqni60RjXdA20)

3.在网络请求中任选一个`weblog`开头的请求（有些请求是其他域的，cookie不一样），在`标头`中往下拉找到`cookie`

4.复制`标头`中的cookie（有些长，复制`完整`的值）

5.找一个**记事本软件**，把下面这个脚本复制进去，**再将你的cookie替换脚本内第四行的占位符（别把单引号替换了）**

```
(async () => {
    /* ====== 脚本作者Github LuorixDev GPL3 ====== */
    /* ====== 替换为你自己的 Cookie 字符串 ====== */
    const newCookieString = `请替换这里`; // ← 请替换这里！

    /* === 0. 清除现有 Cookie === */
    console.log("🚿 [0] 清空可写 Cookie …");
    const currentCookies = document.cookie.split(";").filter(Boolean);
    if (currentCookies.length === 0) {
        console.log("⚪ 当前无可清除 Cookie。");
    } else {
        for (const kv of currentCookies) {
            const name = kv.split("=")[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            console.log("🗑️ 删除:", name);
        }
        console.log("✅ Cookie 清除完成（HttpOnly Cookie 不可移除）。");
    }

    /* === 1. 写入新 Cookie === */
    console.log("📥 [1] 写入新 Cookie …");
    const maxAgeSeconds = 60*60*24*15; 
    for (const cookie of newCookieString.split(";")) {
        const c = cookie.trim();
        if (!c) continue;

        const [key, ...rest] = c.split("=");
        const value = rest.join("=");
        if (!key || !value) continue;

        const encoded = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
        document.cookie = encoded;
        console.log("🍪 写入持久 Cookie:", encoded);

        // 同步写入 localStorage
        localStorage.setItem(`cookie-${key}`, value);
        console.log(`💾 localStorage 写入: cookie-${key} = ${value}`);
    }
    console.log("✅ 新 Cookie 写入完成。");

    /* === 2. 获取用户信息 === */
    console.log("🌐 [2] 正在请求 /api/user/account …");
    let payload;
    try {
        const res = await fetch("/api/user/account", { credentials: "include" });
        payload = await res.json();
        console.log("📦 返回数据:", payload);
    } catch (e) {
        console.error("❌ 请求失败:", e);
        return;
    }
    if (payload.code !== 200 || !payload.profile) {
        console.error("❌ 响应异常:", payload);
        return;
    }
    const profile = payload.profile;
    console.log(`✅ 获取成功，昵称: ${profile.nickname}`);

    /* === 3. 更新 localStorage.data === */
    console.log("📂 [3] 读取 localStorage.data …");
    let oldData;
    try {
        oldData = JSON.parse(localStorage.getItem("data") || "{}");
        console.log("📄 当前 data:", oldData);
    } catch {
        console.warn("⚠️ 当前 data 解析失败，将重置为空对象。");
        oldData = {};
    }

    const newData = {
        ...oldData,
        user: profile,
        loginMode: "account"
    };

    try {
        localStorage.setItem("data", JSON.stringify(newData));
        console.log("✅ [4] 新 data 写入完成:", newData);
    } catch (e) {
        console.error("❌ localStorage 写入失败:", e);
        return;
    }

    /* === 5. 跳转至首页 === */
    console.log("🏠 正在跳转到首页 …");
    setTimeout(() => {
        location.href = "/"; // 可改为你自己的首页路径
    }, 1000); // 延迟 1 秒跳转
})();
```

6.再次复制修改好后的完整脚本

7.打开你的yesplaymusic

8.点击键盘上的`F12`，同样找到控制台界面，将这个超长脚本复制进去，脚本会自动处理cookie localStorage等信息

[![Image](https://private-user-images.githubusercontent.com/157946924/473767853-ca436540-8e86-4995-80c8-b17d18f43b20.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDczNzY3ODUzLWNhNDM2NTQwLThlODYtNDk5NS04MGM4LWIxN2QxOGY0M2IyMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNjhlNDNmMzFlMTdlOTA0MzgzMmI2ZTZmODk2YmE0ZDcyMDg3MzVmMjM3NGFlNGQwZjljOTRhNTg1YWYyYWRjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.omVUky89D7G46gxAhUQnF88JIeAy1ZYbrrvzk-ihRLM)](https://private-user-images.githubusercontent.com/157946924/473767853-ca436540-8e86-4995-80c8-b17d18f43b20.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDczNzY3ODUzLWNhNDM2NTQwLThlODYtNDk5NS04MGM4LWIxN2QxOGY0M2IyMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNjhlNDNmMzFlMTdlOTA0MzgzMmI2ZTZmODk2YmE0ZDcyMDg3MzVmMjM3NGFlNGQwZjljOTRhNTg1YWYyYWRjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.omVUky89D7G46gxAhUQnF88JIeAy1ZYbrrvzk-ihRLM)

9.1s后自动刷新界面，登陆成功～

[![Image](https://private-user-images.githubusercontent.com/157946924/473767814-60df51b5-292f-4b4c-b6ea-0b9ad1402ac6.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDczNzY3ODE0LTYwZGY1MWI1LTI5MmYtNGI0Yy1iNmVhLTBiOWFkMTQwMmFjNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01ZWYzYTgxMjM2OGFmYzhlNjlmOGYzMzA4N2Y4NmEwOWU2NzJkOTFhY2QwZjIyZTM5OTk0ZjZhYjZiOWRhMDY2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Pqx6PStPcNIG3fg--xD2Ppi__oleI4GOBcnCr8WAFc0)](https://private-user-images.githubusercontent.com/157946924/473767814-60df51b5-292f-4b4c-b6ea-0b9ad1402ac6.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDczNzY3ODE0LTYwZGY1MWI1LTI5MmYtNGI0Yy1iNmVhLTBiOWFkMTQwMmFjNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01ZWYzYTgxMjM2OGFmYzhlNjlmOGYzMzA4N2Y4NmEwOWU2NzJkOTFhY2QwZjIyZTM5OTk0ZjZhYjZiOWRhMDY2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Pqx6PStPcNIG3fg--xD2Ppi__oleI4GOBcnCr8WAFc0)

[![Image](https://private-user-images.githubusercontent.com/157946924/478751001-19ce2335-5120-43a0-aca9-c9556a63e704.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDc4NzUxMDAxLTE5Y2UyMzM1LTUxMjAtNDNhMC1hY2E5LWM5NTU2YTYzZTcwNC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hY2JlODQzMDY3YzMzOTgxMjIzZjBjYWZjNTI2MWZiMDEyMGE0NzJiZDI4ZGQ0YjcwZDNlM2E0MGY4MTM0ZWYyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.UUSA54aSYAj2ctRhL6X1z5yIzf1oI6doJXRBoTxn3h4)](https://private-user-images.githubusercontent.com/157946924/478751001-19ce2335-5120-43a0-aca9-c9556a63e704.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTc3ODA3NjMsIm5iZiI6MTc1Nzc4MDQ2MywicGF0aCI6Ii8xNTc5NDY5MjQvNDc4NzUxMDAxLTE5Y2UyMzM1LTUxMjAtNDNhMC1hY2E5LWM5NTU2YTYzZTcwNC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwOTEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDkxM1QxNjIxMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hY2JlODQzMDY3YzMzOTgxMjIzZjBjYWZjNTI2MWZiMDEyMGE0NzJiZDI4ZGQ0YjcwZDNlM2E0MGY4MTM0ZWYyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.UUSA54aSYAj2ctRhL6X1z5yIzf1oI6doJXRBoTxn3h4)