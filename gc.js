// GoatCounter: privacy-friendly page counts (no cookies, no personal data).
// CODE is the moviequest.ca site code from goatcounter.com, e.g. "moviequest"
// for https://moviequest.goatcounter.com. Empty turns all counting off.
// That site must have "Allow adding visitor counts on your website" ticked
// for the homepage's Most Popular sort to read the numbers.
window.MQ_GOATCOUNTER = 'moviequest';

(function () {
  const code = window.MQ_GOATCOUNTER;
  if (!code) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  document.head.appendChild(s);
})();

// Count a click (e.g. "Buy on eBay") as an event, if counting is on.
window.mqCountClick = function (name, title) {
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({ path: name, title: title || name, event: true });
  }
};

// Page views of one movie page, or 0 if none / counting is off. GoatCounter
// records the path as visited, with or without the trailing slash, so both
// are added up.
window.mqViews = async function (itemId) {
  const code = window.MQ_GOATCOUNTER;
  if (!code) return 0;
  const one = async (path) => {
    try {
      const res = await fetch(`https://${code}.goatcounter.com/counter/${encodeURIComponent(path)}.json`);
      if (!res.ok) return 0;
      const data = await res.json();
      return Number(String(data.count || '0').replace(/[^\d]/g, '')) || 0;
    } catch (e) {
      return 0;
    }
  };
  const [a, b] = await Promise.all([one(`/movies/${itemId}/`), one(`/movies/${itemId}`)]);
  return a + b;
};

// Visit count, small in the bottom-left corner ("128 VISITS"), like roughdrafter.com. Hidden until GoatCounter
// answers. On a movie page (movies/<id>/) it shows that movie's own visits; everywhere else, every visit to the site.
(function () {
  const code = window.MQ_GOATCOUNTER;
  if (!code) return;
  const show = async () => {
    try {
      const m = location.pathname.match(/\/movies\/([^/]+)\/?(index\.html)?$/);
      let n;
      if (m && window.mqViews) n = String(await window.mqViews(m[1]) || '');
      else {
        const res = await fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`);
        if (!res.ok) return;
        const data = await res.json();
        n = String(data.count || '').trim();
      }
      if (!n || n === '0') return;
      const el = document.createElement('div');
      el.textContent = `${n} visits`;
      el.title = m ? 'Visits to this movie\u2019s page' : 'Visits to MovieQuest';
      el.style.cssText = 'position:fixed;left:10px;bottom:8px;z-index:50;pointer-events:none;' +
        'font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:0.6px;text-transform:uppercase;color:#8a8a8a;';
      document.body.appendChild(el);
    } catch (e) {}
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
  else show();
})();
