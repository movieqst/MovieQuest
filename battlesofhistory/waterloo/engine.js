/* Battles of History — reenactment & command engine (Waterloo build; battle-neutral except where noted).
   Reads window.WATERLOO_SCENARIO (scenario.js). Plain 2D Canvas, no libraries. */
(() => {
'use strict';
const S = window.WATERLOO_SCENARIO, W = S.world, B = S.battlefield;
/* A battle may leave out its river, road, fords, city or camp. Missing lists become empty; a missing city or camp
   becomes an empty box far off the map, so the drawing code can still read it and draw nothing. */
['river', 'tributary', 'fords', 'forests', 'hills', 'labels', 'road', 'fields'].forEach(k => { B[k] = B[k] || []; });
if (!B.city) B.city = { name: '', x: -1e5, y: -1e5, w: 0, h: 0 };
if (!B.camp) B.camp = { name: '', x: -1e5, y: -1e5, w: 0, h: 0 };
if (!B.bridge) B.bridge = { x: -1e5, y: -1e5 };
const $ = id => document.getElementById(id);
const canvas = $('battle'), ctx = canvas.getContext('2d');
const mini = $('minimap'), mctx = mini.getContext('2d');
const panel = $('battlePanel');
const TS = 1.5;                 // terrain pre-render scale
const DT = 1 / 30;              // fixed simulation step (seconds)
const PI = Math.PI;

/* ---------------- state ---------------- */
const view = { x: 0, y: 0, w: 1000, h: 650, z: 1.25 };
const WATCH_Z = 1.25;   // the zoom watch-mode chapters return to after the opening view of the whole map
const cam  = { tx: null, ty: null, tz: null, fit: false, follow: true };
let mode = 'intro';             // intro | watch | command
let paused = false, cinematic = false, speed = 1, simTime = 0, acc = 0, lastFrame = 0, wall = 0;
let formations = [], byId = {};
let eventIndex = 0, currentEvent = null, aiFlags = {}, battleOver = null, fastForward = false;
let selected = new Set();
let player = 'allied'; try { const sv = localStorage.getItem('waterloo-side'); if (sv === 'french' || sv === 'allied') player = sv; } catch (e) {}
const setPlayer = sd => { player = sd; try { localStorage.setItem('waterloo-side', sd); } catch (e) {} const sel = $('sideSel'); if (sel) sel.value = sd; };
let dragging = false, last = null, dragMoved = false, band = null, overview = null;
let introIdx = 0, introTimer = 0, introTail = 0, introPaused = false, introStarted = false, introMedia = [], mediaIdx = -1;
const G = window.WaterlooGlobe;
const INTRO_BREAK = 5, CHAPTER_BREAK = 2.5;
let markers = [];
let TER = null, MINIBASE = null, PAINTED = false, PAINTEDTER = null, DRAWNTER = null, artOn = true; try { artOn = localStorage.getItem('waterloo-art') !== '0'; } catch (e) {}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const jitter = (i, k = 0) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const alive = f => f.present && f.state !== 'withdrawn' && f.state !== 'destroyed';
const esc = t => String(t || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const tagChip = (tag, cite) => { const c = S.confidence[tag] || S.confidence.reconstruction; return `<button class="chip" style="--c:${c.color}" title="${c.desc} Click for the sources." data-tag="${tag}" data-cite="${esc(cite)}">${c.label}</button>`; };
let voiceId = (S.voices && S.voices[0]) ? S.voices[0].id : '';
try { const v = localStorage.getItem('waterloo-voice'); if (v && S.voices.some(x => x.id === v)) voiceId = v; } catch (e) {}
const audioFor = (kind, n) => S.audioBase ? S.audioBase + (voiceId ? voiceId + '/' : '') + kind + (n !== undefined ? '-' + n : '') + '.mp3' : undefined;

function riverXAt(y) {
  const p = B.river;
  if (!p.length) return Infinity;
  for (let i = 0; i < p.length - 1; i++) {
    const [x1, y1] = p[i], [x2, y2] = p[i + 1];
    if ((y <= y1 && y >= y2) || (y >= y1 && y <= y2)) { const t = (y - y1) / ((y2 - y1) || 1); return x1 + (x2 - x1) * t; }
  }
  return p[0][0];
}

/* ---------------- terrain for movement: water, fords, bridge, city and moat ---------------- */
const distToPolyline = (x, y, pts) => { let best = 1e9; for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], dx = x2 - x1, dy = y2 - y1, L = dx * dx + dy * dy || 1; let t = ((x - x1) * dx + (y - y1) * dy) / L; t = clamp(t, 0, 1); const d = Math.hypot(x - (x1 + dx * t), y - (y1 + dy * t)); if (d < best) best = d; } return best; };
const inRiver = (x, y) => distToPolyline(x, y, B.river) < 34;
const inTrib = (x, y) => distToPolyline(x, y, B.tributary) < 16;
const inWater = (x, y) => inRiver(x, y) || inTrib(x, y);
const MOAT = 30, KEEP = 75, CITYR = { x0: B.city.x - MOAT - KEEP, y0: B.city.y - MOAT - KEEP, x1: B.city.x + B.city.w + MOAT + KEEP, y1: B.city.y + B.city.h + MOAT + KEEP };
const inCity = (x, y) => x > CITYR.x0 && x < CITYR.x1 && y > CITYR.y0 && y < CITYR.y1;
const westOfRiver = (x, y) => x < riverXAt(y);
const tribYAt = x => { const p = B.tributary; if (!p.length || x <= p[0][0] || x >= p[p.length - 1][0]) return null; for (let i = 0; i < p.length - 1; i++) if (x >= p[i][0] && x <= p[i + 1][0]) { const t = (x - p[i][0]) / (p[i + 1][0] - p[i][0]); return p[i][1] + (p[i + 1][1] - p[i][1]) * t; } return null; };
const crossesTrib = (a, b) => { const ya = tribYAt(a.x), yb = tribYAt(b.x); if (ya === null && yb === null) return false; const sa = ya === null ? null : a.y < ya, sb = yb === null ? null : b.y < yb; if (sa !== null && sb !== null) return sa !== sb; const y0 = ya !== null ? ya : yb, mid = (a.y + b.y) / 2; return (a.y < y0) !== (b.y < y0) && Math.abs(mid - y0) < 120; };
const segHitsRect = (a, b, r) => { if (inCity(a.x, a.y) || inCity(b.x, b.y)) return true; for (let t = 0; t <= 1; t += .05) { const x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t; if (x > r.x0 && x < r.x1 && y > r.y0 && y < r.y1) return true; } return false; };
// Push a point out of the city and moat to the nearest edge.
function legal(p) { if (!inCity(p.x, p.y)) return p; const dl = p.x - CITYR.x0, dr = CITYR.x1 - p.x, dt = p.y - CITYR.y0, db = CITYR.y1 - p.y, m = Math.min(dl, dr, dt, db); return m === dl ? { x: CITYR.x0 - 12, y: p.y } : m === dr ? { x: CITYR.x1 + 12, y: p.y } : m === dt ? { x: p.x, y: CITYR.y0 - 12 } : { x: p.x, y: CITYR.y1 + 12 }; }
// Waypoints from a to b: river only at a ford, the tributary only at the bridge, never through the city or its moat.
function planPath(a, b) {
  let legs = [a, b];
  // river
  if (!inRiver(a.x, a.y) && !inRiver(b.x, b.y) && westOfRiver(a.x, a.y) !== westOfRiver(b.x, b.y)) {
    let best = null, bd = 1e9; B.fords.forEach(f => { const d = Math.hypot(a.x - f.x, a.y - f.y) + Math.hypot(b.x - f.x, b.y - f.y); if (d < bd) { bd = d; best = f; } });
    if (best) { const w = { x: best.x - 55, y: best.y }, ea = { x: best.x + 55, y: best.y }; legs = westOfRiver(a.x, a.y) ? [a, w, ea, b] : [a, ea, w, b]; }
  }
  // tributary (per leg)
  let out = [legs[0]];
  for (let i = 1; i < legs.length; i++) { const p = out[out.length - 1], q = legs[i]; if (!inTrib(p.x, p.y) && !inTrib(q.x, q.y) && crossesTrib(p, q)) { const br = B.bridge, n = { x: br.x, y: br.y - 34 }, so = { x: br.x, y: br.y + 34 }; if (p.y < q.y) out.push(n, so); else out.push(so, n); } out.push(q); }
  legs = out;
  // city and moat (per leg): go round the nearest corner
  out = [legs[0]];
  for (let i = 1; i < legs.length; i++) { const p = out[out.length - 1], q = legs[i];
    if (!inCity(p.x, p.y) && !inCity(q.x, q.y) && segHitsRect(p, q, CITYR)) {
      const pad = 26, cs = [{ x: CITYR.x0 - pad, y: CITYR.y0 - pad }, { x: CITYR.x1 + pad, y: CITYR.y0 - pad }, { x: CITYR.x0 - pad, y: CITYR.y1 + pad }, { x: CITYR.x1 + pad, y: CITYR.y1 + pad }];
      // one corner, or two along a side when one is not enough
      let best = null, bd = 1e9; cs.forEach(c => { if (segHitsRect(p, c, CITYR) || segHitsRect(c, q, CITYR)) return; const d = Math.hypot(p.x - c.x, p.y - c.y) + Math.hypot(c.x - q.x, c.y - q.y); if (d < bd) { bd = d; best = [c]; } });
      if (!best) { const pairs = [[0, 1], [2, 3], [0, 2], [1, 3]]; pairs.forEach(([i1, i2]) => { for (const [c1, c2] of [[cs[i1], cs[i2]], [cs[i2], cs[i1]]]) { if (segHitsRect(p, c1, CITYR) || segHitsRect(c2, q, CITYR)) continue; const d = Math.hypot(p.x - c1.x, p.y - c1.y) + Math.hypot(c1.x - c2.x, c1.y - c2.y) + Math.hypot(c2.x - q.x, c2.y - q.y); if (d < bd) { bd = d; best = [c1, c2]; } } }); }
      if (best) out.push(...best);
    }
    out.push(q); }
  return out.slice(1);
}

/* ---------------- terrain (pre-rendered once) ---------------- */
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
function tree(c, x, y, r, k) {
  c.fillStyle = 'rgba(30,30,15,.28)'; c.beginPath(); c.ellipse(x + r * .5, y + r * .55, r * 1.05, r * .55, 0, 0, PI * 2); c.fill();
  c.fillStyle = k % 3 === 0 ? '#3f5c30' : '#4a6a36'; c.beginPath(); c.arc(x, y, r, 0, PI * 2); c.fill();
  c.fillStyle = k % 2 ? '#64854a' : '#5c7d42'; c.beginPath(); c.arc(x - r * .25, y - r * .25, r * .62, 0, PI * 2); c.fill();
  c.fillStyle = '#89a85e'; c.beginPath(); c.arc(x - r * .4, y - r * .42, r * .25, 0, PI * 2); c.fill();
}
function waterBand(c, pts, w) {
  // Organic river: resample the centreline, wobble it, give each side its own bank, then layer water, shallows, sandbars, reeds and ripples.
  const dense = []; for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], n = Math.max(2, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 10)); for (let k = 0; k < n; k++) { const t = k / n; dense.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]); } } dense.push(pts[pts.length - 1]);
  const sm = []; for (let i = 0; i < dense.length; i++) { let ax = 0, ay = 0, n = 0; for (let k = -4; k <= 4; k++) { const p = dense[clamp(i + k, 0, dense.length - 1)]; ax += p[0]; ay += p[1]; n++; } sm.push([ax / n, ay / n]); }
  const nrm = i => { const a = sm[Math.max(0, i - 1)], b = sm[Math.min(sm.length - 1, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1; return [-dy / d, dx / d]; };
  const wid = i => w * (1 + .22 * Math.sin(i * .11) + .12 * Math.sin(i * .037 + 1.3));
  const edge = (side, extra, wob) => sm.map((p, i) => { const [nx, ny] = nrm(i), hw = wid(i) / 2 + extra + wob * (Math.sin(i * .9 + side) * 1.6 + Math.sin(i * .23 + side * 2) * 2.2); return [p[0] + nx * hw * side, p[1] + ny * hw * side]; });
  const poly = (L, R) => { c.beginPath(); L.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); for (let i = R.length - 1; i >= 0; i--) c.lineTo(R[i][0], R[i][1]); c.closePath(); };
  // damp banks
  poly(edge(1, 16, 1.4), edge(-1, 16, 1.4)); c.fillStyle = 'rgba(120,100,62,.55)'; c.fill();
  poly(edge(1, 8, 1.2), edge(-1, 8, 1.2)); c.fillStyle = '#8c7a52'; c.fill();
  // water
  poly(edge(1, 0, 1), edge(-1, 0, 1)); c.fillStyle = '#2b6d88'; c.fill();
  c.save(); c.clip();
  poly(edge(1, -w * .18, .6), edge(-1, -w * .18, .6)); c.fillStyle = '#3f8aa3'; c.fill();
  poly(edge(1, -w * .36, .4), edge(-1, -w * .36, .4)); c.fillStyle = '#2a6f8e'; c.fill();
  // shallows along the inside of bends and a few sandbars
  for (let i = 30; i < sm.length - 30; i += 47) { const [nx, ny] = nrm(i), sd = i % 2 ? 1 : -1, hw = wid(i) / 2, p = sm[i]; c.fillStyle = 'rgba(205,181,124,.9)'; c.beginPath(); c.ellipse(p[0] + nx * hw * .55 * sd, p[1] + ny * hw * .55 * sd, 11 + (i % 5) * 3, 5, Math.atan2(ny, nx) + PI / 2, 0, PI * 2); c.fill(); c.fillStyle = 'rgba(120,190,200,.35)'; c.beginPath(); c.ellipse(p[0] + nx * hw * .5 * sd, p[1] + ny * hw * .5 * sd, 20 + (i % 5) * 4, 9, Math.atan2(ny, nx) + PI / 2, 0, PI * 2); c.fill(); }
  // ripples and glints
  c.strokeStyle = 'rgba(190,235,245,.45)'; c.lineWidth = 1;
  for (let i = 4; i < sm.length - 4; i += 6) { const [nx, ny] = nrm(i), p = sm[i], off = (Math.sin(i * .7) * .5) * wid(i) * .6, tx = -ny, ty = nx, len = 4 + (i % 4) * 2; c.beginPath(); c.moveTo(p[0] + nx * off - tx * len, p[1] + ny * off - ty * len); c.quadraticCurveTo(p[0] + nx * (off + 2), p[1] + ny * (off + 2), p[0] + nx * off + tx * len, p[1] + ny * off + ty * len); c.stroke(); }
  c.restore();
  // bank line and reeds
  [1, -1].forEach(sd => { const E = edge(sd, 0, 1); c.beginPath(); E.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.strokeStyle = 'rgba(60,70,40,.55)'; c.lineWidth = 1.5; c.stroke();
    for (let i = 3; i < E.length - 3; i += 5) { if (jitter(i, sd + 10) < .45) continue; const [nx, ny] = nrm(i), p = E[i], bx = p[0] + nx * sd * (2 + jitter(i, 3) * 6), by = p[1] + ny * sd * (2 + jitter(i, 3) * 6); c.strokeStyle = jitter(i, 4) < .5 ? '#5f7a3a' : '#7a9a48'; c.lineWidth = 1.2; for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + k * 2.5 + jitter(i + k, 5) * 2 - 1, by - 7 - jitter(i + k, 6) * 6); c.stroke(); } } });
}
function buildTerrain() {
  const T = document.createElement('canvas'); T.width = W.w * TS; T.height = W.h * TS;
  const c = T.getContext('2d'); c.scale(TS, TS);
  // base ground
  c.fillStyle = '#b5a26c'; c.fillRect(0, 0, W.w, W.h);
  const cols = ['#c3ae75', '#a99a62', '#b9a86b', '#a4a364', '#c7b27a', '#9c9458'];
  for (let i = 0; i < 420; i++) {
    const x = jitter(i, 1) * W.w, y = jitter(i, 2) * W.h, r = 50 + jitter(i, 3) * 130;
    const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, cols[i % cols.length] + 'aa'); g.addColorStop(1, cols[i % cols.length] + '00');
    c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // cultivated fields around the city and along the river
  const fields = B.fields;
  const fcol = ['#c9b26a', '#a9b06a', '#b89f5c', '#8fa05a', '#cdbb7b'];
  fields.forEach((f, i) => {
    c.save(); c.translate(f[0], f[1]); c.rotate(f[4]); c.fillStyle = fcol[i % fcol.length]; c.fillRect(-f[2] / 2, -f[3] / 2, f[2], f[3]);
    c.strokeStyle = 'rgba(80,70,30,.25)'; c.lineWidth = 1; for (let k = -f[3] / 2 + 6; k < f[3] / 2; k += 7) { c.beginPath(); c.moveTo(-f[2] / 2, k); c.lineTo(f[2] / 2, k); c.stroke(); }
    c.strokeStyle = 'rgba(60,50,20,.5)'; c.lineWidth = 2; c.strokeRect(-f[2] / 2, -f[3] / 2, f[2], f[3]); c.restore();
  });
  // grass tufts and stones
  for (let i = 0; i < 2600; i++) {
    const x = jitter(i, 4) * W.w, y = jitter(i, 5) * W.h; if (Math.abs(x - riverXAt(y)) < 50) continue;
    c.strokeStyle = i % 4 === 0 ? 'rgba(120,130,60,.7)' : 'rgba(90,100,45,.55)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2, y - 4); c.moveTo(x, y); c.lineTo(x + 2, y - 4); c.moveTo(x, y); c.lineTo(x, y - 5); c.stroke();
    if (i % 9 === 0) { c.fillStyle = 'rgba(70,60,40,.5)'; c.beginPath(); c.ellipse(x + 8, y + 3, 2.5, 1.6, 0, 0, PI * 2); c.fill(); }
  }
  // road
  if (B.road.length) { c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); curve(c, B.road); c.strokeStyle = 'rgba(90,75,45,.5)'; c.lineWidth = 16; c.stroke();
  c.beginPath(); curve(c, B.road); c.strokeStyle = '#d6c28e'; c.lineWidth = 11; c.stroke();
  c.setLineDash([10, 14]); c.beginPath(); curve(c, B.road); c.strokeStyle = 'rgba(120,100,60,.5)'; c.lineWidth = 2; c.stroke(); c.restore(); }
  // hills
  B.hills.forEach((h, i) => {
    c.fillStyle = 'rgba(40,30,15,.22)'; c.beginPath(); c.ellipse(h.x + 10, h.y + 10, h.rx, h.ry, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#a08c5f'; c.beginPath(); c.ellipse(h.x, h.y, h.rx, h.ry, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#c0ab74'; c.beginPath(); c.ellipse(h.x - h.rx * .2, h.y - h.ry * .25, h.rx * .6, h.ry * .5, 0, 0, PI * 2); c.fill();
    c.strokeStyle = 'rgba(90,75,45,.6)'; c.lineWidth = 1.5; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(h.x - h.rx * .7 + k * h.rx * .35, h.y + h.ry * .3); c.lineTo(h.x - h.rx * .5 + k * h.rx * .35, h.y - h.ry * .2); c.stroke(); }
  });
  // water
  if (B.tributary.length) waterBand(c, B.tributary, 22);
  if (B.river.length) waterBand(c, B.river, 58);
  B.fords.forEach(f => {
    c.save(); c.strokeStyle = 'rgba(230,220,180,.75)'; c.lineWidth = 3; c.setLineDash([4, 6]);
    for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(f.x - 44, f.y + k * 9); c.lineTo(f.x + 44, f.y + k * 9); c.stroke(); }
    c.restore(); outlined(c, f.name, f.x, f.y + 34, 12, { fill: '#e8f4f6' });
  });
  // forests: a shaded floor; the trees themselves stand (see PROPS)
  B.forests.forEach(fo => { const g = c.createRadialGradient(fo.x, fo.y, 0, fo.x, fo.y, fo.r); g.addColorStop(0, 'rgba(70,95,50,.35)'); g.addColorStop(1, 'rgba(70,95,50,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(fo.x, fo.y, fo.r, fo.r * .8, 0, 0, PI * 2); c.fill(); });
  // a walled city, if the battle has one: in the terrain only the moat and the ground inside; the walls and buildings are drawn standing (see drawCity)
  const ct = B.city;
  c.fillStyle = '#2f7590'; c.beginPath(); c.roundRect(ct.x - 26, ct.y - 26, ct.w + 52, ct.h + 52, 30); c.fill();
  c.fillStyle = '#4a98ae'; c.beginPath(); c.roundRect(ct.x - 18, ct.y - 18, ct.w + 36, ct.h + 36, 24); c.fill();
  c.fillStyle = '#9a8a62'; c.beginPath(); c.roundRect(ct.x - 8, ct.y - 8, ct.w + 16, ct.h + 16, 10); c.fill();
  c.fillStyle = '#b6a477'; c.fillRect(ct.x, ct.y, ct.w, ct.h);
  outlined(c, ct.name, ct.x + ct.w / 2, ct.y + ct.h + 46, 20, { fill: '#f8e9bf' });
  // the Allied camp: trampled ground; shields and tents stand (see drawCamp)
  const cp = B.camp;
  c.fillStyle = 'rgba(210,190,140,.35)'; c.fillRect(cp.x, cp.y, cp.w, cp.h);
  outlined(c, cp.name, cp.x + cp.w / 2, cp.y - 18, 12, { fill: '#dce9ff' });
  // labels
  B.labels.forEach(l => outlined(c, l.text, l.x, l.y, l.small ? 13 : 26, { rotate: l.rotate || 0, fill: l.small ? '#efe3c3' : '#dff3f6', weight: l.small ? 'italic' : 'bold' }));
  return T;
}
function shield(c, x, y, vert) { c.save(); c.translate(x, y); if (vert) c.rotate(PI / 2); c.fillStyle = '#3b2c1a'; c.fillRect(-5, -3, 10, 6); c.fillStyle = '#d9c38a'; c.fillRect(-4, -2, 8, 4); c.restore(); }
function tent(c, x, y, s, col, royal) {
  c.fillStyle = 'rgba(30,20,10,.3)'; c.beginPath(); c.ellipse(x + s * .3, y + s * .5, s * 1.1, s * .45, 0, 0, PI * 2); c.fill();
  c.fillStyle = col; c.beginPath(); c.moveTo(x - s, y + s * .5); c.lineTo(x, y - s); c.lineTo(x + s, y + s * .5); c.closePath(); c.fill();
  c.fillStyle = 'rgba(120,90,40,.45)'; c.beginPath(); c.moveTo(x, y - s); c.lineTo(x + s, y + s * .5); c.lineTo(x + s * .2, y + s * .5); c.closePath(); c.fill();
  c.strokeStyle = '#6b5636'; c.lineWidth = 1; c.stroke();
  if (royal) { c.fillStyle = '#2f6fc4'; c.fillRect(x - s * .5, y - s * .1, s, s * .14); c.fillStyle = '#e9c77a'; c.fillRect(x - s * .5, y + s * .12, s, s * .14); c.strokeStyle = '#3b2c1a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y - s); c.lineTo(x, y - s * 1.9); c.stroke(); c.fillStyle = '#2f6fc4'; c.beginPath(); c.moveTo(x, y - s * 1.9); c.lineTo(x + s * .9, y - s * 1.65); c.lineTo(x, y - s * 1.4); c.closePath(); c.fill(); }
}

/* ---------------- unit sprites (drawn facing +x, origin at the feet) ---------------- */
// Allied in red (the British redcoats), French in blue.
const SIDE_ART = {
  allied: { skin: '#b57a4a', head: '#b58a3c', headStroke: '#4a3418', shield: '#8a3a30', shieldStroke: '#3a1a14', cab: '#c9463a', cabLight: '#ff9d8a', wheel: '#3a2a1c', horse: '#5a3a26', horse2: '#7a4e34', pennant: '#d44c3e', trim: '#f3d9a0' },
  french: { skin: '#c98b58', head: '#f2ead3', headStroke: '#6a5a3a', shield: '#d9c38a', shieldStroke: '#5a4020', cab: '#3985d7', cabLight: '#7fb6ff', wheel: '#4b3a26', horse: '#6b4a2f', horse2: '#8a6240', pennant: '#3985d7', trim: '#e9c77a' }
};
/* Upright three-quarter-view figures (origin at the feet, drawn facing one of four directions). */
const dirOf = facing => { const a = ((facing % (2 * PI)) + 2 * PI) % (2 * PI); return a < PI / 4 || a > 7 * PI / 4 ? 'e' : a < 3 * PI / 4 ? 's' : a < 5 * PI / 4 ? 'w' : 'n'; };
function figInfantry(c, side, archer, s, i, dir, step) {
  const A = SIDE_ART[side], hit = side === 'allied', skin = A.skin, cloth = hit ? '#8a3a30' : '#f4efe2', cloth2 = hit ? '#6a2a22' : '#ddd3bb';
  c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(0, .6 * s, 5 * s, 2 * s, 0, 0, PI * 2); c.fill();
  const side_ = dir === 'e' || dir === 'w', back = dir === 'n', sw = Math.sin(step) * 1.6 * s;
  // legs
  c.strokeStyle = skin; c.lineWidth = 1.7 * s; c.lineCap = 'round';
  if (side_) { c.beginPath(); c.moveTo(-.6 * s, -5 * s); c.lineTo(-.6 * s - sw, 0); c.moveTo(1 * s, -5 * s); c.lineTo(1 * s + sw, 0); c.stroke(); }
  else { c.beginPath(); c.moveTo(-1.6 * s, -5 * s); c.lineTo(-1.6 * s, Math.abs(sw) * .4); c.moveTo(1.6 * s, -5 * s); c.lineTo(1.6 * s, -Math.abs(sw) * .4); c.stroke(); }
  // spear / bow behind the body for back view
  const spear = () => { c.strokeStyle = '#5a3b22'; c.lineWidth = 1.1 * s; c.beginPath(); if (side_) { c.moveTo(-4 * s, -10.5 * s); c.lineTo(9 * s, -12.5 * s); } else { c.moveTo(4 * s, -2 * s); c.lineTo(5.5 * s, -21 * s); } c.stroke(); c.fillStyle = '#d9d2c0'; c.beginPath(); if (side_) { c.moveTo(9 * s, -12.5 * s); c.lineTo(11.5 * s, -13.4 * s); c.lineTo(9.3 * s, -11.4 * s); } else { c.moveTo(5.5 * s, -21 * s); c.lineTo(6.6 * s, -23.4 * s); c.lineTo(4.4 * s, -21.6 * s); } c.closePath(); c.fill(); };
  const shield = () => { c.fillStyle = A.shieldStroke; c.beginPath();
    if (hit) { if (side_) c.ellipse(3.6 * s, -10 * s, 1.7 * s, 3.4 * s, 0, 0, PI * 2); else c.arc(back ? 0 : -5 * s, -10.5 * s, 3.3 * s, 0, PI * 2); }
    else { if (side_) c.roundRect(2.3 * s, -14 * s, 3.2 * s, 8.2 * s, 1.5 * s); else c.roundRect((back ? -2.6 : -7) * s, -14.5 * s, 4.8 * s, 8.4 * s, 2 * s); }
    c.fill(); c.fillStyle = A.shield; c.beginPath();
    if (hit) { if (side_) c.ellipse(3.6 * s, -10 * s, 1 * s, 2.5 * s, 0, 0, PI * 2); else c.arc(back ? 0 : -5 * s, -10.5 * s, 2.4 * s, 0, PI * 2); }
    else { if (side_) c.roundRect(2.9 * s, -13.3 * s, 2 * s, 6.8 * s, 1.2 * s); else c.roundRect((back ? -1.9 : -6.3) * s, -13.8 * s, 3.4 * s, 7 * s, 1.6 * s); }
    c.fill(); };
  if (back && !archer) spear();
  // kilt / tunic and torso
  const bw = side_ ? 2.2 : 3.2;
  c.fillStyle = cloth; c.fillRect(-bw * s, -9.2 * s, 2 * bw * s, 4.6 * s); c.fillStyle = cloth2; c.fillRect(-bw * s, -5.6 * s, 2 * bw * s, 1 * s);
  c.fillStyle = hit ? '#9c4a3a' : skin; c.fillRect(-bw * s, -13.4 * s, 2 * bw * s, 4.4 * s);
  if (hit) { c.fillStyle = '#c9a060'; c.fillRect(-bw * s, -9.6 * s, 2 * bw * s, .8 * s); } // belt
  // arms
  c.strokeStyle = skin; c.lineWidth = 1.4 * s; c.beginPath(); if (side_) { c.moveTo(0, -12.5 * s); c.lineTo(3 * s, -10.5 * s); } else { c.moveTo(-bw * s, -12.5 * s); c.lineTo(-bw * s - 2 * s, -9.5 * s); c.moveTo(bw * s, -12.5 * s); c.lineTo(bw * s + 1.5 * s, -9 * s); } c.stroke();
  // head and headgear
  c.fillStyle = skin; c.beginPath(); c.arc(0, -15.6 * s, 2.3 * s, 0, PI * 2); c.fill();
  if (hit) { c.fillStyle = A.head; c.beginPath(); c.moveTo(-2.6 * s, -16.4 * s); c.lineTo(0, -21.5 * s); c.lineTo(2.6 * s, -16.4 * s); c.closePath(); c.fill(); c.strokeStyle = A.headStroke; c.lineWidth = .8 * s; c.stroke(); c.strokeStyle = '#4a3418'; c.lineWidth = 1.1 * s; c.beginPath(); c.moveTo(0, -21.5 * s); c.lineTo(side_ ? -3 * s : 0, -24 * s); c.stroke(); }
  else { c.fillStyle = A.head; c.beginPath(); c.roundRect(-2.9 * s, -18.6 * s, 5.8 * s, 3.4 * s, 1.5 * s); c.fill(); if (!back) { c.fillStyle = '#2f6fc4'; c.fillRect(-2.9 * s, -17.6 * s, 5.8 * s, .7 * s); } }
  // weapon / shield in front
  if (!archer) { if (!back) { shield(); if (!side_ || true) spear(); } }
  else {
    c.strokeStyle = '#4e3424'; c.lineWidth = 1.1 * s; c.beginPath();
    if (side_) c.arc(3.2 * s, -11.5 * s, 5 * s, -PI / 2, PI / 2); else c.arc(4.2 * s, -11.5 * s, 5 * s, -1.25, 1.25);
    c.stroke(); c.strokeStyle = '#d9d2c0'; c.lineWidth = .6 * s; c.beginPath();
    if (side_) { c.moveTo(3.2 * s, -16.5 * s); c.lineTo(3.2 * s, -6.5 * s); } else { c.moveTo(4.2 * s + Math.cos(-1.25) * 5 * s, -11.5 * s + Math.sin(-1.25) * 5 * s); c.lineTo(4.2 * s + Math.cos(1.25) * 5 * s, -11.5 * s + Math.sin(1.25) * 5 * s); }
    c.stroke(); c.fillStyle = '#7a5a30'; c.fillRect(-4.6 * s, -16 * s, 1.8 * s, 6 * s); // quiver
  }
}
/* Drawn stand-in for the elephant until a painted sheet (images/units/french-elephant.png) is present. */
function figElephant(c, side, s, moving, dir, step) {
  const A = SIDE_ART[side], side_on = dir === 'e', bob = moving ? Math.sin(step) * .8 * s : 0;
  c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(0, .6 * s, (side_on ? 15 : 10) * s, 3.6 * s, 0, 0, PI * 2); c.fill();
  c.fillStyle = '#7d7a74'; c.strokeStyle = '#4c4a45'; c.lineWidth = .8 * s;
  const legs = side_on ? [-8, -4, 5, 9] : [-6, -2, 2, 6];
  legs.forEach((x, k) => { const sw = moving ? Math.sin(step + k * 1.6) * 1.2 * s : 0; c.fillRect(x * s - 1.6 * s + sw, -9 * s, 3.2 * s, 9 * s); });
  c.beginPath(); c.ellipse(0, -14 * s + bob, (side_on ? 13 : 9) * s, 8 * s, 0, 0, PI * 2); c.fill(); c.stroke();
  c.fillStyle = A.cab; c.fillRect((side_on ? -7 : -6) * s, -21 * s + bob, (side_on ? 14 : 12) * s, 6 * s);
  c.fillStyle = '#7d7a74';
  if (side_on) { c.beginPath(); c.ellipse(13 * s, -15 * s + bob, 5 * s, 5.5 * s, 0, 0, PI * 2); c.fill(); c.stroke();
    c.lineWidth = 2.4 * s; c.strokeStyle = '#7d7a74'; c.beginPath(); c.moveTo(16 * s, -13 * s + bob); c.quadraticCurveTo(20 * s, -7 * s, 18 * s, -2 * s); c.stroke();
    c.strokeStyle = '#f2ead3'; c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(15 * s, -11 * s + bob); c.lineTo(19 * s, -10 * s + bob); c.stroke(); }
  else { c.beginPath(); c.ellipse(0, dir === 'n' ? -18 * s + bob : -12 * s + bob, 5.5 * s, 5.5 * s, 0, 0, PI * 2); c.fill(); c.stroke();
    if (dir !== 'n') { c.lineWidth = 2.4 * s; c.strokeStyle = '#7d7a74'; c.beginPath(); c.moveTo(0, -9 * s + bob); c.lineTo(0, -2 * s); c.stroke(); } }
  c.fillStyle = A.skin; c.beginPath(); c.arc(side_on ? 6 * s : 0, -23.5 * s + bob, 2 * s, 0, PI * 2); c.fill();
  c.fillStyle = A.cab; c.fillRect((side_on ? 4.6 : -1.4) * s, -22 * s + bob, 2.8 * s, 3 * s);
}
function figChariot(c, side, s, i, moving, dir, step) {
  const A = SIDE_ART[side], crew = side === 'french' ? 3 : 2, sw = moving ? Math.sin(step) * 1.8 * s : 0;
  c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(1 * s, .6 * s, (dir === 'e' || dir === 'w' ? 15 : 9) * s, 3.4 * s, 0, 0, PI * 2); c.fill();
  if (moving) { c.fillStyle = 'rgba(210,190,140,.35)'; c.beginPath(); c.arc(-12 * s, -1 * s, 3.5 * s, 0, PI * 2); c.arc(-15 * s, -3 * s, 2.6 * s, 0, PI * 2); c.fill(); }
  const wheelSide = (x, y, r) => { c.fillStyle = A.wheel; c.beginPath(); c.arc(x, y, r, 0, PI * 2); c.fill(); c.strokeStyle = '#8a7a5a'; c.lineWidth = .7 * s; for (let k = 0; k < 3; k++) { const a = k * PI / 3 + (moving ? wall * 9 : 0); c.beginPath(); c.moveTo(x - Math.cos(a) * r, y - Math.sin(a) * r); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.stroke(); } c.strokeStyle = '#2a1a0c'; c.lineWidth = .9 * s; c.beginPath(); c.arc(x, y, r, 0, PI * 2); c.stroke(); };
  const crewAt = (xs, y, scale) => xs.forEach((x, k) => { c.fillStyle = k === 0 ? A.cabLight : A.skin; c.fillRect(x - 1.1 * scale, y - 3 * scale, 2.2 * scale, 3 * scale); c.fillStyle = A.skin; c.beginPath(); c.arc(x, y - 3.6 * scale, 1.35 * scale, 0, PI * 2); c.fill(); c.fillStyle = A.head; c.beginPath(); c.arc(x, y - 4 * scale, 1.1 * scale, 0, PI * 2); c.fill(); });
  if (dir === 'e' || dir === 'w') {
    // far horse, then cab and near horse
    const horse = (x, y, col, far) => { c.fillStyle = col; c.strokeStyle = '#2a1a0c'; c.lineWidth = .9 * s; c.beginPath(); c.moveTo(x - 6 * s, y - 2 * s); c.lineTo(x - 6.5 * s + (far ? 0 : sw), y + 3.5 * s); c.moveTo(x - 3 * s, y - 1.5 * s); c.lineTo(x - 3.2 * s - sw * .6, y + 3.5 * s); c.moveTo(x + 3 * s, y - 1.5 * s); c.lineTo(x + 3.2 * s - sw, y + 3.5 * s); c.moveTo(x + 5.5 * s, y - 2 * s); c.lineTo(x + 6 * s + sw * .6, y + 3.5 * s); c.stroke();
      c.beginPath(); c.ellipse(x, y - 3.6 * s, 6.6 * s, 3.1 * s, 0, 0, PI * 2); c.fill(); c.beginPath(); c.moveTo(x + 5.5 * s, y - 5.5 * s); c.lineTo(x + 8.5 * s, y - 9.5 * s); c.lineTo(x + 10.2 * s, y - 9 * s); c.lineTo(x + 9.6 * s, y - 5.5 * s); c.closePath(); c.fill();
      c.fillStyle = '#2a1a0c'; c.beginPath(); c.moveTo(x + 2 * s, y - 6.5 * s); c.quadraticCurveTo(x + 6 * s, y - 9.5 * s, x + 8.8 * s, y - 9.8 * s); c.lineTo(x + 8.2 * s, y - 8.6 * s); c.quadraticCurveTo(x + 6 * s, y - 8 * s, x + 3 * s, y - 5.5 * s); c.fill(); // mane
      c.beginPath(); c.moveTo(x - 6.5 * s, y - 4 * s); c.quadraticCurveTo(x - 9.5 * s, y - 2 * s, x - 9 * s, y + 1 * s); c.strokeStyle = '#2a1a0c'; c.lineWidth = 1.2 * s; c.stroke(); // tail
      c.fillStyle = A.trim; c.fillRect(x + 1 * s, y - 6.4 * s, 1.2 * s, 5.4 * s); };
    horse(9 * s, -2.4 * s, A.horse2, true);
    c.strokeStyle = '#3b2c1a'; c.lineWidth = 1.1 * s; c.beginPath(); c.moveTo(-3 * s, -5.5 * s); c.lineTo(6 * s, -6.2 * s); c.stroke(); // pole
    c.fillStyle = A.cab; c.beginPath(); c.moveTo(-10 * s, -5.5 * s); c.lineTo(-10 * s, -12.5 * s); c.quadraticCurveTo(-6 * s, -13.5 * s, -1.5 * s, -11.5 * s); c.lineTo(-1.5 * s, -5.5 * s); c.closePath(); c.fill(); c.strokeStyle = A.trim; c.lineWidth = .9 * s; c.stroke();
    c.fillStyle = A.cabLight; c.fillRect(-9.2 * s, -11.8 * s, 1.6 * s, 5.6 * s);
    crewAt(crew === 2 ? [-7.6 * s, -4.2 * s] : [-8 * s, -5.6 * s, -3.2 * s], -12 * s, s);
    if (side === 'allied') { c.strokeStyle = '#4e3424'; c.lineWidth = .9 * s; c.beginPath(); c.arc(-2.5 * s, -15.5 * s, 3.2 * s, -PI / 2, PI / 2); c.stroke(); }
    else { c.strokeStyle = '#5a3b22'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo(-6 * s, -14 * s); c.lineTo(4 * s, -19 * s); c.stroke(); c.fillStyle = A.shieldStroke; c.beginPath(); c.arc(-5.6 * s, -14.6 * s, 2.3 * s, 0, PI * 2); c.fill(); c.fillStyle = A.shield; c.beginPath(); c.arc(-5.6 * s, -14.6 * s, 1.5 * s, 0, PI * 2); c.fill(); }
    wheelSide(-6 * s, -3.2 * s, 3.6 * s);
    horse(8 * s, 0, A.horse, false);
  } else if (dir === 's') {
    // coming toward the viewer: cab behind, horses in front
    c.fillStyle = A.cab; c.beginPath(); c.roundRect(-6 * s, -17 * s, 12 * s, 6.5 * s, 1.5 * s); c.fill(); c.strokeStyle = A.trim; c.lineWidth = .9 * s; c.stroke();
    crewAt(crew === 2 ? [-2.6 * s, 2.6 * s] : [-3.4 * s, 0, 3.4 * s], -16.5 * s, .9 * s);
    c.fillStyle = A.wheel; [-7.6, 7.6].forEach(x => { c.beginPath(); c.ellipse(x * s, -12.5 * s, 1.3 * s, 3.6 * s, 0, 0, PI * 2); c.fill(); });
    [-3.6, 3.6].forEach((x, k) => { c.fillStyle = k ? A.horse : A.horse2; c.beginPath(); c.ellipse(x * s, -9 * s, 3.3 * s, 2.6 * s, 0, 0, PI * 2); c.fill(); c.strokeStyle = '#2a1a0c'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo((x - 1.6) * s, -7 * s); c.lineTo((x - 1.8) * s, (k ? sw : -sw) * .5); c.moveTo((x + 1.6) * s, -7 * s); c.lineTo((x + 1.8) * s, (k ? -sw : sw) * .5); c.stroke();
      c.fillStyle = k ? A.horse : A.horse2; c.beginPath(); c.ellipse(x * s, -8 * s, 2.3 * s, 3.4 * s, 0, 0, PI * 2); c.fill(); c.fillStyle = '#2a1a0c'; c.beginPath(); c.moveTo((x - 1.8) * s, -10.5 * s); c.lineTo((x - 1) * s, -13 * s); c.lineTo((x - .4) * s, -10.8 * s); c.moveTo((x + 1.8) * s, -10.5 * s); c.lineTo((x + 1) * s, -13 * s); c.lineTo((x + .4) * s, -10.8 * s); c.fill(); c.fillStyle = A.trim; c.fillRect((x - 2.3) * s, -8.6 * s, 4.6 * s, .8 * s); });
  } else {
    // going away: horses beyond the cab
    [-3.6, 3.6].forEach((x, k) => { c.fillStyle = k ? A.horse : A.horse2; c.beginPath(); c.arc(x * s, -19 * s, 1.5 * s, 0, PI * 2); c.fill(); c.beginPath(); c.ellipse(x * s, -15 * s, 2.8 * s, 2.6 * s, 0, 0, PI * 2); c.fill(); c.strokeStyle = '#2a1a0c'; c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(x * s, -14 * s); c.quadraticCurveTo((x + 1) * s, -11 * s, x * s, -9 * s); c.stroke(); });
    c.fillStyle = A.wheel; [-7.6, 7.6].forEach(x => { c.beginPath(); c.ellipse(x * s, -5.5 * s, 1.4 * s, 3.8 * s, 0, 0, PI * 2); c.fill(); });
    c.fillStyle = A.cab; c.beginPath(); c.roundRect(-6 * s, -10 * s, 12 * s, 7.5 * s, 1.5 * s); c.fill(); c.strokeStyle = A.trim; c.lineWidth = .9 * s; c.stroke(); c.fillStyle = A.cabLight; c.fillRect(-5.2 * s, -9.2 * s, 10.4 * s, 1.2 * s);
    crewAt(crew === 2 ? [-2.6 * s, 2.6 * s] : [-3.4 * s, 0, 3.4 * s], -9.5 * s, .95 * s);
  }
}
/* Painted sprite sheets (images/units/<name>.png): 4 rows s,e,n,w x 4 frames, feet at the bottom centre of each cell.
   Gun sheets differ: one facing (east, mirrored for west), and the rows are actions: move, push (limber/unlimber), load, fire.
   Used when loaded; the drawn figures remain the fallback. Sizes are in world units at scale 1.
   A formation may name its own sheet (`sheet`, e.g. the Prussians or the Scots Greys); otherwise it follows its side and type. */
const SHEETS = {};
let armiesRedraw = null;   // set by renderArmies: redraws the card figures when a sheet arrives
const SHEET_SPEC = { infantry: { cw: 160, ch: 160, h: 26 }, archers: { cw: 160, ch: 160, h: 26 }, cavalry: { cw: 240, ch: 200, h: 30 }, chariot: { cw: 240, ch: 200, h: 30 }, elephant: { cw: 240, ch: 200, h: 72 }, artillery: { cw: 384, ch: 256, h: 34 } };
['british-infantry', 'french-infantry', 'prussian-infantry', 'french-cuirassier', 'french-lancer', 'scots-greys', 'british-artillery', 'french-artillery'].forEach(n => { const im = new Image(); im.onload = () => { SHEETS[n] = im; if (armiesRedraw) armiesRedraw(); }; im.src = (S.imageBase || 'images/') + 'units/' + n + '.png'; });
const SHEET_BY = { allied: { infantry: 'british-infantry', archers: 'british-infantry', cavalry: 'scots-greys', artillery: 'british-artillery' },
                   french: { infantry: 'french-infantry', archers: 'french-infantry', cavalry: 'french-cuirassier', artillery: 'french-artillery' } };
const sheetFor = f => SHEETS[f.sheet || (SHEET_BY[f.side] || {})[f.type]];
/* ---------------- artillery ----------------
   A battery is a formation of gun figures (three guns stand for a whole battery). It fires only when unlimbered: a battery
   ordered to move first limbers up, moves slowly, and must unlimber again before it can fire. It fires volleys on a reload
   cycle at the nearest enemy it can see: roundshot at long range, canister (a can of musket balls) close in, which is far
   deadlier. Troops behind the crest of a ridge (`S.cover`) are half-hidden from roundshot. Crews do not fight hand to hand:
   when cavalry is on top of the guns they take shelter and the battery falls silent, and enemy troops in contact damage it.
   Numbers are a game model, not to scale. */
const GUN = { lay: 1.5, range: 620, canister: 190, reload: 2.6, limber: 1.6, unlimber: 2.2, round: 2.6, canisterDmg: 9, shelter: 60 };
const SMOKE = [];   // world-space smoke puffs and dust: { x, y, t0, life, r, kind }
// Fire orders (Command mode, the player's batteries): 'will' = fire at the nearest enemy in sight (the default and the computer's way);
// 'aim' = lay the guns on one target, then wait; 'fire' = one volley at it as soon as the guns are laid, then wait again;
// 'auto' = keep firing at it until it is gone or out of range; 'hold' = cease fire.
// Laying the guns on a new target takes GUN.lay seconds; a target must be in sight and within range.
function gunInit(f) { f.gun = { deployed: true, phase: 'ready', t: 0, cd: 1 + (f.cols || 3) * .3 * Math.random(), lastShot: -99, aim: null, mode: 'will', target: null, laid: 0 }; }
const gunFacesWest = f => f.gun && f.gun.aim ? f.gun.aim.x < f.x - 8 : Math.cos(f.facing) < -.2;
// Pose for gun figure i: which row and frame of the sheet. Guns in a battery fire one after another, a quarter second apart.
function gunPose(f, i) {
  const g = f.gun || { phase: 'ready', lastShot: -99, cd: 0 }, since = simTime - g.lastShot - i * .25;
  if (g.phase === 'moving') return { row: 0, frame: Math.floor(wall * 6 + i) % 4 };
  if (g.phase === 'limber' || g.phase === 'unlimber') return { row: 1, frame: Math.floor(wall * 4 + i) % 4 };
  if (since >= 0 && since < .8) return { row: 3, frame: since < .12 ? 1 : since < .45 ? 2 : 3 };
  if (since >= .8 && g.cd > .4) return { row: 2, frame: Math.floor(wall * 3 + i) % 4 };
  return { row: 3, frame: 0 };
}
function drawGunSheet(c, sh, f, x, y, i, s) {
  const spec = SHEET_SPEC.artillery, pose = gunPose(f, i), scale = spec.h * s / spec.ch, dw = spec.cw * scale, dh = spec.ch * scale;
  c.save(); c.translate(x, y); if (gunFacesWest(f)) c.scale(-1, 1);
  c.drawImage(sh, pose.frame * spec.cw, pose.row * spec.ch, spec.cw, spec.ch, -dw / 2, -dh + 2 * s, dw, dh); c.restore();
}
// Drawn stand-in for a gun and its crew, facing east (the caller mirrors it for west).
function figGun(c, side, s, i, row) {
  const A = SIDE_ART[side], recoil = row === 3 ? -1.5 * s : 0;
  c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(0, .6 * s, 14 * s, 3.2 * s, 0, 0, PI * 2); c.fill();
  c.strokeStyle = side === 'french' ? '#4c5a66' : '#55603a'; c.lineWidth = 2.6 * s; c.beginPath(); c.moveTo(-12 * s + recoil, -1 * s); c.lineTo(2 * s + recoil, -5 * s); c.stroke();
  c.fillStyle = '#b08a3a'; c.save(); c.translate(3 * s + recoil, -6 * s); c.rotate(-.08); c.fillRect(-5 * s, -1.6 * s, 15 * s, 3.2 * s); c.restore();
  c.strokeStyle = '#3a2c1c'; c.lineWidth = 1.2 * s; c.beginPath(); c.arc(2 * s + recoil, -4 * s, 4.2 * s, 0, PI * 2); c.stroke();
  [-9, -4].forEach((dx, k) => { c.fillStyle = A.cab; c.fillRect((dx - 1.4) * s, -12 * s, 2.8 * s, 6 * s); c.fillStyle = A.skin; c.beginPath(); c.arc(dx * s, -13.5 * s, 1.5 * s, 0, PI * 2); c.fill();
    c.fillStyle = '#1d1d1d'; c.fillRect((dx - 1.3) * s, -17 * s, 2.6 * s, 2.6 * s); c.fillStyle = '#e8e2d2'; c.fillRect((dx - 1.2) * s, -6 * s, 1 * s, 6 * s); c.fillRect((dx + .2) * s, -6 * s, 1 * s, 6 * s); });
}
// Can this side see that formation? In Command mode each side has its own picture; in the reenactment, what the narration shows.
function sees(side, t) { if (!alive(t) || !t.present) return false; if (mode !== 'command') return t.known; return side === player ? t.known : t.aiKnown; }
// One volley per battery when it is ready. `apply` = false in the reenactment: the guns fire for the eye, the script decides losses.
function artillery(apply) {
  formations.forEach(f => {
    if (f.type !== 'artillery' || !alive(f) || !f.gun || f.state === 'rout' || f.state === 'captured' || f.holdFire) return;
    const g = f.gun; if (!g.deployed) return;
    if (g.mode === 'hold') return;
    if (g.mode === 'aim' || g.mode === 'fire' || g.mode === 'auto') {                        // a battery laid on one target by the player
      const t = byId[g.target];
      if (!t || !alive(t) || t.state === 'captured' || !sees(f.side, t)) { g.mode = 'will'; g.target = null; if (f.side === player) addLog(f.division + ': target lost, firing at will'); return; }
      g.aim = { x: t.x, y: t.y }; f.facing = Math.atan2(t.y - f.y, t.x - f.x); const was = g.laid; g.laid += DT;
      if (was < GUN.lay && g.laid >= GUN.lay && selected.has(f.id)) { renderSelection(); if (g.mode === 'aim') addLog(f.division + ': guns laid on ' + t.division + ', ready to fire'); }
      if (g.mode === 'aim' || g.laid < GUN.lay) return;
      g.cd -= DT; if (g.cd > 0) return;
      const d = dist(f, t); if (d > GUN.range) { g.cd = .5; return; }   // out of range: hold, laid, until it comes back in
      if (formations.some(e => e.side !== f.side && alive(e) && dist(f, e) < GUN.shelter && (e.type === 'cavalry' || e.type === 'infantry'))) { g.cd = .5; return; }
      volley(f, t, d, apply); if (g.mode === 'fire') { g.mode = 'aim'; if (selected.has(f.id)) renderSelection(); } return;
    }
    g.cd -= DT; if (g.cd > 0) return;
    let best = null, bd = GUN.range, near = false;
    formations.forEach(t => { if (t.side === f.side || !alive(t) || t.state === 'captured') return; const d = dist(f, t);
      if (d < GUN.shelter && (t.type === 'cavalry' || t.type === 'infantry')) near = true;
      const dd = t.type === 'artillery' ? d * 1.6 : d;   // gunners were told to fire at troops, not at the enemy's guns
      if (dd < bd && d < GUN.range && sees(f.side, t)) { bd = dd; best = t; } });
    if (best) bd = dist(f, best);
    if (near) { g.cd = .5; return; }                       // crews take shelter while enemy troops are on the guns
    if (!best) { g.cd = .4; g.aim = null; return; }
    volley(f, best, bd, apply);
  });
  for (let k = SMOKE.length - 1; k >= 0; k--) if (simTime - SMOKE[k].t0 > SMOKE[k].life || simTime < SMOKE[k].t0 - 5) SMOKE.splice(k, 1);
}
// One volley from battery f at target t, bd away. Canister (close in) sprays the target. Roundshot: each gun's ball lands
// somewhere around the point aimed at (the further the shot, the wider the spread) and hurts any troops or guns near where
// it lands, whichever side they are on. `apply` = false in the reenactment: the shots are for the eye only.
const BALL = { spread: .14, hit: 70 };
function volley(f, best, bd, apply) {
  const g = f.gun, n = f.cols * f.rows, canister = bd < GUN.canister;
  g.aim = { x: best.x, y: best.y }; g.lastShot = simTime; g.cd = GUN.reload * (.9 + .2 * Math.random());
  const base = (canister ? GUN.canisterDmg * (1 - .5 * bd / GUN.canister) : GUN.round * (1 - .4 * bd / GUN.range)) * (f.power || 1) * (f.strength / 100);
  const hurt = (t, dmg) => {
    if (!canister && S.cover && t.side === S.cover.side && t.y < S.cover.yMax) dmg *= S.cover.k;   // behind the crest
    if (t.state === 'hold' && t.type === 'infantry') dmg *= 1.2;                                      // a square or a halted line is a dense target
    if (t.fortified) dmg *= .12;                                                                       // behind the thick walls of a farm
    t.strength -= dmg; t.lastHit = simTime;
  };
  for (let i = 0; i < n; i++) {
    const west = best.x < f.x - 8, mx = f.x + (i - (n - 1) / 2) * 52 + (west ? -26 : 26), my = f.y - 9, at = simTime + i * .25;   // at the muzzle
    SMOKE.push({ x: mx, y: my, t0: at, life: 3.2, r: 10, kind: 'smoke' });
    if (canister) { SMOKE.push({ x: best.x + (Math.random() - .5) * 60, y: best.y + (Math.random() - .5) * 30, t0: at + .2, life: 1.2, r: 14, kind: 'spray' }); continue; }
    const sp = bd * BALL.spread, a = Math.random() * PI * 2, r = sp * Math.sqrt(Math.random()), ix = best.x + Math.cos(a) * r, iy = best.y + Math.sin(a) * r * .6;
    SMOKE.push({ x: ix, y: iy, t0: at + .25, life: 1.4, r: 9, kind: 'dust' });
    if (apply) formations.forEach(t => { if (!alive(t) || t === f || t.state === 'captured') return; const d = Math.hypot(t.x - ix, t.y - iy); if (d < BALL.hit) hurt(t, base / n * 1.6 * (1 - d / BALL.hit)); });
  }
  if (apply && canister) hurt(best, base);
}
function drawSmoke(c) {
  SMOKE.forEach(p => { const a = simTime - p.t0; if (a < 0) return; const k = a / p.life, q = P(p.x + a * 6, p.y - a * 4); if (!(q.s > 0)) return;
    if (p.kind === 'smoke') {
      if (a < .12) { const fl = c.createRadialGradient(q.x, q.y, 0, q.x, q.y, 9 * q.s); fl.addColorStop(0, 'rgba(255,240,180,.95)'); fl.addColorStop(1, 'rgba(255,150,40,0)'); c.fillStyle = fl; c.beginPath(); c.arc(q.x, q.y, 9 * q.s, 0, PI * 2); c.fill(); }
      // a soft, drifting cloud of powder smoke: a few overlapping puffs that grow and fade
      [[0, 0, 1], [-6, -4, .8], [7, -6, .7], [2, -11, .6]].forEach(([ox, oy, w]) => { const r = (p.r + a * 11) * w * q.s, cx = q.x + ox * q.s * (1 + a), cy = q.y + oy * q.s * (1 + a * .6);
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(232,230,224,${.42 * (1 - k)})`); g.addColorStop(.6, `rgba(215,213,206,${.22 * (1 - k)})`); g.addColorStop(1, 'rgba(210,208,200,0)');
        c.fillStyle = g; c.beginPath(); c.arc(cx, cy, r, 0, PI * 2); c.fill(); });
    } else if (p.kind === 'dust') {
      c.fillStyle = `rgba(120,95,60,${.5 * (1 - k)})`; c.beginPath(); c.arc(q.x, q.y, (p.r + a * 10) * q.s, 0, PI * 2); c.fill();
    } else {
      c.strokeStyle = `rgba(80,70,55,${.6 * (1 - k)})`; c.lineWidth = 1; for (let m = 0; m < 7; m++) { const ang = m / 7 * PI * 2; c.beginPath(); c.moveTo(q.x, q.y); c.lineTo(q.x + Math.cos(ang) * (p.r + a * 20) * q.s, q.y + Math.sin(ang) * (p.r + a * 20) * .5 * q.s); c.stroke(); }
    }
  });
}
function drawSprite(c, f, x, y, facing, i, s = 1, k = 1) {
  if (!(s > 0)) return;   // beyond the horizon of a very short, tilted view: nothing to draw
  const sh = artOn ? sheetFor(f) : null;
  if (sh && f.type === 'artillery') { drawGunSheet(c, sh, f, x, y, i, s); return; }
  if (sh) {
    const spec = SHEET_SPEC[f.type] || SHEET_SPEC.infantry, d = dirOf(facing), row = { s: 0, e: 1, n: 2, w: 3 }[d];
    const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', frame = moving ? Math.floor(wall * 6 + i) % 4 : (Math.floor(wall * 1.2 + i) % 2);
    const scale = spec.h * s / spec.ch, dw = spec.cw * scale, dh = spec.ch * scale;
    c.save(); c.translate(x, y); if (k !== 1) c.scale(1, 1); c.drawImage(sh, frame * spec.cw, row * spec.ch, spec.cw, spec.ch, -dw / 2, -dh + 2 * s, dw, dh); c.restore(); return;
  }
  c.save(); c.translate(x, y);
  const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', d = dirOf(facing), step = moving ? wall * 8 + i * 1.7 : 0;
  if (d === 'w') c.scale(-1, 1);
  if (f.type === 'artillery') { if (d === 'w') c.scale(-1, 1); if (gunFacesWest(f)) c.scale(-1, 1); figGun(c, f.side, s, i, gunPose(f, i).row); c.restore(); return; }
  if (f.type === 'chariot') figChariot(c, f.side, s, i, moving, d === 'w' ? 'e' : d, step);
  else if (f.type === 'elephant') figElephant(c, f.side, s, moving, d === 'w' ? 'e' : d, step);
  else figInfantry(c, f.side, f.type === 'archers' || (f.type === 'infantry' && i % 3 === 2), s, i, d === 'w' ? 'e' : d, step);
  c.restore();
}

/* ---------------- standing scenery: drawn in the projected pass so it has height ---------------- */
const PROPS = [];
B.forests.forEach((fo, fi) => { const n = Math.floor(fo.r * fo.r / 900); for (let i = 0; i < n; i++) { const a = jitter(fi * 1000 + i, 6) * PI * 2, rr = Math.sqrt(jitter(fi * 1000 + i, 7)) * fo.r; const x = fo.x + Math.cos(a) * rr, y = fo.y + Math.sin(a) * rr * .8; if (Math.abs(x - riverXAt(y)) < 60 || x < 10 || x > W.w - 10 || y < 10 || y > W.h - 10) continue; PROPS.push({ kind: 'tree', x, y, r: 9 + jitter(i, 8) * 8, k: i }); } });
for (let i = 0; i < 45; i++) { const x = (i * 173 + 100) % W.w, y = (i * 119 + 70) % W.h; if (Math.abs(x - riverXAt(y)) < 65) continue; PROPS.push({ kind: 'tree', x, y, r: 8 + jitter(i, 9) * 5, k: i }); }
{ const cp = B.camp; for (let x = cp.x; x <= cp.x + cp.w; x += 14) { PROPS.push({ kind: 'shield', x, y: cp.y }); PROPS.push({ kind: 'shield', x, y: cp.y + cp.h }); } for (let y = cp.y + 14; y < cp.y + cp.h; y += 14) { PROPS.push({ kind: 'shield', x: cp.x, y }); PROPS.push({ kind: 'shield', x: cp.x + cp.w, y }); }
  for (let i = 0; i < 14; i++) PROPS.push({ kind: 'tent', x: cp.x + 18 + (i % 7) * 32, y: i < 7 ? cp.y + 28 : cp.y + cp.h - 14, s: 10 }); PROPS.push({ kind: 'tent', x: cp.x + 60, y: cp.y + cp.h / 2 + 16, s: 22, royal: true }); }
PROPS.push({ kind: 'city', x: B.city.x + B.city.w / 2, y: B.city.y + B.city.h });
function drawProp(c, p) {
  const q = P(p.x, p.y), s = q.s, k = q.k;
  if (p.kind === 'tree') {
    const r = p.r * s; c.fillStyle = 'rgba(30,30,15,.28)'; c.beginPath(); c.ellipse(q.x + r * .3, q.y, r * .9, r * .35 * k, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#5a3d22'; c.fillRect(q.x - r * .12, q.y - r * .9, r * .24, r * .9);
    c.fillStyle = p.k % 3 === 0 ? '#3f5c30' : '#4a6a36'; c.beginPath(); c.arc(q.x, q.y - r * 1.4, r * .95, 0, PI * 2); c.fill();
    c.fillStyle = p.k % 2 ? '#64854a' : '#5c7d42'; c.beginPath(); c.arc(q.x - r * .25, q.y - r * 1.65, r * .6, 0, PI * 2); c.fill();
    c.fillStyle = '#89a85e'; c.beginPath(); c.arc(q.x - r * .4, q.y - r * 1.85, r * .25, 0, PI * 2); c.fill();
  } else if (p.kind === 'shield') {
    c.fillStyle = '#3b2c1a'; c.fillRect(q.x - 5 * s, q.y - 9 * s, 10 * s, 9 * s); c.fillStyle = '#d9c38a'; c.beginPath(); c.roundRect(q.x - 4 * s, q.y - 8.5 * s, 8 * s, 7.5 * s, 2 * s); c.fill();
  } else if (p.kind === 'tent') {
    const z = p.s * s; c.fillStyle = 'rgba(30,20,10,.3)'; c.beginPath(); c.ellipse(q.x + z * .3, q.y, z * 1.2, z * .4 * k, 0, 0, PI * 2); c.fill();
    c.fillStyle = p.royal ? '#f3e6c0' : '#efe3c3'; c.beginPath(); c.moveTo(q.x - z, q.y); c.lineTo(q.x, q.y - z * 1.5); c.lineTo(q.x + z, q.y); c.closePath(); c.fill();
    c.fillStyle = 'rgba(120,90,40,.45)'; c.beginPath(); c.moveTo(q.x, q.y - z * 1.5); c.lineTo(q.x + z, q.y); c.lineTo(q.x + z * .2, q.y); c.closePath(); c.fill(); c.strokeStyle = '#6b5636'; c.lineWidth = 1; c.beginPath(); c.moveTo(q.x - z, q.y); c.lineTo(q.x, q.y - z * 1.5); c.lineTo(q.x + z, q.y); c.stroke();
    if (p.royal) { c.fillStyle = '#2f6fc4'; c.fillRect(q.x - z * .5, q.y - z * .6, z, z * .14); c.fillStyle = '#e9c77a'; c.fillRect(q.x - z * .5, q.y - z * .4, z, z * .14); c.strokeStyle = '#3b2c1a'; c.lineWidth = 2; c.beginPath(); c.moveTo(q.x, q.y - z * 1.5); c.lineTo(q.x, q.y - z * 2.4); c.stroke(); c.fillStyle = '#2f6fc4'; c.beginPath(); c.moveTo(q.x, q.y - z * 2.4); c.lineTo(q.x + z * .9, q.y - z * 2.15); c.lineTo(q.x, q.y - z * 1.9); c.closePath(); c.fill(); }
  } else if (p.kind === 'city') drawCity(c);
}
function drawCity(c) {
  const ct = B.city, H = 26, TH2 = 40;                                   // wall height and tower height in world units
  const wallTop = (x, y) => P(x, y - H), base = (x, y) => P(x, y);
  const quad = (a, b, c2, d, fill, stroke) => { c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(c2.x, c2.y); c.lineTo(d.x, d.y); c.closePath(); c.fillStyle = fill; c.fill(); if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1; c.stroke(); } };
  const x0 = ct.x, x1 = ct.x + ct.w, y0 = ct.y, y1 = ct.y + ct.h, xm = ct.x + ct.w / 2;
  // walls: far (north) face is hidden by the top; draw west, east, then south face in front
  const faceW = [base(x0, y0), base(x0, y1), wallTop(x0, y1), wallTop(x0, y0)], faceE = [base(x1, y0), base(x1, y1), wallTop(x1, y1), wallTop(x1, y0)];
  quad(...faceW, '#8a7a56', '#4d4230'); quad(...faceE, '#746648', '#4d4230');
  // buildings inside (seen over the walls): rows of flat-roofed houses, taller toward the middle, and the citadel
  for (let gy = 3; gy >= 0; gy--) for (let gx = 0; gx < 6; gx++) {
    const bx = ct.x + 22 + gx * 27, by = ct.y + 22 + gy * 32 + 20, bw = 18, bd = 20, bh = 14 + ((gx * 7 + gy) % 3) * 5, k = gx * 7 + gy;
    const fl = [base(bx, by), base(bx + bw, by), P(bx + bw, by - bh), P(bx, by - bh)]; quad(...fl, k % 3 === 0 ? '#b8a478' : k % 3 === 1 ? '#9a8760' : '#ab9a6e', '#5a4d35');
    const rf = [P(bx, by - bh), P(bx + bw, by - bh), P(bx + bw, by - bd - bh), P(bx, by - bd - bh)]; quad(...rf, k % 3 === 0 ? '#d6c69a' : '#c4b382', '#5a4d35');
    if (gx === 0 || k % 2) { const sd = [base(bx, by), P(bx, by - bh), P(bx, by - bd - bh), base(bx, by - bd)]; quad(...sd, '#7d6c4c'); }
  }
  // citadel / palace
  { const bx = ct.x + 68, by = ct.y + 115, bw = 54, bd = 50, bh = 34; quad(base(bx, by), base(bx + bw, by), P(bx + bw, by - bh), P(bx, by - bh), '#8a4a3a', '#3a1a14'); quad(P(bx, by - bh), P(bx + bw, by - bh), P(bx + bw, by - bd - bh), P(bx, by - bd - bh), '#c97a5a', '#3a1a14'); quad(base(bx, by), P(bx, by - bh), P(bx, by - bd - bh), base(bx, by - bd), '#6a3a2c');
    const tx = bx + 20, ty = by - 18, tw = 14, th = 22; quad(P(tx, ty - bh), P(tx + tw, ty - bh), P(tx + tw, ty - bh - th), P(tx, ty - bh - th), '#e8c070', '#5a4020'); quad(P(tx, ty - bh - th), P(tx + tw, ty - bh - th), P(tx + tw, ty - 14 - bh - th), P(tx, ty - 14 - bh - th), '#f3d9a0', '#5a4020'); }
  // south wall face and gate
  quad(base(x0, y1), base(x1, y1), wallTop(x1, y1), wallTop(x0, y1), '#a08c62', '#4d4230');
  quad(wallTop(x0, y0), wallTop(x1, y0), wallTop(x1, y1), wallTop(x0, y1), 'rgba(0,0,0,0)');
  // wall tops with crenellations
  const crenel = (ax, ay, bx2, by2) => { const n = Math.round(Math.hypot(bx2 - ax, by2 - ay) / 12); for (let i = 0; i <= n; i++) { const x = ax + (bx2 - ax) * i / n, y = ay + (by2 - ay) * i / n, q = P(x, y - H), s = q.s; c.fillStyle = '#5a4f38'; c.fillRect(q.x - 2.5 * s, q.y - 5 * s, 5 * s, 5 * s); } };
  crenel(x0, y1, x1, y1); crenel(x0, y0, x0, y1); crenel(x1, y0, x1, y1); crenel(x0, y0, x1, y0);
  // walkway on the wall top (near face)
  quad(wallTop(x0, y1), wallTop(x1, y1), P(x1, y1 - 10 - H), P(x0, y1 - 10 - H), '#b0a078');
  // gate on the west wall
  { const gy = y0 + ct.h / 2, q0 = base(x0 - 3, gy + 12), q1 = base(x0 - 3, gy - 12), q2 = P(x0 - 3, gy - 12 - H * .7), q3 = P(x0 - 3, gy + 12 - H * .7); quad(q0, q1, q2, q3, '#3a2a1c'); }
  // towers at corners and mid-walls
  [[x0, y0], [x1, y0], [x0, y1], [x1, y1], [xm, y0], [xm, y1]].forEach(([x, y]) => {
    const w = 13, d = 13, b0 = base(x - w, y + d), b1 = base(x + w, y + d), t0 = P(x - w, y + d - TH2), t1 = P(x + w, y + d - TH2), t2 = P(x + w, y - d - TH2), t3 = P(x - w, y - d - TH2);
    quad(b0, base(x - w, y - d), t3, t0, '#9c8c66', '#4d4230'); quad(base(x + w, y - d), b1, t1, t2, '#7d6e4c', '#4d4230'); quad(b0, b1, t1, t0, '#a89868', '#4d4230'); quad(t0, t1, t2, t3, '#c4b386', '#4d4230');
    const n = 4; for (let i = 0; i <= n; i++) { const q = P(x - w + 2 * w * i / n, y + d - TH2), s = q.s; c.fillStyle = '#5a4f38'; c.fillRect(q.x - 2 * s, q.y - 5 * s, 4 * s, 5 * s); }
  });
}

/* ---------------- formations ---------------- */
function createFormations() {
  formations = S.formations.map(d => Object.assign({}, d, {
    tx: d.x, ty: d.y, strength: 100, strengthTarget: null, strengthRate: 0,
    state: 'hold', known: !d.hidden, aiKnown: !d.hidden, present: !d.offmap, speed: d.speed || (d.type === 'chariot' ? 60 : d.type === 'cavalry' ? 40 : d.type === 'elephant' ? 14 : d.type === 'artillery' ? 10 : 16),
    facing: d.facing !== undefined ? d.facing : (d.side === 'allied' ? PI / 2 : -PI / 2), spread: 1,   // the Allies hold the north, facing south
    holdFire: mode === 'watch' && !!d.holdFire, then: null, aiPhase: null, lastHit: -99
  }));
  formations.forEach(f => { if (f.type === 'artillery') gunInit(f); }); SMOKE.length = 0;
  byId = {}; formations.forEach(f => byId[f.id] = f); window.__fm = formations; window.__sel = selected;
}
function applyOrder(o) {
  if (o.leader) { const L = leaders.find(l => l.id === o.leader); if (!L) return;
    if (o.at) { L.x = L.tx = o.at.x; L.y = L.ty = o.at.y; } if (o.to) { L.tx = o.to.x; L.ty = o.to.y; }
    if (o.visible !== undefined) L.shown = o.visible; if (o.speed) L.speed = o.speed; return; }
  const f = byId[o.id]; if (!f) return;
  if (o.visible !== undefined) { f.known = o.visible; if (o.visible) f.present = true; }
  if (o.at) { f.x = o.at.x; f.y = o.at.y; }
  // `via`: waypoints taken in order before `to`, e.g. to go round the end of a line rather than through it.
  if (o.to) { f.route = (o.via || []).concat([o.to]); const n = f.route.shift(); f.tx = n.x; f.ty = n.y; f.state = o.state || 'move'; } else if (o.state) f.state = o.state;
  if (o.speed) f.speed = o.speed;
  if (o.strength !== undefined) { f.strength = o.strength; f.strengthTarget = null; }
  if (o.strengthTo !== undefined) { f.strengthTarget = o.strengthTo; f.strengthRate = Math.abs(f.strength - o.strengthTo) / (o.over || 5); }
  if (o.spread) f.spread = o.spread;
  if (o.fire !== undefined) f.holdFire = !o.fire;
  f.then = o.then || null;
}
function moveFormation(f) {
  if (!alive(f)) return;
  if (f.strengthTarget !== null) {
    const d = f.strengthTarget - f.strength, step = f.strengthRate * DT;
    if (Math.abs(d) <= step) { f.strength = f.strengthTarget; f.strengthTarget = null; } else f.strength += Math.sign(d) * step;
  }
  f.inWater = inWater(f.x, f.y);
  if (f.type === 'artillery' && f.gun) {
    const g = f.gun, wantsMove = (f.state === 'move' || f.state === 'attack' || f.state === 'rout') && Math.hypot(f.tx - f.x, f.ty - f.y) > 2;
    if (wantsMove && g.deployed) { g.phase = 'limber'; g.t += DT; if (g.t < GUN.limber) return; g.deployed = false; g.t = 0; }
    if (wantsMove) g.phase = 'moving';
    else if (!g.deployed) { g.phase = 'unlimber'; g.t += DT; if (g.t >= GUN.unlimber) { g.deployed = true; g.t = 0; g.phase = 'ready'; g.cd = .5; if (f.state === 'move' || f.state === 'attack') f.state = 'hold'; } return; }
    else { g.phase = 'ready'; g.t = 0; }
  }
  if (f.state === 'hold' || f.state === 'loot' || f.state === 'scattered' || f.state === 'captured') return;
  // (re)plan when the target changes
  if (!f.path || f.pathTx !== f.tx || f.pathTy !== f.ty) { const g = legal({ x: f.tx, y: f.ty }); f.tx = g.x; f.ty = g.y; f.path = planPath({ x: f.x, y: f.y }, g); f.pathTx = f.tx; f.pathTy = f.ty; }
  while (f.path.length > 1 && Math.hypot(f.path[0].x - f.x, f.path[0].y - f.y) < 6) f.path.shift();
  const wp = f.path[0] || { x: f.tx, y: f.ty };
  const dx = wp.x - f.x, dy = wp.y - f.y, d = Math.hypot(dx, dy), dEnd = Math.hypot(f.tx - f.x, f.ty - f.y);
  const sp = f.speed * (f.state === 'rout' ? 1.25 : 1) * (f.inWater ? .55 : 1) * DT;
  if (dEnd > 2) { f.x += dx / d * Math.min(sp, d); f.y += dy / d * Math.min(sp, d); f.facing = Math.atan2(dy, dx); }
  else if (f.route && f.route.length) { const n = f.route.shift(); f.tx = n.x; f.ty = n.y; }
  else {
    if (f.then) { f.state = f.then; f.then = null; }
    else if (f.state === 'rout') f.state = mode === 'command' ? 'withdrawn' : 'scattered';
    else if (f.state === 'move') f.state = 'hold';
  }
}

/* ---------------- watch mode ---------------- */
function fireEvent(ev) {
  currentEvent = ev; ev.orders.forEach(applyOrder);
  if (cam.follow && ev.zoom === 'fit') showWholeMap();
  else if (cam.follow && ev.focus) { if (ev.zoom || view.z < WATCH_Z - .01) cam.tz = ev.zoom || WATCH_Z; frame(ev.focus.x, ev.focus.y); }
  caption(ev.title, ev.text, ev.tag, !fastForward, ev.audio || audioFor('event', S.events.indexOf(ev) + 1), ev.cite);
  addLog(fmtTime(ev.t) + ' ' + ev.title);
  renderTimeline();
  if (ev.end && !fastForward) endWatch();
}
/* ---------------- leaders: the commanders, a bigger figure on a gold disc with the name below.
   Each has its own painted sheet (images/units/leader-<id>.png, 240x200 cells like the cavalry); until it arrives a
   rider of the side's cavalry stands in. Moved by event orders { leader: 'ney', to: {x, y} }. They take no part in the fighting. */
let leaders = [];
(S.leaders || []).forEach(L => { const im = new Image(); im.onload = () => { SHEETS['leader-' + L.id] = im; }; im.src = (S.imageBase || 'images/') + 'units/leader-' + L.id + '.png'; });
function createLeaders() { leaders = (S.leaders || []).map(L => Object.assign({}, L, { tx: L.x, ty: L.y, shown: !L.hidden, facing: L.facing !== undefined ? L.facing : -PI / 2, state: 'hold' })); }
function moveLeaders() { leaders.forEach(L => { const dx = L.tx - L.x, dy = L.ty - L.y, d = Math.hypot(dx, dy);
  if (d > 2) { const st = Math.min(d, (L.speed || 70) * DT); L.x += dx / d * st; L.y += dy / d * st; L.facing = Math.atan2(dy, dx); L.state = 'move'; } else L.state = 'hold'; }); }
function drawLeader(c, L) {
  if (!L.shown) return; const q = P(L.x, L.y), s = q.s; if (!(s > 0)) return;
  c.save(); c.translate(q.x, q.y); c.scale(1, q.k || 1); c.fillStyle = 'rgba(233,199,122,.32)'; c.strokeStyle = '#f2d27e'; c.lineWidth = Math.max(1.5, 2 * s);
  c.beginPath(); c.ellipse(0, 0, 24 * s, 10 * s, 0, 0, PI * 2); c.fill(); c.stroke(); c.restore();
  const own = SHEETS['leader-' + L.id];
  drawSprite(c, { side: L.side, type: 'cavalry', state: L.state, sheet: own ? 'leader-' + L.id : undefined }, q.x, q.y, L.facing, 0, s * 1.6, q.k);
  outlined(c, L.name.toUpperCase(), q.x, q.y + 15 * s + 7, 12 * Math.max(.9, Math.min(1.5, s)), { fill: '#ffe7a8' });
}
function stepWatch() {
  while (eventIndex < S.events.length && S.events[eventIndex].t <= simTime) fireEvent(S.events[eventIndex++]);
  formations.forEach(moveFormation); moveLeaders(); artillery(false);
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
// The side the computer commands is always the one the player is not. Its plan (S.ai.plans) is a list of timed orders
// as history had them; afterwards each formation reacts to the enemies it has spotted.
const aiSide = () => player === 'allied' ? 'french' : 'allied';
function stepCommand() {
  const ai = aiSide(), plan = (S.ai.plans && S.ai.plans[ai]) || [];
  plan.forEach((st, i) => {
    const key = 'plan' + i;
    if (aiFlags[key] || simTime < st.t) return;
    aiFlags[key] = true;
    st.orders.forEach(o => { applyOrder(o); if (o.hunt && byId[o.id]) byId[o.id].aiPhase = 'cross'; });
    if (st.caption) caption(st.caption.title, st.caption.text, st.caption.tag, true);
  });
  const enemies = formations.filter(f => f.side === player && alive(f) && f.aiKnown && f.state !== 'rout');
  aiReact(ai, enemies);
  formations.forEach(f => {
    if (f.side !== ai || !f.hunter || !alive(f) || f.state === 'rout') return;
    if (f.aiPhase === 'cross') { if (Math.hypot(f.tx - f.x, f.ty - f.y) < 6) f.aiPhase = 'hunt'; else return; }
    if (f.aiPhase === 'hunt') {
      let best = null, bd = S.ai.huntRange; enemies.forEach(e => { const d = dist(e, f); if (d < bd) { bd = d; best = e; } });
      if (best) { f.tx = best.x; f.ty = best.y; f.state = 'attack'; } else { f.tx = S.ai.holdPoint.x; f.ty = S.ai.holdPoint.y; f.state = 'move'; }
    }
  });
  formations.forEach(moveFormation); moveLeaders(); artillery(true); combat(); fog(); checkEnd();
}
// The computer side without a hunting role: charges the nearest enemy it has spotted (chariots from further off), or holds.
function aiReact(side, enemies) {
  formations.forEach(f => {
    if (f.side !== side || f.hunter || f.aiHold || f.type === 'artillery' || !alive(f) || f.state === 'rout') return;   // aiHold: stays put, as the sources have it; guns fire where they stand
    let best = null, bd = f.type === 'chariot' ? 650 : 260; enemies.forEach(e => { const d = dist(e, f); if (d < bd) { bd = d; best = e; } });
    if (best) {
      if (f.type === 'chariot') { f.tx = best.x; f.ty = best.y; f.state = 'attack'; f.aiPhase = 'engaged'; }
      else if (bd < 150) { f.state = 'hold'; f.facing = Math.atan2(best.y - f.y, best.x - f.x); f.aiPhase = 'engaged'; }
      else if (f.state === 'hold') { f.tx = best.x; f.ty = best.y; f.state = 'attack'; f.aiPhase = 'engaged'; }
    } else if (f.aiPhase === 'engaged') { f.aiPhase = null; f.state = 'hold'; }
  });
}
// Elephants (a what-if in Command mode: the sources do not show them fighting) hit hard, frighten horses, and are hard for cavalry to hurt.
const DMG = { chariot: { infantry: 4, archers: 6, chariot: 5, cavalry: 5, elephant: 3, artillery: 6 }, infantry: { infantry: 6, chariot: 6, archers: 8, cavalry: 4, elephant: 4, artillery: 6 }, archers: { infantry: 5, chariot: 5, archers: 5, cavalry: 5, elephant: 5, artillery: 4 }, cavalry: { infantry: 5, chariot: 5, archers: 6, cavalry: 5, elephant: 2, artillery: 9 },
  elephant: { infantry: 7, chariot: 7, archers: 7, cavalry: 9, elephant: 5, artillery: 8 } };
function combat() {
  const live = formations.filter(f => alive(f) && f.state !== 'rout' && f.state !== 'captured');
  live.forEach(a => live.forEach(d => {
    if (a.side === d.side || a.type === 'artillery') return;   // guns fire in artillery(), they do not fight hand to hand
    const range = a.type === 'archers' ? 150 : 62; if (dist(a, d) > range) return;
    let dmg = DMG[a.type][d.type] * (a.power || 1) * (a.strength / 100) * DT;
    if (a.type === 'chariot' && d.state === 'move') dmg *= 1.3;
    if (d.state === 'hold' && d.type !== 'chariot') dmg *= .7;
    if (d.fortified && d.state === 'hold') dmg *= .45;   // a walled farm (Hougoumont, La Haye Sainte)
    d.strength -= dmg; d.lastHit = simTime;
    if (a.state === 'hold') a.facing = Math.atan2(d.y - a.y, d.x - a.x);
  }));
  formations.forEach(f => {
    if (!alive(f)) return;
    if (f.strength <= 0) { f.strength = 0; f.state = 'destroyed'; addLog(f.name + ' destroyed'); if (selected.has(f.id)) selected.delete(f.id); }
    else if (f.strength < 25 && f.state !== 'rout') { f.state = 'rout'; f.route = null; const r = S.sides[f.side].rally; f.tx = r.x; f.ty = r.y; f.spread = 2.4; f.then = 'withdrawn'; addLog(f.name + ' routs'); if (f.side === player) { caption('A formation breaks', f.name + ' has routed and is fleeing the field.', 'reconstruction', true, audioFor('cmd', 'breaks')); if (cam.follow) focusOn(f.x, f.y); } }
  });
}
function fog() {
  const ai = aiSide(), mine = formations.filter(f => f.side === player && alive(f)), theirs = formations.filter(f => f.side === ai && alive(f));
  theirs.forEach(f => { if (!f.known && mine.some(e => dist(e, f) < S.ai.spotRange)) { f.known = true; addLog('Enemy spotted: ' + f.name); caption('Enemy sighted', f.name + ' has been spotted.', 'reconstruction', true, audioFor('cmd', 'sighted')); if (cam.follow) focusOn(f.x, f.y); } });
  mine.forEach(f => { if (!f.aiKnown && theirs.some(e => dist(e, f) < S.ai.spotRange)) f.aiKnown = true; });
}
function checkEnd() {
  if (battleOver || simTime < 25) return;
  const ai = aiSide(), mine = formations.filter(f => f.side === player && f.present), theirs = formations.filter(f => f.side === ai && f.present);
  if (theirs.every(f => !alive(f))) battleOver = 'victory';
  else if (mine.every(f => !alive(f) || f.state === 'rout')) battleOver = 'defeat';
  if (!battleOver && simTime >= S.commandDuration) battleOver = 'stalemate';
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
let TILT = .45;   // the battlefield is always shown tilted
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
const OVER = () => document.body.classList.contains('dl') ? 0 : VH() * .35;   // the desktop layout keeps the caption off the map
// When the whole width is in view, the map is centred and black shows on both sides.
const xLo = () => VW() > W.w ? (W.w - VW()) / 2 : 0, xHi = () => VW() > W.w ? (W.w - VW()) / 2 : W.w - VW();
function clampView() { view.x = clamp(view.x, xLo(), xHi()); view.y = clamp(view.y, 0, Math.max(0, W.h - VH()) + OVER()); }
// Zoom at which the whole battlefield fits in the top part `k` of the screen, above the caption box.
const fitZ = (k = .76) => Math.min(view.w / W.w, vAt(view.h * k) * view.h * TR() / W.h);
function focusOn(x, y) { cam.tx = x; cam.ty = y; cam.fit = false; cam.fy = null; }
// Ease out to the whole battlefield, top edge at the top of the screen.
function showWholeMap(k) { cam.fit = true; cam.tz = fitZ(k); cam.tx = W.w / 2; cam.ty = 0; }
// Frame a point in the upper part of the screen, above the caption box.
function frame(x, y, k = .22) { focusOn(x, y + VH() * k); cam.fy = y; cam.fk = k; }
function updateCamera() {
  if (cam.tz !== null) { view.z += (cam.tz - view.z) * .08; if (Math.abs(cam.tz - view.z) < .002) { view.z = cam.tz; cam.tz = null; } }
  if (cam.fit) cam.ty = VH() / 2;
  else if (cam.fy !== null && cam.fy !== undefined && cam.tx !== null) cam.ty = cam.fy + VH() * cam.fk;   // keep the framing right while the zoom eases
  if (cam.tx === null) return;
  const gx = clamp(cam.tx - VW() / 2, xLo(), xHi()), gy = clamp(cam.ty - VH() / 2, 0, Math.max(0, W.h - VH()) + OVER());
  view.x += (gx - view.x) * .08; view.y += (gy - view.y) * .08;
  if (Math.abs(gx - view.x) < .5 && Math.abs(gy - view.y) < .5) { view.x = gx; view.y = gy; cam.tx = null; }
}
function drawFormation(c, f) {
  if (!f.present || f.state === 'withdrawn' || f.state === 'destroyed') return;
  if (!f.known && mode === 'command' && f.side !== player) return;
  const concealed = !f.known && !(mode === 'command' && f.side === player);
  c.save(); if (concealed) c.globalAlpha = .5;
  // In the flat view a subtle depth cue remains: units nearer the south edge draw a little larger. The tilted view does this by projection.
  const SS = 1.3 * (tiltOn() ? 1 : (1 + .18 * (f.y / W.h - .5))), sx = (f.type === 'artillery' ? 40 : f.type === 'elephant' ? 62 : f.type === 'chariot' ? 30 : 13) * 1.3, sy = (f.type === 'artillery' ? 26 : f.type === 'elephant' ? 30 : f.type === 'chariot' ? 22 : 14) * 1.3, n = f.cols * f.rows;
  // In the water a formation squeezes into a double file (single for chariots) along its line of march.
  const FC = f.inWater ? (f.type === 'chariot' ? 1 : 2) : f.cols, FR = f.inWater ? Math.ceil(n / FC) : f.rows;
  const cos = Math.cos(f.facing), sin = Math.sin(f.facing), shown = Math.ceil(n * Math.max(.15, f.strength / 100));
  const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', scatter = f.state === 'rout' || f.state === 'scattered';
  const pts = [];
  for (let i = 0; i < n; i++) {
    if (i >= shown) continue;
    const col = i % FC, row = Math.floor(i / FC);
    let d = -(row - (FR - 1) / 2) * sy * (f.inWater ? .85 : 1) + (jitter(i, 1) - .5) * 5 * f.spread, a = (col - (FC - 1) / 2) * sx * (f.inWater ? .7 : 1) + (jitter(i, 2) - .5) * 5 * f.spread;
    if (moving) a += Math.sin(wall * 7 + i) * .9;
    pts.push({ x: f.x + cos * d - sin * a, y: f.y + sin * d + cos * a, i, fac: f.facing + (scatter ? (jitter(i, 3) - .5) * 1.4 : 0) });
  }
  pts.sort((p, q) => p.y - q.y).forEach(p => { const q = P(p.x, p.y); drawSprite(c, f, q.x, q.y, p.fac, p.i, SS * q.s, q.k); });
  // standard
  const pb = P(f.x - cos * ((FR / 2) * sy + 4), f.y - sin * ((FR / 2) * sy + 4)), fs = pb.s;
  c.strokeStyle = '#3b2c1a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(pb.x, pb.y); c.lineTo(pb.x, pb.y - 16 * fs); c.stroke();
  c.fillStyle = SIDE_ART[f.side].pennant; c.beginPath(); c.moveTo(pb.x, pb.y - 16 * fs); c.lineTo(pb.x + 11 * fs, pb.y - 13 * fs); c.lineTo(pb.x, pb.y - 9 * fs); c.closePath(); c.fill();
  c.strokeStyle = SIDE_ART[f.side].trim; c.lineWidth = .8; c.stroke();
  // label + strength
  const half = (FR / 2) * sy + 10, ly = f.y + Math.max(half, (FC / 2) * sx * Math.abs(sin) + 8) + 6, pl = P(f.x, ly), ts = Math.max(.8, Math.min(1.5, pl.s / 1.25));
  const suffix = f.gun && f.gun.phase === 'limber' ? ' \u00b7 limbering' : f.gun && f.gun.phase === 'unlimber' ? ' \u00b7 unlimbering' : f.state === 'captured' ? ' \u00b7 captured' : f.state === 'rout' ? ' \u00b7 routed' : f.state === 'scattered' ? ' \u00b7 scattered' : f.state === 'loot' ? ' \u00b7 plundering' : concealed ? ' \u00b7 concealed' : '';
  outlined(c, f.division + suffix, pl.x, pl.y, 11 * ts, { fill: f.side === 'allied' ? '#ffe1d6' : '#dceeff' });
  if (f.strength < 100 || selected.has(f.id) || simTime - f.lastHit < 1) {
    c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(pl.x - 22 * ts, pl.y + 8 * ts, 44 * ts, 5 * ts);
    c.fillStyle = f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'; c.fillRect(pl.x - 21 * ts, pl.y + 9 * ts, 42 * ts * f.strength / 100, 3 * ts);
  }
  const pc = P(f.x, f.y);
  if (selected.has(f.id)) { c.save(); c.translate(pc.x, pc.y); c.scale(1, pc.k); c.rotate(f.facing + PI / 2); c.strokeStyle = '#fff2a4'; c.lineWidth = 2; c.setLineDash([6, 4]); c.beginPath(); c.ellipse(0, 0, ((FC / 2) * sx + 14) * pc.s, ((FR / 2) * sy + 14) * pc.s, 0, 0, PI * 2); c.stroke(); c.restore(); }
  if (mode === 'command' && selected.has(f.id) && f.state === 'move') { const pt = P(f.tx, f.ty); c.strokeStyle = 'rgba(255,242,164,.6)'; c.lineWidth = 1.5; c.setLineDash([4, 6]); c.beginPath(); c.moveTo(pc.x, pc.y); c.lineTo(pt.x, pt.y); c.stroke(); c.setLineDash([]); c.beginPath(); c.arc(pt.x, pt.y, 6 * pt.s, 0, PI * 2); c.stroke(); }
  c.restore();
}
function render() {
  updateCamera(); clampView();
  const z = view.z, vw = VW(), vh = VH();
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, view.w, view.h);
  if (TER) {
    if (tiltOn()) {
      // Draw the pre-rendered terrain in thin horizontal strips, each sampling a wider span of the map the further north it is.
      const STRIP = 3;
      for (let y0 = 0; y0 < view.h; y0 += STRIP) {
        const y1 = Math.min(view.h, y0 + STRIP), v0 = vAt(y0), v1 = vAt(y1 + 1), sm = sAt((v0 + v1) / 2);
        const wy0 = view.y + v0 * vh, wy1 = view.y + v1 * vh, ww = vw / sm, wxl = view.x + vw / 2 - ww / 2;
        // strips overlap by one pixel so sub-pixel sampling never leaves a dark seam
        ctx.drawImage(TER, wxl * TS, wy0 * TS, ww * TS, Math.max(1, (wy1 - wy0) * TS), 0, y0, view.w, y1 - y0 + 1);
      }
    } else ctx.drawImage(TER, view.x * TS, view.y * TS, vw * TS, vh * TS, 0, 0, view.w, view.h);
  }
  const scene = [];
  const y0v = view.y - 120, y1v = view.y + vh + 60, x0v = view.x - 200, x1v = view.x + vw + 200;
  PROPS.forEach(p => { if (PAINTED && artOn && p.kind === 'tree') return; if (p.kind === 'city' ? (B.city.y + B.city.h > y0v - 200 && B.city.y < y1v) : (p.y > y0v && p.y < y1v && p.x > x0v && p.x < x1v)) scene.push({ y: p.y, prop: p }); });
  formations.forEach(f => scene.push({ y: f.y, f })); leaders.forEach(L => scene.push({ y: L.y, L }));
  scene.sort((a, b) => a.y - b.y).forEach(o => o.prop ? drawProp(ctx, o.prop) : o.L ? drawLeader(ctx, o.L) : drawFormation(ctx, o.f));
  drawSmoke(ctx);
  // aim lines from the player's selected batteries to their targets: dashed while laying, solid once the guns are on
  formations.forEach(f => { const g = f.gun, t = g && g.target && byId[g.target]; if (!t || f.side !== player || !selected.has(f.id) || !alive(t)) return;
    const a = P(f.x, f.y - 8), b = P(t.x, t.y - 8), laid = g.laid >= GUN.lay; ctx.save(); ctx.strokeStyle = g.mode === 'auto' || g.mode === 'fire' ? '#ff6a4a' : '#ffd36b'; ctx.lineWidth = 2;
    ctx.setLineDash(laid ? [] : [8, 6]); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.arc(b.x, b.y, 14 * b.s, 0, PI * 2); ctx.stroke(); ctx.restore(); });
  markers.forEach(m => {
    const p = P(m.x, m.y), r = (26 + 8 * Math.sin(wall * 3)) * p.s;
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(1, p.k);
    ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r, 0, PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,211,107,.4)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r + 8, 0, PI * 2); ctx.stroke(); ctx.restore();
    outlined(ctx, m.label, p.x, p.y - r * p.k - 16, 14, { fill: '#fff3c9' });
  });
  if (marquee) {
    const x0 = Math.min(marquee.x0, marquee.x1), y0 = Math.min(marquee.y0, marquee.y1), x1 = Math.max(marquee.x0, marquee.x1), y1 = Math.max(marquee.y0, marquee.y1);
    const c4 = [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
    ctx.beginPath(); c4.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
    ctx.fillStyle = 'rgba(120,200,255,.12)'; ctx.fill(); ctx.strokeStyle = '#8fd0ff'; ctx.lineWidth = 1.5; ctx.stroke();
  }
  if (band) {
    const x0 = Math.min(band.x0, band.x1), y0 = Math.min(band.y0, band.y1), x1 = Math.max(band.x0, band.x1), y1 = Math.max(band.y0, band.y1);
    const c4 = [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
    ctx.beginPath(); c4.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
    ctx.fillStyle = 'rgba(255,211,107,.12)'; ctx.fill(); ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]);
  }
  // scale bar (at the near edge of the view)
  const sb = B.scale.px * z; ctx.fillStyle = 'rgba(9,23,32,.8)'; const sy0 = mode === 'watch' ? view.h - 42 : view.h - 12; ctx.save(); ctx.globalAlpha = .55;
  ctx.fillRect(300, sy0 - 20, sb + 16, 20);
  ctx.fillStyle = '#e9c77a'; ctx.fillRect(308, sy0 - 7, sb, 3); ctx.font = '10px system-ui'; ctx.fillStyle = '#e8f0ea'; ctx.textAlign = 'left'; ctx.fillText(B.scale.label, 308, sy0 - 10); ctx.restore();
  drawMini();
}
function buildMiniBase() {
  MINIBASE = document.createElement('canvas'); MINIBASE.width = mini.width; MINIBASE.height = mini.height;
  const g = MINIBASE.getContext('2d'); g.drawImage(TER, 0, 0, mini.width, mini.height);
  const sx = mini.width / W.w, sy = mini.height / W.h; g.fillStyle = '#4a6a36'; PROPS.forEach(p => { if (p.kind === 'tree') g.fillRect(p.x * sx - 1, p.y * sy - 1, 2, 2); });
  g.fillStyle = '#8c7d5a'; g.fillRect(B.city.x * sx, B.city.y * sy, B.city.w * sx, B.city.h * sy); g.strokeStyle = '#4d4230'; g.lineWidth = 1; g.strokeRect(B.city.x * sx, B.city.y * sy, B.city.w * sx, B.city.h * sy);
}
function drawMini() {
  const w = mini.width, h = mini.height, sx = w / W.w, sy = h / W.h;
  mctx.drawImage(MINIBASE, 0, 0);
  formations.forEach(f => { if (!f.present || !alive(f)) return; if (!f.known && mode === 'command' && f.side !== player) return; mctx.globalAlpha = (f.known || (mode === 'command' && f.side === player)) ? 1 : .45; mctx.fillStyle = SIDE_ART[f.side].pennant; mctx.strokeStyle = '#fff'; mctx.lineWidth = .8; mctx.beginPath(); mctx.arc(f.x * sx, f.y * sy, f.type === 'chariot' ? 3.6 : 3, 0, PI * 2); mctx.fill(); mctx.stroke(); });
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
  box.innerHTML = [...selected].map(id => { const f = byId[id]; return `<div class="sel"><b style="color:${f.side === 'allied' ? '#ffb3a7' : '#9fc8ff'}">${f.name}</b><div class="tiny">${f.type}${f.gun ? ' (' + (!f.gun.deployed ? 'limbered, cannot fire' : f.gun.target && byId[f.gun.target] ? ({ aim: f.gun.laid < GUN.lay ? 'laying guns on ' : 'aimed at ', fire: 'firing a volley at ', auto: 'autofire at ' }[f.gun.mode] || '') + byId[f.gun.target].division : { hold: 'ceasefire', will: 'firing at will' }[f.gun.mode] || '') + ')' : ''} · ${f.count} ${tagChip(f.confidence)}</div><div class="bar"><i style="width:${f.strength}%;background:${f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'}"></i></div><div class="tiny">State: ${f.state}</div><p class="note">${f.note}</p></div>`; }).join('');
}
function renderTimeline() {
  const tl = $('timeline'); if (!tl) return;
  tl.innerHTML = S.events.map(e => `<button class="tick${currentEvent === e ? ' on' : ''}" style="left:${e.t / S.duration * 100}%" data-t="${e.t}" title="${fmtTime(e.t)} ${e.title}"></button>`).join('') + `<i id="tlNow" style="left:${simTime / S.duration * 100}%"></i>`;
  tl.querySelectorAll('.tick').forEach(b => b.onclick = ev => { ev.stopPropagation(); jumpTo(+b.dataset.t); });
  tl.onclick = ev => { const r = tl.getBoundingClientRect(); jumpTo(clamp((ev.clientX - r.left) / r.width, 0, 1) * S.duration); };
  $('eventList').innerHTML = S.events.map(e => `<button class="ev${currentEvent === e ? ' on' : ''}" data-t="${e.t}"><span>${fmtTime(e.t)}</span> ${e.title}</button>`).join('');
  $('eventList').querySelectorAll('.ev').forEach(b => b.onclick = () => jumpTo(+b.dataset.t));
}
const PN = u => u.portrait || ((SHEET_BY[u.side] || {})[u.type] || u.side + '-' + u.type);   // portrait file name; the painted figure is the fallback
function unitSprite(c, u, big) {
  const w = c.canvas.width, h = c.canvas.height; c.fillStyle = '#c0ad75'; c.fillRect(0, 0, w, h);
  drawSprite(c, { side: u.side, type: u.type, sheet: u.sheet, state: 'hold' }, w / 2, h - 6, 0, u.type === 'archers' ? 2 : 1, (u.type === 'chariot' || u.type === 'artillery' ? 1.5 : 2) * (big ? h / 60 : 1));
}
function renderArmies() {
  const units = S.units || [];
  const card = (u, i) => `<div class="ucard" data-unit="${i}" title="Click for the full write-up and photographs"><div class="pwrap"><canvas id="uc${i}" width="84" height="60"></canvas><img class="portrait" alt="" src="${(S.imageBase || 'images/')}portraits/${PN(u)}.jpg" onload="this.classList.add('show')"></div><div><b style="color:${u.side === 'allied' ? '#ffb3a7' : '#9fc8ff'}">${u.name}</b><div class="tiny">${u.desc}</div>${tagChip(u.tag)}<div class="more">More ▸</div></div></div>`;
  // Each side shows its first two cards; the rest fold away under a "more" button.
  $('armies').innerHTML = [...new Set(units.map(u => u.side))].map(sd => {
    const idx = units.map((u, i) => i).filter(i => units[i].side === sd), rest = idx.slice(2);
    return idx.slice(0, 2).map(i => card(units[i], i)).join('') + (rest.length ? `<div class="umore" hidden>${rest.map(i => card(units[i], i)).join('')}</div><button class="ufold" data-n="${rest.length}"></button>` : '');
  }).join('');
  $('armies').querySelectorAll('.ufold').forEach(b => { const n = +b.dataset.n, label = open => open ? '\u25b4 Show fewer' : `\u25be ${n} more unit${n > 1 ? 's' : ''}`; b.textContent = label(false);
    b.onclick = () => { const m = b.previousElementSibling, open = m.hidden; m.hidden = !open; b.textContent = label(open); }; });
  armiesRedraw = () => units.forEach((u, i) => { const el = $('uc' + i); if (el) unitSprite(el.getContext('2d'), u); }); armiesRedraw();
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
  $('unitKicker').textContent = (u.side === 'allied' ? 'Allied army' : 'French army') + ' · ' + (unitIdx + 1) + ' / ' + units.length;
  $('unitTitle').innerHTML = `<span style="color:${u.side === 'allied' ? '#ffb3a7' : '#9fc8ff'}">${u.name}</span> ${tagChip(u.tag)}`;
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
function hideOverlay(id) { $(id).classList.remove('show'); if (id === 'debrief' && typeof textOff !== 'undefined' && textOff) document.body.classList.add('textoff'); if (id === 'unit') { document.body.classList.remove('unitopen'); if (unitPausedIntro) { unitPausedIntro = false; if (mode === 'intro' && introPaused) togglePause(); } } }
function showIntro(i) {
  introIdx = clamp(i, 0, S.intro.length - 1); const sl = S.intro[introIdx]; introTimer = 0; introTail = 0; $('introNext').textContent = 'Next \u25b6'; $('introNext').classList.remove('ready');
  $('introKicker').textContent = `Historical introduction · ${introIdx + 1} / ${S.intro.length}`;
  $('introTitle').textContent = sl.title; $('introSub').textContent = sl.subtitle || '';
  $('introLines').innerHTML = sl.lines.map(l => `<p>${l.text} ${tagChip(l.tag, l.cite)}</p>`).join('');
  $('introNav').style.display = sl.choice ? 'none' : 'flex'; $('ctrlStrip').classList.toggle('lit', false); $('introChoice').style.display = 'none'; $('playGame').classList.toggle('show', !!sl.choice); $('playMenu').classList.remove('show'); document.body.classList.toggle('choice', !!sl.choice);
  $('introBack').disabled = introIdx === 0; $('introBar').style.width = '0%';
  markers = sl.markers || [];
  if (sl.zoom && sl.zoom !== 'fit') cam.tz = clamp(sl.zoom, .45, 2.4);
  // The dialog covers the lower part of the panel, so aim the camera such that the point of interest sits in the upper third.
  if (sl.zoom === 'fit') showWholeMap(.6); else if (sl.focus) frame(sl.focus.x, sl.focus.y, .27);
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
function startIntro() { mode = 'intro'; resetSim(); markers = []; introPaused = false; introStarted = false; Narr.stop();
  $('titleCard').classList.remove('show'); $('playBig').classList.add('show'); hideOverlay('intro');
  if (G && window.WATERLOO_WORLD) G.start($('globe'), { lift: true, onSpinProgress: titleCardProgress, onSpun: () => { if (introSpunCb) { const f = introSpunCb; introSpunCb = null; f(); } }, onDone: () => {} }); $('introPause').textContent = 'Ⅱ Pause'; setModeButtons(); hideOverlay('debrief'); $('caption').classList.remove('show'); showIntro(0); if (G && G.active()) hideOverlay('intro'); else showOverlay('intro'); }
function startMode(m, opts) {
  const skipGlobe = opts && opts.skipGlobe; $('playBig').classList.remove('show'); $('titleCard').classList.remove('show'); $('playGame').classList.remove('show'); $('playMenu').classList.remove('show'); document.body.classList.remove('choice');
  mode = m; markers = []; if (G) G.stop(); hideOverlay('intro'); hideOverlay('debrief'); hideOverlay('explain'); Narr.stop();
  resetSim(); paused = false; cam.follow = true; updatePauseBtn(); setModeButtons();
  document.body.dataset.mode = m; $('caption').classList.remove('show'); placeMedia();
  renderTimeline(); renderSelection();
  const begin = () => {
    cinematic = false;
    if (m === 'watch') caption(S.events[0].title, S.events[0].text, S.events[0].tag, false);
    else cmdCaption('Command mode', player, 'reconstruction', S.commandFocus || { x: S.world.w / 2, y: S.world.h / 2 });
  };
  // Every start opens on the globe: one turn, then the dive to the region, then the battle begins. Click the globe to skip.
  // The globe belongs to the introduction only; a battle starts straight away.
  begin();
}
$('globe').addEventListener('click', () => { if (G && G.active()) { G.skip(); $('titleCard').classList.remove('show'); } });
function resetSim() { createFormations(); createLeaders(); simTime = 0; acc = 0; eventIndex = 0; currentEvent = null; aiFlags = {}; battleOver = null; selected.clear(); log = []; $('log').innerHTML = ''; renderSelection(); renderTimeline(); }
function setModeButtons() { $('watchBtn').classList.toggle('active', mode === 'watch'); $('commandBtn').classList.toggle('active', mode === 'command'); $('introBtn').classList.toggle('active', mode === 'intro'); document.body.dataset.mode = mode; }
function updatePauseBtn() { $('pauseBtn').textContent = paused ? '▶ Resume' : 'Ⅱ Pause'; }
function togglePause() { if (cinematic) return; if (mode === 'intro') { introPaused = !introPaused; $('introPause').textContent = introPaused ? '▶ Resume' : 'Ⅱ Pause'; Narr.pause(introPaused); return; } if (battleOver) return; paused = !paused; updatePauseBtn(); Narr.pause(paused); }
function showDebrief() {
  document.body.classList.remove('textoff');   // the after-action report always opens in full, even when the viewer has hidden the text elsewhere (fullDebrief)
  Narr.stop(); const d = $('debrief');
  let head, body;
  if (battleOver === 'history') { head = 'What the sources say happened next'; body = ''; }
  else {
    const txt = S.debrief[player][battleOver].text;
    const rows = formations.filter(f => f.known || f.side === 'allied').map(f => `<tr><td style="color:${f.side === 'allied' ? '#ffb3a7' : '#9fc8ff'}">${f.name}</td><td>${f.state}</td><td>${Math.round(f.strength)}%</td></tr>`).join('');
    head = S.debrief[player][battleOver].title;
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
function manualCamera() { cam.tx = null; cam.tz = null; cam.fit = false; cam.follow = false; $('followBtn').classList.remove('active'); }
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
  fs.forEach((f, k) => { const g = legal({ x: clamp(p.x + (k % cols - (cols - 1) / 2) * 90, 20, W.w - 20), y: clamp(p.y + Math.floor(k / cols) * 70, 20, W.h - 20) }); f.route = null; f.tx = g.x; f.ty = g.y; f.state = state || 'move'; f.aiPhase = null; });
  addLog((state === 'attack' ? 'Attack-move' : 'Move') + ' ordered: ' + fs.length + ' formation' + (fs.length > 1 ? 's' : '')); renderSelection();
}
function orderHalt() { ownSelected().forEach(f => { if (f.state === 'move' || f.state === 'attack') f.state = 'hold'; }); addLog('Halt'); renderSelection(); }
function orderFace(p) { ownSelected().forEach(f => { f.facing = Math.atan2(p.y - f.y, p.x - f.x); f.state = 'hold'; }); addLog('Facing changed'); renderSelection(); }
function orderFallBack() { $('retreatBtn').click(); }
// Gun orders for the selected batteries. Aim: turn and lay the guns on a target in sight and in range (takes GUN.lay seconds).
// Fire: one volley as soon as the guns are laid. Autofire: keep firing at the target until it is gone or out of range.
const ownGuns = () => ownSelected().filter(f => f.type === 'artillery' && f.gun);
function orderAim(t) { ownGuns().forEach(f => { if (dist(f, t) > GUN.range) { addLog(f.division + ': ' + t.division + ' is out of range'); return; }
  if (f.gun.target !== t.id) f.gun.laid = 0; f.gun.target = t.id; f.gun.mode = 'aim'; if (f.state === 'move' || f.state === 'attack') { f.tx = f.x; f.ty = f.y; f.state = 'hold'; } });
  addLog('Aim at ' + t.division); renderSelection(); }
window.__gunOrders = { orderAim: t => orderAim(t), orderGunMode: m => orderGunMode(m), screenOf: id => P(byId[id].x, byId[id].y) };   // for tests
function orderGunMode(mode) { ownGuns().forEach(f => { if ((mode === 'fire' || mode === 'auto') && !f.gun.target) return; f.gun.mode = mode; if (mode === 'hold' || mode === 'will') f.gun.target = null; });
  addLog({ fire: 'Fire!', auto: 'Autofire', hold: 'Cease fire', will: 'Fire at will' }[mode]); renderSelection(); }
function showMenu(sx, sy, p) {
  menuTarget = p; const m = $('ctxMenu'), fs = ownSelected(), enemy = pickFormation(p), onEnemy = enemy && enemy.side !== player;
  const items = [];
  if (fs.length) {
    items.push({ t: onEnemy ? '\u2694 Attack ' + enemy.division : '\u2694 Attack-move here', f: () => orderMove(onEnemy ? { x: enemy.x, y: enemy.y } : p, 'attack') });
    items.push({ t: '\u27a1 Move here', f: () => orderMove(p, 'move') });
    items.push({ t: '\u21bb Face this way', f: () => orderFace(p) });
    items.push({ t: '\u25a0 Halt / hold ground', f: orderHalt });
    items.push({ t: '\u21a9 Fall back', f: orderFallBack });
    const guns = fs.filter(f => f.type === 'artillery' && f.gun);
    if (guns.length) {
      items.push({ sep: true });
      if (onEnemy && sees(player, enemy)) {
        const inRange = guns.some(f => dist(f, enemy) <= GUN.range);
        items.push({ t: '\ud83c\udfaf Aim at ' + enemy.division + (inRange ? '' : ' (out of range)'), f: () => orderAim(enemy), off: !inRange });
      }
      if (guns.some(f => f.gun.target)) {
        items.push({ t: '\ud83d\udca5 Fire (one volley)', f: () => orderGunMode('fire') });
        items.push({ t: '\ud83d\udd01 Autofire (keep firing)', f: () => orderGunMode('auto') });
      }
      items.push({ t: '\u270b Cease fire', f: () => orderGunMode('hold') });
      items.push({ t: '\ud83c\udfb2 Fire at will (choose own targets)', f: () => orderGunMode('will') });
    }
    items.push({ sep: true });
  }
  items.push({ t: '\u2611 Select all ' + (player === 'allied' ? 'Allied' : 'French') + ' formations', f: () => $('selectAll').click() });
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
let textOff = false; try { textOff = localStorage.getItem('waterloo-textoff') === '1'; } catch (e) {}
function setTextOff(off) { textOff = off; document.body.classList.toggle('textoff', off); try { localStorage.setItem('waterloo-textoff', off ? '1' : '0'); } catch (e) {} }
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
// Layout guide for painting the terrain: the current map at full size with every feature boxed and labelled (press G).
function exportLayoutGuide() {
  const T = document.createElement('canvas'); T.width = W.w; T.height = W.h; const g = T.getContext('2d');
  g.drawImage(TER, 0, 0, W.w, W.h);
  g.strokeStyle = '#ff2a2a'; g.lineWidth = 4; g.font = 'bold 28px system-ui'; g.fillStyle = '#ff2a2a'; g.textAlign = 'left';
  const box = (x, y, w, h, t) => { g.strokeRect(x, y, w, h); g.fillText(t, x + 6, y - 10); };
  box(B.city.x - 26, B.city.y - 26, B.city.w + 52, B.city.h + 52, 'CITY: ' + (B.city.name || 'none'));
  box(B.camp.x, B.camp.y, B.camp.w, B.camp.h, 'CAMP: ' + (B.camp.name || 'none'));
  B.fords.forEach(f => box(f.x - 60, f.y - 30, 120, 60, 'FORD: ' + f.name));
  B.forests.forEach(fo => { g.beginPath(); g.ellipse(fo.x, fo.y, fo.r, fo.r * .8, 0, 0, PI * 2); g.stroke(); g.fillText('FOREST', fo.x - 50, fo.y); });
  B.hills.forEach(h => { g.beginPath(); g.ellipse(h.x, h.y, h.rx, h.ry, 0, 0, PI * 2); g.stroke(); g.fillText('HILL', h.x - 25, h.y); });
  g.strokeStyle = '#00e5ff'; g.lineWidth = 6; g.beginPath(); curve(g, B.river); g.stroke(); g.beginPath(); curve(g, B.tributary); g.stroke(); g.fillStyle = '#00e5ff'; g.fillText('RIVER CENTRELINE', 1560, 1300);
  g.strokeStyle = '#ffd400'; g.lineWidth = 6; g.beginPath(); curve(g, B.road); g.stroke(); g.fillStyle = '#ffd400'; g.fillText('ROAD', 1200, 1320);
  g.fillStyle = '#ff2a2a'; g.font = 'bold 40px system-ui'; g.fillText('N (north is up) \u2191   map ' + W.w + ' x ' + W.h + ' px, paint at 2x = ' + W.w * 2 + ' x ' + W.h * 2, 40, 60);
  const a = document.createElement('a'); a.download = 'waterloo-layout-guide.png'; a.href = T.toDataURL('image/png'); a.click();
}
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
  sel.onchange = () => { voiceId = sel.value; try { localStorage.setItem('waterloo-voice', voiceId); } catch (e) {} if (Narr.on) { if (mode === 'intro') speakSlide(S.intro[introIdx]); else if (currentEvent) Narr.speak(currentEvent.text, currentEvent.audio || audioFor('event', S.events.indexOf(currentEvent) + 1)); } };
} else $('voiceSel').style.display = 'none';
try { const r = parseFloat(localStorage.getItem('waterloo-voice-rate')); if (r >= .5 && r <= 2) Narr.rate = r; } catch (e) {}
$('voiceRate').value = String(Narr.rate);
$('voiceRate').onchange = () => { Narr.rate = parseFloat($('voiceRate').value) || 1; if (Narr.audio) Narr.audio.playbackRate = Narr.rate; try { localStorage.setItem('waterloo-voice-rate', String(Narr.rate)); } catch (e) {} };
$('zoomIn').onclick = () => { const c = U(view.w / 2, view.h / 2); view.z = clamp(view.z * 1.2, .45, 2.4); const c2 = U(view.w / 2, view.h / 2); view.x += c.x - c2.x; view.y += c.y - c2.y; clampView(); };   // zoom about the centre
$('zoomOut').onclick = () => { const c = U(view.w / 2, view.h / 2); view.z = clamp(view.z / 1.2, .45, 2.4); const c2 = U(view.w / 2, view.h / 2); view.x += c.x - c2.x; view.y += c.y - c2.y; clampView(); };   // zoom about the centre
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
$('chooseCommand').onclick = () => { setPlayer('allied'); startMode('command', { skipGlobe: true }); };
$('explainClose').onclick = () => { hideOverlay('explain'); Narr.stop(); if (paused && !battleOver) togglePause(); };
$('debriefWatch').onclick = () => startMode('watch');
$('debriefCommand').onclick = () => startMode('command');
$('debriefIntro').onclick = startIntro;
$('selectAll').onclick = () => { selected.clear(); formations.forEach(f => { if (f.side === player && alive(f) && f.state !== 'rout') selected.add(f.id); }); renderSelection(); };
$('sideSel').value = player;
$('sideSel').onchange = () => { setPlayer($('sideSel').value); if (mode === 'command') startMode('command'); };
$('chooseCommandH').onclick = () => { setPlayer('french'); startMode('command', { skipGlobe: true }); };
$('playGame').onclick = () => { $('playGame').classList.remove('show'); $('playMenu').classList.remove('cmdpick'); $('playMenu').classList.add('show'); };
$('pmClose').onclick = () => { const fromCmd = $('playMenu').classList.contains('cmdpick'); $('playMenu').classList.remove('show', 'cmdpick'); if (!fromCmd) $('playGame').classList.add('show'); };
$('pmWatch').onclick = () => $('chooseWatch').click();
$('pmAllied').onclick = () => $('chooseCommand').click();
$('pmFrench').onclick = () => $('chooseCommandH').click();
$('haltBtn').onclick = () => { selected.forEach(id => { const f = byId[id]; if (f.state === 'move' || f.state === 'attack') { f.state = 'hold'; } }); };
$('retreatBtn').onclick = () => { const r = S.sides[player].rally; let i = 0; selected.forEach(id => { const f = byId[id]; if (!alive(f) || f.state === 'rout' || f.side !== player) return; f.tx = r.x + (i % 3) * 60; f.ty = r.y + Math.floor(i / 3) * 60; f.state = 'move'; i++; }); };

/* ---------------- main loop ---------------- */
function tick(t) {
  if (!lastFrame) lastFrame = t; const dt = Math.min(.1, (t - lastFrame) / 1000); lastFrame = t; wall += dt;
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
TER = buildTerrain(); DRAWNTER = TER; buildMiniBase(); renderBriefing(); renderArmies(); createFormations(); createLeaders();
// Optional painted terrain (images/terrain.jpg, painted to the layout guide): when present it replaces the drawn ground.
// Labels, river course and props still come from the scenario, so the painting must follow the guide's positions.
{ const img = new Image(); img.onload = () => { const T = document.createElement('canvas'); T.width = W.w * TS; T.height = W.h * TS; const g = T.getContext('2d'); g.drawImage(img, 0, 0, T.width, T.height);
    g.scale(TS, TS); B.fords.forEach(f => outlined(g, f.name, f.x, f.y + 34, 12, { fill: '#e8f4f6' })); if (B.city) outlined(g, B.city.name, B.city.x + B.city.w / 2, B.city.y + B.city.h + 46, 20, { fill: '#f8e9bf' }); if (B.camp) outlined(g, B.camp.name, B.camp.x + B.camp.w / 2, B.camp.y - 18, 12, { fill: '#dce9ff' });
    B.labels.forEach(l => outlined(g, l.text, l.x, l.y, l.small ? 13 : 26, { rotate: l.rotate || 0, fill: l.small ? '#efe3c3' : '#dff3f6', weight: l.small ? 'italic' : 'bold' }));
    PAINTEDTER = T; applyArt(); }; img.src = (S.imageBase || 'images/') + 'terrain.jpg'; }
function applyArt() {
  if (artOn && PAINTEDTER) { TER = PAINTEDTER; PAINTED = true; }
  else { if (!DRAWNTER) DRAWNTER = buildTerrain(); TER = DRAWNTER; PAINTED = false; }
  buildMiniBase(); document.body.classList.toggle('drawnmode', !artOn); const b = $('artBtn'); if (b) { b.classList.toggle('active', artOn); b.textContent = artOn ? '\ud83c\udfa8 Art' : '\u270f Drawn'; b.title = artOn ? 'Painted battlefield (click for the drawn map)' : 'Drawn battlefield (click for the painting)'; }
}
$('artBtn').onclick = () => { artOn = !artOn; try { localStorage.setItem('waterloo-art', artOn ? '1' : '0'); } catch (e) {} applyArt(); };
// When the title font finishes loading, redo the drawn labels; never overwrite a painting that has already arrived.
if (document.fonts && document.fonts.load) document.fonts.load("bold 20px 'Cinzel'").then(() => { DRAWNTER = buildTerrain(); applyArt(); }).catch(() => {});
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};
new ResizeObserver(resize).observe(panel); resize();
view.x = 700; view.y = 300; startIntro();
requestAnimationFrame(tick);
// For the shared page add-ons (../phone.js, ../subtitles.js): the narrator and the full-map switch.
window.BattlePage = { Narr, setBig };
})();
