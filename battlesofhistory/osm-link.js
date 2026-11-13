/* "📍 The place today": a link in the bar at the bottom of each battle page (.bhbar) that opens OpenStreetMap at the
   battlefield, with a marker, so readers can see where it is today. The position comes from the battle's card in
   battles.js (lat, lon; optional osmZoom, default 13; optional osmNote, e.g. 'the exact site is not known'). One place to
   correct a position: the card. Map data © OpenStreetMap contributors (openstreetmap.org/copyright). */
(() => {
  'use strict';
  const bar = document.querySelector('.bhbar'); if (!bar) return;
  const m = location.pathname.match(/\/([^\/]+)\/(?:index\.html)?$/); if (!m) return;
  const folder = decodeURIComponent(m[1]);
  const add = () => {
    const b = (window.BATTLES || []).find(x => x.folder === folder); if (!b || typeof b.lat !== 'number' || typeof b.lon !== 'number') return;
    const z = b.osmZoom || 13, lat = b.lat.toFixed(5), lon = b.lon.toFixed(5);
    const a = document.createElement('a');
    a.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${z}/${lat}/${lon}`;
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = '📍 The place today';
    a.title = 'Open the battlefield on OpenStreetMap (approximate position' + (b.osmNote ? ': ' + b.osmNote : '') + '). Map data © OpenStreetMap contributors.';
    bar.appendChild(a);
  };
  if (window.BATTLES) add();
  else { const s = document.createElement('script'); s.src = '../battles.js'; s.onload = add; document.head.appendChild(s); }
})();
