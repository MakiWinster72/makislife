// ====== 文章配置文件 ======
// 这个文件统一管理所有文章的元数据
// 文章正文内容存储在 articles/ 目录下的独立 Markdown 文件中
// ===========================

const articlesConfig = {
  1: {
    id: 1,
    title: "Reflections on the Rainy Evening",
    date: "2024-11-19",
    excerpt:
      "我的天哪😧The sound of the rain against the window always brings a certain clarity. Today I sat by the window for hours, just watching the droplets race down the glass...",
    tags: ["life", "thoughts"],
    thumbnail: "assets/images/defaultBanner.png",
    banner: "assets/images/defaultBanner.png",
    readingTime: "5 分钟阅读",
    viewCount: "128",
    // 文章内容文件路径
    contentFile: "articles/1.md",
  },
  2: {
    id: 2,
    title: "探索未知的旅程",
    date: "2024-11-18",
    excerpt:
      "每一次旅行都是一次心灵的洗礼。在陌生的城市里漫步,感受不同的文化氛围,品尝当地的美食,遇见有趣的人...",
    tags: ["travel", "life"],
    thumbnail: "assets/images/defaultBanner.png",
    banner: "assets/images/defaultBanner.png",
    readingTime: "8 分钟阅读",
    viewCount: "256",
    contentFile: "articles/2.md",
  },
  3: {
    id: 3,
    title: "技术笔记：前端开发心得",
    date: "2024-11-15",
    excerpt:
      "在前端开发的道路上,我学到了很多宝贵的经验。从最初的HTML、CSS到现在的React、Vue,每一步都是成长...",
    tags: ["tech"],
    thumbnail: "assets/images/defaultBanner.png",
    banner: "assets/images/defaultBanner.png",
    readingTime: "10 分钟阅读",
    viewCount: "512",
    contentFile: "articles/3.md",
  },
  4: {
    id: 4,
    title: "午后的咖啡时光",
    date: "2024-11-12",
    excerpt:
      "阳光透过窗户洒在桌面上,一杯香浓的咖啡,一本喜欢的书,这就是最惬意的午后时光...",
    tags: ["life"],
    thumbnail: "assets/images/defaultBanner.png",
    banner: "assets/images/defaultBanner.png",
    readingTime: "4 分钟阅读",
    viewCount: "189",
    contentFile: "articles/4.md",
  },
  5: {
    id: 5,
    title: "关于创造力的思考",
    date: "2024-11-08",
    excerpt:
      "创造力不是凭空而来的,它需要持续的积累、观察和思考。灵感往往在最意想不到的时刻出现...",
    tags: ["thoughts"],
    thumbnail: "assets/images/defaultBanner.png",
    banner: "assets/images/defaultBanner.png",
    readingTime: "6 分钟阅读",
    viewCount: "342",
    contentFile: "articles/5.md",
  },
  6: {
    id: 6,
    title: "秋天的故事",
    date: "2024-11-05",
    excerpt:
      "落叶纷飞的季节,总是让人感到一丝淡淡的忧伤。但这也是收获的季节,是思考和沉淀的时光...",
    tags: ["life", "thoughts"],
    thumbnail: "assets/images/defaultBanner.png",
    banner: "assets/images/defaultBanner.png",
    readingTime: "7 分钟阅读",
    viewCount: "421",
    contentFile: "articles/6.md",
  },
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
