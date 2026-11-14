/* =========================================================
   PROJECTS — the single place to edit your work.
   Each project gets its own case study page: project.html?p=<slug>
   Put a project's images in assets/work/<slug>/

   Project fields
   - slug, name, tagline, year, cover, accent (card colour)
   - info: the table under the title, e.g. { Scope: '...', Role: '...', Client: '...' }
   - credits: [{ role, name }]
   - blocks: the case study, top to bottom. Block types:

     { type: 'text', label: 'The story', text: ['Paragraph one', 'Paragraph two'] }
     { type: 'quote', text: 'A big italic line that breaks the rhythm.' }
     { type: 'image', src: 'assets/work/x/01.jpg', board: true }   board = light frame like a presentation slide
     { type: 'images', src: ['a.jpg', 'b.jpg', 'c.jpg'] }           2–4 images side by side
     { type: 'palette', label: 'Colour', colors: [{ hex: '#004236', name: 'Main', pct: 70 }] }
     { type: 'keywords', label: 'Brand personality', words: ['Arabian', 'Heritage', 'Elegance'] }
   ========================================================= */
window.PROJECTS = [
  {
    slug: 'sakin',
    name: 'Sakin',
    tagline: 'A calm, considered identity for a specialty coffee ritual.',
    category: 'Branding & Packaging',
    year: 2026,
    accent: '#2c3a2c',
    cover: 'assets/work/sakin.jpg',
    info: {
      Scope: 'Brand identity, bilingual logotype, packaging, art direction',
      Role: 'Brand designer',
      Industry: 'Specialty coffee',
      Year: '2026',
    },
    blocks: [
      { type: 'text', label: 'The story', text: [
        'SAKIN is a specialty coffee brand built around one idea: coffee as a pause in the day.',
        'The identity had to feel calm and grounded — never loud — and carry that feeling from the cup to the screen.',
      ] },
      { type: 'quote', text: 'Coffee as a deliberate pause — not another rush in the day.' },
      { type: 'text', label: 'The identity', text: [
        'An English wordmark paired with Arabic calligraphy creates a bilingual system that feels distinct while staying closely connected across every application.',
      ] },
      { type: 'palette', label: 'Colour', colors: [
        { hex: '#1f2a20', name: 'Forest', pct: 60 },
        { hex: '#efe6d4', name: 'Cream', pct: 25 },
        { hex: '#6b5640', name: 'Roast', pct: 10 },
        { hex: '#b49a63', name: 'Gold', pct: 5 },
      ] },
      { type: 'keywords', label: 'Brand personality', words: ['Calm', 'Grounded', 'Tactile', 'Warm', 'Considered'] },
      { type: 'text', label: 'Art direction', text: [
        'Quiet and tactile: dark, warm environments, controlled contrast, and close attention to material, form, and the coffee ritual.',
      ] },
      { type: 'text', label: 'Applications', text: [
        'The system comes to life across cups, takeaway bags, menus, social media and packaging.',
      ] },
    ],
    credits: [{ role: 'Brand identity, packaging, art direction', name: 'Mohamed Zaky' }],
  },
  {
    slug: 'melh',
    name: 'Melh',
    tagline: 'A contemporary Saudi dining identity, seasoned with cultural memory.',
    category: 'Restaurant Branding',
    year: 2025,
    accent: '#5a1f26',
    cover: 'assets/work/melh.jpg',
    info: { Scope: 'Brand identity, pattern system, menu & packaging', Role: 'Brand designer', Industry: 'Hospitality', Location: 'Saudi Arabia' },
    blocks: [
      { type: 'text', label: 'The story', text: ['MELH draws from Saudi warmth and visual culture while staying current and intentional.'] },
      { type: 'palette', label: 'Colour', colors: [
        { hex: '#5a1f26', name: 'Sadu red', pct: 55 }, { hex: '#e9dcc6', name: 'Sand', pct: 30 }, { hex: '#1a1716', name: 'Charcoal', pct: 15 },
      ] },
    ],
    credits: [{ role: 'Brand identity', name: 'Mohamed Zaky' }],
  },
  {
    slug: 'logofolio-26',
    name: 'Logofolio ’26',
    tagline: 'Twenty logotypes and marks, redesigned.',
    category: 'Logo Design',
    year: 2026,
    accent: '#2a2a28',
    cover: 'assets/work/logofolio.jpg',
    info: { Scope: 'Logotypes & marks', Role: 'Designer', Type: 'Personal project' },
    blocks: [
      { type: 'text', label: 'The story', text: ['Twenty logo redesigns of well-known Egyptian and Gulf brands, created during Logojulio.'] },
    ],
  },
  {
    slug: 'cozy-cup',
    name: 'Cozy Cup',
    tagline: 'A warm, playful identity for a neighbourhood coffee shop.',
    category: 'Brand Identity',
    year: 2024,
    accent: '#2e3a1c',
    cover: 'assets/work/cozy-cup.jpg',
    info: { Scope: 'Brand identity, campaign, social media', Role: 'Brand designer', Industry: 'Coffee shop' },
    blocks: [
      { type: 'text', label: 'The story', text: ['A coffee shop identity built to feel friendly, warm and instantly recognisable.'] },
    ],
  },
  {
    slug: 'eman-hijab',
    name: 'Eman Hijab',
    tagline: 'A confident modest-fashion brand built on expressive lettering.',
    category: 'Brand Identity',
    year: 2024,
    accent: '#26324a',
    cover: 'assets/work/eman-hijab.jpg',
    info: { Scope: 'Brand identity, logotype, campaign', Role: 'Brand designer', Industry: 'Modest fashion' },
    blocks: [
      { type: 'text', label: 'The story', text: ['A modest fashion brand that needed a bold, expressive identity rooted in its letterforms.'] },
    ],
  },
];
