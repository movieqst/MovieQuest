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
})();
