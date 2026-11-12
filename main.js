/* =========================================================
   PROJECTS — edit this list to change the "Selected work" section.
   color = the page tint when you hover the project.
   (Temporary projects — will be replaced with stronger work.)
   ========================================================= */
const PROJECTS = [
  { name: 'Sakin',         desc: 'Specialty coffee — branding & packaging', year: 2026, color: '#2a231b', image: 'assets/work/sakin.jpg',      link: 'https://www.behance.net/gallery/254459623/SAKIN-Branding-Packaging' },
  { name: 'Logofolio ’26', desc: '20 logotypes & marks, redesigned',        year: 2026, color: '#222221', image: 'assets/work/logofolio.jpg',  link: 'https://www.behance.net/gallery/253797233/Logotypes-Marks-logofolio-2026' },
  { name: 'Melh',          desc: 'Contemporary Saudi dining identity',      year: 2025, color: '#36181c', image: 'assets/work/melh.jpg',       link: 'https://www.behance.net/gallery/234119199/Melh-Brand-Identity' },
  { name: 'Cozy Cup',      desc: 'Coffee shop brand identity',              year: 2024, color: '#1e2514', image: 'assets/work/cozy-cup.jpg',   link: 'https://www.behance.net/gallery/207435943/Cozy-Cup-Brand-Identity' },
  { name: 'Eman Hijab',    desc: 'Modest fashion brand identity',           year: 2024, color: '#1c2230', image: 'assets/work/eman-hijab.jpg', link: 'https://www.behance.net/gallery/209463951/Eman-Hijab-Brand-Identity' },
];

/* Words shown in the intro and in the hero */
const ROLES = ['Brand identity designer', 'Visual storyteller', 'Art director', 'Logo & type obsessive', 'Based in Egypt'];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(hover: none)').matches;
const pad = (n, l = 2) => String(n).padStart(l, '0');
const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} } };

/* ---------- Scramble text helper ---------- */
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz';
function scramble(el, text, duration = 700) {
  return new Promise(resolve => {
    const start = performance.now();
    (function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const done = Math.floor(text.length * t);
      let out = text.slice(0, done);
      if (t < 1 && done < text.length) out += text[done] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      el.textContent = out;
      t < 1 ? requestAnimationFrame(frame) : resolve();
    })(start);
  });
}
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- Render work list ---------- */
const list = $('#workList');
$('#workCount').textContent = `(${pad(PROJECTS.length)})`;
list.innerHTML = PROJECTS.map((p, i) => `
  <li class="work-item reveal" style="transition-delay:${i * 70}ms">
    <a href="${p.link}" target="_blank" rel="noopener" data-img="${p.image}" data-color="${p.color}">
      <span class="idx">${pad(i + 1)}</span>
      <h3>${p.name}</h3>
      <span class="desc">${p.desc}</span>
      <span class="year">${p.year}</span>
      <span class="thumb"><img src="${p.image}" alt="${p.name}" loading="lazy"></span>
    </a>
  </li>`).join('');

/* ---------- Smooth scroll (Lenis) ---------- */
let lenis = null;
if (window.Lenis && !reduced) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  }));
}

/* ---------- Intro ---------- */
const intro = $('#intro');
async function playIntro() {
  const ul = $('#introWords'), count = $('#introCount'), line = $('#introLine');
  ul.innerHTML = ''; intro.classList.remove('out', 'gone');
  document.documentElement.classList.add('intro-lock'); lenis && lenis.stop();
  document.body.classList.remove('ready');
  const total = 2600, t0 = performance.now();
  let alive = true;
  (function progress(now) {
    const t = Math.min(1, (now - t0) / total);
    const eased = 1 - Math.pow(1 - t, 2);
    count.textContent = pad(Math.round(eased * 100), 3);
    line.style.width = (eased * 100) + '%';
    if (t < 1 && alive) requestAnimationFrame(progress);
  })(t0);
  for (const word of ROLES) {
    $$('li', ul).forEach(li => li.classList.remove('now'));
    const li = document.createElement('li'); li.className = 'now'; ul.appendChild(li);
    await scramble(li, word, 320);
    await wait(150);
  }
  await wait(Math.max(0, total - (performance.now() - t0)) + 200);
  alive = false;
  intro.classList.add('out');
  document.documentElement.classList.remove('intro-lock'); lenis && lenis.start();
  document.body.classList.add('ready');
  setTimeout(() => intro.classList.add('gone'), 1150);
  store.set('mzIntro', '1');
}
if (reduced || store.get('mzIntro')) { intro.classList.add('gone'); document.body.classList.add('ready'); }
else playIntro();
$('#replayIntro').addEventListener('click', () => { lenis ? lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0); playIntro(); });

/* ---------- Hero: cycling role ---------- */
const cycle = $('#roleCycle');
if (!reduced) {
  let i = 0;
  setInterval(() => { i = (i + 1) % ROLES.length; scramble(cycle, ROLES[i], 600); }, 3200);
}

