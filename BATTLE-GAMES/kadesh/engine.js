/* Battle of Kadesh — reenactment & command engine.
   Reads window.KADESH_SCENARIO (scenario.js). Plain 2D Canvas, no libraries. */
(() => {
'use strict';
const S = window.KADESH_SCENARIO, W = S.world, B = S.battlefield;
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
let paused = false, speed = 1, simTime = 0, acc = 0, lastFrame = 0, wall = 0;
let formations = [], byId = {};
let eventIndex = 0, currentEvent = null, aiFlags = {}, battleOver = null, fastForward = false;
let selected = new Set();
let dragging = false, last = null, dragMoved = false;
let introIdx = 0, introTimer = 0, introPaused = false;
let markers = [];
let TER = null, MINIBASE = null;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const jitter = (i, k = 0) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const alive = f => f.present && f.state !== 'withdrawn' && f.state !== 'destroyed';
const tagChip = tag => { const c = S.confidence[tag] || S.confidence.reconstruction; return `<span class="chip" style="--c:${c.color}" title="${c.desc}">${c.label}</span>`; };

function riverXAt(y) {
  const p = B.river;
  for (let i = 0; i < p.length - 1; i++) {
    const [x1, y1] = p[i], [x2, y2] = p[i + 1];
    if ((y <= y1 && y >= y2) || (y >= y1 && y <= y2)) { const t = (y - y1) / ((y2 - y1) || 1); return x1 + (x2 - x1) * t; }
  }
  return p[0][0];
}

/* ---------------- terrain (pre-rendered once) ---------------- */
function curve(c, pts) {
  c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) { const xc = (pts[i][0] + pts[i + 1][0]) / 2, yc = (pts[i][1] + pts[i + 1][1]) / 2; c.quadraticCurveTo(pts[i][0], pts[i][1], xc, yc); }
  const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]);
}
function outlined(c, text, x, y, size, opts = {}) {
  c.save(); c.font = `${opts.weight || 'bold'} ${size}px Georgia, serif`; c.textAlign = opts.align || 'center'; c.textBaseline = 'middle';
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
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); curve(c, pts); c.strokeStyle = 'rgba(110,95,60,.55)'; c.lineWidth = w + 16; c.stroke();
  c.beginPath(); curve(c, pts); c.strokeStyle = '#2f7590'; c.lineWidth = w; c.stroke();
  c.beginPath(); curve(c, pts); c.strokeStyle = '#4a98ae'; c.lineWidth = w * .62; c.stroke();
  c.beginPath(); curve(c, pts); c.strokeStyle = 'rgba(140,210,220,.55)'; c.lineWidth = w * .18; c.stroke();
  c.save(); c.setLineDash([6, 26]); c.lineDashOffset = 7; c.beginPath(); curve(c, pts); c.strokeStyle = 'rgba(200,240,245,.5)'; c.lineWidth = 1.6; c.stroke(); c.restore();
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
  const fields = [[1030, 640, 120, 70, .1], [1130, 470, 110, 60, -.05], [1180, 820, 130, 60, .15], [1360, 820, 110, 70, -.1], [1620, 560, 120, 70, .08], [1680, 700, 110, 60, -.12], [1600, 900, 120, 60, .2], [1250, 1150, 110, 60, -.05], [1700, 380, 100, 60, .05], [1120, 320, 110, 60, -.15]];
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
  c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); curve(c, B.road); c.strokeStyle = 'rgba(90,75,45,.5)'; c.lineWidth = 16; c.stroke();
  c.beginPath(); curve(c, B.road); c.strokeStyle = '#d6c28e'; c.lineWidth = 11; c.stroke();
  c.setLineDash([10, 14]); c.beginPath(); curve(c, B.road); c.strokeStyle = 'rgba(120,100,60,.5)'; c.lineWidth = 2; c.stroke(); c.restore();
  // hills
  B.hills.forEach((h, i) => {
    c.fillStyle = 'rgba(40,30,15,.22)'; c.beginPath(); c.ellipse(h.x + 10, h.y + 10, h.rx, h.ry, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#a08c5f'; c.beginPath(); c.ellipse(h.x, h.y, h.rx, h.ry, 0, 0, PI * 2); c.fill();
    c.fillStyle = '#c0ab74'; c.beginPath(); c.ellipse(h.x - h.rx * .2, h.y - h.ry * .25, h.rx * .6, h.ry * .5, 0, 0, PI * 2); c.fill();
    c.strokeStyle = 'rgba(90,75,45,.6)'; c.lineWidth = 1.5; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(h.x - h.rx * .7 + k * h.rx * .35, h.y + h.ry * .3); c.lineTo(h.x - h.rx * .5 + k * h.rx * .35, h.y - h.ry * .2); c.stroke(); }
  });
  // water
  waterBand(c, B.tributary, 22);
  waterBand(c, B.river, 58);
  B.fords.forEach(f => {
    c.save(); c.strokeStyle = 'rgba(230,220,180,.75)'; c.lineWidth = 3; c.setLineDash([4, 6]);
    for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(f.x - 44, f.y + k * 9); c.lineTo(f.x + 44, f.y + k * 9); c.stroke(); }
    c.restore(); outlined(c, f.name, f.x, f.y + 34, 12, { fill: '#e8f4f6' });
  });
  // forests
  B.forests.forEach((fo, fi) => {
    const n = Math.floor(fo.r * fo.r / 650);
    for (let i = 0; i < n; i++) {
      const a = jitter(fi * 1000 + i, 6) * PI * 2, rr = Math.sqrt(jitter(fi * 1000 + i, 7)) * fo.r;
      const x = fo.x + Math.cos(a) * rr, y = fo.y + Math.sin(a) * rr * .8;
      if (Math.abs(x - riverXAt(y)) < 60 || x < 10 || x > W.w - 10 || y < 10 || y > W.h - 10) continue;
      tree(c, x, y, 7 + jitter(i, 8) * 6, i);
    }
  });
  // the city of Kadesh
  const ct = B.city;
  c.fillStyle = '#2f7590'; c.beginPath(); c.roundRect(ct.x - 26, ct.y - 26, ct.w + 52, ct.h + 52, 30); c.fill();
  c.fillStyle = '#4a98ae'; c.beginPath(); c.roundRect(ct.x - 18, ct.y - 18, ct.w + 36, ct.h + 36, 24); c.fill();
  c.fillStyle = '#9a8a62'; c.beginPath(); c.roundRect(ct.x - 8, ct.y - 8, ct.w + 16, ct.h + 16, 10); c.fill();
  c.fillStyle = '#7d6f50'; c.fillRect(ct.x, ct.y, ct.w, ct.h);
  c.fillStyle = '#b6a477'; c.fillRect(ct.x + 10, ct.y + 10, ct.w - 20, ct.h - 20);
  c.strokeStyle = '#4d4230'; c.lineWidth = 3; c.strokeRect(ct.x, ct.y, ct.w, ct.h);
  c.fillStyle = '#5a4f38'; for (let x = ct.x; x < ct.x + ct.w; x += 12) { c.fillRect(x, ct.y - 3, 6, 5); c.fillRect(x, ct.y + ct.h - 2, 6, 5); }
  for (let y = ct.y; y < ct.y + ct.h; y += 12) { c.fillRect(ct.x - 3, y, 5, 6); c.fillRect(ct.x + ct.w - 2, y, 5, 6); }
  [[ct.x, ct.y], [ct.x + ct.w, ct.y], [ct.x, ct.y + ct.h], [ct.x + ct.w, ct.y + ct.h], [ct.x + ct.w / 2, ct.y], [ct.x + ct.w / 2, ct.y + ct.h]].forEach(([x, y]) => {
    c.fillStyle = 'rgba(30,20,10,.35)'; c.fillRect(x - 10, y - 8, 24, 24); c.fillStyle = '#8c7d5a'; c.fillRect(x - 13, y - 13, 26, 26); c.fillStyle = '#a89868'; c.fillRect(x - 10, y - 10, 14, 14); c.strokeStyle = '#4d4230'; c.lineWidth = 2; c.strokeRect(x - 13, y - 13, 26, 26);
  });
  c.fillStyle = '#4a3a26'; c.fillRect(ct.x - 4, ct.y + ct.h / 2 - 12, 12, 24); // west gate
  for (let gx = 0; gx < 6; gx++) for (let gy = 0; gy < 4; gy++) {
    const bx = ct.x + 22 + gx * 27, by = ct.y + 22 + gy * 32, k = gx * 7 + gy; c.fillStyle = 'rgba(30,20,10,.35)'; c.fillRect(bx + 3, by + 3, 18, 20);
    c.fillStyle = k % 3 === 0 ? '#cdbb8a' : k % 3 === 1 ? '#a89566' : '#bfae7e'; c.fillRect(bx, by, 18, 20); c.fillStyle = 'rgba(255,240,200,.5)'; c.fillRect(bx, by, 18, 4);
  }
  c.fillStyle = '#8a4a3a'; c.fillRect(ct.x + 70, ct.y + 55, 50, 50); c.fillStyle = '#c97a5a'; c.fillRect(ct.x + 76, ct.y + 61, 38, 38); c.fillStyle = '#e8c070'; c.fillRect(ct.x + 88, ct.y + 73, 14, 14);
  outlined(c, ct.name, ct.x + ct.w / 2, ct.y + ct.h + 46, 20, { fill: '#f8e9bf' });
  // the Egyptian camp
  const cp = B.camp;
  c.fillStyle = 'rgba(210,190,140,.35)'; c.fillRect(cp.x, cp.y, cp.w, cp.h);
  for (let x = cp.x; x <= cp.x + cp.w; x += 14) { shield(c, x, cp.y, 0); shield(c, x, cp.y + cp.h, 0); }
  for (let y = cp.y; y <= cp.y + cp.h; y += 14) { shield(c, cp.x, y, 1); shield(c, cp.x + cp.w, y, 1); }
  for (let i = 0; i < 14; i++) { const tx = cp.x + 18 + (i % 7) * 32, ty = i < 7 ? cp.y + 20 : cp.y + cp.h - 20; tent(c, tx, ty, 10, '#efe3c3'); }
  tent(c, cp.x + 60, cp.y + cp.h / 2 + 6, 22, '#f3e6c0', true);
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
const SIDE_ART = {
  egypt:   { skin: '#c98b58', head: '#f2ead3', headStroke: '#6a5a3a', shield: '#d9c38a', shieldStroke: '#5a4020', cab: '#3985d7', cabLight: '#7fb6ff', wheel: '#4b3a26', horse: '#6b4a2f', horse2: '#8a6240', pennant: '#3985d7', trim: '#e9c77a' },
  hittite: { skin: '#b57a4a', head: '#b58a3c', headStroke: '#4a3418', shield: '#8a3a30', shieldStroke: '#3a1a14', cab: '#c9463a', cabLight: '#ff9d8a', wheel: '#3a2a1c', horse: '#5a3a26', horse2: '#7a4e34', pennant: '#d44c3e', trim: '#f3d9a0' }
};
function spriteInfantry(c, side, archer, s, i) {
  const A = SIDE_ART[side];
  c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(0, 1.5 * s, 5 * s, 3 * s, 0, 0, PI * 2); c.fill();
  if (!archer) { // spear
    c.strokeStyle = '#5a3b22'; c.lineWidth = 1.1 * s; c.beginPath(); c.moveTo(-5 * s, 2 * s); c.lineTo(9 * s, -1.5 * s); c.stroke();
    c.fillStyle = '#d9d2c0'; c.beginPath(); c.moveTo(9 * s, -1.5 * s); c.lineTo(11.5 * s, -2.1 * s); c.lineTo(9.4 * s, -.4 * s); c.closePath(); c.fill();
  }
  c.fillStyle = A.skin; c.beginPath(); c.ellipse(0, 0, 3.4 * s, 4.2 * s, 0, 0, PI * 2); c.fill(); // shoulders
  if (side === 'egypt' && i % 2) { c.fillStyle = '#f4efe2'; c.beginPath(); c.ellipse(-.6 * s, 0, 2.2 * s, 3.6 * s, 0, 0, PI * 2); c.fill(); } // white linen
  if (!archer) { // shield held forward-left
    c.fillStyle = A.shieldStroke; c.beginPath();
    if (side === 'egypt') c.roundRect(2 * s, -5.2 * s, 4.6 * s, 7.2 * s, 2 * s); else c.arc(4 * s, -1.5 * s, 3.4 * s, 0, PI * 2);
    c.fill(); c.fillStyle = A.shield; c.beginPath();
    if (side === 'egypt') c.roundRect(2.7 * s, -4.5 * s, 3.2 * s, 5.8 * s, 1.6 * s); else c.arc(4 * s, -1.5 * s, 2.5 * s, 0, PI * 2);
    c.fill();
  } else {
    c.strokeStyle = '#4e3424'; c.lineWidth = 1.1 * s; c.beginPath(); c.arc(3.5 * s, 0, 4.5 * s, -1.25, 1.25); c.stroke();
    c.strokeStyle = '#d9d2c0'; c.lineWidth = .6 * s; c.beginPath(); c.moveTo(3.5 * s + Math.cos(-1.25) * 4.5 * s, Math.sin(-1.25) * 4.5 * s); c.lineTo(3.5 * s + Math.cos(1.25) * 4.5 * s, Math.sin(1.25) * 4.5 * s); c.stroke();
    c.fillStyle = '#7a5a30'; c.fillRect(-4.5 * s, -1.2 * s, 3 * s, 2.4 * s); // quiver
  }
  c.fillStyle = A.head; c.strokeStyle = A.headStroke; c.lineWidth = .8 * s; c.beginPath(); c.arc(.3 * s, 0, 2.3 * s, 0, PI * 2); c.fill(); c.stroke();
  if (side === 'hittite') { c.fillStyle = A.headStroke; c.beginPath(); c.moveTo(-1.6 * s, -.6 * s); c.lineTo(-3.4 * s, 0); c.lineTo(-1.6 * s, .6 * s); c.closePath(); c.fill(); } // helmet crest
}
function spriteChariot(c, side, s, i, moving) {
  const A = SIDE_ART[side], crew = side === 'hittite' ? 3 : 2;
  c.fillStyle = 'rgba(25,20,10,.3)'; c.beginPath(); c.ellipse(4 * s, 2 * s, 16 * s, 5.5 * s, 0, 0, PI * 2); c.fill();
  if (moving) { c.fillStyle = 'rgba(210,190,140,.35)'; c.beginPath(); c.arc(-11 * s, 3 * s, 4 * s, 0, PI * 2); c.arc(-15 * s, -2 * s, 3 * s, 0, PI * 2); c.fill(); }
  // horses
  for (const hy of [-3.2, 3.2]) {
    c.fillStyle = hy < 0 ? A.horse : A.horse2; c.beginPath(); c.ellipse(11 * s, hy * s, 6 * s, 2.3 * s, 0, 0, PI * 2); c.fill();
    c.beginPath(); c.ellipse(17.5 * s, hy * s * .8, 2.2 * s, 1.5 * s, 0, 0, PI * 2); c.fill();
    c.strokeStyle = '#2a1a0c'; c.lineWidth = .7 * s; c.beginPath(); c.moveTo(6 * s, hy * s); c.lineTo(15 * s, hy * s); c.stroke(); // mane line
    c.fillStyle = A.trim; c.fillRect(13 * s, (hy - .8) * s, 1.4 * s, 1.6 * s); // harness
  }
  c.strokeStyle = '#3b2c1a'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo(5 * s, 0); c.lineTo(-2 * s, 0); c.stroke(); // pole
  // wheels
  for (const wy of [-5.5, 5.5]) { c.fillStyle = A.wheel; c.beginPath(); c.ellipse(-3 * s, wy * s, 3.6 * s, 1.6 * s, 0, 0, PI * 2); c.fill(); c.strokeStyle = '#8a7a5a'; c.lineWidth = .6 * s; c.beginPath(); c.moveTo(-6.4 * s, wy * s); c.lineTo(.4 * s, wy * s); c.stroke(); }
  c.strokeStyle = '#3b2c1a'; c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(-3 * s, -5 * s); c.lineTo(-3 * s, 5 * s); c.stroke(); // axle
  // cab
  c.fillStyle = A.cab; c.beginPath(); c.roundRect(-7 * s, -4.5 * s, 9 * s, 9 * s, 2 * s); c.fill();
  c.strokeStyle = A.trim; c.lineWidth = .8 * s; c.stroke();
  c.fillStyle = A.cabLight; c.fillRect(-6 * s, -3.5 * s, 2 * s, 7 * s);
  // crew
  for (let k = 0; k < crew; k++) { const cy = crew === 2 ? (k ? 2 : -2) : (k - 1) * 2.6; c.fillStyle = A.skin; c.beginPath(); c.arc(-2.5 * s + (k === 1 ? -1.5 * s : 0), cy * s, 1.5 * s, 0, PI * 2); c.fill(); c.fillStyle = A.head; c.beginPath(); c.arc(-2.5 * s + (k === 1 ? -1.5 * s : 0), cy * s, 1 * s, 0, PI * 2); c.fill(); }
  if (side === 'egypt') { c.strokeStyle = '#4e3424'; c.lineWidth = .8 * s; c.beginPath(); c.arc(1 * s, -2.5 * s, 3 * s, -1.3, 1.3); c.stroke(); } // bow
  else { c.strokeStyle = '#5a3b22'; c.lineWidth = 1 * s; c.beginPath(); c.moveTo(-5 * s, 3 * s); c.lineTo(6 * s, 5 * s); c.stroke(); c.fillStyle = A.shieldStroke; c.beginPath(); c.arc(-4 * s, -3 * s, 2.4 * s, 0, PI * 2); c.fill(); c.fillStyle = A.shield; c.beginPath(); c.arc(-4 * s, -3 * s, 1.6 * s, 0, PI * 2); c.fill(); }
}
function drawSprite(c, f, x, y, facing, i, s = 1) {
  c.save(); c.translate(x, y); c.rotate(facing);
  const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout';
  if (f.type === 'chariot') spriteChariot(c, f.side, s, i, moving);
  else spriteInfantry(c, f.side, f.type === 'archers' || (f.type === 'infantry' && i % 3 === 2), s, i);
  c.restore();
}

