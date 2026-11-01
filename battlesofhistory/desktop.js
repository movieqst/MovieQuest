/* Desktop layout for a battle page (computers and wide screens; phones and tablets keep their own layouts):
     left sidebar   the photo-and-notes slideshow, then the whole narration as text (scroll it, click a chapter to jump)
     centre         the map, clear of everything but the scale bar; under it the play bar (timeline, pause, FF, skip)
                    and the caption box, tall enough for three lines of the narration being read
     right sidebar  the minimap on top, then the armies, briefing and the rest as before
     top bar        the map buttons (zoom, whole map, fullscreen, art) to the left of Intro / Watch
   It only moves the page's own elements, so the engine keeps working unchanged. Opt in per page with
   <script src="../desktop.js"></script> after engine.js. ?layout=classic turns it off. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  if (new URLSearchParams(location.search).get('layout') === 'classic') return;
  const main = document.querySelector('main'), panel = $('battlePanel'), right = document.querySelector('aside.side');
  if (!main || !panel || !right) return;
  const wide = () => innerWidth >= 1100 && !document.body.classList.contains('phone') && !document.body.classList.contains('subs');
  if (!wide()) return;
  document.body.classList.add('dl');

  const css = document.createElement('style');
  css.textContent = `
  body.dl main{grid-template-columns:300px minmax(0,1fr) 300px}
  body.dl #dlLeft{display:flex;flex-direction:column;gap:10px;min-height:0;overflow:hidden}
  body.dl #dlCenter{display:flex;flex-direction:column;gap:8px;min-height:0;min-width:0}
  body.dl #dlCenter:fullscreen{background:#05090c;padding:10px}
  body.dl .battle-panel{flex:1;min-height:300px}
  /* the map stays clear: no HUD on it */
  body.dl #minimap-wrap{position:static;width:auto;opacity:1;padding:0;background:none;border:0;backdrop-filter:none}
  body.dl #minimap{height:auto;aspect-ratio:300/212}
  body.dl #mmCard .tiny{margin-top:4px}
  /* map buttons in the top bar */
  body.dl #zoomBox{position:static;opacity:1;display:flex;gap:4px}
  body.dl #zoomBox button{padding:6px 9px}
  /* play bar under the map */
  body.dl #dlBar{display:flex;align-items:center;gap:8px;min-height:38px}
  body.dl #timeline{position:relative;left:auto;right:auto;bottom:auto;flex:1;min-width:120px}
  body.dl[data-mode="intro"] #timeline{display:none}
  body.dl #ctrlStrip{position:static;opacity:1;margin-left:auto;background:#091720;border-color:#435a64}
  body.dl[data-mode="intro"] #ctrlStrip{margin-left:0;flex:1;justify-content:center}
  /* caption box under the map: three lines of the narration */
  body.dl #dlText{position:relative;background:#091720;border:1px solid #435a64;border-radius:9px;min-height:104px;max-height:132px;overflow:auto;padding:0}
  body.dl #caption{position:static;transform:none;width:auto;display:block;background:none;border:0;border-radius:0;padding:8px 40px 8px 14px;backdrop-filter:none}
  body.dl #caption:not(.show){visibility:hidden}
  body.dl #capText{font-size:15px;line-height:1.5;margin:3px 0 4px}
  body.dl #capTitle{font-size:15px}
  body.dl #capX{display:none}
  body.dl #intro{position:static;display:none;padding:0;background:none}
  body.dl #intro.show{display:block}
  body.dl #intro .dialog.intro{width:auto;max-width:none;max-height:none;margin:0;padding:8px 14px;background:none;border:0;border-radius:0;box-shadow:none}
  body.dl #intro .dialog.intro h1{font-size:20px;margin:0}
  body.dl #introLines p{font-size:15px;line-height:1.5;margin:3px 0}
  body.dl #introX,body.dl #viewTextBtn{display:none!important}
  body.dl.choice .dialog.intro{max-width:none}
  body.dl[data-mode="intro"] #caption{display:none}
  body.dl:not([data-mode="intro"]) #intro{display:none!important}
  /* left sidebar: slideshow card, then the narration */
  body.dl #dlLeft .card{flex-shrink:0}
  body.dl:not([data-mode="intro"]) #mediaCard{display:none}
  body.dl #narrCard{flex:1;min-height:160px;display:flex;flex-direction:column}
  body.dl #narrList{flex:1;overflow:auto;padding-right:4px;font-size:12px;line-height:1.5;color:#bfccd0}
  body.dl #narrList .ni{padding:6px 8px;border-radius:6px;border:1px solid transparent;cursor:pointer;margin-bottom:4px}
  body.dl #narrList .ni:hover{background:#112430;border-color:#354c57}
  body.dl #narrList .ni.on{background:#14324a;border-color:#4c94c7;color:#edf1ed}
  body.dl #narrList .ni b{display:block;font:600 12px 'Cinzel',Georgia,serif;color:var(--gold);letter-spacing:.03em;margin-bottom:2px}
  body.dl #narrList .ni .t{font:11px ui-monospace,monospace;color:#8fa1a8;float:right}
  body.dl #narrList h5{margin:10px 0 4px;font:600 11px system-ui;letter-spacing:.08em;text-transform:uppercase;color:#8fa1a8}`;
  document.head.appendChild(css);

  // ---- columns
  const left = document.createElement('aside'); left.id = 'dlLeft';
  const center = document.createElement('div'); center.id = 'dlCenter';
  main.insertBefore(left, panel); main.insertBefore(center, panel); center.appendChild(panel);
  // play bar and caption box under the map
  const bar = document.createElement('div'); bar.id = 'dlBar';
  const tl = $('timeline'), strip = $('ctrlStrip');
  if (tl) bar.appendChild(tl); if (strip) bar.appendChild(strip);
  center.appendChild(bar);
  const text = document.createElement('div'); text.id = 'dlText';
  ['caption', 'intro'].forEach(id => { const el = $(id); if (el) text.appendChild(el); });
  center.appendChild(text);
  // map buttons into the top bar, left of Intro / Watch
  const top = document.querySelector('.top-actions'), zoom = $('zoomBox');
  if (top && zoom) { const sep = document.createElement('span'); sep.className = 'sep'; top.insertBefore(sep, top.firstChild); top.insertBefore(zoom, sep); }
  // minimap to the top of the right sidebar
  const mmw = $('minimap-wrap');
  if (mmw) { const card = document.createElement('section'); card.className = 'card'; card.id = 'mmCard'; card.innerHTML = '<h2>Battlefield map</h2>'; card.appendChild(mmw); right.insertBefore(card, right.firstChild); }
  // slideshow to the left sidebar
  const media = $('mediaCard'); if (media) left.appendChild(media);
  // fullscreen takes the map with its play bar and captions
  const fs = $('fsBtn');
  if (fs) fs.addEventListener('click', e => {
    e.stopImmediatePropagation();
    if (document.fullscreenElement) document.exitFullscreen && document.exitFullscreen(); else if (center.requestFullscreen) center.requestFullscreen().catch(() => {});
  }, true);

  // ---- the whole narration, as text, in the left sidebar
  const S = window[Object.keys(window).find(k => /_SCENARIO$/.test(k))];
  if (S) {
    const card = document.createElement('section'); card.className = 'card'; card.id = 'narrCard';
    card.innerHTML = '<h2>Narration</h2><div id="narrList"></div>'; left.appendChild(card);
    const list = card.querySelector('#narrList'), esc = t => String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const fmt = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    let html = '<h5>Introduction</h5>';
    (S.intro || []).forEach((sl, i) => { html += `<div class="ni" data-k="i${i}"><b>${esc(sl.title)}</b>${(sl.lines || []).map(l => esc(l.text)).join(' ')}</div>`; });
    html += '<h5>The reenactment</h5>';
    (S.events || []).forEach((ev, i) => { html += `<div class="ni" data-k="e${i}"><span class="t">${fmt(ev.t)}</span><b>${esc(ev.title)}</b>${esc(ev.text)}</div>`; });
    list.innerHTML = html;
    const mark = key => { list.querySelectorAll('.ni.on').forEach(n => n.classList.remove('on')); const n = list.querySelector(`[data-k="${key}"]`); if (!n) return;
      n.classList.add('on'); const r = n.offsetTop - list.offsetTop; if (r < list.scrollTop || r > list.scrollTop + list.clientHeight - 60) list.scrollTo({ top: r - 30, behavior: 'smooth' }); };
    const introIndex = () => { const m = ($('introKicker') || {}).textContent; const k = m && m.match(/(\d+)\s*\/\s*\d+/); return k ? +k[1] - 1 : -1; };
    const sync = () => {
      if (document.body.dataset.mode === 'intro') { const i = introIndex(); if (i >= 0) mark('i' + i); return; }
      const t = ($('capTitle') || {}).textContent, i = (S.events || []).findIndex(ev => ev.title === t); if (i >= 0) mark('e' + i);
    };
    ['introKicker', 'capTitle'].forEach(id => { const el = $(id); if (el) new MutationObserver(sync).observe(el, { childList: true, characterData: true, subtree: true }); });
    new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['data-mode'] });
    // click a chapter to go there: in the introduction step back or forward; in the reenactment jump on the timeline
    list.addEventListener('click', e => {
      const n = e.target.closest('.ni'); if (!n) return; const k = n.dataset.k, idx = +k.slice(1);
      if (k[0] === 'e') { const b = document.querySelectorAll('#eventList .ev')[idx]; if (document.body.dataset.mode === 'intro') { const w = $('chooseWatch'); if (w) w.click(); setTimeout(() => { const b2 = document.querySelectorAll('#eventList .ev')[idx]; if (b2) b2.click(); }, 50); } else if (b) b.click(); return; }
      if (document.body.dataset.mode !== 'intro') { const ib = $('introBtn'); if (ib) ib.click(); return; }
      let cur = introIndex(), guard = 20; while (cur !== idx && guard--) { $(cur < idx ? 'introNext' : 'introBack').click(); cur = introIndex(); }
    });
    sync();
  }
  // the map panel changed size: let the engine refit it
  dispatchEvent(new Event('resize'));
})();
