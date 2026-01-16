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
      title: "📁Windows",
      children: [
        {
          type: "article",
          id: "tech-1",
          title: "本地计算机上的 MySQL80 服务启动后停止",
          icon: "🐧",
          date: "2025-02-23",
          readingTime: "2 分钟",
          tags: ["Mysql", "Windows"],
          contentFile: "./articles/windows/mysql80.md",
        },
      ],
    },
    {
      type: "folder",
      id: "thinking",
      title: "📁 Tools",
      children: [
        {
          type: "article",
          id: "thinking-1",
          title: "重置Cursor",
          icon: "",
          date: "2026-01-10",
          readingTime: "1 分钟",
          tags: ["工具"],
          contentFile: "./articles/tools/resetCursor.md",
        },
        {
          type: "article",
          id: "thinking-2",
          title: "smartInput显示输入法状态",
          icon: "⌨️",
          date: "2024-09-29",
          readingTime: "2 分钟",
          tags: ["工具"],
          contentFile: "./articles/tools/smartInput.md",
        },
      ],
    },
    {
      type: "folder",
      id: "guide",
      title: "💭 方案",
      children: [
        {
          type: "article",
          id: "guide-1",
          title: "部署SSL和Nginx",
          icon: "",
          date: "2025-09-17",
          readingTime: "8 分钟",
          tags: ["教程"],
          contentFile: "./articles/guide/deploy_ssl_nginx.md",
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
