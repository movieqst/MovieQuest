/* Opening shot: the Earth from space, two slow turns, then a dive to the Orontes.
   Orthographic projection drawn by hand on a 2D canvas; land from world.js. */
window.KadeshGlobe = (() => {
  'use strict';
  const D = Math.PI / 180, KADESH = { lon: 36.52, lat: 34.56 };
  const RINGS = (window.KADESH_WORLD && window.KADESH_WORLD.rings) || [];
  const BORDERS = window.KADESH_BORDERS || { modern: [], ancient: [] };
  const NEAR_EAST = { lon: 36.5, lat: 33 };   // centre of the pull-back that shows the whole region
  // Pre-computed per ring: Float32 arrays of lon(rad), cos(lat), sin(lat), plus a lon/lat bounding box.
  const PRE = RINGS.map(r => {
    const n = r.length, lon = new Float32Array(n), cl = new Float32Array(n), sl = new Float32Array(n);
    let x0 = 999, x1 = -999, y0 = 999, y1 = -999;
    for (let i = 0; i < n; i++) { const [x, y] = r[i]; lon[i] = x * D; cl[i] = Math.cos(y * D); sl[i] = Math.sin(y * D); if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return { n, lon, cl, sl, box: [x0, y0, x1, y1] };
  });
  // Flat world texture (equirectangular) painted once; the spinning globe is drawn by wrapping it onto the sphere per pixel.
  const TW = 4096, TH = 2048; let TEX = null, TEXD = null;
  function buildTexture() {
    const t = document.createElement('canvas'); t.width = TW; t.height = TH; const g = t.getContext('2d');
    const oc = g.createLinearGradient(0, 0, 0, TH); oc.addColorStop(0, '#1b5c86'); oc.addColorStop(.5, '#1f6b96'); oc.addColorStop(1, '#174f78'); g.fillStyle = oc; g.fillRect(0, 0, TW, TH);
    g.fillStyle = '#5a7a46'; g.strokeStyle = 'rgba(30,55,30,.9)'; g.lineWidth = 1.2; g.lineJoin = 'round';
    RINGS.forEach(r => { g.beginPath(); r.forEach(([x, y], i) => { const px = (x + 180) / 360 * TW, py = (90 - y) / 180 * TH; i ? g.lineTo(px, py) : g.moveTo(px, py); }); g.closePath(); g.fill(); g.stroke(); });
    // a little relief: lighter uplands band, darker near the poles
    const sh = g.createLinearGradient(0, 0, 0, TH); sh.addColorStop(0, 'rgba(255,255,255,.25)'); sh.addColorStop(.12, 'rgba(255,255,255,0)'); sh.addColorStop(.88, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(255,255,255,.35)'); g.fillStyle = sh; g.fillRect(0, 0, TW, TH);
    TEX = t; TEXD = g.getImageData(0, 0, TW, TH).data;
  }
  let RAS = null, RASC = null, IMG = null, CACHE = null; // scratch canvas and per-pixel cache for the wrapped globe
  function buildCache(size, Rr, lat0) {
    // Geometry that does not change while the globe spins: texture row, longitude offset (in texture pixels) and shading per pixel.
    const n = size * size, row = new Int32Array(n), lonPix = new Float32Array(n), shade = new Float32Array(n), alpha = new Uint8Array(n);
    const sin0 = Math.sin(lat0), cos0 = Math.cos(lat0), half = size / 2, lx = -.42, ly = .38, lz = .82, ln = Math.hypot(lx, ly, lz);
    for (let py = 0; py < size; py++) { const y = (half - py) / Rr; for (let px = 0; px < size; px++) {
      const x = (px - half) / Rr, rr = x * x + y * y, i = py * size + px; if (rr > 1) { alpha[i] = 0; continue; }
      const z = Math.sqrt(1 - rr), lat = Math.asin(y * cos0 + z * sin0), lon = Math.atan2(x, z * cos0 - y * sin0);
      row[i] = Math.min(TH - 1, Math.max(0, ((90 - lat / D) / 180 * (TH - 1)) | 0)) * TW; lonPix[i] = (lon / D + 180) / 360 * TW;
      shade[i] = (.45 + .55 * Math.max(0, (x * lx + y * ly + z * lz) / ln)) * (.75 + .25 * z); alpha[i] = rr > .985 ? 255 * (1 - (rr - .985) / .015) : 255;
    } }
    return { size, lat0, row, lonPix, shade, alpha };
  }
  function drawRaster(s, cx, cy) {
    if (!TEXD) buildTexture();
    const R = s.R, rs = Math.min(1, 400 / R), size = Math.ceil(2 * R * rs) + 2, lat0 = Math.round(s.lat0 * 4) / 4 * D;
    if (!RAS || RAS.width !== size) { RAS = document.createElement('canvas'); RAS.width = RAS.height = size; RASC = RAS.getContext('2d'); IMG = RASC.createImageData(size, size); }
    if (!CACHE || CACHE.size !== size || CACHE.lat0 !== lat0) CACHE = buildCache(size, R * rs, lat0);
    const d = IMG.data, { row, lonPix, shade, alpha } = CACHE, n = size * size, shift = ((s.lon0 + 180) / 360 * TW) % TW;
    for (let i = 0, o = 0; i < n; i++, o += 4) {
      const a = alpha[i]; if (!a) { d[o + 3] = 0; continue; }
      let u = lonPix[i] + shift - TW / 2; u = u % TW; if (u < 0) u += TW; const t4 = (row[i] + (u | 0)) * 4, f = shade[i];
      d[o] = TEXD[t4] * f; d[o + 1] = TEXD[t4 + 1] * f; d[o + 2] = TEXD[t4 + 2] * f; d[o + 3] = a;
    }
    RASC.putImageData(IMG, 0, 0);
    const half = size / 2; c.save(); c.imageSmoothingEnabled = true; c.drawImage(RAS, cx - half / rs, cy - half / rs, size / rs, size / rs); c.restore();
  }
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
    const RASTER = R <= Math.min(w, h) * .42 * 1.7;   // whole globe in view: wrap the texture; zoomed in: vector coastlines
    // ocean
    const oc = c.createRadialGradient(cx - R * .35, cy - R * .35, R * .1, cx, cy, R); oc.addColorStop(0, '#2a6f9e'); oc.addColorStop(.6, '#164a72'); oc.addColorStop(1, '#0a2744');
    c.fillStyle = oc; c.beginPath(); c.arc(cx, cy, R, 0, 6.283); c.fill();
    if (RASTER) drawRaster(s, cx, cy);
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
      if (RASTER) break;
      const g = PRE[k];
      if (g.box[3] < -55) continue; // Antarctica and sub-Antarctic islands: never in view, and a half-hidden polar ring would fill the whole disc
      if (capDeg < 999) { const [x0, y0, x1, y1] = g.box; if (y1 < s.lat0 - capDeg || y0 > s.lat0 + capDeg || x1 < s.lon0 - lonW || x0 > s.lon0 + lonW) continue; }
      // First pass: is any point of this ring on the near side? A ring entirely on the far side must be skipped,
      // otherwise its points all collapse onto the rim and the fill covers the whole globe.
      let visible = false;
      for (let i = 0; i < g.n; i += 2) { const lam = g.lon[i] - lon0; if (sin0 * g.sl[i] + cos0 * g.cl[i] * Math.cos(lam) > 0) { visible = true; break; } }
      if (!visible) continue;
      c.beginPath(); let any = false;
      for (let i = 0; i < g.n; i++) {
        const lam = g.lon[i] - lon0, cl = g.cl[i], sl = g.sl[i], cosc = sin0 * sl + cos0 * cl * Math.cos(lam);
        let x = R * cl * Math.sin(lam), y = R * (cos0 * sl - sin0 * cl * Math.cos(lam));
        if (cosc < 0) { const d = Math.hypot(x, y) || 1; x = x / d * R * 1.01; y = y / d * R * 1.01; } // push hidden points to the rim
        const px = cx + x, py = cy - y;
        if (!any) { c.moveTo(px, py); any = true; } else c.lineTo(px, py);
      }
      c.closePath(); c.fill(); if (R > 600) c.stroke();
    }
    // terrain tint near the target when close
    if (R > 2500) { const tg = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h)); tg.addColorStop(0, 'rgba(200,180,120,.18)'); tg.addColorStop(1, 'rgba(200,180,120,0)'); c.fillStyle = tg; c.fillRect(0, 0, w, h); }
    // day/night shading
    const sh = c.createRadialGradient(cx - R * .45, cy - R * .35, R * .2, cx, cy, R * 1.05); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(.7, 'rgba(0,0,10,.12)'); sh.addColorStop(1, 'rgba(0,0,15,.6)');
    if (!RASTER && R < 1500) { c.fillStyle = sh; c.beginPath(); c.arc(cx, cy, R, 0, 6.283); c.fill(); }
    c.restore();
    // border overlays: today's countries, then the approximate kingdoms of 1274 BCE
    if (s.modern > 0 || s.ancient > 0) {
      c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 6.283); c.clip();
      const path = ring => { let pen = false, any = false; for (let i = 0; i < ring.length; i++) { const p = proj(ring[i][0] * D, Math.cos(ring[i][1] * D), Math.sin(ring[i][1] * D)); if (p) { pen ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); pen = true; any = true; } else pen = false; } return any; };
      const fs = Math.max(9, Math.min(22, R / 110));
      if (s.modern > 0) {
        c.globalAlpha = s.modern; c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.3; c.setLineDash([]);
        BORDERS.modern.forEach(co => { co.rings.forEach(r => { c.beginPath(); if (path(r)) c.stroke(); }); });
        c.font = `600 ${fs * .8}px 'Cinzel', Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
        BORDERS.modern.forEach(co => { if (!co.label) return; const p = proj(co.label[0] * D, Math.cos(co.label[1] * D), Math.sin(co.label[1] * D)); if (!p) return; c.lineWidth = 3; c.strokeStyle = 'rgba(5,10,20,.8)'; c.strokeText(co.name.toUpperCase(), p[0], p[1]); c.fillStyle = '#ffffff'; c.fillText(co.name.toUpperCase(), p[0], p[1]); });
        c.globalAlpha = s.modern; c.font = `500 ${fs * .7}px system-ui, sans-serif`; c.textAlign = 'left'; c.lineWidth = 3; c.strokeStyle = 'rgba(5,10,20,.8)'; c.strokeText('Today\u2019s borders', 16, 22); c.fillStyle = '#dfe9f3'; c.fillText('Today\u2019s borders', 16, 22);
      }
      if (s.ancient > 0) {
        c.globalAlpha = s.ancient;
        BORDERS.ancient.forEach(k => { c.beginPath(); if (path(k.ring)) { c.closePath(); c.fillStyle = `rgba(${k.color},.26)`; c.fill(); c.setLineDash([7, 5]); c.strokeStyle = `rgba(${k.color},.95)`; c.lineWidth = 2; c.stroke(); c.setLineDash([]); } });
        BORDERS.ancient.forEach(k => { const p = proj(k.label[0] * D, Math.cos(k.label[1] * D), Math.sin(k.label[1] * D)); if (!p) return;
          c.font = `700 ${fs}px 'Cinzel', Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = 4; c.strokeStyle = 'rgba(5,10,20,.85)'; c.strokeText(k.name, p[0], p[1]); c.fillStyle = `rgb(${k.color})`; c.fillText(k.name, p[0], p[1]);
          if (k.sub) { c.font = `italic ${fs * .65}px Georgia, serif`; c.lineWidth = 3; c.strokeText(k.sub, p[0], p[1] + fs * .95); c.fillStyle = '#f6e9c6'; c.fillText(k.sub, p[0], p[1] + fs * .95); } });
        c.font = `500 ${fs * .7}px system-ui, sans-serif`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.lineWidth = 3; c.strokeStyle = 'rgba(5,10,20,.8)';
        const note = 'The main powers around 1274 BCE \u00b7 approximate extents, a reconstruction'; c.strokeText(note, 16, 22); c.fillStyle = '#f3dfad'; c.fillText(note, 16, 22);
      }
      c.globalAlpha = 1; c.restore();
    }
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
  const SPIN_TURNS = 1, SPIN_SECS = 11, DIVE1_SECS = 4, MODERN_SECS = 4.5, XFADE_SECS = 1.2, ANCIENT_SECS = 4.5, DIVE2_SECS = 4, FADE_SECS = 1.6, PULL = 5, CLOSE = 26;
  function frame(t) {
    if (!st) return; const now = t / 1000, dt = Math.min(.1, now - (lastT || now)); lastT = now;
    const R0 = Math.min(w, h) * .42;
    if (st.phase === 'idle') { st.lon0 = KADESH.lon; st.R = R0; st.lat0 = 24; st.labels = 0; }
    else if (st.phase === 'spin') {
      const k = Math.min(1, (now - t0) / SPIN_SECS), e = k < .15 ? k / .15 * .5 : k > .85 ? .5 + (1 - (1 - k) / .15) * .5 : .5; // soft start and stop, constant in the middle
      st.lon0 = st.spinFrom - SPIN_TURNS * 360 * smooth(k); st.R = R0; st.lat0 = 24; st.labels = 0;
      if (k >= 1) { st.phase = 'dive1'; t0 = now; st.lon0 = KADESH.lon; if (cb.onSpun) cb.onSpun(); }
    } else if (st.phase === 'dive1') {
      // pull in until the whole Near East fills the view
      const k = Math.min(1, (now - t0) / DIVE1_SECS), e = ease(k);
      st.R = R0 * Math.pow(PULL, e); st.lat0 = 24 + (NEAR_EAST.lat - 24) * e; st.lon0 = KADESH.lon + (NEAR_EAST.lon - KADESH.lon) * e; st.modern = Math.max(0, (k - .55) / .45); st.ancient = 0; st.labels = 0; st.oy = -h * (cb.lift ? .22 : .04) * e;
      if (k >= 1) { st.phase = 'modern'; t0 = now; }
    } else if (st.phase === 'modern') {
      const k = Math.min(1, (now - t0) / MODERN_SECS); st.modern = 1;
      if (k >= 1) { st.phase = 'ancient'; t0 = now; }
    } else if (st.phase === 'ancient') {
      const k = Math.min(1, (now - t0) / (XFADE_SECS + ANCIENT_SECS)), x = Math.min(1, (now - t0) / XFADE_SECS); st.modern = 1 - x; st.ancient = x;
      if (k >= 1) { st.phase = 'dive2'; t0 = now; }
    } else if (st.phase === 'dive2') {
      // drop onto Kadesh
      const k = Math.min(1, (now - t0) / DIVE2_SECS), e = ease(k);
      st.R = R0 * PULL * Math.pow(CLOSE / PULL, e); st.lat0 = NEAR_EAST.lat + (KADESH.lat - NEAR_EAST.lat) * e; st.lon0 = NEAR_EAST.lon + (KADESH.lon - NEAR_EAST.lon) * e;
      st.ancient = Math.max(0, 1 - k / .4); st.labels = Math.max(0, Math.min(1, (k - .3) / .3)); st.oy = -h * ((cb.lift ? .22 : .04) * (1 - e) + .05 * e);
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
    cv.style.opacity = '1'; cv.style.display = 'block'; st = { phase: 'idle', lon0: KADESH.lon, lat0: 24, R: 100, labels: 0, modern: 0, ancient: 0, ox: 0, oy: 0 }; lastT = 0;
    cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
  }
  const nowS = () => performance.now() / 1000;   // same time base as the animation-frame timestamps
  function begin() { if (!st) return; st.phase = 'spin'; st.spinFrom = st.lon0; t0 = nowS(); }
  function skip() { if (!st) return; if (st.phase === 'idle' || st.phase === 'spin') { st.phase = 'fade'; t0 = nowS(); if (cb.onSpun) cb.onSpun(); } else if (st.phase !== 'fade') { st.phase = 'fade'; t0 = nowS(); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; st = null; if (cv) { cv.style.display = 'none'; } window.removeEventListener('resize', size); }
  const active = () => !!st;
  function debugFrame(lon0, lat0) { if (!st) return; st.lon0 = lon0; st.lat0 = lat0; draw(st, 0); }
  return { start, begin, skip, stop, active, debugFrame };
})();
