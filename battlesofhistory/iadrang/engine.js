/* Battle Games engine — reenactment & command. Battle-neutral: everything about the battle comes from
   window.BATTLE_SCENARIO (scenario.js): sides, unit types, terrain features, formations, events and AI.
   Plain 2D Canvas, no libraries. */
(() => {
'use strict';
const S = window.BATTLE_SCENARIO;
let PART = S.parts[0], partIdx = 0, W = PART.world, B = PART.battlefield;
const $ = id => document.getElementById(id);
const canvas = $('battle'), ctx = canvas.getContext('2d');
const mini = $('minimap'), mctx = mini.getContext('2d');
const panel = $('battlePanel');
const TS = 1.5;                 // terrain pre-render scale
const DT = 1 / 30;              // fixed simulation step (seconds)
const PI = Math.PI;
const UT = S.unitTypes, SIDES = S.sides, SIDE_IDS = S.sideOrder || Object.keys(SIDES);
const LS = k => S.id + '-' + k;   // localStorage key prefix

/* ---------------- state ---------------- */
const view = { x: 0, y: 0, w: 1000, h: 650, z: 1.25 };
const cam  = { tx: null, ty: null, follow: true };
let mode = 'intro';             // intro | watch | command
let paused = false, cinematic = false, speed = 1, simTime = 0, acc = 0, lastFrame = 0, wall = 0;
let formations = [], byId = {};
let eventIndex = 0, currentEvent = null, aiFlags = {}, battleOver = null, fastForward = false;
let selected = new Set();
let player = SIDE_IDS[0]; try { const sv = localStorage.getItem(LS('side')); if (SIDES[sv]) player = sv; } catch (e) {}
const setPlayer = sd => { player = sd; try { localStorage.setItem(LS('side'), sd); } catch (e) {} const sel = $('sideSel'); if (sel) sel.value = sd; };
let dragging = false, last = null, dragMoved = false, band = null, overview = null;
let introIdx = 0, introTimer = 0, introTail = 0, introPaused = false, introStarted = false, introMedia = [], mediaIdx = -1;
const G = window.BattleGlobe;
const INTRO_BREAK = 5, CHAPTER_BREAK = 2.5;
let markers = [];
let TER = null, MINIBASE = null, PAINTED = false, PAINTEDTER = null, DRAWNTER = null, artOn = true; try { artOn = localStorage.getItem(LS('art')) !== '0'; } catch (e) {}
let pending = [], strikes = [], effects = [], helis = [], light = { cur: 0, target: 0, name: 'day' }, clockLabel = '', support = {};
let PROPS = [];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const jitter = (i, k = 0) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const alive = f => f.present && f.state !== 'withdrawn' && f.state !== 'destroyed';
const esc = t => String(t || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const tagChip = (tag, cite) => { const c = S.confidence[tag] || S.confidence.reconstruction; return `<button class="chip" style="--c:${c.color}" title="${c.desc} Click for the sources." data-tag="${tag}" data-cite="${esc(cite)}">${c.label}</button>`; };
const other = sd => SIDE_IDS.find(s => s !== sd);
const sideText = sd => SIDES[sd].text;
let voiceId = (S.voices && S.voices[0]) ? S.voices[0].id : '';
try { const v = localStorage.getItem(LS('voice')); if (v && S.voices.some(x => x.id === v)) voiceId = v; } catch (e) {}
const audioFor = (kind, n) => S.audioBase ? S.audioBase + (voiceId ? voiceId + '/' : '') + kind + (n !== undefined ? '-' + n : '') + '.mp3' : undefined;
const evAudio = ev => ev.audio || audioFor('event', PART.id + '-' + (PART.events.indexOf(ev) + 1));

/* ---------------- terrain queries: features drive movement, cover and concealment ---------------- */
const feats = kind => B.features.filter(f => f.kind === kind);
const inEll = (x, y, e) => ((x - e.x) / e.rx) ** 2 + ((y - e.y) / e.ry) ** 2 <= 1;
const inPoly = (x, y, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const distToPolyline = (x, y, pts) => { let best = 1e9; for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], dx = x2 - x1, dy = y2 - y1, L = dx * dx + dy * dy || 1; let t = ((x - x1) * dx + (y - y1) * dy) / L; t = clamp(t, 0, 1); const d = Math.hypot(x - (x1 + dx * t), y - (y1 + dy * t)); if (d < best) best = d; } return best; };
function groundAt(x, y) {
  // The strongest feature wins: creek beds give cover, woods and grass slow and hide, the slope slows everyone.
  const g = { speed: 1, cover: 1, conceal: 0, name: '' };
  for (const f of B.features) {
    if (f.kind === 'creek') { if (distToPolyline(x, y, f.pts) < f.width) { g.cover = Math.min(g.cover, .6); g.speed *= .9; g.name = f.name || 'creek'; } }
    else if (f.kind === 'woods') { if (inEll(x, y, f)) { g.speed *= .72; g.cover = Math.min(g.cover, .85); g.conceal = Math.max(g.conceal, .5); g.name = 'woods'; } }
    else if (f.kind === 'grass') { if (inEll(x, y, f)) { g.speed *= .8; g.conceal = Math.max(g.conceal, .7); g.name = 'elephant grass'; } }
    else if (f.kind === 'slope') { if (inPoly(x, y, f.poly)) { g.speed *= .75; g.cover = Math.min(g.cover, .8); g.conceal = Math.max(g.conceal, .4); g.name = 'slope'; } }
    else if (f.kind === 'mound') { if (Math.hypot(x - f.x, y - f.y) < f.r + 18) { g.cover = Math.min(g.cover, .65); } }
    else if (f.kind === 'clearing') { if (inEll(x, y, f)) { g.name = f.name || 'clearing'; } }
  }
  return g;
}
const obstacles = () => feats('obstacle');
const inRect = (x, y, r) => x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
const segHitsRect = (a, b, r) => { for (let t = 0; t <= 1; t += .05) { if (inRect(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, r)) return true; } return false; };
function legal(p) { for (const r of obstacles()) if (inRect(p.x, p.y, r)) { const dl = p.x - r.x, dr = r.x + r.w - p.x, dt = p.y - r.y, db = r.y + r.h - p.y, m = Math.min(dl, dr, dt, db); return m === dl ? { x: r.x - 12, y: p.y } : m === dr ? { x: r.x + r.w + 12, y: p.y } : m === dt ? { x: p.x, y: r.y - 12 } : { x: p.x, y: r.y + r.h + 12 }; } return p; }
function planPath(a, b) {
  let legs = [a, b];
  for (const r of obstacles()) {
    const out = [legs[0]];
    for (let i = 1; i < legs.length; i++) { const p = out[out.length - 1], q = legs[i];
      if (!inRect(p.x, p.y, r) && !inRect(q.x, q.y, r) && segHitsRect(p, q, r)) {
        const pad = 26, cs = [{ x: r.x - pad, y: r.y - pad }, { x: r.x + r.w + pad, y: r.y - pad }, { x: r.x - pad, y: r.y + r.h + pad }, { x: r.x + r.w + pad, y: r.y + r.h + pad }];
        let best = null, bd = 1e9; cs.forEach(c => { if (segHitsRect(p, c, r) || segHitsRect(c, q, r)) return; const d = Math.hypot(p.x - c.x, p.y - c.y) + Math.hypot(c.x - q.x, c.y - q.y); if (d < bd) { bd = d; best = [c]; } });
        if (!best) { const pairs = [[0, 1], [2, 3], [0, 2], [1, 3]]; pairs.forEach(([i1, i2]) => { for (const [c1, c2] of [[cs[i1], cs[i2]], [cs[i2], cs[i1]]]) { if (segHitsRect(p, c1, r) || segHitsRect(c2, q, r)) continue; const d = Math.hypot(p.x - c1.x, p.y - c1.y) + Math.hypot(c1.x - c2.x, c1.y - c2.y) + Math.hypot(c2.x - q.x, c2.y - q.y); if (d < bd) { bd = d; best = [c1, c2]; } } }); }
        if (best) out.push(...best);
      }
      out.push(q); }
    legs = out;
  }
  return legs.slice(1);
}
const lzOf = () => feats('lz')[0] || { x: W.w / 2, y: W.h / 2, r: 150 };

/* ---------------- terrain (pre-rendered once per part) ---------------- */
function curve(c, pts) {
  c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) { const xc = (pts[i][0] + pts[i + 1][0]) / 2, yc = (pts[i][1] + pts[i + 1][1]) / 2; c.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc); }
  const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]);
}
function outlined(c, text, x, y, size, opts = {}) {
  c.save(); c.font = `${opts.weight || 'bold'} ${size}px ${opts.weight === 'italic' ? 'Georgia, serif' : "'Oswald', 'Arial Narrow', sans-serif"}`; c.textAlign = opts.align || 'center'; c.textBaseline = 'middle';
  if (opts.rotate) { c.translate(x, y); c.rotate(opts.rotate); x = 0; y = 0; }
  c.lineWidth = Math.max(2, size / 5); c.strokeStyle = opts.stroke || 'rgba(10,16,8,.85)'; c.lineJoin = 'round'; c.strokeText(text, x, y);
  c.fillStyle = opts.fill || '#f1ecd6'; c.fillText(text, x, y); c.restore();
}
function drawLabels(c) {
  feats('lz').forEach(l => { c.save(); c.strokeStyle = 'rgba(255,245,200,.6)'; c.lineWidth = 2; c.setLineDash([8, 8]); c.beginPath(); c.ellipse(l.x, l.y, l.r, l.r * .8, 0, 0, PI * 2); c.stroke(); c.restore(); outlined(c, l.name.toUpperCase(), l.x, l.y - l.r * .8 - 18, 20, { fill: '#fff3c9' }); });
  feats('mound').forEach(m => { if (m.name) outlined(c, m.name, m.x, m.y + 26, 11, { weight: 'italic', fill: '#efe3c3' }); });
  (B.labels || []).forEach(l => outlined(c, l.text, l.x, l.y, l.small ? 13 : 26, { rotate: l.rotate || 0, fill: l.small ? '#efe3c3' : '#dff3d6', weight: l.small ? 'italic' : 'bold' }));
}
function buildTerrain(noLabels) {
  const T = document.createElement('canvas'); T.width = W.w * TS; T.height = W.h * TS;
  const c = T.getContext('2d'); c.scale(TS, TS);
  // dry-season ground: tawny grass with olive patches
  c.fillStyle = '#a79a62'; c.fillRect(0, 0, W.w, W.h);
  const cols = ['#b3a66b', '#95945a', '#a89e66', '#8f9a58', '#bba972', '#7f8c4e'];
  for (let i = 0; i < 480; i++) {
    const x = jitter(i, 1) * W.w, y = jitter(i, 2) * W.h, r = 50 + jitter(i, 3) * 140;
    const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, cols[i % cols.length] + 'aa'); g.addColorStop(1, cols[i % cols.length] + '00');
    c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // the mountain slope: darker, with contour lines climbing away from the valley
  feats('slope').forEach(sl => {
    c.save(); c.beginPath(); sl.poly.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); c.clip();
    c.fillStyle = '#5f7a44'; c.fillRect(0, 0, W.w, W.h);
    for (let i = 0; i < 300; i++) { const x = jitter(i, 11) * W.w, y = jitter(i, 12) * W.h, r = 30 + jitter(i, 13) * 90; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, (i % 2 ? '#4e6a3a' : '#6d8a4c') + 'aa'); g.addColorStop(1, '#4e6a3a00'); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); }
    c.strokeStyle = 'rgba(40,55,30,.35)'; c.lineWidth = 1.5;
    for (let k = 0; k < 9; k++) { c.beginPath(); for (let y = -50; y <= W.h + 50; y += 40) { const x = 120 + k * 70 + Math.sin(y * .011 + k) * 40 + Math.sin(y * .031 + k * 2) * 15; y === -50 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
    c.restore();
    c.save(); c.beginPath(); sl.poly.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); c.strokeStyle = 'rgba(40,55,30,.5)'; c.lineWidth = 3; c.stroke(); c.restore();
  });
  // woods floor, elephant grass, clearings
  feats('woods').forEach(fo => { const g = c.createRadialGradient(fo.x, fo.y, 0, fo.x, fo.y, Math.max(fo.rx, fo.ry)); g.addColorStop(0, 'rgba(60,90,45,.45)'); g.addColorStop(.8, 'rgba(60,90,45,.25)'); g.addColorStop(1, 'rgba(60,90,45,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(fo.x, fo.y, fo.rx, fo.ry, 0, 0, PI * 2); c.fill(); });
  feats('grass').forEach(gr => { c.save(); c.beginPath(); c.ellipse(gr.x, gr.y, gr.rx, gr.ry, 0, 0, PI * 2); c.clip(); c.fillStyle = 'rgba(190,180,90,.45)'; c.fillRect(gr.x - gr.rx, gr.y - gr.ry, gr.rx * 2, gr.ry * 2);
    for (let i = 0; i < gr.rx * gr.ry / 60; i++) { const x = gr.x + (jitter(i, 21) * 2 - 1) * gr.rx, y = gr.y + (jitter(i, 22) * 2 - 1) * gr.ry; c.strokeStyle = i % 3 ? 'rgba(150,150,60,.8)' : 'rgba(110,120,50,.8)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y + 4); c.lineTo(x - 3, y - 9); c.moveTo(x, y + 4); c.lineTo(x + 2, y - 11); c.moveTo(x, y + 4); c.lineTo(x + 5, y - 7); c.stroke(); } c.restore(); });
  feats('clearing').forEach(cl => { const g = c.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, Math.max(cl.rx, cl.ry)); g.addColorStop(0, 'rgba(214,196,130,.9)'); g.addColorStop(.85, 'rgba(206,190,125,.7)'); g.addColorStop(1, 'rgba(206,190,125,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(cl.x, cl.y, cl.rx * 1.08, cl.ry * 1.08, 0, 0, PI * 2); c.fill(); });
  // grass tufts and stones everywhere
  for (let i = 0; i < 3200; i++) {
    const x = jitter(i, 4) * W.w, y = jitter(i, 5) * W.h;
    c.strokeStyle = i % 4 === 0 ? 'rgba(130,140,60,.7)' : 'rgba(95,105,45,.55)'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x - 2, y - 4); c.moveTo(x, y); c.lineTo(x + 2, y - 4); c.moveTo(x, y); c.lineTo(x, y - 5); c.stroke();
    if (i % 11 === 0) { c.fillStyle = 'rgba(80,70,50,.5)'; c.beginPath(); c.ellipse(x + 8, y + 3, 2.5, 1.6, 0, 0, PI * 2); c.fill(); }
  }
  // trails and creek beds
  feats('trail').forEach(t => { c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); curve(c, t.pts); c.strokeStyle = 'rgba(90,75,45,.4)'; c.lineWidth = 9; c.stroke(); c.beginPath(); curve(c, t.pts); c.strokeStyle = '#cdbb8a'; c.lineWidth = 5; c.stroke(); c.restore(); });
  feats('creek').forEach(cr => { c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath(); curve(c, cr.pts); c.strokeStyle = 'rgba(70,60,35,.45)'; c.lineWidth = cr.width * 2 + 10; c.stroke();
    c.beginPath(); curve(c, cr.pts); c.strokeStyle = '#8a7a52'; c.lineWidth = cr.width * 2 + 2; c.stroke();
    c.beginPath(); curve(c, cr.pts); c.strokeStyle = '#d8c89a'; c.lineWidth = cr.width * 1.6; c.stroke();
    c.beginPath(); curve(c, cr.pts); c.strokeStyle = '#c9b683'; c.lineWidth = cr.width * .7; c.stroke();
    for (let i = 0; i < cr.pts.length - 1; i++) { const [x1, y1] = cr.pts[i], [x2, y2] = cr.pts[i + 1], n = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 18); for (let k = 0; k < n; k++) { const t = k / n, x = x1 + (x2 - x1) * t + (jitter(i * 50 + k, 31) - .5) * cr.width * 1.4, y = y1 + (y2 - y1) * t + (jitter(i * 50 + k, 32) - .5) * cr.width * 1.4; c.fillStyle = k % 3 ? 'rgba(120,110,85,.8)' : 'rgba(180,170,140,.9)'; c.beginPath(); c.ellipse(x, y, 2.5 + jitter(k, 33) * 3, 1.5 + jitter(k, 34) * 2, 0, 0, PI * 2); c.fill(); } }
    c.restore(); });
  if (!noLabels) drawLabels(c);
  return T;
}

/* ---------------- standing scenery: trees and termite mounds, drawn in the projected pass so they have height ---------------- */
function buildProps() {
  PROPS = [];
  feats('woods').forEach((fo, fi) => { const n = Math.floor(fo.rx * fo.ry / 1400); for (let i = 0; i < n; i++) { const a = jitter(fi * 1000 + i, 6) * PI * 2, rr = Math.sqrt(jitter(fi * 1000 + i, 7)); const x = fo.x + Math.cos(a) * rr * fo.rx, y = fo.y + Math.sin(a) * rr * fo.ry; if (x < 10 || x > W.w - 10 || y < 10 || y > W.h - 10) continue; if (feats('clearing').some(cl => inEll(x, y, cl)) || feats('lz').some(l => Math.hypot(x - l.x, y - l.y) < l.r)) continue; PROPS.push({ kind: 'tree', x, y, r: 8 + jitter(i, 8) * 9, k: i, tall: jitter(i, 9) > .8 }); } });
  feats('slope').forEach((sl, si) => { for (let i = 0; i < 260; i++) { const x = jitter(si * 77 + i, 41) * W.w, y = jitter(si * 77 + i, 42) * W.h; if (!inPoly(x, y, sl.poly)) continue; PROPS.push({ kind: 'tree', x, y, r: 9 + jitter(i, 43) * 10, k: i, tall: jitter(i, 44) > .7 }); } });
  for (let i = 0; i < 70; i++) { const x = (i * 173 + 100) % W.w, y = (i * 119 + 70) % W.h; if (feats('clearing').some(cl => inEll(x, y, cl))) continue; PROPS.push({ kind: 'tree', x, y, r: 7 + jitter(i, 9) * 6, k: i }); }
  feats('mound').forEach(m => PROPS.push({ kind: 'mound', x: m.x, y: m.y, r: m.r }));
}
function drawProp(c, p) {
  const q = P(p.x, p.y), s = q.s, k = q.k;
  if (p.kind === 'tree') {
    const r = p.r * s, h = p.tall ? 2.6 : 1.5; c.fillStyle = 'rgba(30,35,15,.28)'; c.beginPath(); c.ellipse(q.x + r * .3, q.y, r * .9, r * .35 * k, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#5a4a2e'; c.fillRect(q.x - r * .1, q.y - r * h, r * .2, r * h);
    c.fillStyle = p.k % 3 === 0 ? '#3d6b34' : '#4a7a3c'; c.beginPath(); c.arc(q.x, q.y - r * (h + .5), r * .95, 0, PI * 2); c.fill();
    c.fillStyle = p.k % 2 ? '#6a9a4e' : '#5c8c44'; c.beginPath(); c.arc(q.x - r * .25, q.y - r * (h + .7), r * .6, 0, PI * 2); c.fill();
    c.fillStyle = '#8fbb62'; c.beginPath(); c.arc(q.x - r * .4, q.y - r * (h + .9), r * .25, 0, PI * 2); c.fill();
  } else if (p.kind === 'mound') {
    const r = p.r * s; c.fillStyle = 'rgba(40,25,10,.3)'; c.beginPath(); c.ellipse(q.x + r * .4, q.y, r * 1.2, r * .45 * k, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#8a5a3a'; c.beginPath(); c.moveTo(q.x - r, q.y); c.quadraticCurveTo(q.x - r * .5, q.y - r * 1.6, q.x, q.y - r * 2.1); c.quadraticCurveTo(q.x + r * .5, q.y - r * 1.5, q.x + r, q.y); c.closePath(); c.fill();
    c.fillStyle = '#b07a52'; c.beginPath(); c.moveTo(q.x - r * .7, q.y - r * .1); c.quadraticCurveTo(q.x - r * .4, q.y - r * 1.4, q.x - r * .05, q.y - r * 2); c.quadraticCurveTo(q.x - r * .2, q.y - r * 1.2, q.x - r * .2, q.y); c.closePath(); c.fill();
  }
}

/* ---------------- unit sprites (drawn facing +x, origin at the feet) ---------------- */
const SIDE_ART = {
  us:   { skin: '#c9955e', cloth: '#4f5f3f', cloth2: '#3e4b31', helmet: '#3d4a2c', helmet2: '#55653c', weapon: '#2b2b2b', pennant: SIDES.us.pennant, trim: SIDES.us.trim },
  pavn: { skin: '#c9955e', cloth: '#8f8455', cloth2: '#6f6840', helmet: '#7a8a52', helmet2: '#99a66a', weapon: '#3a2a1a', pennant: SIDES.pavn.pennant, trim: SIDES.pavn.trim }
};
const dirOf = facing => { const a = ((facing % (2 * PI)) + 2 * PI) % (2 * PI); return a < PI / 4 || a > 7 * PI / 4 ? 'e' : a < 3 * PI / 4 ? 's' : a < 5 * PI / 4 ? 'w' : 'n'; };
function figSoldier(c, side, type, s, i, dir, step, dug) {
  const A = SIDE_ART[side], recon = type === 'recon', skin = A.skin, cloth = recon ? '#2e2e2a' : A.cloth, cloth2 = recon ? '#222' : A.cloth2;
  const side_ = dir === 'e' || dir === 'w', back = dir === 'n', sw = Math.sin(step) * 1.6 * s;
  if (dug) { c.fillStyle = 'rgba(60,45,25,.7)'; c.beginPath(); c.ellipse(0, 0, 6.5 * s, 3 * s, 0, 0, PI * 2); c.fill(); c.fillStyle = '#9c8a5c'; c.beginPath(); c.ellipse(0, -1.5 * s, 7.5 * s, 2.2 * s, 0, 0, PI * 2); c.fill(); c.fillStyle = 'rgba(60,45,25,.7)'; c.beginPath(); c.ellipse(0, 0, 6 * s, 2.6 * s, 0, 0, PI * 2); c.fill(); }
  else { c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(0, .6 * s, 5 * s, 2 * s, 0, 0, PI * 2); c.fill(); }
  const legTop = dug ? -8 * s : -5 * s;
  if (!dug) {
    c.strokeStyle = cloth2; c.lineWidth = 1.9 * s; c.lineCap = 'round';
    if (side_) { c.beginPath(); c.moveTo(-.6 * s, -5 * s); c.lineTo(-.6 * s - sw, 0); c.moveTo(1 * s, -5 * s); c.lineTo(1 * s + sw, 0); c.stroke(); }
    else { c.beginPath(); c.moveTo(-1.6 * s, -5 * s); c.lineTo(-1.6 * s, Math.abs(sw) * .4); c.moveTo(1.6 * s, -5 * s); c.lineTo(1.6 * s, -Math.abs(sw) * .4); c.stroke(); }
    c.fillStyle = '#1e1a14'; if (side_) { c.fillRect(-1.8 * s - sw, -1 * s, 2.6 * s, 1.2 * s); c.fillRect(.2 * s + sw, -1 * s, 2.6 * s, 1.2 * s); } else { c.fillRect(-2.6 * s, -1 * s, 2 * s, 1.1 * s); c.fillRect(.6 * s, -1 * s, 2 * s, 1.1 * s); }
  }
  // torso and harness
  const bw = side_ ? 2.2 : 3.1, top = dug ? -12 * s : -13.4 * s, bot = dug ? -8 * s : -9.2 * s;
  c.fillStyle = cloth; c.fillRect(-bw * s, top, 2 * bw * s, (bot - top) + 4.4 * s);
  c.fillStyle = cloth2; c.fillRect(-bw * s, bot, 2 * bw * s, .9 * s);
  if (side === 'us' && !recon) { c.strokeStyle = '#2f3a22'; c.lineWidth = .8 * s; c.beginPath(); c.moveTo(-bw * s * .4, top); c.lineTo(-bw * s * .4, bot); c.moveTo(bw * s * .4, top); c.lineTo(bw * s * .4, bot); c.stroke(); }
  if (side === 'pavn' && !recon) { c.strokeStyle = '#5a5235'; c.lineWidth = .7 * s; c.beginPath(); c.moveTo(-bw * s, top + 2 * s); c.lineTo(bw * s, bot + .5 * s); c.stroke(); }
  // arms
  c.strokeStyle = cloth; c.lineWidth = 1.4 * s; c.beginPath(); if (side_) { c.moveTo(0, top + 1 * s); c.lineTo(3 * s, top + 3 * s); } else { c.moveTo(-bw * s, top + 1 * s); c.lineTo(-bw * s - 2 * s, top + 4 * s); c.moveTo(bw * s, top + 1 * s); c.lineTo(bw * s + 1.5 * s, top + 4.4 * s); } c.stroke();
  // head and helmet
  const hy = top - 2.2 * s;
  c.fillStyle = skin; c.beginPath(); c.arc(0, hy, 2.3 * s, 0, PI * 2); c.fill();
  if (recon) { c.fillStyle = '#1a1510'; c.beginPath(); c.arc(0, hy - .6 * s, 2.2 * s, PI, 0); c.fill(); }
  else if (side === 'us') { c.fillStyle = A.helmet; c.beginPath(); c.arc(0, hy - .6 * s, 2.8 * s, PI, 0); c.fill(); c.fillStyle = A.helmet2; c.beginPath(); c.arc(-.5 * s, hy - 1.2 * s, 1.6 * s, PI, 0); c.fill(); c.fillStyle = A.helmet; c.fillRect(-2.9 * s, hy - .8 * s, 5.8 * s, .9 * s); }
  else { c.fillStyle = A.helmet; c.beginPath(); c.ellipse(0, hy - 1 * s, 3.6 * s, 1.1 * s, 0, 0, PI * 2); c.fill(); c.fillStyle = A.helmet2; c.beginPath(); c.arc(0, hy - 1.2 * s, 2.5 * s, PI, 0); c.fill(); }
  // weapons
  const wep = A.weapon;
  if (type === 'weapons' || type === 'heavy') {
    if (!side_ && !back && (i % 2 === 0) && (dug || step === 0)) { // mortar: tube on a baseplate
      c.fillStyle = '#2a2a2a'; c.beginPath(); c.ellipse(4.5 * s, -1 * s, 3 * s, 1.2 * s, 0, 0, PI * 2); c.fill(); c.strokeStyle = '#3a3a3a'; c.lineWidth = 1.6 * s; c.beginPath(); c.moveTo(4.5 * s, -1 * s); c.lineTo(2.5 * s, -10 * s); c.stroke(); c.strokeStyle = '#555'; c.lineWidth = .7 * s; c.beginPath(); c.moveTo(4.5 * s, -1 * s); c.lineTo(6.5 * s, -6 * s); c.stroke();
    } else { c.strokeStyle = wep; c.lineWidth = 1.3 * s; c.beginPath(); if (side_) { c.moveTo(-3 * s, top + 2.5 * s); c.lineTo(8 * s, top + 1.5 * s); } else { c.moveTo(-4 * s, top + 3 * s); c.lineTo(5 * s, top + 1.5 * s); } c.stroke(); c.strokeStyle = '#555'; c.lineWidth = .6 * s; c.beginPath(); c.moveTo(6 * s, top + 1.7 * s); c.lineTo(5.3 * s, top + 4 * s); c.moveTo(6 * s, top + 1.7 * s); c.lineTo(7 * s, top + 4 * s); c.stroke(); }
  } else if (type === 'assault' && i % 3 === 1) { // RPG
    c.strokeStyle = '#3a3a2a'; c.lineWidth = 1.2 * s; c.beginPath(); if (side_) { c.moveTo(-3 * s, top + 1 * s); c.lineTo(7 * s, top - 1 * s); } else { c.moveTo(-3 * s, top + 2 * s); c.lineTo(4 * s, top - 2 * s); } c.stroke(); c.fillStyle = '#4a5a3a'; c.beginPath(); c.moveTo(side_ ? 7 * s : 4 * s, top - (side_ ? 1 : 2) * s); c.lineTo(side_ ? 9.5 * s : 6 * s, top - (side_ ? 2 : 3.5) * s); c.lineTo(side_ ? 7.5 * s : 4.8 * s, top + (side_ ? .3 : -.5) * s); c.closePath(); c.fill();
  } else { // rifle
    c.strokeStyle = wep; c.lineWidth = .95 * s; c.beginPath(); if (side_) { c.moveTo(-2.5 * s, top + 3 * s); c.lineTo(6.5 * s, top + 1.2 * s); } else { c.moveTo(-3.5 * s, top + 3.5 * s); c.lineTo(4.5 * s, top + 1 * s); } c.stroke();
    if (side === 'pavn') { c.fillStyle = '#6a4a2a'; c.fillRect((side_ ? 1.5 : .2) * s, top + 2.2 * s, 1.6 * s, 1.6 * s); }
  }
}
function figHeli(c, s, step, dir) {
  // UH-1: olive fuselage, tail boom, skids, a blurred rotor disc. Drawn in plan-ish three-quarter view.
  const side_ = dir === 'e' || dir === 'w';
  c.fillStyle = '#3f4a2f'; c.strokeStyle = '#1e2416'; c.lineWidth = .8 * s;
  if (side_) { c.beginPath(); c.ellipse(0, -8 * s, 11 * s, 4.5 * s, 0, 0, PI * 2); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-9 * s, -9 * s); c.lineTo(-24 * s, -11 * s); c.lineTo(-24 * s, -8.5 * s); c.lineTo(-9 * s, -6.5 * s); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#2a3320'; c.fillRect(-25 * s, -15 * s, 1.6 * s, 6 * s);
    c.fillStyle = '#9fc8e8'; c.beginPath(); c.ellipse(7 * s, -9 * s, 3.2 * s, 2.4 * s, 0, 0, PI * 2); c.fill(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo(-6 * s, -2.5 * s); c.lineTo(6 * s, -2.5 * s); c.moveTo(-3 * s, -4 * s); c.lineTo(-3 * s, -2.5 * s); c.moveTo(3 * s, -4 * s); c.lineTo(3 * s, -2.5 * s); c.stroke(); }
  else { c.beginPath(); c.ellipse(0, -8 * s, 5 * s, 10 * s, 0, 0, PI * 2); c.fill(); c.stroke(); if (dir === 'n') { c.beginPath(); c.moveTo(-1.2 * s, -16 * s); c.lineTo(-.8 * s, -30 * s); c.lineTo(.8 * s, -30 * s); c.lineTo(1.2 * s, -16 * s); c.closePath(); c.fill(); c.stroke(); } else { c.beginPath(); c.moveTo(-1.2 * s, -2 * s); c.lineTo(-.8 * s, 9 * s); c.lineTo(.8 * s, 9 * s); c.lineTo(1.2 * s, -2 * s); c.closePath(); c.fill(); c.stroke(); }
    c.fillStyle = '#9fc8e8'; c.beginPath(); c.ellipse(0, dir === 's' ? -2.5 * s : -14 * s, 3.2 * s, 2.2 * s, 0, 0, PI * 2); c.fill(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo(-5.5 * s, -14 * s); c.lineTo(-5.5 * s, -2 * s); c.moveTo(5.5 * s, -14 * s); c.lineTo(5.5 * s, -2 * s); c.stroke(); }
  // rotor
  c.save(); c.translate(0, -13 * s); c.fillStyle = 'rgba(40,40,40,.18)'; c.beginPath(); c.ellipse(0, 0, 20 * s, 20 * s * (side_ ? .55 : .7), 0, 0, PI * 2); c.fill();
  c.strokeStyle = 'rgba(30,30,30,.85)'; c.lineWidth = 1.2 * s; for (let k = 0; k < 2; k++) { const a = step * 1.7 + k * PI; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * 20 * s, Math.sin(a) * 20 * s * (side_ ? .55 : .7)); c.stroke(); } c.restore();
}
/* Painted sprite sheets (images/units/<sheet>.png): 4 rows s,e,n,w x 4 frames, feet at the bottom centre of each cell. */
const SHEETS = {};
Object.keys(UT).forEach(t => { const sh = UT[t].sheet; if (!sh || SHEETS[sh] !== undefined) return; SHEETS[sh] = null; const im = new Image(); im.onload = () => { SHEETS[sh] = im; }; im.src = (S.imageBase || 'images/') + 'units/' + sh + '.png'; });
function drawSprite(c, f, x, y, facing, i, s = 1, k = 1) {
  const ut = UT[f.type], sh = artOn && ut.sheet ? SHEETS[ut.sheet] : null;
  if (sh) {
    const spec = ut.spec, d = dirOf(facing), row = { s: 0, e: 1, n: 2, w: 3 }[d];
    const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', frame = moving ? Math.floor(wall * 6 + i) % 4 : (Math.floor(wall * 1.2 + i) % 2);
    const scale = spec.h * s / spec.ch, dw = spec.cw * scale, dh = spec.ch * scale;
    c.save(); c.translate(x, y); c.drawImage(sh, frame * spec.cw, row * spec.ch, spec.cw, spec.ch, -dw / 2, -dh + 2 * s, dw, dh);
    if (ut.kind === 'air') { // spinning rotor over the painted body
      const side_ = d === 'e' || d === 'w', rx = dw * .5, ry = dw * .5 * (side_ ? .5 : .62), hy = -dh * .62;
      c.fillStyle = 'rgba(30,30,30,.16)'; c.beginPath(); c.ellipse(0, hy, rx, ry, 0, 0, PI * 2); c.fill();
      c.strokeStyle = 'rgba(25,25,25,.8)'; c.lineWidth = Math.max(1, 1.1 * s); for (let k = 0; k < 2; k++) { const a2 = wall * 40 + i + k * PI; c.beginPath(); c.moveTo(0, hy); c.lineTo(Math.cos(a2) * rx, hy + Math.sin(a2) * ry); c.stroke(); }
    }
    c.restore(); return;
  }
  c.save(); c.translate(x, y);
  const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', d = dirOf(facing), step = moving ? wall * 8 + i * 1.7 : 0;
  if (d === 'w') c.scale(-1, 1);
  if (ut.kind === 'air') figHeli(c, s, wall * 40 + i, d === 'w' ? 'e' : d);
  else figSoldier(c, f.side, f.type, s, i, d === 'w' ? 'e' : d, step, f.state === 'dig' && f.dug);
  c.restore();
}

/* ---------------- formations ---------------- */
function createFormations() {
  formations = PART.formations.map(d => Object.assign({}, d, {
    tx: d.x, ty: d.y, strength: 100, strengthTarget: null, strengthRate: 0,
    state: 'hold', known: !d.hidden, present: !d.offmap, speed: d.speed || UT[d.type].speed,
    facing: d.facing !== undefined ? d.facing : (d.side === SIDE_IDS[0] ? PI : 0), spread: d.spread || 1.6, then: null, aiPhase: null, lastHit: -99, dug: false, digT: 0, lastFire: -99
  }));
  byId = {}; formations.forEach(f => byId[f.id] = f); window.__fm = formations;
}
function applyOrder(o) {
  if (o.delay) { pending.push({ due: simTime + o.delay, o: Object.assign({}, o, { delay: 0 }) }); return; }
  if (o.fire) { callFire(o.fire); return; }
  if (o.heli) { spawnHeli({ kind: o.heli, to: o.to }); return; }
  const f = byId[o.id]; if (!f) return;
  if (o.lift) { spawnHeli({ kind: 'lift', f, out: o.lift === 'out' }); if (o.then) f.then = o.then; return; }
  if (o.visible !== undefined) { f.known = o.visible; if (o.visible) f.present = true; }
  if (o.at) { f.x = o.at.x; f.y = o.at.y; f.path = null; }
  if (o.to) { f.tx = o.to.x; f.ty = o.to.y; f.state = o.state || 'move'; f.dug = false; } else if (o.state) { f.state = o.state; if (o.state !== 'dig') f.dug = false; }
  if (o.speed) f.speed = o.speed;
  if (o.strength !== undefined) { f.strength = o.strength; f.strengthTarget = null; }
  if (o.strengthTo !== undefined) { f.strengthTarget = o.strengthTo; f.strengthRate = Math.abs(f.strength - o.strengthTo) / (o.over || 5); }
  if (o.spread) f.spread = o.spread;
  if (o.then !== undefined) f.then = o.then || null;
}
function stepPending() { if (!pending.length) return; const keep = []; pending.forEach(p => { if (p.due <= simTime) applyOrder(p.o); else keep.push(p); }); pending = keep; }
function moveFormation(f) {
  if (!alive(f)) return;
  if (f.strengthTarget !== null) {
    const d = f.strengthTarget - f.strength, step = f.strengthRate * DT;
    if (Math.abs(d) <= step) { f.strength = f.strengthTarget; f.strengthTarget = null; } else f.strength += Math.sign(d) * step;
  }
  f.ground = groundAt(f.x, f.y);
  if (f.state === 'dig') { if (!f.dug) { f.digT += DT; if (f.digT >= 4) f.dug = true; } return; }
  f.digT = 0;
  if (f.state === 'hold' || f.state === 'scattered') return;
  if (!f.path || f.pathTx !== f.tx || f.pathTy !== f.ty) { const g = legal({ x: f.tx, y: f.ty }); f.tx = g.x; f.ty = g.y; f.path = planPath({ x: f.x, y: f.y }, g); f.pathTx = f.tx; f.pathTy = f.ty; }
  while (f.path.length > 1 && Math.hypot(f.path[0].x - f.x, f.path[0].y - f.y) < 6) f.path.shift();
  const wp = f.path[0] || { x: f.tx, y: f.ty };
  const dx = wp.x - f.x, dy = wp.y - f.y, d = Math.hypot(dx, dy), dEnd = Math.hypot(f.tx - f.x, f.ty - f.y);
  const gm = SIDES[f.side].jungle ? Math.max(f.ground.speed, .9) : f.ground.speed;   // the side that knows the ground is not slowed by it
  const sp = f.speed * (f.state === 'rout' ? 1.25 : 1) * gm * DT;
  if (dEnd > 2) { f.x += dx / d * Math.min(sp, d); f.y += dy / d * Math.min(sp, d); f.facing = Math.atan2(dy, dx); }
  else {
    if (f.then) { f.state = f.then; f.then = null; if (f.state === 'withdrawn') f.known = false; }
    else if (f.state === 'rout') f.state = mode === 'command' ? 'withdrawn' : 'scattered';
    else if (f.state === 'move') f.state = 'hold';
  }
}

/* ---------------- fire support: strikes that land after a delay on everyone inside the circle ---------------- */
function callFire(o) {
  if (o.kind === 'arclight' && o.along) { const [a, b] = o.along, n = o.n || 8; for (let i = 0; i < n; i++) { const t = i / (n - 1); strikes.push({ kind: 'arclight', x: a[0] + (b[0] - a[0]) * t + (jitter(i, 51) - .5) * 80, y: a[1] + (b[1] - a[1]) * t, r: o.r || 130, t0: simTime, delay: (o.delay || 0) + i * .35, dmg: o.dmg || 55, done: false }); } return; }
  const sp = (PART.support || {})[o.kind] || {};
  strikes.push({ kind: o.kind, x: o.at.x, y: o.at.y, r: o.r || sp.r || 70, t0: simTime, delay: o.delay !== undefined ? o.delay : (sp.delay || 4), dmg: o.dmg || sp.dmg || 30, done: false, by: o.by });
}
function stepStrikes() {
  const mul = mode === 'watch' ? .35 : 1;
  strikes.forEach(st => {
    if (st.done || simTime < st.t0 + st.delay) return; st.done = true; st.hitAt = simTime;
    effects.push({ kind: st.kind, x: st.x, y: st.y, r: st.r, t: simTime });
    formations.forEach(f => { if (!alive(f) || UT[f.type].kind === 'air') return; const d = dist(f, st); if (d > st.r + 10) return; let dmg = st.dmg * (1 - .5 * d / (st.r + 10)) * mul; if (f.dug) dmg *= .55; if (st.kind === 'napalm' && f.dug) dmg *= 1.3; f.strength -= dmg; f.lastHit = simTime; if (mode === 'command' && f.side === player && st.by === player) addLog('Friendly fire: ' + f.division + ' hit by our own ' + (st.kind === 'arty' ? 'artillery' : 'air strike')); });
    if (mode === 'command' && st.kind !== 'arclight') { formations.forEach(f => { if (f.side !== player && alive(f) && !f.known && dist(f, st) < st.r + 40) f.known = true; }); }
  });
  strikes = strikes.filter(st => !st.done || simTime - st.hitAt < 1);
  effects = effects.filter(e => simTime - e.t < (e.kind === 'napalm' ? 9 : 4));
}

/* ---------------- helicopters: lifts in and out, medevac and gunship runs ---------------- */
function spawnHeli(o) {
  const from = PART.heliFrom || { x: W.w + 60, y: W.h / 2 };
  let to = o.to; if (o.kind === 'lift') { const f = o.f; to = { x: f.x, y: f.y }; if (!o.out) { f.present = false; } }
  helis.push({ kind: o.kind, f: o.f || null, out: !!o.out, x: from.x, y: from.y, from, to, phase: 'in', t: 0, alt: 70, facing: Math.atan2(to.y - from.y, to.x - from.x), id: Math.random() });
}
function stepHelis() {
  const sp = UT.heli ? UT.heli.speed : 240;
  helis.forEach(h => {
    const tgt = h.phase === 'out' ? h.from : h.to, dx = tgt.x - h.x, dy = tgt.y - h.y, d = Math.hypot(dx, dy);
    if (h.phase === 'land') { h.t += DT; h.alt = Math.max(2, 70 * Math.max(0, 1 - h.t / 1.2)); if (h.t >= 2.2) { if (h.kind === 'lift' && h.f) { if (h.out) { h.f.state = 'withdrawn'; h.f.known = false; if (selected.has(h.f.id)) selected.delete(h.f.id); addLog(h.f.division + ' lifted out'); } else { h.f.present = true; h.f.known = true; h.f.state = h.f.then && h.f.then !== 'hold' ? h.f.then : 'hold'; h.f.then = null; h.f.lastHit = simTime; addLog(h.f.division + ' landed'); if (mode === 'command' && h.f.side === player) { cmdCaption('Lift landed', 'lift', 'reconstruction', { x: h.f.x, y: h.f.y }); renderSelection(); } } } h.phase = 'out'; h.facing = Math.atan2(h.from.y - h.y, h.from.x - h.x); } return; }
    const step = sp * DT;
    if (d <= step) { h.x = tgt.x; h.y = tgt.y; if (h.phase === 'in') { if (h.kind === 'gunship') { h.phase = 'out'; h.facing = Math.atan2(h.from.y - h.y, h.from.x - h.x); } else { h.phase = 'land'; h.t = 0; } } else h.phase = 'gone'; }
    else { h.x += dx / d * step; h.y += dy / d * step; h.facing = Math.atan2(dy, dx); if (h.phase === 'out') h.alt = Math.min(70, h.alt + 60 * DT); else if (d < 160) h.alt = Math.max(30, h.alt - 30 * DT); }
  });
  helis = helis.filter(h => h.phase !== 'gone');
}

/* ---------------- light: day, dusk, night, dawn ---------------- */
const LIGHTS = { day: 0, dusk: .38, night: .72, dawn: .4 };
function setLight(name) { if (!name || LIGHTS[name] === undefined) return; light.target = LIGHTS[name]; light.name = name; if (mode === 'command' && name === 'night') cmdCaption('Night', 'night', 'reconstruction'); }
function stepLight() { const d = light.target - light.cur; light.cur += Math.sign(d) * Math.min(Math.abs(d), DT / 4); }

/* ---------------- watch mode ---------------- */
function fireEvent(ev) {
  currentEvent = ev; ev.orders.forEach(applyOrder);
  if (ev.clock) clockLabel = ev.clock; if (ev.light) setLight(ev.light);
  if (cam.follow && ev.focus) focusOn(ev.focus.x, ev.focus.y);
  caption(ev.title, ev.text, ev.tag, !fastForward, evAudio(ev), ev.cite);
  addLog((ev.clock || fmtTime(ev.t)) + ' ' + ev.title);
  renderTimeline();
  if (ev.end && !fastForward) endWatch();
}
function stepSim() { stepPending(); formations.forEach(moveFormation); stepStrikes(); stepHelis(); stepLight(); }
function stepWatch() {
  while (eventIndex < PART.events.length && PART.events[eventIndex].t <= simTime) fireEvent(PART.events[eventIndex++]);
  stepSim();
  if (simTime >= PART.duration && !battleOver && !fastForward) endWatch();
}
function endWatch() { battleOver = 'history'; paused = true; showDebrief(); }
function jumpTo(t) {
  fastForward = true; resetSim();
  while (simTime < t) { simTime += DT; stepWatch(); }
  fastForward = false; paused = false; battleOver = null; hideOverlay('debrief'); light.cur = light.target;
  if (currentEvent) caption(currentEvent.title, currentEvent.text, currentEvent.tag, true, evAudio(currentEvent), currentEvent.cite);
  updatePauseBtn(); updateClock(); render();
  if (currentEvent && currentEvent.end) endWatch();
}

/* ---------------- command mode ---------------- */
const AI = () => PART.ai || {};
function stepCommand() {
  const A = AI(), enemy = other(player);
  if (!aiFlags.start) { aiFlags.start = true; const ev0 = PART.events[0]; if (ev0 && ev0.clock) clockLabel = ev0.clock; if (ev0 && ev0.light) setLight(ev0.light); }
  // the clock and the light follow the historical chapters in both modes
  PART.events.forEach((ev, i) => { if (!aiFlags['clk' + i] && simTime >= ev.t) { aiFlags['clk' + i] = true; if (ev.clock) clockLabel = ev.clock; if (ev.light) setLight(ev.light); } });
  if (A.pavn && enemy === 'pavn') aiPavn(A.pavn); else if (A.pavn && player === 'pavn') { /* the player's own hidden units are already placed */ }
  if (A.us && enemy === 'us') aiUs(A.us); else if (A.us && player === 'us') playerUsSchedule(A.us);
  if ((PART.support || {}).arclight && !aiFlags.arc && player === 'us' && simTime >= (PART.support.arclight.from || 0)) { aiFlags.arc = true; cmdCaption('Arc Light', 'arclight', 'reconstruction'); }
  stepSim(); combat(); fog(); checkEnd();
}
// The player's own lifts arrive on the historical schedule; the formations are theirs once on the ground.
function playerUsSchedule(U) {
  (U.lifts || []).forEach((l, i) => { if (aiFlags['lift' + i] || simTime < l.t) return; aiFlags['lift' + i] = true; const f = byId[l.id]; if (!f) return; if (l.walk) { f.present = true; f.known = true; f.x = l.walk.x; f.y = l.walk.y; f.tx = (U.perimeter[l.id] || f).x; f.ty = (U.perimeter[l.id] || f).y; f.state = 'move'; } else applyOrder({ id: l.id, lift: true }); });
  if (U.march && !aiFlags.march) { aiFlags.march = true; U.march.forEach(m => { const f = byId[m.id]; if (f && alive(f)) { f.tx = m.to.x; f.ty = m.to.y; f.state = 'move'; } }); }
}
// North Vietnamese AI: waves from the mountain, closing to the belt, withdrawing when spent.
function aiPavn(Pv) {
  const A = AI(), us = formations.filter(f => f.side === 'us' && alive(f) && f.state !== 'rout');
  (Pv.waves || []).forEach((w, i) => { if (aiFlags['wave' + i] || simTime < w.t) return; aiFlags['wave' + i] = true; let any = false;
    w.ids.forEach(id => { const f = byId[id]; if (!f || !alive(f)) return; f.aiPhase = 'wave'; f.aiTarget = w.target; f.present = true; any = true; f.state = 'attack'; retarget(f, us); });
    if (any && player === 'us') cmdCaption('Movement on the slope', 'wave', 'reconstruction'); });
  if (!aiFlags.hw) { aiFlags.hw = true; formations.forEach(f => { if (f.side === 'pavn' && UT[f.type].indirect) { f.present = true; f.state = 'hold'; } }); }
  formations.forEach(f => {
    if (f.side !== 'pavn' || !alive(f) || f.state === 'rout') return;
    if (f.aiPhase === 'wave') {
      if (f.strength < (Pv.withdrawAt || 35)) { f.aiPhase = 'withdraw'; f.tx = Pv.withdrawTo.x + (jitter(f.id.length, 61) - .5) * 160; f.ty = Pv.withdrawTo.y + (jitter(f.id.length, 62) - .5) * 160; f.state = 'move'; f.then = 'hold'; f.withdrawnAt = simTime; return; }
      if (simTime - (f.lastRetarget || -99) > 2) { f.lastRetarget = simTime; retarget(f, us); }
    } else if (f.aiPhase === 'withdraw' && f.state === 'hold' && simTime - f.withdrawnAt > (Pv.regroupAfter || 40) && f.strength > 20) { f.aiPhase = 'wave'; f.state = 'attack'; retarget(f, us); }
  });
}
function retarget(f, us) {
  const lz = lzOf(); let best = null, bd = 1e9;
  const anchor = f.aiTarget === 'lz' ? lz : f;
  us.forEach(e => { const d = dist(e, anchor); if (d < bd) { bd = d; best = e; } });
  if (best && (f.aiTarget !== 'lz' || bd < 700)) { f.tx = best.x; f.ty = best.y; f.state = 'attack'; }
  else { f.tx = lz.x; f.ty = lz.y; f.state = 'attack'; }
}
// American AI: lifts on schedule, a perimeter around the clearing, dug in, with artillery and air on anything it can see at a safe distance.
function aiUs(U) {
  const A = AI();
  (U.lifts || []).forEach((l, i) => { if (aiFlags['lift' + i] || simTime < l.t) return; aiFlags['lift' + i] = true; const f = byId[l.id]; if (!f) return; if (l.walk) { f.present = true; f.known = true; f.x = l.walk.x; f.y = l.walk.y; } else applyOrder({ id: l.id, lift: true }); const p = U.perimeter[l.id]; if (p) { f.tx = p.x; f.ty = p.y; f.then = null; f.aiPhase = 'toPerimeter'; } });
  if (U.march && !aiFlags.march) { aiFlags.march = true; U.march.forEach(m => { const f = byId[m.id]; if (f && alive(f)) { f.tx = m.to.x; f.ty = m.to.y; f.state = 'move'; f.then = 'dig'; f.aiPhase = 'toPerimeter'; } }); }
  const known = formations.filter(f => f.side === 'pavn' && alive(f) && f.known && f.state !== 'rout');
  formations.forEach(f => {
    if (f.side !== 'us' || !alive(f) || f.state === 'rout' || UT[f.type].kind === 'air') return;
    if (f.aiPhase === 'toPerimeter' && f.state === 'hold') { f.state = 'move'; }
    if (f.aiPhase === 'toPerimeter' && Math.hypot(f.tx - f.x, f.ty - f.y) < 8) { f.aiPhase = 'perimeter'; f.state = 'dig'; }
    if (f.aiPhase === 'perimeter') { let best = null, bd = 220; known.forEach(e => { const d = dist(e, f); if (d < bd) { bd = d; best = e; } }); if (best) f.facing = Math.atan2(best.y - f.y, best.x - f.x); if (f.state !== 'dig') f.state = 'dig'; }
    if (f.aiPhase === 'toPerimeter' && f.state === 'move') { const threat = known.some(e => dist(e, f) < 120); if (threat) { f.state = 'dig'; f.aiPhase = 'perimeter'; } }
  });
  // fire support on anything seen at a safe distance from our own men
  const us = formations.filter(f => f.side === 'us' && alive(f));
  const safe = known.filter(e => us.every(u => dist(u, e) > (A.beltRange || 70) + 25));
  const from = U.fireFrom || 0;
  if (simTime >= from && safe.length && simTime - (aiFlags.lastArty || -99) > (U.fireEvery || 9) && PART.support && PART.support.arty && simTime >= (PART.support.arty.from || 0)) { aiFlags.lastArty = simTime; const e = safe[Math.floor(jitter(Math.floor(simTime), 71) * safe.length)]; callFire({ kind: 'arty', at: { x: e.x, y: e.y }, by: 'us' }); }
  if (simTime >= from && safe.length && simTime - (aiFlags.lastAir || -99) > (U.airEvery || 24) && PART.support && PART.support.air && simTime >= (PART.support.air.from || 0)) { aiFlags.lastAir = simTime; const e = safe.reduce((a, b) => a.strength > b.strength ? a : b); callFire({ kind: 'air', at: { x: e.x, y: e.y }, by: 'us' }); }
}
function combat() {
  const A = AI(), live = formations.filter(f => alive(f) && f.state !== 'rout' && UT[f.type].kind !== 'air');
  live.forEach(a => live.forEach(d => {
    if (a.side === d.side) return;
    const ua = UT[a.type], ud = UT[d.type], dd = dist(a, d);
    if (dd > ua.range) return; if (ua.indirect && (dd < 50 || !(d.known || mode === 'watch'))) return;
    if (!d.known && mode === 'command' && d.side !== player && !ua.indirect) { if (dd > 60) return; }
    let dmg = (ua.dmg[d.type] || 4) * (a.power || 1) * (a.strength / 100) * DT;
    if (ua.belt && dd < (A.beltRange || 70)) dmg *= ua.belt;
    if (d.state === 'move' || d.state === 'attack') dmg *= 1.25;
    dmg *= (d.ground ? d.ground.cover : 1); if (d.dug) dmg *= .5;
    if (light.cur > .5 && !ua.indirect) dmg *= .85;
    d.strength -= dmg; d.lastHit = simTime; a.lastFire = simTime;
    if (a.state === 'hold' || a.state === 'dig') a.facing = Math.atan2(d.y - a.y, d.x - a.x);
  }));
  formations.forEach(f => {
    if (!alive(f)) return;
    if (f.strength <= 0) { f.strength = 0; f.state = 'destroyed'; addLog(f.name + ' destroyed'); if (selected.has(f.id)) selected.delete(f.id); }
    else if (f.strength < 18 && f.state !== 'rout' && !UT[f.type].stealth) { f.state = 'rout'; const r = PART.rally[f.side]; f.tx = r.x; f.ty = r.y; f.spread = 2.4; f.then = 'withdrawn'; f.dug = false; addLog(f.name + ' breaks'); if (f.side === player) { caption('A formation breaks', f.name + ' has broken and is falling back.', 'reconstruction', true, audioFor('cmd', 'breaks')); if (cam.follow) focusOn(f.x, f.y); } }
  });
}
function fog() {
  const A = AI(), mine = formations.filter(f => f.side === player && alive(f) && UT[f.type].kind !== 'air');
  const range = (light.cur > .5 ? (A.nightSpot || 140) : (A.spotRange || 260));
  formations.forEach(f => { if (f.side === player || f.known || !alive(f)) return; const r = range * (UT[f.type].stealth ? .5 : 1) * (1 - .4 * (f.ground ? f.ground.conceal : 0)); if (mine.some(e => dist(e, f) < r)) { f.known = true; addLog('Enemy spotted: ' + f.name); caption('Enemy sighted', f.name + ' has been spotted.', 'reconstruction', true, audioFor('cmd', 'sighted')); if (cam.follow) focusOn(f.x, f.y); } });
}
function sideStrength(sd) { const fs = formations.filter(f => f.side === sd && f.present && UT[f.type].kind !== 'air' && !f.ai); let tot = 0, cur = 0; fs.forEach(f => { tot += 100; cur += alive(f) && f.state !== 'rout' ? f.strength : 0; }); return tot ? cur / tot : 0; }
function checkEnd() {
  if (battleOver || simTime < 20) return;
  const lz = lzOf(), usAlive = formations.filter(f => f.side === 'us' && alive(f) && f.state !== 'rout' && UT[f.type].kind !== 'air');
  const lzHeld = usAlive.some(f => dist(f, lz) < lz.r * 1.6);
  const pavnInLz = formations.some(f => f.side === 'pavn' && f.ai && alive(f) && f.state !== 'rout' && dist(f, lz) < lz.r);
  if (pavnInLz && !lzHeld) { aiFlags.lzLost = (aiFlags.lzLost || 0) + DT; } else aiFlags.lzLost = 0;
  const usStr = sideStrength('us'), waves = formations.filter(f => f.side === 'pavn' && f.ai), wavesDone = waves.every(f => !alive(f) || f.state === 'rout');
  if (player === 'us') { if (aiFlags.lzLost > 12 || !usAlive.length) battleOver = 'defeat'; else if (wavesDone) battleOver = 'victory'; }
  else { if (aiFlags.lzLost > 12 || usStr < .3) battleOver = 'victory'; else if (wavesDone) battleOver = 'defeat'; }
  if (!battleOver && simTime >= PART.commandDuration) { if (player === 'us') battleOver = lzHeld && usStr > .35 ? 'victory' : 'defeat'; else battleOver = usStr < .5 ? 'victory' : 'stalemate'; }
  if (battleOver) { paused = true; updatePauseBtn(); showDebrief(); }
}

/* ---------------- rendering ---------------- */
function resize() {
  const r = panel.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(r.width * dpr)); canvas.height = Math.max(1, Math.floor(r.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); view.w = r.width; view.h = r.height; clampView(); render();
}
/* ---- tilted view: the map is seen from a camera leaning back, so the far (north) edge is smaller and the near (south) edge larger. ---- */
let TILT = .45;
const SQ = .88;
const tiltOn = () => TILT > 0;
const TR = () => tiltOn() ? (TILT / Math.log(1 + TILT)) / SQ : 1;
const VW = () => view.w / view.z, VH = () => view.h / view.z * TR();
const sAt = v => tiltOn() ? 1 / (1 + TILT * (1 - v)) : 1;
const ysAt = v => tiltOn() ? view.h * Math.log((1 + TILT) / (1 + TILT * (1 - v))) / Math.log(1 + TILT) : v * view.h;
const vAt = ys => tiltOn() ? 1 - ((1 + TILT) / Math.exp(ys / view.h * Math.log(1 + TILT)) - 1) / TILT : ys / view.h;
function P(x, y) { const vw = VW(), vh = VH(), v = (y - view.y) / vh, s = sAt(v); return { x: view.w / 2 + (x - view.x - vw / 2) / vw * view.w * s, y: ysAt(v), s: view.z * s, k: tiltOn() ? SQ : 1 }; }
function U(sx, sy) { const vw = VW(), vh = VH(), v = vAt(sy), s = sAt(v); return { x: view.x + vw / 2 + (sx - view.w / 2) / (view.w * s) * vw, y: view.y + v * vh }; }
function clampView() { view.x = clamp(view.x, 0, Math.max(0, W.w - VW())); view.y = clamp(view.y, 0, Math.max(0, W.h - VH())); }
function focusOn(x, y) { cam.tx = x; cam.ty = y; }
function updateCamera() {
  if (cam.tx === null) return;
  const gx = clamp(cam.tx - VW() / 2, 0, Math.max(0, W.w - VW())), gy = clamp(cam.ty - VH() / 2, 0, Math.max(0, W.h - VH()));
  view.x += (gx - view.x) * .08; view.y += (gy - view.y) * .08;
  if (Math.abs(gx - view.x) < .5 && Math.abs(gy - view.y) < .5) { view.x = gx; view.y = gy; cam.tx = null; }
}
function drawFormation(c, f) {
  if (!f.present || f.state === 'withdrawn' || f.state === 'destroyed') return;
  if (!f.known && mode === 'command' && f.side !== player) return;
  const concealed = !f.known && !(mode === 'command' && f.side === player);
  c.save(); if (concealed) c.globalAlpha = .5;
  const SS = 1.3, sx = 13 * 1.3, sy = 14 * 1.3, n = f.cols * f.rows;
  const FC = f.cols, FR = f.rows;
  const cos = Math.cos(f.facing), sin = Math.sin(f.facing), shown = Math.ceil(n * Math.max(.15, f.strength / 100));
  const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', scatter = f.state === 'rout' || f.state === 'scattered';
  const pts = [];
  for (let i = 0; i < n; i++) {
    if (i >= shown) continue;
    const col = i % FC, row = Math.floor(i / FC);
    let d = -(row - (FR - 1) / 2) * sy + (jitter(i, 1) - .5) * 7 * f.spread, a = (col - (FC - 1) / 2) * sx + (jitter(i, 2) - .5) * 7 * f.spread;
    if (moving) a += Math.sin(wall * 7 + i) * .9;
    pts.push({ x: f.x + cos * d - sin * a, y: f.y + sin * d + cos * a, i, fac: f.facing + (scatter ? (jitter(i, 3) - .5) * 1.4 : (jitter(i, 4) - .5) * .5) });
  }
  pts.sort((p, q) => p.y - q.y).forEach(p => { const q = P(p.x, p.y); drawSprite(c, f, q.x, q.y, p.fac, p.i, SS * q.s, q.k); });
  // muzzle flashes when firing
  if (simTime - f.lastFire < .15 && !concealed) { pts.forEach(p => { if (jitter(p.i + Math.floor(wall * 10), 5) > .75) { const q = P(p.x, p.y); c.fillStyle = 'rgba(255,230,120,.9)'; c.beginPath(); c.arc(q.x + Math.cos(p.fac) * 9 * q.s, q.y - 11 * q.s, 2.2 * q.s, 0, PI * 2); c.fill(); } }); }
  // guidon
  const pb = P(f.x - cos * ((FR / 2) * sy + 4), f.y - sin * ((FR / 2) * sy + 4)), fs = pb.s;
  c.strokeStyle = '#3b2c1a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(pb.x, pb.y); c.lineTo(pb.x, pb.y - 16 * fs); c.stroke();
  c.fillStyle = SIDE_ART[f.side].pennant; c.beginPath(); c.moveTo(pb.x, pb.y - 16 * fs); c.lineTo(pb.x + 11 * fs, pb.y - 13 * fs); c.lineTo(pb.x, pb.y - 9 * fs); c.closePath(); c.fill();
  c.strokeStyle = SIDE_ART[f.side].trim; c.lineWidth = .8; c.stroke();
  // label + strength
  const half = (FR / 2) * sy + 10, ly = f.y + Math.max(half, (FC / 2) * sx * Math.abs(sin) + 8) + 6, pl = P(f.x, ly), ts = Math.max(.8, Math.min(1.5, pl.s / 1.25));
  const suffix = f.state === 'rout' ? ' · broken' : f.state === 'scattered' ? ' · scattered' : f.state === 'dig' ? (f.dug ? ' · dug in' : ' · digging') : concealed ? ' · concealed' : '';
  outlined(c, f.division + suffix, pl.x, pl.y, 11 * ts, { fill: SIDES[f.side].light });
  if (f.strength < 100 || selected.has(f.id) || simTime - f.lastHit < 1) {
    c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(pl.x - 22 * ts, pl.y + 8 * ts, 44 * ts, 5 * ts);
    c.fillStyle = f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'; c.fillRect(pl.x - 21 * ts, pl.y + 9 * ts, 42 * ts * f.strength / 100, 3 * ts);
  }
  const pc = P(f.x, f.y);
  if (selected.has(f.id)) { c.save(); c.translate(pc.x, pc.y); c.scale(1, pc.k); c.rotate(f.facing + PI / 2); c.strokeStyle = '#fff2a4'; c.lineWidth = 2; c.setLineDash([6, 4]); c.beginPath(); c.ellipse(0, 0, ((FC / 2) * sx + 14) * pc.s, ((FR / 2) * sy + 14) * pc.s, 0, 0, PI * 2); c.stroke(); c.restore(); }
  if (mode === 'command' && selected.has(f.id) && (f.state === 'move' || f.state === 'attack')) { const pt = P(f.tx, f.ty); c.strokeStyle = 'rgba(255,242,164,.6)'; c.lineWidth = 1.5; c.setLineDash([4, 6]); c.beginPath(); c.moveTo(pc.x, pc.y); c.lineTo(pt.x, pt.y); c.stroke(); c.setLineDash([]); c.beginPath(); c.arc(pt.x, pt.y, 6 * pt.s, 0, PI * 2); c.stroke(); }
  c.restore();
}
function drawHeli(c, h) {
  const g = P(h.x, h.y), q = P(h.x, h.y - h.alt), s = g.s * 1.6;
  c.save(); c.globalAlpha = .25; c.fillStyle = '#000'; c.beginPath(); c.ellipse(g.x + 6 * s, g.y, 14 * s, 5 * s * g.k, 0, 0, PI * 2); c.fill(); c.restore();
  drawSprite(c, { type: 'heli', side: 'us', state: 'move' }, q.x, q.y, h.facing, 0, s, q.k);
}
function drawStrikes(c) {
  strikes.forEach(st => { if (st.done) return; const p = P(st.x, st.y), k = (simTime - st.t0) / st.delay; c.save(); c.translate(p.x, p.y); c.scale(1, p.k); c.strokeStyle = st.kind === 'arty' ? 'rgba(255,200,90,.8)' : 'rgba(255,120,90,.8)'; c.lineWidth = 1.5; c.setLineDash([5, 5]); c.beginPath(); c.arc(0, 0, st.r * p.s, 0, PI * 2); c.stroke(); c.setLineDash([]); c.globalAlpha = .6; c.beginPath(); c.arc(0, 0, st.r * p.s * Math.min(1, k), 0, PI * 2); c.stroke(); c.restore(); });
  effects.forEach(e => {
    const p = P(e.x, e.y), a = simTime - e.t, r = e.r * p.s;
    c.save(); c.translate(p.x, p.y);
    if (e.kind === 'napalm') { const k = Math.min(1, a / 1.2); c.scale(1, p.k); c.fillStyle = `rgba(40,25,15,${.5 * k})`; c.beginPath(); c.ellipse(0, 0, r, r * .8, 0, 0, PI * 2); c.fill();
      if (a < 5) { for (let i = 0; i < 14; i++) { const ang = i / 14 * PI * 2 + a, rr = r * (.2 + .7 * jitter(i, 91)), fx = Math.cos(ang) * rr, fy = Math.sin(ang) * rr * .8, fh = (18 + jitter(i, 92) * 30) * p.s * Math.max(0, 1 - a / 5); const g = c.createRadialGradient(fx, fy - fh * .5, 0, fx, fy - fh * .5, fh); g.addColorStop(0, 'rgba(255,240,150,.95)'); g.addColorStop(.4, 'rgba(255,120,30,.8)'); g.addColorStop(1, 'rgba(60,20,10,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(fx, fy - fh * .5, fh * .6, fh, 0, 0, PI * 2); c.fill(); } }
      for (let i = 0; i < 8; i++) { const ang = i / 8 * PI * 2, rr = r * .6 * jitter(i, 93), sx = Math.cos(ang) * rr, sy = Math.sin(ang) * rr * .8 - a * 12 * p.s; c.fillStyle = `rgba(30,25,20,${Math.max(0, .5 - a / 9)})`; c.beginPath(); c.arc(sx, sy, (10 + a * 6) * p.s, 0, PI * 2); c.fill(); } }
    else { c.scale(1, p.k); if (a < .5) { const g = c.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, `rgba(255,250,200,${1 - a * 2})`); g.addColorStop(.5, `rgba(255,170,60,${.8 - a * 1.6})`); g.addColorStop(1, 'rgba(255,100,30,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, r, 0, PI * 2); c.fill(); }
      c.fillStyle = `rgba(60,45,30,${Math.max(0, .45 - a / 6)})`; c.beginPath(); c.arc(0, 0, r * .55, 0, PI * 2); c.fill();
      const n = e.kind === 'arclight' ? 10 : 6; for (let i = 0; i < n; i++) { const ang = jitter(i, 94) * PI * 2, rr = r * .7 * jitter(i, 95), sx = Math.cos(ang) * rr, sy = Math.sin(ang) * rr - a * 18 * p.s; c.fillStyle = `rgba(90,80,70,${Math.max(0, .55 - a / 4)})`; c.beginPath(); c.arc(sx, sy, (8 + a * 9) * p.s, 0, PI * 2); c.fill(); } }
    c.restore();
  });
}
function drawNight(c) {
  if (light.cur <= .01) return;
  const a = light.cur; c.save(); c.fillStyle = `rgba(8,14,42,${a * .6})`; c.fillRect(0, 0, view.w, view.h);
  if (a > .45) { // flares drifting over the clearing
    const lz = lzOf(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 2; i++) { const t = wall * .25 + i * 3.1, fx = lz.x + Math.sin(t) * lz.r * .8, fy = lz.y - 160 + Math.cos(t * .7) * 60, p = P(fx, fy), r = 260 * p.s; const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, r); g.addColorStop(0, `rgba(255,240,190,${.35 * (a - .45) / .55})`); g.addColorStop(1, 'rgba(255,240,190,0)'); c.fillStyle = g; c.fillRect(p.x - r, p.y - r, r * 2, r * 2); c.fillStyle = `rgba(255,255,230,.9)`; c.beginPath(); c.arc(p.x, p.y, 2.5, 0, PI * 2); c.fill(); }
  }
  c.restore();
}
function render() {
  updateCamera(); clampView();
  const z = view.z, vw = VW(), vh = VH();
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, view.w, view.h);   // beyond the map edge: black
  if (TER) {
    if (tiltOn()) {
      const STRIP = 3;
      for (let y0 = 0; y0 < view.h; y0 += STRIP) {
        const y1 = Math.min(view.h, y0 + STRIP), v0 = vAt(y0), v1 = vAt(y1 + 1), sm = sAt((v0 + v1) / 2);
        const wy0 = view.y + v0 * vh, wy1 = view.y + v1 * vh, ww = vw / sm, wxl = view.x + vw / 2 - ww / 2;
        ctx.drawImage(TER, wxl * TS, wy0 * TS, ww * TS, Math.max(1, (wy1 - wy0) * TS), 0, y0, view.w, y1 - y0 + 1);
      }
    } else ctx.drawImage(TER, view.x * TS, view.y * TS, vw * TS, vh * TS, 0, 0, view.w, view.h);
  }
  const scene = [];
  const y0v = view.y - 120, y1v = view.y + vh + 60, x0v = view.x - 200, x1v = view.x + vw + 200;
  PROPS.forEach(p => { if (PAINTED && artOn && p.kind === 'tree') return; if (p.y > y0v && p.y < y1v && p.x > x0v && p.x < x1v) scene.push({ y: p.y, prop: p }); });
  formations.forEach(f => scene.push({ y: f.y, f }));
  helis.forEach(h => scene.push({ y: h.y + 400, h }));
  scene.sort((a, b) => a.y - b.y).forEach(o => o.prop ? drawProp(ctx, o.prop) : o.h ? drawHeli(ctx, o.h) : drawFormation(ctx, o.f));
  drawStrikes(ctx);
  markers.forEach(m => {
    const p = P(m.x, m.y), r = (26 + 8 * Math.sin(wall * 3)) * p.s;
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(1, p.k);
    ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r, 0, PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,211,107,.4)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r + 8, 0, PI * 2); ctx.stroke(); ctx.restore();
    outlined(ctx, m.label, p.x, p.y - r * p.k - 16, 14, { fill: '#fff3c9' });
  });
  drawNight(ctx);
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
  const sb = B.scale.px * z; ctx.fillStyle = 'rgba(9,23,32,.8)'; const sy0 = mode === 'watch' ? view.h - 42 : view.h - 12; ctx.save(); ctx.globalAlpha = .55;
  ctx.fillRect(300, sy0 - 20, sb + 16, 20);
  ctx.fillStyle = '#e9c77a'; ctx.fillRect(308, sy0 - 7, sb, 3); ctx.font = '10px system-ui'; ctx.fillStyle = '#e8f0ea'; ctx.textAlign = 'left'; ctx.fillText(B.scale.label, 308, sy0 - 10); ctx.restore();
  drawMini();
}
function buildMiniBase() {
  MINIBASE = document.createElement('canvas'); MINIBASE.width = mini.width; MINIBASE.height = mini.height;
  const g = MINIBASE.getContext('2d'); g.drawImage(TER, 0, 0, mini.width, mini.height);
  const sx = mini.width / W.w, sy = mini.height / W.h; g.fillStyle = '#3f6b34'; PROPS.forEach(p => { if (p.kind === 'tree') g.fillRect(p.x * sx - 1, p.y * sy - 1, 2, 2); });
}
function drawMini() {
  const w = mini.width, h = mini.height, sx = w / W.w, sy = h / W.h;
  mctx.drawImage(MINIBASE, 0, 0);
  if (light.cur > .01) { mctx.fillStyle = `rgba(8,14,42,${light.cur * .5})`; mctx.fillRect(0, 0, w, h); }
  formations.forEach(f => { if (!f.present || !alive(f)) return; if (!f.known && mode === 'command' && f.side !== player) return; mctx.globalAlpha = (f.known || (mode === 'command' && f.side === player)) ? 1 : .45; mctx.fillStyle = SIDE_ART[f.side].pennant; mctx.strokeStyle = '#fff'; mctx.lineWidth = .8; mctx.beginPath(); mctx.arc(f.x * sx, f.y * sy, 3, 0, PI * 2); mctx.fill(); mctx.stroke(); });
  helis.forEach(hh => { mctx.fillStyle = '#e8f0ea'; mctx.beginPath(); mctx.arc(hh.x * sx, hh.y * sy, 2, 0, PI * 2); mctx.fill(); });
  mctx.globalAlpha = 1; mctx.strokeStyle = '#ff3030'; mctx.lineWidth = 2.5; const q = [U(0, 0), U(view.w, 0), U(view.w, view.h), U(0, view.h)];
  mctx.beginPath(); q.forEach((p, i) => i ? mctx.lineTo(p.x * sx, p.y * sy) : mctx.moveTo(p.x * sx, p.y * sy)); mctx.closePath(); mctx.stroke();
}

/* ---------------- narration (voice) ---------------- */
const Narr = {
  on: false, audio: null, rate: 1.1, endedAt: -99,
  speak(text, file) {
    this.stop(); if (!this.on) return;
    if (file) { const a = new Audio(file); a.playbackRate = this.rate; a.onended = () => { this.endedAt = wall; }; this.audio = a; a.play().then(() => this.status('')).catch(() => { if (this.audio === a) { this.audio = null; this.tts(text); } }); return; }
    this.tts(text);
  },
  status(msg) { const el = $('voiceStatus'); if (el) el.textContent = msg; },
  tts(text) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text); u.rate = .92 * this.rate; u.pitch = .85;
    const vs = speechSynthesis.getVoices(), pref = vs.find(v => /en.(US)/i.test(v.lang) && /male|david|mark|alex/i.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || vs[0];
    if (pref) u.voice = pref; speechSynthesis.speak(u);
    if (!vs.length) this.status('No recorded clip for this line and this browser has no voices installed.');
  },
  stop() { if (this.audio) { this.audio.pause(); this.audio = null; } if ('speechSynthesis' in window) speechSynthesis.cancel(); },
  pause(p) { if ('speechSynthesis' in window) { p ? speechSynthesis.pause() : speechSynthesis.resume(); } if (this.audio) { p ? this.audio.pause() : this.audio.play(); } },
  set(on, quiet) { this.on = on; $('voiceBtn').textContent = on ? '🔊 Voice on' : '🔇 Voice off'; $('voiceBtn').classList.toggle('active', on); $('voiceMenuBtn').textContent = on ? '🔊 Voice' : '🔇 Voice'; $('voiceMenuBtn').classList.toggle('active', on); if (!on) { this.stop(); this.status(''); } else if (quiet) { } else if (mode === 'intro') speakSlide(S.intro[introIdx]); else if (currentEvent) this.speak(currentEvent.text, evAudio(currentEvent)); },
  toggle() { this.set(!this.on); }
};
function speakSlide(sl) { Narr.speak(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' '), sl.audio || audioFor('intro', S.intro.indexOf(sl) + 1)); }

/* ---------------- UI: captions, log, panels ---------------- */
function caption(title, text, tag, speak, audio, cite) {
  $('capTitle').textContent = title; $('capText').textContent = text; $('capTag').innerHTML = tagChip(tag, cite);
  $('caption').classList.add('show');
  if (speak) Narr.speak(text, audio);
}
function cmdCaption(title, key, tag, focus) {
  const text = (PART.commandLines && PART.commandLines[key]) || S.commandLines[key] || ''; if (!text) return;
  caption(title, text, tag, true, audioFor('cmd', PART.commandLines && PART.commandLines[key] ? PART.id + '-' + key : key));
  if (focus && cam.follow) focusOn(focus.x, focus.y);
}
function openCitations(tag, cite, claim) {
  const c = S.citations[tag]; if (!c) return;
  $('citeKicker').textContent = 'Where this comes from'; $('citeTitle').innerHTML = tagChip(tag) + ' ' + c.title;
  $('citeBody').innerHTML = (claim ? `<p class="claim">“${esc(claim)}”</p>` : '') + (cite ? `<p class="lead">Specific record: ${esc(cite)}</p>` : '') + `<p>${c.intro}</p><ul class="refs">` + c.items.map(i => `<li><b>${i.ref}</b><br><span class="muted">${i.note}</span></li>`).join('') + '</ul>';
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
function updateClock() { $('clock').textContent = (clockLabel ? clockLabel + ' · ' : '') + fmtTime(simTime); const now = $('tlNow'); if (now) now.style.left = (simTime / PART.duration * 100) + '%'; }
function renderSelection() {
  const box = $('selection');
  if (!selected.size) { box.innerHTML = '<p class="muted">Click a formation on the map to see who they are.</p>'; return; }
  box.innerHTML = [...selected].map(id => { const f = byId[id]; return `<div class="sel"><b style="color:${sideText(f.side)}">${f.name}</b><div class="tiny">${UT[f.type].name} · ${f.count} ${tagChip(f.confidence)}</div><div class="bar"><i style="width:${f.strength}%;background:${f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'}"></i></div><div class="tiny">State: ${f.state}${f.dug ? ' (dug in)' : ''}${f.ground && f.ground.name ? ' · ' + f.ground.name : ''}</div><p class="note">${f.note}</p></div>`; }).join('');
}
function renderTimeline() {
  const tl = $('timeline'); if (!tl) return;
  tl.innerHTML = PART.events.map(e => `<button class="tick${currentEvent === e ? ' on' : ''}" style="left:${e.t / PART.duration * 100}%" data-t="${e.t}" title="${e.clock || fmtTime(e.t)} ${e.title}"></button>`).join('') + `<i id="tlNow" style="left:${simTime / PART.duration * 100}%"></i>`;
  tl.querySelectorAll('.tick').forEach(b => b.onclick = ev => { ev.stopPropagation(); jumpTo(+b.dataset.t); });
  tl.onclick = ev => { const r = tl.getBoundingClientRect(); jumpTo(clamp((ev.clientX - r.left) / r.width, 0, 1) * PART.duration); };
  $('eventList').innerHTML = `<div class="tiny muted" style="margin-bottom:4px">${PART.title} · ${PART.subtitle}</div>` + PART.events.map(e => `<button class="ev${currentEvent === e ? ' on' : ''}" data-t="${e.t}"><span>${e.clock ? e.clock.replace(/^Day /, 'D') : fmtTime(e.t)}</span> ${e.title}</button>`).join('');
  $('eventList').querySelectorAll('.ev').forEach(b => b.onclick = () => jumpTo(+b.dataset.t));
}
const PN = u => u.portrait || (SIDES[u.side].portrait + '-' + u.type);
function unitSprite(c, u, big) {
  const w = c.canvas.width, h = c.canvas.height; c.fillStyle = '#b9ad72'; c.fillRect(0, 0, w, h);
  if (u.nosprite) { c.strokeStyle = '#e9c77a'; c.lineWidth = 2; c.setLineDash([4, 4]); c.beginPath(); c.arc(w / 2, h / 2, h * .32, 0, PI * 2); c.stroke(); c.setLineDash([]); c.fillStyle = 'rgba(255,170,60,.7)'; c.beginPath(); c.arc(w / 2, h / 2, h * .14, 0, PI * 2); c.fill(); return; }
  drawSprite(c, { side: u.side, type: u.type, state: 'hold' }, w / 2, h - 6, 0, 1, (UT[u.type].kind === 'air' ? 1.4 : 2) * (big ? h / 60 : 1));
}
function renderArmies() {
  const units = S.units || [];
  $('armies').innerHTML = units.map((u, i) => `<div class="ucard" data-unit="${i}" title="Click for the full write-up and photographs"><div class="pwrap"><canvas id="uc${i}" width="84" height="60"></canvas><img class="portrait" alt="" src="${(S.imageBase || 'images/')}portraits/${PN(u)}.jpg" onload="this.classList.add('show')"></div><div><b style="color:${sideText(u.side)}">${u.name}</b><div class="tiny">${u.desc}</div>${tagChip(u.tag)}<div class="more">More ▸</div></div></div>`).join('');
  units.forEach((u, i) => { const c = $('uc' + i).getContext('2d'); unitSprite(c, u); setTimeout(() => unitSprite(c, u), 1500); });
  $('armies').querySelectorAll('.ucard').forEach(el => el.onclick = e => { if (e.target.closest('button.chip')) return; openUnit(+el.dataset.unit); });
}
let unitIdx = -1, unitPhoto = 0;
function mediaByFile(f) { for (const sl of S.intro) for (const m of (sl.media || [])) if (m.file === f) return m; return null; }
function unitPhotos(u) { return (u.photos || []).map(p => typeof p === 'string' ? (mediaByFile(p) || { file: p }) : p); }
function openUnit(i) {
  const units = S.units || []; if (!units.length) return;
  unitIdx = (i + units.length) % units.length; const u = units[unitIdx]; unitPhoto = 0;
  $('unitKicker').textContent = SIDES[u.side].army + ' · ' + (unitIdx + 1) + ' / ' + units.length;
  $('unitTitle').innerHTML = `<span style="color:${sideText(u.side)}">${u.name}</span> ${tagChip(u.tag)}`;
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
  img.src = (S.imageBase || 'images/') + m.file; setPulse($('unitPulse'), m);
}
function renderBriefing() {
  $('briefMeta').innerHTML = `<b>${S.date}</b> · ${S.place}<br>${S.tagline}`;
  $('confKey').innerHTML = Object.keys(S.confidence).map(k => `<div class="keyrow">${tagChip(k)}<span>${S.confidence[k].desc}</span></div>`).join('');
  $('sources').innerHTML = S.sources.map(s => `<li><b>${s.title}</b> — ${s.note}</li>`).join('');
  const ps = $('partSel'), pm = $('pmPart'); if (ps) ps.innerHTML = S.parts.map((p, i) => `<option value="${i}">${p.title} · ${p.subtitle}</option>`).join(''); if (pm) pm.innerHTML = S.parts.map((p, i) => `<label><input type="radio" name="pmPart" value="${i}"${i === partIdx ? ' checked' : ''}> ${p.title} <span class="tiny">${p.subtitle}</span></label>`).join('');
  const ss = $('sideSel'); if (ss) ss.innerHTML = SIDE_IDS.map(sd => `<option value="${sd}">${SIDES[sd].name}</option>`).join('');
}

/* ---------------- overlays: intro, debrief, explain ---------------- */
function showOverlay(id) { $(id).classList.add('show'); }
let unitPausedIntro = false;
function hideOverlay(id) { $(id).classList.remove('show'); if (id === 'unit') { document.body.classList.remove('unitopen'); if (unitPausedIntro) { unitPausedIntro = false; if (mode === 'intro' && introPaused) togglePause(); } } }
function showIntro(i) {
  introIdx = clamp(i, 0, S.intro.length - 1); const sl = S.intro[introIdx]; introTimer = 0; introTail = 0; $('introNext').textContent = 'Next ▶'; $('introNext').classList.remove('ready');
  $('introKicker').textContent = `Historical introduction · ${introIdx + 1} / ${S.intro.length}`;
  $('introTitle').textContent = sl.title; $('introSub').textContent = sl.subtitle || '';
  $('introLines').innerHTML = sl.lines.map(l => `<p>${l.text} ${tagChip(l.tag, l.cite)}</p>`).join('');
  $('introNav').style.display = sl.choice ? 'none' : 'flex'; $('ctrlStrip').classList.toggle('lit', false); $('introChoice').style.display = 'none'; $('playGame').classList.toggle('show', !!sl.choice); $('playMenu').classList.remove('show'); document.body.classList.toggle('choice', !!sl.choice);
  $('introBack').disabled = introIdx === 0; $('introBar').style.width = '0%';
  markers = sl.markers || [];
  if (sl.zoom) { view.z = clamp(sl.zoom, .45, 2.4); clampView(); }
  if (sl.focus) focusOn(sl.focus.x, sl.focus.y + VH() * .27);
  $('startGate').style.display = introStarted ? 'none' : 'flex'; if (!introStarted) $('introNav').style.display = 'none';
  introMedia = sl.media || []; mediaIdx = -1; $('mediaCard').classList.toggle('nomedia', !introMedia.length); placeMedia(); showMedia(0);
  if (introStarted) speakSlide(sl);
}
$('introBar').parentElement.style.cursor = 'pointer';
$('introBar').parentElement.title = 'Click to replay from here';
$('introBar').parentElement.addEventListener('click', e => {
  const r = e.currentTarget.getBoundingClientRect(), k = clamp((e.clientX - r.left) / r.width, 0, 1), sl = S.intro[introIdx];
  introTail = 0; $('introNext').textContent = 'Next ▶'; $('introNext').classList.remove('ready');
  if (Narr.on && Narr.audio && Narr.audio.duration) { const au = Narr.audio; au.currentTime = k * au.duration; if (au.ended || au.paused) au.play().catch(() => {}); Narr.endedAt = -99; }
  else introTimer = k * sl.auto;
  mediaIdx = -1; showMedia(Narr.on && Narr.audio && Narr.audio.duration ? Narr.audio.currentTime : introTimer);
});
// media.pulse: a second file shown over the first with a heartbeat fade (used for the glowing trail map)
function setPulse(el, m) { if (!el) return; if (m && m.pulse) { el.src = (S.imageBase || 'images/') + m.pulse; el.classList.add('show'); } else { el.classList.remove('show'); el.removeAttribute('src'); } }
function showMedia(elapsed) {
  let k = -1; introMedia.forEach((m, i) => { if ((m.at || 0) <= elapsed) k = i; });
  if (k === mediaIdx) return; mediaIdx = k; const m = introMedia[k];
  const img = $('introImg'), ph = $('introPh');
  img.classList.remove('show'); ph.classList.remove('show');
  if (!m) { $('introCap').textContent = ''; $('introRef').textContent = ''; setPulse($('introPulse'), null); return; }
  $('introCap').textContent = m.caption || ''; $('introRef').textContent = [m.ref, m.credit].filter(Boolean).join(' · ');
  if (document.body.classList.contains('fsmedia')) requestAnimationFrame(() => document.body.style.setProperty('--mm-top', ($('fsMediaWrap').offsetHeight + 22) + 'px'));
  ph.textContent = 'Photo to add: ' + (m.file || '') + (m.caption ? ' — ' + m.caption : '');
  img.onload = () => { img.classList.add('show'); }; img.onerror = () => { ph.classList.add('show'); };
  img.src = (S.imageBase || 'images/') + m.file; if (swapped) $('bigPhotoImg').src = img.src;
  setPulse($('introPulse'), m); if (swapped) setPulse($('bigPhotoPulse'), m);
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
  const el = $('titleCard'); if (!el.classList.contains('show')) return;
  const o = k < .88 ? 1 : Math.max(0, 1 - (k - .88) / .12); el.style.opacity = String(o);
  if (k >= 1) el.classList.remove('show');
}
$('playBig').onclick = () => beginIntro(true);
let introSpunCb = null;
function startIntro() { if (partIdx !== 0) loadPart(0); mode = 'intro'; resetSim(); markers = []; introPaused = false; introStarted = false; Narr.stop(); light.cur = light.target = 0;
  $('titleCard').classList.remove('show'); $('playBig').classList.add('show'); hideOverlay('intro');
  if (G && window.BATTLE_WORLD) G.start($('globe'), { lift: true, onSpinProgress: titleCardProgress, onSpun: () => { if (introSpunCb) { const f = introSpunCb; introSpunCb = null; f(); } }, onDone: () => {} }); $('introPause').textContent = 'Ⅱ Pause'; setModeButtons(); hideOverlay('debrief'); $('caption').classList.remove('show'); showIntro(0); if (G && G.active()) hideOverlay('intro'); else showOverlay('intro'); }
function loadPart(i) {
  partIdx = clamp(i, 0, S.parts.length - 1); PART = S.parts[partIdx]; W = PART.world; B = PART.battlefield;
  buildProps(); DRAWNTER = buildTerrain(); PAINTEDTER = PAINTS[PART.id] || null; applyArt(); clockLabel = PART.clockStart || '';
  const ps = $('partSel'); if (ps) ps.value = String(partIdx); document.querySelectorAll('input[name=pmPart]').forEach(r => r.checked = +r.value === partIdx);
  $('partTitle').textContent = PART.title + ' · ' + PART.subtitle;
}
function startMode(m, opts) {
  const part = opts && opts.part !== undefined ? opts.part : partIdx; if (part !== partIdx) loadPart(part);
  $('playBig').classList.remove('show'); $('titleCard').classList.remove('show'); $('playGame').classList.remove('show'); $('playMenu').classList.remove('show'); document.body.classList.remove('choice');
  mode = m; markers = []; if (G) G.stop(); hideOverlay('intro'); hideOverlay('debrief'); hideOverlay('explain'); Narr.stop();
  resetSim(); paused = false; cam.follow = true; updatePauseBtn(); setModeButtons();
  document.body.dataset.mode = m; $('caption').classList.remove('show'); placeMedia();
  renderTimeline(); renderSelection(); renderSupport();
  cinematic = false; light.cur = light.target = 0;
  const lz = lzOf(); view.z = 1.1; focusOn(lz.x, lz.y); view.x = lz.x - VW() / 2; view.y = lz.y - VH() / 2; clampView();
  if (m === 'watch') { const e0 = PART.events[0]; caption(e0.title, e0.text, e0.tag, false); }
  else cmdCaption('Command mode', player === 'us' ? 'startus' : 'startpavn', 'reconstruction');
}
$('globe').addEventListener('click', () => { if (G && G.active()) { G.skip(); $('titleCard').classList.remove('show'); } });
function resetSim() { createFormations(); simTime = 0; acc = 0; eventIndex = 0; currentEvent = null; aiFlags = {}; battleOver = null; selected.clear(); log = []; $('log').innerHTML = ''; pending = []; strikes = []; effects = []; helis = []; light.cur = light.target = 0; clockLabel = PART.clockStart || ''; support = {}; renderSelection(); renderTimeline(); updateClock(); }
function setModeButtons() { $('watchBtn').classList.toggle('active', mode === 'watch'); $('commandBtn').classList.toggle('active', mode === 'command'); $('introBtn').classList.toggle('active', mode === 'intro'); document.body.dataset.mode = mode; }
function updatePauseBtn() { $('pauseBtn').textContent = paused ? '▶ Resume' : 'Ⅱ Pause'; }
function togglePause() { if (cinematic) return; if (mode === 'intro') { introPaused = !introPaused; $('introPause').textContent = introPaused ? '▶ Resume' : 'Ⅱ Pause'; Narr.pause(introPaused); return; } if (battleOver) return; paused = !paused; updatePauseBtn(); Narr.pause(paused); }
function showDebrief() {
  Narr.stop(); const d = $('debrief');
  let head, body;
  const next = partIdx < S.parts.length - 1 ? S.parts[partIdx + 1] : null;
  if (battleOver === 'history') { head = 'What the sources say happened next'; body = ''; }
  else {
    const nm = SIDES[player].name, en = SIDES[other(player)].name;
    const txt = (player === 'us' ? { victory: 'You held the clearing. The lifts kept coming, the enemy battalions are spent, and the ground is yours.', defeat: 'The perimeter has been broken. The battalion is scattered in the grass and the clearing is lost.', stalemate: 'The fight ends with both sides still in the field.' } : { victory: 'The Americans are broken. You closed with them before their firepower could be used, as the Front intended.', defeat: 'Your battalions are spent and the Americans still hold the clearing. The aircraft and the artillery have done their work.', stalemate: 'The fight ends with both sides still in the field, much as it did in November 1965.' })[battleOver];
    const rows = formations.filter(f => f.known || f.side === player).filter(f => UT[f.type].kind !== 'air').map(f => `<tr><td style="color:${sideText(f.side)}">${f.name}</td><td>${f.state}</td><td>${Math.round(f.strength)}%</td></tr>`).join('');
    head = ({ victory: nm + ': victory', defeat: nm + ': defeat', stalemate: 'Stalemate' })[battleOver];
    body = `<p class="lead">${txt}</p><p class="muted">Your battle is a what-if simulation. Nothing about it is a claim about what really happened. Compare it with the historical outcome below.</p><div class="tablewrap"><table><tr><th>Formation</th><th>State</th><th>Strength</th></tr>${rows}</table></div>`;
  }
  $('debriefTitle').textContent = head;
  $('debriefBody').innerHTML = body + `<h4>The historical outcome · ${PART.title}</h4>` + PART.outcome.map(l => `<p>${l.text} ${tagChip(l.tag, l.cite)}</p>`).join('');
  const nb = $('debriefNext'); nb.style.display = next ? '' : 'none'; nb.textContent = next ? `▶ Continue: ${next.title}` : '';
  if (Narr.on && battleOver === 'history') Narr.speak(PART.outcome.map(l => l.text).join(' '), PART.outcomeAudio || audioFor('outcome', PART.id));
  showOverlay('debrief');
}
function showExplain() {
  const ev = currentEvent; if (!ev || !ev.explain) return;
  if (!paused) togglePause(); $('explainTitle').textContent = ev.title; $('explainBody').textContent = ev.explain; showOverlay('explain');
  Narr.speak(ev.explain, ev.explainAudio || audioFor('explain', PART.id + '-' + (PART.events.indexOf(ev) + 1)));
}

/* ---------------- input ---------------- */
function toWorld(e) { const r = canvas.getBoundingClientRect(); return U(e.clientX - r.left, e.clientY - r.top); }
function manualCamera() { cam.tx = null; cam.follow = false; $('followBtn').classList.remove('active'); }
function pickFormation(p) {
  let best = null, bd = 1e9;
  formations.forEach(f => { if (!alive(f) || (!f.known && mode === 'command' && f.side !== player)) return; const r = Math.max(f.cols, f.rows) * 8 + 14; const d = dist(f, p); if (d < r && d < bd) { bd = d; best = f; } });
  return best;
}
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointerdown', e => {
  e.preventDefault(); last = { x: e.clientX, y: e.clientY }; dragMoved = false;
  hideMenu();
  if (e.button === 0) { dragging = true; canvas.setPointerCapture(e.pointerId); const p = toWorld(e); if (overview || e.shiftKey) band = { x0: p.x, y0: p.y, x1: p.x, y1: p.y }; else if (mode === 'command') marquee = { x0: p.x, y0: p.y, x1: p.x, y1: p.y, add: e.ctrlKey || e.metaKey }; }
  if (e.button === 2 && mode === 'command') { const p = toWorld(e); const r = canvas.getBoundingClientRect(); showMenu(e.clientX - r.left, e.clientY - r.top, p); }
});
let marquee = null, menuTarget = null;
function ownSelected() { return [...selected].map(id => byId[id]).filter(f => f && alive(f) && f.state !== 'rout' && f.side === player); }
function orderMove(p, state) {
  const fs = ownSelected(); if (!fs.length) return; const cols = Math.ceil(Math.sqrt(fs.length));
  fs.forEach((f, k) => { const g = legal({ x: clamp(p.x + (k % cols - (cols - 1) / 2) * 90, 20, W.w - 20), y: clamp(p.y + Math.floor(k / cols) * 70, 20, W.h - 20) }); f.tx = g.x; f.ty = g.y; f.state = state || 'move'; f.dug = false; f.aiPhase = null; f.then = null; });
  addLog((state === 'attack' ? 'Attack-move' : 'Move') + ' ordered: ' + fs.length + ' formation' + (fs.length > 1 ? 's' : '')); renderSelection();
}
function orderHalt() { ownSelected().forEach(f => { if (f.state === 'move' || f.state === 'attack') f.state = 'hold'; }); addLog('Halt'); renderSelection(); }
function orderDig() { ownSelected().forEach(f => { f.state = 'dig'; f.then = null; }); addLog('Dig in'); renderSelection(); }
function orderFace(p) { ownSelected().forEach(f => { f.facing = Math.atan2(p.y - f.y, p.x - f.x); if (f.state !== 'dig') f.state = 'hold'; }); addLog('Facing changed'); renderSelection(); }
function orderFallBack() { $('retreatBtn').click(); }
// Fire support for the player: a call lands after the delay on everyone inside the circle; each kind has its own cooldown.
function supportReady(kind) { const sp = (PART.support || {})[kind]; if (!sp || player !== 'us') return { ok: false }; if (sp.from && simTime < sp.from) return { ok: false, why: 'not yet available' }; if (sp.once && support[kind + 'used']) return { ok: false, why: 'used' }; const left = (support[kind] || -99) + (sp.cooldown || 0) - simTime; if (left > 0) return { ok: false, why: Math.ceil(left) + ' s' }; return { ok: true }; }
function orderFire(kind, p) {
  const r = supportReady(kind); if (!r.ok) return; const sp = PART.support[kind]; support[kind] = simTime; if (sp.once) support[kind + 'used'] = true;
  if (kind === 'arclight') { callFire({ kind: 'arclight', along: [[p.x - 160, p.y - 500], [p.x + 160, p.y + 500]], n: 9, r: sp.r, delay: sp.delay, dmg: sp.dmg, by: player }); }
  else callFire({ kind, at: p, r: sp.r, delay: sp.delay, dmg: sp.dmg, by: player });
  const near = formations.filter(f => f.side === player && alive(f) && dist(f, p) < sp.r + 10);
  addLog(sp.name + ' called' + (near.length ? ' — DANGER CLOSE: ' + near.map(f => f.division).join(', ') : ''));
  cmdCaption(sp.name, near.length ? 'belt' : 'support', 'reconstruction'); renderSupport();
}
function renderSupport() {
  const el = $('supportBox'); if (!el) return; const sp = PART.support || {};
  if (mode !== 'command' || player !== 'us' || !Object.keys(sp).length) { el.innerHTML = ''; return; }
  el.innerHTML = '<div class="tiny muted" style="margin:6px 0 2px">Fire support (right-click the map):</div>' + Object.keys(sp).map(k => { const r = supportReady(k); return `<div class="tiny"><b>${sp[k].name}</b> · ${r.ok ? '<span style="color:#5fcf8a">ready</span>' : '<span style="color:#e9c77a">' + (r.why || 'no') + '</span>'} · ${sp[k].note}</div>`; }).join('');
}
function showMenu(sx, sy, p) {
  menuTarget = p; const m = $('ctxMenu'), fs = ownSelected(), enemy = pickFormation(p), onEnemy = enemy && enemy.side !== player;
  const items = [];
  if (fs.length) {
    items.push({ t: onEnemy ? '⚔ Attack ' + enemy.division : '⚔ Attack-move here', f: () => orderMove(onEnemy ? { x: enemy.x, y: enemy.y } : p, 'attack') });
    items.push({ t: '➡ Move here', f: () => orderMove(p, 'move') });
    items.push({ t: '⛏ Dig in / hold here', f: orderDig });
    items.push({ t: '↻ Face this way', f: () => orderFace(p) });
    items.push({ t: '■ Halt', f: orderHalt });
    items.push({ t: '↩ Fall back', f: orderFallBack });
    items.push({ sep: true });
  }
  if (player === 'us' && PART.support) {
    Object.keys(PART.support).forEach(k => { const sp = PART.support[k], r = supportReady(k); const near = formations.filter(f => f.side === player && alive(f) && dist(f, p) < sp.r + 10).length; items.push({ t: '💥 ' + sp.name + (r.ok ? (near ? ' — danger close!' : '') : ' (' + (r.why || 'no') + ')'), f: () => orderFire(k, p), off: !r.ok }); });
    items.push({ sep: true });
  }
  items.push({ t: '☑ Select all ' + SIDES[player].short + ' formations', f: () => $('selectAll').click() });
  if (enemy && enemy.side === player) items.push({ t: '☐ Select ' + enemy.name, f: () => { selected.clear(); selected.add(enemy.id); renderSelection(); } });
  if (selected.size) items.push({ t: '✕ Deselect', f: () => { selected.clear(); renderSelection(); } });
  items.push({ t: '🎥 Look here', f: () => { manualCamera(); focusOn(p.x, p.y); } });
  m.innerHTML = (fs.length ? `<div class="mhead">${fs.length} formation${fs.length > 1 ? 's' : ''} selected</div>` : '<div class="mhead">No formation selected</div>') + items.map((it, i) => it.sep ? '<hr>' : `<button data-i="${i}"${it.off ? ' disabled' : ''}>${it.t}</button>`).join('');
  m.querySelectorAll('button').forEach(b => b.onclick = ev => { ev.stopPropagation(); items[+b.dataset.i].f(); hideMenu(); });
  const pw = panel.getBoundingClientRect(); m.style.display = 'block'; m.style.left = Math.min(sx, pw.width - 260) + 'px'; m.style.top = Math.min(sy, pw.height - m.offsetHeight - 10) + 'px';
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
  if (on) { const m = introMedia[mediaIdx]; if (m) { $('bigPhotoImg').src = (S.imageBase || 'images/') + m.file; setPulse($('bigPhotoPulse'), m); } requestAnimationFrame(fitSwappedMap); }
  else { setPulse($('bigPhotoPulse'), null); canvas.style.transform = ''; const plate = $('fsMediaWrap').querySelector('.plate'); if (plate) plate.style.minHeight = ''; }
  if (document.body.classList.contains('fsmedia')) requestAnimationFrame(() => document.body.style.setProperty('--mm-top', ($('fsMediaWrap').offsetHeight + 22) + 'px'));
}
$('swapBtn').onclick = e => { e.stopPropagation(); swapPhoto(!swapped); };
$('bigPhotoBack').onclick = () => swapPhoto(false);
$('introMedia').querySelector('.plate').addEventListener('click', () => {
  if (swapped) return;
  if (document.body.classList.contains('fsmedia')) swapPhoto(true);
  else { toggleFullscreen(); setTimeout(() => swapPhoto(true), 400); }
});
canvas.addEventListener('pointerdown', e => { if (swapped) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
canvas.addEventListener('click', e => { if (swapped) { e.stopImmediatePropagation(); swapPhoto(false); } }, true);
window.addEventListener('resize', fitSwappedMap);
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
  const p = el.requestFullscreen ? el.requestFullscreen() : Promise.reject();
  p.catch(() => setBig(true));
}
window.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('bigmap')) setBig(false); });
document.addEventListener('fullscreenchange', () => { $('fsBtn').classList.toggle('active', !!document.fullscreenElement); setTimeout(resize, 50); placeMedia(); });
mini.addEventListener('dblclick', e => { e.preventDefault(); toggleFullscreen(); });
$('fsBtn').onclick = toggleFullscreen;
$('mapBtn').onclick = toggleOverview;
let textOff = false; try { textOff = localStorage.getItem(LS('textoff')) === '1'; } catch (e) {}
function setTextOff(off) { textOff = off; document.body.classList.toggle('textoff', off); try { localStorage.setItem(LS('textoff'), off ? '1' : '0'); } catch (e) {} }
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
// Layout guide for painting the terrain: the current part's map at full size with every feature boxed and labelled (Shift+G).
function exportLayoutGuide() {
  const T = document.createElement('canvas'); T.width = W.w; T.height = W.h; const g = T.getContext('2d');
  g.drawImage(TER, 0, 0, W.w, W.h);
  g.lineWidth = 4; g.font = 'bold 28px system-ui'; g.textAlign = 'left';
  const ell = (f, col, t) => { g.strokeStyle = col; g.fillStyle = col; g.beginPath(); g.ellipse(f.x, f.y, f.rx || f.r, f.ry || f.r, 0, 0, PI * 2); g.stroke(); g.fillText(t, f.x - 40, f.y); };
  B.features.forEach(f => {
    if (f.kind === 'woods') ell(f, '#2bff6a', 'WOODS'); else if (f.kind === 'grass') ell(f, '#ffe84a', 'ELEPHANT GRASS'); else if (f.kind === 'clearing') ell(f, '#ff2a2a', (f.name || 'CLEARING') + ': open ground');
    else if (f.kind === 'lz') { } else if (f.kind === 'mound') { g.strokeStyle = '#ff8a2a'; g.beginPath(); g.arc(f.x, f.y, f.r + 6, 0, PI * 2); g.stroke(); }
    else if (f.kind === 'slope') { g.strokeStyle = '#2bd0ff'; g.fillStyle = '#2bd0ff'; g.beginPath(); f.poly.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.stroke(); g.fillText('MOUNTAIN SLOPE rising to the west (' + (f.name || '') + ')', 40, 140); }
    else if (f.kind === 'creek') { g.strokeStyle = '#ffd400'; g.lineWidth = 6; g.beginPath(); curve(g, f.pts); g.stroke(); g.lineWidth = 4; g.fillStyle = '#ffd400'; g.fillText('DRY CREEK BED (yellow line)', f.pts[0][0] + 20, f.pts[0][1] + 40); }
    else if (f.kind === 'trail') { g.strokeStyle = '#ff2aff'; g.lineWidth = 5; g.beginPath(); curve(g, f.pts); g.stroke(); g.lineWidth = 4; g.fillStyle = '#ff2aff'; g.fillText('TRAIL', f.pts[0][0] + 20, f.pts[0][1] - 20); }
  });
  g.fillStyle = '#ff8a2a'; g.fillText('orange circles: termite mounds', 40, 100);
  g.fillStyle = '#ff2a2a'; g.font = 'bold 40px system-ui'; g.fillText('N (north is up) ↑   ' + PART.title + '   map ' + W.w + ' x ' + W.h + ' px, paint at 2x = ' + W.w * 2 + ' x ' + W.h * 2, 40, 60);
  const a = document.createElement('a'); a.download = S.id + '-' + PART.id + '-layout-guide.png'; a.href = T.toDataURL('image/png'); a.click();
}
window.exportLayoutGuide = exportLayoutGuide;
// Scene model for the painter: the drawn map with its trees and mounds, flat, full size, no labels or outlines (Shift+H).
function exportSceneModel() {
  const T = document.createElement('canvas'); T.width = W.w; T.height = W.h; const g = T.getContext('2d');
  const saveTer = TER, saveTilt = TILT, sv = Object.assign({}, view);
  const plain = buildTerrain(true); g.drawImage(plain, 0, 0, W.w, W.h);
  TILT = 0; view.x = 0; view.y = 0; view.w = W.w; view.h = W.h; view.z = 1;
  PROPS.slice().sort((a, b) => a.y - b.y).forEach(p => drawProp(g, p));
  TILT = saveTilt; Object.assign(view, sv); TER = saveTer;
  const a = document.createElement('a'); a.download = S.id + '-' + PART.id + '-scene.png'; a.href = T.toDataURL('image/png'); a.click();
}
window.exportSceneModel = exportSceneModel;
window.__dbg = { strikes: () => strikes, helis: () => helis, part: () => PART.id, light: () => light, layoutGuide: () => { const T = document.createElement('canvas'); T.width = W.w; T.height = W.h; return T; } };
mini.addEventListener('click', e => { const r = mini.getBoundingClientRect(); view.x = (e.clientX - r.left) / r.width * W.w - VW() / 2; view.y = (e.clientY - r.top) / r.height * W.h - VH() / 2; clampView(); manualCamera(); });
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
  const k = e.key.toLowerCase(); let moved = false; const st = 40 / view.z;
  if (['arrowleft', 'a'].includes(k)) { view.x -= st; moved = true; } if (['arrowright', 'd'].includes(k)) { view.x += st; moved = true; }
  if (['arrowup', 'w'].includes(k)) { view.y -= st; moved = true; } if (['arrowdown', 's'].includes(k)) { view.y += st; moved = true; }
  if (moved) { e.preventDefault(); clampView(); manualCamera(); }
  if (k === ' ') { e.preventDefault(); togglePause(); }
  if (k === 'f') { cam.follow = true; $('followBtn').classList.add('active'); if (currentEvent && currentEvent.focus) focusOn(currentEvent.focus.x, currentEvent.focus.y); }
  if (k === 'e') showExplain();
  if (k === 'm') toggleOverview();
  if (k === 't') setTextOff(!textOff);
  if (k === 'n') skipChapter();
  if (k === 'r') $('resetBtn').click();
  if (k === '>' || k === '.') $('ffBtn').click();
  if (k === 'g' && e.shiftKey) exportLayoutGuide();
  if (k === 'h' && e.shiftKey) exportSceneModel();
  if (k === '+' || k === '=') { view.z = clamp(view.z * 1.15, .45, 2.4); clampView(); } if (k === '-') { view.z = clamp(view.z / 1.15, .45, 2.4); clampView(); }
  if (mode === 'intro' && introStarted) { if (k === 'arrowright' || k === 'enter') showIntro(introIdx + 1); if (k === 'arrowleft') showIntro(introIdx - 1); }
});

