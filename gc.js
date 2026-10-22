// GoatCounter: privacy-friendly page counts (no cookies, no personal data).
// CODE is the moviequest.ca site code from goatcounter.com, e.g. "moviequest"
// for https://moviequest.goatcounter.com. Empty turns all counting off.
// That site must have "Allow adding visitor counts on your website" ticked
// for the homepage's Most Popular sort to read the numbers.
window.MQ_GOATCOUNTER = '';

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

// Page views of one movie page, or 0 if none / counting is off.
window.mqViews = async function (itemId) {
  const code = window.MQ_GOATCOUNTER;
  if (!code) return 0;
  const p = encodeURIComponent(`/movies/${itemId}/`);
  try {
    const res = await fetch(`https://${code}.goatcounter.com/counter/${p}.json`);
    if (!res.ok) return 0;
    const data = await res.json();
    return Number(String(data.count || '0').replace(/[^\d]/g, '')) || 0;
  } catch (e) {
    return 0;
  }
};
