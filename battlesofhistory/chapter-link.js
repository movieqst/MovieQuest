/* Chapter links from the home page's small chapter cards: index.html?chapter=N opens the reenactment and jumps to
   chapter N (1 = the first chapter), by pressing the page's own Watch button and the chapter's button in the timeline.
   Shared by the battles whose cards carry chapters (battles.js `chapters`); no engine changes. */
(() => {
  'use strict';
  const n = parseInt(new URLSearchParams(location.search).get('chapter'), 10); if (!(n > 0)) return;
  const go = () => {
    const w = document.getElementById('watchBtn'); if (!w) return;
    w.click(); let k = 0;
    const iv = setInterval(() => {
      const evs = document.querySelectorAll('#eventList .ev');
      if (evs[n - 1]) { clearInterval(iv); evs[n - 1].click(); } else if (++k > 60) clearInterval(iv);
    }, 150);
  };
  if (document.readyState === 'complete') setTimeout(go, 600); else window.addEventListener('load', () => setTimeout(go, 600));
})();
