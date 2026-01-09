修改下面的代码为适配我发科技博客的静态网站。输出style.css,script.js,index.html,字体默认用hm,代码用code.@font-face {

font-family: "code";

src: url("../fonts/Recursive.woff2") format("woff2");

}

@font-face {

font-family: "hm";

src: url("../fonts/hm-m.woff2") format("woff2");

}

注意要做好响应式设计，完美在手机，电脑上显示。

=======
自动检测文章中的markdown,里面的图片可以这样点击：“
(function () {
  if (document.__photoZoom_v2_initialized) return;
  document.__photoZoom_v2_initialized = true;

  const css = `
.image-zoom-overlay {
  position: fixed; inset: 0; display: flex;
  align-items: center; justify-content: center;
  background: rgba(0,0,0,0); backdrop-filter: blur(0);
  opacity: 0; z-index: 9999; pointer-events: none;
  transition: background 260ms, opacity 260ms, backdrop-filter 260ms;
}
.image-zoom-overlay.show {
  background: rgba(0,0,0,0.25); backdrop-filter: blur(8px);
  opacity: 1; pointer-events: auto;
}
.image-zoom-img {
  max-width: 90vw; max-height: 90vh;
  transform-origin: center; will-change: transform;
  transition: transform 360ms, opacity 260ms;
  opacity: 0; cursor: zoom-out; user-select: none;
}
.image-zoom-img.dragging { transition: none; cursor: grabbing; }
`;
  const s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);

  const overlay = document.createElement("div");
  overlay.className = "image-zoom-overlay";
  overlay.style.touchAction = "none";

  const imgEl = document.createElement("img");
  imgEl.className = "image-zoom-img";
  imgEl.decoding = "async";
  imgEl.loading = "eager";

  overlay.appendChild(imgEl);
  document.body.appendChild(overlay);

  let scale = 1,
    tx = 0,
    ty = 0;
  let down = false,
    id = null,
    startX = 0,
    startY = 0,
    baseX = 0,
    baseY = 0;
  let moved = false;
  const THRESH = 6,
    MIN = 0.2,
    MAX = 5;

  const apply = () =>
    (imgEl.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`);

  const reset = () => {
    scale = 1;
    tx = 0;
    ty = 0;
    imgEl.classList.remove("dragging");
    apply();
  };

  const openViewer = (src) => {
    imgEl.src = src;
    overlay.classList.add("show");
    reset();
    requestAnimationFrame(() => {
      imgEl.style.opacity = "1";
      imgEl.style.transform = `translate(${tx}px,${ty}px) scale(1)`;
    });
  };

  const closeViewer = () => {
    imgEl.style.opacity = "0";
    overlay.classList.remove("show");
    setTimeout(reset, 240);
  };

  const enhanceImages = () => {
    const container =
      document.getElementById("articleContent") ||
      document.querySelector(".markdown-content");
    if (!container) return;
    container.querySelectorAll("img:not([data-zoomed])").forEach((i) => {
      i.dataset.zoomed = "1";
      i.setAttribute("draggable", "false");
      i.style.cursor = "zoom-in";
    });
  };

  new MutationObserver(enhanceImages).observe(
    document.getElementById("articleContent") ||
      document.querySelector(".markdown-content") ||
      document.body,
    { childList: true, subtree: true },
  );
  enhanceImages();

  document.addEventListener(
    "click",
    (e) => {
      if (overlay.classList.contains("show")) {
        if (e.target === overlay || (e.target === imgEl && !moved))
          closeViewer();
        return;
      }
      if (
        e.target instanceof HTMLImageElement &&
        e.pointerType !== "touch" &&
        e.target.style.cursor === "zoom-in"
      ) {
        e.preventDefault();
        openViewer(e.target.currentSrc || e.target.src);
      }
    },
    true,
  );

  imgEl.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    e.preventDefault();
    down = true;
    id = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    baseX = tx;
    baseY = ty;
    moved = false;
    imgEl.classList.add("dragging");
    imgEl.setPointerCapture(id);
  });

  imgEl.addEventListener("pointermove", (e) => {
    if (!down || e.pointerId !== id || e.pointerType === "touch") return;
    const dx = e.clientX - startX,
      dy = e.clientY - startY;
    if (!moved && Math.hypot(dx, dy) > THRESH) moved = true;
    if (moved) {
      tx = baseX + dx;
      ty = baseY + dy;
      apply();
    }
  });

  const end = (e) => {
    if (!down || e.pointerId !== id) return;
    down = false;
    imgEl.releasePointerCapture(id);
    imgEl.classList.remove("dragging");
    if (!moved) closeViewer();
  };
  imgEl.addEventListener("pointerup", end);
  imgEl.addEventListener("pointercancel", end);

  overlay.addEventListener(
    "wheel",
    (e) => {
      if (!overlay.classList.contains("show") || e.ctrlKey) return;
      e.preventDefault();
      const rect = imgEl.getBoundingClientRect();
      const delta = -Math.sign(e.deltaY) * 0.12;
      const ns = Math.min(MAX, Math.max(MIN, scale + delta));
      if (ns !== scale) {
        const ratio = ns / scale;
        tx -= (e.clientX - rect.left - rect.width / 2) * (ratio - 1);
        ty -= (e.clientY - rect.top - rect.height / 2) * (ratio - 1);
        scale = ns;
        apply();
      }
    },
    { passive: false },
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeViewer();
  });
})();
”
让我可以像这样管理文章“
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
    thumbnail: "assets/images/cover/rag.png",
    banner: "assets/images/cover/rag.png",
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
    thumbnail: "assets/images/cover/linux.png",
    banner: "assets/images/cover/linux.png",
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
    thumbnail: "assets/images/cover/ss.png",
    banner: "assets/images/cover/ss.png",
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
    thumbnail: "assets/images/cover/stopUsingCodingSuger.png",
    banner: "assets/images/cover/stopUsingCodingSuger.png",
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
”该网页主要是一个也页面就行，就是一个左侧的侧边栏，有不同的栏目，然后点击后展开有文章（也可能是下一层文件夹）反正我想做多少层都行。然后点击到对应的文章后，会加载md来显示。
以下是我原来的代码，不要过于受原文件影响，因为原文件可能有非常多设计的不合理的地方，有很多冗余，而且原来管理文章的方式也不合理。请阅读修改：
```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Maki's Life</title>
  
  <!-- 字体预加载 -->
  <link rel="preload" href="assets/fonts/DepartureMonoNerdFont-Regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/fusion-pixel-12px-monospaced-zh_hans.ttf.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/HarmonyOS_Sans_SC_Regular.woff2" as="font" type="font/woff2" crossorigin>
  
  <link rel="stylesheet" href="assets/life/style.css">
  <link rel="stylesheet" href="assets/css/markdown.css">
</head>
<body>
  <div class="app panel">
    <header>
      <div class="title">
        <div class="logo">📝</div>
        <div>
          <div style="font-size:14px">Maki's Life</div>
          <div style="font-size:11px;color:var(--text-muted)">生活, 但是目前不是那么美好的生活</div>
        </div>
      </div>

      <div class="controls">
        <button class="theme-toggle" id="themeToggle" title="切换主题 (Toggle Theme)">🌓</button>
        <a href="https://github.com/MakiWinster72" class="btn" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </header>

    <div class="pixel-sep" aria-hidden="true"></div>

    <main class="stage">

      <!-- 文章列表 -->
      <div class="content-section active" id="articles">
        <div class="article-list">
          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-09-09</span>
              <span>📖 8分钟阅读</span>
              <span>👀 41 次浏览</span>
            </div>
            <h2 class="article-title">学习学习学习，到底为了什么呢？</h2>
            <div class="article-excerpt">
              系统分析师成绩；两个月，思考“学来为何”。
            </div>
            <div class="article-tags">
              <span class="tag">Life</span>
              <span class="tag">Thinking</span>
            </div>
            <a href="life/2025/09/2025-09-09.html" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>

          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-09-01</span>
              <span>📖 8分钟阅读</span>
              <span>👀 32 次浏览</span>
            </div>
            <h2 class="article-title">可能我们一辈子只见这一面，谈谈心吧</h2>
            <div class="article-excerpt">
              凌晨打车，和司机聊了很多，算是看到了我自己选择的路到三十多岁的样子。和他相隔十来年，进行了一场对人生思考的思想碰撞。
            </div>
            <div class="article-tags">
              <span class="tag">Life</span>
            </div>
            <a href="life/2025/09/2025-09-01.html" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>

          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-08-25</span>
              <span>📖 5分钟阅读</span>
              <span>👀 27 次浏览</span>
            </div>
            <h2 class="article-title">Linux使用感想</h2>
            <div class="article-excerpt">
              颓废于宿舍，厌学。忽有想法，从Windows更换到Ubuntu, 至今两个月，更换至ArchLinux。
            </div>
            <div class="article-tags">
              <span class="tag">Linux</span>
              <span class="tag">Ubuntu</span>
              <span class="tag">ArchLinux</span>
            </div>
            <a href="life/2025/08/2025-08-25.html" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>

          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-08-28</span>
              <span>📖 3分钟阅读</span>
              <span>👀 0 次浏览</span>
            </div>
            <h2 class="article-title">尝试成为一个不一样的人</h2>
            <div class="article-excerpt">
              尝试改变自己。留长发、股票、加密货币、up主、独自旅行、记录...躺平。不用努力，不用负责。平静知足。
            </div>
            <div class="article-tags">
              <span class="tag">Life</span>
            </div>
            <a href="#" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>

          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-06-17</span>
              <span>📖 4分钟阅读</span>
              <span>👀 58 次浏览</span>
            </div>
            <h2 class="article-title">生活成了一场 RAG</h2>
            <div class="article-excerpt">
              我们在给人和事打标签、做筛选；别把重要的温度也“压缩”掉。
            </div>
            <div class="article-tags">
              <span class="tag">Life</span>
            </div>
            <a href="life/2025/06/2025-06-17.html" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>

          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-06-07</span>
              <span>📖 6分钟阅读</span>
              <span>👀 92 次浏览</span>
            </div>
            <h2 class="article-title">停止花里胡哨的炫技</h2>
            <div class="article-excerpt">
              代码的价值在可读与可维护，别用“高级技巧”制造不必要复杂。
            </div>
            <div class="article-tags">
              <span class="tag">Life</span>
              <span class="tag">Coding</span>
            </div>
            <a href="life/2025/06/2025-06-07.html" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>

          <article class="article-card">
            <div class="article-meta">
              <span>📅 2025-05-26</span>
              <span>📖 7分钟阅读</span>
              <span>👀 102 次浏览</span>
            </div>
            <h2 class="article-title">系分考试总结</h2>
            <div class="article-excerpt">
              三个月从零备考高项：经历坎坷，也收获思维与方法的进化。
            </div>
            <div class="article-tags">
              <span class="tag">Life</span>
              <span class="tag">Exam</span>
            </div>
            <a href="life/2025/05/2025-05-26.html" class="read-more">
              继续阅读 (Read More) →
            </a>
          </article>


        </div>
      </div>

    </main>
  </div>

  <script src="assets/life/script.js"></script>
  
  <!-- Markdown 解析库 -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  
  <script>

  </script>
</body>
</html>

```
```css
    /* ====== 字体 ====== */
    @font-face {
        font-family: 'FusionPixel';
        src: local('FusionPixel'), local('Fusion Pixel'), 
             url('../fonts/fusion-pixel-12px-monospaced-zh_hans.ttf.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    
    @font-face {
        font-family: 'DepartureMono Nerd Font';
        src: url('../fonts/DepartureMonoNerdFont-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    
    @font-face {
        font-family: 'HarmonyOS Sans SC';
        src: url('../fonts/HarmonyOS_Sans_SC_Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    
    @font-face {
        font-family: 'HarmonyOS Sans SC';
        src: url('../fonts/HarmonyOS_Sans_SC_Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }
    
    /* 字体加载优化 */
    .font-loading {
        font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
    }
    
    .font-loaded {
        font-family: 'DepartureMono Nerd Font', 'FusionPixel', 'HarmonyOS Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'Consolas', 'Monaco', 'Courier New', monospace;
    }
  
      /* ====== 明暗主题变量 ====== */
      :root {
        --pixel-size: 2px;
      }
  
      /* 浅色主题 */
      @media (prefers-color-scheme: light) {
        :root {
          --bg: #f0f4f8;
          --bg-gradient: radial-gradient(circle at 10% 10%, #e8f2ff 0%, #f0f4f8 30%), linear-gradient(180deg, #f8fbff 0%, #e8f2ff 100%);
          --panel: #ffffff;
          --panel-gradient: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.04));
          --border: #c5d4e6;
          --border-dark: #9bb3cc;
          --accent: #2563eb;
          --accent-2: #0ea5e9;
          --accent-hover: #1d4ed8;
          --text: #1e293b;
          --text-muted: #64748b;
          --shadow: rgba(0,0,0,0.1);
          --shadow-strong: rgba(0,0,0,0.15);
          --card-bg: #ffffff;
          --card-border: #e2e8f0;
          --card-shadow: rgba(0,0,0,0.08);
        }
      }
  
      /* 深色主题 */
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0c0b10;
          --bg-gradient: radial-gradient(circle at 10% 10%, #081018 0%, #0c0b10 30%), linear-gradient(180deg, #071018 0%, #051018 100%);
          --panel: #111016;
          --panel-gradient: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2));
          --border: #07121a;
          --border-dark: #1b2b33;
          --accent: #d9b36b;
          --accent-2: #7ad1ff;
          --accent-hover: #e6c478;
          --text: #e6eef6;
          --text-muted: #98a0b3;
          --shadow: rgba(0,0,0,0.6);
          --shadow-strong: rgba(0,0,0,0.8);
          --card-bg: #08141b;
          --card-border: #12232b;
          --card-shadow: rgba(0,0,0,0.4);
        }
      }
  
      /* 强制明亮模式 */
      [data-theme="light"] {
        --bg: #f0f4f8;
        --bg-gradient: radial-gradient(circle at 10% 10%, #e8f2ff 0%, #f0f4f8 30%), linear-gradient(180deg, #f8fbff 0%, #e8f2ff 100%);
        --panel: #ffffff;
        --panel-gradient: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.04));
        --border: #c5d4e6;
        --border-dark: #9bb3cc;
        --accent: #2563eb;
        --accent-2: #0ea5e9;
        --accent-hover: #1d4ed8;
        --text: #1e293b;
        --text-muted: #64748b;
        --shadow: rgba(0,0,0,0.1);
        --shadow-strong: rgba(0,0,0,0.15);
        --card-bg: #ffffff;
        --card-border: #e2e8f0;
        --card-shadow: rgba(0,0,0,0.08);
      }
  
      /* 强制暗色模式 */
      [data-theme="dark"] {
        --bg: #0c0b10;
        --bg-gradient: radial-gradient(circle at 10% 10%, #081018 0%, #0c0b10 30%), linear-gradient(180deg, #071018 0%, #051018 100%);
        --panel: #111016;
        --panel-gradient: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2));
        --border: #07121a;
        --border-dark: #1b2b33;
        --accent: #d9b36b;
        --accent-2: #7ad1ff;
        --accent-hover: #e6c478;
        --text: #e6eef6;
        --text-muted: #98a0b3;
        --shadow: rgba(0,0,0,0.6);
        --shadow-strong: rgba(0,0,0,0.8);
        --card-bg: #08141b;
        --card-border: #12232b;
        --card-shadow: rgba(0,0,0,0.4);
      }
  
      html, body { height: 100%; }
      body {
        margin: 0;
        background: var(--bg-gradient);
        font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
        font-size: 12px;
        color: var(--text);
        -webkit-font-smoothing: none;
        image-rendering: pixelated;
        overflow-x: hidden;
        transition: all 0.8s ease;
      }
      
      /* 字体加载完成后的样式 */
      body.font-loaded {
        font-family: 'DepartureMono Nerd Font', 'FusionPixel', 'HarmonyOS Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'Consolas', 'Monaco', 'Courier New', monospace;
      }
  
      /* 容器 */
      .app {
        max-width: 1080px;
        margin: 24px auto;
        padding: 18px;
        position: relative;
        box-sizing: border-box;
      }
  
      /* 像素边框 (RPG界面框) */
      .panel {
        background: var(--panel-gradient);
        border: 4px solid var(--border);
        box-shadow: 8px 8px 0 var(--shadow);
        padding: 12px;
        border-radius: 6px;
        filter: contrast(1.05) saturate(1.05);
        transition: all 0.8s ease;
      }
  
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }
  
      .title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        letter-spacing: 1px;
      }
  
      .title .logo {
        width: 44px;
        height: 44px;
        background: var(--accent);
        color: var(--panel);
        border: 2px solid var(--border-dark);
        display: grid;
        place-items: center;
        font-size: 14px;
        border-radius: 6px;
        box-shadow: 4px 4px 0 var(--shadow);
        font-weight: bold;
      }
  
      /* 右上角控制按钮 */
      .controls {
        position: relative;
        display: flex;
        gap: 8px;
        align-items: center;
      }
  
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        cursor: pointer;
        background: var(--card-bg);
        border: 2px solid var(--card-border);
        border-radius: 6px;
        font-size: 12px;
        user-select: none;
        box-shadow: 4px 4px 0 var(--shadow);
        color: var(--text);
        text-decoration: none;
        transition: all 0.6s ease;
      }
  
      .btn:hover {
        transform: translateY(-2px);
        background: var(--accent);
        color: var(--panel);
        border-color: var(--accent-hover);
      }
  
      .btn svg {
        width: 18px;
        height: 18px;
        image-rendering: pixelated;
      }
  
      /* 主题切换按钮 */
      .theme-toggle {
        background: none;
        border: 2px solid var(--card-border);
        padding: 6px;
        border-radius: 4px;
        cursor: pointer;
        color: var(--text);
        font-size: 16px;
        transition: all 0.2s ease;
        position: relative;
        z-index: 10;
        pointer-events: auto;
      }
      
      .theme-toggle:hover {
        border-color: var(--accent);
        transform: scale(1.1);
      }
  
      /* 中央内容 */
      .stage {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 18px;
      }
  
      /* 文章列表 */
      .article-list {
        display: grid;
        gap: 16px;
      }
  
      .article-card {
        background: var(--card-bg);
        padding: 16px;
        border-radius: 6px;
        border: 2px solid var(--card-border);
        box-shadow: 4px 4px 0 var(--card-shadow);
        transition: all 0.8s ease;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        display: block;
      }
  
      .article-card:hover {
        transform: translateY(-4px);
        box-shadow: 6px 6px 0 var(--card-shadow);
        border-color: var(--accent);
      }
  
            .article-meta {
        font-size: 0.875rem; /* 14px on desktop */
        color: var(--text-muted);
        margin-bottom: 8px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .article-title {
        font-size: 1.25rem; /* 20px on desktop */
        font-weight: bold;
        margin-bottom: 8px;
        color: var(--accent);
        line-height: 1.3;
      }

      .article-excerpt {
        color: var(--text-muted);
        line-height: 1.6;
        font-size: 0.9375rem; /* 15px on desktop */
        margin-bottom: 12px;
      }
  
      .article-tags {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
  
            .tag {
        background: var(--accent);
        color: var(--panel);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 0.75rem; /* 12px on desktop */
        font-weight: bold;
      }

      .read-more {
        color: var(--accent-2);
        font-size: 0.875rem; /* 14px on desktop */
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
      }
  
      .read-more:hover {
        color: var(--accent);
      }

      /* 随记区域 */
      .notes-section {
        margin-top: 24px;
        border-top: 2px solid var(--card-border);
        padding-top: 20px;
      }

      .notes-title {
        font-size: 1.125rem;
        color: var(--accent);
        margin-bottom: 16px;
        text-align: center;
        font-weight: bold;
      }

      .notes-list {
        display: grid;
        gap: 12px;
      }

      .note-item {
        background: var(--card-bg);
        border: 2px solid var(--card-border);
        border-radius: 6px;
        padding: 12px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .note-item::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: var(--accent);
        opacity: 0.6;
      }

      .note-item:hover {
        border-color: var(--accent);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px var(--card-shadow);
      }

      .note-meta {
        font-size: 0.75rem;
        color: var(--text-muted);
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .note-time {
        color: var(--accent-2);
        font-weight: 500;
      }

      .note-content {
        color: var(--text);
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0;
      }

      /* 切换标签页 */
      .tab-switcher {
        display: flex;
        justify-content: center;
        gap: 8px;
        border-bottom: 2px solid var(--card-border);
        padding-bottom: 8px;
      }

      .tab-btn {
        background: var(--card-bg);
        border: 2px solid var(--card-border);
        border-radius: 6px;
        padding: 8px 16px;
        cursor: pointer;
        color: var(--text-muted);
        font-size: 0.875rem;
        transition: all 0.3s ease;
        position: relative;
      }

      .tab-btn:hover {
        border-color: var(--accent);
        color: var(--text);
      }

      .tab-btn.active {
        background: var(--accent);
        color: var(--panel);
        border-color: var(--accent);
        box-shadow: 0 2px 8px var(--shadow);
      }

      .tab-btn.active::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--accent);
      }

      /* 内容区域切换 */
      .content-section {
        display: none;
      }

      .content-section.active {
        display: block;
      }
  
      /* 像素化分隔线 */
      .pixel-sep {
        height: 6px;
        background: repeating-linear-gradient(
          90deg,
          var(--border) 0px,
          var(--border) 2px,
          transparent 2px,
          transparent 4px
        );
        border-top: 2px solid var(--card-border);
        margin: 12px 0;
      }
  
            /* 响应式 */
      @media (max-width: 1200px) and (min-width: 901px) {
        /* 桌面端屏幕较小时的调整 */
        .app {
          margin: 24px 32px;
          padding: 18px;
        }
      }
      
      @media (max-width: 900px) {
        .app {
          padding: 12px;
          margin: 12px;
        }
        
        header {
          flex-direction: column;
          gap: 16px;
        }
        
        .controls {
          width: 100%;
          justify-content: center;
        }
        
        /* 平板设备字号调整 */
        .article-meta {
          font-size: 0.8125rem; /* 13px on tablet */
        }
        
        .article-title {
          font-size: 1.125rem; /* 18px on tablet */
        }
        
        .article-excerpt {
          font-size: 0.875rem; /* 14px on tablet */
        }
        
        .tag {
          font-size: 0.6875rem; /* 11px on tablet */
        }
        
        .read-more {
          font-size: 0.8125rem; /* 13px on tablet */
        }
      }

      @media (max-width: 600px) {
        .app {
          padding: 8px;
          margin: 8px;
        }
        
        .btn {
          padding: 6px 8px;
          font-size: 11px;
        }
        
        /* 手机设备字号调整 */
        .article-meta {
          font-size: 0.75rem; /* 12px on mobile */
        }
        
        .article-title {
          font-size: 1rem; /* 16px on mobile */
        }
        
        .article-excerpt {
          font-size: 0.8125rem; /* 13px on mobile */
        }
        
        .tag {
          font-size: 0.625rem; /* 10px on mobile */
        }
        
        .read-more {
          font-size: 0.75rem; /* 12px on mobile */
        }
      }
  
      /* 加载动画 */
      .article-card {
        animation: fadeInUp 0.6s ease-out;
      }
  
      .article-card:nth-child(2) { animation-delay: 0.1s; }
      .article-card:nth-child(3) { animation-delay: 0.2s; }
      .article-card:nth-child(4) { animation-delay: 0.3s; }
  
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

```
```css
MarkdownStyle
      /* Markdown Content Styles */
      .markdown-content {
        font-family: "Lora", serif;
        font-size: 1.125rem;
        line-height: 1.8;
        color: hsl(var(--foreground));
      }

      .markdown-content h1,
      .markdown-content h2,
      .markdown-content h3,
      .markdown-content h4,
      .markdown-content h5,
      .markdown-content h6 {
        font-family: "hm", cursive;
        font-weight: 700;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        line-height: 1.3;
        color: hsl(var(--foreground));
      }

      .markdown-content h1 {
        font-size: 2.5rem;
        border-bottom: 3px solid hsl(var(--primary));
        padding-bottom: 0.5rem;
      }

      .markdown-content h2 {
        font-size: 2rem;
        border-bottom: 2px solid hsl(var(--border));
        padding-bottom: 0.5rem;
      }

      .markdown-content h3 {
        font-size: 1.5rem;
      }

      .markdown-content h4 {
        font-size: 1.25rem;
      }

      .markdown-content p {
        margin-bottom: 1.5rem;
      }

      .markdown-content a {
        color: hsl(var(--primary));
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 3px;
        transition: all 0.3s;
      }

      .markdown-content a:hover {
        color: hsl(var(--accent));
        text-decoration-thickness: 3px;
      }

      .markdown-content ul,
      .markdown-content ol {
        margin-bottom: 1.5rem;
        padding-left: 2rem;
      }

      .markdown-content li {
        margin-bottom: 0.5rem;
      }

      .markdown-content blockquote {
        border-left: 4px solid hsl(var(--primary));
        padding-left: 1.5rem;
        margin: 2rem 0;
        font-style: italic;
        color: hsl(var(--muted-foreground));
        background: hsl(var(--card));
        padding: 1.5rem;
        border-radius: calc(var(--radius) - 4px);
      }

      .markdown-content code {
        font-family: "code", monospace;
        font-size: 0.9em;
        background: hsl(var(--card));
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        color: hsl(var(--primary));
      }

      .markdown-content pre {
        background: #282c34;
        padding: 1.5rem;
        border-radius: calc(var(--radius) - 4px);
        overflow-x: auto;
        margin: 2rem 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .markdown-content pre code {
        background: transparent;
        color: #abb2bf;
        padding: 0;
        font-size: 0.95rem;
      }

      .markdown-content mark {
        background-color: hsl(var(--yellow-light));
        color: hsl(var(--yellow-dark));
        padding: 0.1em 0.3em;
        border-radius: 0.2em;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .markdown-content img {
        max-width: 100%;
        height: auto;
        border-radius: var(--radius-2xl);
        margin: 2rem 0;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      }

      .markdown-content hr {
        border: none;
        border-top: 2px solid hsl(var(--border));
        margin: 3rem 0;
      }

      .markdown-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 2rem 0;
      }

      .markdown-content th,
      .markdown-content td {
        border: 1px solid hsl(var(--border));
        padding: 0.75rem;
        text-align: left;
      }

      .markdown-content th {
        background: hsl(var(--card));
        font-weight: 700;
        font-family: "hm", cursive;
      }

```
```js
// 字体加载检测
(function () {
  // 检测字体是否加载完成
  function checkFonts() {
    const testString = "abcdefghijklmnopqrstuvwxyz0123456789";
    const testSize = "72px";
    const testFont = "DepartureMono Nerd Font";

    // 创建测试元素
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = testSize + " " + testFont;
    const testWidth = context.measureText(testString).width;

    // 使用系统字体作为对比
    context.font = testSize + " monospace";
    const systemWidth = context.measureText(testString).width;

    // 如果字体宽度不同，说明自定义字体已加载
    if (Math.abs(testWidth - systemWidth) > 1) {
      document.body.classList.add("font-loaded");
      document.body.classList.remove("font-loading");
    } else {
      // 延迟重试
      setTimeout(checkFonts, 100);
    }
  }

  // 页面加载完成后开始检测字体
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkFonts);
  } else {
    checkFonts();
  }
})();

// 主题切换功能
(function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // 获取保存的主题或使用系统偏好
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  let currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "dark" ? "🌞" : "🌙";
    currentTheme = theme;
  }

  function toggleTheme() {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  // 初始化主题
  setTheme(currentTheme);

  // 绑定切换事件
  themeToggle.addEventListener("click", toggleTheme);

  // 监听系统主题变化
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
})();

