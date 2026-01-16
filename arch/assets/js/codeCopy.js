document.querySelectorAll(".markdown-content pre").forEach((pre) => {
  if (pre.querySelector(".copy-btn")) return;

  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.textContent = "Copy";

  btn.addEventListener("click", () => {
    const code = pre.querySelector("code").innerText;
    navigator.clipboard.writeText(code);

    btn.textContent = "Copied";
    setTimeout(() => (btn.textContent = "Copy"), 1500);
  });

  pre.appendChild(btn);
});
