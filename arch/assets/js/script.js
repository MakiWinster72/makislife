// 优化版 site.js
const $id = (id) => document.getElementById(id);
const $qs = (sel, root = document) => root.querySelector(sel);
const $qsa = (sel, root = document) =>
  Array.from((root || document).querySelectorAll(sel));

const rafThrottle = (fn) => {
  let scheduled = false;
  return (...args) => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fn(...args);
    });
  };
};
const debounce = (fn, wait = 80) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

// 安全 CSS 选择器转义
const escapeSelector = (s) =>
  window.CSS && CSS.escape
    ? CSS.escape(s)
    : s.replace(/(["'\\#.:,\[\]()>+~*^$|=\/])/g, "\\$1");

// ---------- 主题切换 (themeToggle) ----------
(function initTheme() {
  const toggle = $id("themeToggle");
  if (!toggle) return;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved =
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  const setTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };
  setTheme(saved);
  toggle.addEventListener(
    "click",
    () => {
      setTheme(
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark",
      );
    },
    { passive: true },
  );
})();

// ---------- Sidebar (sidebar) ----------
(function initSidebar() {
  const toggle = $id("sidebarToggle");
  const sidebar = $id("sidebar");
  if (!toggle || !sidebar) return;

  const updateLayout = () =>
    document.body.classList.toggle(
      "sidebar-collapsed",
      sidebar.classList.contains("collapsed"),
    );

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateLayout();
    localStorage.setItem(
      "sidebarCollapsed",
      sidebar.classList.contains("collapsed"),
    );
  });

  document.addEventListener(
    "click",
    (e) => {
      if (
        window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target) &&
        !sidebar.classList.contains("collapsed")
      ) {
        sidebar.classList.add("collapsed");
        updateLayout();
      }
    },
    { passive: true },
  );

  if (
    window.innerWidth > 768 &&
    localStorage.getItem("sidebarCollapsed") === "true"
  ) {
    sidebar.classList.add("collapsed");
  }
  if (window.innerWidth <= 768) sidebar.classList.add("collapsed");
  updateLayout();
})();

// ---------- 全局缓存节点 ----------
const GLOBAL = {
  articleContent: null,
  tocContent: null,
  tocSidebar: null,
  tocToggleBtn: null,
  fileTree: null,
  sidebar: null,
};

// ---------- ArticleTree ----------
class ArticleTree {
  constructor(config) {
    this.config = config;
    this.currentArticle = null;
    this.allArticles = this.flattenArticles();
    this._mutationObserver = null;
    this.intersectionObserver = null;
  }

  flattenArticles(node = this.config, result = []) {
    if (!node) return result;
    if (node.type === "article") result.push(node);
    node.children &&
      node.children.forEach((c) => this.flattenArticles(c, result));
    return result;
  }

  render(container) {
    if (!container) return;
    container.innerHTML = "";
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    this._renderNode(this.config, ul, 0);
    container.appendChild(ul);
    $id("totalArticles") &&
      ($id("totalArticles").textContent = this.allArticles.length);
    $id("totalCategories") &&
      ($id("totalCategories").textContent = this.countFolders(this.config));
    // 事件委托：点击文章节点
    container.addEventListener("click", (e) => {
      const node = e.target.closest(".tree-node");
      if (!node) return;
      const type = node.dataset.type;
      const id = node.dataset.id;
      if (type === "folder") {
        const parentLi = node.parentElement;
        const childrenUl = parentLi.querySelector(".tree-children");
        if (childrenUl) {
          childrenUl.classList.toggle("expanded");
          node.querySelector(".tree-icon")?.classList.toggle("expanded");
        }
        return;
      }
      if (type === "article") {
        const article = this.allArticles.find((a) => a.id === id);
        if (article) this.loadArticle(article);
        if (window.innerWidth <= 768)
          $id("sidebar")?.classList.add("collapsed");
      }
    });
  }

