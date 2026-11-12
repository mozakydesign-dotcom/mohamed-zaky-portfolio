/* =========================================================
   PROJECTS — edit this list to change the "Selected work" section.
   (These are temporary — will be replaced with stronger work.)
   ========================================================= */
const PROJECTS = [
  { name: 'Sakin',            desc: 'Specialty coffee — branding & packaging', year: 2026, image: 'assets/work/sakin.jpg',      link: 'https://www.behance.net/gallery/254459623/SAKIN-Branding-Packaging' },
  { name: 'Logofolio ’26',    desc: '20 logotypes & marks, redesigned',        year: 2026, image: 'assets/work/logofolio.jpg',  link: 'https://www.behance.net/gallery/253797233/Logotypes-Marks-logofolio-2026' },
  { name: 'Melh',             desc: 'Contemporary Saudi dining identity',      year: 2025, image: 'assets/work/melh.jpg',       link: 'https://www.behance.net/gallery/234119199/Melh-Brand-Identity' },
  { name: 'Cozy Cup',         desc: 'Coffee shop brand identity',              year: 2024, image: 'assets/work/cozy-cup.jpg',   link: 'https://www.behance.net/gallery/207435943/Cozy-Cup-Brand-Identity' },
  { name: 'Eman Hijab',       desc: 'Modest fashion brand identity',           year: 2024, image: 'assets/work/eman-hijab.jpg', link: 'https://www.behance.net/gallery/209463951/Eman-Hijab-Brand-Identity' },
];

/* ---------- Render work list ---------- */
const list = document.getElementById('workList');
const pad = n => String(n).padStart(2, '0');
document.getElementById('workCount').textContent = `(${pad(PROJECTS.length)})`;
list.innerHTML = PROJECTS.map((p, i) => `
  <li class="work-item reveal">
    <a href="${p.link}" target="_blank" rel="noopener" data-img="${p.image}">
      <span class="idx">${pad(i + 1)}</span>
      <h3>${p.name}</h3>
      <span class="desc">${p.desc}</span>
      <span class="year">${p.year}</span>
      <span class="thumb"><img src="${p.image}" alt="${p.name}" loading="lazy"></span>
    </a>
  </li>`).join('');

/* ---------- Hover preview that follows the cursor ---------- */
const preview = document.getElementById('workPreview');
const previewImg = preview.querySelector('img');
PROJECTS.forEach(p => { const i = new Image(); i.src = p.image; }); // preload
let mx = 0, my = 0, px = 0, py = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function follow() {
  px += (mx - px) * 0.15; py += (my - py) * 0.15;
  preview.style.left = px + 'px'; preview.style.top = py + 'px';
  requestAnimationFrame(follow);
})();
list.querySelectorAll('a').forEach(a => {
  a.addEventListener('mouseenter', () => { previewImg.src = a.dataset.img; preview.classList.add('on'); });
  a.addEventListener('mouseleave', () => preview.classList.remove('on'));
});

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Local time (Egypt) + year ---------- */
const timeEl = document.getElementById('localTime');
const tick = () => {
  timeEl.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Cairo' }).format(new Date()) + ' in Egypt';
};
tick(); setInterval(tick, 30000);
document.getElementById('year').textContent = new Date().getFullYear();
