#!/usr/bin/env node
/* Ukraine and Russia: Escalation: the recording list (TSV for tools/record-voices.sh) from scenario.js, in the six English
   voices of the other pages. Each clip starts with its title, like Bunker Hill.
     node battlesofhistory/ukraine-escalation/tools/make-voices-lines.js > battlesofhistory/tools/ukraine-escalation-voices-lines.tsv
   SAY: spellings for the voice only (the page shows the real words); none adds or removes a full stop, so the caption
   timings still find every sentence. */
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'tools', 'load-scenario.js'))(path.join(__dirname, '..'));
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95';
const VOICES = [['clear', 25, '1.08', '-', MIX], ['light', 60, '1.08', '-', MIX], ['bright', 0, '1.08', '-', MIX], ['deep', 400, '1.08', '-', MIX],
                ['warm', 7, '1.08', '-', MIX], ['computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX]];
const SAY = [[/\bKravchuk\b/g, 'krav-chook'], [/\bKuchma\b/g, 'kooch-ma'], [/\bYushchenko\b/g, 'yoosh-chen-ko'], [/\bYanukovych\b/g, 'ya-noo-ko-vich'],
  [/\bTymoshenko\b/g, 'tee-mo-shen-ko'], [/\bTurchynov\b/g, 'toor-chee-nov'], [/\bMeshkov\b/g, 'mesh-kov'], [/\bSevastopol\b/g, 'seh-vas-to-pol'],
  [/\bSimferopol\b/g, 'sim-feh-ro-pol'], [/\bBelavezha\b/g, 'beh-la-veh-zha'], [/\bAlma-Ata\b/g, 'al-ma a-ta'], [/\bMaidan\b/g, 'my-dahn'],
  [/\bTuzla\b/g, 'tooz-la'], [/\bInstytutska\b/g, 'in-stee-toot-ska'], [/\bHrushevskoho\b/g, 'hroo-shev-sko-ho'], [/\bKharkiv\b/g, 'har-kiv'],
  [/\bLuhansk\b/g, 'loo-hansk'], [/\bTskhinvali\b/g, 'tskin-vah-lee'], [/\bKommersant\b/g, 'ko-mer-sahnt'], [/\bGongadze\b/g, 'gon-gahd-zeh'],
  [/\bChurkin\b/g, 'choor-kin'], [/\bGeorgiy\b/g, 'gay-or-gee'], [/\bOleksandr\b/g, 'o-lek-sandr'], [/\bAbkhazia\b/g, 'ab-kah-zee-a'],
  [/\bOssetia\b/g, 'o-see-sha'], [/\bPlokhy\b/g, 'plo-hee'], [/\bSakwa\b/g, 'sak-va'], [/\bKyiv\b/g, 'keev'], [/\bDonetsk\b/g, 'do-netsk'],
  [/\bVerkhovna\b/g, 'ver-hov-na'], [/\bMedvedev\b/g, 'med-ved-ev'], [/\bAzov\b/g, 'a-zov'], [/\bKerch\b/g, 'kerch'], [/\bNATO\b/g, 'nay-toe']];
const say = t => SAY.reduce((s, [a, b]) => s.replace(a, b), t).replace(/\s+/g, ' ').trim();
const cap = t => t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
const clips = [['welcome', S.welcome]];
S.intro.forEach((sl, i) => clips.push(['intro-' + (i + 1), cap(sl.title) + '. ' + sl.lines.map(l => l.text).join(' ')]));
S.events.forEach((e, i) => clips.push(['event-' + (i + 1), e.title + '. ' + e.text]));
const out = [];
VOICES.forEach(([v, sp, len, args, mix]) => clips.forEach(([n, t]) => out.push(['ukraine-escalation', v, sp, len, args, mix, n, say(t)].join('\t'))));
process.stdout.write(out.join('\n') + '\n'); console.error(clips.length + ' clips x ' + VOICES.length + ' voices');
