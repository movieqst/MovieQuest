/* Dunkirk 1940 — reenactment engine, adapted from the Kadesh engine.
   Reads window.DUNKIRK_SCENARIO (scenario.js). Plain 2D Canvas, no libraries.
   Three painted maps (campaign, beaches, Channel) the reenactment moves between; army blocks, beach queues, ships and
   aircraft; moving smoke, flames, surf and clouds; and a running count of the men brought home. */
(() => {
'use strict';
const S = window.DUNKIRK_SCENARIO, W = { w: 2400, h: 1800 };
let B = { scale: { px: 100, label: '' }, labels: [] };   // the current map's definition (S.maps[id])
const $ = id => document.getElementById(id);
const canvas = $('battle'), ctx = canvas.getContext('2d');
const mini = $('minimap'), mctx = mini.getContext('2d');
const panel = $('battlePanel');
const TS = 1.5;                 // terrain pre-render scale
const DT = 1 / 30;              // fixed simulation step (seconds)
const PI = Math.PI;

/* ---------------- state ---------------- */
const view = { x: 0, y: 0, w: 1000, h: 650, z: 1.25 };
const cam  = { tx: null, ty: null, follow: true };
let mode = 'intro';             // intro | watch | command
let paused = false, cinematic = false, speed = 1, simTime = 0, acc = 0, lastFrame = 0, wall = 0;
let formations = [], byId = {};
let eventIndex = 0, currentEvent = null, aiFlags = {}, battleOver = null, fastForward = false;
let selected = new Set();
let player = 'british';
const setPlayer = sd => { player = sd; };
let dragging = false, last = null, dragMoved = false, band = null, overview = null;
let introIdx = 0, introTimer = 0, introTail = 0, introPaused = false, introStarted = false, introMedia = [], mediaIdx = -1;
const G = window.DunkirkGlobe;
const INTRO_BREAK = 5, CHAPTER_BREAK = 2.5;
let markers = [];
let TER = null, MINIBASE = null, PAINTED = false, PAINTEDTER = null, DRAWNTER = null, artOn = true; try { artOn = localStorage.getItem('dunkirk-art') !== '0'; } catch (e) {}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const jitter = (i, k = 0) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const alive = f => f.present && f.state !== 'withdrawn' && f.state !== 'destroyed';
const esc = t => String(t || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const tagChip = (tag, cite) => { const c = S.confidence[tag] || S.confidence.reconstruction; return `<button class="chip" style="--c:${c.color}" title="${c.desc} Click for the sources." data-tag="${tag}" data-cite="${esc(cite)}">${c.label}</button>`; };
let voiceId = (S.voices && S.voices[0]) ? S.voices[0].id : '';
try { const v = localStorage.getItem('dunkirk-voice'); if (v && S.voices.some(x => x.id === v)) voiceId = v; } catch (e) {}
const audioFor = (kind, n) => S.audioBase ? S.audioBase + (voiceId ? voiceId + '/' : '') + kind + (n !== undefined ? '-' + n : '') + '.mp3' : undefined;

/* ---------------- maps: three paintings of the same 2400 x 1800 size; the reenactment moves between them ---------------- */
// Dunkirk has no rivers to ford: units go straight to their target, or along a `route` of waypoints.
const inWater = () => false, legal = p => p, planPath = (a, b) => [b];
const MAPS = {};               // id -> { img, alt (second version, e.g. with the oil smoke), sea (wave field) }
let curMap = null, mapFade = 0;
function loadImg(src, cb) { const im = new Image(); im.onload = () => cb(im); im.onerror = () => {}; im.src = src; return im; }
function loadMaps() {
  Object.keys(S.maps).forEach(id => {
    const d = S.maps[id], m = MAPS[id] = { img: null, alt: null, sea: null };
    loadImg((S.imageBase || 'images/') + d.file, im => { m.img = im; m.sea = buildSea(im, d); if (id === curMap) { TER = im; buildMiniBase(); } });
    if (d.altFile) loadImg((S.imageBase || 'images/') + d.altFile, im => { m.alt = im; });
  });
}
function setMap(id, instant) {
  if (!S.maps[id] || id === curMap) return;
  curMap = id; B = S.maps[id]; const m = MAPS[id]; TER = m && m.img; mapFade = instant || fastForward ? 0 : 1;
  if (B.zoom) view.z = B.zoom; clampView(); if (TER) buildMiniBase();
  document.body.dataset.map = id;
}
// The sea, found from the painting itself: water-coloured pixels joined to the map's open-sea edge (so flooded fields and
// canals inland are left alone), with each pixel's distance from the shore for the surf. Low resolution: soft is fine.
function buildSea(im, def) {
  const SW = 300, SH = 225, cv = document.createElement('canvas'); cv.width = SW; cv.height = SH;
  const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0, SW, SH);
  let px; try { px = g.getImageData(0, 0, SW, SH).data; } catch (e) { return null; }   // file:// pages may refuse to read pixels
  const wet = new Uint8Array(SW * SH);
  for (let i = 0; i < SW * SH; i++) { const r = px[i * 4], gg = px[i * 4 + 1], b = px[i * 4 + 2]; wet[i] = (b > r + 12 && b > gg * .78 && r + gg + b < 520) || (r > 200 && gg > 200 && b > 200) ? 1 : 0; }
  const sea = new Uint8Array(SW * SH), q = [];
  const edges = def.seaEdges || ['top'], seed = i => { if (wet[i] && !sea[i]) { sea[i] = 1; q.push(i); } };
  if (edges.includes('top')) for (let x = 0; x < SW; x++) seed(x);
  if (edges.includes('left')) for (let y = 0; y < SH; y++) seed(y * SW);
  if (edges.includes('right')) for (let y = 0; y < SH; y++) seed(y * SW + SW - 1);
  if (edges.includes('bottom')) for (let x = 0; x < SW; x++) seed((SH - 1) * SW + x);
  while (q.length) { const i = q.pop(), x = i % SW, y = (i / SW) | 0; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= SW || Y >= SH) return; const j = Y * SW + X; if (wet[j] && !sea[j]) { sea[j] = 1; q.push(j); } }); }
  // Specks of 'land' inside the sea (painted whitecaps, sandbanks' glints) are not shore: anything not sea that is
  // cut off from the big land areas and smaller than about 1% of the map counts as sea.
  const comp = new Int32Array(SW * SH).fill(-1);
  for (let i0 = 0; i0 < SW * SH; i0++) { if (sea[i0] || comp[i0] >= 0) continue; const st = [i0], cells = []; comp[i0] = i0;
    while (st.length) { const i = st.pop(); cells.push(i); const x = i % SW, y = (i / SW) | 0; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= SW || Y >= SH) return; const j = Y * SW + X; if (!sea[j] && comp[j] < 0) { comp[j] = i0; st.push(j); } }); }
    if (cells.length < SW * SH * .01) cells.forEach(i => { sea[i] = 1; }); }
  // distance (in cells) from the nearest land cell, by breadth-first search outward from the shore
  const dist = new Float32Array(SW * SH).fill(99), bq = [];
  for (let i = 0; i < SW * SH; i++) if (!sea[i]) { dist[i] = 0; bq.push(i); }
  for (let h = 0; h < bq.length; h++) { const i = bq[h], x = i % SW, y = (i / SW) | 0, d = dist[i] + 1; if (d > 14) continue; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= SW || Y >= SH) return; const j = Y * SW + X; if (dist[j] > d) { dist[j] = d; bq.push(j); } }); }
  const noise = new Float32Array(SW * SH); for (let i = 0; i < SW * SH; i++) noise[i] = jitter(i, 21);
  const out = document.createElement('canvas'); out.width = SW; out.height = SH;
  return { SW, SH, sea, dist, noise, out, og: out.getContext('2d'), id: out.getContext('2d').createImageData(SW, SH), last: -1 };
}
// Moving surf and whitecaps over the sea only: crests roll in toward the shore and fade; scattered caps drift with the wind.
function drawWaves(c) {
  const m = MAPS[curMap]; if (!m || !m.sea || !B.waves) return; const s = m.sea;
  if (wall - s.last > 1 / 15) {
    s.last = wall; const d = s.id.data, t = wall, k = B.waves;
    for (let y = 0; y < s.SH; y++) for (let x = 0; x < s.SW; x++) {
      const i = y * s.SW + x, o = i * 4; if (!s.sea[i]) { d[o + 3] = 0; continue; }
      const ds = s.dist[i]; let a = 0;
      if (ds < 12) { const cr = Math.sin(ds * 1.25 + t * 1.7 + s.noise[i] * .6); a += Math.pow(Math.max(0, cr), 8) * Math.exp(-ds / 5) * 1.1; }
      a += Math.max(0, Math.sin(x * .21 + y * .13 + t * .9) * Math.sin(x * .05 - y * .17 - t * .6) - .7) * .5 * (ds > 2 ? 1 : 0);   // slow glints on open water
      d[o] = 235; d[o + 1] = 245; d[o + 2] = 245; d[o + 3] = Math.min(255, a * 255 * (k.strength || .8));
    }
    s.og.putImageData(s.id, 0, 0);
  }
  const p0 = P(0, 0), p1 = P(W.w, W.h); c.save(); c.imageSmoothingEnabled = true; c.filter = `blur(${Math.max(1, 3 * view.z)}px)`; c.drawImage(s.out, p0.x, p0.y, p1.x - p0.x, p1.y - p0.y); c.restore();
}
/* ---- the burning oil tanks (map 2): ChatGPT's smoke frames and flame frames, see images/fx/ and tools/prepare-fx.py ---- */
const FX = { smoke: null, flames: null };
if (S.fx) { loadImg((S.imageBase || 'images/') + S.fx.smoke.file, im => FX.smoke = im); loadImg((S.imageBase || 'images/') + S.fx.flames.file, im => FX.flames = im); }
const fireOn = () => S.fireFrom !== undefined && simTime >= S.fireFrom && mode !== 'intro';
function drawFire(c) {
  if (!S.fx || curMap !== S.fx.map || !fireOn()) return; const F = S.fx, z = view.z;
  if (FX.smoke) {
    const sm = F.smoke, n = sm.cols * sm.rows, tt = wall * 7, i = Math.floor(tt) % n, u = tt - Math.floor(tt), p = P(sm.x, sm.y);
    const cell = k => [(k % sm.cols) * sm.cellW, Math.floor(k / sm.cols) * sm.cellH, sm.cellW, sm.cellH];
    c.save(); c.globalAlpha = 1 - u; c.drawImage(FX.smoke, ...cell(i), p.x, p.y, sm.w * z, sm.h * z); c.globalAlpha = u; c.drawImage(FX.smoke, ...cell((i + 1) % n), p.x, p.y, sm.w * z, sm.h * z); c.restore();
  }
  if (FX.flames) {
    const fl = F.flames; c.save(); c.globalCompositeOperation = 'lighter';
    F.tanks.forEach(tk => { const k = (Math.floor(wall * 10) + tk.phase) % (fl.cols * fl.rows), q = P(tk.x, tk.y), h = tk.h * z, w = h * fl.cellW / fl.cellH;
      c.globalAlpha = .85; c.drawImage(FX.flames, (k % fl.cols) * fl.cellW, Math.floor(k / fl.cols) * fl.cellH, fl.cellW, fl.cellH, q.x - w / 2, q.y - h + 6 * z, w, h); });
    c.restore();
  }
}
// Clouds drifting over the sea map, with their shadows on the water.
function drawClouds(c) {
  return;   // the paintings carry their own clouds; drawn ones looked like flat ovals
  if (!B.clouds) return;
  for (let i = 0; i < 7; i++) {
    const r = 120 + jitter(i, 31) * 160, x = ((jitter(i, 32) * (W.w + 800) + wall * (8 + jitter(i, 33) * 6)) % (W.w + 800)) - 400, y = 150 + jitter(i, 34) * (W.h - 300);
    for (const [ox, oy, col] of [[60, 90, 'rgba(10,20,30,.13)'], [0, 0, 'rgba(250,250,252,.42)']]) {
      const q = P(x + ox, y + oy), R = r * view.z; c.save(); c.fillStyle = col;
      for (let k = 0; k < 5; k++) { c.beginPath(); c.ellipse(q.x + (k - 2) * R * .38, q.y + Math.sin(k * 2.1 + i) * R * .12, R * (.42 + jitter(i * 7 + k, 35) * .2), R * .26, 0, 0, PI * 2); c.fill(); }
      c.restore();
    }
  }
}
/* ---- bomb bursts and shell splashes (event orders { fx: 'bombs', at: {x,y}, n, r }) ---- */
let blasts = [];
function addBlasts(o) { for (let k = 0; k < (o.n || 6); k++) blasts.push({ x: o.at.x + (jitter(k + blasts.length, 41) - .5) * 2 * (o.r || 80), y: o.at.y + (jitter(k + blasts.length, 42) - .5) * 2 * (o.r || 80), t0: simTime + k * (o.every || .35), sea: !!o.sea, map: o.map || curMap }); }
function drawBlasts(c) {
  blasts = blasts.filter(b => simTime - b.t0 < 3);
  blasts.forEach(b => { if (b.map !== curMap) return; const a = simTime - b.t0; if (a < 0) return; const q = P(b.x, b.y), z = view.z;
    if (b.sea) { c.save(); c.globalAlpha = Math.max(0, 1 - a / 2.2); c.fillStyle = '#eef6f6'; c.beginPath(); c.ellipse(q.x, q.y - a * 10 * z, (6 + a * 6) * z, (14 + a * 10) * z * Math.max(.2, 1 - a / 2), 0, 0, PI * 2); c.fill(); c.strokeStyle = 'rgba(240,250,250,.8)'; c.lineWidth = 2; c.beginPath(); c.ellipse(q.x, q.y, (10 + a * 22) * z, (5 + a * 10) * z, 0, 0, PI * 2); c.stroke(); c.restore(); }
    else { c.save(); if (a < .35) { c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,${170 + a * 200 | 0},80,${1 - a / .35})`; c.beginPath(); c.arc(q.x, q.y, (8 + a * 40) * z, 0, PI * 2); c.fill(); c.globalCompositeOperation = 'source-over'; }
      c.globalAlpha = Math.max(0, .7 - a / 4.3); c.fillStyle = '#3a3632'; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(q.x + (k - 1.5) * 6 * z, q.y - a * 14 * z - k * 4 * z, (6 + a * 7) * z, 0, PI * 2); c.fill(); } c.restore(); } });
}
/* ---- the running count: date, and men brought home so far (S.calendar) ---- */
function calendarNow() {
  const cal = S.calendar || []; let i = -1; cal.forEach((e, k) => { if (e.t <= simTime) i = k; });
  if (i < 0) return null; const e = cal[i], nx = cal[i + 1]; let prev = 0; for (let k = i - 1; k >= 0; k--) if (cal[k].total !== undefined) { prev = cal[k].total; break; }
  const k = nx ? clamp((simTime - e.t) / (nx.t - e.t), 0, 1) : 1;
  // the count climbs through each day toward that day's total
  return { date: e.date, total: e.total === undefined ? null : Math.round(prev + (e.total - prev) * k), note: e.note };
}
function drawCounter(c) {
  if (mode === 'intro') return; const k = calendarNow(); if (!k) return;
  const x = 12, y = 12; c.save(); c.font = "700 15px 'Cinzel', Georgia, serif"; const t1 = k.date.toUpperCase() + ' 1940';
  const t2 = k.total === null ? (k.note || '') : 'Men brought home so far: ' + k.total.toLocaleString('en-GB');
  c.font = '600 13px system-ui'; const w = Math.max(c.measureText(t2).width, 120) + 24;
  c.fillStyle = 'rgba(6,14,20,.72)'; c.beginPath(); c.roundRect(x, y, w, t2 ? 48 : 30, 6); c.fill(); c.strokeStyle = 'rgba(233,199,122,.5)'; c.lineWidth = 1; c.stroke();
  c.fillStyle = '#e9c77a'; c.font = "700 15px 'Cinzel', Georgia, serif"; c.textAlign = 'left'; c.textBaseline = 'top'; c.fillText(t1, x + 12, y + 8);
  if (t2) { c.fillStyle = '#e8f0ea'; c.font = '600 13px system-ui'; c.fillText(t2, x + 12, y + 28); }
  c.restore();
}
function curve(c, pts) {
  c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) { const xc = (pts[i][0] + pts[i + 1][0]) / 2, yc = (pts[i][1] + pts[i + 1][1]) / 2; c.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc); }
  const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]);
}
function outlined(c, text, x, y, size, opts = {}) {
  c.save(); c.font = `${opts.weight || 'bold'} ${size}px ${opts.weight === 'italic' ? 'Georgia, serif' : "'Cinzel', Georgia, serif"}`; c.textAlign = opts.align || 'center'; c.textBaseline = 'middle';
  if (opts.rotate) { c.translate(x, y); c.rotate(opts.rotate); x = 0; y = 0; }
  c.lineWidth = Math.max(2, size / 5); c.strokeStyle = opts.stroke || 'rgba(20,16,8,.85)'; c.lineJoin = 'round'; c.strokeText(text, x, y);
  c.fillStyle = opts.fill || '#f6e9c6'; c.fillText(text, x, y); c.restore();
}
// Map labels and routes are drawn live (the paintings carry no text), so they stay sharp at any zoom.
function drawMapLabels(c) {
  const z = view.z;
  (B.routes || []).forEach(r => { c.save(); c.strokeStyle = r.color; c.globalAlpha = .75; c.lineWidth = 2.5; c.setLineDash([10, 8]); c.beginPath(); r.pts.forEach((p, i) => { const q = P(p[0], p[1]); i ? c.lineTo(q.x, q.y) : c.moveTo(q.x, q.y); }); c.stroke(); c.restore();
    const lp = r.labelAt ? P(r.labelAt[0], r.labelAt[1]) : P(r.pts[(r.pts.length / 2) | 0][0], r.pts[(r.pts.length / 2) | 0][1]); outlined(c, r.name, lp.x, lp.y, 12 * Math.max(.8, z), { fill: r.color, weight: '700' }); });
  (B.labels || []).forEach(l => { const q = P(l.x, l.y); if (q.x < -200 || q.y < -60 || q.x > view.w + 200 || q.y > view.h + 60) return;
    if (l.dot) { c.fillStyle = '#1a1208'; c.beginPath(); c.arc(q.x, q.y + (l.small ? 0 : 0), 3.5 * Math.max(.7, z), 0, PI * 2); c.fill(); }
    outlined(c, l.text, q.x, q.y + (l.dot ? -16 * Math.max(.9, z) : 0), (l.small ? 13 : 21) * Math.max(.95, z), { fill: l.small ? '#f3ead2' : '#fff3d6', weight: l.small ? 'italic' : 'bold', rotate: l.rotate || 0 }); });
}

/* ---------------- units: army blocks, beach queues, ships and aircraft ---------------- */
const SIDE = sd => (S.sides && S.sides[sd]) || { color: '#888', light: '#ddd', name: sd };
const SIDECOL = sd => SIDE(sd).light;
function natoBlock(c, x, y, w, h, side, kind) {
  const A = SIDE(side); c.save();
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x - w / 2 + 3, y - h / 2 + 3, w, h);
  c.fillStyle = A.color; c.fillRect(x - w / 2, y - h / 2, w, h); c.strokeStyle = '#f4efe2'; c.lineWidth = Math.max(1.2, h / 14); c.strokeRect(x - w / 2, y - h / 2, w, h);
  c.strokeStyle = '#f4efe2'; c.lineWidth = Math.max(1, h / 16); c.beginPath();
  if (kind === 'armour') c.ellipse(x, y, w * .32, h * .26, 0, 0, PI * 2);
  else if (kind === 'mixed') { c.moveTo(x - w / 2, y - h / 2); c.lineTo(x + w / 2, y + h / 2); c.moveTo(x + w / 2, y - h / 2); c.lineTo(x - w / 2, y + h / 2); c.moveTo(x + w * .32, y); c.ellipse(x, y, w * .32, h * .26, 0, 0, PI * 2); }
  else { c.moveTo(x - w / 2, y - h / 2); c.lineTo(x + w / 2, y + h / 2); c.moveTo(x + w / 2, y - h / 2); c.lineTo(x - w / 2, y + h / 2); }
  c.stroke(); c.restore();
}
const SHIP = { destroyer: { len: 62, beam: 8, col: '#7d8790', deck: '#a7aeb3', funnels: 2 }, sweeper: { len: 40, beam: 7, col: '#7a8288', deck: '#9da4a8', funnels: 1 },
  steamer: { len: 48, beam: 9, col: '#30343a', deck: '#c9b48a', funnels: 1, paddles: true }, ferry: { len: 56, beam: 9, col: '#2d3036', deck: '#d8d2c2', funnels: 2 },
  little: { len: 16, beam: 4.5, col: '#e8e2d2', deck: '#9a6e44', funnels: 0 }, eboat: { len: 22, beam: 4, col: '#5d6468', deck: '#7c8388', funnels: 0 } };
function drawShip(c, q, f, z) {
  const sp = SHIP[f.cls] || SHIP.little, L = sp.len * z * (f.scale || 1), Bm = sp.beam * z * (f.scale || 1), moving = f.state === 'move';
  const sinking = f.state === 'sinking', sa = sinking ? clamp((simTime - f.sinkT) / 6, 0, 1) : 0;
  c.save(); c.translate(q.x, q.y); c.rotate(f.facing);
  if (moving && !sinking) { c.strokeStyle = 'rgba(245,250,250,.55)'; c.lineWidth = Math.max(1, 1.6 * z); for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(-L * .45, sd * Bm * .4); c.quadraticCurveTo(-L * 1.1, sd * Bm * 1.2, -L * 1.9, sd * Bm * 2.6); c.stroke(); } c.fillStyle = 'rgba(245,250,250,.35)'; c.beginPath(); c.ellipse(-L * .8, 0, L * .5, Bm * .45, 0, 0, PI * 2); c.fill(); }
  c.globalAlpha = 1 - sa * .85; if (sinking) c.rotate(sa * .5);
  c.fillStyle = 'rgba(0,10,20,.3)'; c.beginPath(); c.ellipse(2 * z, 3 * z, L * .52, Bm * .62, 0, 0, PI * 2); c.fill();
  c.fillStyle = sp.col; c.beginPath(); c.moveTo(L / 2, 0); c.quadraticCurveTo(L * .3, -Bm / 2, -L * .1, -Bm / 2); c.lineTo(-L / 2, -Bm * .42); c.lineTo(-L / 2, Bm * .42); c.lineTo(-L * .1, Bm / 2); c.quadraticCurveTo(L * .3, Bm / 2, L / 2, 0); c.fill();
  c.fillStyle = sp.deck; c.fillRect(-L * .3, -Bm * .28, L * .5, Bm * .56);
  if (sp.paddles) { c.fillStyle = '#5a4630'; c.fillRect(-L * .08, -Bm * .78, L * .16, Bm * 1.56); }
  for (let k = 0; k < sp.funnels; k++) { c.fillStyle = f.cls === 'steamer' || f.cls === 'ferry' ? '#b4462e' : '#4a5258'; c.beginPath(); c.arc(L * (.05 - k * .17), 0, Bm * .22, 0, PI * 2); c.fill(); }
  if (f.crowded) { c.fillStyle = '#4b4a33'; for (let k = 0; k < 14; k++) { c.beginPath(); c.arc(-L * .35 + jitter(k, 51) * L * .6, (jitter(k, 52) - .5) * Bm * .6, Math.max(.7, .9 * z), 0, PI * 2); c.fill(); } }
  c.restore();
  if (sinking) { c.save(); c.globalAlpha = .6 * (1 - sa * .5); c.fillStyle = '#2b2a28'; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(q.x + k * 4 * z, q.y - (8 + k * 9 + (simTime - f.sinkT) * 4) * z, (5 + k * 2) * z, 0, PI * 2); c.fill(); } if (sa < .3) { c.globalCompositeOperation = 'lighter'; c.fillStyle = 'rgba(255,150,60,.7)'; c.beginPath(); c.arc(q.x, q.y, 9 * z, 0, PI * 2); c.fill(); } c.restore(); }
}
const PLANE = { stuka: { span: 26, len: 20, col: '#4f5a44', gull: true }, bomber: { span: 40, len: 30, col: '#556050' }, fighter: { span: 22, len: 18, col: '#5c6650' }, spitfire: { span: 22, len: 18, col: '#6e7158' } };
function drawPlane(c, q, f, z, shadow) {
  const sp = PLANE[f.cls] || PLANE.fighter, S2 = (shadow ? .9 : 1) * z * (f.scale || 1), sp2 = sp.span * S2, ln = sp.len * S2;
  c.save(); c.translate(q.x, q.y); c.rotate(f.facing); c.fillStyle = shadow ? 'rgba(0,0,0,.28)' : sp.col;
  c.beginPath(); c.ellipse(0, 0, ln / 2, ln * .09, 0, 0, PI * 2); c.fill();                                   // fuselage
  c.beginPath(); if (sp.gull) { c.moveTo(ln * .08, 0); c.lineTo(-ln * .02, -sp2 * .22); c.lineTo(ln * .06, -sp2 / 2); c.lineTo(-ln * .08, -sp2 / 2); c.lineTo(-ln * .14, -sp2 * .2); c.lineTo(-ln * .1, 0); c.lineTo(-ln * .14, sp2 * .2); c.lineTo(-ln * .08, sp2 / 2); c.lineTo(ln * .06, sp2 / 2); c.lineTo(-ln * .02, sp2 * .22); }
  else { c.moveTo(ln * .1, -sp2 / 2); c.lineTo(-ln * .06, -sp2 / 2); c.lineTo(-ln * .1, 0); c.lineTo(-ln * .06, sp2 / 2); c.lineTo(ln * .1, sp2 / 2); c.lineTo(ln * .14, 0); }
  c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-ln * .42, -sp2 * .18); c.lineTo(-ln * .5, -sp2 * .18); c.lineTo(-ln * .5, sp2 * .18); c.lineTo(-ln * .42, sp2 * .18); c.closePath(); c.fill();   // tail
  if (!shadow) { c.fillStyle = f.side === 'german' ? '#111' : '#2f4f8f'; c.beginPath(); c.arc(-ln * .02, -sp2 * .36, ln * .06, 0, PI * 2); c.arc(-ln * .02, sp2 * .36, ln * .06, 0, PI * 2); c.fill();
    if (f.side !== 'german') { c.fillStyle = '#c8302c'; c.beginPath(); c.arc(-ln * .02, -sp2 * .36, ln * .03, 0, PI * 2); c.arc(-ln * .02, sp2 * .36, ln * .03, 0, PI * 2); c.fill(); }
    c.strokeStyle = 'rgba(230,230,230,.35)'; c.lineWidth = 1; c.beginPath(); c.arc(ln / 2, 0, ln * .14, 0, PI * 2); c.stroke(); }
  c.restore();
}
function drawQueue(c, f, z) {
  // A column of men several abreast, standing from the beach out into the shallows toward the boats.
  const n = Math.max(4, Math.round((f.rows || 30) * Math.max(.1, f.strength / 100))), ang = f.facing, ca = Math.cos(ang), sa = Math.sin(ang), cols = f.cols || 3;
  c.save(); c.fillStyle = '#3d3a2a';
  for (let r = 0; r < n; r++) for (let k = 0; k < cols; k++) { const along = r * 5.5, side = (k - (cols - 1) / 2) * 4.5, jx = (jitter(r * 7 + k, 61) - .5) * 2.2, jy = (jitter(r * 7 + k, 62) - .5) * 2.2;
    const q = P(f.x + ca * along - sa * side + jx, f.y + sa * along + ca * side + jy); c.beginPath(); c.arc(q.x, q.y, Math.max(.8, 1.35 * z), 0, PI * 2); c.fill(); }
  c.restore();
}
function drawFormation(c, f) {
  if (!f.present || f.state === 'withdrawn' || f.state === 'destroyed') return;
  if ((f.map || 'campaign') !== curMap) return;
  if (!f.known) return;   // in Dunkirk, a unit not yet in the story is simply not shown
  const z = view.z, q = P(f.x, f.y);
  c.save();
  if (f.type === 'ship') { drawShip(c, q, f, z); c.restore(); if (f.label) outlined(c, f.label, q.x, q.y + 16 * z, 10 * Math.max(.8, z), { fill: '#e8f4f6', weight: 'italic' }); return; }
  if (f.type === 'aircraft') {
    const n = f.count || 3; for (let k = 0; k < n; k++) { const off = { x: -k * 22 * Math.cos(f.facing) + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 18 * -Math.sin(f.facing), y: -k * 22 * Math.sin(f.facing) + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 18 * Math.cos(f.facing) };
      const g = P(f.x + off.x + 40, f.y + off.y + 60); drawPlane(c, g, f, z, true); const a = P(f.x + off.x, f.y + off.y); drawPlane(c, a, f, z, false); }
    c.restore(); if (f.label) outlined(c, f.label, q.x, q.y - 22 * z, 10 * Math.max(.8, z), { fill: f.side === 'german' ? '#ffd2c8' : '#d6e6ff' }); return;
  }
  if (f.type === 'queue') { drawQueue(c, f, z); c.restore(); return; }
  // army blocks (campaign map) and smaller unit blocks (beach map), with a fading trail of where they have been
  if (f.trail && f.trail.length > 1) { c.save(); c.strokeStyle = SIDE(f.side).color; c.globalAlpha = .45; c.lineWidth = Math.max(3, 7 * z); c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); f.trail.forEach((p, i) => { const t = P(p.x, p.y); i ? c.lineTo(t.x, t.y) : c.moveTo(t.x, t.y); }); c.lineTo(q.x, q.y); c.stroke(); c.restore(); }
  const big = f.type === 'army', w = (big ? 64 : 40) * z * (f.scale || 1), h = (big ? 40 : 26) * z * (f.scale || 1);
  if (f.state === 'rout' || f.state === 'scattered' || f.state === 'surrendered') c.globalAlpha *= .55;
  natoBlock(c, q.x, q.y, w, h, f.side, f.kind || 'infantry');
  if (f.strength < 100) { c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(q.x - w / 2, q.y + h / 2 + 2, w, 4); c.fillStyle = f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'; c.fillRect(q.x - w / 2, q.y + h / 2 + 2, w * f.strength / 100, 4); }
  c.restore();
  const suffix = f.state === 'surrendered' ? ' · surrendered' : f.state === 'rout' ? ' · falling back' : '';
  outlined(c, f.division + suffix, q.x, q.y + h / 2 + 14 * Math.max(.8, z), 11 * Math.max(.85, Math.min(1.5, z)), { fill: SIDECOL(f.side) });
  if (selected.has(f.id)) { c.save(); c.strokeStyle = '#fff2a4'; c.lineWidth = 2; c.setLineDash([6, 4]); c.strokeRect(q.x - w / 2 - 6, q.y - h / 2 - 6, w + 12, h + 12); c.restore(); }
}
function drawSprite() {}
const PROPS = [];

/* ---------------- formations ---------------- */
function createFormations() {
  formations = S.formations.map(d => Object.assign({}, d, {
    tx: d.x, ty: d.y, strength: 100, strengthTarget: null, strengthRate: 0,
    state: 'hold', known: !d.hidden, present: !d.offmap, speed: d.speed || (d.type === 'chariot' ? 60 : 16),
    facing: d.facing !== undefined ? d.facing : 0, spread: 1, then: null, aiPhase: null, lastHit: -99
  }));
  formations.forEach(f => { if (f.type === 'army' || f.type === 'unit') f.trail = []; });
  byId = {}; formations.forEach(f => byId[f.id] = f); window.__fm = formations;
}
function applyOrder(o) {
  const f = byId[o.id]; if (!f) return;
  if (o.visible !== undefined) { f.known = o.visible; if (o.visible) f.present = true; }
  if (o.map) f.map = o.map;
  if (o.fx) return;
  if (o.at) { f.x = o.at.x; f.y = o.at.y; }
  if (o.route) { const r = o.route.map(p => ({ x: p[0], y: p[1] })); if (o.at === undefined && !o.from) { f.x = r[0].x; f.y = r[0].y; } f.tx = r[r.length - 1].x; f.ty = r[r.length - 1].y; f.path = r.slice(1); f.pathTx = f.tx; f.pathTy = f.ty; f.state = o.state || 'move'; }
  else if (o.to) { f.tx = o.to.x; f.ty = o.to.y; f.state = o.state || 'move'; } else if (o.state) f.state = o.state;
  if (o.state === 'sinking') { f.sinkT = simTime; f.then = null; }
  if (o.facing !== undefined) f.facing = o.facing;
  if (o.speed) f.speed = o.speed;
  if (o.strength !== undefined) { f.strength = o.strength; f.strengthTarget = null; }
  if (o.strengthTo !== undefined) { f.strengthTarget = o.strengthTo; f.strengthRate = Math.abs(f.strength - o.strengthTo) / (o.over || 5); }
  if (o.spread) f.spread = o.spread;
  if (o.state !== 'sinking') f.then = o.then || null;
}
function moveFormation(f) {
  if (!alive(f)) return;
  if (f.strengthTarget !== null) {
    const d = f.strengthTarget - f.strength, step = f.strengthRate * DT;
    if (Math.abs(d) <= step) { f.strength = f.strengthTarget; f.strengthTarget = null; } else f.strength += Math.sign(d) * step;
  }
  f.inWater = inWater(f.x, f.y);
  if (f.state === 'sinking') { if (simTime - f.sinkT > 7) f.state = 'destroyed'; return; }
  if (f.state === 'hold' || f.state === 'loot' || f.state === 'scattered' || f.state === 'surrendered') return;
  if (f.trail && (!f.trail.length || Math.hypot(f.trail[f.trail.length - 1].x - f.x, f.trail[f.trail.length - 1].y - f.y) > 12)) { f.trail.push({ x: f.x, y: f.y }); if (f.trail.length > 60) f.trail.shift(); }
  // (re)plan when the target changes
  if (!f.path || f.pathTx !== f.tx || f.pathTy !== f.ty) { const g = legal({ x: f.tx, y: f.ty }); f.tx = g.x; f.ty = g.y; f.path = planPath({ x: f.x, y: f.y }, g); f.pathTx = f.tx; f.pathTy = f.ty; }
  while (f.path.length > 1 && Math.hypot(f.path[0].x - f.x, f.path[0].y - f.y) < 6) f.path.shift();
  const wp = f.path[0] || { x: f.tx, y: f.ty };
  const dx = wp.x - f.x, dy = wp.y - f.y, d = Math.hypot(dx, dy), dEnd = Math.hypot(f.tx - f.x, f.ty - f.y);
  const sp = f.speed * (f.state === 'rout' ? 1.25 : 1) * (f.inWater ? .55 : 1) * DT;
  if (dEnd > 2) { f.x += dx / d * Math.min(sp, d); f.y += dy / d * Math.min(sp, d); f.facing = Math.atan2(dy, dx); }
  else {
    if (f.then) { f.state = f.then; f.then = null; }
    else if (f.state === 'rout') f.state = mode === 'command' ? 'withdrawn' : 'scattered';
    else if (f.state === 'move') f.state = 'hold';
  }
}

/* ---------------- watch mode ---------------- */
function fireEvent(ev) {
  currentEvent = ev; if (ev.map) setMap(ev.map);
  ev.orders.forEach(o => { if (o.fx === 'bombs') addBlasts(Object.assign({ map: ev.map }, o)); else applyOrder(o); });
  if (cam.follow && ev.focus) frame(ev.focus.x, ev.focus.y);
  caption(ev.title, ev.text, ev.tag, !fastForward, ev.audio || audioFor('event', S.events.indexOf(ev) + 1), ev.cite);
  addLog(fmtTime(ev.t) + ' ' + ev.title);
  renderTimeline();
  if (ev.end && !fastForward) endWatch();
}
function stepWatch() {
  while (eventIndex < S.events.length && S.events[eventIndex].t <= simTime) fireEvent(S.events[eventIndex++]);
  formations.forEach(moveFormation);
  if (simTime >= S.duration && !battleOver && !fastForward) endWatch();
}
function endWatch() { battleOver = 'history'; paused = true; showDebrief(); }
function jumpTo(t) {
  fastForward = true; resetSim(); 
  while (simTime < t) { simTime += DT; stepWatch(); }
  fastForward = false; paused = false; battleOver = null; hideOverlay('debrief');
  if (currentEvent) caption(currentEvent.title, currentEvent.text, currentEvent.tag, true, currentEvent.audio || audioFor('event', S.events.indexOf(currentEvent) + 1), currentEvent.cite);
  updatePauseBtn(); $('clock').textContent = fmtTime(simTime); render();
  if (currentEvent && currentEvent.end) endWatch();
}

/* ---------------- command mode ---------------- */
function stepCommand() {
  const A = S.ai.hittite;
  if (!aiFlags.start) { aiFlags.start = true; S.events[0].orders.forEach(o => { if (byId[o.id].side === 'egypt') applyOrder(o); }); }
  if (player === 'egypt' && !aiFlags.inf && simTime >= A.infantryShift.t) { aiFlags.inf = true; applyOrder({ id: 'hit-inf', to: A.infantryShift.to }); applyOrder({ id: 'muwatalli', to: A.kingShift.to }); cmdCaption('Captured scouts', 'scouts', 'egyptian', { x: 1050, y: 500 }); }
  if (player === 'egypt' && !aiFlags.w1 && simTime >= A.firstWave.t) { aiFlags.w1 = true; cmdCaption('Movement across the river', 'crossing', 'reconstruction', { x: 1450, y: 1060 }); ['hit-char-a', 'hit-char-b', 'hit-char-c'].forEach((id, i) => { const f = byId[id]; f.tx = A.firstWave.cross[i].x; f.ty = A.firstWave.cross[i].y; f.state = 'move'; f.speed = 60; f.aiPhase = 'cross'; }); }
  if (player === 'egypt' && !aiFlags.w2 && simTime >= A.secondWave.t) { aiFlags.w2 = true; const f = byId['hit-char2']; f.tx = A.secondWave.cross.x; f.ty = A.secondWave.cross.y; f.state = 'move'; f.aiPhase = 'cross'; }
  if (!aiFlags.nearin && simTime >= 62) { aiFlags.nearin = true; applyOrder({ id: 'nearin', visible: true, at: { x: 60, y: 560 }, to: { x: 880, y: 480 }, speed: 50 }); cmdCaption('The Ne\u2019arin arrive', 'nearin', 'egyptian', { x: 300, y: 540 }); }
  const egy = formations.filter(f => f.side === 'egypt' && alive(f) && f.state !== 'rout');
  if (player === 'hittite') aiEgypt(egy);
  formations.forEach(f => {
    if (player !== 'egypt' || f.side !== 'hittite' || !f.ai || !alive(f) || f.state === 'rout') return;
    if (f.aiPhase === 'cross') { if (Math.hypot(f.tx - f.x, f.ty - f.y) < 6) f.aiPhase = 'hunt'; else return; }
    if (f.aiPhase === 'hunt') {
      let best = null, bd = A.huntRange; egy.forEach(e => { const d = dist(e, f); if (d < bd) { bd = d; best = e; } });
      if (best) { f.tx = best.x; f.ty = best.y; f.state = 'attack'; } else { f.tx = A.holdPoint.x; f.ty = A.holdPoint.y; f.state = 'move'; }
    }
  });
  const inf = byId['hit-inf'];
  if (player === 'egypt' && alive(inf) && inf.state !== 'rout') {
    let best = null, bd = A.infantryReact; egy.forEach(e => { if (e.x > riverXAt(e.y) + 30) { const d = dist(e, inf); if (d < bd) { bd = d; best = e; } } });
    if (best) { inf.tx = best.x; inf.ty = best.y; inf.state = 'attack'; inf.aiPhase = 'engaged'; }
    else if (inf.aiPhase === 'engaged') { inf.aiPhase = null; inf.tx = A.infantryShift.to.x; inf.ty = A.infantryShift.to.y; inf.state = 'move'; }
  }
  formations.forEach(moveFormation); combat(); fog(); checkEnd();
}
// Egyptian army when the player commands the Hittites: marches as history had it, then reacts to whatever it can see.
function aiEgypt(egy) {
  const known = formations.filter(f => f.side === 'hittite' && alive(f) && f.known && f.state !== 'rout');
  egy.forEach(f => {
    let best = null, bd = f.type === 'chariot' ? 650 : 260; known.forEach(e => { const d = dist(e, f); if (d < bd) { bd = d; best = e; } });
    if (best) {
      if (f.type === 'chariot') { f.tx = best.x; f.ty = best.y; f.state = 'attack'; f.aiPhase = 'engaged'; }
      else if (bd < 150) { f.state = 'hold'; f.facing = Math.atan2(best.y - f.y, best.x - f.x); f.aiPhase = 'engaged'; }
      else if (f.state === 'hold') { f.tx = best.x; f.ty = best.y; f.state = 'attack'; f.aiPhase = 'engaged'; }
    } else if (f.aiPhase === 'engaged') { f.aiPhase = null; f.state = 'hold'; }
  });
}
const DMG = { chariot: { infantry: 4, archers: 6, chariot: 5 }, infantry: { infantry: 6, chariot: 6, archers: 8 }, archers: { infantry: 5, chariot: 5, archers: 5 } };
function combat() {
  const live = formations.filter(f => alive(f) && f.state !== 'rout');
  live.forEach(a => live.forEach(d => {
    if (a.side === d.side) return;
    const range = a.type === 'archers' ? 150 : 62; if (dist(a, d) > range) return;
    let dmg = DMG[a.type][d.type] * (a.power || 1) * (a.strength / 100) * DT;
    if (a.type === 'chariot' && d.state === 'move') dmg *= 1.3;
    if (d.state === 'hold' && d.type !== 'chariot') dmg *= .7;
    d.strength -= dmg; d.lastHit = simTime;
    if (a.state === 'hold') a.facing = Math.atan2(d.y - a.y, d.x - a.x);
  }));
  formations.forEach(f => {
    if (!alive(f)) return;
    if (f.strength <= 0) { f.strength = 0; f.state = 'destroyed'; addLog(f.name + ' destroyed'); if (selected.has(f.id)) selected.delete(f.id); }
    else if (f.strength < 25 && f.state !== 'rout') { f.state = 'rout'; const r = S.sides[f.side].rally; f.tx = r.x; f.ty = r.y; f.spread = 2.4; f.then = 'withdrawn'; addLog(f.name + ' routs'); if (f.side === player) { caption('A formation breaks', f.name + ' has routed and is fleeing the field.', 'reconstruction', true, audioFor('cmd', 'breaks')); if (cam.follow) focusOn(f.x, f.y); } }
  });
}
function fog() {
  const egy = formations.filter(f => f.side === 'egypt' && alive(f));
  formations.forEach(f => { if (f.side === 'hittite' && !f.known && alive(f) && egy.some(e => dist(e, f) < S.ai.spotRange)) { f.known = true; addLog((player === 'egypt' ? 'Enemy spotted: ' : 'Egyptians have sighted ') + f.name); if (player === 'egypt') { caption('Enemy sighted', f.name + ' has been spotted.', 'reconstruction', true, audioFor('cmd', 'sighted')); if (cam.follow) focusOn(f.x, f.y); } } });
}
function checkEnd() {
  if (battleOver || simTime < 25) return;
  const hc = formations.filter(f => f.side === 'hittite' && f.ai), eg = formations.filter(f => f.side === 'egypt' && f.id !== 'seth-inf');
  const hittDone = hc.every(f => !alive(f)), egDone = eg.every(f => !alive(f) || f.state === 'rout');
  if (player === 'egypt') { if (hittDone) battleOver = 'victory'; else if (egDone) battleOver = 'defeat'; }
  else { if (egDone) battleOver = 'victory'; else if (hittDone) battleOver = 'defeat'; }
  if (!battleOver)
  if (simTime >= S.commandDuration) battleOver = 'stalemate';
  if (battleOver) { paused = true; updatePauseBtn(); showDebrief(); }
}

/* ---------------- rendering ---------------- */
function resize() {
  const r = panel.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(r.width * dpr)); canvas.height = Math.max(1, Math.floor(r.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); view.w = r.width; view.h = r.height; clampView(); render();
}
/* ---- tilted view: the map is seen from a camera leaning back, so the far (north) edge is smaller and the near (south) edge larger.
   P(x,y) maps world to screen (with the pixel scale s and vertical squash k at that depth); U(sx,sy) is the inverse. ---- */
let TILT = 0;     // Dunkirk is shown flat: the paintings are already drawn at an angle, and the effects must sit exactly on them
const SQ = .88;                                              // vertical foreshortening of sprites when tilted
const tiltOn = () => TILT > 0;
const TR = () => tiltOn() ? (TILT / Math.log(1 + TILT)) / SQ : 1;   // how much more map height the tilted window shows
const VW = () => view.w / view.z, VH = () => view.h / view.z * TR();
const sAt = v => tiltOn() ? 1 / (1 + TILT * (1 - v)) : 1;
const ysAt = v => tiltOn() ? view.h * Math.log((1 + TILT) / (1 + TILT * (1 - v))) / Math.log(1 + TILT) : v * view.h;
const vAt = ys => tiltOn() ? 1 - ((1 + TILT) / Math.exp(ys / view.h * Math.log(1 + TILT)) - 1) / TILT : ys / view.h;
function P(x, y) { const vw = VW(), vh = VH(), v = (y - view.y) / vh, s = sAt(v); return { x: view.w / 2 + (x - view.x - vw / 2) / vw * view.w * s, y: ysAt(v), s: view.z * s, k: tiltOn() ? SQ : 1 }; }
function U(sx, sy) { const vw = VW(), vh = VH(), v = vAt(sy), s = sAt(v); return { x: view.x + vw / 2 + (sx - view.w / 2) / (view.w * s) * vw, y: view.y + v * vh }; }
// The view may run a little past the south edge of the map, so that what the camera frames can sit in the upper part
// of the screen, clear of the caption at the bottom. Beyond the edge the background is plain black.
const OVER = () => VH() * .35;
function clampView() { view.x = clamp(view.x, 0, Math.max(0, W.w - VW())); view.y = clamp(view.y, 0, Math.max(0, W.h - VH()) + OVER()); }
function focusOn(x, y) { cam.tx = x; cam.ty = y; }
// Frame a point in the upper part of the screen, above the caption box.
function frame(x, y, k = .22) { focusOn(x, y + VH() * k); }
function updateCamera() {
  if (cam.tx === null) return;
  const gx = clamp(cam.tx - VW() / 2, 0, Math.max(0, W.w - VW())), gy = clamp(cam.ty - VH() / 2, 0, Math.max(0, W.h - VH()) + OVER());
  view.x += (gx - view.x) * .08; view.y += (gy - view.y) * .08;
  if (Math.abs(gx - view.x) < .5 && Math.abs(gy - view.y) < .5) { view.x = gx; view.y = gy; cam.tx = null; }
}
function render() {
  updateCamera(); clampView();
  const z = view.z, vw = VW(), vh = VH();
  ctx.fillStyle = '#05090c'; ctx.fillRect(0, 0, view.w, view.h);
  if (TER) {
    const kx = TER.naturalWidth / W.w, ky = TER.naturalHeight / W.h, m = MAPS[curMap];
    ctx.drawImage(TER, view.x * kx, view.y * ky, vw * kx, vh * ky, 0, 0, vw * z, vh * z);
    // a second version of the painting (the Channel with the oil smoke) fades in once the tanks are burning
    if (m && m.alt && B.altFrom !== undefined && mode !== 'intro') { const a = clamp((simTime - B.altFrom) / 4, 0, 1); if (a > 0) { ctx.save(); ctx.globalAlpha = a; ctx.drawImage(m.alt, view.x * kx, view.y * ky, vw * kx, vh * ky, 0, 0, vw * z, vh * z); ctx.restore(); } }
  }
  drawWaves(ctx); drawMapLabels(ctx);
  const ground = [], air = [];
  formations.forEach(f => (f.type === 'aircraft' ? air : ground).push(f));
  ground.sort((a, b) => a.y - b.y).forEach(f => drawFormation(ctx, f));
  drawBlasts(ctx); drawFire(ctx);
  air.forEach(f => drawFormation(ctx, f));
  drawClouds(ctx);
  markers.forEach(m => {
    const p = P(m.x, m.y), r = (26 + 8 * Math.sin(wall * 3)) * p.s;
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(1, p.k);
    ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r, 0, PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,211,107,.4)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r + 8, 0, PI * 2); ctx.stroke(); ctx.restore();
    outlined(ctx, m.label, p.x, p.y - r * p.k - 16, 14, { fill: '#fff3c9' });
  });
  // scale bar (at the near edge of the view)
  if (B.scale) { const sb = B.scale.px * z; const sy0 = mode === 'watch' ? view.h - 42 : view.h - 12; ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = 'rgba(9,23,32,.8)';
    ctx.fillRect(300, sy0 - 20, sb + 16, 20); ctx.fillStyle = '#e9c77a'; ctx.fillRect(308, sy0 - 7, sb, 3); ctx.font = '10px system-ui'; ctx.fillStyle = '#e8f0ea'; ctx.textAlign = 'left'; ctx.fillText(B.scale.label, 308, sy0 - 10); ctx.restore(); }
  drawCounter(ctx);
  if (mapFade > 0) { ctx.fillStyle = `rgba(0,0,0,${mapFade})`; ctx.fillRect(0, 0, view.w, view.h); }
  drawMini();
}
function buildMiniBase() {
  MINIBASE = document.createElement('canvas'); MINIBASE.width = mini.width; MINIBASE.height = mini.height;
  const g = MINIBASE.getContext('2d'); g.fillStyle = '#10181e'; g.fillRect(0, 0, mini.width, mini.height); if (TER) g.drawImage(TER, 0, 0, mini.width, mini.height);
}
function drawMini() {
  const w = mini.width, h = mini.height, sx = w / W.w, sy = h / W.h;
  if (!MINIBASE) buildMiniBase(); mctx.drawImage(MINIBASE, 0, 0);
  formations.forEach(f => { if (!f.present || !alive(f) || !f.known || (f.map || 'campaign') !== curMap) return; mctx.globalAlpha = 1; mctx.fillStyle = SIDE(f.side).color; mctx.strokeStyle = '#fff'; mctx.lineWidth = .8; mctx.beginPath(); mctx.arc(f.x * sx, f.y * sy, f.type === 'army' ? 4 : 2.6, 0, PI * 2); mctx.fill(); mctx.stroke(); });
  mctx.globalAlpha = 1; mctx.strokeStyle = '#ff3030'; mctx.lineWidth = 2.5; const q = [U(0, 0), U(view.w, 0), U(view.w, view.h), U(0, view.h)];
  mctx.beginPath(); q.forEach((p, i) => i ? mctx.lineTo(p.x * sx, p.y * sy) : mctx.moveTo(p.x * sx, p.y * sy)); mctx.closePath(); mctx.stroke();
}

/* ---------------- narration (voice) ---------------- */
// One audio element for the whole narration. iPad and iPhone Safari only allow audio to start after a tap, and only on
// the element that the tap started, so every clip reuses this element; the first tap anywhere unlocks it.
const narrEl = new Audio();
const NARR_LEAD = 1.5;   // seconds of quiet before each clip, so the narrator does not cut in (the clips start almost at once)
// The unlock plays a moment of silence, and pauses only if that silence is still what the element holds: the same tap may
// already have started a narration clip on it, which must not be stopped.
const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';
['pointerdown', 'keydown', 'touchend'].forEach(t => document.addEventListener(t, () => { if (narrEl.src) return; narrEl.src = SILENT; narrEl.play().then(() => { if (narrEl.src === SILENT) narrEl.pause(); }).catch(() => {}); }, { once: true }));
const Narr = {
  on: false, audio: null, rate: 1.1, endedAt: -99,
  // `next` runs when this line has been spoken (used to chain the welcome line into the first slide). `quiet`: if the clip
  // is missing, skip the line instead of reading it with the browser's voice.
  speak(text, file, next, quiet) {
    this.stop(); if (!this.on) return; this.next = next || null;
    const done = () => { const n = this.next; this.next = null; if (n) n(); };
    if (file) { const a = narrEl; a.src = file; a.playbackRate = this.rate; a.onended = () => { this.endedAt = wall; done(); }; this.audio = a; clearTimeout(this.leadT); this.leadT = setTimeout(() => { if (this.audio === a) a.play().then(() => this.status('')).catch(err => { if (err && err.name === 'AbortError') return; /* a newer clip took over the element */ if (this.audio === a) { this.audio = null; quiet ? done() : this.tts(text); } }); }, NARR_LEAD * 1000); return; }
    if (quiet) { done(); return; }
    this.tts(text);
  },
  status(msg) { const el = $('voiceStatus'); if (el) el.textContent = msg; },
  tts(text) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text); u.rate = .92 * this.rate; u.pitch = .85;
    const vs = speechSynthesis.getVoices(), pref = vs.find(v => /en.(GB|UK)/i.test(v.lang) && /male|daniel|george|arthur/i.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || vs[0];
    if (pref) u.voice = pref; u.onend = () => { const n = this.next; this.next = null; if (n) n(); }; speechSynthesis.speak(u);
    if (!vs.length) this.status('No recorded clip for this line and this browser has no voices installed.');
  },
  stop() { clearTimeout(this.leadT); this.next = null; if (this.audio) { this.audio.pause(); this.audio = null; } if ('speechSynthesis' in window) speechSynthesis.cancel(); },
  pause(p) { if ('speechSynthesis' in window) { p ? speechSynthesis.pause() : speechSynthesis.resume(); } if (this.audio) { p ? this.audio.pause() : this.audio.play(); } },
  set(on, quiet) { this.on = on; $('voiceBtn').textContent = on ? '🔊 Voice on' : '🔇 Voice off'; $('voiceBtn').classList.toggle('active', on); $('voiceMenuBtn').textContent = on ? '\ud83d\udd0a Voice' : '\ud83d\udd07 Voice'; $('voiceMenuBtn').classList.toggle('active', on); if (!on) { this.stop(); this.status(''); } else if (quiet) { } else if (mode === 'intro') speakSlide(S.intro[introIdx]); else if (currentEvent) this.speak(currentEvent.text, currentEvent.audio || audioFor('event', S.events.indexOf(currentEvent) + 1)); },
  toggle() { this.set(!this.on); }
};
// The first slide opens with the welcome line (S.welcome, clip welcome.mp3) when it has been recorded.
function speakSlide(sl) { const i = S.intro.indexOf(sl), go = () => Narr.speak(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' '), sl.audio || audioFor('intro', i + 1));
  if (i === 0 && S.welcome) Narr.speak(S.welcome, audioFor('welcome'), go, true); else go(); }

/* ---------------- UI: captions, log, panels ---------------- */
function caption(title, text, tag, speak, audio, cite) {
  $('capTitle').textContent = title; $('capText').textContent = text; $('capTag').innerHTML = tagChip(tag, cite);
  $('caption').classList.add('show');
  if (speak) Narr.speak(text, audio);
}
function cmdCaption(title, key, tag, focus) {
  caption(title, S.commandLines[key], tag, true, audioFor('cmd', key));
  if (focus && cam.follow) frame(focus.x, focus.y);
}
function openCitations(tag, cite, claim) {
  const c = S.citations[tag]; if (!c) return;
  $('citeKicker').textContent = 'Where this comes from'; $('citeTitle').innerHTML = tagChip(tag) + ' ' + c.title;
  $('citeBody').innerHTML = (claim ? `<p class="claim">\u201c${esc(claim)}\u201d</p>` : '') + (cite ? `<p class="lead">Specific record: ${esc(cite)}</p>` : '') + `<p>${c.intro}</p><ul class="refs">` + c.items.map(i => `<li><b>${i.ref}</b><br><span class="muted">${i.note}</span></li>`).join('') + '</ul>';
  showOverlay('cite');
}
document.addEventListener('click', e => {
  const b = e.target.closest('button.chip'); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const host = b.parentElement, claim = host && host.tagName === 'P' ? host.textContent.replace(b.textContent, '').trim() : '';
  openCitations(b.dataset.tag, b.dataset.cite, claim);
}, true);
let log = [];
function addLog(s) { log.unshift(s); log = log.slice(0, 8); $('log').innerHTML = log.map(l => `<div>${l}</div>`).join(''); }
function fmtTime(t) { return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`; }
function renderSelection() {
  const box = $('selection');
  if (!selected.size) { box.innerHTML = '<p class="muted">Click a formation on the map to see who they are.</p>'; return; }
  box.innerHTML = [...selected].map(id => { const f = byId[id]; return `<div class="sel"><b style="color:${SIDECOL(f.side)}">${f.name}</b><div class="tiny">${f.type} · ${f.count} ${tagChip(f.confidence)}</div><div class="bar"><i style="width:${f.strength}%;background:${f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'}"></i></div><div class="tiny">State: ${f.state}</div><p class="note">${f.note}</p></div>`; }).join('');
}
function renderTimeline() {
  const tl = $('timeline'); if (!tl) return;
  tl.innerHTML = S.events.map(e => `<button class="tick${currentEvent === e ? ' on' : ''}" style="left:${e.t / S.duration * 100}%" data-t="${e.t}" title="${fmtTime(e.t)} ${e.title}"></button>`).join('') + `<i id="tlNow" style="left:${simTime / S.duration * 100}%"></i>`;
  tl.querySelectorAll('.tick').forEach(b => b.onclick = ev => { ev.stopPropagation(); jumpTo(+b.dataset.t); });
  tl.onclick = ev => { const r = tl.getBoundingClientRect(); jumpTo(clamp((ev.clientX - r.left) / r.width, 0, 1) * S.duration); };
  $('eventList').innerHTML = S.events.map(e => `<button class="ev${currentEvent === e ? ' on' : ''}" data-t="${e.t}"><span>${fmtTime(e.t)}</span> ${e.title}</button>`).join('');
  $('eventList').querySelectorAll('.ev').forEach(b => b.onclick = () => jumpTo(+b.dataset.t));
}
const PN = u => u.id || 'none';
function unitSprite(c, u, big) {
  // the armies panel shows the same symbols as the map: a unit block, a ship or an aircraft
  const w = c.canvas.width, h = c.canvas.height; c.fillStyle = u.type === 'ship' || u.type === 'aircraft' ? '#2f5c6b' : '#8e9a6a'; c.fillRect(0, 0, w, h);
  const f = { side: u.side, cls: u.cls, facing: 0, state: 'hold', strength: 100, scale: 1 }, z = h / (u.type === 'ship' ? 26 : u.type === 'aircraft' ? 34 : 50);
  if (u.type === 'ship') drawShip(c, { x: w / 2, y: h / 2 }, f, z * .9); else if (u.type === 'aircraft') { f.facing = -PI / 2; drawPlane(c, { x: w / 2, y: h / 2 }, f, z, false); } else natoBlock(c, w / 2, h / 2, w * .62, h * .55, u.side, u.kind || 'infantry');
}
function renderArmies() {
  const units = S.units || [];
  const card = (u, i) => `<div class="ucard" data-unit="${i}" title="Click for the full write-up and photographs"><div class="pwrap"><canvas id="uc${i}" width="84" height="60"></canvas><img class="portrait" alt="" src="${(S.imageBase || 'images/')}portraits/${PN(u)}.jpg" onload="this.classList.add('show')"></div><div><b style="color:${SIDECOL(u.side)}">${u.name}</b><div class="tiny">${u.desc}</div>${tagChip(u.tag)}<div class="more">More ▸</div></div></div>`;
  // Each side shows its first two cards; the rest fold away under a "more" button.
  $('armies').innerHTML = [...new Set(units.map(u => u.side))].map(sd => {
    const idx = units.map((u, i) => i).filter(i => units[i].side === sd), rest = idx.slice(2);
    return idx.slice(0, 2).map(i => card(units[i], i)).join('') + (rest.length ? `<div class="umore" hidden>${rest.map(i => card(units[i], i)).join('')}</div><button class="ufold" data-n="${rest.length}"></button>` : '');
  }).join('');
  $('armies').querySelectorAll('.ufold').forEach(b => { const n = +b.dataset.n, label = open => open ? '\u25b4 Show fewer' : `\u25be ${n} more unit${n > 1 ? 's' : ''}`; b.textContent = label(false);
    b.onclick = () => { const m = b.previousElementSibling, open = m.hidden; m.hidden = !open; b.textContent = label(open); }; });
  units.forEach((u, i) => { const c = $('uc' + i).getContext('2d'); unitSprite(c, u); setTimeout(() => unitSprite(c, u), 1500); });
  $('armies').querySelectorAll('.ucard').forEach(el => el.onclick = e => { if (e.target.closest('button.chip')) return; openUnit(+el.dataset.unit); });
}
// Unit write-up overlay. Photos are looked up by file name across the intro slides so
// captions and credits are kept in one place.
let unitIdx = -1, unitPhoto = 0;
function mediaByFile(f) { for (const sl of S.intro) for (const m of (sl.media || [])) if (m.file === f) return m; return null; }
function unitPhotos(u) { return (u.photos || []).map(p => typeof p === 'string' ? (mediaByFile(p) || { file: p }) : p); }
function openUnit(i) {
  const units = S.units || []; if (!units.length) return;
  unitIdx = (i + units.length) % units.length; const u = units[unitIdx]; unitPhoto = 0;
  $('unitKicker').textContent = SIDE(u.side).name + ' · ' + (unitIdx + 1) + ' / ' + units.length;
  $('unitTitle').innerHTML = `<span style="color:${SIDECOL(u.side)}">${u.name}</span> ${tagChip(u.tag)}`;
  const base = S.imageBase || 'images/';
  $('unitBody').innerHTML = `<div class="uhead"><canvas id="unitSprite" width="112" height="80"></canvas><img class="portrait" alt="" style="width:112px;height:80px;object-fit:cover;border-radius:4px;display:none" src="${base}portraits/${PN(u)}.jpg" onload="this.style.display='block';this.previousElementSibling.style.display='none'"><div class="side">${u.desc}</div></div>` + (u.lines || []).map(l => `<p>${l.text} ${tagChip(l.tag, l.cite)}</p>`).join('');
  unitSprite($('unitSprite').getContext('2d'), u, true);
  const ph = unitPhotos(u);
  $('unitThumbs').innerHTML = ph.map((m, k) => `<button data-k="${k}" title="${esc(m.caption || m.file || '')}"><img alt="" src="${base}${m.file}"></button>`).join('');
  $('unitThumbs').querySelectorAll('button').forEach(b => b.onclick = () => showUnitPhoto(+b.dataset.k));
  showUnitPhoto(0);
  if (!$('unit').classList.contains('show') && mode === 'intro' && introStarted && !introPaused && !cinematic) { togglePause(); unitPausedIntro = true; }
  document.body.classList.add('unitopen'); showOverlay('unit');
}
function showUnitPhoto(k) {
  const u = (S.units || [])[unitIdx]; if (!u) return; const ph = unitPhotos(u); unitPhoto = k;
  const img = $('unitImg'), p = $('unitPh'); img.classList.remove('show'); p.classList.remove('show');
  $('unitThumbs').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.k === k));
  const m = ph[k];
  if (!m) { $('unitCap').textContent = 'No photograph yet.'; $('unitRef').textContent = ''; p.textContent = 'Photo to add'; p.classList.add('show'); return; }
  $('unitCap').textContent = m.caption || ''; $('unitRef').textContent = [m.ref, m.credit].filter(Boolean).join(' · ');
  p.textContent = 'Photo to add: ' + (m.file || '') + (m.caption ? ' — ' + m.caption : '');
  img.onload = () => img.classList.add('show'); img.onerror = () => p.classList.add('show');
  img.src = (S.imageBase || 'images/') + m.file;
}
function renderBriefing() {
  $('briefMeta').innerHTML = `<b>${S.date}</b> · ${S.place}<br>${S.tagline}`;
  $('confKey').innerHTML = Object.keys(S.confidence).map(k => `<div class="keyrow">${tagChip(k)}<span>${S.confidence[k].desc}</span></div>`).join('');
  $('sources').innerHTML = S.sources.map(s => `<li><b>${s.title}</b> — ${s.note}</li>`).join('');
}

/* ---------------- overlays: intro, debrief, explain ---------------- */
function showOverlay(id) { $(id).classList.add('show'); }
let unitPausedIntro = false;
function hideOverlay(id) { $(id).classList.remove('show'); if (id === 'unit') { document.body.classList.remove('unitopen'); if (unitPausedIntro) { unitPausedIntro = false; if (mode === 'intro' && introPaused) togglePause(); } } }
function showIntro(i) {
  introIdx = clamp(i, 0, S.intro.length - 1); const sl = S.intro[introIdx]; introTimer = 0; introTail = 0; $('introNext').textContent = 'Next \u25b6'; $('introNext').classList.remove('ready');
  $('introKicker').textContent = `Historical introduction · ${introIdx + 1} / ${S.intro.length}`;
  $('introTitle').textContent = sl.title; $('introSub').textContent = sl.subtitle || '';
  $('introLines').innerHTML = sl.lines.map(l => `<p>${l.text} ${tagChip(l.tag, l.cite)}</p>`).join('');
  $('introNav').style.display = sl.choice ? 'none' : 'flex'; $('ctrlStrip').classList.toggle('lit', false); $('introChoice').style.display = 'none'; $('playGame').classList.toggle('show', !!sl.choice); $('playMenu').classList.remove('show'); document.body.classList.toggle('choice', !!sl.choice);
  $('introBack').disabled = introIdx === 0; $('introBar').style.width = '0%';
  if (sl.map) setMap(sl.map, true);
  markers = sl.markers || [];
  if (sl.zoom) { view.z = clamp(sl.zoom, .45, 2.4); clampView(); }
  // The dialog covers the lower part of the panel, so aim the camera such that the point of interest sits in the upper third.
  if (sl.focus) frame(sl.focus.x, sl.focus.y, .27);
  $('startGate').style.display = introStarted ? 'none' : 'flex'; if (!introStarted) $('introNav').style.display = 'none';
  introMedia = sl.media || []; mediaIdx = -1; $('mediaCard').classList.toggle('nomedia', !introMedia.length); placeMedia(); showMedia(0);
  if (introStarted) speakSlide(sl);
}
// Click on the intro progress bar to replay the narration from that point (and show the picture that belongs there).
$('introBar').parentElement.style.cursor = 'pointer';
$('introBar').parentElement.title = 'Click to replay from here';
$('introBar').parentElement.addEventListener('click', e => {
  const r = e.currentTarget.getBoundingClientRect(), k = clamp((e.clientX - r.left) / r.width, 0, 1), sl = S.intro[introIdx];
  introTail = 0; $('introNext').textContent = 'Next \u25b6'; $('introNext').classList.remove('ready');
  if (Narr.on && Narr.audio && Narr.audio.duration) { const au = Narr.audio; au.currentTime = k * au.duration; if (au.ended || au.paused) au.play().catch(() => {}); Narr.endedAt = -99; }
  else introTimer = k * sl.auto;
  mediaIdx = -1; showMedia(Narr.on && Narr.audio && Narr.audio.duration ? Narr.audio.currentTime : introTimer);
});
function showMedia(elapsed) {
  let k = -1; introMedia.forEach((m, i) => { if ((m.at || 0) <= elapsed) k = i; });
  if (k === mediaIdx) return; mediaIdx = k; const m = introMedia[k];
  const img = $('introImg'), ph = $('introPh');
  img.classList.remove('show'); ph.classList.remove('show');
  if (!m) { $('introCap').textContent = ''; $('introRef').textContent = ''; return; }
  $('introCap').textContent = m.caption || ''; $('introRef').textContent = [m.ref, m.credit].filter(Boolean).join(' \u00b7 ');
  if (document.body.classList.contains('fsmedia')) requestAnimationFrame(() => document.body.style.setProperty('--mm-top', ($('fsMediaWrap').offsetHeight + 22) + 'px'));
  ph.textContent = 'Photo to add: ' + (m.file || '') + (m.caption ? ' \u2014 ' + m.caption : '');
  img.onload = () => { img.classList.add('show'); }; img.onerror = () => { ph.classList.add('show'); };
  img.src = (S.imageBase || 'images/') + m.file; if (swapped) $('bigPhotoImg').src = img.src;
}
function beginIntro(voice) {
  Narr.set(voice, true); if (!voice) Narr.stop();
  $('playBig').classList.remove('show');
  const go = () => { introStarted = true; $('startGate').style.display = 'none'; $('introNav').style.display = 'flex'; introTimer = 0; showOverlay('intro'); showIntro(0); };
  if (G && G.active()) { hideOverlay('intro'); showTitleCard(); G.begin(); introSpunCb = go; } else go();
}
function showTitleCard() {
  const t = S.titleCard; if (!t) return; const el = $('titleCard');
  el.innerHTML = `<div class="tc-title">${t.title}</div><div class="tc-date">${t.date}</div><div class="tc-place">${t.place}</div><div class="tc-sides">${t.sides}</div>` +
    (t.dateNote ? `<div class="tc-note">${t.dateNote}${t.dateRef ? ' <span class="tc-ref">' + t.dateRef + '</span>' : ''}</div>` : '');
  el.classList.add('show'); el.style.opacity = '1';
}
function titleCardProgress(k) {
  // visible through the turn; fades out over the last 12% of the spin, just before the dive
  const el = $('titleCard'); if (!el.classList.contains('show')) return;
  const o = k < .88 ? 1 : Math.max(0, 1 - (k - .88) / .12); el.style.opacity = String(o);
  if (k >= 1) el.classList.remove('show');
}
$('playBig').onclick = () => beginIntro(true);
let introSpunCb = null;
// Establishing pictures (S.establishing: [{ file, secs, credit, pulse: { x, y } }]): after the globe's dive, before the battle
// map, each fades in, holds for `secs` (about 5) while the narration carries on, and fades out. `pulse` (fractions of the
// picture's width and height) puts a pulsing ring on the picture, e.g. on the battle's town.
let establishT = [];
function placePulse(m) {
  const el = $('establish'), img = el.querySelector('img'), ring = el.querySelector('.epulse');
  if (!m.pulse || !img.naturalWidth) { ring.style.display = 'none'; return; }
  const W = el.clientWidth, H = el.clientHeight, k = Math.min(W / img.naturalWidth, H / img.naturalHeight), w = img.naturalWidth * k, h = img.naturalHeight * k;
  ring.style.left = ((W - w) / 2 + m.pulse.x * w) + 'px'; ring.style.top = ((H - h) / 2 + m.pulse.y * h) + 'px'; ring.style.display = 'block';
}
function showEstablishing() {
  const list = S.establishing || [], el = $('establish'); if (!list.length || !el) return;
  establishT.forEach(clearTimeout); establishT = []; const img = el.querySelector('img'), cap = el.querySelector('.ecap');
  let at = 0; el.classList.add('show'); requestAnimationFrame(() => el.classList.add('on'));
  list.forEach((m, i) => {
    establishT.push(setTimeout(() => { img.style.opacity = 0; el.querySelector('.epulse').style.display = 'none';
      establishT.push(setTimeout(() => { img.onload = () => placePulse(m); img.src = (S.imageBase || 'images/') + m.file; img.style.opacity = 1; cap.textContent = m.credit || ''; if (img.complete) placePulse(m); }, i ? 600 : 0)); }, at * 1000));
    at += (m.secs || 5);
  });
  establishT.push(setTimeout(() => { el.classList.remove('on'); establishT.push(setTimeout(() => el.classList.remove('show'), 1300)); }, at * 1000));
}
function hideEstablishing() { establishT.forEach(clearTimeout); establishT = []; const el = $('establish'); if (el) el.classList.remove('on', 'show'); }
function startIntro() { hideEstablishing(); mode = 'intro'; resetSim(); markers = []; introPaused = false; introStarted = false; Narr.stop();
  $('titleCard').classList.remove('show'); $('playBig').classList.add('show'); hideOverlay('intro');
  if (G && window.DUNKIRK_WORLD) G.start($('globe'), { lift: true, onFade: showEstablishing, onSpinProgress: titleCardProgress, onSpun: () => { if (introSpunCb) { const f = introSpunCb; introSpunCb = null; f(); } }, onDone: () => {} }); $('introPause').textContent = 'Ⅱ Pause'; setModeButtons(); hideOverlay('debrief'); $('caption').classList.remove('show'); showIntro(0); if (G && G.active()) hideOverlay('intro'); else showOverlay('intro'); }
function startMode(m, opts) {
  hideEstablishing();
  const skipGlobe = opts && opts.skipGlobe; $('playBig').classList.remove('show'); $('titleCard').classList.remove('show'); $('playGame').classList.remove('show'); $('playMenu').classList.remove('show'); document.body.classList.remove('choice');
  mode = m; markers = []; if (G) G.stop(); hideOverlay('intro'); hideOverlay('debrief'); hideOverlay('explain'); Narr.stop();
  resetSim(); if (S.events[0].map) setMap(S.events[0].map, true); paused = false; cam.follow = true; updatePauseBtn(); setModeButtons();
  document.body.dataset.mode = m; $('caption').classList.remove('show'); placeMedia();
  renderTimeline(); renderSelection();
  const begin = () => {
    cinematic = false;
    if (m === 'watch') caption(S.events[0].title, S.events[0].text, S.events[0].tag, false);
    else if (player === 'hittite') cmdCaption('Command mode', 'starth', 'reconstruction', { x: 1850, y: 650 });
    else cmdCaption('Command mode', 'start', 'reconstruction', { x: 1100, y: 600 });
  };
  // Every start opens on the globe: one turn, then the dive to the Orontes, then the battle begins. Click the globe to skip.
  // The globe belongs to the introduction only; a battle starts straight away.
  begin();
}
$('globe').addEventListener('click', () => { if (G && G.active()) { G.skip(); $('titleCard').classList.remove('show'); } });
function resetSim() { createFormations(); blasts = []; simTime = 0; acc = 0; eventIndex = 0; currentEvent = null; aiFlags = {}; battleOver = null; selected.clear(); log = []; $('log').innerHTML = ''; renderSelection(); renderTimeline(); }
function setModeButtons() { $('watchBtn').classList.toggle('active', mode === 'watch'); $('commandBtn').classList.toggle('active', mode === 'command'); $('introBtn').classList.toggle('active', mode === 'intro'); document.body.dataset.mode = mode; }
function updatePauseBtn() { $('pauseBtn').textContent = paused ? '▶ Resume' : 'Ⅱ Pause'; }
function togglePause() { if (cinematic) return; if (mode === 'intro') { introPaused = !introPaused; $('introPause').textContent = introPaused ? '▶ Resume' : 'Ⅱ Pause'; Narr.pause(introPaused); return; } if (battleOver) return; paused = !paused; updatePauseBtn(); Narr.pause(paused); }
function showDebrief() {
  Narr.stop(); const d = $('debrief');
  let head, body;
  if (battleOver === 'history') { head = 'What the sources say happened next'; body = ''; }
  else {
    const txt = (player === 'egypt' ? { victory: 'You broke the Hittite chariot force. Every chariot group that crossed the river was destroyed or driven off.', defeat: 'The Egyptian army has been scattered. Ramesses would have fled or fallen with it.', stalemate: 'Night falls with both armies still in the field: much as it did in 1274 BCE.' } : { victory: 'You scattered the Egyptian army. Muwatalli\u2019s gamble, which failed in 1274 BCE, has succeeded in your hands.', defeat: 'Your chariot force has been destroyed or driven back across the Orontes, as it was in 1274 BCE.', stalemate: 'Night falls with both armies still in the field: much as it did in 1274 BCE.' })[battleOver];
    const rows = formations.filter(f => f.known || f.side === 'egypt').map(f => `<tr><td style="color:${SIDECOL(f.side)}">${f.name}</td><td>${f.state}</td><td>${Math.round(f.strength)}%</td></tr>`).join('');
    head = (player === 'egypt' ? { victory: 'Egyptian victory', defeat: 'Egyptian defeat', stalemate: 'Stalemate' } : { victory: 'Hittite victory', defeat: 'Hittite defeat', stalemate: 'Stalemate' })[battleOver];
    body = `<p class="lead">${txt}</p><p class="muted">Your battle is a what-if simulation. Nothing about it is a claim about what really happened. Compare it with the historical outcome below.</p><div class="tablewrap"><table><tr><th>Formation</th><th>State</th><th>Strength</th></tr>${rows}</table></div>`;
  }
  $('debriefTitle').textContent = head;
  $('debriefBody').innerHTML = body + '<h4>The historical outcome</h4>' + S.outcome.map(l => `<p>${l.text} ${tagChip(l.tag, l.cite)}</p>`).join('');
  if (Narr.on && battleOver === 'history') Narr.speak(S.outcome.map(l => l.text).join(' '), S.outcomeAudio || audioFor('outcome'));
  showOverlay('debrief');
}
function showExplain() {
  const ev = currentEvent; if (!ev || !ev.explain) return;
  if (!paused) togglePause(); $('explainTitle').textContent = ev.title; $('explainBody').textContent = ev.explain; showOverlay('explain');
  Narr.speak(ev.explain, ev.explainAudio || audioFor('explain', S.events.indexOf(ev) + 1));
}

/* ---------------- input ---------------- */
function toWorld(e) { const r = canvas.getBoundingClientRect(); return U(e.clientX - r.left, e.clientY - r.top); }
function manualCamera() { cam.tx = null; cam.follow = false; $('followBtn').classList.remove('active'); }
function pickFormation(p) {
  let best = null, bd = 1e9;
  formations.forEach(f => { if (!alive(f) || (!f.known && mode === 'command' && f.side !== player)) return; const r = Math.max(f.cols, f.rows) * (f.type === 'chariot' ? 15 : 7) + 14; const d = dist(f, p); if (d < r && d < bd) { bd = d; best = f; } });
  return best;
}
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointerdown', e => {
  e.preventDefault(); last = { x: e.clientX, y: e.clientY }; dragMoved = false;
  hideMenu();
  if (e.button === 0) { dragging = true; canvas.setPointerCapture(e.pointerId); const p = toWorld(e); if (overview || e.shiftKey) band = { x0: p.x, y0: p.y, x1: p.x, y1: p.y }; else if (mode === 'command') marquee = { x0: p.x, y0: p.y, x1: p.x, y1: p.y, add: e.ctrlKey || e.metaKey }; }
  if (e.button === 2 && mode === 'command') { const p = toWorld(e); const r = canvas.getBoundingClientRect(); showMenu(e.clientX - r.left, e.clientY - r.top, p); }
});
/* ---- marquee selection and the right-click order menu (command mode) ---- */
let marquee = null, menuTarget = null;
function ownSelected() { return [...selected].map(id => byId[id]).filter(f => f && alive(f) && f.state !== 'rout' && f.side === player); }
function orderMove(p, state) {
  const fs = ownSelected(); if (!fs.length) return; const cols = Math.ceil(Math.sqrt(fs.length));
  fs.forEach((f, k) => { const g = legal({ x: clamp(p.x + (k % cols - (cols - 1) / 2) * 90, 20, W.w - 20), y: clamp(p.y + Math.floor(k / cols) * 70, 20, W.h - 20) }); f.tx = g.x; f.ty = g.y; f.state = state || 'move'; f.aiPhase = null; });
  addLog((state === 'attack' ? 'Attack-move' : 'Move') + ' ordered: ' + fs.length + ' formation' + (fs.length > 1 ? 's' : '')); renderSelection();
}
function orderHalt() { ownSelected().forEach(f => { if (f.state === 'move' || f.state === 'attack') f.state = 'hold'; }); addLog('Halt'); renderSelection(); }
function orderFace(p) { ownSelected().forEach(f => { f.facing = Math.atan2(p.y - f.y, p.x - f.x); f.state = 'hold'; }); addLog('Facing changed'); renderSelection(); }
function orderFallBack() { $('retreatBtn').click(); }
function showMenu(sx, sy, p) {
  menuTarget = p; const m = $('ctxMenu'), fs = ownSelected(), enemy = pickFormation(p), onEnemy = enemy && enemy.side !== player;
  const items = [];
  if (fs.length) {
    items.push({ t: onEnemy ? '\u2694 Attack ' + enemy.division : '\u2694 Attack-move here', f: () => orderMove(onEnemy ? { x: enemy.x, y: enemy.y } : p, 'attack') });
    items.push({ t: '\u27a1 Move here', f: () => orderMove(p, 'move') });
    items.push({ t: '\u21bb Face this way', f: () => orderFace(p) });
    items.push({ t: '\u25a0 Halt / hold ground', f: orderHalt });
    items.push({ t: '\u21a9 Fall back', f: orderFallBack });
    items.push({ sep: true });
  }
  items.push({ t: '\u2611 Select all ' + (player === 'egypt' ? 'Egyptian' : 'Hittite') + ' formations', f: () => $('selectAll').click() });
  if (enemy && enemy.side === player) items.push({ t: '\u2610 Select ' + enemy.name, f: () => { selected.clear(); selected.add(enemy.id); renderSelection(); } });
  if (selected.size) items.push({ t: '\u2715 Deselect', f: () => { selected.clear(); renderSelection(); } });
  items.push({ t: '\ud83c\udfa5 Look here', f: () => { manualCamera(); focusOn(p.x, p.y); } });
  // Two looks for the order menu: picture buttons (the default; the order's name shows when the pointer is over one) or a text
  // list. The 'Text' box in the menu's header switches between them and is remembered in this browser.
  let textMenu = false; try { textMenu = localStorage.getItem('bh-textmenu') === '1'; } catch (e) {}
  const ICON = { '⚔': '⚔️', '➡': '🏃', '↻': '🧭', '■': '🛑', '↩': '↩️', '☑': '✅', '☐': '☑️', '✕': '❌' };
  const split = t => { const m = String(t).match(/^(\S+)\s+([\s\S]*)$/); return m ? [ICON[m[1]] || m[1], m[2]] : ['•', t]; };
  const head = (fs.length ? `${fs.length} formation${fs.length > 1 ? 's' : ''} selected` : 'No formation selected');
  m.classList.toggle('icons', !textMenu);
  m.innerHTML = `<div class="mhead"><span>${head}</span><label class="mtext" title="Show the orders as a text list"><input type="checkbox" ${textMenu ? 'checked' : ''}> Text</label></div>`
    + (textMenu ? items.map((it, i) => it.sep ? '<hr>' : `<button data-i="${i}"${it.off ? ' disabled' : ''}>${it.t}</button>`).join('')
      : '<div class="mgrid">' + items.map((it, i) => { if (it.sep) return '</div><div class="mgrid">'; const [ic, label] = split(it.t);
        return `<button data-i="${i}" data-label="${label.replace(/"/g, '&quot;')}" title="${label.replace(/"/g, '&quot;')}"${it.off ? ' disabled' : ''}>${ic}</button>`; }).join('') + '</div><div class="mlabel">Point at a button to see the order</div>');
  m.querySelector('.mtext input').onchange = ev => { textMenu = ev.target.checked; try { localStorage.setItem('bh-textmenu', textMenu ? '1' : '0'); } catch (e) {} showMenu(sx, sy, p); };
  m.querySelector('.mtext').onclick = ev => ev.stopPropagation();
  const lab = m.querySelector('.mlabel');
  if (lab) m.querySelectorAll('.mgrid button').forEach(b => { b.onmouseenter = b.onfocus = () => { lab.textContent = b.dataset.label + (b.disabled ? '' : ''); lab.classList.add('on'); }; b.onmouseleave = () => { lab.textContent = 'Point at a button to see the order'; lab.classList.remove('on'); }; });
  m.querySelectorAll('button[data-i]').forEach(b => b.onclick = ev => { ev.stopPropagation(); items[+b.dataset.i].f(); hideMenu(); });
  const pw = panel.getBoundingClientRect(); m.style.display = 'block'; m.style.left = Math.min(sx, pw.width - 240) + 'px'; m.style.top = Math.min(sy, pw.height - m.offsetHeight - 10) + 'px';
}
function hideMenu() { const m = $('ctxMenu'); if (m) m.style.display = 'none'; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') { hideMenu(); if ($('unit').classList.contains('show')) hideOverlay('unit'); } });
canvas.addEventListener('pointermove', e => {
  if (!dragging) return; const dx = e.clientX - last.x, dy = e.clientY - last.y;
  if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
  if (band) { const p = toWorld(e); band.x1 = p.x; band.y1 = p.y; return; }
  if (marquee) { const p = toWorld(e); marquee.x1 = p.x; marquee.y1 = p.y; if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true; return; }
  if (dragMoved && !marquee) { const r = canvas.getBoundingClientRect(), a = U(last.x - r.left, last.y - r.top), b2 = U(e.clientX - r.left, e.clientY - r.top); view.x -= b2.x - a.x; view.y -= b2.y - a.y; clampView(); manualCamera(); last = { x: e.clientX, y: e.clientY }; }
});
canvas.addEventListener('pointerup', e => {
  if (band) {
    const bx = Math.min(band.x0, band.x1), by = Math.min(band.y0, band.y1), bw = Math.abs(band.x1 - band.x0), bh = Math.abs(band.y1 - band.y0); band = null;
    if (bw > 20 && bh > 20) { view.z = clamp(Math.min(view.w / bw, view.h * TR() / bh), .45, 2.4); view.x = bx + bw / 2 - VW() / 2; view.y = by + bh / 2 - VH() / 2; overview = null; $('battlePanel').classList.remove('overview'); clampView(); manualCamera(); dragging = false; return; }
  }
  if (marquee) {
    const mq = marquee; marquee = null;
    const x0 = Math.min(mq.x0, mq.x1), y0 = Math.min(mq.y0, mq.y1), x1 = Math.max(mq.x0, mq.x1), y1 = Math.max(mq.y0, mq.y1);
    if (dragMoved && (x1 - x0 > 8 || y1 - y0 > 8)) {
      if (!mq.add) selected.clear();
      formations.forEach(f => { if (alive(f) && f.side === player && f.x >= x0 && f.x <= x1 && f.y >= y0 && f.y <= y1) selected.add(f.id); });
      renderSelection(); dragging = false; return;
    }
  }
  if (dragging && !dragMoved && e.button === 0) {
    if (overview) { toggleOverview(); dragging = false; return; }
    const f = pickFormation(toWorld(e));
    if (!e.shiftKey) selected.clear();
    if (f) { if (mode === 'command' && f.side !== player) { selected.clear(); selected.add(f.id); } else selected.add(f.id); }
    renderSelection();
  }
  dragging = false;
});
canvas.addEventListener('wheel', e => {
  e.preventDefault(); const r = canvas.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
  const wp = U(mx, my), z2 = clamp(view.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15), .45, 2.4);
  view.z = z2; const v = vAt(my), sv = sAt(v); view.x = wp.x - VW() / 2 - (mx - view.w / 2) / (view.w * sv) * VW(); view.y = wp.y - v * VH(); clampView(); manualCamera();
}, { passive: false });
function toggleOverview() {
  if (overview) { view.x = overview.x; view.y = overview.y; view.z = overview.z; overview = null; }
  else { overview = { x: view.x, y: view.y, z: view.z }; view.z = Math.min(view.w / W.w, view.h * TR() / W.h); view.x = 0; view.y = 0; }
  clampView(); manualCamera(); $('battlePanel').classList.toggle('overview', !!overview);
}
function setBig(on) { document.body.classList.toggle('bigmap', on); $('fsBtn').classList.toggle('active', on); setTimeout(resize, 50); placeMedia(); }
// Swap view: the current photo fills the panel and the live map shrinks into the photo's slot in the corner card.
let swapped = false;
function fitSwappedMap() {
  if (!swapped) return; const plate = $('fsMediaWrap').querySelector('.plate'); if (!plate) return;
  const pr = plate.getBoundingClientRect(), br = panel.getBoundingClientRect(), sc = pr.width / br.width;
  plate.style.minHeight = Math.round(br.height * sc) + 'px';
  canvas.style.transform = `translate(${Math.round(pr.left - br.left)}px, ${Math.round(pr.top - br.top)}px) scale(${sc})`;
}
function swapPhoto(on) {
  if (on && !document.body.classList.contains('fsmedia')) return;
  swapped = on; document.body.classList.toggle('swapped', on);
  if (on) { const m = introMedia[mediaIdx]; if (m) $('bigPhotoImg').src = (S.imageBase || 'images/') + m.file; requestAnimationFrame(fitSwappedMap); }
  else { canvas.style.transform = ''; const plate = $('fsMediaWrap').querySelector('.plate'); if (plate) plate.style.minHeight = ''; }
  if (document.body.classList.contains('fsmedia')) requestAnimationFrame(() => document.body.style.setProperty('--mm-top', ($('fsMediaWrap').offsetHeight + 22) + 'px'));
}
$('swapBtn').onclick = e => { e.stopPropagation(); swapPhoto(!swapped); };
$('bigPhotoBack').onclick = () => swapPhoto(false);
$('introMedia').querySelector('.plate').addEventListener('click', () => {
  if (swapped) return;
  if (document.body.classList.contains('fsmedia')) swapPhoto(true);
  else { toggleFullscreen(); setTimeout(() => swapPhoto(true), 400); }   // from the side column: go big first, then swap
});
canvas.addEventListener('pointerdown', e => { if (swapped) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
canvas.addEventListener('click', e => { if (swapped) { e.stopImmediatePropagation(); swapPhoto(false); } }, true);
window.addEventListener('resize', fitSwappedMap);
// The slideshow lives in the side column; in fullscreen during the intro it moves onto the map above the minimap.
function placeMedia() {
  const big = !!document.fullscreenElement || document.body.classList.contains('bigmap'), on = big && mode === 'intro' && introMedia.length > 0;
  const m = $('introMedia'); if (on && m.parentElement !== $('fsMediaWrap')) $('fsMediaWrap').appendChild(m); else if (!on && m.parentElement !== $('mediaCard')) $('mediaCard').appendChild(m);
  document.body.classList.toggle('fsmedia', on); if (!on && swapped) swapPhoto(false);
  if (on) requestAnimationFrame(() => document.body.style.setProperty('--mm-top', ($('fsMediaWrap').offsetHeight + 22) + 'px'));
}
function toggleFullscreen() {
  const el = $('battlePanel');
  if (document.fullscreenElement) { document.exitFullscreen && document.exitFullscreen(); return; }
  if (document.body.classList.contains('bigmap')) { setBig(false); return; }
  // Real fullscreen when the browser allows it; otherwise (embedded previews) expand the map to fill the window.
  const p = el.requestFullscreen ? el.requestFullscreen() : Promise.reject();
  p.catch(() => setBig(true));
}
window.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('bigmap')) setBig(false); });
document.addEventListener('fullscreenchange', () => { $('fsBtn').classList.toggle('active', !!document.fullscreenElement); setTimeout(resize, 50); placeMedia(); });
mini.addEventListener('dblclick', e => { e.preventDefault(); toggleFullscreen(); });
$('fsBtn').onclick = toggleFullscreen;
$('mapBtn').onclick = toggleOverview;
let textOff = false; try { textOff = localStorage.getItem('kadesh-textoff') === '1'; } catch (e) {}
function setTextOff(off) { textOff = off; document.body.classList.toggle('textoff', off); try { localStorage.setItem('kadesh-textoff', off ? '1' : '0'); } catch (e) {} }
$('capX').onclick = e => { e.stopPropagation(); setTextOff(true); };
$('introX').onclick = e => { e.stopPropagation(); setTextOff(true); };
$('viewTextBtn').onclick = () => setTextOff(false);
$('introView').onclick = () => setTextOff(false);
$('introNextMini').onclick = () => $('introNext').click();
$('introSkipMini').onclick = () => $('introSkip').click();
document.querySelectorAll('.overlay.center .dialog .xbtn').forEach(b => b.onclick = e => { e.stopPropagation(); setTextOff(true); });
document.querySelectorAll('.viewtext').forEach(b => b.onclick = () => setTextOff(false));
document.querySelectorAll('.closemini').forEach(b => b.onclick = () => { const w = b.dataset.close; if (w === 'cite') hideOverlay('cite'); else if (w === 'unit') hideOverlay('unit'); else if (w === 'explain') $('explainClose').click(); else if (w === 'debrief-watch') $('debriefWatch').click(); else if (w === 'debrief-command') $('debriefCommand').click(); });
setTextOff(textOff);
function exportLayoutGuide() {}   // Dunkirk's layout guides come from tools/draw-layout-guides.py
window.exportLayoutGuide = exportLayoutGuide;