  _renderNode(node, container, level) {
    if (!node) return;
    if (node.type === "root") {
      node.children &&
        node.children.forEach((c) => this._renderNode(c, container, level));
      return;
    }
    const li = document.createElement("li");
    li.className = "tree-item";
    const nodeDiv = document.createElement("div");
    nodeDiv.className = "tree-node";
    nodeDiv.dataset.id = node.id;
    nodeDiv.dataset.type = node.type;

    const indent = document.createElement("span");
    indent.className = "tree-indent";
    indent.style.width = `${level * 20}px`;
    nodeDiv.appendChild(indent);

    const icon = document.createElement("span");
    icon.className = "tree-icon";
    if (node.type === "folder") {
      icon.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
    } else icon.textContent = node.icon || "📄";
    nodeDiv.appendChild(icon);

    const label = document.createElement("span");
    label.className = "tree-label";
    label.textContent = node.title;
    nodeDiv.appendChild(label);

    li.appendChild(nodeDiv);

    if (node.children && node.children.length) {
      const childrenUl = document.createElement("ul");
      childrenUl.className = "tree-children";
      childrenUl.style.listStyle = "none";
      childrenUl.style.padding = "0";
      node.children.forEach((c) => this._renderNode(c, childrenUl, level + 1));
      li.appendChild(childrenUl);
    }
    container.appendChild(li);
  }

  countFolders(node) {
    if (!node) return 0;
    let count = node.type === "folder" ? 1 : 0;
    node.children &&
      node.children.forEach((c) => (count += this.countFolders(c)));
    return count;
  }

  async loadArticle(article) {
    if (!article) return;
    this.currentArticle = article;

    // 激活侧边栏项 - 最小化 DOM 操作
    $qsa(".tree-node").forEach((n) => n.classList.remove("active"));
    $qs(`[data-id="${escapeSelector(article.id)}"]`)?.classList.add("active");

    $id("welcomeScreen") && ($id("welcomeScreen").style.display = "none");
    $id("articleContainer") &&
      $id("articleContainer").classList.remove("hidden");

    this.updateBreadcrumb(article);
    $id("articleTitle") && ($id("articleTitle").textContent = article.title);

    const metaHtml = [];
    if (article.date)
      metaHtml.push(
        `<div class="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/></svg><span>${article.date}</span></div>`,
      );
    if (article.readingTime)
      metaHtml.push(
        `<div class="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg><span>${article.readingTime}</span></div>`,
      );
    if (article.tags && article.tags.length)
      metaHtml.push(
        `<div class="meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/></svg><span>${article.tags.join(", ")}</span></div>`,
      );
    $id("articleMeta") && ($id("articleMeta").innerHTML = metaHtml.join(""));

    try {
      const res = await fetch(article.contentFile);
      if (!res.ok) throw new Error("文章加载失败");
      let md = await res.text();

      // marked 解析
      marked.setOptions({ breaks: true, gfm: true });
      let html = marked.parse(md);
      html = html.replace(/==([^=]+)==/g, "<mark>$1</mark>");
      html = html.replace(/<h([1-6])>(.*?)<\/h\1>/g, (m, level, content) => {
        const id = content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
        return `<h${level} id="${id}">${content}</h${level}>`;
      });

      const articleContent = $id("articleContent");
      if (!articleContent) throw new Error("缺少文章容器");
      articleContent.innerHTML = html;

      // 代码高亮、语言标签与复制按钮（一次遍历完成）
      const preBlocks = $qsa("pre", articleContent);
      preBlocks.forEach((pre) => {
        const code = pre.querySelector("code");
        if (code) hljs.highlightElement(code);
        if (!pre.querySelector(".code-lang-label")) {
          const cls = code?.className || "";
          const lc = cls.split(" ").find((c) => c.startsWith("language-"));
          const lang = lc ? lc.replace("language-", "") : "";
          if (lang && lang !== "plain") {
            const lbl = document.createElement("span");
            lbl.className = "code-lang-label";
            lbl.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
            pre.appendChild(lbl);
          }
        }
        if (!pre.querySelector(".copy-btn")) {
          const btn = document.createElement("button");
          btn.className = "copy-btn";
          btn.textContent = "Copy";
          btn.addEventListener("click", async () => {
            const text = pre.querySelector("code")?.innerText || "";
            try {
              await navigator.clipboard.writeText(text);
              btn.textContent = "Copied";
              setTimeout(() => (btn.textContent = "Copy"), 1200);
            } catch (e) {
              btn.textContent = "Copy";
            }
          });
          pre.appendChild(btn);
        }
      });

      // 图片增强 + 构建 TOC（由共享 observer 处理）
      setupSharedObservers(articleContent, this);

      // 滚到顶部
      const contentArea = $qs(".content-area");
      if (contentArea && "scrollTop" in contentArea) contentArea.scrollTop = 0;
      else window.scrollTo({ top: 0 });

      this.updateNavigation();
    } catch (err) {
      console.error("加载文章失败:", err);
      $id("articleContent") &&
        ($id("articleContent").innerHTML =
          `<div style="padding:40px;text-align:center;color:var(--text-secondary);"> <p>😕 抱歉，文章加载失败</p><p style="font-size:14px;margin-top:8px;">${err.message}</p></div>`);
      hideTOC();
    }
  }