/* ---------------- formations ---------------- */
function createFormations() {
  formations = S.formations.map(d => Object.assign({}, d, {
    tx: d.x, ty: d.y, strength: 100, strengthTarget: null, strengthRate: 0,
    state: 'hold', known: !d.hidden, present: !d.offmap, speed: d.speed || (d.type === 'chariot' ? 60 : 16),
    facing: d.facing !== undefined ? d.facing : (d.side === 'egypt' ? -PI / 2 : PI), spread: 1, then: null, aiPhase: null, lastHit: -99
  }));
  byId = {}; formations.forEach(f => byId[f.id] = f);
}
function applyOrder(o) {
  const f = byId[o.id]; if (!f) return;
  if (o.visible !== undefined) { f.known = o.visible; if (o.visible) f.present = true; }
  if (o.at) { f.x = o.at.x; f.y = o.at.y; }
  if (o.to) { f.tx = o.to.x; f.ty = o.to.y; f.state = o.state || 'move'; } else if (o.state) f.state = o.state;
  if (o.speed) f.speed = o.speed;
  if (o.strength !== undefined) { f.strength = o.strength; f.strengthTarget = null; }
  if (o.strengthTo !== undefined) { f.strengthTarget = o.strengthTo; f.strengthRate = Math.abs(f.strength - o.strengthTo) / (o.over || 5); }
  if (o.spread) f.spread = o.spread;
  f.then = o.then || null;
}
function moveFormation(f) {
  if (!alive(f)) return;
  if (f.strengthTarget !== null) {
    const d = f.strengthTarget - f.strength, step = f.strengthRate * DT;
    if (Math.abs(d) <= step) { f.strength = f.strengthTarget; f.strengthTarget = null; } else f.strength += Math.sign(d) * step;
  }
  if (f.state === 'hold' || f.state === 'loot' || f.state === 'scattered') return;
  const dx = f.tx - f.x, dy = f.ty - f.y, d = Math.hypot(dx, dy);
  const sp = f.speed * (f.state === 'rout' ? 1.25 : 1) * DT;
  if (d > 2) { f.x += dx / d * Math.min(sp, d); f.y += dy / d * Math.min(sp, d); f.facing = Math.atan2(dy, dx); }
  else {
    if (f.then) { f.state = f.then; f.then = null; }
    else if (f.state === 'rout') f.state = mode === 'command' ? 'withdrawn' : 'scattered';
    else if (f.state === 'move') f.state = 'hold';
  }
}

