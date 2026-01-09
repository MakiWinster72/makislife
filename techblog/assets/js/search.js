document.getElementById("searchInput")?.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  const allItems = document.querySelectorAll(".tree-item");
  const allNodes = document.querySelectorAll(".tree-node");

  // 1. 重置：先全部隐藏 + 收起
  allItems.forEach((item) => {
    item.style.display = "none";
  });

  document.querySelectorAll(".tree-children").forEach((children) => {
    children.classList.remove("expanded");
  });

  document.querySelectorAll(".tree-icon").forEach((icon) => {
    icon.classList.remove("expanded");
  });

  // 2. 没有搜索词：全部显示，保持原始状态
  if (!query) {
    allItems.forEach((item) => {
      item.style.display = "";
    });
    return;
  }

  // 3. 只匹配“文章节点”
  allNodes.forEach((node) => {
    const treeItem = node.closest(".tree-item");
    const labelEl = node.querySelector(".tree-label");
    if (!labelEl) return;

    const title = labelEl.textContent.trim().toLowerCase();

    // 只处理文章（没有 tree-children 的就是文章）
    const isArticle = !treeItem.querySelector(".tree-children");
    if (!isArticle) return;

    if (title.includes(query)) {
      // 显示文章
      treeItem.style.display = "";

      // 向上递归：显示并展开所有父级文件夹
      let parent = treeItem.parentElement;
      while (parent) {
        if (parent.classList.contains("tree-children")) {
          parent.classList.add("expanded");

          const parentItem = parent.closest(".tree-item");
          if (parentItem) {
            parentItem.style.display = "";

            const parentIcon = parentItem.querySelector(".tree-icon");
            if (parentIcon) {
              parentIcon.classList.add("expanded");
            }
          }
        }
        parent = parent.parentElement;
      }
    }
  });
});