  updateBreadcrumb(article) {
    const path = this.getArticlePath(article) || [];
    const html = path
      .map((item, idx) =>
        idx === path.length - 1
          ? `<span class="breadcrumb-item">${item.title}</span>`
          : `<span class="breadcrumb-item">${item.title}<span class="breadcrumb-separator">/</span></span>`,
      )
      .join("");
    $id("breadcrumb") && ($id("breadcrumb").innerHTML = html);
  }

  getArticlePath(article, node = this.config, path = []) {
    if (!node) return null;
    if (node.id === article.id) return [...path, node];
    if (node.children) {
      for (const c of node.children) {
        const res = this.getArticlePath(article, c, [...path, node]);
        if (res) return res.filter((it) => it.type !== "root");
      }
    }
    return null;
  }

  updateNavigation() {
    const idx = this.allArticles.findIndex(
      (a) => a.id === this.currentArticle.id,
    );
    const prev = $id("prevArticle");
    const next = $id("nextArticle");
    if (!prev || !next) return;
    if (idx > 0) {
      prev.style.display = "flex";
      prev.onclick = () => this.loadArticle(this.allArticles[idx - 1]);
    } else prev.style.display = "none";
    if (idx < this.allArticles.length - 1) {
      next.style.display = "flex";
      next.onclick = () => this.loadArticle(this.allArticles[idx + 1]);
    } else next.style.display = "none";
  }

