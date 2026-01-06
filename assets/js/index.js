// PARTICLES CANVAS — 轻量粒子
(function(){
  if (window.__particlesInitDone) return;
  window.__particlesInitDone = true;
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  let w = innerWidth, h = innerHeight;
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setupCanvas(){
    w = innerWidth; h = innerHeight;
    canvas.width = w * DPR; canvas.height = h * DPR;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  setupCanvas();

  function getCount(){ return Math.max(80, Math.round((w*h)/25000)); }
  let n = getCount();
  const particles = [];
  let mouse = {x:w/2,y:h/2};

  function rand(a,b){return a + Math.random()*(b-a)}
  function seed(count){
    particles.length = 0;
    for(let i=0;i<count;i++){
      particles.push({x:Math.random()*w, y:Math.random()*h, r:rand(1.0,2.6), vx:rand(-0.12,0.12), vy:rand(-0.10,0.10), alpha:rand(0.1,0.32)});
    }
  }
  seed(n);

  function resize(){
    setupCanvas();
    n = getCount();
    seed(n);
  }
  addEventListener('resize', resize);

  if(!prefersReduced){
    addEventListener('mousemove', e=>{mouse.x=e.clientX; mouse.y=e.clientY});
    addEventListener('touchmove', e=>{ if(e.touches[0]){mouse.x=e.touches[0].clientX; mouse.y=e.touches[0].clientY}} , {passive:true});
  }

  function drawBackground(){
    // 保持透明背景，避免与页面底色叠加产生色块
  }

  function drawParticles(){
    ctx.shadowColor = 'rgba(255,255,255,0.55)';
    ctx.shadowBlur = 3.5;
    for(let p of particles){
      if(!prefersReduced){
        const dx = (mouse.x - p.x); const dy = (mouse.y - p.y);
        const dist = Math.sqrt(dx*dx + dy*dy) + 0.0001;
        const force = Math.min(60, 1200/dist);
        const sign = dist < 60 ? -1 : 1;
        p.vx += (dx/dist) * (force * 0.00008) * sign;
        p.vy += (dy/dist) * (force * 0.00008) * sign;
        p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy *= 0.985;
        if(p.x<-20) p.x = w+20; if(p.x>w+20) p.x=-20;
        if(p.y<-20) p.y = h+20; if(p.y>h+20) p.y=-20;
      }
      ctx.beginPath(); ctx.globalAlpha = p.alpha; ctx.fillStyle = 'white'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
  }

  function drawConnections(){
    if(prefersReduced) return;
    let lines = 0, maxLines = 260;
    for(let i=0;i<particles.length && lines<maxLines;i+=2){
      const a = particles[i];
      for(let j=i+1;j<Math.min(i+10, particles.length) && lines<maxLines;j++){
        const b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y; const d = Math.hypot(dx,dy);
        if(d<180){
          const alpha = 0.14 * (1 - d/180);
          ctx.strokeStyle = `rgba(170,160,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          lines++;
        }
      }
    }
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    drawBackground();
    drawConnections();
    drawParticles();
    requestAnimationFrame(step);
  }

  if(prefersReduced){
    drawBackground();
    drawParticles();
  } else {
    step();
  }
})();

// 3D tilt parallax for avatar
(function(){
  const avatar = document.getElementById('avatar');
  const container = document.getElementById('avatar-3d');
  const damp = 0.06; let rx=0, ry=0, tx=0, ty=0;
  function onMove(e){
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) || innerWidth/2;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) || innerHeight/2;
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2;
    const dx = (x - cx) / rect.width; const dy = (y - cy) / rect.height;
    rx = dy * 12; ry = dx * -12; tx = dx*8; ty = dy*-8;
  }
  addEventListener('mousemove', onMove);
  addEventListener('touchmove', onMove, {passive:true});

  function loop(){
    const rxs = `rotateX(${rx*damp}deg)`;
    const rys = `rotateY(${ry*damp}deg)`;
    const trs = `translate3d(${tx*damp}px, ${ty*damp}px, 0)`;
    avatar.style.transform = `${rxs} ${rys} ${trs}`;
    requestAnimationFrame(loop);
  }
  loop();
})();

// focus styles
document.querySelectorAll('.btn, .link-chip').forEach(b=>{
  b.addEventListener('focus', ()=>b.style.boxShadow='0 12px 36px rgba(100,78,255,0.12)');
  b.addEventListener('blur', ()=>b.style.boxShadow='');
});
