// Theme Management - Simplified
(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  const sunIconMobile = document.getElementById("sun-icon-mobile");
  const moonIconMobile = document.getElementById("moon-icon-mobile");

  // 获取保存的主题，默认为亮色
  function getStoredTheme() {
    return localStorage.getItem("theme") || "light";
  }

  // 更新主题和图标
  function updateTheme(theme) {
    if (theme === "dark") {
      html.classList.add("dark");
      // 暗色模式显示太阳图标
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
      if (sunIconMobile) sunIconMobile.style.display = "block";
      if (moonIconMobile) moonIconMobile.style.display = "none";
    } else {
      html.classList.remove("dark");
      // 亮色模式显示月亮图标
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
      if (sunIconMobile) sunIconMobile.style.display = "none";
      if (moonIconMobile) moonIconMobile.style.display = "block";
    }
    localStorage.setItem("theme", theme);
  }

  // 切换主题
  function toggleTheme() {
    const current = html.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    updateTheme(next);
  }

  // 初始化 - 默认亮色模式
  updateTheme(getStoredTheme());

  // 事件监听
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }
})();

// Date and Greeting
(function () {
  const dateEl = document.getElementById("current-date");
  const greetEl = document.getElementById("greeting");

  function formatDateCN(now) {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    const weekday = weekdays[now.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  }

  function selectGreeting(now) {
    const h = now.getHours();
    if (h >= 5 && h < 12) {
      return "早上好👋";
    } else if (h >= 12 && h < 18) {
      return "下午好👋";
    } else if (h >= 18 && h < 23) {
      return "晚上好👋";
    } else {
      return "早点睡觉!";
    }
  }

  function updateOnce() {
    const now = new Date();
    if (dateEl) dateEl.textContent = formatDateCN(now);
    if (greetEl) greetEl.textContent = selectGreeting(now);
  }

  updateOnce();
})();
