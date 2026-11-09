/* Battles of History: briefing marks for an introduction slide, shared by the battles' engines.
   A slide's `cues` list puts rings, arrows and unit boxes on the map when the narrator reaches a phrase, like a
   commander's briefing:
     { on: 'phrase spoken', delay: s, ring: { x, y, label, r, lx, ly, align } }
     { on: '…', arrow: { pts: [[x, y], ...], label, col, dx, dy, dash: false } }
     { on: '…', unit: { x, y, kind: 'inf' | 'armour' | 'airborne' | 'mech' | 'cav' | 'heli', side, col, size: 'I' | 'II' | 'III' | 'X' | 'XX' | 'XXX' | 'XXXX', label } }
   Positions are the map's world pixels. The phrase is matched against the closed caption on screen; with captions off,
   by how far the narration has got. A unit box's colour is `col`, or the side's colour from the engine (sideColor).
   Engine use:  const BR = window.BHBriefing.create({ P, outlined, sideColor: sd => '#…' });
     showIntro: BR.set(sl)      tick (intro): BR.update(sl, frac, done)      render (intro, after the map): BR.draw(ctx) */
(() => {
  'use strict';
  const PI = Math.PI;
  window.BHBriefing = {
    create(opt) {
      let cues = [], focus = false;   // focus (a slide's cueFocus): only the newest ring pulses; earlier ones stay, still and faint
      const now = () => performance.now() / 1000;
      const text = (c, s, x, y, size, align) => {
        if (opt.outlined) return opt.outlined(c, s, x, y, size, { fill: '#fff3c9', align: align || 'center' });
        c.save(); c.font = `bold ${size}px Georgia, serif`; c.textAlign = align || 'center'; c.textBaseline = 'middle'; c.lineWidth = 4; c.strokeStyle = 'rgba(20,16,8,.85)'; c.strokeText(s, x, y); c.fillStyle = '#fff3c9'; c.fillText(s, x, y); c.restore();
      };
      return {
        set(sl) { cues = ((sl && sl.cues) || []).map(q => Object.assign({}, q)); focus = !!(sl && sl.cueFocus); },
        clear() { cues = []; },
        update(sl, frac, done) {
          if (!cues.length || !sl) return;
          const cl = document.querySelector('.cl'), line = cl ? cl.textContent.toLowerCase() : '';
          const full = (sl.title + '. ' + (sl.lines || []).map(l => l.text).join(' ')).toLowerCase();
          cues.forEach(q => { if (q.t0 !== undefined) return; const ph = (q.on || '').toLowerCase(), pos = full.indexOf(ph), at = pos < 0 ? 0 : pos / full.length;
            if (done || (ph && line && line.includes(ph)) || frac >= at + (line ? .05 : 0)) q.t0 = now() + (q.delay || 0); });
        },
        draw(c) {
          const t = now(), P = opt.P; let newest = -1; if (focus) cues.forEach(q => { if (q.ring && q.t0 !== undefined && t >= q.t0 && q.t0 > newest) newest = q.t0; });
          cues.forEach(q => {
            if (q.t0 === undefined || t < q.t0) return; const age = t - q.t0;
            c.save(); c.globalAlpha = Math.min(1, age / .6);
            if (q.ring) { const R = q.ring, p = P(R.x, R.y), r0 = R.r || 22, live = !focus || q.t0 === newest, r = r0 * (live ? 1 + .2 * Math.sin(t * 3) : 1);
              if (!live) c.globalAlpha *= .45;
              c.strokeStyle = '#ffd36b'; c.lineWidth = live ? 3 : 2; c.beginPath(); c.arc(p.x, p.y, r, 0, PI * 2); c.stroke();
              if (live) { c.strokeStyle = 'rgba(255,211,107,.35)'; c.lineWidth = 8; c.beginPath(); c.arc(p.x, p.y, r + 7, 0, PI * 2); c.stroke(); }
              if (R.label) text(c, R.label, p.x + (R.lx || 0), p.y + (R.ly !== undefined ? R.ly : -r0 - 18), 14, R.align); }
            if (q.arrow) { const A = q.arrow, pts = A.pts.map(([x, y]) => P(x, y)), grow = Math.min(1, age / (A.secs || 1.8)), col = A.col || '#ffd36b';
              let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); seg.push(d); L += d; }
              let left = L * grow, tip = pts[0], ang = 0;
              c.strokeStyle = col; c.fillStyle = col; c.lineWidth = A.w || 5; c.lineCap = 'round'; c.lineJoin = 'round'; if (A.dash !== false) c.setLineDash([14, 9]);
              c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowBlur = 4; c.beginPath(); c.moveTo(pts[0].x, pts[0].y);
              for (let i = 1; i < pts.length && left > 0; i++) { const k = Math.min(1, left / seg[i - 1]), x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k, y = pts[i - 1].y + (pts[i].y - pts[i - 1].y) * k;
                c.lineTo(x, y); ang = Math.atan2(pts[i].y - pts[i - 1].y, pts[i].x - pts[i - 1].x); tip = { x, y }; left -= seg[i - 1]; }
              c.stroke(); c.setLineDash([]); const hs = (A.w || 5) * 3.6;
              c.beginPath(); c.moveTo(tip.x + Math.cos(ang) * hs * .55, tip.y + Math.sin(ang) * hs * .55); c.lineTo(tip.x + Math.cos(ang + 2.5) * hs, tip.y + Math.sin(ang + 2.5) * hs); c.lineTo(tip.x + Math.cos(ang - 2.5) * hs, tip.y + Math.sin(ang - 2.5) * hs); c.closePath(); c.fill(); c.shadowBlur = 0;
              if (A.label && grow > .5) { const m = A.at ? P(A.at[0], A.at[1]) : pts[Math.floor(pts.length / 2)]; text(c, A.label, m.x + (A.dx || 0), m.y + (A.dy !== undefined ? A.dy : -16), 13, A.align); } }
            if (q.unit) { const u = q.unit, p = P(u.x, u.y), w = u.w || 46, h = w * .65, x0 = p.x - w / 2, y0 = p.y - h / 2;
              c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 6; c.fillStyle = u.col || (opt.sideColor && opt.sideColor(u.side)) || '#3d7fd8'; c.fillRect(x0, y0, w, h); c.shadowBlur = 0;
              c.strokeStyle = '#f4f1e6'; c.lineWidth = 2; c.strokeRect(x0, y0, w, h); c.beginPath();
              const X = () => { c.moveTo(x0, y0); c.lineTo(x0 + w, y0 + h); c.moveTo(x0 + w, y0); c.lineTo(x0, y0 + h); };
              if (u.kind === 'armour') c.ellipse(p.x, p.y, w * .32, h * .26, 0, 0, PI * 2);
              else if (u.kind === 'mech') { X(); c.moveTo(p.x + w * .32, p.y); c.ellipse(p.x, p.y, w * .32, h * .26, 0, 0, PI * 2); }
              else if (u.kind === 'cav') { c.moveTo(x0, y0 + h); c.lineTo(x0 + w, y0); }
              else X();
              c.stroke();
              if (u.kind === 'airborne') { c.beginPath(); c.arc(p.x - 5, y0 + h - 2, 5, PI, 0); c.arc(p.x + 5, y0 + h - 2, 5, PI, 0); c.stroke(); }
              if (u.kind === 'heli') { c.beginPath(); c.moveTo(p.x - w * .3, y0 + h * .78); c.lineTo(p.x + w * .3, y0 + h * .78); c.moveTo(p.x, y0 + h * .78); c.lineTo(p.x, y0 + h * .58); c.stroke(); }   // air cavalry: a rotor over the cross
              if (u.kind === 'commando') { c.fillStyle = '#2f7a3a'; c.beginPath(); c.arc(p.x, y0 + h / 2, 6, 0, PI * 2); c.fill(); c.stroke(); }
              if (u.size) text(c, u.size, p.x, y0 - 8, 12);
              if (u.label) text(c, u.label, p.x + (u.lx || 0), y0 + h + 13 + (u.ly || 0), 13, u.align); }
            c.restore();
          });
        }
      };
    }
  };
})();
