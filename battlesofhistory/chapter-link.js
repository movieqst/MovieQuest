/* Chapter links from the home page's small chapter cards (battles.js `chapters`):
     index.html?chapter=N            opens the reenactment and jumps to chapter N of the timeline (1 = the first)
     index.html?ev=Title             the same, finding the chapter by its title (safer on pages with several parts)
     index.html?part=Part&ev=Title   on pages with parts or a campaign stage, first picks the part whose button says Part
   It presses the page's own Watch button, part buttons and timeline buttons, so no engine changes are needed. */
(() => {
  'use strict';
  const q = new URLSearchParams(location.search), n = parseInt(q.get('chapter'), 10), ev = q.get('ev'), part = q.get('part');
  if (!(n > 0) && !ev) return;
  const norm = t => (t || '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');
  const go = () => {
    const w = document.getElementById('watchBtn'); if (!w) return;
    w.click(); let k = 0, partDone = !part;
    const iv = setInterval(() => {
      if (++k > 80) return clearInterval(iv);
      if (!partDone) {
        const b = [...document.querySelectorAll('#eventList .stagesel button, #eventList button[data-st], #eventList button[data-part]')].find(x => norm(x.textContent).includes(norm(part)));
        if (b) { if (!b.classList.contains('on')) b.click(); partDone = true; }
        else if (k > 10) partDone = true;   // no part buttons on this page
        return;
      }
      const evs = [...document.querySelectorAll('#eventList .ev')];
      const hit = ev ? evs.find(x => norm(x.textContent).includes(norm(ev))) : evs[n - 1];
      if (hit) { clearInterval(iv); hit.click(); }
    }, 150);
  };
  if (document.readyState === 'complete') setTimeout(go, 600); else window.addEventListener('load', () => setTimeout(go, 600));
})();
