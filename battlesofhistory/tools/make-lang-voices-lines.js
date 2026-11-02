#!/usr/bin/env node
/* The recording list (for record-voices.sh) of a battle in another language, from the text the page shows.
     node tools/make-lang-voices-lines.js waterloo fr fr-tom,fr-siwis > tools/waterloo-fr-voices-lines.tsv
   One line per clip and voice: battle, voice id, speaker, length scale, piper args, ffmpeg mix, clip name, text.
   Clip names match the English ones: welcome, intro-N, event-N, explain-N, event-campaign-N, outcome, cmd-<key>. */
const path = require('path');
const [battle, lang, voiceList] = process.argv.slice(2);
const S = require('./load-scenario.js')(path.join(__dirname, '..', battle), lang);
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const clips = [];
if (S.welcome) clips.push(['welcome', S.welcome]);
(S.intro || []).forEach((sl, i) => { if (!sl.choice) clips.push(['intro-' + (i + 1), sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' ')]); });
(S.events || []).forEach((e, i) => { clips.push(['event-' + (i + 1), e.text]); if (e.explain) clips.push(['explain-' + (i + 1), e.explain]); });
if (S.campaign) S.campaign.events.forEach((e, i) => clips.push(['event-campaign-' + (i + 1), e.text]));
if (S.outcome) clips.push(['outcome', S.outcome.map(l => l.text).join(' ')]);
Object.entries(S.commandLines || {}).forEach(([k, t]) => clips.push(['cmd-' + k, t]));
const out = [];
voiceList.split(',').forEach(v => clips.forEach(([n, t]) => out.push([battle, v, 0, '1.0', '-', MIX, n, t.replace(/\s+/g, ' ').trim()].join('\t'))));
process.stdout.write(out.join('\n') + '\n');
console.error(clips.length + ' clips x ' + voiceList.split(',').length + ' voices');