mini.addEventListener('click', e => { const r = mini.getBoundingClientRect(); view.x = (e.clientX - r.left) / r.width * W.w - VW() / 2; view.y = (e.clientY - r.top) / r.height * W.h - VH() / 2; clampView(); manualCamera(); });
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
  const k = e.key.toLowerCase(); let moved = false; const st = 40 / view.z;
  if (['arrowleft', 'a'].includes(k)) { view.x -= st; moved = true; } if (['arrowright', 'd'].includes(k)) { view.x += st; moved = true; }
  if (['arrowup', 'w'].includes(k)) { view.y -= st; moved = true; } if (['arrowdown', 's'].includes(k)) { view.y += st; moved = true; }
  if (moved) { e.preventDefault(); clampView(); manualCamera(); }
  if (k === ' ') { e.preventDefault(); togglePause(); }
  if (k === 'f') { cam.follow = true; $('followBtn').classList.add('active'); if (currentEvent && currentEvent.focus) frame(currentEvent.focus.x, currentEvent.focus.y); }
  if (k === 'e') showExplain();
  if (k === 'm') toggleOverview();
  if (k === 't') setTextOff(!textOff);
  if (k === 'n') skipChapter();
  if (k === 'r') $('resetBtn').click();
  if (k === '>' || k === '.') $('ffBtn').click();
  if (k === 'g' && e.shiftKey) exportLayoutGuide();
  if (k === '+' || k === '=') { view.z = clamp(view.z * 1.15, .45, 2.4); clampView(); } if (k === '-') { view.z = clamp(view.z / 1.15, .45, 2.4); clampView(); }
  if (mode === 'intro' && introStarted) { if (k === 'arrowright' || k === 'enter') showIntro(introIdx + 1); if (k === 'arrowleft') showIntro(introIdx - 1); }
});

