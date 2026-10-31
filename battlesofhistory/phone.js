/* Phone layout: the map fills the screen, a slim toolbar sits on top, the narration runs as subtitles (subtitles.js),
   and "From the record" shrinks to a small picture in the corner that opens full size on a tap. The intro and the
   reenactment only: Command mode, the minimap, the side panel and the log are left out. The armies stay one tap away.
   On by default on touch phones; ?phone=1 turns it on anywhere and ?phone=0 off (remembered in this browser).
   Shared by every battle and loaded before subtitles.js; it drives the page through its own buttons and window.BattlePage.setBig. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const BP = window.BattlePage; if (!$('battlePanel') || !BP) return;
  const setBig = BP.setBig, Narr = BP.Narr;
  const q = new URLSearchParams(location.search).get('phone');
  try { if (q === '1' || q === '0') localStorage.setItem('bh-phone', q); } catch (e) {}
  let pref = q; try { if (pref === null) pref = localStorage.getItem('bh-phone'); } catch (e) {}
  const phone = matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 600;
  if (!(pref === '1' || (pref !== '0' && phone))) return;
  document.body.classList.add('phone');

  const css = document.createElement('style');
  css.textContent = `
  body.phone header,body.phone .side,body.phone footer,body.phone #minimap-wrap,body.phone #fsBtn,body.phone #mapBtn,body.phone #artBtn,
  body.phone a.hud-home,body.phone #commandBtn,body.phone #chooseCommand,body.phone #chooseCommandH,body.phone #pmMacedon,body.phone #pmPersian,
  body.phone [id^="pmCommand"],body.phone #followBtn,body.phone #explainBtn,body.phone #resetBtn,body.phone #viewTextBtn{display:none!important}
  body.phone .battle-panel{top:40px!important}
  #phoneBar{position:fixed;left:0;right:0;top:0;height:40px;z-index:60;display:flex;align-items:center;gap:6px;padding:0 8px;background:#071017;border-bottom:1px solid #22343d;overflow-x:auto}
  #phoneBar b{font:600 12px 'Cinzel',Georgia,serif;color:var(--gold,#e9c77a);white-space:nowrap;margin-right:auto;overflow:hidden;text-overflow:ellipsis}
  #phoneBar button,#phoneBar a{flex:none;font-size:12px;padding:5px 9px;border-radius:6px;border:1px solid #35505c;background:#0f2634;color:#e8f0ea;text-decoration:none}
  #phoneBar .on{border-color:var(--gold,#e9c77a)}
  body.phone #fsMediaWrap{left:8px;right:auto;top:8px;width:min(34vw,150px);padding:4px;opacity:1;cursor:pointer}
  body.phone #fsMediaWrap h3,body.phone #fsMediaWrap .mcap,body.phone #fsMediaWrap .mref,body.phone #fsMediaWrap .thumbs{display:none}
  body.phone.photoopen #fsMediaWrap{width:calc(100% - 16px);max-height:calc(100% - 16px);overflow:auto;z-index:7}
  body.phone.photoopen #fsMediaWrap .mcap,body.phone.photoopen #fsMediaWrap .mref{display:block}
  body.phone .dialog.intro,body.phone .dialog{max-width:calc(100vw - 16px)}
  body.phone #zoomBox{bottom:auto;top:8px;right:8px;left:auto}
  body.phone #introNav button,body.phone #controls button,body.phone .hud button{font-size:11px;padding:4px 7px}
  @media (orientation:landscape){body.phone #subs{bottom:96px;padding:3px 10px 4px}body.phone #subs .sl{font-size:12px;min-height:0;-webkit-line-clamp:1}body.phone #subs .sh{display:none}
    body.phone #fsMediaWrap{width:min(22vw,130px)}}`;
  document.head.appendChild(css);

  const bar = document.createElement('div'); bar.id = 'phoneBar';
  const t = document.querySelector('header .brand');
  bar.innerHTML = `<b>${t ? t.textContent : ''}</b><a href="../index.html">◀</a><button data-b="introBtn">Intro</button><button data-b="watchBtn">▶ Watch</button><button data-b="voiceBtn" id="phoneVoice"></button>`;
  document.body.appendChild(bar);
  bar.querySelectorAll('button[data-b]').forEach(b => b.onclick = () => $(b.dataset.b) && $(b.dataset.b).click());
  const syncVoice = () => { const on = Narr.on; const v = $('phoneVoice'); v.textContent = on ? '🔊' : '🔇'; v.classList.toggle('on', on); };
  setInterval(syncVoice, 500); syncVoice();

  // "From the record": a small picture; a tap opens it full size with its caption and credit, another tap closes it.
  const fm = $('fsMediaWrap');
  if (fm) fm.addEventListener('click', e => { if (e.target.closest('button,a')) return; e.stopPropagation(); document.body.classList.toggle('photoopen'); }, true);

  const fit = () => { setBig(true); setTimeout(() => dispatchEvent(new Event('resize')), 80); };   // the globe sizes itself on resize
  fit(); addEventListener('orientationchange', () => setTimeout(fit, 300));
  // Leaving the full-map view is not possible on a phone: Escape and the fullscreen button are hidden, and the view is re-applied if anything turns it off.
  setInterval(() => { if (!document.body.classList.contains('bigmap')) setBig(true); }, 1000);
})();
