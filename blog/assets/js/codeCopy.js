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
   btn.style.opacity = "0"; // Ensure initial opacity

   btn.addEventListener("click", () => {
     const code = pre.querySelector("code").innerText;
     navigator.clipboard.writeText(code);

     btn.textContent = "Copied";
     setTimeout(() => (btn.textContent = "Copy"), 1500);
   });

   pre.appendChild(btn);
 });