/* ---------------- buttons ---------------- */
$('introBtn').onclick = startIntro;
$('watchBtn').onclick = () => startMode('watch');
// Take command: ask which side to lead (the same menu as the start screen, without the reenactment button).
$('commandBtn').onclick = () => { $('playMenu').classList.add('show', 'cmdpick'); };
$('pauseBtn').onclick = togglePause;
$('resetBtn').onclick = () => { if (mode === 'intro') startIntro(); else startMode(mode); };
$('speedSel').onchange = e => { speed = +e.target.value; $('ffBtn').classList.toggle('active', speed > 1); $('ffBtn').textContent = speed > 1 ? '\u23e9 ' + speed + '\u00d7' : '\u23e9 FF'; };
// FF: 1x -> 2x -> 4x -> back to 1x
$('ffBtn').onclick = () => { speed = speed >= 4 ? 1 : speed >= 2 ? 4 : 2; $('speedSel').value = String(speed); $('speedSel').onchange({ target: $('speedSel') }); };
// Skip: jump to the start of the next chapter (Watch mode)
function skipChapter() { if (mode !== 'watch') return; const next = S.events.find(e => e.t > simTime + .01); if (next) jumpTo(next.t); }
$('skipBtn').onclick = skipChapter;
$('followBtn').onclick = () => { cam.follow = !cam.follow; $('followBtn').classList.toggle('active', cam.follow); if (cam.follow && currentEvent && currentEvent.focus) frame(currentEvent.focus.x, currentEvent.focus.y); };
$('explainBtn').onclick = showExplain;
$('capExplain').onclick = e => { e.stopPropagation(); showExplain(); };
$('voiceMenuBtn').onclick = e => { e.stopPropagation(); $('voicePop').classList.toggle('show'); };
document.addEventListener('click', e => { if (!e.target.closest('#voiceWrap')) $('voicePop').classList.remove('show'); });
$('voiceBtn').onclick = () => Narr.toggle();
if (S.voices && S.voices.length) {
  const sel = $('voiceSel'); sel.innerHTML = S.voices.map(v => `<option value="${v.id}"${v.id === voiceId ? ' selected' : ''}>${v.name}</option>`).join('');
  sel.onchange = () => { voiceId = sel.value; try { localStorage.setItem('kadesh-voice', voiceId); } catch (e) {} if (Narr.on) { if (mode === 'intro') speakSlide(S.intro[introIdx]); else if (currentEvent) Narr.speak(currentEvent.text, currentEvent.audio || audioFor('event', S.events.indexOf(currentEvent) + 1)); } };
} else $('voiceSel').style.display = 'none';
try { const r = parseFloat(localStorage.getItem('kadesh-voice-rate')); if (r >= .5 && r <= 2) Narr.rate = r; } catch (e) {}
$('voiceRate').value = String(Narr.rate);
$('voiceRate').onchange = () => { Narr.rate = parseFloat($('voiceRate').value) || 1; if (Narr.audio) Narr.audio.playbackRate = Narr.rate; try { localStorage.setItem('kadesh-voice-rate', String(Narr.rate)); } catch (e) {} };
$('zoomIn').onclick = () => { view.z = clamp(view.z * 1.2, .45, 2.4); clampView(); };
$('zoomOut').onclick = () => { view.z = clamp(view.z / 1.2, .45, 2.4); clampView(); };
$('introNext').onclick = () => { if (G && G.active()) { G.skip(); $('titleCard').classList.remove('show'); } showIntro(introIdx + 1); };
$('introBack').onclick = () => showIntro(introIdx - 1);
$('introPause').onclick = togglePause;
$('introSkip').onclick = () => { if (G && G.active()) { G.skip(); $('titleCard').classList.remove('show'); } showIntro(S.intro.length - 1); };
$('beginVoice').onclick = () => beginIntro(true);
$('beginSilent').onclick = () => beginIntro(false);
$('citeClose').onclick = () => hideOverlay('cite');
$('unitClose').onclick = () => hideOverlay('unit');
$('armiesBtn').onclick = () => { if ($('unit').classList.contains('show')) hideOverlay('unit'); else openUnit(unitIdx < 0 ? 0 : unitIdx); };
$('unitPrev').onclick = () => openUnit(unitIdx - 1);
$('unitNext').onclick = () => openUnit(unitIdx + 1);
$('unitPlate').onclick = () => { const u = (S.units || [])[unitIdx]; if (!u) return; const n = unitPhotos(u).length; if (n > 1) showUnitPhoto((unitPhoto + 1) % n); };
$('chooseWatch').onclick = () => startMode('watch', { skipGlobe: true });
$('chooseCommand').onclick = () => { setPlayer('egypt'); startMode('command', { skipGlobe: true }); };
$('explainClose').onclick = () => { hideOverlay('explain'); Narr.stop(); if (paused && !battleOver) togglePause(); };
$('debriefWatch').onclick = () => startMode('watch');
$('debriefCommand').onclick = () => startMode('command');
$('debriefIntro').onclick = startIntro;
$('selectAll').onclick = () => { selected.clear(); formations.forEach(f => { if (f.side === player && alive(f) && f.state !== 'rout') selected.add(f.id); }); renderSelection(); };
$('sideSel').value = player;
$('sideSel').onchange = () => { setPlayer($('sideSel').value); if (mode === 'command') startMode('command'); };
$('chooseCommandH').onclick = () => { setPlayer('hittite'); startMode('command', { skipGlobe: true }); };
$('playGame').onclick = () => { $('playGame').classList.remove('show'); $('playMenu').classList.remove('cmdpick'); $('playMenu').classList.add('show'); };
$('pmClose').onclick = () => { const fromCmd = $('playMenu').classList.contains('cmdpick'); $('playMenu').classList.remove('show', 'cmdpick'); if (!fromCmd) $('playGame').classList.add('show'); };
$('pmWatch').onclick = () => $('chooseWatch').click();
$('pmEgypt').onclick = () => $('chooseCommand').click();
$('pmHittite').onclick = () => $('chooseCommandH').click();
$('haltBtn').onclick = () => { selected.forEach(id => { const f = byId[id]; if (f.state === 'move' || f.state === 'attack') { f.state = 'hold'; } }); };
$('retreatBtn').onclick = () => { const r = player === 'egypt' ? { x: B.camp.x + 60, y: B.camp.y + 60 } : { x: S.ai.hittite.holdPoint.x - 60, y: S.ai.hittite.holdPoint.y - 60 }; let i = 0; selected.forEach(id => { const f = byId[id]; if (!alive(f) || f.state === 'rout' || f.side !== player) return; f.tx = r.x + (i % 3) * 60; f.ty = r.y + Math.floor(i / 3) * 60; f.state = 'move'; i++; }); };

