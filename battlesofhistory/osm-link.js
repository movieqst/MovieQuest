// "The place today": a link in the bottom bar, and a small present-day map under the battlefield map (before the armies).
// The small map is built from OpenStreetMap tiles; a click opens OpenStreetMap in a new tab.
// battles.js gives each battle lat/lon and osmZoom; where the site is not known, osmArea (km) draws the possible area and
// osmSites lists the proposed sites, and the map widens to show them all.
(() => {
  'use strict';
  const m = location.pathname.match(/\/([^\/]+)\/(?:index\.html)?$/); if (!m) return;
  const folder = decodeURIComponent(m[1]);
  const T = 256, lon2x = (lon, z) => (lon + 180) / 360 * T * 2 ** z,
    lat2y = (lat, z) => { const r = lat * Math.PI / 180; return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * T * 2 ** z; };
  const osmUrl = (lat, lon, z) => `https://www.openstreetmap.org/?mlat=${lat.toFixed(5)}&mlon=${lon.toFixed(5)}#map=${z}/${lat.toFixed(5)}/${lon.toFixed(5)}`;

  const card = b => {
    const army = document.getElementById('armies'); const before = army && army.closest('section'); if (!before) return;
    const sites = (b.osmSites || []).map(s => ({ lat: s[0], lon: s[1], name: s[2] }));
    const pts = sites.length ? sites : [{ lat: b.lat, lon: b.lon }];
    // one possible area: a ring around all the proposed sites (at least osmArea km wide)
    const km = (p, q) => Math.hypot((p.lat - q.lat) * 111.2, (p.lon - q.lon) * 111.2 * Math.cos(p.lat * Math.PI / 180));
    const ctr = { lat: pts.reduce((t, p) => t + p.lat, 0) / pts.length, lon: pts.reduce((t, p) => t + p.lon, 0) / pts.length };
    const area = b.osmArea ? Math.max(b.osmArea, Math.max(...pts.map(p => km(p, ctr))) + 3) : 0, unsure = !!(area || sites.length);
    const ring = area ? [ctr] : [];
    const sec = document.createElement('section'); sec.className = 'card'; sec.id = 'osmCard';
    sec.innerHTML = '<h2>The place today</h2>';
    const a = document.createElement('a'); a.id = 'osmMini'; a.target = '_blank'; a.rel = 'noopener';
    a.title = 'Click to open this place on OpenStreetMap' + (b.osmNote ? ' (' + b.osmNote + ')' : '');
    const cap = document.createElement('div'); cap.className = 'tiny osmCap';
    sec.appendChild(a); sec.appendChild(cap); before.before(sec);
    const st = document.createElement('style');
    st.textContent = `#osmMini{display:block;position:relative;overflow:hidden;height:150px;border-radius:6px;border:1px solid #2c4350;background:#aad3df;cursor:pointer}
      #osmMini img{position:absolute;width:256px;height:256px;max-width:none;pointer-events:none;filter:saturate(.8)}
      #osmMini svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
      #osmMini .hint{position:absolute;right:4px;bottom:4px;background:rgba(10,18,22,.75);color:#dfe8ec;font-size:11px;padding:1px 6px;border-radius:4px}
      #osmMini:hover{outline:2px solid #e8c063}
      #osmCard .osmCap{margin-top:4px;line-height:1.35}
      #osmCard .osmCap a{color:#e8c063}`;
    document.head.appendChild(st);

    const draw = () => {
      const W = a.clientWidth || 280, H = 150, pad = 18;
      // the widest zoom that still shows every site and the whole possible area
      let z = Math.min(b.osmZoom || 13, 15);
      const fits = z => { let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
        [...pts.map(p => [p, 0]), ...ring.map(p => [p, area])].forEach(([p, km]) => { const x = lon2x(p.lon, z), y = lat2y(p.lat, z), r = km * 1000 / (156543.03 * Math.cos(p.lat * Math.PI / 180) / 2 ** z);
          x0 = Math.min(x0, x - r); x1 = Math.max(x1, x + r); y0 = Math.min(y0, y - r); y1 = Math.max(y1, y + r); });
        return { ok: x1 - x0 <= W - 2 * pad && y1 - y0 <= H - 2 * pad, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 }; };
      let f = fits(z); while (!f.ok && z > 2) f = fits(--z);
      const ox = f.cx - W / 2, oy = f.cy - H / 2, n = 2 ** z;
      a.textContent = '';
      for (let tx = Math.floor(ox / T); tx <= Math.floor((ox + W) / T); tx++)
        for (let ty = Math.floor(oy / T); ty <= Math.floor((oy + H) / T); ty++) {
          if (ty < 0 || ty >= n) continue;
          const img = new Image(); img.alt = ''; img.loading = 'lazy'; img.referrerPolicy = 'strict-origin-when-cross-origin'; img.onerror = () => { img.style.visibility = 'hidden'; };
          img.src = `https://tile.openstreetmap.org/${z}/${((tx % n) + n) % n}/${ty}.png`;
          img.style.left = (tx * T - ox) + 'px'; img.style.top = (ty * T - oy) + 'px'; a.appendChild(img);
        }
      const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
      const el = (t, at) => { const e = document.createElementNS(ns, t); for (const k in at) e.setAttribute(k, at[k]); svg.appendChild(e); return e; };
      ring.forEach(p => { const r = area * 1000 / (156543.03 * Math.cos(p.lat * Math.PI / 180) / n);
        el('circle', { cx: lon2x(p.lon, z) - ox, cy: lat2y(p.lat, z) - oy, r, fill: 'rgba(200,40,40,.12)', stroke: '#c0392b', 'stroke-width': 2, 'stroke-dasharray': '6 4' }); });
      pts.forEach((p, i) => { const x = lon2x(p.lon, z) - ox, y = lat2y(p.lat, z) - oy;
        el('circle', { cx: x, cy: y, r: 6, fill: '#d0312d', stroke: '#fff', 'stroke-width': 2 });
        if (sites.length > 1) { const t = el('text', { x, y: y + 3.5, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: '#fff' }); t.textContent = i + 1; } });
      a.appendChild(svg);
      const h = document.createElement('span'); h.className = 'hint'; h.textContent = 'Open the full map ↗'; a.appendChild(h);
      // OpenStreetMap opens on the same view, with a marker on the first (most often proposed) site
      const c = sites.length ? sites[0] : { lat: b.lat, lon: b.lon };
      const vlon = f.cx / (T * n) * 360 - 180, vlat = Math.atan(Math.sinh(Math.PI * (1 - 2 * f.cy / (T * n)))) * 180 / Math.PI;
      a.href = `https://www.openstreetmap.org/?mlat=${c.lat.toFixed(5)}&mlon=${c.lon.toFixed(5)}#map=${Math.max(z, 3)}/${vlat.toFixed(5)}/${vlon.toFixed(5)}`;
    };
    // the caption: what the marks mean, and the credit OpenStreetMap asks for
    cap.textContent = '';
    const add = (txt, tag) => { const e = document.createElement(tag || 'span'); e.textContent = txt; cap.appendChild(e); return e; };
    if (unsure) {
      add(sites.length > 1 ? 'The exact site is not known. Proposed sites:' : (area ? 'Approximate site: the exact place is not known; the dashed ring shows the possible area.' : 'Approximate site.'), 'div');
      if (sites.length > 1) sites.forEach((s, i) => add((i + 1) + '. ' + s.name, 'div'));
      if (sites.length > 1 && area) add('The dashed ring shows the possible area.', 'div');
    } else if (b.osmNote) add('Approximate: ' + b.osmNote + '.', 'div');
    const cr = add('Map data © ', 'div'); const l = document.createElement('a'); l.href = 'https://www.openstreetmap.org/copyright'; l.target = '_blank'; l.rel = 'noopener'; l.textContent = 'OpenStreetMap contributors'; l.style.color = '#e8c063'; cr.appendChild(l);
    requestAnimationFrame(draw);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(draw, 300); });
  };

  const link = b => {
    const bar = document.querySelector('.bhbar'); if (!bar) return;
    const z = b.osmZoom || 13, a = document.createElement('a');
    a.href = osmUrl(b.lat, b.lon, z); a.target = '_blank'; a.rel = 'noopener'; a.textContent = '📍 The place today';
    a.title = 'Open the battlefield on OpenStreetMap (approximate position' + (b.osmNote ? ': ' + b.osmNote : '') + '). Map data © OpenStreetMap contributors.';
    bar.appendChild(a);
  };

  const go = () => {
    const b = (window.BATTLES || []).find(x => x.folder === folder); if (!b || typeof b.lat !== 'number' || typeof b.lon !== 'number') return;
    link(b); card(b);
  };
  if (window.BATTLES) go();
  else { const s = document.createElement('script'); s.src = '../battles.js'; s.onload = go; document.head.appendChild(s); }
})();
