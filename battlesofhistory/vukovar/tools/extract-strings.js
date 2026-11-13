/* Vukovar (made from sixday/tools/extract-strings.js): list every English string on the page that is not narration (the armies' cards, map labels and markers,
   photo captions, the radio card, the library, the globe's names), for translation into lang/page-<code>.json "strings".
     node battlesofhistory/vukovar/tools/extract-strings.js > battlesofhistory/vukovar/lang/strings-en.json */
global.window = {}; const D = __dirname + '/../';
const fs = require('fs'); ['lines.js', 'scenario.js', 'borders.js'].forEach(f => fs.existsSync(D + f) && require(D + f));
const S = window.VUKOVAR_SCENARIO;
const KEYS = /^(text|label|name|short|army|division|note|desc|caption|credit|title|when|subtitle|sub|about|kind|citedIn|rights|linkLabel|author|year|dateNote|dateRef|place|sides|date|periodNote|todayNote|thenNote|heading|who|count)$/;
const SKIP = new Set(['intro', 'events', 'outcome', 'welcome', 'voices']); const out = new Set(), seen = new Set();
const walk = (o, top) => { if (!o || typeof o !== 'object' || seen.has(o)) return; seen.add(o);
  if (Array.isArray(o)) { if (o.length === 2 && typeof o[0] === 'number' && typeof o[1] === 'string') out.add(o[1]); else o.forEach(v => walk(v)); return; }
  Object.keys(o).forEach(k => { if (top && SKIP.has(k)) return; const v = o[k]; if (typeof v === 'string') { if (KEYS.test(k) && /[A-Za-z]/.test(v)) out.add(v); } else walk(v); }); };
walk(S, true);
// the chapters' own extras: markers, photos, radio (not the narration)
S.events.forEach(e => { ['markers', 'media', 'photo', 'radio'].forEach(k => walk(e[k])); }); S.intro.forEach(sl => ['markers', 'media'].forEach(k => walk(sl[k])));
S.outcome.forEach(l => walk(l.media)); walk(S.record);
walk(window.BATTLE_BORDERS); walk(window.VUKOVAR_LINES);
const list = [...out].filter(t => !/^(allied|french|town|area|dot)$/.test(t)).sort();
console.log(JSON.stringify(list, null, 1));
