#!/usr/bin/env node
/* Medak Pocket: the recording list (TSV for tools/record-voices.sh) from scenario.js, in the six English voices of
   the other battles. Each chapter clip starts with its title (S.spokenTitles), like the Six-Day War.
     node battlesofhistory/medak/tools/make-voices-lines.js > battlesofhistory/tools/medak-voices-lines.tsv
   SAY: spellings for the voice only (the page shows the real words); none adds or removes a full stop, so the caption
   timings still find every sentence. */
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'tools', 'load-scenario.js'))(path.join(__dirname, '..'));
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95';
const VOICES = [['clear', 25, '1.08', '-', MIX], ['light', 60, '1.08', '-', MIX], ['bright', 0, '1.08', '-', MIX], ['deep', 400, '1.08', '-', MIX],
                ['warm', 7, '1.08', '-', MIX], ['computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX]];
const SAY = [[/\bHV\b/g, 'H V'], [/\bSVK\b/g, 'S V K'], [/\bUNPROFOR\b/g, 'un-pro-for'], [/\bOSCE\b/g, 'O S C E'], [/\bIAEA\b/g, 'I A E A'], [/CANBAT/g, 'can-bat'], [/FREBAT/g, 'freh-bat'],
             [/Džep devedeset tri/g, 'jep deh-veh-deh-set tree'], [/Gospić/g, 'gos-pitch'], [/Divoselo/g, 'dee-vo-seh-lo'], [/Čitluk/g, 'chit-look'], [/Počitelj/g, 'po-chi-tel'],
             [/\bMedak\b/g, 'meh-dak'], [/\bLika\b/g, 'lee-ka'], [/Krajina/g, 'kra-yee-na'], [/Rahim Ademi/g, 'ra-heem a-deh-mee'], [/\bAdemi\b/g, 'a-deh-mee'],
             [/Mirko Norac/g, 'meer-ko no-rats'], [/\bNorac\b/g, 'no-rats'], [/Janko Bobetko/g, 'yan-ko bo-bet-ko'], [/Josip Krmpotić/g, 'yo-sip kurm-po-titch'],
             [/Petar Stipetić/g, 'peh-tar stee-peh-titch'], [/Mile Novaković/g, 'mee-leh no-va-ko-vitch'], [/Milan Martić/g, 'mee-lan mar-titch'], [/Lovinac/g, 'lo-vee-nats'],
             [/Rijeka/g, 'ree-yeh-ka'], [/Decoste/g, 'deh-coast'], [/Velebit/g, 'veh-leh-bit'], [/\bMEDAK POCKET\b/g, 'meh-dak Pocket']];
const say = t => SAY.reduce((s, [a, b]) => s.replace(a, b), t).replace(/\s+/g, ' ').trim();
const cap = t => t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
const clips = [['welcome', S.welcome]];
S.intro.forEach((sl, i) => clips.push(['intro-' + (i + 1), cap(sl.title) + '. ' + sl.lines.map(l => l.text).join(' ')]));
S.events.forEach((e, i) => clips.push(['event-' + (i + 1), e.title + '. ' + e.text]));
clips.push(['outcome', S.outcome.map(l => l.text).join(' ')]);
const out = [];
VOICES.forEach(([v, sp, len, args, mix]) => clips.forEach(([n, t]) => out.push(['medak', v, sp, len, args, mix, n, say(t)].join('\t'))));
process.stdout.write(out.join('\n') + '\n'); console.error(clips.length + ' clips x ' + VOICES.length + ' voices');
