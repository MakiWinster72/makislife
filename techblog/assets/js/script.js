// ========== 主题切换 ==========
(function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
})();

// ========== 侧边栏切换 ==========
(function initSidebar() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem(
      "sidebarCollapsed",
      sidebar.classList.contains("collapsed"),
    );
  });

  // 恢复侧边栏状态（仅在桌面端）
  if (window.innerWidth > 768) {
    const wasCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    if (wasCollapsed) {
      sidebar.classList.add("collapsed");
    }
  }

  // 移动端默认收起侧边栏
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed");
  }
})();

// ========== TOC 管理辅助函数 ==========
function hideTOC() {
  const tocSidebar = document.getElementById("tocSidebar");
  const tocToggleBtn = document.getElementById("tocToggleBtn");
  if (tocSidebar) {
    tocSidebar.classList.add("hidden");
  }
  if (tocToggleBtn) {
    tocToggleBtn.style.display = "none";
  }
}

// ========== 文章树形结构管理 ==========
class ArticleTree {
  constructor(config) {
    this.config = config;
    this.currentArticle = null;
    this.allArticles = [];
    this.flattenArticles();
  }

  // 将树形结构扁平化，便于导航
  flattenArticles(node = this.config, result = []) {
    if (node.type === "article") {
      result.push(node);
    }
    if (node.children) {
      node.children.forEach((child) => this.flattenArticles(child, result));
    }
    return result;
  }

  // 渲染树形结构
  render(container) {
    container.innerHTML = "";
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    this.renderNode(this.config, ul, 0);
    container.appendChild(ul);

    // 更新统计数据
    const totalArticles = this.allArticles.length;
    const totalCategories = this.countFolders(this.config);
    document.getElementById("totalArticles").textContent = totalArticles;
    document.getElementById("totalCategories").textContent = totalCategories;
  }

  countFolders(node) {
    let count = node.type === "folder" ? 1 : 0;
    if (node.children) {
      node.children.forEach((child) => {
        count += this.countFolders(child);
      });
    }
    return count;
  }

