/* Slideshow: a "Slideshow" button under the battle's title that plays every picture of the reenactment (the intro slides,
   the chapters and the establishing pictures) with its caption and credit, one after another, full screen.
   Reads the page's scenario (window.<BATTLE>_SCENARIO): every `media` (one picture or a list) and `establishing`.
   Keys: ← → to step, space to pause, Esc to close. Glowing overlays (media.pulse) pulse as on the slides. */
(() => {
  'use strict';
  const key = Object.keys(window).find(k => /_SCENARIO$/.test(k) && window[k] && typeof window[k] === 'object');
  if (!key) return;
  const S = window[key], base = S.imageBase || 'images/', SECS = 7;

  function collect() {
    const out = [], seen = new Set();
    const add = (m, group) => { if (!m || !m.file || seen.has(m.file)) return; seen.add(m.file); out.push(Object.assign({ group }, m)); };
    (S.establishing || []).forEach(m => add({ file: m.file, caption: m.credit }, S.title || ''));
    const walk = (o, group, depth) => {
      if (!o || typeof o !== 'object' || depth > 6) return;
      if (Array.isArray(o)) { o.forEach(x => walk(x, group, depth + 1)); return; }
      const g = typeof o.title === 'string' ? o.title : group;
      if (o.media) [].concat(o.media).forEach(m => add(m, g));
      for (const k of Object.keys(o)) if (k !== 'media' && k !== 'units' && k !== 'leaders' && o[k] && typeof o[k] === 'object') walk(o[k], g, depth + 1);
    };
    ['intro', 'parts', 'campaign', 'events'].forEach(k => walk(S[k], '', 0));
    return out;
  }

  const css = document.createElement('style');
  css.textContent = `
  #ssBtn{display:inline-block;margin-top:6px;padding:4px 10px;border:1px solid #6b5a2e;border-radius:6px;background:#1a2530;color:#e9c77a;font:600 11px/1 system-ui,sans-serif;letter-spacing:.6px;text-transform:uppercase;cursor:pointer}
  #ssBtn:hover{background:#243442}
  #ss{position:fixed;inset:0;z-index:9000;background:rgba(4,9,13,.96);display:none;flex-direction:column;align-items:center;justify-content:center;padding:18px 18px 12px;gap:10px;color:#e8e2d0;font-family:system-ui,sans-serif}
  #ss.on{display:flex}
  #ss .ssPic{position:relative;flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center}
  #ss .ssPic img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;box-shadow:0 8px 40px rgba(0,0,0,.6);transition:opacity .4s}
  #ss .ssPic img.pulse{position:absolute;animation:ssbeat 1.6s ease-in-out infinite;pointer-events:none}
  @keyframes ssbeat{0%{opacity:0}18%{opacity:1}36%{opacity:.25}50%{opacity:1}70%{opacity:0}100%{opacity:0}}
  #ss .ssText{max-width:980px;width:100%;text-align:left}
  #ss .ssGroup{font:700 12px/1.2 Georgia,serif;letter-spacing:1px;text-transform:uppercase;color:#e9c77a}
  #ss .ssCap{font-size:14px;line-height:1.45;margin-top:4px}
  #ss .ssRef{font-size:11px;color:#9fb1b8;margin-top:4px}
  #ss .ssBar{display:flex;gap:8px;align-items:center}
  #ss .ssBar button{background:#16242e;color:#e8e2d0;border:1px solid #38505c;border-radius:6px;padding:6px 12px;font-size:13px;cursor:pointer}
  #ss .ssBar button:hover{background:#21333f}
  #ss .ssCount{font-size:12px;color:#9fb1b8;min-width:64px;text-align:center}
  #ss .ssProg{height:3px;width:min(980px,100%);background:#22343d;border-radius:2px;overflow:hidden}
  #ss .ssProg i{display:block;height:100%;width:0;background:#e9c77a}
  @media(max-width:700px){#ss .ssCap{font-size:13px}}`;
  document.head.appendChild(css);

  let list = [], i = 0, playing = true, t0 = 0, raf = 0, el;
  function build() {
    el = document.createElement('div'); el.id = 'ss';
    el.innerHTML = '<div class="ssPic"><img class="main" alt=""><img class="pulse" alt="" style="display:none"></div>' +
      '<div class="ssText"><div class="ssGroup"></div><div class="ssCap"></div><div class="ssRef"></div></div>' +
      '<div class="ssProg"><i></i></div>' +
      '<div class="ssBar"><button data-a="prev" title="Previous (←)">◀</button><button data-a="play" title="Pause or play (space)">⏸</button>' +
      '<span class="ssCount"></span><button data-a="next" title="Next (→)">▶</button><button data-a="close" title="Close (Esc)">✕ Close</button></div>';
    document.body.appendChild(el);
    el.querySelector('.ssBar').addEventListener('click', e => { const a = e.target.dataset && e.target.dataset.a; if (a) act(a); });
    el.querySelector('.ssPic').addEventListener('click', () => act('next'));
    addEventListener('keydown', e => {
      if (!el.classList.contains('on')) return;
      if (e.key === 'Escape') act('close'); else if (e.key === 'ArrowRight') act('next'); else if (e.key === 'ArrowLeft') act('prev');
      else if (e.key === ' ') act('play'); else return;
      e.preventDefault(); e.stopPropagation();
    }, true);
  }
  function show() {
    const m = list[i], main = el.querySelector('img.main'), pulse = el.querySelector('img.pulse');
    main.style.opacity = 0; main.onload = () => { main.style.opacity = 1; }; main.src = base + m.file;
    if (m.pulse) { pulse.src = base + m.pulse; pulse.style.display = 'block'; } else { pulse.style.display = 'none'; pulse.removeAttribute('src'); }
    el.querySelector('.ssGroup').textContent = m.group || '';
    el.querySelector('.ssCap').textContent = m.caption || '';
    el.querySelector('.ssRef').textContent = [m.ref, m.credit].filter(Boolean).join(' · ');
    el.querySelector('.ssCount').textContent = (i + 1) + ' / ' + list.length;
    t0 = performance.now();
  }
  function tick(now) {
    if (!el.classList.contains('on')) return;
    const f = playing ? Math.min(1, (now - t0) / (SECS * 1000)) : null;
    if (f !== null) { el.querySelector('.ssProg i').style.width = (f * 100) + '%'; if (f >= 1) { i = (i + 1) % list.length; show(); } }
    raf = requestAnimationFrame(tick);
  }
  function act(a) {
    if (a === 'next') { i = (i + 1) % list.length; show(); }
    else if (a === 'prev') { i = (i - 1 + list.length) % list.length; show(); }
    else if (a === 'play') { playing = !playing; el.querySelector('[data-a=play]').textContent = playing ? '⏸' : '▶ Play'; t0 = performance.now(); if (!playing) el.querySelector('.ssProg i').style.width = '0'; }
    else if (a === 'close') { el.classList.remove('on'); cancelAnimationFrame(raf); }
  }
  function open() {
    list = collect(); if (!list.length) return;
    if (!el) build();
    i = 0; playing = true; el.querySelector('[data-a=play]').textContent = '⏸';
    el.classList.add('on'); show(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    try { document.querySelectorAll('audio').forEach(a => { if (!a.paused) a.pause(); }); } catch (e) {}
  }

  function place() {
    if (!collect().length || document.getElementById('ssBtn')) return;
    const brand = document.querySelector('#dlTitle .brand') || document.querySelector('header .brand');
    if (!brand) return;
    const b = document.createElement('button'); b.id = 'ssBtn'; b.type = 'button'; b.textContent = '🖼 Slideshow';
    b.title = 'Every picture of this battle, with its caption, one after another';
    b.onclick = open;
    brand.parentElement.appendChild(b);
  }
  // after desktop.js has moved the title into the left sidebar
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', () => setTimeout(place, 0)); else setTimeout(place, 0);
})();
