// ========== 文章配置文件 ==========
// 采用树形结构，支持无限层级嵌套
// type: 'root' | 'folder' | 'article'
// folder 可以包含 children（文件夹或文章）
// article 需要指定 contentFile（markdown 文件路径）

const articlesConfig = {
  type: "root",
  id: "root",
  title: "根目录",
  children: [
    {
      type: "folder",
      id: "tech",
      title: "📁 安装",
      children: [
        {
          type: "article",
          id: "guide-1",
          title: "安装前准备",
          icon: "🐧",
          date: "2026-01-17",
          readingTime: "8 分钟",
          tags: ["env"],
          contentFile: "./archNotes/guides/before-installation.md",
        },
        {
          type: "article",
          id: "guide-2",
          title: "安装",
          icon: "⬇️",
          date: "2026-01-17",
          readingTime: "10 分钟",
          tags: ["installation"],
          contentFile: "./archNotes/guides/installation.md",
        },
      ],
    },
    {
      type: "folder",
      id: "essential",
      title: "📁 必要工具",
      children: [
        {
          type: "article",
          id: "disktool",
          title: "磁盘格式支持",
          icon: "",
          date: "2026-02-01",
          readingTime: "3 分钟",
          tags: ["Tools", "disk"],
          contentFile: "./archNotes/essential/disk.md",
        },
        {
          type: "article",
          id: "driver",
          title: "驱动 driver",
          icon: "",
          date: "2026-02-01",
          readingTime: "5 分钟",
          tags: ["NVIDIA", "AMD", "driver"],
          contentFile: "./archNotes/essential/driver.md",
        },
      ],
    },

    {
      type: "folder",
      id: "tech",
      title: "📁🎮 游戏",
      children: [
        {
          type: "article",
          id: "steam",
          title: "安装 Steam",
          icon: "",
          date: "2026-02-01",
          readingTime: "4 分钟",
          tags: ["steam", "game"],
          contentFile: "./archNotes/game/steam.md",
        },
        {
          type: "article",
          id: "epic",
          title: "Epic",
          icon: "",
          date: "2026-02-01",
          readingTime: "3 分钟",
          tags: ["epic", "game"],
          contentFile: "./archNotes/game/Epic.md",
        },
      ],
    },

    //JUMP:gnome
    {
      type: "folder",
      id: "tech",
      title: "📁 gnome",
      children: [
        {
          type: "article",
          // TODO: 补一下这个图片
          id: "installgnome",
          title: "安装 gnome",
          icon: "",
          date: "2026-01-29",
          readingTime: "3 分钟",
          tags: ["Gnome", "DE"],
          contentFile: "./archNotes/gnome/install.md",
        },
        {
          type: "article",
          id: "theme",
          title: "主题",
          icon: "⬇️",
          date: "2026-01-29",
          readingTime: "2 分钟",
          tags: ["Gnome", "Theme"],
          contentFile: "./archNotes/gnome/theme.md",
        },
      ],
    },

    // JUMP:niri
    {
      type: "folder",
      id: "tech",
      title: "📁 niri",
      children: [
        {
          type: "article",
          id: "runJavaProgram",
          title: "niri中运行java程序",
          icon: "",
          date: "2026-01-30",
          readingTime: "3 分钟",
          tags: ["niri"],
          contentFile: "./archNotes/niri/runJavaProgram.md",
        },
        {
          type: "article",
          id: "xwayland",
          title: "xwayland",
          icon: "",
          date: "2026-01-30",
          readingTime: "2 分钟",
          tags: ["niri"],
          contentFile: "./archNotes/niri/xwayland.md",
        },
      ],
    },

    // JUMP:tools
    {
      type: "folder",
      id: "tools",
      title: "📁 工具",
      children: [
        {
          type: "folder",
          id: "tech",
          title: "📁 IDE",
          children: [
            {
              type: "article",
              id: "IDEA Intellij",
              title: "IDEA Intellij",
              icon: "",
              date: "2026-01-30",
              readingTime: "3 分钟",
              tags: ["IDE"],
              contentFile: "./archNotes/tools/ide/intellij IDEA.md",
            },
            {
              type: "article",
              id: "rustrover",
              title: "rustroverRR",
              icon: "",
              date: "2026-01-30",
              readingTime: "2 分钟",
              tags: ["IDE"],
              contentFile: "./archNotes/tools/ide/rustrover.md",
            },
            {
              type: "article",
              id: "vscode",
              title: "vscode",
              icon: "",
              date: "2026-01-30",
              readingTime: "2 分钟",
              tags: ["IDE"],
              contentFile: "./archNotes/tools/ide/vscode.md",
            },
            {
              type: "article",
              id: "zed",
              title: "zed",
              icon: "",
              date: "2026-01-30",
              readingTime: "2 分钟",
              tags: ["IDE"],
              contentFile: "./archNotes/tools/ide/zed.md",
            },
            {
              type: "article",
              id: "neovim",
              title: "neovim",
              icon: "♥️",
              date: "2026-01-30",
              readingTime: "4 分钟",
              tags: ["IDE"],
              contentFile: "./archNotes/tools/ide/neovim.md",
            },
          ],
        },
        {
          type: "article",
          id: "clash",
          title: "魔法",
          icon: "",
          date: "2026-01-30",
          readingTime: "4 分钟",
          tags: ["Tools", "vpn"],
          contentFile: "./archNotes/tools/clash.md",
        },
        {
          type: "article",
          id: "envycontrol",
          title: "开关显卡",
          icon: "",
          date: "2026-02-01",
          readingTime: "2 分钟",
          tags: ["NVIDIA", "Tools", "GPU"],
          contentFile: "./archNotes/tools/envycontrol.md",
        },
        {
          type: "article",
          id: "imputMethod",
          title: "输入法",
          icon: "⌨",
          date: "2026-01-30",
          readingTime: "3 分钟",
          tags: ["输入法", "Tools"],
          contentFile: "./archNotes/tools/fcitx 5.md",
        },
        {
          type: "article",
          id: "AUR",
          title: "AUR助手",
          icon: "",
          date: "2026-01-30",
          readingTime: "3 分钟",
          tags: ["Arch", "Tools"],
          contentFile: "./archNotes/tools/install_AUR_Assis.md",
        },
        {
          type: "article",
          id: "yesplaymusic",
          title: "网易云",
          icon: "🎵",
          date: "2026-02-01",
          readingTime: "5 分钟",
          tags: ["yesplaymusic", "Music", "Tools"],
          contentFile: "./archNotes/tools/yesplaymusic.md",
        },
        {
          type: "article",
          id: "onlyoffice",
          title: "办公软件",
          icon: "🛠",
          date: "2026-01-30",
          readingTime: "5 分钟",
          tags: ["输入法", "Tools"],
          contentFile: "./archNotes/tools/onlyoffice.md",
        },
        {
          type: "article",
          id: "screencapture",
          title: "截屏",
          icon: "🛠",
          date: "2026-01-30",
          readingTime: "3 分钟",
          tags: ["截屏", "Tools"],
          contentFile: "./archNotes/tools/screenshot.md",
        },
        {
          type: "article",
          id: "vmware",
          title: "虚拟机",
          icon: "🛠",
          date: "2026-01-30",
          readingTime: "8 分钟",
          tags: ["VM", "Tools"],
          contentFile: "./archNotes/tools/vmware.md",
        },
      ],
    },
    {
      type: "article",
      id: "dockerProxy",
      title: "docker代理方案",
      icon: "",
      date: "2026-01-30",
      readingTime: "3 分钟",
      tags: ["docker", "代理"],
      contentFile: "./archNotes/dockerProxy.md",
    },
    {
      type: "article",
      id: "visudo",
      title: "免sudo密码",
      icon: "",
      date: "2026-01-31",
      readingTime: "3 分钟",
      tags: ["arch", "sudo"],
      contentFile: "./archNotes/visudo.md",
    },
    {
      type: "article",
      id: "driver",
      title: "显卡驱动(AMD+NVIDIA)",
      icon: "",
      date: "2026-02-01",
      readingTime: "5 分钟",
      tags: ["AMD", "NVIDIA"],
      contentFile: "./archNotes/essential/driver.md",
    },
  ],
};

/*
完整的文章对象属性说明：
{
  type: 'article',           // 必填：类型为 article
  id: 'unique-id',          // 必填：唯一标识符
  title: '文章标题',         // 必填：文章标题
  icon: '📄',               // 可选：文章图标（emoji）
  date: '2025-01-01',       // 可选：发布日期
  readingTime: '5 分钟',    // 可选：阅读时长
  tags: ['标签1', '标签2'], // 可选：文章标签
  contentFile: 'path.md'    // 必填：markdown 文件路径
}

完整的文件夹对象属性说明：
{
  type: 'folder',           // 必填：类型为 folder
  id: 'unique-id',          // 必填：唯一标识符
  title: '文件夹名称',       // 必填：文件夹标题
  children: []              // 必填：子节点数组（可包含文件夹和文章）
}
*/
