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
