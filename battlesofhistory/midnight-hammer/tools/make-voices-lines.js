#!/usr/bin/env node
/* Operation Midnight Hammer: the recording list (TSV for tools/record-voices.sh) from scenario.js, in the six English voices of
   the other battles. Each chapter clip starts with its title (S.spokenTitles), like the Six-Day War.
     node battlesofhistory/midnight-hammer/tools/make-voices-lines.js > battlesofhistory/tools/midnight-hammer-voices-lines.tsv
   SAY: spellings for the voice only (the page shows the real words); none adds or removes a full stop, so the caption
   timings still find every sentence. */
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'tools', 'load-scenario.js'))(path.join(__dirname, '..'));
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95';
const VOICES = [['clear', 25, '1.08', '-', MIX], ['light', 60, '1.08', '-', MIX], ['bright', 0, '1.08', '-', MIX], ['deep', 400, '1.08', '-', MIX],
                ['warm', 7, '1.08', '-', MIX], ['computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX]];
const SAY = [[/\bFordow\b/g, 'for-doe'], [/\bNatanz\b/g, 'na-tanz'], [/\bIsfahan\b/g, 'is-fa-hahn'], [/\bQom\b/g, 'kome'], [/\bTehran\b/g, 'teh-rahn'],
  [/\bKhamenei\b/g, 'ha-meh-nay'], [/\bAraghchi\b/g, 'a-rag-chee'], [/\bPezeshkian\b/g, 'peh-zesh-kee-ahn'], [/\bAl Udeid\b/g, 'al oo-dayd'], [/\bGrossi\b/g, 'gross-ee'],
  [/\bCaine\b/g, 'cane'], [/\bHegseth\b/g, 'heg-seth'], [/\bKurilla\b/g, 'koo-ril-a'], [/\bIAEA\b/g, 'I A E A'], [/\bGBU-57s\b/g, 'G B U fifty-sevens'],
  [/\bB-2s\b/g, 'B twos'], [/\bB-2\b/g, 'B two'], [/\bDefense\b/g, 'Defence'], [/\bOPERATION MIDNIGHT HAMMER\b/g, 'Operation Midnight Hammer']];
const say = t => SAY.reduce((s, [a, b]) => s.replace(a, b), t).replace(/\s+/g, ' ').trim();
const cap = t => t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
const clips = [['welcome', S.welcome]];
S.intro.forEach((sl, i) => clips.push(['intro-' + (i + 1), cap(sl.title) + '. ' + sl.lines.map(l => l.text).join(' ')]));
S.events.forEach((e, i) => clips.push(['event-' + (i + 1), e.title + '. ' + e.text]));
clips.push(['outcome', S.outcome.map(l => l.text).join(' ')]);
const out = [];
VOICES.forEach(([v, sp, len, args, mix]) => clips.forEach(([n, t]) => out.push(['midnight-hammer', v, sp, len, args, mix, n, say(t)].join('\t'))));
process.stdout.write(out.join('\n') + '\n'); console.error(clips.length + ' clips x ' + VOICES.length + ' voices');
