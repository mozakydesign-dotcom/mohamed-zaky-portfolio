/* Case study page — built from js/projects.js */
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const slug = new URLSearchParams(location.search).get('p');
const index = Math.max(0, PROJECTS.findIndex(p => p.slug === slug));
const p = PROJECTS[index];
const next = PROJECTS[(index + 1) % PROJECTS.length];

document.title = `${p.name} — Case study — Mohamed Zaky`;
document.documentElement.style.setProperty('--accent', p.accent);

const img = (src, alt, cls = '') => `<figure class="cs-img ${cls} reveal"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></figure>`;

const render = {
  text: b => `
    <section class="cs-text">
      <p class="cs-label">${esc(b.label || '')}</p>
      <div class="cs-body">${[].concat(b.text || []).map(t => `<p class="reveal">${esc(t)}</p>`).join('')}</div>
    </section>`,
  quote: b => `<blockquote class="cs-quote" data-lines>${esc(b.text)}</blockquote>`,
  image: b => `<div class="cs-block">${img(b.src, p.name, b.board ? 'board' : '')}${b.caption ? `<p class="cs-caption">${esc(b.caption)}</p>` : ''}</div>`,
  images: b => `<div class="cs-block cs-row-imgs" style="--n:${Math.min(4, (b.src || []).length)}">${(b.src || []).map(s => img(s, p.name, b.board ? 'board' : '')).join('')}</div>`,
  palette: b => `
    <section class="cs-text">
      <p class="cs-label">${esc(b.label || 'Colour')}</p>
      <div class="palette reveal">${(b.colors || []).map(c => `
        <div class="pal" style="--c:${esc(c.hex)};--w:${+c.pct || 1}">
          <span class="pal-name">${esc(c.name || '')}</span>
          <span class="pal-hex">${esc(String(c.hex).toUpperCase())}${c.pct ? ` · ${+c.pct}%` : ''}</span>
        </div>`).join('')}
      </div>
    </section>`,
  keywords: b => `
    <section class="cs-text">
      <p class="cs-label">${esc(b.label || 'Personality')}</p>
      <ul class="keywords">${(b.words || []).map((w, i) => `<li class="reveal" style="transition-delay:${i * 60}ms">${esc(w)}</li>`).join('')}</ul>
    </section>`,
};

const blocksHTML = (p.blocks || []).map(b => (render[b.type] ? render[b.type](b) : '')).join('');
const infoHTML = Object.entries(p.info || {}).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
const creditsHTML = (p.credits || []).length ? `
  <section class="cs-credits">
    <div class="cs-credits-head"><span>Credits</span><span>(${pad(p.credits.length)})</span></div>
    ${p.credits.map(c => `<div class="credit reveal"><span>${esc(c.role)}</span><b>${esc(c.name)}</b></div>`).join('')}
  </section>` : '';

$('#caseStudy').innerHTML = `
  <header class="cs-hero">
    <div class="cs-topline"><a href="index.html#work">← All work</a><span>${pad(index + 1)} of ${pad(PROJECTS.length)}</span></div>
    <h1 class="cs-title" data-lines>${esc(p.name)}</h1>
    <p class="cs-tagline reveal">${esc(p.tagline)}</p>
    <dl class="cs-info reveal">${infoHTML}</dl>
  </header>
  <figure class="cs-cover"><img src="${esc(p.cover)}" alt="${esc(p.name)} cover"></figure>
  <div class="cs-content">${blocksHTML}</div>
  ${creditsHTML}
  <section class="cs-cta reveal">
    <p class="eyebrow">Have a brand like this in mind?</p>
    <h2>Your brand could be<br>the next <em>case study.</em></h2>
    <a class="pill-lg" href="index.html#contact">Start a project →</a>
  </section>
  <a class="cs-next" href="project.html?p=${encodeURIComponent(next.slug)}" data-cursor="Next">
    <span class="eyebrow">Next project</span>
    <span class="cs-next-name">${esc(next.name)} <i>→</i></span>
    <span class="cs-next-img"><img src="${esc(next.cover)}" alt="" loading="lazy"></span>
  </a>`;

$$('[data-lines]', $('#caseStudy')).forEach(splitLines);

/* Cover parallax */
const coverImg = $('.cs-cover img');
function parallax() {
  const r = coverImg.parentElement.getBoundingClientRect();
  const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
  coverImg.style.transform = `translateY(${(t * -8).toFixed(2)}%) scale(1.15)`;
  requestAnimationFrame(parallax);
}
if (!reduced) parallax();

observeReveals();