/* ---------------- watch mode ---------------- */
function fireEvent(ev) {
  currentEvent = ev; ev.orders.forEach(applyOrder);
  if (cam.follow && ev.focus) focusOn(ev.focus.x, ev.focus.y);
  caption(ev.title, ev.text, ev.tag, !fastForward);
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
  if (currentEvent) caption(currentEvent.title, currentEvent.text, currentEvent.tag, true);
  updatePauseBtn(); $('clock').textContent = fmtTime(simTime); render();
  if (currentEvent && currentEvent.end) endWatch();
}

/* ---------------- command mode ---------------- */
function stepCommand() {
  const A = S.ai.hittite;
  if (!aiFlags.start) { aiFlags.start = true; S.events[0].orders.forEach(o => { if (byId[o.id].side === 'egypt') applyOrder(o); }); }
  if (!aiFlags.inf && simTime >= A.infantryShift.t) { aiFlags.inf = true; applyOrder({ id: 'hit-inf', to: A.infantryShift.to }); applyOrder({ id: 'muwatalli', to: A.kingShift.to }); caption('Captured scouts', 'Two Hittite scouts confess: the enemy army is behind the city. You now command the Egyptian army. Re and Ptah are still on the road; the Hittites will move first.', 'egyptian', true); }
  if (!aiFlags.w1 && simTime >= A.firstWave.t) { aiFlags.w1 = true; caption('Movement across the river', 'Dust rises south of the city. Something is crossing the Orontes.', 'reconstruction', true); if (cam.follow) focusOn(1450, 1060); ['hit-char-a', 'hit-char-b', 'hit-char-c'].forEach((id, i) => { const f = byId[id]; f.tx = A.firstWave.cross[i].x; f.ty = A.firstWave.cross[i].y; f.state = 'move'; f.speed = 60; f.aiPhase = 'cross'; }); }
  if (!aiFlags.w2 && simTime >= A.secondWave.t) { aiFlags.w2 = true; const f = byId['hit-char2']; f.tx = A.secondWave.cross.x; f.ty = A.secondWave.cross.y; f.state = 'move'; f.aiPhase = 'cross'; }
  if (!aiFlags.nearin && simTime >= 62) { aiFlags.nearin = true; applyOrder({ id: 'nearin', visible: true, at: { x: 60, y: 560 }, to: { x: 880, y: 480 }, speed: 50 }); caption('The Ne’arin arrive', 'A fresh Egyptian force appears from the west. It is under your command.', 'egyptian', true); }
  const egy = formations.filter(f => f.side === 'egypt' && alive(f) && f.state !== 'rout');
  formations.forEach(f => {
    if (f.side !== 'hittite' || !f.ai || !alive(f) || f.state === 'rout') return;
    if (f.aiPhase === 'cross') { if (Math.hypot(f.tx - f.x, f.ty - f.y) < 6) f.aiPhase = 'hunt'; else return; }
    if (f.aiPhase === 'hunt') {
      let best = null, bd = A.huntRange; egy.forEach(e => { const d = dist(e, f); if (d < bd) { bd = d; best = e; } });
      if (best) { f.tx = best.x; f.ty = best.y; f.state = 'attack'; } else { f.tx = A.holdPoint.x; f.ty = A.holdPoint.y; f.state = 'move'; }
    }
  });
  const inf = byId['hit-inf'];
  if (alive(inf) && inf.state !== 'rout') {
    let best = null, bd = A.infantryReact; egy.forEach(e => { if (e.x > riverXAt(e.y) + 30) { const d = dist(e, inf); if (d < bd) { bd = d; best = e; } } });
    if (best) { inf.tx = best.x; inf.ty = best.y; inf.state = 'attack'; inf.aiPhase = 'engaged'; }
    else if (inf.aiPhase === 'engaged') { inf.aiPhase = null; inf.tx = A.infantryShift.to.x; inf.ty = A.infantryShift.to.y; inf.state = 'move'; }
  }
  formations.forEach(moveFormation); combat(); fog(); checkEnd();
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
    else if (f.strength < 25 && f.state !== 'rout') { f.state = 'rout'; const r = S.sides[f.side].rally; f.tx = r.x; f.ty = r.y; f.spread = 2.4; f.then = 'withdrawn'; addLog(f.name + ' routs'); if (f.side === 'egypt') { caption('A formation breaks', f.name + ' has routed and is fleeing the field.', 'reconstruction', true); if (cam.follow) focusOn(f.x, f.y); } }
  });
}
function fog() {
  const egy = formations.filter(f => f.side === 'egypt' && alive(f));
  formations.forEach(f => { if (f.side === 'hittite' && !f.known && alive(f) && egy.some(e => dist(e, f) < S.ai.spotRange)) { f.known = true; addLog('Enemy spotted: ' + f.name); caption('Enemy sighted', f.name + ' has been spotted.', 'reconstruction', true); if (cam.follow) focusOn(f.x, f.y); } });
}
function checkEnd() {
  if (battleOver || simTime < 25) return;
  const hc = formations.filter(f => f.side === 'hittite' && f.ai), eg = formations.filter(f => f.side === 'egypt' && f.id !== 'seth-inf');
  if (hc.every(f => !alive(f))) battleOver = 'victory';
  else if (eg.every(f => !alive(f) || f.state === 'rout')) battleOver = 'defeat';
  else if (simTime >= S.commandDuration) battleOver = 'stalemate';
  if (battleOver) { paused = true; updatePauseBtn(); showDebrief(); }
}

