/* Home-page globe: every battle as a pin at its place. Drag to turn it; it turns slowly on its own until touched.
   Click a pin: the globe turns to the battle and a small card shows its picture, title and date, with a button to open it.
   Gold pins: ready battles; hollow pins: in progress. Needs home-world.js (land outlines) and battles.js (lat, lon). */
(() => {
  'use strict';
  const cv = document.getElementById('globe'); if (!cv) return;
  const ctx = cv.getContext('2d'), card = document.getElementById('gcard'), D = Math.PI / 180;
  const LAND = window.HOME_WORLD || [], B = (window.BATTLES || []).filter(b => typeof b.lat === 'number');
  const esc = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
  let lon0 = 20, lat0 = 25, Z = 1, ZT = 1, target = null, sel = null, hover = null, idle = true, lastUser = 0;
  // pins that sit very close together (Batoche and Fish Creek) are fanned out a little so both can be clicked
  const PINS = B.map(b => ({ b, lat: b.lat, lon: b.lon, dx: 0, dy: 0 }));
  PINS.forEach((p, i) => PINS.forEach((q, j) => { if (j <= i) return; if (Math.abs(p.lat - q.lat) < 1.2 && Math.abs(p.lon - q.lon) < 1.6) { p.dy -= 9; q.dy += 9; } }));

  function size() {
    const r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx = W / 2; cy = H / 2;
  }
  const R0 = () => Math.min(W, H) * .44;
  // orthographic projection: x, y on screen and whether the point faces the viewer
  function proj(lat, lon) {
    const la = lat * D, lo = (lon - lon0) * D, c0 = Math.cos(lat0 * D), s0 = Math.sin(lat0 * D);
    const x = Math.cos(la) * Math.sin(lo), y = c0 * Math.sin(la) - s0 * Math.cos(la) * Math.cos(lo), z = s0 * Math.sin(la) + c0 * Math.cos(la) * Math.cos(lo);
    return { x: cx + R * x, y: cy - R * y, z };
  }
  function draw() {
    R = R0() * Z;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    // glow and ocean
    const glow = ctx.createRadialGradient(cx, cy, R * .9, cx, cy, R * 1.18); glow.addColorStop(0, 'rgba(110,180,255,.35)'); glow.addColorStop(1, 'rgba(110,180,255,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * 1.18, 0, 7); ctx.fill();
    const sea = ctx.createRadialGradient(cx - R * .35, cy - R * .35, R * .1, cx, cy, R); sea.addColorStop(0, '#2f7fb4'); sea.addColorStop(1, '#123f62');
    ctx.fillStyle = sea; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
    // land: points behind the globe are pushed to its edge, so each shape is cut off cleanly at the horizon
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
    ctx.fillStyle = '#6f8f55'; ctx.strokeStyle = 'rgba(30,50,25,.8)'; ctx.lineWidth = .7;
    LAND.forEach(r => {
      let vis = 0; const pts = r.map(([lo, la]) => { const p = proj(la, lo); if (p.z > 0) vis++; else { const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1; p.x = cx + dx / d * R; p.y = cy + dy / d * R; } return p; });
      if (!vis) return; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath(); ctx.fill(); ctx.stroke();
    });
    // a soft shade toward the edge, for roundness
    const sh = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .2, cx, cy, R); sh.addColorStop(0, 'rgba(255,255,255,.10)'); sh.addColorStop(.7, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.45)');
    ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); ctx.restore();
    // pins
    PINS.forEach(p => { const q = proj(p.lat, p.lon); p.sx = q.x + p.dx; p.sy = q.y + p.dy; p.vis = q.z > .05; });
    PINS.filter(p => p.vis).sort((a, b) => a.sy - b.sy).forEach(p => {
      const ready = p.b.status === 'ready', on = p === sel || p === hover, r = on ? 8 : 6;
      ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(p.sx, p.sy - 14); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(p.sx, p.sy - 14 - r, r, 0, 7); ctx.shadowColor = '#000'; ctx.shadowBlur = 6;
      if (ready) { ctx.fillStyle = on ? '#ffe39a' : '#e9c77a'; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = '#5a4310'; ctx.lineWidth = 1.5; ctx.stroke(); }
      else { ctx.fillStyle = 'rgba(10,22,32,.85)'; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = on ? '#ffe39a' : '#c9b48a'; ctx.lineWidth = 2; ctx.stroke(); }
      if (on) { ctx.font = "600 13px 'Cinzel', Georgia, serif"; ctx.textAlign = 'center'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.strokeText(p.b.title, p.sx, p.sy - 34 - r); ctx.fillStyle = '#ffe9b0'; ctx.fillText(p.b.title, p.sx, p.sy - 34 - r); }
    });
  }
  function showCard(p) {
    if (!card) return; if (!p) { card.classList.remove('show'); return; } const b = p.b, ready = b.status === 'ready';
    card.innerHTML = `<button class="x" aria-label="Close">✕</button><div class="th" style="background-image:url('${esc(b.folder)}/${esc(b.cover)}')${b.coverPos ? ';background-position:' + esc(b.coverPos) : ''}"></div>
      <div class="tx"><b>${esc(b.title)}</b><span>${esc(b.date)}</span><span class="pl">${esc(b.place)}</span>
      <a class="open" href="${esc(b.folder)}/index.html">${ready ? 'Open the battle ▶' : 'In progress: have a look ▸'}</a></div>`;
    card.querySelector('.x').onclick = () => { sel = null; showCard(null); }; card.classList.add('show');
  }
  function pinAt(x, y) { let best = null, bd = 16; PINS.forEach(p => { if (!p.vis) return; const d = Math.hypot(p.sx - x, p.sy - 20 - y); if (d < bd) { bd = d; best = p; } }); return best; }
  // dragging turns the globe; a click without a drag picks a pin
  let drag = null;
  cv.addEventListener('pointerdown', e => { const r = cv.getBoundingClientRect(); drag = { x: e.clientX, y: e.clientY, lon: lon0, lat: lat0, moved: false, px: e.clientX - r.left, py: e.clientY - r.top }; cv.setPointerCapture(e.pointerId); idle = false; lastUser = performance.now(); target = null; });
  cv.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (drag) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.hypot(dx, dy) > 4) drag.moved = true; lon0 = drag.lon - dx / R * 60; lat0 = Math.max(-80, Math.min(80, drag.lat + dy / R * 60)); lastUser = performance.now(); }
    else { const h = pinAt(x, y); if (h !== hover) { hover = h; cv.style.cursor = h ? 'pointer' : 'grab'; cv.title = h ? h.b.title + ' · ' + h.b.date : ''; } }
  });
  cv.addEventListener('pointerup', e => { const d = drag; drag = null; if (!d || d.moved) return; const p = pinAt(d.px, d.py); sel = p; showCard(p);
    if (p) { target = { lon: p.lon, lat: Math.max(-40, Math.min(70, p.lat)) };   // a crowded spot (western Europe): zoom in so its pins separate
      const near = PINS.filter(q => q !== p && Math.abs(q.lat - p.lat) < 6 && Math.abs(q.lon - p.lon) < 8).length; if (near >= 2 && ZT < 3) ZT = 3.2; } });
  // zoom: the mouse wheel, pinch on a touch screen, or the + / - buttons
  cv.addEventListener('wheel', e => { e.preventDefault(); ZT = Math.max(1, Math.min(6, ZT * (e.deltaY < 0 ? 1.15 : 1 / 1.15))); lastUser = performance.now(); idle = false; }, { passive: false });
  const touches = new Map(); let pinch = 0;
  cv.addEventListener('pointerdown', e => { touches.set(e.pointerId, e); if (touches.size === 2) { const [a, b] = [...touches.values()]; pinch = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); drag = null; } });
  cv.addEventListener('pointermove', e => { if (!touches.has(e.pointerId)) return; touches.set(e.pointerId, e); if (touches.size === 2 && pinch) { const [a, b] = [...touches.values()], d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); ZT = Math.max(1, Math.min(6, ZT * d / pinch)); pinch = d; } });
  ['pointerup', 'pointercancel'].forEach(t => cv.addEventListener(t, e => { touches.delete(e.pointerId); if (touches.size < 2) pinch = 0; }));
  const zb = document.getElementById('gzoom'); if (zb) zb.onclick = e => { const k = e.target.dataset.z; if (!k) return; ZT = k === 'fit' ? 1 : Math.max(1, Math.min(6, ZT * (k === 'in' ? 1.5 : 1 / 1.5))); if (k === 'fit') { sel = null; showCard(null); } };
  cv.addEventListener('pointerleave', () => { hover = null; });
  function tick(t) {
    Z += (ZT - Z) * .12;
    if (target) { let dl = ((target.lon - lon0 + 540) % 360) - 180; lon0 += dl * .08; lat0 += (target.lat - lat0) * .08; if (Math.abs(dl) < .05 && Math.abs(target.lat - lat0) < .05) target = null; }
    else if (!drag && !sel && Z < 1.3 && (idle || t - lastUser > 6000)) lon0 += .04;   // a slow turn when nobody is using it
    draw(); requestAnimationFrame(tick);
  }
  window.addEventListener('resize', size); size(); requestAnimationFrame(tick);
})();
