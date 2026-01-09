// ====== 使用说明 ======
// 1. 文章配置在 articles.js 中管理
// 2. 文章正文存储在 articles/ 目录的 .md 文件中
// 3. 添加新文章：
//    a. 在 articles.js 中添加配置
//    b. 在 articles/ 目录创建对应的 .md 文件
// ======================

// Get article ID from URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("id") || "1";

// Get article config from articles.js
const articleConfig = getArticleConfig(articleId);

if (!articleConfig) {
  document.body.innerHTML =
    '<div style="text-align: center; padding: 4rem;"><h1>文章不存在</h1><a href="calendar.html">返回列表</a></div>';
}

// Render article
document.addEventListener("DOMContentLoaded", async () => {
  await loadAndRenderArticle(articleConfig);
  setupScrollEffects();
  setupShareButtons();
  renderNavigation(articleId);
});

async function loadAndRenderArticle(config) {
  // 设置基本信息
  document.title = config.title + " - Pinned Notes";
  document.getElementById("articleTitle").textContent = config.title;
  document.getElementById("articleDate").textContent = formatDate(config.date);
  document.getElementById("bannerImage").src = config.banner;
  document.getElementById("readingTime").textContent = config.readingTime;
  document.getElementById("viewCount").textContent =
    config.viewCount + " 次浏览";
  document.getElementById("articleTags").textContent = config.tags
    .map(getTagName)
    .join(", ");

  // Render tags in banner
  const tagsBanner = document.getElementById("articleTagsBanner");
  tagsBanner.innerHTML = config.tags
    .map((tag) => `<span class="tag-banner">${getTagName(tag)}</span>`)
    .join("");

  // 加载Markdown文件
  try {
    const response = await fetch(config.contentFile);
    if (!response.ok) throw new Error("文章文件不存在");

    const markdownContent = await response.text();

     // Configure marked options
     marked.setOptions({
       breaks: true,
       gfm: true,
     });

     // Render markdown content
     const contentEl = document.getElementById("articleContent");
     contentEl.innerHTML = marked.parse(markdownContent);

     // Highlight code blocks
     contentEl.querySelectorAll("pre code").forEach((block) => {
       hljs.highlightElement(block);
     });

     // Add code copy functionality
     addCodeCopyButtons();
  } catch (error) {
    console.error("加载文章失败:", error);
    document.getElementById("articleContent").innerHTML =
      '<p style="color: red;">文章加载失败，请检查文章文件是否存在。</p>';
  }
}

function renderNavigation(currentId) {
  const adjacent = getAdjacentArticles(currentId);
  const navContainer = document.querySelector(".article-nav");

  navContainer.innerHTML = "";

  if (adjacent.prev) {
    navContainer.innerHTML += `
            <a href="entry.html?id=${adjacent.prev.id}" class="nav-button prev">
              <div>
                <div class="nav-label">← 上一篇</div>
                <div class="nav-title">${adjacent.prev.title}</div>
              </div>
            </a>
          `;
  }

  if (adjacent.next) {
    navContainer.innerHTML += `
            <a href="entry.html?id=${adjacent.next.id}" class="nav-button next">
              <div>
                <div class="nav-label">下一篇 →</div>
                <div class="nav-title">${adjacent.next.title}</div>
              </div>
            </a>
          `;
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getTagName(tag) {
  const tagNames = {
    life: "生活",
    tech: "技术",
    travel: "旅行",
    thoughts: "思考",
  };
  return tagNames[tag] || tag;
}

function setupScrollEffects() {
  const readingProgress = document.getElementById("readingProgress");
  const backToTop = document.getElementById("backToTop");
  const backToTopMobile = document.getElementById("backToTopMobile");

  window.addEventListener("scroll", () => {
    // Reading progress
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage =
      (scrollTop / (documentHeight - windowHeight)) * 100;
    readingProgress.style.width = scrollPercentage + "%";

    // Back to top button (desktop)
    if (scrollTop > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // Desktop back to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile back to top
  backToTopMobile.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function addCodeCopyButtons() {
  document.querySelectorAll(".markdown-content pre").forEach((pre) => {
    if (pre.querySelector(".copy-btn")) return;

    // Add language label if present
    const code = pre.querySelector("code");
    if (code) {
      const classList = code.className.split(' ');
      const langClass = classList.find(cls => cls.startsWith('language-'));
      if (langClass) {
        const lang = langClass.replace('language-', '');
        const label = document.createElement("span");
        label.className = "code-lang-label";
        label.textContent = lang.toUpperCase();
        pre.appendChild(label);
      }
    }

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.style.opacity = "0.5"; // Semi-visible for testing hover

    btn.addEventListener("click", () => {
      const code = pre.querySelector("code").innerText;
      navigator.clipboard.writeText(code);

      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    });

    pre.appendChild(btn);
  });
}

function setupShareButtons() {
  const currentUrl = window.location.href;
  const title = document.getElementById("articleTitle").textContent;

  document.getElementById("shareTwitter").href =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;

  document.getElementById("shareFacebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  document.getElementById("copyLink").addEventListener("click", () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("链接已复制到剪贴板！");
    });
  });
}
