// 粒子系统
(function initParticles() {
  if (window.__particlesInit) return;
  window.__particlesInit = true;

  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w = innerWidth;
  let h = innerHeight;
  let particles = [];
  let mouse = { x: w / 2, y: h / 2 };

  // 设置画布
  function setupCanvas() {
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // 计算粒子数量
  function getParticleCount() {
    return Math.max(80, Math.round((w * h) / 25000));
  }

  // 随机数生成
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  // 初始化粒子
  function seedParticles(count) {
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(1.0, 2.6),
      vx: rand(-0.12, 0.12),
      vy: rand(-0.1, 0.1),
      alpha: rand(0.1, 0.32),
    }));
  }

  // 窗口大小改变
  function handleResize() {
    setupCanvas();
    seedParticles(getParticleCount());
  }

  // 鼠标移动
  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  // 触摸移动
  function handleTouchMove(e) {
    if (e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }

  // 绘制粒子
  function drawParticles() {
    ctx.shadowColor = "rgba(255,255,255,0.55)";
    ctx.shadowBlur = 3.5;

    particles.forEach((p) => {
      if (!prefersReduced) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy) + 0.0001;
        const force = Math.min(60, 1200 / dist);
        const sign = dist < 60 ? -1 : 1;

        p.vx += (dx / dist) * (force * 0.00008) * sign;
        p.vy += (dy / dist) * (force * 0.00008) * sign;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        // 边界处理
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = "white";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // 绘制连接线
  function drawConnections() {
    if (prefersReduced) return;

    let lines = 0;
    const maxLines = 260;

    for (let i = 0; i < particles.length && lines < maxLines; i += 2) {
      const a = particles[i];
      for (
        let j = i + 1;
        j < Math.min(i + 10, particles.length) && lines < maxLines;
        j++
      ) {
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);

        if (dist < 180) {
          const alpha = 0.14 * (1 - dist / 180);
          ctx.strokeStyle = `rgba(170,160,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          lines++;
        }
      }
    }
  }

  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, w, h);
    drawConnections();
    drawParticles();
    requestAnimationFrame(animate);
  }

  // 初始化
  setupCanvas();
  seedParticles(getParticleCount());
  addEventListener("resize", handleResize);

  if (!prefersReduced) {
    addEventListener("mousemove", handleMouseMove);
    addEventListener("touchmove", handleTouchMove, { passive: true });
    animate();
  } else {
    drawParticles();
  }
})();

// 头像 3D 视差效果
(function init3DTilt() {
  const avatar = document.getElementById("avatar");
  const container = document.getElementById("avatar-3d");

  if (!avatar || !container) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dampening = 0.06;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let targetTranslateX = 0;
  let targetTranslateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let currentTranslateX = 0;
  let currentTranslateY = 0;

  function handleMove(e) {
    const x =
      e.clientX || (e.touches && e.touches[0]?.clientX) || innerWidth / 2;
    const y =
      e.clientY || (e.touches && e.touches[0]?.clientY) || innerHeight / 2;
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (x - cx) / rect.width;
    const dy = (y - cy) / rect.height;

    targetRotateX = dy * 12;
    targetRotateY = dx * -12;
    targetTranslateX = dx * 8;
    targetTranslateY = dy * -8;
  }

  function animateLoop() {
    currentRotateX += (targetRotateX - currentRotateX) * dampening;
    currentRotateY += (targetRotateY - currentRotateY) * dampening;
    currentTranslateX += (targetTranslateX - currentTranslateX) * dampening;
    currentTranslateY += (targetTranslateY - currentTranslateY) * dampening;

    avatar.style.transform = `
      rotateX(${currentRotateX}deg) 
      rotateY(${currentRotateY}deg) 
      translate3d(${currentTranslateX}px, ${currentTranslateY}px, 0)
    `;

    requestAnimationFrame(animateLoop);
  }

  addEventListener("mousemove", handleMove);
  addEventListener("touchmove", handleMove, { passive: true });
  animateLoop();
})();

// 焦点样式优化
(function initFocusStyles() {
  const focusElements = document.querySelectorAll(".btn, .link-chip");

  focusElements.forEach((el) => {
    el.addEventListener("focus", () => {
      el.style.boxShadow = "0 12px 36px rgba(100,78,255,0.12)";
    });

    el.addEventListener("blur", () => {
      el.style.boxShadow = "";
    });
  });
})();