  // 生成 TOC（由 IntersectionObserver 驱动高亮）
  generateTOC() {
    const articleContent = $id("articleContent");
    const tocContent = $id("tocContent");
    const tocSidebar = $id("tocSidebar");
    const tocToggleBtn = $id("tocToggleBtn");
    if (!articleContent || !tocContent) return hideTOC();
    if (!articleContent.textContent.trim()) return hideTOC();

    const headings = $qsa("h1,h2,h3,h4", articleContent);
    if (!headings.length) return hideTOC();

    tocSidebar && tocSidebar.classList.remove("hidden");
    if (tocToggleBtn) tocToggleBtn.style.display = "flex";

    const html = headings
      .map((h) => {
        const level = h.tagName.toLowerCase();
        const text = h.textContent;
        const id =
          h.id || text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
        if (!h.id) h.id = id;
        return `<a href="#${id}" class="toc-link toc-${level}">${text}</a>`;
      })
      .join("");
    tocContent.innerHTML = html;

    // 事件委托处理点击
    tocContent.onclick = (e) => {
      const link = e.target.closest(".toc-link");
      if (!link) return;
      e.preventDefault();
      const id = (link.getAttribute("href") || "").slice(1);
      const target = $id(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (window.innerWidth <= 1024)
        $id("tocSidebar")?.classList.remove("show");
    };

    // IntersectionObserver 用于高亮
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    const tocLinks = {};
    $qsa(".toc-link", tocContent).forEach(
      (l) => (tocLinks[l.getAttribute("href").slice(1)] = l),
    );

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        // 找到最先进入视口且占比最大的标题来高亮
        let visible = [];
        entries.forEach((en) => {
          if (en.isIntersecting)
            visible.push({
              id: en.target.id,
              ratio: en.intersectionRatio,
              y: en.boundingClientRect.top,
            });
        });
        if (!visible.length) return;
        // 按 ratio 然后按 y 排序
        visible.sort((a, b) => b.ratio - a.ratio || a.y - b.y);
        const activeId = visible[0].id;
        // 更新 DOM 高亮（最小化操作）
        $qsa(".toc-link.active", tocContent).forEach((n) =>
          n.classList.remove("active"),
        );
        const cur = tocLinks[activeId];
        cur && cur.classList.add("active");
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.4, 0.7, 1],
      },
    );

    headings.forEach((h) => this.intersectionObserver.observe(h));
  }
}

// ---------- 共享观察者（图片、TOC 的 MutationObserver） ----------
function setupSharedObservers(articleContent, treeInstance) {
  GLOBAL.articleContent = articleContent;
  GLOBAL.tocContent = $id("tocContent");
  GLOBAL.tocSidebar = $id("tocSidebar");
  GLOBAL.tocToggleBtn = $id("tocToggleBtn");
  GLOBAL.fileTree = $id("fileTree");

  // 先执行一次
  enhanceImagesIn(articleContent);
  treeInstance.generateTOC();

  // 单个 MutationObserver 负责内容变化（代码块懒加载、图片等）
  if (treeInstance._mutationObserver)
    treeInstance._mutationObserver.disconnect();
  treeInstance._mutationObserver = new MutationObserver(
    debounce(() => {
      enhanceImagesIn(articleContent);
      // 重新高亮代码
      $qsa("pre code", articleContent).forEach((c) => hljs.highlightElement(c));
      // 重新构建 TOC
      treeInstance.generateTOC();
    }, 120),
  );
  treeInstance._mutationObserver.observe(articleContent, {
    childList: true,
    subtree: true,
  });
}

function enhanceImagesIn(container) {
  if (!container) return;
  container.querySelectorAll("img:not([data-zoomed])").forEach((i) => {
    i.dataset.zoomed = "1";
    i.setAttribute("draggable", "false");
    i.style.cursor = "zoom-in";
    // lazy loading 属性
    if (!i.hasAttribute("loading")) i.setAttribute("loading", "lazy");
  });
}

