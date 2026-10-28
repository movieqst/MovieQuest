/* Opening shot: the Earth from space, two slow turns, then a dive to the Orontes.
   Orthographic projection drawn by hand on a 2D canvas; land from world.js. */
window.KadeshGlobe = (() => {
  'use strict';
  const D = Math.PI / 180, KADESH = { lon: 36.52, lat: 34.56 };
  const RINGS = (window.KADESH_WORLD && window.KADESH_WORLD.rings) || [];
  // Pre-computed per ring: Float32 arrays of lon(rad), cos(lat), sin(lat), plus a lon/lat bounding box.
  const PRE = RINGS.map(r => {
    const n = r.length, lon = new Float32Array(n), cl = new Float32Array(n), sl = new Float32Array(n);
    let x0 = 999, x1 = -999, y0 = 999, y1 = -999;
    for (let i = 0; i < n; i++) { const [x, y] = r[i]; lon[i] = x * D; cl[i] = Math.cos(y * D); sl[i] = Math.sin(y * D); if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return { n, lon, cl, sl, box: [x0, y0, x1, y1] };
  });
  const LABELS = [
    { lon: 30.5, lat: 27, text: 'EGYPT', size: 1 }, { lon: 34, lat: 39.5, text: 'HATTI', size: 1 }, { lon: 22, lat: 34.5, text: 'MEDITERRANEAN SEA', size: .7, italic: true },
    { lon: 31.2, lat: 30.0, text: 'Memphis', size: .55, dot: true }, { lon: 34.6, lat: 40.0, text: 'Hattusa', size: .55, dot: true }, { lon: 37.15, lat: 36.2, text: 'Aleppo', size: .55, dot: true },
    { lon: 36.52, lat: 34.56, text: 'KADESH', size: .85, pin: true }
  ];
  let cv, c, w, h, raf = 0, stars = [], cb = {}, st = null, t0 = 0, lastT = 0, dpr = 1;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const jit = (i, k) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
  function size() {
    const r = cv.parentElement.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.floor(r.width * dpr); cv.height = Math.floor(r.height * dpr); w = r.width; h = r.height; c.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = []; for (let i = 0; i < 420; i++) stars.push({ x: jit(i, 1) * w, y: jit(i, 2) * h, r: .4 + jit(i, 3) * 1.4, p: jit(i, 4) * 6.28 });
  }
  function draw(s, now) {
    const R = s.R, cx = w / 2 + s.ox, cy = h / 2 + s.oy, lon0 = s.lon0 * D, lat0 = s.lat0 * D, sin0 = Math.sin(lat0), cos0 = Math.cos(lat0);
    c.clearRect(0, 0, w, h);
    // space
    const bg = c.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#02050c'); bg.addColorStop(1, '#070d1c'); c.fillStyle = bg; c.fillRect(0, 0, w, h);
    stars.forEach(sx => { c.globalAlpha = .45 + .55 * Math.abs(Math.sin(now * .9 + sx.p)); c.fillStyle = '#eaf2ff'; c.beginPath(); c.arc(sx.x, sx.y, sx.r, 0, 6.283); c.fill(); }); c.globalAlpha = 1;
    // atmosphere
    const at = c.createRadialGradient(cx, cy, R * .98, cx, cy, R * 1.16); at.addColorStop(0, 'rgba(120,180,255,.55)'); at.addColorStop(.5, 'rgba(90,150,240,.18)'); at.addColorStop(1, 'rgba(60,110,200,0)');
    c.fillStyle = at; c.beginPath(); c.arc(cx, cy, R * 1.16, 0, 6.283); c.fill();
    // ocean
    const oc = c.createRadialGradient(cx - R * .35, cy - R * .35, R * .1, cx, cy, R); oc.addColorStop(0, '#2a6f9e'); oc.addColorStop(.6, '#164a72'); oc.addColorStop(1, '#0a2744');
    c.fillStyle = oc; c.beginPath(); c.arc(cx, cy, R, 0, 6.283); c.fill();
    c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 6.283); c.clip();
    // graticule
    c.strokeStyle = 'rgba(200,230,255,.10)'; c.lineWidth = 1;
    for (let la = -75; la <= 75; la += 15) { c.beginPath(); let pen = false; for (let lo = -180; lo <= 180; lo += 3) { const p = proj(lo * D, Math.cos(la * D), Math.sin(la * D)); if (p) { pen ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); pen = true; } else pen = false; } c.stroke(); }
    for (let lo = -180; lo < 180; lo += 15) { c.beginPath(); let pen = false; for (let la = -90; la <= 90; la += 3) { const p = proj(lo * D, Math.cos(la * D), Math.sin(la * D)); if (p) { pen ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); pen = true; } else pen = false; } c.stroke(); }
    // land: cull rings far outside the visible cap when zoomed in
    const halfDiag = Math.hypot(w, h) / 2, capDeg = R > halfDiag ? Math.asin(Math.min(1, halfDiag / R)) / D + 3 : 999;
    const lonW = capDeg / Math.max(.2, cos0);
    c.fillStyle = s.R > 1200 ? '#6b7f4e' : '#587443'; c.strokeStyle = 'rgba(25,45,25,.7)'; c.lineWidth = Math.min(1.5, .3 + R / 4000);
    for (let k = 0; k < PRE.length; k++) {
      const g = PRE[k];
      if (capDeg < 999) { const [x0, y0, x1, y1] = g.box; if (y1 < s.lat0 - capDeg || y0 > s.lat0 + capDeg || x1 < s.lon0 - lonW || x0 > s.lon0 + lonW) continue; }
      c.beginPath(); let any = false;
      for (let i = 0; i < g.n; i++) {
        const lam = g.lon[i] - lon0, cl = g.cl[i], sl = g.sl[i], cosc = sin0 * sl + cos0 * cl * Math.cos(lam);
        let x = R * cl * Math.sin(lam), y = R * (cos0 * sl - sin0 * cl * Math.cos(lam));
        if (cosc < 0) { const d = Math.hypot(x, y) || 1; x = x / d * R * 1.01; y = y / d * R * 1.01; } // push hidden points to the limb
        const px = cx + x, py = cy - y;
        if (!any) { c.moveTo(px, py); any = true; } else c.lineTo(px, py);
      }
      c.closePath(); c.fill(); if (R > 600) c.stroke();
    }
    // terrain tint near the target when close
    if (R > 2500) { const tg = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h)); tg.addColorStop(0, 'rgba(200,180,120,.18)'); tg.addColorStop(1, 'rgba(200,180,120,0)'); c.fillStyle = tg; c.fillRect(0, 0, w, h); }
    // day/night shading
    const sh = c.createRadialGradient(cx - R * .45, cy - R * .35, R * .2, cx, cy, R * 1.05); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(.7, 'rgba(0,0,10,.12)'); sh.addColorStop(1, 'rgba(0,0,15,.6)');
    if (R < 1500) { c.fillStyle = sh; c.beginPath(); c.arc(cx, cy, R, 0, 6.283); c.fill(); }
    c.restore();
    // labels
    if (s.labels > 0) {
      c.globalAlpha = s.labels;
      LABELS.forEach(L => {
        const p = proj(L.lon * D, Math.cos(L.lat * D), Math.sin(L.lat * D)); if (!p) return;
        const fs = Math.max(10, Math.min(30, R / 240)) * L.size;
        c.font = `${L.italic ? 'italic ' : ''}${L.pin ? '700' : '600'} ${fs}px 'Cinzel', Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
        if (L.dot) { c.fillStyle = '#f6e9c6'; c.beginPath(); c.arc(p[0], p[1], 3, 0, 6.283); c.fill(); }
        if (L.pin) { const r = 10 + 5 * Math.sin(now * 4); c.strokeStyle = '#ffd36b'; c.lineWidth = 2.5; c.beginPath(); c.arc(p[0], p[1], r, 0, 6.283); c.stroke(); c.strokeStyle = 'rgba(255,211,107,.35)'; c.lineWidth = 7; c.beginPath(); c.arc(p[0], p[1], r + 7, 0, 6.283); c.stroke(); }
        const ty = p[1] + (L.dot ? fs : L.pin ? -fs * 1.6 : 0);
        c.lineWidth = 4; c.strokeStyle = 'rgba(5,10,20,.85)'; c.strokeText(L.text, p[0], ty); c.fillStyle = L.pin ? '#ffd36b' : '#f6e9c6'; c.fillText(L.text, p[0], ty);
      });
      c.globalAlpha = 1;
    }
    function proj(lam, cl, sl) {
      lam -= lon0; const cosc = sin0 * sl + cos0 * cl * Math.cos(lam); if (cosc < 0) return null;
      return [cx + R * cl * Math.sin(lam), cy - R * (cos0 * sl - sin0 * cl * Math.cos(lam))];
    }
  }
  // ---- animation phases: idle (slow turn behind the start screen) -> spin (two turns) -> dive -> fade
  const SPIN_TURNS = 2, SPIN_SECS = 11, DIVE_SECS = 7.5, FADE_SECS = 1.6;
  function frame(t) {
    if (!st) return; const now = t / 1000, dt = Math.min(.1, now - (lastT || now)); lastT = now;
    const R0 = Math.min(w, h) * .42;
    if (st.phase === 'idle') { st.lon0 -= 5 * dt; st.R = R0; st.lat0 = 18; st.labels = 0; }
    else if (st.phase === 'spin') {
      const k = Math.min(1, (now - t0) / SPIN_SECS), e = k < .15 ? k / .15 * .5 : k > .85 ? .5 + (1 - (1 - k) / .15) * .5 : .5; // soft start and stop, constant in the middle
      st.lon0 = st.spinFrom - SPIN_TURNS * 360 * smooth(k); st.R = R0; st.lat0 = 18 + (KADESH.lat - 18) * k * .5; st.labels = 0;
      if (k >= 1) { st.phase = 'dive'; t0 = now; st.lon0 = KADESH.lon; if (cb.onSpun) cb.onSpun(); }
    } else if (st.phase === 'dive') {
      const k = Math.min(1, (now - t0) / DIVE_SECS), e = ease(k);
      st.R = R0 * Math.pow(26, e); st.lat0 = st.lat0 + (KADESH.lat - st.lat0) * Math.min(1, dt * 2.5); st.lon0 = KADESH.lon; st.labels = Math.max(0, Math.min(1, (k - .35) / .3)); st.oy = -h * .05 * e;
      if (k >= 1) { st.phase = 'fade'; t0 = now; }
    } else if (st.phase === 'fade') {
      const k = Math.min(1, (now - t0) / FADE_SECS); cv.style.opacity = String(1 - k);
      if (k >= 1) { stop(); if (cb.onDone) cb.onDone(); return; }
    }
    draw(st, now); raf = requestAnimationFrame(frame);
  }
  function smooth(k) { return k < .12 ? (k / .12) * (k / .12) * .06 : k > .88 ? 1 - ((1 - k) / .12) * ((1 - k) / .12) * .06 : .06 + (k - .12) / .76 * .88; }
  function start(canvas, callbacks) {
    cv = canvas; c = cv.getContext('2d'); cb = callbacks || {}; size(); window.addEventListener('resize', size);
    cv.style.opacity = '1'; cv.style.display = 'block'; st = { phase: 'idle', lon0: 60, lat0: 18, R: 100, labels: 0, ox: 0, oy: 0 }; lastT = 0;
    cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
  }
  function begin() { if (!st) return; st.phase = 'spin'; st.spinFrom = st.lon0; t0 = lastT; }
  function skip() { if (!st) return; if (st.phase === 'idle' || st.phase === 'spin') { st.phase = 'fade'; t0 = lastT; if (cb.onSpun) cb.onSpun(); } else if (st.phase === 'dive') { st.phase = 'fade'; t0 = lastT; } }
  function stop() { cancelAnimationFrame(raf); raf = 0; st = null; if (cv) { cv.style.display = 'none'; } window.removeEventListener('resize', size); }
  const active = () => !!st;
  return { start, begin, skip, stop, active };
})();