  renderNode(node, container, level) {
    if (node.type === "root") {
      // 根节点，只渲染子节点
      node.children.forEach((child) =>
        this.renderNode(child, container, level),
      );
      return;
    }

    const li = document.createElement("li");
    li.className = "tree-item";

    const nodeDiv = document.createElement("div");
    nodeDiv.className = "tree-node";
    nodeDiv.dataset.id = node.id;
    nodeDiv.dataset.type = node.type;

    // 缩进
    const indent = document.createElement("span");
    indent.className = "tree-indent";
    indent.style.width = `${level * 20}px`;
    nodeDiv.appendChild(indent);

    // 图标
    const icon = document.createElement("span");
    icon.className = "tree-icon";
    if (node.type === "folder") {
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      `;
    } else {
      icon.textContent = node.icon || "📄";
    }
    nodeDiv.appendChild(icon);

    // 标签
    const label = document.createElement("span");
    label.className = "tree-label";
    label.textContent = node.title;
    nodeDiv.appendChild(label);

    li.appendChild(nodeDiv);

    // 子节点容器
    if (node.children && node.children.length > 0) {
      const childrenUl = document.createElement("ul");
      childrenUl.className = "tree-children";
      childrenUl.style.listStyle = "none";
      childrenUl.style.padding = "0";
      node.children.forEach((child) =>
        this.renderNode(child, childrenUl, level + 1),
      );
      li.appendChild(childrenUl);

      // 文件夹点击事件
      nodeDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        const children = li.querySelector(".tree-children");
        const icon = nodeDiv.querySelector(".tree-icon");

        if (children.classList.contains("expanded")) {
          children.classList.remove("expanded");
          icon.classList.remove("expanded");
        } else {
          children.classList.add("expanded");
          icon.classList.add("expanded");
        }
      });
    } else if (node.type === "article") {
      // 文章点击事件
      nodeDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        this.loadArticle(node);

        // 移动端点击文章后收起侧边栏
        if (window.innerWidth <= 768) {
          document.getElementById("sidebar").classList.add("collapsed");
        }
      });
    }

    container.appendChild(li);
  }

  // 加载文章
  async loadArticle(article) {
    this.currentArticle = article;

    // 更新活动状态
    document.querySelectorAll(".tree-node").forEach((node) => {
      node.classList.remove("active");
    });
    document.querySelector(`[data-id="${article.id}"]`).classList.add("active");

    // 隐藏欢迎页，显示文章容器
    document.getElementById("welcomeScreen").style.display = "none";
    const articleContainer = document.getElementById("articleContainer");
    articleContainer.classList.remove("hidden");

    // 更新面包屑
    this.updateBreadcrumb(article);

    // 更新文章标题
    document.getElementById("articleTitle").textContent = article.title;

    // 更新元信息
    const metaHtml = [];
    if (article.date) {
      metaHtml.push(`
        <div class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          <span>${article.date}</span>
        </div>
      `);
    }
    if (article.readingTime) {
      metaHtml.push(`
        <div class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span>${article.readingTime}</span>
        </div>
      `);
    }
    if (article.tags && article.tags.length > 0) {
      metaHtml.push(`
        <div class="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <span>${article.tags.join(", ")}</span>
        </div>
      `);
    }
    document.getElementById("articleMeta").innerHTML = metaHtml.join("");

    // 加载文章内容
    try {
      const response = await fetch(article.contentFile);
      if (!response.ok) throw new Error("文章加载失败");
      const markdown = await response.text();

      // 配置 marked
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      let html = marked.parse(markdown);

      // 处理 ==高亮== 语法
      html = html.replace(/==([^=]+)==/g, "<mark>$1</mark>");

      // 为标题添加 ID
      html = html.replace(
        /<h([1-6])>(.*?)<\/h\1>/g,
        (match, level, content) => {
          const id = content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
          return `<h${level} id="${id}">${content}</h${level}>`;
        },
      );

      document.getElementById("articleContent").innerHTML = html;

      // 代码高亮
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });

      // 增强图片
      enhanceImages();

      // 生成目录
      this.generateTOC();

      // 滚动到顶部
      document.querySelector(".content-area").scrollTop = 0;

      // 更新导航按钮
      this.updateNavigation();
     } catch (error) {
       console.error("加载文章失败:", error);
       document.getElementById("articleContent").innerHTML = `
         <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
           <p>😕 抱歉，文章加载失败</p>
           <p style="font-size: 14px; margin-top: 8px;">${error.message}</p>
         </div>
       `;

       // 隐藏TOC，因为文章加载失败
       hideTOC();
     }
  }

  // 更新面包屑导航
  updateBreadcrumb(article) {
    const path = this.getArticlePath(article);
    const breadcrumbHtml = path
      .map((item, index) => {
        if (index === path.length - 1) {
          return `<span class="breadcrumb-item">${item.title}</span>`;
        }
        return `
        <span class="breadcrumb-item">
          ${item.title}
          <span class="breadcrumb-separator">/</span>
        </span>
      `;
      })
      .join("");

    document.getElementById("breadcrumb").innerHTML = breadcrumbHtml;
  }

  // 获取文章路径
  getArticlePath(article, node = this.config, path = []) {
    if (node.id === article.id) {
      return [...path, node];
    }
    if (node.children) {
      for (const child of node.children) {
        const result = this.getArticlePath(article, child, [...path, node]);
        if (result) return result.filter((item) => item.type !== "root");
      }
    }
    return null;
  }

  // 更新上一篇/下一篇导航
  updateNavigation() {
    const currentIndex = this.allArticles.findIndex(
      (a) => a.id === this.currentArticle.id,
    );
    const prevBtn = document.getElementById("prevArticle");
    const nextBtn = document.getElementById("nextArticle");

    if (currentIndex > 0) {
      prevBtn.style.display = "flex";
      prevBtn.onclick = () =>
        this.loadArticle(this.allArticles[currentIndex - 1]);
    } else {
      prevBtn.style.display = "none";
    }

    if (currentIndex < this.allArticles.length - 1) {
      nextBtn.style.display = "flex";
      nextBtn.onclick = () =>
        this.loadArticle(this.allArticles[currentIndex + 1]);
    } else {
      nextBtn.style.display = "none";
    }
  }

  // 生成目录
  generateTOC() {
    const content = document.getElementById("articleContent");
    const tocContent = document.getElementById("tocContent");
    const tocSidebar = document.getElementById("tocSidebar");
    const tocToggleBtn = document.getElementById("tocToggleBtn");

    // 检查是否有文章内容
    if (!content || !content.textContent.trim()) {
      hideTOC();
      return;
    }

    const headings = content.querySelectorAll("h1, h2, h3, h4");

    if (headings.length === 0) {
      hideTOC();
      return;
    }

    tocSidebar.classList.remove("hidden");
    if (tocToggleBtn) {
      tocToggleBtn.style.display = window.innerWidth <= 768 ? "flex" : "none";
    }

    const tocHTML = Array.from(headings)
      .map((heading) => {
        const level = heading.tagName.toLowerCase();
        const text = heading.textContent;
        const id =
          heading.id || text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");

        if (!heading.id) {
          heading.id = id;
        }

        return `<a href="#${id}" class="toc-link toc-${level}">${text}</a>`;
      })
      .join("");

    tocContent.innerHTML = tocHTML;

    // TOC 链接点击处理
    tocContent.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });

          // 更新活动状态
          tocContent
            .querySelectorAll(".toc-link")
            .forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }

        // 移动端关闭 TOC
        if (window.innerWidth <= 1024) {
          tocSidebar.classList.remove("show");
        }
      });
    });

    // 滚动监听，高亮当前标题
    this.setupTOCScrollSpy();
  }

  // TOC 滚动监听
  setupTOCScrollSpy() {
    const contentArea = document.querySelector(".content-area");
    const tocLinks = document.querySelectorAll(".toc-link");
    const headings = document.querySelectorAll(
      ".markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4",
    );

    if (!contentArea || tocLinks.length === 0) return;

    let ticking = false;

    contentArea.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = contentArea.scrollTop + 100;

          let currentHeading = null;
          headings.forEach((heading) => {
            if (heading.offsetTop <= scrollPos) {
              currentHeading = heading;
            }
          });

          if (currentHeading) {
            tocLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${currentHeading.id}`) {
                link.classList.add("active");
              }
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

// ========== 图片缩放功能 ==========
(function initImageZoom() {
  if (document.__photoZoom_v2_initialized) return;
  document.__photoZoom_v2_initialized = true;

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

  window.enhanceImages = () => {
    const container = document.getElementById("articleContent");
    if (!container) return;
    container.querySelectorAll("img:not([data-zoomed])").forEach((i) => {
      i.dataset.zoomed = "1";
      i.setAttribute("draggable", "false");
      i.style.cursor = "zoom-in";
    });
  };

  new MutationObserver(window.enhanceImages).observe(
    document.getElementById("articleContent") || document.body,
    { childList: true, subtree: true },
  );

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

// ========== 初始化应用 ==========
document.addEventListener("DOMContentLoaded", () => {
  // 检查是否有文章配置
  if (typeof articlesConfig === "undefined") {
    console.error("未找到 articlesConfig，请确保已引入 articles-config.js");
    return;
  }

  // 初始化文章树
  const tree = new ArticleTree(articlesConfig);
  tree.render(document.getElementById("fileTree"));

  // 初始化TOC为隐藏状态
  hideTOC();

  // 键盘快捷键
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + B 切换侧边栏
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      document.getElementById("sidebarToggle").click();
    }
    // Ctrl/Cmd + K 切换主题
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      document.getElementById("themeToggle").click();
    }
  });
});

