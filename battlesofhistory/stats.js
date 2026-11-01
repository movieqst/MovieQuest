/* Page-view counting for Battles of History, with GoatCounter (goatcounter.com): no cookies, no personal data.
   Views go to the same counter as moviequest.ca (https://moviequest.goatcounter.com), and every page is recorded as
   /battlesofhistory/<page> whichever address it was opened from (moviequest.ca/battlesofhistory or
   battlesofhistory.com), so each battle shows up as its own line in the dashboard. The library and the gallery keep
   their ?battle=... so each battle's library counts separately. Set CODE to '' to turn counting off. */
(() => {
  'use strict';
  const CODE = 'moviequest';
  if (!CODE || /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname) || location.protocol === 'file:') return;
  const pathFor = () => {
    let p = location.pathname, i = p.indexOf('/battlesofhistory/');
    let rest = i >= 0 ? p.slice(i + '/battlesofhistory/'.length) : p.replace(/^\/+/, '');
    rest = rest.replace(/(^|\/)index\.html$/, '$1');
    const b = new URLSearchParams(location.search).get('battle');
    return '/battlesofhistory/' + rest + (b ? '?battle=' + encodeURIComponent(b) : '');
  };
  window.goatcounter = Object.assign(window.goatcounter || {}, { path: pathFor });
  const s = document.createElement('script');
  s.async = true; s.src = 'https://gc.zgo.at/count.js'; s.dataset.goatcounter = 'https://' + CODE + '.goatcounter.com/count';
  document.head.appendChild(s);

  // On the Battles of History home page: the running total of visits to Battles of History pages, small in the
  // bottom-left corner ("128 VISITS"), like roughdrafter.com. It adds up the home page and each battle's page (the same
  // names the counting above records). Hidden until GoatCounter answers, and if nothing has been counted yet.
  if (!/\/battlesofhistory\/$/.test(pathFor())) return;
  const views = async path => {
    try { const r = await fetch('https://' + CODE + '.goatcounter.com/counter/' + encodeURIComponent(path) + '.json'); if (!r.ok) return 0;
      const d = await r.json(); return Number(String(d.count || '0').replace(/[^\d]/g, '')) || 0; } catch (e) { return 0; }
  };
  const show = async () => {
    const folders = (window.BATTLES || []).map(b => b.folder);
    const counts = await Promise.all(['/battlesofhistory/'].concat(folders.map(f => '/battlesofhistory/' + f + '/')).map(views));
    const n = counts.reduce((a, b) => a + b, 0); if (!n) return;
    const el = document.createElement('div'); el.id = 'visits'; el.textContent = n.toLocaleString('en-US') + ' visits';
    el.style.cssText = 'position:fixed;left:10px;bottom:8px;z-index:50;pointer-events:none;font:600 9px/1 system-ui,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#6f8691;';
    document.body.appendChild(el);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
