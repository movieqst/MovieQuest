/* Chapter links from the home page's small chapter cards (battles.js `chapters`):
     index.html?chapter=N            opens the reenactment and jumps to chapter N of the timeline (1 = the first)
     index.html?ev=Title             the same, finding the chapter by its title
     index.html?part=Part&ev=Title   on pages in parts (Ia Drang: the "Part of the battle" menu), first picks that part
   On pages that open on a campaign stage (Waterloo, Stirling, Talas), a chapter not found there is looked for on the
   other stage (its "The battle" button). It presses the page's own buttons, so no engine changes are needed. */
(() => {
  'use strict';
  const q = new URLSearchParams(location.search), n = parseInt(q.get('chapter'), 10), ev = q.get('ev'), part = q.get('part');
  if (!(n > 0) && !ev) return;
  const norm = t => (t || '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');
  const go = () => {
    const w = document.getElementById('watchBtn'); if (!w) return;
    let k = 0, partDone = !part, tried = new Set(), wait = 0;
    if (part) {   // a page in parts: choose the part in its menu first (that starts the reenactment at that part)
      const ps = document.getElementById('partSel');
      const opt = ps && [...ps.options].find(o => norm(o.textContent).includes(norm(part)));
      if (opt) { ps.value = opt.value; ps.dispatchEvent(new Event('change')); w.click(); ps.value = opt.value; ps.dispatchEvent(new Event('change')); partDone = true; }
    }
    if (!part || partDone) w.click();
    const iv = setInterval(() => {
      if (++k > 100) return clearInterval(iv);
      if (wait > 0) { wait--; return; }
      if (!partDone) {
        const b = [...document.querySelectorAll('#eventList .stagesel button, #eventList button[data-st]')].find(x => norm(x.textContent).includes(norm(part)));
        if (b) { if (!b.classList.contains('on')) { b.click(); wait = 4; } partDone = true; }
        else if (k > 10) partDone = true;
        return;
      }
      const evs = [...document.querySelectorAll('#eventList .ev')];
      const hit = ev ? evs.find(x => norm(x.textContent).includes(norm(ev))) : evs[n - 1];
      if (hit) { clearInterval(iv); hit.click(); return; }
      if (evs.length && k > 6) {   // not on this stage: try the page's other stage buttons, one at a time
        const other = [...document.querySelectorAll('#eventList .stagesel button, #eventList button[data-st]')].find(x => !x.classList.contains('on') && !tried.has(x.textContent));
        if (other) { tried.add(other.textContent); other.click(); wait = 4; }
      }
    }, 150);
  };
  if (document.readyState === 'complete') setTimeout(go, 600); else window.addEventListener('load', () => setTimeout(go, 600));
})();