/* ---------------- rendering ---------------- */
function resize() {
  const r = panel.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(r.width * dpr)); canvas.height = Math.max(1, Math.floor(r.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); view.w = r.width; view.h = r.height; clampView(); render();
}
function clampView() { view.x = clamp(view.x, 0, Math.max(0, W.w - view.w / view.z)); view.y = clamp(view.y, 0, Math.max(0, W.h - view.h / view.z)); }
function focusOn(x, y) { cam.tx = x; cam.ty = y; }
function updateCamera() {
  if (cam.tx === null) return;
  const gx = clamp(cam.tx - view.w / view.z / 2, 0, Math.max(0, W.w - view.w / view.z)), gy = clamp(cam.ty - view.h / view.z / 2, 0, Math.max(0, W.h - view.h / view.z));
  view.x += (gx - view.x) * .08; view.y += (gy - view.y) * .08;
  if (Math.abs(gx - view.x) < .5 && Math.abs(gy - view.y) < .5) { view.x = gx; view.y = gy; cam.tx = null; }
}
function drawFormation(c, f) {
  if (!f.present || f.state === 'withdrawn' || f.state === 'destroyed') return;
  if (!f.known && mode === 'command') return;
  const concealed = !f.known;
  c.save(); if (concealed) c.globalAlpha = .5;
  const SS = 1.3, sx = (f.type === 'chariot' ? 30 : 13) * SS, sy = (f.type === 'chariot' ? 21 : 12) * SS, n = f.cols * f.rows;
  const cos = Math.cos(f.facing), sin = Math.sin(f.facing), shown = Math.ceil(n * Math.max(.15, f.strength / 100));
  const moving = f.state === 'move' || f.state === 'attack' || f.state === 'rout', scatter = f.state === 'rout' || f.state === 'scattered';
  const pts = [];
  for (let i = 0; i < n; i++) {
    if (i >= shown) continue;
    const col = i % f.cols, row = Math.floor(i / f.cols);
    let d = -(row - (f.rows - 1) / 2) * sy + (jitter(i, 1) - .5) * 5 * f.spread, a = (col - (f.cols - 1) / 2) * sx + (jitter(i, 2) - .5) * 5 * f.spread;
    if (moving) a += Math.sin(wall * 7 + i) * .9;
    pts.push({ x: f.x + cos * d - sin * a, y: f.y + sin * d + cos * a, i, fac: f.facing + (scatter ? (jitter(i, 3) - .5) * 1.4 : 0) });
  }
  pts.sort((p, q) => p.y - q.y).forEach(p => drawSprite(c, f, p.x, p.y, p.fac, p.i, SS));
  // standard
  const bx = f.x - cos * ((f.rows / 2) * sy + 4), by = f.y - sin * ((f.rows / 2) * sy + 4);
  c.strokeStyle = '#3b2c1a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx, by - 16); c.stroke();
  c.fillStyle = SIDE_ART[f.side].pennant; c.beginPath(); c.moveTo(bx, by - 16); c.lineTo(bx + 11, by - 13); c.lineTo(bx, by - 9); c.closePath(); c.fill();
  c.strokeStyle = SIDE_ART[f.side].trim; c.lineWidth = .8; c.stroke();
  // label + strength
  const half = (f.rows / 2) * sy + 10, ly = f.y + Math.max(half, (f.cols / 2) * sx * Math.abs(sin) + 8) + 6;
  const suffix = f.state === 'rout' ? ' · routed' : f.state === 'scattered' ? ' · scattered' : f.state === 'loot' ? ' · plundering' : concealed ? ' · concealed' : '';
  outlined(c, f.division + suffix, f.x, ly, 11, { fill: f.side === 'egypt' ? '#dceeff' : '#ffe1d6' });
  if (f.strength < 100 || selected.has(f.id) || simTime - f.lastHit < 1) {
    c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(f.x - 22, ly + 8, 44, 5);
    c.fillStyle = f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'; c.fillRect(f.x - 21, ly + 9, 42 * f.strength / 100, 3);
  }
  if (selected.has(f.id)) { c.strokeStyle = '#fff2a4'; c.lineWidth = 2; c.setLineDash([6, 4]); c.beginPath(); c.ellipse(f.x, f.y, (f.cols / 2) * sx + 14, (f.rows / 2) * sy + 14, f.facing + PI / 2, 0, PI * 2); c.stroke(); c.setLineDash([]); }
  if (mode === 'command' && selected.has(f.id) && f.state === 'move') { c.strokeStyle = 'rgba(255,242,164,.6)'; c.lineWidth = 1.5; c.setLineDash([4, 6]); c.beginPath(); c.moveTo(f.x, f.y); c.lineTo(f.tx, f.ty); c.stroke(); c.setLineDash([]); c.beginPath(); c.arc(f.tx, f.ty, 6, 0, PI * 2); c.stroke(); }
  c.restore();
}
function render() {
  updateCamera(); clampView();
  const z = view.z;
  ctx.clearRect(0, 0, view.w, view.h);
  ctx.save(); ctx.scale(z, z); ctx.translate(-view.x, -view.y);
  const vw = view.w / z, vh = view.h / z;
  if (TER) ctx.drawImage(TER, view.x * TS, view.y * TS, vw * TS, vh * TS, view.x, view.y, vw, vh);
  formations.slice().sort((a, b) => a.y - b.y).forEach(f => drawFormation(ctx, f));
  markers.forEach(m => {
    const r = 26 + 8 * Math.sin(wall * 3); ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(m.x, m.y, r, 0, PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,211,107,.4)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(m.x, m.y, r + 8, 0, PI * 2); ctx.stroke();
    outlined(ctx, m.label, m.x, m.y - r - 16, 14, { fill: '#fff3c9' });
  });
  ctx.restore();
  // scale bar
  const sb = B.scale.px * z; ctx.fillStyle = 'rgba(9,23,32,.8)'; const sy0 = mode === 'watch' ? view.h - 42 : view.h - 12;
  ctx.fillRect(view.w - sb - 24, sy0 - 20, sb + 16, 20);
  ctx.fillStyle = '#e9c77a'; ctx.fillRect(view.w - sb - 16, sy0 - 7, sb, 3); ctx.font = '10px system-ui'; ctx.fillStyle = '#e8f0ea'; ctx.textAlign = 'right'; ctx.fillText(B.scale.label, view.w - 16, sy0 - 10);
  drawMini();
}
function buildMiniBase() {
  MINIBASE = document.createElement('canvas'); MINIBASE.width = mini.width; MINIBASE.height = mini.height;
  MINIBASE.getContext('2d').drawImage(TER, 0, 0, mini.width, mini.height);
}
function drawMini() {
  const w = mini.width, h = mini.height, sx = w / W.w, sy = h / W.h;
  mctx.drawImage(MINIBASE, 0, 0);
  formations.forEach(f => { if (!f.present || !alive(f)) return; if (!f.known && mode === 'command') return; mctx.globalAlpha = f.known ? 1 : .45; mctx.fillStyle = SIDE_ART[f.side].pennant; mctx.strokeStyle = '#fff'; mctx.lineWidth = .8; mctx.beginPath(); mctx.arc(f.x * sx, f.y * sy, f.type === 'chariot' ? 3.6 : 3, 0, PI * 2); mctx.fill(); mctx.stroke(); });
  mctx.globalAlpha = 1; mctx.strokeStyle = '#ff3030'; mctx.lineWidth = 2.5; mctx.strokeRect(view.x * sx, view.y * sy, view.w / view.z * sx, view.h / view.z * sy);
}

