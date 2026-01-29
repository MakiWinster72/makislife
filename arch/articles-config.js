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
          contentFile: "./articles/guides/before-installation.md",
        },
        {
          type: "article",
          id: "guide-2",
          title: "安装",
          icon: "⬇️",
          date: "2026-01-17",
          readingTime: "10 分钟",
          tags: ["installation"],
          contentFile: "./articles/guides/installation.md",
        },
      ],
    },
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
          contentFile: "./articles/gnome/install.md",
        },
        {
          type: "article",
          id: "theme",
          title: "主题",
          icon: "⬇️",
          date: "2026-01-29",
          readingTime: "2 分钟",
          tags: ["Gnome", "Theme"],
          contentFile: "./articles/gnome/theme.md",
        },
      ],
    },
    {
      type: "folder",
      id: "tools",
      title: "📁 工具",
      children: [
        {
          type: "article",
          id: "clash",
          title: "魔法",
          icon: "",
          date: "2026-01-30",
          readingTime: "4 分钟",
          tags: ["Tools", "vpn"],
          contentFile: "./articles/tools/clash.md",
        },
        {
          type: "article",
          id: "imputMethod",
          title: "输入法",
          icon: "⬇️",
          date: "2026-01-30",
          readingTime: "3 分钟",
          tags: ["输入法", "Tools"],
          contentFile: "./articles/tools/fcitx 5.md",
        },
        {
          type: "article",
          id: "onlyoffice",
          title: "办公软件",
          icon: "🛠",
          date: "2026-01-30",
          readingTime: "5 分钟",
          tags: ["输入法", "Tools"],
          contentFile: "./articles/tools/onlyoffice.md",
        },
        {
          type: "article",
          id: "screencapture",
          title: "截屏",
          icon: "🛠",
          date: "2026-01-30",
          readingTime: "3 分钟",
          tags: ["截屏", "Tools"],
          contentFile: "./articles/tools/screenshot.md",
        },
        {
          type: "article",
          id: "vmware",
          title: "虚拟机",
          icon: "🛠",
          date: "2026-01-30",
          readingTime: "8 分钟",
          tags: ["VM", "Tools"],
          contentFile: "./articles/tools/vmware.md",
        },
      ],
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
