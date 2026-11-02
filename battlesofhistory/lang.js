/* Battles of History: the language switch (English / Français / 中文 …), shared by every battle.
   Load it after the battle's scenario.js and its lang-xx.js files, and before engine.js:
     <script src="scenario.js"></script> <script src="lang-fr.js"></script> <script src="../lang.js"></script> <script src="engine.js"></script>
   A battle offers a language when it has window.<BATTLE>_LANG.<code> (e.g. WATERLOO_LANG.fr, TALAS_LANG.zh), shaped like
   the scenario: the same lists in the same order, holding only the translated text. The choice comes from ?lang=xx, or
   the last choice in this browser; the page reloads to switch. The translated voices' clips live in audio/<voice id>/.
   The page's own buttons and menus are translated from the dictionary below (UI), as they appear. */
(() => {
  'use strict';
  const SKEY = Object.keys(window).find(k => /_SCENARIO$/.test(k)); if (!SKEY) return;
  const S = window[SKEY], LANGS = window[SKEY.replace(/_SCENARIO$/, '_LANG')] || {};
  const codes = Object.keys(LANGS); if (!codes.length) return;
  let want = new URLSearchParams(location.search).get('lang'); try { if (!want) want = localStorage.getItem('bh-lang'); } catch (e) {}
  const lang = LANGS[want] ? want : 'en';
  window.BH_LANG = lang;

  /* ---- the scenario's text, replaced in place, item by item ---- */
  const L = LANGS[lang];
  const set = (o, k, v) => { if (o && v !== undefined && v !== null && v !== '') o[k] = v; };
  const each = (arr, tr, fn) => { if (Array.isArray(arr) && Array.isArray(tr)) arr.forEach((x, i) => { if (tr[i] !== undefined) fn(x, tr[i], i); }); };
  if (L) {
    ['title', 'date', 'place', 'tagline', 'sides', 'welcome', 'subtitle'].forEach(k => { if (typeof L[k] === 'string') set(S, k, L[k]); });
    if (L.titleCard && S.titleCard) Object.keys(L.titleCard).forEach(k => set(S.titleCard, k, L.titleCard[k]));
    if (L.confidence && S.confidence) Object.keys(L.confidence).forEach(k => { const c = S.confidence[k], t = L.confidence[k]; if (!c || !t) return; if (typeof t === 'string') set(c, 'label', t); else { set(c, 'label', t.label); set(c, 'desc', t.desc); } });
    if (L.tags && S.confidence) Object.keys(L.tags).forEach(k => S.confidence[k] && set(S.confidence[k], 'label', L.tags[k]));
    each(S.intro, L.intro, (sl, t) => {
      set(sl, 'title', t.title); set(sl, 'subtitle', t.subtitle);
      each(sl.lines, t.lines, (ln, tx) => set(ln, 'text', typeof tx === 'string' ? tx : tx.text));
      each(sl.media, t.media, (m, tx) => set(m, 'caption', typeof tx === 'string' ? tx : tx.caption));
    });
    const evs = (list, tr) => each(list, tr, (e, t) => { ['title', 'text', 'explain', 'clock'].forEach(k => set(e, k, t[k])); if (e.media && t.media) set(e.media, 'caption', typeof t.media === 'string' ? t.media : t.media.caption); });
    evs(S.events, L.events);
    if (S.campaign && L.campaign) { set(S.campaign, 'title', L.campaign.title); set(S.campaign, 'subtitle', L.campaign.subtitle); evs(S.campaign.events, L.campaign.events); }
    if (S.parts && L.parts) each(S.parts, L.parts, (p, t) => { set(p, 'title', t.title); set(p, 'subtitle', t.subtitle); evs(p.events, t.events); });
    each(S.outcome, L.outcome, (o, t) => set(o, 'text', typeof t === 'string' ? t : t.text));
    if (L.commandLines && S.commandLines) Object.keys(L.commandLines).forEach(k => set(S.commandLines, k, L.commandLines[k]));
    if (L.debrief && S.debrief) Object.keys(L.debrief).forEach(side => S.debrief[side] && Object.keys(L.debrief[side]).forEach(r => { const d = S.debrief[side][r], t = L.debrief[side][r]; if (d && t) { set(d, 'title', t.title); set(d, 'text', t.text); } }));
    each(S.units, L.units, (u, t) => { Object.keys(t).forEach(k => typeof u[k] === 'string' && set(u, k, t[k])); each(u.lines, t.lines, (ln, tx) => set(ln, 'text', typeof tx === 'string' ? tx : tx.text)); });
    if (L.leaders && S.leaders) [S.leaders, S.campaign && S.campaign.leaders].forEach(ls => (ls || []).forEach(l => set(l, 'name', L.leaders[l.id])));
    if (L.sides && S.sides) Object.keys(L.sides).forEach(k => S.sides[k] && set(S.sides[k], 'name', typeof L.sides[k] === 'string' ? L.sides[k] : L.sides[k].name));
    if (L.citations && S.citations) Object.keys(L.citations).forEach(k => { const c = S.citations[k], t = L.citations[k]; if (c && t) { set(c, 'title', t.title); set(c, 'intro', t.intro); } });
    if (L.formations) [S.formations, S.campaign && S.campaign.formations].forEach(fs => (fs || []).forEach(f => { const t = L.formations[f.id]; if (t) ['name', 'division', 'count', 'note'].forEach(k => set(f, k, t[k])); }));
    if (S.battlefield && S.battlefield.labels && L.labels) each(S.battlefield.labels, L.labels, (l, t) => set(l, 'text', typeof t === 'string' ? t : t.text));
    each(S.library, L.library, (b, t) => set(b, 'about', typeof t === 'string' ? t : t.about));
    each(S.library, L.libraryDetails, (b, t) => t && Object.keys(t).forEach(k => typeof b[k] === 'string' && set(b, k, t[k])));
    each(S.sources, L.sources, (s, t) => set(s, 'note', typeof t === 'string' ? t : t.note));
    if (L.scaleLabel && S.battlefield && S.battlefield.scale) set(S.battlefield.scale, 'label', L.scaleLabel);
    // the opening part on its own map (Waterloo's campaign): towns, formations, the markers chapters put on the map
    if (S.campaign && L.campaign) {
      each(S.campaign.towns, L.campaign.towns, (t, n) => set(t, 'name', typeof n === 'string' ? n : n.name));
      if (L.campaign.formations) (S.campaign.formations || []).forEach(f => { const t = L.campaign.formations[f.id]; if (t) ['name', 'division', 'count', 'note'].forEach(k => set(f, k, t[k])); });
      each(S.campaign.events, L.campaign.events, (e, t) => each(e.markers, t.markers, (m, n) => set(m, 'label', typeof n === 'string' ? n : n.label)));
    }
    // the computer's captions in command mode
    if (S.ai && S.ai.plans && L.ai) Object.keys(L.ai).forEach(side => each(S.ai.plans[side], L.ai[side], (st, t) => { if (t && st.caption) { set(st.caption, 'title', t.title); set(st.caption, 'text', t.text); } }));
    if (L.voices) S.voices = L.voices;               // the translated narrators (audio/<id>/…)
    document.documentElement.lang = lang;
  }

  /* ---- the switch: a button in the top bar ---- */
  const NAMES = Object.assign({ en: 'English' }, ...codes.map(c => ({ [c]: LANGS[c].name || c })));
  const go = c => { try { localStorage.setItem('bh-lang', c); } catch (e) {} const u = new URL(location.href); u.searchParams.set('lang', c); location.href = u.toString(); };
  addEventListener('DOMContentLoaded', () => {
    const bar = document.querySelector('.topbar .right, header .right, .topbar, header'); if (!bar) return;
    const sel = document.createElement('select'); sel.id = 'langSel'; sel.title = lang === 'fr' ? 'Langue' : 'Language';
    sel.style.cssText = 'margin-left:6px;font:inherit;font-size:12px;padding:3px 4px;border-radius:7px;background:#0c1921;color:#e8f0ea;border:1px solid #2c4656';
    sel.innerHTML = ['en', ...codes].map(c => `<option value="${c}"${c === lang ? ' selected' : ''}>${NAMES[c]}</option>`).join('');
    sel.onchange = () => go(sel.value);
    bar.appendChild(sel);
  });

  /* ---- the page's own words: buttons, menus, panels ---- */
  if (lang === 'en') return;
  const UI = (window.BH_UI || {})[lang] || {};
  const PAT = (window.BH_UI_PATTERNS || {})[lang] || [];
  if (!Object.keys(UI).length && !PAT.length) return;
  const tr = t => {
    const s = t.trim(); if (!s) return null;
    if (UI[s] !== undefined) return t.replace(s, UI[s]);
    for (const [re, f] of PAT) { const m = s.match(re); if (m) return t.replace(s, typeof f === 'function' ? f(...m) : s.replace(re, f)); }
    return null;
  };
  const ATTR = ['title', 'placeholder', 'aria-label', 'data-label'];
  const walk = root => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { const p = n.parentNode; if (p && /^(SCRIPT|STYLE)$/.test(p.nodeName)) continue; const v = tr(n.nodeValue); if (v !== null && v !== n.nodeValue) n.nodeValue = v; }
    (root.querySelectorAll ? [root, ...root.querySelectorAll('*')] : []).forEach(el => ATTR.forEach(a => { if (!el.getAttribute) return; const v0 = el.getAttribute(a); if (v0) { const v = tr(v0); if (v !== null && v !== v0) el.setAttribute(a, v); } }));
  };
  let busy = false;
  const mo = new MutationObserver(ms => { if (busy) return; busy = true; try { ms.forEach(m => { if (m.type === 'characterData') { const v = tr(m.target.nodeValue); if (v !== null && v !== m.target.nodeValue) m.target.nodeValue = v; } else if (m.type === 'attributes') walk(m.target); else m.addedNodes.forEach(nd => nd.nodeType === 3 ? (() => { const v = tr(nd.nodeValue); if (v !== null && v !== nd.nodeValue) nd.nodeValue = v; })() : nd.nodeType === 1 && walk(nd)); }); } finally { busy = false; } });
  addEventListener('DOMContentLoaded', () => { document.title = tr(document.title) || document.title; walk(document.body); mo.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTR }); });
})();
