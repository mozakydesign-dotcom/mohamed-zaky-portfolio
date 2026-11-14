/* Case study page — built from js/projects.js */
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const slug = new URLSearchParams(location.search).get('p');
const index = Math.max(0, PROJECTS.findIndex(p => p.slug === slug));
const p = PROJECTS[index];
const next = PROJECTS[(index + 1) % PROJECTS.length];

document.title = `${p.name} — Case study — Mohamed Zaky`;
document.documentElement.style.setProperty('--accent', p.accent);

const sections = (p.sections || []).filter(s => (s.text && s.text.trim()) || (s.images && s.images.length));
let n = 0;
const sectionHTML = sections.map(s => {
  const hasText = s.text && s.text.trim();
  const text = hasText ? `
    <div class="cs-row">
      <p class="cs-label"><span>${pad(++n)}</span>${esc(s.title)}</p>
      <div class="cs-body">
        <p class="reveal">${esc(s.text)}</p>
        ${s.palette && p.palette ? `<div class="swatches">${p.palette.map(c => `<div class="swatch reveal" style="--c:${esc(c)}"><span>${esc(c.toUpperCase())}</span></div>`).join('')}</div>` : ''}
      </div>
    </div>` : '';
  const imgs = (s.images || []).map(im => `
    <figure class="cs-img ${im.wide ? 'wide' : 'half'} reveal"><img src="${esc(im.src)}" alt="${esc(p.name)} — ${esc(s.title)}" loading="lazy"></figure>`).join('');
  return `<section class="cs-section">${text}${imgs ? `<div class="cs-gallery">${imgs}</div>` : ''}</section>`;
}).join('');

$('#caseStudy').innerHTML = `
  <header class="cs-hero">
    <p class="eyebrow">Case study ${pad(index + 1)} / ${pad(PROJECTS.length)} — ${esc(p.category)}</p>
    <h1 class="cs-title" data-lines>${esc(p.name)}</h1>
    <p class="cs-tagline reveal">${esc(p.tagline)}</p>
    <dl class="cs-meta reveal">
      <div><dt>Industry</dt><dd>${esc(p.industry)}</dd></div>
      <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
      <div><dt>Services</dt><dd>${(p.services || []).map(esc).join('<br>')}</dd></div>
      <div><dt>Role</dt><dd>Brand designer</dd></div>
    </dl>
  </header>
  <figure class="cs-cover"><img src="${esc(p.cover)}" alt="${esc(p.name)} cover"></figure>
  ${sectionHTML}
  <a class="cs-next" href="project.html?p=${encodeURIComponent(next.slug)}" data-cursor="Next">
    <span class="eyebrow">Next case study</span>
    <span class="cs-next-name">${esc(next.name)}</span>
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
