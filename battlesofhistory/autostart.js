/* The introduction flows straight into the reenactment. Take command is offered only by the Command button in the top bar.
   - When the intro reaches its end-of-intro choice (the Play button, its menu, or the older Watch / Command buttons),
     the reenactment starts at once: no choice, no countdown, and the choice slide's narration is not played.
   - The Play button goes straight to Watch; the after-action report's "Take command" buttons are hidden. The sides to
     command ("Play as …") appear only in the menu that the top-bar Command button opens.
   ?autostart=0 turns the automatic start off (the hidden command choices stay hidden).
   Shared by every battle: it reads the page's own buttons, so no engine changes are needed. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const watch = $('chooseWatch'); if (!watch) return;

  const css = document.createElement('style');
  css.textContent = `#chooseCommand,#chooseCommandH,[id^="chooseCommand"],#debriefCommand,.closemini[data-close="debrief-command"],
    #playMenu:not(.cmdpick) button:not(#pmWatch):not(#pmClose):not([id^="pmPart"]){display:none!important}
    #playMenu.cmdpick #pmWatch{display:none!important}`;
  document.head.appendChild(css);

  const go = () => {
    const pm = $('playMenu'); if (pm) pm.classList.remove('show', 'cmdpick');
    const pg = $('playGame'); if (pg) pg.classList.remove('show');
    watch.click();
  };
  // the big Play button: straight to the reenactment, never the menu of sides
  const pg = $('playGame'); if (pg) pg.addEventListener('click', e => { e.stopImmediatePropagation(); e.preventDefault(); go(); }, true);

  if (new URLSearchParams(location.search).get('autostart') === '0') return;
  const visible = el => {
    if (!el.isConnected || !el.getClientRects().length) return false;
    if (el.checkVisibility) return el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
    return !!el.offsetParent;
  };
  const triggers = ['pmWatch', 'playGame', 'chooseWatch'].map($).filter(Boolean);
  let fired = false;
  setInterval(() => {
    const shown = triggers.some(visible);
    if (!shown) { fired = false; return; }
    if (fired || document.hidden) return;
    fired = true; go();
  }, 250);
})();
