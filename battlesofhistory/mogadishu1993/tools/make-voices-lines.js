#!/usr/bin/env node
/* Battle of Mogadishu: the recording list (TSV for tools/record-voices.sh) from scenario.js, in the six English voices of
   the other battles. Each chapter clip starts with its title (S.spokenTitles), like the Six-Day War.
     node battlesofhistory/mogadishu1993/tools/make-voices-lines.js > battlesofhistory/tools/mogadishu1993-voices-lines.tsv
   SAY: spellings for the voice only (the page shows the real words); none adds or removes a full stop, so the caption
   timings still find every sentence. */
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'tools', 'load-scenario.js'))(path.join(__dirname, '..'));
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95';
const VOICES = [['clear', 25, '1.08', '-', MIX], ['light', 60, '1.08', '-', MIX], ['bright', 0, '1.08', '-', MIX], ['deep', 400, '1.08', '-', MIX],
                ['warm', 7, '1.08', '-', MIX], ['computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX]];
const SAY = [[/\bSNA\b/g, 'S N A'], [/\bUNOSOM\b/g, 'Unosom'], [/\bUNITAF\b/g, 'Unitaf'], [/\bHMCS\b/g, 'H M C S'], [/\bCDC\b/g, 'C D C'], [/\bSEALs\b/g, 'Seals'],
             [/Çevik Bir/g, 'Chevik Beer'], [/Beledweyne/g, 'Beled-waynay'], [/\bAidid\b/g, 'Aideed'], [/Shidane/g, 'Shidahnay'], [/Salé/g, 'Sallay'], [/Kénitra/g, 'Kenitra'],
             [/Létourneau/g, 'Laytoornoh'], [/\bMOGADISHU\b/g, 'Mogadishu']];
const say = t => SAY.reduce((s, [a, b]) => s.replace(a, b), t).replace(/\s+/g, ' ').trim();
const cap = t => t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
const clips = [['welcome', S.welcome]];
S.intro.forEach((sl, i) => clips.push(['intro-' + (i + 1), cap(sl.title) + '. ' + sl.lines.map(l => l.text).join(' ')]));
S.events.forEach((e, i) => clips.push(['event-' + (i + 1), e.title + '. ' + e.text]));
clips.push(['outcome', S.outcome.map(l => l.text).join(' ')]);
const out = [];
VOICES.forEach(([v, sp, len, args, mix]) => clips.forEach(([n, t]) => out.push(['mogadishu1993', v, sp, len, args, mix, n, say(t)].join('\t'))));
process.stdout.write(out.join('\n') + '\n'); console.error(clips.length + ' clips x ' + VOICES.length + ' voices');
