// ====== 文章配置文件 ======
// 这个文件统一管理所有文章的元数据
// 文章正文内容存储在 articles/ 目录下的独立 Markdown 文件中
// ===========================

const articlesConfig = {
  1: {
    id: 1,
    title: "📝 生活？还是RAG？",
    date: "2025-06-07",
    excerpt:
      "近期在学习 LLM 的内容，在我 dive in RAG 时有感。用 RAG 比喻生活与人际关系，讲述在信息与时间筛选中，如何保留那些重要但易被忽略的温暖片段。",
    tags: ["life", "thoughts", "tech"],
    thumbnail: "./assets/images/cover/thumbnail/rag.png",
    banner: "./assets/images/cover/rag.png",
    readingTime: "4 分钟阅读",
    viewCount: "128",
    // 文章内容文件路径
    contentFile: "articles/1.md",
  },
  2: {
    id: 2,
    title: "初入 Linux",
    date: "2025-08-25",
    excerpt:
      "把 Ubuntu 和 Arch 装上了 nvme-yao，省电、美化、折腾，Linux 的日常",
    tags: ["life", "tech"],
    thumbnail: "./assets/images/cover/thumbnail/linux.png",
    banner: "./assets/images/cover/linux.png",
    readingTime: "5 分钟阅读",
    viewCount: "256",
    contentFile: "articles/2.md",
  },
  3: {
    id: 3,
    title: "📝 系分考试总结",
    date: "2025-05-26",
    excerpt:
      "软考高级，系统分析师。进考场发现全是大师。简说了这三个月的备考，以及我的思维进化。",
    tags: ["life", "thoughts"],
    thumbnail: "./assets/images/cover/thumbnail/ss.png",
    banner: "./assets/images/cover/ss.png",
    readingTime: "12 分钟阅读",
    viewCount: "512",
    contentFile: "articles/3.md",
  },
  4: {
    id: 4,
    title: "📝 停止花里胡哨的炫技",
    date: "2025-09-17",
    excerpt:
      "看到很多文章推崇“高级技巧”“优雅代码”，但我越来越觉得，这些花哨并不等于高效。本文记录了我对这些技术花招的思考：什么时候真的有用，什么时候只是为了炫技，以及如何写出既可靠又易维护的代码。",
    tags: ["tech", "thoughts"],
    thumbnail: "./assets/images/cover/thumbnail/stopUsingCodingSuger.png",
    banner: "./assets/images/cover/stopUsingCodingSuger.png",
    readingTime: "4 分钟阅读",
    viewCount: "189",
    contentFile: "articles/4.md",
  },
  // 5: {
  //   id: 5,
  //   title: "关于创造力的思考",
  //   date: "2024-11-08",
  //   excerpt:
  //     "创造力不是凭空而来的,它需要持续的积累、观察和思考。灵感往往在最意想不到的时刻出现...",
  //   tags: ["thoughts"],
  //   thumbnail: "assets/images/defaultBanner.png",
  //   banner: "assets/images/defaultBanner.png",
  //   readingTime: "6 分钟阅读",
  //   viewCount: "342",
  //   contentFile: "articles/5.md",
  // },
  // 6: {
  //   id: 6,
  //   title: "秋天的故事",
  //   date: "2024-11-05",
  //   excerpt:
  //     "落叶纷飞的季节,总是让人感到一丝淡淡的忧伤。但这也是收获的季节,是思考和沉淀的时光...",
  //   tags: ["life", "thoughts"],
  //   thumbnail: "assets/images/defaultBanner.png",
  //   banner: "assets/images/defaultBanner.png",
  //   readingTime: "7 分钟阅读",
  //   viewCount: "421",
  //   contentFile: "articles/6.md",
  // },
};

// 获取所有文章列表（用于calendar.html）
function getAllArticles() {
  return Object.values(articlesConfig).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
}

// 获取单篇文章配置（用于entry.html）
function getArticleConfig(id) {
  return articlesConfig[id] || null;
}

// 获取相邻文章（上一篇/下一篇）
function getAdjacentArticles(currentId) {
  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex(
    (article) => article.id == currentId,
  );

  return {
    prev: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
    next:
      currentIndex < allArticles.length - 1
        ? allArticles[currentIndex + 1]
        : null,
  };
}
