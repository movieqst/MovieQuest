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
  // Loaded early (right after scenario.js), before the big map data, so the page shows this layout while it loads.
  // phone.js and subtitles.js run later, so their own on/off tests are repeated here.
  const pref = (k, n) => { let v = new URLSearchParams(location.search).get(k); try { if (v === null) v = localStorage.getItem(n); } catch (e) {} return v; };
  const coarse = matchMedia('(pointer: coarse)').matches, small = Math.min(screen.width, screen.height) < 600;
  const phoneOn = () => { const v = pref('phone', 'bh-phone'); return v === '1' || (v !== '0' && coarse && small); };
  const subsOn = () => { const v = pref('subs', 'bh-subs'); return v === '1' || (v !== '0' && (coarse && !small || phoneOn())); };
  const wide = () => innerWidth >= 1100 && !phoneOn() && !subsOn() && !document.body.classList.contains('phone') && !document.body.classList.contains('subs');
  if (!wide()) return;
  document.body.classList.add('dl', 'dlwait');
  // until the engine has run (it loads after the map data), its playback and art buttons would show in the wrong state
  addEventListener('DOMContentLoaded', () => document.body.classList.remove('dlwait'));

  const css = document.createElement('style');
  css.textContent = `
  body.dl main{grid-template-columns:300px minmax(0,1fr) 300px}
  body.dlwait #dlBar,body.dlwait #artBtn{visibility:hidden}
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
  /* playback buttons (pause, FF, skip, clock, armies; Back / Next in the introduction) in the top bar; the timeline under the map */
  body.dl header>div:first-child{flex:none}
  body.dl .top-actions{flex:1;justify-content:flex-end;flex-wrap:wrap;row-gap:4px;min-width:0}
  body.dl header{flex-wrap:nowrap}
  body.dl .brand{font-size:clamp(15px,1.3vw,24px);white-space:nowrap}
  body.dl #clock{padding:0 2px;font-size:12px}
  /* top of the right sidebar: back to the battles + show/hide the top bar, then the minimap; they stay in view
     while the rest of the right sidebar scrolls under them */
  body.dl #dlRightTop{display:flex;flex-direction:column;gap:8px;background:#071017;padding-bottom:2px;flex-shrink:0}
  body.dl #dlNav{display:flex;gap:6px}
  body.dl #dlNav>*{flex:1;text-align:center;padding:7px 6px;font-size:12px;border:1px solid #526873;border-radius:6px;background:#172a36;color:#f2f4ef;font-weight:600;text-decoration:none;white-space:nowrap}
  body.dl #dlNav>*:hover{filter:brightness(1.18)}
  body.dl #dlNav>#fsBtn,body.dl #dlNav>#voiceWrap{flex:none}
  body.dl #dlNav>#voiceWrap{padding:0;border:0;background:none;display:flex}
  body.dl #dlNav #voiceMenuBtn{padding:7px 8px;font-size:12px;white-space:nowrap}
  body.dl #dlNav #voicePop{right:auto;left:50%;transform:translateX(-50%);top:38px}
  body.dl #dlNav>a.home,body.dl #dlNav>#dlHideTop{flex:1 1 0;min-width:0;overflow:hidden;text-overflow:ellipsis}
  body.dl #mmCard{box-shadow:none}
  /* the right sidebar: buttons and minimap fixed at the top, everything below scrolls on its own */
  body.dl aside.side{overflow:hidden}
  /* framed like the Narration card on the left, with its scrollbar inside the frame */
  body.dl #dlRScroll{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:0;padding:4px 6px 4px 0;
    background:var(--panel,#101f29);border:1px solid var(--line,#38505c);border-radius:9px}
  body.dl #dlRScroll>.card{background:none;border:0;border-radius:0;box-shadow:none;margin:0;border-bottom:1px solid #22343d;flex-shrink:0}
  body.dl #dlRScroll>.card:last-child{border-bottom:0}
  body.dl #dlRScroll,body.dl #narrList{scrollbar-width:thin;scrollbar-color:#4b6370 transparent}
  /* the armies are in the sidebar, so no Armies button up top; the big play button never covers an open unit card */
  body.dl #armiesBtn{display:none}
  body.unitopen #playBig,body.unitopen #playGame{visibility:hidden}
  /* the battle's title at the top of the left sidebar */
  body.dl #dlTitle{flex-shrink:0;padding:2px 4px 0}
  body.dl #dlTitle .brand{font-size:clamp(18px,1.7vw,26px);white-space:normal;line-height:1.15}
  body.dl #dlTitle .subtitle{max-width:none;white-space:normal;overflow:visible;display:block}
  body.dl header{justify-content:flex-end}
  body.dl.hidetop header,body.dl.hidetop footer{display:none}
  /* fullscreen: the picture-and-notes slideshow sits top-left of the map */
  body.dl #fsMediaWrap{left:12px;right:auto}
  body.dl #dlBar{display:flex;align-items:center;gap:6px;flex:none}
  body.dl #timeline{position:relative;left:auto;right:auto;bottom:auto;flex:none;height:22px}
  body.dl[data-mode="intro"] #timeline{display:none}
  body.dl #ctrlStrip{position:static;opacity:1;background:none;border:0;padding:0;backdrop-filter:none;display:flex;gap:4px;flex:none}
  body.dl #ctrlStrip button,body.dl .top-actions button,body.dl .top-actions a.home{padding:5px 7px;font-size:11.5px}
  body.dl #ctrlStrip .hud-home{display:none}
  body.dl .top-actions button,body.dl .top-actions a,body.dl #clock{white-space:nowrap}
  body.dl .top-actions{gap:4px}
  body.dl .top-actions .sep{margin:0 2px}
  body.dl #dlCenter:fullscreen #dlBar{margin:0 0 8px}
  /* closed captions under the map: the sentence being spoken, large, as on television */
  body.dl #dlText{position:relative;background:#05090c;border:1px solid #2c3f49;border-radius:9px;min-height:112px;display:flex;flex-direction:column;justify-content:center;padding:8px 48px;text-align:center}
  body.dl #cc .ct{font:600 12px 'Cinzel',Georgia,serif;letter-spacing:.06em;color:var(--gold);opacity:.85;margin-bottom:4px}
  body.dl #cc .cl{font-size:19px;line-height:1.45;color:#f4f1e8;max-height:calc(3 * 1.45em);overflow:hidden}
  body.dl #ccBulb{position:absolute;right:10px;top:10px}
  body.dl #caption,body.dl #intro,body.dl #viewTextBtn{display:none!important}
  /* left sidebar: slideshow card, then the narration */
  body.dl #dlLeft .card{flex-shrink:0}
  body.dl:not([data-mode="intro"]) #mediaCard.dlshow{display:block!important}
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
  // play bar in the top bar; closed-caption box under the map (the engine's own caption and intro panels stay, hidden,
  // so their buttons and text keep working)
  const bar = document.createElement('div'); bar.id = 'dlBar';
  const tl = $('timeline'), strip = $('ctrlStrip');
  if (strip) bar.appendChild(strip);
  if (tl) center.appendChild(tl);   // the timeline stays under the map, above the captions
  const text = document.createElement('div'); text.id = 'dlText';
  text.innerHTML = '<div id="cc"><div class="ct"></div><div class="cl"></div></div><button id="ccBulb" class="bulb" title="Pause and explain this moment (E)">\ud83d\udca1</button>';
  ['caption', 'intro', 'viewTextBtn'].forEach(id => { const el = $(id); if (el) text.appendChild(el); });
  center.appendChild(text);
  text.querySelector('#ccBulb').onclick = () => { const b = $('capExplain'); if (b) b.click(); };
  // map buttons into the top bar, left of Intro / Watch
  const top = document.querySelector('.top-actions'), zoom = $('zoomBox');
  if (top && zoom) { const sep = document.createElement('span'); sep.className = 'sep'; top.insertBefore(sep, top.firstChild); top.insertBefore(zoom, sep); }
  if (top) top.insertBefore(bar, top.firstChild);
  // shorter link back to the list of battles, so the top bar fits on one line
  [['watchBtn', '\u25b6 Watch', 'Watch the reenactment'], ['commandBtn', '\u2694 Command', 'Take command']].forEach(([id, t, title]) => { const b = $(id); if (b) { b.textContent = t; b.title = title; } });
  // minimap to the top of the right sidebar
  const mmw = $('minimap-wrap');
  const rtop = document.createElement('div'); rtop.id = 'dlRightTop'; right.insertBefore(rtop, right.firstChild);
  const nav = document.createElement('div'); nav.id = 'dlNav'; rtop.appendChild(nav);
  const homeLink = top && top.querySelector(':scope > a.home');
  if (homeLink) { homeLink.textContent = '\u25c0 Battles'; homeLink.title = 'Back to Battles of History'; nav.appendChild(homeLink); top.querySelectorAll('.sep').forEach((sp, i, all) => { if (i === all.length - 1) sp.remove(); }); }
  // Full and Voice sit between "Battles of History" and "Hide controls", so they stay reachable with the top bar hidden
  { const fsb = $('fsBtn'), vw = $('voiceWrap'); if (fsb) nav.appendChild(fsb); if (vw) nav.appendChild(vw); }
  const hide = document.createElement('button'); hide.id = 'dlHideTop'; nav.appendChild(hide);
  let hidden = false; try { hidden = localStorage.getItem('bh-hidetop') === '1'; } catch (e) {}
  const setHidden = h => { hidden = h; document.body.classList.toggle('hidetop', h); hide.textContent = h ? '\u25be Controls' : '\u25b4 Controls'; hide.title = h ? 'Show the buttons along the top' : 'Hide the buttons along the top for a bigger map'; try { localStorage.setItem('bh-hidetop', h ? '1' : '0'); } catch (e) {} dispatchEvent(new Event('resize')); };
  hide.onclick = () => setHidden(!hidden); setHidden(hidden);
  if (mmw) { const card = document.createElement('section'); card.className = 'card'; card.id = 'mmCard'; card.innerHTML = '<h2>Battlefield map</h2>'; card.appendChild(mmw); rtop.appendChild(card); }
  // everything else in the right sidebar goes into its own scrolling area below the minimap
  { const sc = document.createElement('div'); sc.id = 'dlRScroll'; [...right.children].forEach(ch => { if (ch !== rtop) sc.appendChild(ch); }); right.appendChild(sc); }
  // the battle's title moves to the top of the left sidebar
  const titleBox = document.querySelector('header > div:first-child');
  if (titleBox && !titleBox.classList.contains('top-actions')) { titleBox.id = 'dlTitle'; left.insertBefore(titleBox, left.firstChild); }
  // slideshow to the left sidebar
  const media = $('mediaCard'); if (media) left.appendChild(media);
  // fullscreen takes the map with its play bar and captions
  const fs = $('fsBtn');
  if (fs) fs.addEventListener('click', e => {
    e.stopImmediatePropagation();
    if (document.fullscreenElement) document.exitFullscreen && document.exitFullscreen(); else if (center.requestFullscreen) center.requestFullscreen().catch(() => {});
  }, true);
  // in fullscreen the play bar comes along, above the map
  document.addEventListener('fullscreenchange', () => { if (document.fullscreenElement === center) center.insertBefore(bar, center.firstChild); else if (top && bar.parentElement !== top) top.insertBefore(bar, top.firstChild); });

  // ---- picture framing: a scenario picture can say which part to keep when it is cropped to fit, e.g. pos: '50% 12%'
  //      keeps the top (a face) of a tall portrait. Applies to the slideshow picture wherever it is shown.
  { const SC = window[Object.keys(window).find(k => /_SCENARIO$/.test(k))], pos = {};
    if (SC) [].concat(...(SC.intro || []).map(sl => sl.media || [])).concat(SC.media || []).forEach(m => { if (m && m.file && m.pos) pos[m.file] = m.pos; });
    const fit = el => { if (!el) return; const f = decodeURIComponent((el.getAttribute('src') || '').split('/').pop()); el.style.objectPosition = pos[f] || ''; };
    ['introImg', 'bigPhotoImg'].forEach(id => { const el = $(id); if (el) { fit(el); new MutationObserver(() => fit(el)).observe(el, { attributes: true, attributeFilter: ['src'] }); } }); }
  // ---- closed captions: follow the narrator sentence by sentence (as subtitles.js does on tablets)
  {
    const ct = text.querySelector('.ct'), cl = text.querySelector('.cl'), bulb = text.querySelector('#ccBulb');
    const plain = el => { if (!el) return ''; const c = el.cloneNode(true); c.querySelectorAll('button,.chip').forEach(b => b.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
    const sentences = t => (t.match(/[^.!?]+[.!?]+["\u201d\u2019)]*|[^.!?]+$/g) || [t]).map(x => x.trim()).filter(Boolean);
    let key = '', parts = [], weights = [], t0 = 0, shown = -1;
    const source = () => {
      const intro = $('intro');
      if (document.body.dataset.mode === 'intro') {
        if (!intro || !intro.classList.contains('show')) return null;
        if ($('startGate') && $('startGate').style.display !== 'none') return null;
        return { title: $('introTitle') ? $('introTitle').textContent : '', text: plain($('introLines')) };
      }
      const cap = $('caption');
      return cap && cap.classList.contains('show') ? { title: $('capTitle') ? $('capTitle').textContent : '', text: plain($('capText')) } : null;
    };
    const tick = () => {
      const src = source();
      bulb.style.display = document.body.dataset.mode === 'watch' && src ? '' : 'none';
      if (!src || !src.text) { if (key) { ct.textContent = ''; cl.textContent = ''; key = ''; } return requestAnimationFrame(tick); }
      const k = src.title + '|' + src.text;
      if (k !== key) { key = k; parts = sentences(src.text); const tot = parts.reduce((n, p) => n + p.length, 0) || 1; let acc = 0; weights = parts.map(p => (acc += p.length) / tot); t0 = performance.now(); shown = -1; ct.textContent = src.title; }
      const a = window.BattlePage && window.BattlePage.Narr && window.BattlePage.Narr.audio;
      const f = a && a.duration && isFinite(a.duration) ? a.currentTime / a.duration : (performance.now() - t0) / 1000 * 15 / (parts.reduce((n, p) => n + p.length, 0) || 1);
      let i = weights.findIndex(w => f < w); if (i < 0) i = parts.length - 1;
      if (i !== shown) { shown = i; cl.textContent = parts[i]; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ---- during the reenactment the slideshow keeps going: every picture from the introduction in turn, about 12 s each
  {
    const SC = window[Object.keys(window).find(k => /_SCENARIO$/.test(k))], card = $('mediaCard');
    const pics = SC ? [].concat(...(SC.intro || []).map(sl => sl.media || [])) : [];
    let k = -1, last = 0;
    const show = i => { const m = pics[i], base = (SC.imageBase || 'images/'), img = $('introImg'), ph = $('introPh');
      if (!m || !img) return; img.classList.remove('show'); if (ph) ph.classList.remove('show');
      img.onload = () => img.classList.add('show'); img.onerror = () => { if (ph) ph.classList.add('show'); }; img.src = base + m.file;
      if ($('introCap')) $('introCap').textContent = m.caption || ''; if ($('introRef')) $('introRef').textContent = [m.ref, m.credit].filter(Boolean).join(' \u00b7 '); };
    if (card && pics.length) setInterval(() => {
      const watching = document.body.dataset.mode !== 'intro';
      card.classList.toggle('dlshow', watching);
      if (!watching) { k = -1; return; }
      const now = Date.now(); if (k < 0 || now - last > 12000) { k = (k + 1) % pics.length; last = now; show(k); }
    }, 500);
  }

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