// ---------- Image viewer（轻量） ----------
(function initImageViewer() {
  if (document.__photoZoom_v2_initialized) return;
  document.__photoZoom_v2_initialized = true;

  const overlay = document.createElement("div");
  overlay.className = "image-zoom-overlay";
  const imgEl = document.createElement("img");
  imgEl.className = "image-zoom-img";
  overlay.appendChild(imgEl);
  document.body.appendChild(overlay);

  let scale = 1,
    tx = 0,
    ty = 0;
  let dragging = false,
    pid = null,
    startX = 0,
    startY = 0,
    baseX = 0,
    baseY = 0,
    moved = false;
  const MIN = 0.25,
    MAX = 5,
    TH = 6;
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
    requestAnimationFrame(() => (imgEl.style.opacity = "1"));
  };
  const closeViewer = () => {
    imgEl.style.opacity = "0";
    overlay.classList.remove("show");
    setTimeout(reset, 240);
  };

  document.addEventListener(
    "click",
    (e) => {
      if (overlay.classList.contains("show")) {
        if (e.target === overlay || (e.target === imgEl && !moved))
          closeViewer();
        return;
      }
      const t = e.target;
      if (t instanceof HTMLImageElement && t.style.cursor === "zoom-in") {
        e.preventDefault();
        openViewer(t.currentSrc || t.src);
      }
    },
    true,
  );

  imgEl.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragging = true;
    pid = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    baseX = tx;
    baseY = ty;
    moved = false;
    imgEl.classList.add("dragging");
    imgEl.setPointerCapture(pid);
  });
  imgEl.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pid) return;
    const dx = e.clientX - startX,
      dy = e.clientY - startY;
    if (!moved && Math.hypot(dx, dy) > TH) moved = true;
    if (moved) {
      tx = baseX + dx;
      ty = baseY + dy;
      apply();
    }
  });
  const end = (e) => {
    if (!dragging || e.pointerId !== pid) return;
    dragging = false;
    imgEl.releasePointerCapture(pid);
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

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  if (typeof articlesConfig === "undefined") {
    console.error("未找到 articlesConfig，请确保已引入 articles-config.js");
    return;
  }
  const tree = new ArticleTree(articlesConfig);
  tree.render($id("fileTree"));
  hideTOC();

  // 键盘快捷键
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      $id("sidebarToggle")?.click();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      $id("themeToggle")?.click();
    }
  });

  // 绑定 TOC 切换按钮
  $id("tocToggleBtn")?.addEventListener("click", () => {
    const toc = $id("tocSidebar");
    if (window.innerWidth <= 768) {
      toc?.classList.toggle("show");
    } else {
      toc?.classList.toggle("hidden");
    }
  });

  // 点击外部收起 TOC
  document.addEventListener(
    "click",
    (e) => {
      const toc = $id("tocSidebar"),
        btn = $id("tocToggleBtn");
      if (
        toc &&
        !toc.contains(e.target) &&
        !btn?.contains(e.target)
      ) {
        if (window.innerWidth <= 768) {
          if (toc.classList.contains("show")) toc.classList.remove("show");
        } else {
          if (!toc.classList.contains("hidden")) toc.classList.add("hidden");
        }
      }
    },
    { passive: true },
  );

  // 响应式与 resize 优化
  const onResize = debounce(() => {
    const sidebar = $id("sidebar");
    if (sidebar)
      sidebar.style.position = window.innerWidth <= 768 ? "fixed" : "";
    document.body.classList.toggle(
      "sidebar-collapsed",
      sidebar?.classList.contains("collapsed"),
    );
  }, 120);
  window.addEventListener("resize", onResize, { passive: true });
});

// ---------- TOC 隐藏工具 ----------
function hideTOC() {
  const tocSidebar = $id("tocSidebar");
  const btn = $id("tocToggleBtn");
  if (tocSidebar) tocSidebar.classList.add("hidden");
  if (btn) btn.style.display = "none";
}

// ---------- Mobile toolbar 隐藏（基于内容区滚动） ----------
(function initMobileToolbar() {
  const toolbar = $qs(".toolbar");
  const contentArea = $qs(".content-area");
  if (!toolbar || !contentArea) return;
  let last = 0,
    hidden = false;
  const toggle = (show) => {
    if (show && hidden) {
      toolbar.classList.remove("hidden");
      hidden = false;
    } else if (!show && !hidden) {
      toolbar.classList.add("hidden");
      hidden = true;
    }
  };
  const onScroll = () => {
    if (window.innerWidth > 768) return;
    const curr = contentArea.scrollTop;
    if (curr > last && curr > 50) toggle(false);
    else if (curr < last) toggle(true);
    last = curr;
    if (window.innerWidth <= 768 && contentArea.scrollTop <= 20) toggle(true);
  };
  contentArea.addEventListener("scroll", rafThrottle(onScroll), {
    passive: true,
  });
})();
