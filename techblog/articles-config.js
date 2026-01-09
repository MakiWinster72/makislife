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
      id: "life",
      title: "📝 生活随笔",
      children: [
        {
          type: "article",
          id: "life-1",
          title: "生活？还是RAG？",
          icon: "📄",
          date: "2025-06-07",
          readingTime: "4 分钟",
          tags: ["生活", "思考", "技术"],
          contentFile: "articles/arch/install.md",
        },
        {
          type: "article",
          id: "life-2",
          title: "系分考试总结",
          icon: "📄",
          date: "2025-05-26",
          readingTime: "12 分钟",
          tags: ["生活", "考试"],
          contentFile: "articles/windows/music.md",
        },
        {
          type: "folder",
          id: "life-2025",
          title: "📁 2025 年",
          children: [
            {
              type: "article",
              id: "life-2025-1",
              title: "新年计划",
              icon: "📄",
              date: "2025-01-01",
              readingTime: "5 分钟",
              tags: ["生活", "计划"],
              contentFile: "articles/life/2025/new-year.md",
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      id: "tech",
      title: "💻 技术笔记",
      children: [
        {
          type: "article",
          id: "tech-1",
          title: "初入 Linux",
          icon: "🐧",
          date: "2025-08-25",
          readingTime: "5 分钟",
          tags: ["Linux", "Ubuntu", "ArchLinux"],
          contentFile: "articles/windows/music.md",
        },
        {
          type: "article",
          id: "tech-2",
          title: "停止花里胡哨的炫技",
          icon: "📄",
          date: "2025-09-17",
          readingTime: "4 分钟",
          tags: ["编程", "思考"],
          contentFile: "articles/tech/coding.md",
        },
        {
          type: "folder",
          id: "frontend",
          title: "📁 前端开发",
          children: [
            {
              type: "article",
              id: "frontend-1",
              title: "React Hooks 最佳实践",
              icon: "⚛️",
              date: "2025-03-15",
              readingTime: "8 分钟",
              tags: ["React", "JavaScript"],
              contentFile: "articles/tech/frontend/react-hooks.md",
            },
            {
              type: "article",
              id: "frontend-2",
              title: "CSS 动画技巧",
              icon: "🎨",
              date: "2025-04-20",
              readingTime: "6 分钟",
              tags: ["CSS", "动画"],
              contentFile: "articles/tech/frontend/css-animation.md",
            },
          ],
        },
        {
          type: "folder",
          id: "backend",
          title: "📁 后端开发",
          children: [
            {
              type: "article",
              id: "backend-1",
              title: "Node.js 性能优化",
              icon: "🟢",
              date: "2025-02-10",
              readingTime: "10 分钟",
              tags: ["Node.js", "性能优化"],
              contentFile: "articles/tech/backend/nodejs.md",
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      id: "thinking",
      title: "💭 思考感悟",
      children: [
        {
          type: "article",
          id: "thinking-1",
          title: "学习的意义",
          icon: "💡",
          date: "2025-09-09",
          readingTime: "8 分钟",
          tags: ["思考", "学习"],
          contentFile: "articles/thinking/learning.md",
        },
        {
          type: "article",
          id: "thinking-2",
          title: "可能我们一辈子只见这一面",
          icon: "🚗",
          date: "2025-09-01",
          readingTime: "8 分钟",
          tags: ["生活", "人生"],
          contentFile: "articles/thinking/taxi.md",
        },
      ],
    },
  ],
};

// 如果你希望添加更多文章，只需要按照上面的格式继续添加即可
// 支持任意深度的文件夹嵌套
// 例如：技术笔记 > 前端开发 > React > Hooks > useState 详解

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