/* ---------------- narration (voice) ---------------- */
const Narr = {
  on: false, audio: null,
  speak(text, file) {
    this.stop(); if (!this.on) return;
    if (file) { this.audio = new Audio(file); this.audio.play().catch(() => this.tts(text)); return; }
    this.tts(text);
  },
  tts(text) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text); u.rate = .92; u.pitch = .85;
    const vs = speechSynthesis.getVoices(), pref = vs.find(v => /en.(GB|UK)/i.test(v.lang) && /male|daniel|george|arthur/i.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || vs[0];
    if (pref) u.voice = pref; speechSynthesis.speak(u);
  },
  stop() { if (this.audio) { this.audio.pause(); this.audio = null; } if ('speechSynthesis' in window) speechSynthesis.cancel(); },
  pause(p) { if ('speechSynthesis' in window) { p ? speechSynthesis.pause() : speechSynthesis.resume(); } if (this.audio) { p ? this.audio.pause() : this.audio.play(); } },
  toggle() { this.on = !this.on; $('voiceBtn').textContent = this.on ? '🔊 Voice on' : '🔇 Voice off'; $('voiceBtn').classList.toggle('active', this.on); if (!this.on) this.stop(); else if (mode === 'intro') speakSlide(S.intro[introIdx]); else if (currentEvent) this.speak(currentEvent.text, currentEvent.audio); }
};
function speakSlide(sl) { Narr.speak(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' '), sl.audio); }

