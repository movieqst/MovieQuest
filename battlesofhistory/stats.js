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

  // Visit count, small in a bottom corner ("128 VISITS"), like roughdrafter.com: on the home page, the home page and
  // every battle page added together; on any other page (a battle, the library, the gallery), that page's own visits.
  // Battle pages put it at the end of the top bar. Hidden until GoatCounter answers.
  const views = async path => {
    try { const r = await fetch('https://' + CODE + '.goatcounter.com/counter/' + encodeURIComponent(path) + '.json'); if (!r.ok) return 0;
      const d = await r.json(); return Number(String(d.count || '0').replace(/[^\d]/g, '')) || 0; } catch (e) { return 0; }
  };
  const show = async () => {
    const here = pathFor(), home = here === '/battlesofhistory/';
    let n;
    if (home) { const folders = (window.BATTLES || []).map(b => b.folder);
      n = (await Promise.all([here].concat(folders.map(f => '/battlesofhistory/' + f + '/')).map(views))).reduce((a, b) => a + b, 0); }
    else n = await views(here);
    if (!n) return;
    const battle = !!document.getElementById('battle');
    const el = document.createElement('div'); el.id = 'visits'; el.textContent = n.toLocaleString('en-US') + ' visits';
    el.title = home ? 'Visits to Battles of History' : 'Visits to this page';
    const top = battle && document.querySelector('header .top-actions'), bar = battle && document.querySelector('footer .bhbar');
    if (top) {   // battle pages: at the end of the top bar (the buttons that "Controls" shows and hides)
      el.style.cssText = 'align-self:center;margin-left:6px;padding:3px 7px;border:1px solid #2a3e48;border-radius:5px;font:600 10px/1 system-ui,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#a9bac0;white-space:nowrap;';
      top.appendChild(el);
    } else if (bar) {   // no top bar: in the bottom bar, just left of the Library link
      el.style.cssText = 'align-self:center;font:600 10px/1 system-ui,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#8fa1a8;white-space:nowrap;';
      bar.insertBefore(el, bar.firstChild);
    } else {
      el.style.cssText = 'position:fixed;left:10px;bottom:8px;z-index:50;pointer-events:none;font:600 9px/1 system-ui,sans-serif;letter-spacing:.6px;text-transform:uppercase;color:#6f8691;';
      document.body.appendChild(el);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