// 文章卡片点击事件
document.querySelectorAll(".article-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    // 如果点击的是链接，不处理
    if (e.target.tagName === "A") return;

    // 获取文章标题作为示例
    const title = card.querySelector(".article-title").textContent;

    // 这里可以添加路由逻辑或打开文章页面
    console.log("点击了文章:", title);

    // 示例：可以在这里添加页面跳转
    // window.location.href = '/article/' + encodeURIComponent(title);
  });
});

// 添加键盘快捷键
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + K 切换主题
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    document.getElementById("themeToggle").click();
  }
});

// 平滑滚动效果
document.documentElement.style.scrollBehavior = "smooth";

// 标签页切换功能
(function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const contentSections = document.querySelectorAll(".content-section");

  if (tabBtns.length === 0) return; // 如果没有标签页，直接返回

  function switchTab(tabName) {
    // 移除所有活动状态
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    contentSections.forEach((section) => section.classList.remove("active"));

    // 激活选中的标签页
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeSection = document.getElementById(tabName);

    if (activeBtn && activeSection) {
      activeBtn.classList.add("active");
      activeSection.classList.add("active");
      localStorage.setItem("activeTab", tabName);
    }
  }

  // 绑定点击事件
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab");
      switchTab(tabName);
    });
  });

  // 恢复上次选中的标签页，默认显示文章
  const savedTab = localStorage.getItem("activeTab") || "articles";
  switchTab(savedTab);
})();
// 动态加载随记内容
async function loadNotes() {
  try {
    const response = await fetch("http://127.0.0.1:5500/life/suiji.md");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdownText = await response.text();

    // 配置 marked 解析器
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // 解析 Markdown 内容
    let htmlContent = marked.parse(markdownText);

    // 处理 ==高亮== 语法
    htmlContent = htmlContent.replace(/==([^=]+)==/g, "<mark>$1</mark>");

    // 将解析后的 HTML 插入到随记区域
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = `
          <div class="suiji-container">
            <div class="markdown-content">
              ${htmlContent}
            </div>
          </div>
        `;
  } catch (error) {
    console.error("加载随记失败:", error);
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = `
          <div class="note-item">
            <div class="note-content">
              <p>加载随记失败: ${error.message}</p>
              <p>请确保服务器正在运行在 127.0.0.1:5500</p>
            </div>
          </div>
        `;
  }
}

// 页面加载完成后加载随记
document.addEventListener("DOMContentLoaded", function () {
  // 当切换到随记标签页时加载内容
  const notesTab = document.querySelector('[data-tab="notes"]');
  const notesSection = document.getElementById("notes");

  // 监听标签页切换
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (
        this.dataset.tab === "notes" &&
        !notesSection.classList.contains("loaded")
      ) {
        loadNotes();
        notesSection.classList.add("loaded");
      }
    });
  });

  // 如果随记标签页是默认激活的，直接加载
  if (notesTab && notesTab.classList.contains("active")) {
    loadNotes();
    notesSection.classList.add("loaded");
  }
});

```