/* ---------------- UI: captions, log, panels ---------------- */
function caption(title, text, tag, speak) {
  $('capTitle').textContent = title; $('capText').textContent = text; $('capTag').innerHTML = tagChip(tag);
  $('caption').classList.add('show');
  if (speak) { Narr.speak(text, currentEvent && currentEvent.text === text ? currentEvent.audio : undefined); }
}
let log = [];
function addLog(s) { log.unshift(s); log = log.slice(0, 8); $('log').innerHTML = log.map(l => `<div>${l}</div>`).join(''); }
function fmtTime(t) { return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`; }
function renderSelection() {
  const box = $('selection');
  if (!selected.size) { box.innerHTML = '<p class="muted">Click a formation on the map to see who they are.</p>'; return; }
  box.innerHTML = [...selected].map(id => { const f = byId[id]; return `<div class="sel"><b style="color:${f.side === 'egypt' ? '#9fc8ff' : '#ffb3a7'}">${f.name}</b><div class="tiny">${f.type} · ${f.count} ${tagChip(f.confidence)}</div><div class="bar"><i style="width:${f.strength}%;background:${f.strength > 50 ? '#5fcf8a' : f.strength > 25 ? '#e9c77a' : '#ff6b5a'}"></i></div><div class="tiny">State: ${f.state}</div><p class="note">${f.note}</p></div>`; }).join('');
}
function renderTimeline() {
  const tl = $('timeline'); if (!tl) return;
  tl.innerHTML = S.events.map(e => `<button class="tick${currentEvent === e ? ' on' : ''}" style="left:${e.t / S.duration * 100}%" data-t="${e.t}" title="${fmtTime(e.t)} ${e.title}"></button>`).join('') + `<i id="tlNow" style="left:${simTime / S.duration * 100}%"></i>`;
  tl.querySelectorAll('.tick').forEach(b => b.onclick = ev => { ev.stopPropagation(); jumpTo(+b.dataset.t); });
  $('eventList').innerHTML = S.events.map(e => `<button class="ev${currentEvent === e ? ' on' : ''}" data-t="${e.t}"><span>${fmtTime(e.t)}</span> ${e.title}</button>`).join('');
  $('eventList').querySelectorAll('.ev').forEach(b => b.onclick = () => jumpTo(+b.dataset.t));
}
function renderArmies() {
  const units = [
    { side: 'egypt', type: 'chariot', name: 'Egyptian chariot', desc: 'Two crew: driver and archer. Light, fast, built to shoot on the move.', tag: 'established' },
    { side: 'egypt', type: 'infantry', name: 'Egyptian spearman', desc: 'Spear, tall shield, bronze axe or khopesh sword. Fights in close ranks.', tag: 'established' },
    { side: 'egypt', type: 'archers', name: 'Egyptian archer', desc: 'Composite bow. Egypt’s infantry mixed archers with spearmen.', tag: 'established' },
    { side: 'hittite', type: 'chariot', name: 'Hittite chariot', desc: 'Three crew: driver, shield bearer, spearman. Heavier, built for shock.', tag: 'established' },
    { side: 'hittite', type: 'infantry', name: 'Hittite spearman', desc: 'Spear and shield, crested helmet. Never crossed the river at Kadesh.', tag: 'egyptian' },
    { side: 'hittite', type: 'archers', name: 'Allied archer', desc: 'Drawn from Muwatalli’s vassals and allies.', tag: 'reconstruction' }
  ];
  $('armies').innerHTML = units.map((u, i) => `<div class="ucard"><canvas id="uc${i}" width="84" height="60"></canvas><div><b style="color:${u.side === 'egypt' ? '#9fc8ff' : '#ffb3a7'}">${u.name}</b><div class="tiny">${u.desc}</div>${tagChip(u.tag)}</div></div>`).join('');
  units.forEach((u, i) => { const c = $('uc' + i).getContext('2d'); c.fillStyle = '#c0ad75'; c.fillRect(0, 0, 84, 60); drawSprite(c, { side: u.side, type: u.type, state: 'hold' }, u.type === 'chariot' ? 30 : 32, 30, 0, 1, u.type === 'chariot' ? 2.1 : 3.2); });
}
function renderBriefing() {
  $('briefMeta').innerHTML = `<b>${S.date}</b> · ${S.place}<br>${S.tagline}`;
  $('confKey').innerHTML = Object.keys(S.confidence).map(k => `<div class="keyrow">${tagChip(k)}<span>${S.confidence[k].desc}</span></div>`).join('');
  $('sources').innerHTML = S.sources.map(s => `<li><b>${s.title}</b> — ${s.note}</li>`).join('');
}

/* ---------------- overlays: intro, debrief, explain ---------------- */
function showOverlay(id) { $(id).classList.add('show'); }
function hideOverlay(id) { $(id).classList.remove('show'); }
function showIntro(i) {
  introIdx = clamp(i, 0, S.intro.length - 1); const sl = S.intro[introIdx]; introTimer = 0;
  $('introKicker').textContent = `Historical introduction · ${introIdx + 1} / ${S.intro.length}`;
  $('introTitle').textContent = sl.title; $('introSub').textContent = sl.subtitle || '';
  $('introLines').innerHTML = sl.lines.map(l => `<p>${l.text} ${tagChip(l.tag)}</p>`).join('');
  $('introNav').style.display = sl.choice ? 'none' : 'flex'; $('introChoice').style.display = sl.choice ? 'flex' : 'none';
  $('introBack').disabled = introIdx === 0; $('introBar').style.width = '0%';
  markers = sl.markers || []; if (sl.focus) focusOn(sl.focus.x, sl.focus.y);
  speakSlide(sl);
}
function startIntro() { mode = 'intro'; resetSim(); markers = []; introPaused = false; $('introPause').textContent = 'Ⅱ Pause'; setModeButtons(); hideOverlay('debrief'); showOverlay('intro'); $('caption').classList.remove('show'); showIntro(0); }
function startMode(m) {
  mode = m; markers = []; hideOverlay('intro'); hideOverlay('debrief'); hideOverlay('explain'); Narr.stop();
  resetSim(); paused = false; cam.follow = true; updatePauseBtn(); setModeButtons();
  document.body.dataset.mode = m;
  if (m === 'watch') { caption(S.events[0].title, S.events[0].text, S.events[0].tag, false); }
  else { caption('Command mode', 'You lead the Egyptian army. Click a formation, then right-click where it should go. Shift-click adds to the selection. The Hittite army is hidden until your troops sight it.', 'reconstruction', true); focusOn(1100, 600); }
  renderTimeline(); renderSelection();
}
function resetSim() { createFormations(); simTime = 0; acc = 0; eventIndex = 0; currentEvent = null; aiFlags = {}; battleOver = null; selected.clear(); log = []; $('log').innerHTML = ''; renderSelection(); renderTimeline(); }
function setModeButtons() { $('watchBtn').classList.toggle('active', mode === 'watch'); $('commandBtn').classList.toggle('active', mode === 'command'); $('introBtn').classList.toggle('active', mode === 'intro'); document.body.dataset.mode = mode; }
function updatePauseBtn() { $('pauseBtn').textContent = paused ? '▶ Resume' : 'Ⅱ Pause'; }
function togglePause() { if (mode === 'intro') { introPaused = !introPaused; $('introPause').textContent = introPaused ? '▶ Resume' : 'Ⅱ Pause'; Narr.pause(introPaused); return; } if (battleOver) return; paused = !paused; updatePauseBtn(); Narr.pause(paused); }
function showDebrief() {
  Narr.stop(); const d = $('debrief');
  let head, body;
  if (battleOver === 'history') { head = 'What the sources say happened next'; body = ''; }
  else {
    const txt = { victory: 'You broke the Hittite chariot force. Every chariot group that crossed the river was destroyed or driven off.', defeat: 'The Egyptian army has been scattered. Ramesses would have fled or fallen with it.', stalemate: 'Night falls with both armies still in the field: much as it did in 1274 BCE.' }[battleOver];
    const rows = formations.filter(f => f.known || f.side === 'egypt').map(f => `<tr><td style="color:${f.side === 'egypt' ? '#9fc8ff' : '#ffb3a7'}">${f.name}</td><td>${f.state}</td><td>${Math.round(f.strength)}%</td></tr>`).join('');
    head = { victory: 'Egyptian victory', defeat: 'Egyptian defeat', stalemate: 'Stalemate' }[battleOver];
    body = `<p class="lead">${txt}</p><p class="muted">Your battle is a what-if simulation. Nothing about it is a claim about what really happened. Compare it with the historical outcome below.</p><div class="tablewrap"><table><tr><th>Formation</th><th>State</th><th>Strength</th></tr>${rows}</table></div>`;
  }
  $('debriefTitle').textContent = head;
  $('debriefBody').innerHTML = body + '<h4>The historical outcome</h4>' + S.outcome.map(l => `<p>${l.text} ${tagChip(l.tag)}</p>`).join('');
  if (Narr.on && battleOver === 'history') Narr.speak(S.outcome.map(l => l.text).join(' '));
  showOverlay('debrief');
}
function showExplain() {
  const ev = currentEvent; if (!ev || !ev.explain) return;
  if (!paused) togglePause(); $('explainTitle').textContent = ev.title; $('explainBody').textContent = ev.explain; showOverlay('explain');
  Narr.speak(ev.explain);
}

/* ---------------- input ---------------- */
function toWorld(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / view.z + view.x, y: (e.clientY - r.top) / view.z + view.y }; }
function manualCamera() { cam.tx = null; cam.follow = false; $('followBtn').classList.remove('active'); }
function pickFormation(p) {
  let best = null, bd = 1e9;
  formations.forEach(f => { if (!alive(f) || (!f.known && mode === 'command')) return; const r = Math.max(f.cols, f.rows) * (f.type === 'chariot' ? 15 : 7) + 14; const d = dist(f, p); if (d < r && d < bd) { bd = d; best = f; } });
  return best;
}
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointerdown', e => {
  last = { x: e.clientX, y: e.clientY }; dragMoved = false;
  if (e.button === 0) { dragging = true; canvas.setPointerCapture(e.pointerId); }
  if (e.button === 2 && mode === 'command' && selected.size) {
    const p = toWorld(e); let k = 0;
    selected.forEach(id => { const f = byId[id]; if (!alive(f) || f.state === 'rout') return; f.tx = clamp(p.x + (k % 3 - 1) * 70, 20, W.w - 20); f.ty = clamp(p.y + Math.floor(k / 3) * 60, 20, W.h - 20); f.state = 'move'; k++; });
    addLog('Orders issued');
  }
});
canvas.addEventListener('pointermove', e => {
  if (!dragging) return; const dx = e.clientX - last.x, dy = e.clientY - last.y;
  if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
  if (dragMoved) { view.x -= dx / view.z; view.y -= dy / view.z; clampView(); manualCamera(); last = { x: e.clientX, y: e.clientY }; }
});
canvas.addEventListener('pointerup', e => {
  if (dragging && !dragMoved && e.button === 0) {
    const f = pickFormation(toWorld(e));
    if (!e.shiftKey) selected.clear();
    if (f) { if (mode === 'command' && f.side !== 'egypt') { selected.clear(); selected.add(f.id); } else selected.add(f.id); }
    renderSelection();
  }
  dragging = false;
});
canvas.addEventListener('wheel', e => {
  e.preventDefault(); const r = canvas.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
  const wx = mx / view.z + view.x, wy = my / view.z + view.y, z2 = clamp(view.z * (e.deltaY < 0 ? 1.15 : 1 / 1.15), .45, 2.4);
  view.z = z2; view.x = wx - mx / z2; view.y = wy - my / z2; clampView(); manualCamera();
}, { passive: false });
mini.addEventListener('click', e => { const r = mini.getBoundingClientRect(); view.x = (e.clientX - r.left) / r.width * W.w - view.w / view.z / 2; view.y = (e.clientY - r.top) / r.height * W.h - view.h / view.z / 2; clampView(); manualCamera(); });
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
  const k = e.key.toLowerCase(); let moved = false; const st = 40 / view.z;
  if (['arrowleft', 'a'].includes(k)) { view.x -= st; moved = true; } if (['arrowright', 'd'].includes(k)) { view.x += st; moved = true; }
  if (['arrowup', 'w'].includes(k)) { view.y -= st; moved = true; } if (['arrowdown', 's'].includes(k)) { view.y += st; moved = true; }
  if (moved) { e.preventDefault(); clampView(); manualCamera(); }
  if (k === ' ') { e.preventDefault(); togglePause(); }
  if (k === 'f') { cam.follow = true; $('followBtn').classList.add('active'); if (currentEvent && currentEvent.focus) focusOn(currentEvent.focus.x, currentEvent.focus.y); }
  if (k === 'e') showExplain();
  if (k === '+' || k === '=') { view.z = clamp(view.z * 1.15, .45, 2.4); clampView(); } if (k === '-') { view.z = clamp(view.z / 1.15, .45, 2.4); clampView(); }
  if (mode === 'intro') { if (k === 'arrowright' || k === 'enter') showIntro(introIdx + 1); if (k === 'arrowleft') showIntro(introIdx - 1); }
});

/* ---------------- buttons ---------------- */
$('introBtn').onclick = startIntro;
$('watchBtn').onclick = () => startMode('watch');
$('commandBtn').onclick = () => startMode('command');
$('pauseBtn').onclick = togglePause;
$('resetBtn').onclick = () => { if (mode === 'intro') startIntro(); else startMode(mode); };
$('speedSel').onchange = e => speed = +e.target.value;
$('followBtn').onclick = () => { cam.follow = !cam.follow; $('followBtn').classList.toggle('active', cam.follow); if (cam.follow && currentEvent && currentEvent.focus) focusOn(currentEvent.focus.x, currentEvent.focus.y); };
$('explainBtn').onclick = showExplain;
$('voiceBtn').onclick = () => Narr.toggle();
$('zoomIn').onclick = () => { view.z = clamp(view.z * 1.2, .45, 2.4); clampView(); };
$('zoomOut').onclick = () => { view.z = clamp(view.z / 1.2, .45, 2.4); clampView(); };
$('introNext').onclick = () => showIntro(introIdx + 1);
$('introBack').onclick = () => showIntro(introIdx - 1);
$('introPause').onclick = togglePause;
$('introSkip').onclick = () => showIntro(S.intro.length - 1);
$('chooseWatch').onclick = () => startMode('watch');
$('chooseCommand').onclick = () => startMode('command');
$('explainClose').onclick = () => { hideOverlay('explain'); Narr.stop(); if (paused && !battleOver) togglePause(); };
$('debriefWatch').onclick = () => startMode('watch');
$('debriefCommand').onclick = () => startMode('command');
$('debriefIntro').onclick = startIntro;
$('selectAll').onclick = () => { selected.clear(); formations.forEach(f => { if (f.side === 'egypt' && alive(f) && f.state !== 'rout') selected.add(f.id); }); renderSelection(); };
$('haltBtn').onclick = () => { selected.forEach(id => { const f = byId[id]; if (f.state === 'move' || f.state === 'attack') { f.state = 'hold'; } }); };
$('retreatBtn').onclick = () => { const r = B.camp; selected.forEach((id, i) => { const f = byId[id]; if (!alive(f) || f.state === 'rout') return; f.tx = r.x + 60 + (i % 3) * 60; f.ty = r.y + 60; f.state = 'move'; }); };

/* ---------------- main loop ---------------- */
function tick(t) {
  if (!lastFrame) lastFrame = t; const dt = Math.min(.1, (t - lastFrame) / 1000); lastFrame = t; wall += dt;
  if (mode === 'intro') {
    const sl = S.intro[introIdx];
    if (!introPaused && !sl.choice) { introTimer += dt; $('introBar').style.width = Math.min(100, introTimer / sl.auto * 100) + '%'; if (introTimer >= sl.auto) showIntro(introIdx + 1); }
  } else if (!paused && !battleOver) {
    acc += dt * speed;
    while (acc >= DT) { acc -= DT; simTime += DT; if (mode === 'watch') stepWatch(); else stepCommand(); }
    $('clock').textContent = fmtTime(simTime); const now = $('tlNow'); if (now) now.style.left = (simTime / S.duration * 100) + '%';
  }
  render(); requestAnimationFrame(tick);
}

/* ---------------- boot ---------------- */
TER = buildTerrain(); buildMiniBase(); renderBriefing(); renderArmies(); createFormations();
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {};
new ResizeObserver(resize).observe(panel); resize();
view.x = 700; view.y = 300; startIntro();
requestAnimationFrame(tick);
})();