/* ---------- Hero: a letter turns italic under the cursor ---------- */
$$('.wordmark .line > span').forEach(s => {
  s.addEventListener('mouseenter', () => s.classList.add('swap'));
  s.addEventListener('mouseleave', () => setTimeout(() => s.classList.remove('swap'), 500));
});

/* ---------- Split letters for flicker headings ---------- */
function splitLetters(root) {
  let n = 0;
  const walk = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const wd = document.createElement('span'); wd.className = 'wd';
          [...part].forEach(ch => { const c = document.createElement('span'); c.className = 'ch'; c.dataset.i = n++; c.textContent = ch; wd.appendChild(c); });
          frag.appendChild(wd);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') walk(child);
    });
  };
  walk(root);
}
function flicker(el) {
  const chars = $$('.ch', el);
  const keep = (el.dataset.keep || '').split(',').filter(Boolean).map(Number);
  let ticks = 0;
  const id = setInterval(() => {
    chars.forEach(c => c.classList.toggle('alt', Math.random() < 0.3));
    if (++ticks > 9) {
      clearInterval(id);
      chars.forEach(c => c.classList.toggle('alt', keep.includes(+c.dataset.i)));
    }
  }, 70);
}
$$('[data-flip]').forEach(splitLetters);

/* ---------- Statement: words light up with scroll ---------- */
const statement = $('#statement');
(function splitWords(root) {
  [...root.childNodes].forEach(child => {
    if (child.nodeType === 3) {
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) return frag.appendChild(document.createTextNode(p));
        const w = document.createElement('span'); w.className = 'w'; w.textContent = p; frag.appendChild(w);
      });
      child.replaceWith(frag);
    } else if (child.nodeType === 1 && child.tagName !== 'BR') {
      if (child.tagName === 'EM') { child.classList.add('w'); } else splitWords(child);
    }
  });
})(statement);
const words = $$('.w', statement);

/* ---------- Rails ---------- */
const rails = $$('.rail').map(r => {
  const track = $('.rail-track', r);
  track.innerHTML += track.innerHTML + track.innerHTML; // repeat for a seamless loop
  return { track, dir: +r.dataset.dir, x: 0 };
});

/* ---------- Scroll-driven loop ---------- */
const header = $('.site-header');
let lastY = scrollY, velocity = 0;
function loop() {
  const y = lenis ? lenis.scroll : scrollY;
  const dy = y - lastY; lastY = y;
  velocity += (dy - velocity) * 0.1;

  // header hides when scrolling down
  if (Math.abs(dy) > 2) header.classList.toggle('hide', dy > 0 && y > 200);

  // statement words
  const r = statement.getBoundingClientRect();
  const prog = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.55 + r.height * 0.5)));
  const lit = Math.round(prog * words.length);
  words.forEach((w, i) => w.classList.toggle('on', i < lit));

  // rails drift, faster when scrolling
  if (!reduced) rails.forEach(rl => {
    const third = rl.track.scrollWidth / 3;
    rl.x += rl.dir * (0.5 + Math.abs(velocity) * 0.6);
    if (rl.x <= -third) rl.x += third;
    if (rl.x > 0) rl.x -= third;
    rl.track.style.transform = `translate3d(${rl.x}px,0,0)`;
  });
  requestAnimationFrame(loop);
}
rails.forEach(rl => { if (rl.dir > 0) rl.x = -rl.track.scrollWidth / 3; });
requestAnimationFrame(loop);

/* ---------- Work: preview follows cursor + page takes the project colour ---------- */
const preview = $('#workPreview'), previewImg = $('img', preview);
PROJECTS.forEach(p => { const i = new Image(); i.src = p.image; });
let mx = 0, my = 0, px = 0, py = 0;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function follow() {
  px += (mx - px) * 0.15; py += (my - py) * 0.15;
  preview.style.left = px + 'px'; preview.style.top = py + 'px';
  requestAnimationFrame(follow);
})();
if (!touch) {
  $$('a', list).forEach(a => {
    a.addEventListener('mouseenter', () => { previewImg.src = a.dataset.img; preview.classList.add('on'); document.body.style.backgroundColor = a.dataset.color; });
  });
  list.addEventListener('mouseleave', () => { preview.classList.remove('on'); document.body.style.backgroundColor = ''; });
}

/* ---------- Reveal, flicker, count-up on view ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.matches('[data-flip]')) reduced ? null : flicker(el);
    else if (el.matches('[data-count]')) {
      const end = +el.dataset.count, t0 = performance.now();
      (function step(now) { const t = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))); if (t < 1) requestAnimationFrame(step); })(t0);
    } else el.classList.add('in');
    io.unobserve(el);
  });
}, { threshold: 0.15 });
$$('.reveal, [data-flip], [data-count]').forEach(el => io.observe(el));

/* ---------- Local time (Egypt) + year ---------- */
const timeEl = $('#localTime');
const tick = () => { timeEl.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Cairo' }).format(new Date()) + ' in Egypt'; };
tick(); setInterval(tick, 30000);
$('#year').textContent = new Date().getFullYear();