/* ---------------- main loop ---------------- */
function tick(t) {
  if (!lastFrame) lastFrame = t; const dt = Math.min(.1, (t - lastFrame) / 1000); lastFrame = t; wall += dt; if (mapFade > 0) mapFade = Math.max(0, mapFade - dt / .9);
  if (mode === 'intro') {
    const sl = S.intro[introIdx];
    if (introStarted && !introPaused && !sl.choice) {
      // Play the narration (or allow reading time), then light up NEXT NARRATION with a 5-second countdown.
      let tail = false, frac = 0;
      if (Narr.on && Narr.audio) { const au = Narr.audio; if (au.ended && au.currentTime >= au.duration - .05) tail = true; else frac = au.duration ? Math.min(1, au.currentTime / au.duration) : 0; }
      else if (Narr.on && 'speechSynthesis' in window && speechSynthesis.speaking) frac = .5;
      else { if (!(G && G.active())) introTimer += dt; frac = Math.min(1, introTimer / sl.auto); if (introTimer >= sl.auto) tail = true; }
      showMedia(Narr.on && Narr.audio ? Narr.audio.currentTime * (Narr.rate || 1) / (Narr.rate || 1) : introTimer);
      const nb = $('introNext');
      if (tail) { introTail += dt; frac = 1; nb.textContent = `Next narration \u25b6 ${Math.max(0, Math.ceil(INTRO_BREAK - introTail))}`; nb.classList.add('ready'); $('ctrlStrip').classList.add('lit'); if (introTail >= INTRO_BREAK) showIntro(introIdx + 1); }
      else { introTail = 0; if (nb.classList.contains('ready')) { nb.textContent = 'Next \u25b6'; nb.classList.remove('ready'); $('ctrlStrip').classList.remove('lit'); } }
      $('introBar').style.width = Math.min(100, frac * 100) + '%';
    }
  } else if (!paused && !battleOver && !cinematic) {
    acc += dt * speed;
    while (acc >= DT) {
      // In Watch mode, hold at a chapter boundary while the narrator is still speaking the previous one.
      if (mode === 'watch' && Narr.on && Narr.audio && (!Narr.audio.ended || wall - Narr.endedAt < CHAPTER_BREAK) && eventIndex < S.events.length && S.events[eventIndex].t <= simTime + DT) { acc = 0; break; }
      acc -= DT; simTime += DT; if (mode === 'watch') stepWatch(); else stepCommand();
    }
    $('clock').textContent = fmtTime(simTime); const now = $('tlNow'); if (now) now.style.left = (simTime / S.duration * 100) + '%';
  }
  render(); requestAnimationFrame(tick);
}

/* ---------------- boot ---------------- */
renderBriefing(); renderArmies(); createFormations();
loadMaps(); setMap(S.startMap || 'campaign', true);
function applyArt() {}
$('artBtn').style.display = 'none';
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};
new ResizeObserver(resize).observe(panel); resize();
view.x = 600; view.y = 300; startIntro();
requestAnimationFrame(tick);
// For the shared page add-ons (../phone.js, ../subtitles.js): the narrator and the full-map switch.
window.BattlePage = { Narr, setBig };
})();
