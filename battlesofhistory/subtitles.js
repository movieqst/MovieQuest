/* Movie-style subtitles for tablets: the narration box is replaced by two small lines along the bottom of the map
   that follow the narrator sentence by sentence. Tap them to open the full text with its confidence tags.
   On by default on touch tablets; anywhere, ?subs=1 turns it on and ?subs=0 off (remembered in this browser).
   Shared by every battle: it reads the page's own caption and intro text, so no engine changes are needed. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const panel = $('battlePanel'); if (!panel) return;
  const q = new URLSearchParams(location.search).get('subs');
  try { if (q === '1' || q === '0') localStorage.setItem('bh-subs', q); } catch (e) {}
  let pref = q; try { if (pref === null) pref = localStorage.getItem('bh-subs'); } catch (e) {}
  const tablet = () => matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) >= 600;
  const on = () => pref === '1' || (pref !== '0' && tablet());
  if (!on()) return;
  document.body.classList.add('subs');

  const css = document.createElement('style');
  css.textContent = `
  #subs{position:absolute;left:50%;bottom:80px;transform:translateX(-50%);z-index:6;width:min(900px,calc(100% - 24px));padding:5px 12px 6px;
    background:rgba(0,0,0,.72);border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,.4);text-align:center;cursor:pointer;display:none;-webkit-tap-highlight-color:transparent}
  #subs.show{display:block}
  #subs .st{font:600 10px 'Cinzel',Georgia,serif;letter-spacing:.06em;color:var(--gold,#e9c77a);opacity:.85;margin-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  #subs .sl{font-size:13px;line-height:1.35;color:#f4f1e8;text-shadow:0 1px 2px #000;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.7em}
  #subs .sh{font-size:9px;color:#9fb1b8;opacity:.8;margin-top:1px}
  body.subs:not(.subsopen) #caption{display:none!important}
  body.subs:not(.subsopen):not(.choice) #intro.started .dialog.intro{display:none}
  body.subsopen #subs{display:none}`;
  document.head.appendChild(css);

  const box = document.createElement('div'); box.id = 'subs';
  box.innerHTML = '<div class="st"></div><div class="sl"></div><div class="sh">tap for the full text</div>';
  panel.appendChild(box);
  const closeOpen = () => document.body.classList.remove('subsopen');
  box.addEventListener('click', () => document.body.classList.add('subsopen'));
  // Tapping the opened caption or intro text (but not a tag or button in it) closes it again.
  ['caption', 'intro'].forEach(id => $(id) && $(id).addEventListener('click', e => { if (document.body.classList.contains('subsopen') && !e.target.closest('button,a')) closeOpen(); }));

  const plain = el => { if (!el) return ''; const c = el.cloneNode(true); c.querySelectorAll('button,.chip').forEach(b => b.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
  const sentences = t => (t.match(/[^.!?]+[.!?]+["”’)]*|[^.!?]+$/g) || [t]).map(s => s.trim()).filter(Boolean);
  const vis = el => el && el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden';

  let key = '', parts = [], weights = [], t0 = 0, shown = -1;
  function source() {
    const intro = $('intro');
    if (intro && intro.classList.contains('show')) {
      const started = $('startGate') && $('startGate').style.display === 'none';
      intro.classList.toggle('started', started);
      if (!started || document.body.classList.contains('choice')) return null;
      return { title: [$('introKicker') && $('introKicker').textContent, $('introTitle') && $('introTitle').textContent].filter(Boolean).join(' · '), text: plain($('introLines')) };
    }
    const cap = $('caption');
    if (cap && cap.classList.contains('show')) return { title: $('capTitle') ? $('capTitle').textContent : '', text: plain($('capText')) };
    return null;
  }
  function tick() {
    const s = source();
    if (!s || !s.text) { box.classList.remove('show'); key = ''; return requestAnimationFrame(tick); }
    const k = s.title + '|' + s.text;
    if (k !== key) { key = k; parts = sentences(s.text); const tot = parts.reduce((n, p) => n + p.length, 0) || 1; let acc = 0; weights = parts.map(p => (acc += p.length) / tot); t0 = performance.now(); shown = -1; box.querySelector('.st').textContent = s.title; closeOpen(); }
    // Progress through the text: the narrator's clip when one is playing, otherwise reading speed (about 15 characters a second).
    let f;
    const a = typeof Narr !== 'undefined' && Narr.audio;
    if (a && a.duration && isFinite(a.duration)) f = a.currentTime / a.duration;
    else f = (performance.now() - t0) / 1000 * 15 / (parts.reduce((n, p) => n + p.length, 0) || 1);
    let i = weights.findIndex(w => f < w); if (i < 0) i = parts.length - 1;
    if (i !== shown) { shown = i; box.querySelector('.sl').textContent = parts[i]; }
    box.classList.add('show');
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
