/* Starts the reenactment on its own when the intro has finished and nobody picks.
   When the end-of-intro choice is on screen (the Play button, its menu, or the older Watch / Command buttons) and the
   narrator has finished speaking, a 10-second timer runs. Any mouse movement, touch, scroll or key press starts the
   10 seconds again. For the last 5 seconds a small note under the button counts down; at zero the reenactment starts
   (Watch, never Take command). ?autostart=0 turns it off.
   Shared by every battle: it reads the page's own buttons, so no engine changes are needed. */
(() => {
  'use strict';
  if (new URLSearchParams(location.search).get('autostart') === '0') return;
  const WAIT = 10, SHOW = 5;
  const $ = id => document.getElementById(id);
  const watch = $('chooseWatch'); if (!watch) return;
  const triggers = ['pmWatch', 'playGame', 'chooseWatch'].map($).filter(Boolean);   // whichever of these is showing

  const css = document.createElement('style');
  css.textContent = `#autoNote{position:fixed;z-index:60;transform:translateX(-50%);padding:3px 10px;border-radius:12px;background:rgba(0,0,0,.75);
    color:#f4e6bd;font-size:12px;white-space:nowrap;pointer-events:none;display:none;box-shadow:0 1px 6px rgba(0,0,0,.5)}`;
  document.head.appendChild(css);
  const note = document.createElement('div'); note.id = 'autoNote'; document.body.appendChild(note);

  let idle = 0, last = performance.now(), fired = false;
  const visible = el => {
    if (!el.isConnected || !el.getClientRects().length) return false;
    if (el.checkVisibility) return el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
    return !!el.offsetParent;
  };
  // Still speaking: a clip is loaded and not finished (this includes the short lead-in before it plays), or the browser voice is talking.
  const speaking = () => {
    const N = window.BattlePage && window.BattlePage.Narr;
    if (N && N.on && N.audio && !N.audio.ended) return true;
    return 'speechSynthesis' in window && (speechSynthesis.speaking || speechSynthesis.pending);
  };
  const hideNote = () => { note.style.display = 'none'; };
  const reset = () => { idle = 0; hideNote(); };
  ['mousemove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'].forEach(t => window.addEventListener(t, reset, { passive: true, capture: true }));

  const tick = () => {
    const now = performance.now(), dt = (now - last) / 1000; last = now;
    const shown = triggers.find(visible);
    if (!shown) { fired = false; reset(); return; }
    if (fired || speaking() || document.hidden) { reset(); return; }
    idle += dt;
    const left = Math.ceil(WAIT - idle);
    if (left <= SHOW && left > 0) {
      const r = shown.getBoundingClientRect();
      note.textContent = 'Reenactment starts in ' + left + '…';
      note.style.left = (r.left + r.width / 2) + 'px'; note.style.top = (r.bottom + 6) + 'px'; note.style.display = 'block';
    }
    if (idle >= WAIT) {
      fired = true; hideNote();
      const pm = $('playMenu'); if (pm) pm.classList.remove('show', 'cmdpick');
      const pg = $('playGame'); if (pg) pg.classList.remove('show');
      watch.click();
    }
  };
  setInterval(tick, 250);
})();