/* ---------------- buttons ---------------- */
$('introBtn').onclick = startIntro;
$('watchBtn').onclick = () => startMode('watch');
$('commandBtn').onclick = () => startMode('command');
$('pauseBtn').onclick = togglePause;
$('resetBtn').onclick = () => { if (mode === 'intro') startIntro(); else startMode(mode); };
$('speedSel').onchange = e => { speed = +e.target.value; $('ffBtn').classList.toggle('active', speed > 1); $('ffBtn').textContent = speed > 1 ? '⏩ ' + speed + '×' : '⏩ FF'; };
$('ffBtn').onclick = () => { speed = speed >= 4 ? 1 : speed >= 2 ? 4 : 2; $('speedSel').value = String(speed); $('speedSel').onchange({ target: $('speedSel') }); };
function skipChapter() { if (mode !== 'watch') return; const next = PART.events.find(e => e.t > simTime + .01); if (next) jumpTo(next.t); }
$('skipBtn').onclick = skipChapter;
$('followBtn').onclick = () => { cam.follow = !cam.follow; $('followBtn').classList.toggle('active', cam.follow); if (cam.follow && currentEvent && currentEvent.focus) focusOn(currentEvent.focus.x, currentEvent.focus.y); };
$('explainBtn').onclick = showExplain;
$('capExplain').onclick = e => { e.stopPropagation(); showExplain(); };
$('voiceMenuBtn').onclick = e => { e.stopPropagation(); $('voicePop').classList.toggle('show'); };
document.addEventListener('click', e => { if (!e.target.closest('#voiceWrap')) $('voicePop').classList.remove('show'); });
$('voiceBtn').onclick = () => Narr.toggle();
if (S.voices && S.voices.length) {
  const sel = $('voiceSel'); sel.innerHTML = S.voices.map(v => `<option value="${v.id}"${v.id === voiceId ? ' selected' : ''}>${v.name}</option>`).join('');
  sel.onchange = () => { voiceId = sel.value; try { localStorage.setItem(LS('voice'), voiceId); } catch (e) {} if (Narr.on) { if (mode === 'intro') speakSlide(S.intro[introIdx]); else if (currentEvent) Narr.speak(currentEvent.text, evAudio(currentEvent)); } };
} else $('voiceSel').style.display = 'none';
try { const r = parseFloat(localStorage.getItem(LS('voice-rate'))); if (r >= .5 && r <= 2) Narr.rate = r; } catch (e) {}
$('voiceRate').value = String(Narr.rate);
$('voiceRate').onchange = () => { Narr.rate = parseFloat($('voiceRate').value) || 1; if (Narr.audio) Narr.audio.playbackRate = Narr.rate; try { localStorage.setItem(LS('voice-rate'), String(Narr.rate)); } catch (e) {} };
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
const chosenPart = () => { const r = document.querySelector('input[name=pmPart]:checked'); return r ? +r.value : partIdx; };
$('explainClose').onclick = () => { hideOverlay('explain'); Narr.stop(); if (paused && !battleOver) togglePause(); };
$('debriefWatch').onclick = () => startMode('watch');
$('debriefCommand').onclick = () => startMode('command');
$('debriefNext').onclick = () => startMode(mode === 'intro' ? 'watch' : mode, { part: partIdx + 1 });
$('debriefIntro').onclick = startIntro;
$('selectAll').onclick = () => { selected.clear(); formations.forEach(f => { if (f.side === player && alive(f) && f.state !== 'rout' && UT[f.type].kind !== 'air') selected.add(f.id); }); renderSelection(); };
$('sideSel').onchange = () => { setPlayer($('sideSel').value); if (mode === 'command') startMode('command'); };
$('partSel').onchange = () => { if (mode !== 'intro') startMode(mode, { part: +$('partSel').value }); else loadPart(+$('partSel').value); };
$('chooseWatch').onclick = () => startMode('watch', { part: 0 });
$('chooseCommand').onclick = () => { setPlayer(SIDE_IDS[0]); startMode('command', { part: 0 }); };
$('chooseCommandH').onclick = () => { setPlayer(SIDE_IDS[1]); startMode('command', { part: 0 }); };
$('playGame').onclick = () => { $('playGame').classList.remove('show'); $('playMenu').classList.add('show'); };
$('pmClose').onclick = () => { $('playMenu').classList.remove('show'); $('playGame').classList.add('show'); };
$('pmWatch').onclick = () => startMode('watch', { part: chosenPart() });
$('pmSideA').onclick = () => { setPlayer(SIDE_IDS[0]); startMode('command', { part: chosenPart() }); };
$('pmSideB').onclick = () => { setPlayer(SIDE_IDS[1]); startMode('command', { part: chosenPart() }); };
$('haltBtn').onclick = () => { selected.forEach(id => { const f = byId[id]; if (f.state === 'move' || f.state === 'attack') { f.state = 'hold'; } }); };
$('digBtn').onclick = orderDig;
$('retreatBtn').onclick = () => { const r = PART.rally[player]; let i = 0; selected.forEach(id => { const f = byId[id]; if (!alive(f) || f.state === 'rout' || f.side !== player) return; f.tx = r.x + (i % 3) * 60 - 60; f.ty = r.y + Math.floor(i / 3) * 60 - 60; f.state = 'move'; f.dug = false; f.then = null; f.aiPhase = null; i++; }); };

