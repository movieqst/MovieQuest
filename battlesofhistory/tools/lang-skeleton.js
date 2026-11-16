#!/usr/bin/env node
/* Every English text a battle page shows, in the shape a lang-xx.js needs (see ../lang.js), ready to translate.
     node tools/lang-skeleton.js vimy > vimy/lang/en-skeleton.json
   The narration and the lists (intro, events, outcome, formations, units, labels, library, sources...) come item by item;
   every other visible word (map legend, calendar, trench layers, globe, citations, the library's details) is listed
   under "strings" as { English: English }, to be translated value by value. */
const path = require('path');
const dir = path.resolve(__dirname, '..', process.argv[2]);
const S = require('./load-scenario.js')(dir);
const pick = (o, ks) => { const r = {}; ks.forEach(k => { if (o && typeof o[k] === 'string' && o[k]) r[k] = o[k]; }); return r; };
const cap = m => m && (typeof m === 'string' ? m : m.caption);
const SKIP = /^(id|key|side|kind|sprite|img|file|icon|type|color|colour|sheet|shape|tag|portrait|audio)$/;
const out = {
  title: S.title, date: S.date, place: S.place, tagline: S.tagline,
  titleCard: S.titleCard ? pick(S.titleCard, Object.keys(S.titleCard)) : undefined,
  confidence: S.confidence ? Object.fromEntries(Object.entries(S.confidence).map(([k, v]) => [k, { label: v.label, desc: v.desc }])) : undefined,
  sides: S.sides ? Object.fromEntries(Object.entries(S.sides).map(([k, v]) => [k, v.name])) : undefined,
  welcome: S.welcome,
  intro: (S.intro || []).map(s => ({ title: s.title, subtitle: s.subtitle, lines: (s.lines || []).map(l => l.text), media: (s.media || []).map(cap) })),
  events: (S.events || []).map(e => ({ title: e.title, clock: e.clock, partTitle: e.partTitle, text: e.text, explain: e.explain, media: e.media ? cap(e.media) : undefined, lines: e.lines ? e.lines.map(l => l.text) : undefined })),
  outcome: (S.outcome || []).map(o => o.heading ? { heading: o.heading, text: o.text } : o.text),
  commandLines: S.commandLines && Object.keys(S.commandLines).length ? S.commandLines : undefined,
  leaders: Object.fromEntries((S.leaders || []).map(l => [l.id, l.name])),
  formations: Object.fromEntries((S.formations || []).map(f => [f.id, pick(f, ['name', 'division', 'count', 'note'])])),
  units: (S.units || []).map(u => Object.assign(pick(u, Object.keys(u).filter(k => typeof u[k] === 'string' && !SKIP.test(k) && !/\.(png|jpg)$/.test(u[k]))), u.lines ? { lines: u.lines.map(l => l.text) } : {})),
  labels: S.battlefield && S.battlefield.labels ? S.battlefield.labels.map(l => l.text) : undefined,
  library: (S.library || []).map(b => b.about),
  sources: (S.sources || []).map(s => s.note),
  scaleLabel: S.battlefield && S.battlefield.scale && S.battlefield.scale.label,
  debrief: S.debrief ? Object.fromEntries(Object.entries(S.debrief).map(([s, rs]) => [s, Object.fromEntries(Object.entries(rs).map(([r, d]) => [r, pick(d, ['title', 'text'])]))])) : undefined
};
// every other visible word, as the strings dictionary of lang.js sees it
const KEYS = /^(text|label|name|short|army|division|note|desc|caption|credit|title|when|subtitle|sub|about|kind|citedIn|rights|linkLabel|author|year|dateNote|dateRef|place|sides|date|periodNote|todayNote|thenNote|heading|who|count|by)$/;
const covered = new Set(['intro', 'events', 'outcome', 'formations', 'units', 'leaders', 'confidence', 'sides', 'titleCard', 'debrief', 'voices', 'commandLines']);
const strings = {};
const walk = (o, top) => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) { o.forEach(v => walk(v, top)); return; }
  Object.keys(o).forEach(k => { const v = o[k]; if (typeof v === 'string') { if (KEYS.test(k) && /[A-Za-z]{3}/.test(v) && !/\.(png|jpg|mp3)$/.test(v)
      && !(top === 'library' && k === 'about') && !(top === 'sources' && k === 'note') && !(top === 'battlefield' && k === 'text')) strings[v] = v; } else walk(v, top); }); };
Object.keys(S).filter(k => !covered.has(k)).forEach(k => walk(S[k], k));
// the chapters' and slides' own map words (markers, arrows), besides their narration
[...(S.events || []), ...(S.intro || [])].forEach(e => Object.keys(e).filter(k => !/^(title|text|explain|clock|partTitle|subtitle|media|lines)$/.test(k)).forEach(k => walk(e[k], 'markers')));
(S.formations || []).forEach(f => Object.keys(f).filter(k => !/^(name|division|count|note)$/.test(k)).forEach(k => walk({ [k]: f[k] }, 'formations')));   // their short map labels
[global.window.BATTLE_BORDERS].forEach(b => walk(b, 'borders'));
out.strings = strings;
process.stdout.write(JSON.stringify(out, null, 1) + '\n');