// TOC 切换按钮
document.getElementById("tocToggleBtn")?.addEventListener("click", () => {
  const tocSidebar = document.getElementById("tocSidebar");
  tocSidebar.classList.toggle("show");
});

// 点击遮罩关闭 TOC
document.addEventListener("click", (e) => {
  const tocSidebar = document.getElementById("tocSidebar");
  const tocToggleBtn = document.getElementById("tocToggleBtn");

  if (
    window.innerWidth <= 1200 &&
    !tocSidebar.contains(e.target) &&
    !tocToggleBtn?.contains(e.target) &&
    tocSidebar.classList.contains("show")
  ) {
    tocSidebar.classList.remove("show");
  }
});

// ========== 移动端toolbar滚动隐藏 ==========
(function initMobileToolbar() {
  const toolbar = document.querySelector('.toolbar');
  const contentArea = document.querySelector('.content-area');

  if (!toolbar || !contentArea) return;

  let lastScrollTop = 0;
  let isToolbarHidden = false;

  function toggleToolbar(show) {
    if (show && isToolbarHidden) {
      toolbar.classList.remove('hidden');
      isToolbarHidden = false;
    } else if (!show && !isToolbarHidden) {
      toolbar.classList.add('hidden');
      isToolbarHidden = true;
    }
  }

  contentArea.addEventListener('scroll', () => {
    // 只在移动端生效
    if (window.innerWidth > 768) return;

    const currentScrollTop = contentArea.scrollTop;

    // 向下滚动（用户往下阅读）时隐藏toolbar
    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      toggleToolbar(false);
    }
    // 向上滚动时显示toolbar
    else if (currentScrollTop < lastScrollTop) {
      toggleToolbar(true);
    }

    lastScrollTop = currentScrollTop;
  });

  // 滚动到顶部时确保toolbar可见
  contentArea.addEventListener('scroll', () => {
    if (window.innerWidth <= 768 && contentArea.scrollTop <= 50) {
      toggleToolbar(true);
    }
  });
})();

// ========== 响应式处理 ==========
window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768) {
    // 移动端：确保侧边栏是固定定位
    sidebar.style.position = "fixed";
  } else {
    // 桌面端：恢复正常定位
    sidebar.style.position = "";
  }
});