/* ---------------- main loop ---------------- */
function tick(t) {
  if (!lastFrame) lastFrame = t; const dt = Math.min(.1, (t - lastFrame) / 1000); lastFrame = t; wall += dt;
  if (mode === 'intro') {
    const sl = S.intro[introIdx];
    if (introStarted && !introPaused && !sl.choice) {
      let tail = false, frac = 0;
      if (Narr.on && Narr.audio) { const au = Narr.audio; if (au.ended && au.currentTime >= au.duration - .05) tail = true; else frac = au.duration ? Math.min(1, au.currentTime / au.duration) : 0; }
      else if (Narr.on && 'speechSynthesis' in window && speechSynthesis.speaking) frac = .5;
      else { if (!(G && G.active())) introTimer += dt; frac = Math.min(1, introTimer / sl.auto); if (introTimer >= sl.auto) tail = true; }
      showMedia(Narr.on && Narr.audio ? Narr.audio.currentTime : introTimer);
      const nb = $('introNext');
      if (tail) { introTail += dt; frac = 1; nb.textContent = `Next narration ▶ ${Math.max(0, Math.ceil(INTRO_BREAK - introTail))}`; nb.classList.add('ready'); $('ctrlStrip').classList.add('lit'); if (introTail >= INTRO_BREAK) showIntro(introIdx + 1); }
      else { introTail = 0; if (nb.classList.contains('ready')) { nb.textContent = 'Next ▶'; nb.classList.remove('ready'); $('ctrlStrip').classList.remove('lit'); } }
      $('introBar').style.width = Math.min(100, frac * 100) + '%';
    }
  } else if (!paused && !battleOver && !cinematic) {
    acc += dt * speed;
    while (acc >= DT) {
      if (mode === 'watch' && Narr.on && Narr.audio && (!Narr.audio.ended || wall - Narr.endedAt < CHAPTER_BREAK) && eventIndex < PART.events.length && PART.events[eventIndex].t <= simTime + DT) { acc = 0; break; }
      acc -= DT; simTime += DT; if (mode === 'watch') stepWatch(); else stepCommand();
    }
    updateClock(); if (mode === 'command' && Math.floor(simTime) !== Math.floor(simTime - dt * speed)) renderSupport();
  }
  render(); requestAnimationFrame(tick);
}

