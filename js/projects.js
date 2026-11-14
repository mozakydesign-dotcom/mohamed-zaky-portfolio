/* =========================================================
   PROJECTS — the single place to edit your work.
   Each project gets its own case study page: project.html?p=<slug>

   - slug:      short id used in the link (no spaces)
   - accent:    colour used on the case study page
   - cover:     main image (also used on the home page)
   - palette:   brand colours shown as swatches
   - sections:  the story of the case study, in order.
                A section can have text, images, or both.
                images: [{ src, wide: true }]  wide = full width
   Sections with empty text are hidden automatically.
   ========================================================= */
window.PROJECTS = [
  {
    slug: 'sakin',
    name: 'Sakin',
    nameAr: 'ساكن',
    tagline: 'A calm, considered identity for a specialty coffee ritual.',
    category: 'Branding & Packaging',
    industry: 'Specialty coffee',
    year: 2026,
    services: ['Brand identity', 'Bilingual logotype', 'Packaging', 'Art direction'],
    accent: '#2c3a2c',
    cover: 'assets/work/sakin.jpg',
    palette: ['#1f2a20', '#efe6d4', '#6b5640', '#b49a63'],
    sections: [
      { title: 'The brief', text: 'SAKIN is a specialty coffee branding and packaging project. The identity was developed around calm, presence, and the everyday ritual of coffee.' },
      { title: 'The idea', text: 'The project presents coffee as a deliberate pause. “Sakin” — calm, still — is expressed through a grounded visual world that carries across Arabic and English touchpoints.' },
      { title: 'Identity', text: 'An English wordmark paired with Arabic calligraphy creates a bilingual system that feels distinct while staying closely connected across every application.' },
      { title: 'Type & colour', text: 'Deep forest green, warm cream, muted brown and a subtle gold create a restrained palette. Arabic and English typography work together throughout.', palette: true },
      { title: 'Art direction', text: 'Quiet and tactile: dark, warm environments, controlled contrast, and close attention to material, form, and the coffee ritual.' },
      { title: 'Applications', text: 'The system comes to life across cups, takeaway bags, menus, social media and packaging.' },
    ],
  },
  {
    slug: 'melh',
    name: 'Melh',
    nameAr: 'ملح',
    tagline: 'A contemporary Saudi dining identity, seasoned with cultural memory.',
    category: 'Restaurant Branding',
    industry: 'Hospitality — Saudi Arabia',
    year: 2025,
    services: ['Brand identity', 'Pattern system', 'Menu & packaging'],
    accent: '#5a1f26',
    cover: 'assets/work/melh.jpg',
    palette: ['#5a1f26', '#e9dcc6', '#1a1716', '#a5826a'],
    sections: [
      { title: 'The brief', text: 'MELH draws from Saudi warmth and visual culture while staying current and intentional.' },
      { title: 'Type & colour', text: 'A deep crimson inspired by Sadu weaving, set against warm sand and charcoal.', palette: true },
    ],
  },
  {
    slug: 'logofolio-26',
    name: 'Logofolio ’26',
    nameAr: 'شعارات',
    tagline: 'Twenty logotypes and marks — Arabic and English — redesigned.',
    category: 'Logo Design',
    industry: 'Personal project',
    year: 2026,
    services: ['Logotypes', 'Arabic lettering', 'Marks'],
    accent: '#2a2a28',
    cover: 'assets/work/logofolio.jpg',
    palette: ['#111111', '#f2f2f2'],
    sections: [
      { title: 'The brief', text: 'Twenty logo redesigns of well-known Egyptian and Gulf brands, created during Logojulio.' },
    ],
  },
  {
    slug: 'cozy-cup',
    name: 'Cozy Cup',
    nameAr: 'كوزي كب',
    tagline: 'A warm, playful identity for a neighbourhood coffee shop.',
    category: 'Brand Identity',
    industry: 'Coffee shop',
    year: 2024,
    services: ['Brand identity', 'Campaign', 'Social media'],
    accent: '#2e3a1c',
    cover: 'assets/work/cozy-cup.jpg',
    palette: ['#2e3a1c', '#efe7d6', '#8a6a3d'],
    sections: [
      { title: 'The brief', text: 'A coffee shop identity built to feel friendly, warm and instantly recognisable.' },
    ],
  },
  {
    slug: 'eman-hijab',
    name: 'Eman Hijab',
    nameAr: 'إيمان',
    tagline: 'A confident modest-fashion brand with Arabic lettering at its core.',
    category: 'Brand Identity',
    industry: 'Modest fashion',
    year: 2024,
    services: ['Brand identity', 'Arabic logotype', 'Campaign'],
    accent: '#26324a',
    cover: 'assets/work/eman-hijab.jpg',
    palette: ['#26324a', '#e8e2da', '#7f6f66'],
    sections: [
      { title: 'The brief', text: 'A modest fashion brand that needed a bold, expressive identity rooted in Arabic letterforms.' },
    ],
  },
];
