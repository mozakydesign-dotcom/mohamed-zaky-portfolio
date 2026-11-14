/* Home page: intro, hero scroll effect, stacked case-study cards. */

/* ---------- Work: stacked cards ---------- */
const stack = $('#stack');
stack.innerHTML = PROJECTS.map((p, i) => `
  <a class="card" href="project.html?p=${p.slug}" style="--i:${i};--accent:${p.accent}" data-cursor="View case">
    <div class="card-media"><img src="${p.cover}" alt="${p.name} — ${p.category}" loading="${i < 2 ? 'eager' : 'lazy'}"></div>
    <div class="card-info">
      <span class="card-idx">${pad(i + 1)} / ${pad(PROJECTS.length)}</span>
      <h3>${p.name}</h3>
      <p>${p.tagline}</p>
      <div class="card-meta"><span>${p.category}</span><span>${p.year}</span><span class="card-cta">View case study →</span></div>
    </div>
  </a>`).join('');

/* Cards scale down slightly as the next one covers them */
const cards = $$('.card', stack);
function stackTick() {
  cards.forEach((c, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const top = c.getBoundingClientRect().top;
    const nTop = next.getBoundingClientRect().top;
    const h = c.offsetHeight;
    const t = Math.min(1, Math.max(0, 1 - (nTop - top) / h));
    c.style.setProperty('--cover', t.toFixed(3));
  });
  requestAnimationFrame(stackTick);
}
if (!reduced) stackTick();

/* ---------- Hero: letters drift apart on scroll ---------- */
const wordmark = $('.wordmark');
function heroTick() {
  const y = scrollY_();
  const t = Math.min(1, y / innerHeight);
  wordmark.style.setProperty('--spread', t.toFixed(3));
  requestAnimationFrame(heroTick);
}
if (!reduced) heroTick();

/* ---------- Intro: once per visit ---------- */
const intro = $('#intro');
function finishIntro() {
  intro.classList.add('out');
  document.documentElement.classList.remove('intro-lock');
  lenis && lenis.start();
  document.body.classList.add('ready');
  setTimeout(() => intro.classList.add('gone'), 1200);
  store.set('mzIntro2', '1');
}
function playIntro() {
  intro.classList.remove('out', 'gone', 'play');
  void intro.offsetWidth;
  document.documentElement.classList.add('intro-lock');
  lenis && lenis.stop();
  document.body.classList.remove('ready');
  intro.classList.add('play');
  setTimeout(finishIntro, 2200);
}
if (reduced || store.get('mzIntro2')) { intro.classList.add('gone'); document.body.classList.add('ready'); }
else playIntro();
$('#replayIntro').addEventListener('click', () => {
  lenis ? lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0);
  playIntro();
});

observeReveals();