/* ---------------- boot ---------------- */
const PAINTS = {};
function applyArt() {
  if (artOn && PAINTEDTER) { TER = PAINTEDTER; PAINTED = true; }
  else { if (!DRAWNTER) DRAWNTER = buildTerrain(); TER = DRAWNTER; PAINTED = false; }
  buildMiniBase(); document.body.classList.toggle('drawnmode', !artOn); const b = $('artBtn'); if (b) { b.classList.toggle('active', artOn); b.textContent = artOn ? '🎨 Art' : '✏ Drawn'; b.title = artOn ? 'Painted battlefield (click for the drawn map)' : 'Drawn battlefield (click for the painting)'; }
}
$('artBtn').onclick = () => { artOn = !artOn; try { localStorage.setItem(LS('art'), artOn ? '1' : '0'); } catch (e) {} applyArt(); };
// Optional painted terrain per part (images/terrain-<part>.jpg, painted to that part's layout guide): replaces the drawn ground; labels still come from the scenario.
S.parts.forEach(p => { const img = new Image(); img.onload = () => { const T = document.createElement('canvas'); T.width = p.world.w * TS; T.height = p.world.h * TS; const g = T.getContext('2d'); g.drawImage(img, 0, 0, T.width, T.height); g.scale(TS, TS);
    const saveB = B; B = p.battlefield; drawLabels(g); B = saveB; PAINTS[p.id] = T; if (PART === p) { PAINTEDTER = T; applyArt(); } }; img.src = (S.imageBase || 'images/') + 'terrain-' + p.id + '.jpg'; });
renderBriefing(); renderArmies(); loadPart(0); createFormations();
if (document.fonts && document.fonts.load) document.fonts.load("bold 20px 'Oswald'").then(() => { DRAWNTER = buildTerrain(); applyArt(); }).catch(() => {});
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};
new ResizeObserver(resize).observe(panel); resize();
view.x = 700; view.y = 300; startIntro();
requestAnimationFrame(tick);
})();
