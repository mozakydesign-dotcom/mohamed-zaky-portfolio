/* Shared behaviour for every page: smooth scroll, header, cursor, reveals, clock. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const pad = (n, l = 2) => String(n).padStart(l, '0');
const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- Smooth scroll ---------- */
let lenis = null;
if (window.Lenis && !reduced) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = a.getAttribute('href') === '#top' ? 0 : $(a.getAttribute('href'));
  if (target === null) return;
  e.preventDefault();
  lenis ? lenis.scrollTo(target, { duration: 1.4 }) : (target === 0 ? scrollTo({ top: 0, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
});
const scrollY_ = () => (lenis ? lenis.scroll : scrollY);

/* ---------- Header: hide on scroll down, solid after hero ---------- */
const header = $('.site-header');
let lastY = 0;
function headerTick() {
  const y = scrollY_();
  if (Math.abs(y - lastY) > 3) {
    header.classList.toggle('hide', y > lastY && y > 240);
    lastY = y;
  }
  requestAnimationFrame(headerTick);
}
if (header) headerTick();

/* ---------- Cursor: a ring that grows with a label on links ---------- */
if (finePointer && !reduced) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<span></span>';
  document.body.appendChild(cursor);
  const label = $('span', cursor);
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; cursor.classList.add('on'); });
  document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
  (function move() {
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(move);
  })();
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor], a, button');
    cursor.classList.toggle('link', !!t && !t.dataset.cursor);
    cursor.classList.toggle('label', !!(t && t.dataset.cursor));
    label.textContent = t && t.dataset.cursor ? t.dataset.cursor : '';
  });
}

/* ---------- Split headings into masked lines for the reveal ---------- */
function splitLines(el) {
  const html = el.innerHTML.split(/<br\s*\/?>/i);
  el.innerHTML = html.map((line, i) => `<span class="ln"><span style="transition-delay:${i * 90}ms">${line.trim()}</span></span>`).join('');
}
$$('[data-lines]').forEach(splitLines);

/* ---------- Reveal on view ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.dataset.count !== undefined) {
      const end = +el.dataset.count, t0 = performance.now();
      (function step(now) {
        const t = Math.min(1, (now - t0) / 1400);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      })(t0);
    }
    el.classList.add('in');
    io.unobserve(el);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
const observeReveals = (root = document) => $$('.reveal, [data-lines], [data-count]', root).forEach(el => io.observe(el));

/* ---------- Clock + year ---------- */
function startClock() {
  const timeEl = $('#localTime');
  if (timeEl) {
    const tick = () => { timeEl.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Cairo' }).format(new Date()) + ' — Egypt'; };
    tick(); setInterval(tick, 30000);
  }
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
startClock();
