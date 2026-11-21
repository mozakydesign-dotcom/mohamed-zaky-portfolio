/* =========================================================
   CONTACT FORM
   The form sends briefs through Web3Forms (free).
   To connect it: get an access key at https://web3forms.com
   (enter the email that should receive briefs) and paste it below.
   The key is safe to keep in the website code — it only allows sending to you.
   ========================================================= */
const CONTACT = {
  web3formsKey: '',               // ← paste your Web3Forms access key here
  fallback: 'https://www.instagram.com/mozakydesign/',
};

(() => {
  const form = $('#briefForm');
  if (!form) return;
  const status = $('#formStatus');
  const button = $('.send', form);
  const say = (msg, kind) => { status.textContent = msg; status.className = 'form-status ' + (kind || ''); };

  form.addEventListener('input', e => {
    e.target.closest('.field')?.classList.remove('invalid');
    if (status.classList.contains('err')) say('');
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.botcheck.checked) return;

    // validate required fields
    let firstBad = null;
    ['name', 'email', 'message'].forEach(n => {
      const el = form[n];
      const ok = el.value.trim() && (n !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.closest('.field').classList.toggle('invalid', !ok);
      if (!ok && !firstBad) firstBad = el;
    });
    if (firstBad) { say('Please fill in your name, a valid email and a few words about the project.', 'err'); firstBad.focus(); return; }

    const data = new FormData(form);
    const services = data.getAll('services').join(', ') || '—';
    const payload = {
      access_key: CONTACT.web3formsKey,
      subject: `New project brief — ${data.get('company') || data.get('name')}`,
      from_name: 'Portfolio website',
      name: data.get('name'),
      email: data.get('email'),
      company: data.get('company') || '—',
      whatsapp: data.get('phone') || '—',
      services,
      budget: data.get('budget') || '—',
      timeline: data.get('timeline') || '—',
      message: data.get('message'),
    };

    if (!CONTACT.web3formsKey) {
      say('The form isn’t connected yet — please message me on Instagram for now.', 'err');
      setTimeout(() => window.open(CONTACT.fallback, '_blank', 'noopener'), 1200);
      return;
    }

    button.disabled = true; say('Sending…');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || 'Failed');
      const first = String(payload.name).split(' ')[0];
      form.innerHTML = `<div class="brief-done"><h3>Thank you, ${first.replace(/[<>&"']/g, '')}.</h3><p>Your brief is in. I’ll reply within 48 hours.</p></div>`;
    } catch (err) {
      button.disabled = false;
      say('Something went wrong sending the brief. Please try again, or message me on Instagram.', 'err');
    }
  });
})();
