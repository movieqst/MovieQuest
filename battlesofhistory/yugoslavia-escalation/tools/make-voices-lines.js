#!/usr/bin/env node
/* Yugoslavia: Escalation: the recording list (TSV for tools/record-voices.sh) from scenario.js, in the six English
   voices of the other pages. Each clip starts with its title, like Bunker Hill.
     node battlesofhistory/yugoslavia-escalation/tools/make-voices-lines.js > battlesofhistory/tools/yugoslavia-escalation-voices-lines.tsv
   SAY: spellings for the voice only (the page shows the real words); none adds or removes a full stop, so the caption
   timings still find every sentence. */
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'tools', 'load-scenario.js'))(path.join(__dirname, '..'));
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95';
const VOICES = [['clear', 25, '1.08', '-', MIX], ['light', 60, '1.08', '-', MIX], ['bright', 0, '1.08', '-', MIX], ['deep', 400, '1.08', '-', MIX],
                ['warm', 7, '1.08', '-', MIX], ['computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX]];
const SAY = [[/\bMilošević\b/g, 'mee-loh-sheh-vich'], [/\bTuđman\b/g, 'tooj-mahn'], [/\bKučan\b/g, 'koo-chahn'], [/\bIzetbegović\b/g, 'ee-zet-beh-go-vich'],
  [/\bGligorov\b/g, 'glee-go-rov'], [/\bBulatović\b/g, 'boo-lah-to-vich'], [/\bMarković\b/g, 'mar-ko-vich'], [/\bStambolić\b/g, 'stam-bo-lich'], [/\bMesić\b/g, 'meh-sich'],
  [/\bŠpegelj\b/g, 'shpeh-gel'], [/\bBabić\b/g, 'bah-bich'], [/\bRašković\b/g, 'rash-ko-vich'], [/\bJović\b/g, 'yo-vich'], [/\bJanša\b/g, 'yahn-sha'], [/\bMartić\b/g, 'mar-tich'],
  [/\bManolić\b/g, 'ma-no-lich'], [/\bMrkšić\b/g, 'merk-shich'], [/\bGešovski\b/g, 'geh-shov-skee'], [/\bVukadinović\b/g, 'voo-ka-dee-no-vich'], [/\bKosović\b/g, 'ko-so-vich'],
  [/\bMilinović\b/g, 'mee-lee-no-vich'], [/\bBranivoje\b/g, 'bra-nee-vo-yeh'], [/\bNedeljko\b/g, 'neh-del-ko'], [/\bJosip\b/g, 'yo-sip'], [/\bSaško\b/g, 'sash-ko'], [/\bRajko\b/g, 'rai-ko'],
  [/\bGazimestan\b/g, 'gah-zee-meh-stahn'], [/\bPristina\b/g, 'prish-tee-na'], [/\bTrepča\b/g, 'trep-cha'], [/\bKnin\b/g, 'k-neen'], [/\bSrb\b/g, 'serb'],
  [/\bPlitvice\b/g, 'plit-vee-tseh'], [/\bPakrac\b/g, 'pah-krats'], [/\bBorovo Selo\b/g, 'bo-ro-vo seh-lo'], [/\bKarađorđevo\b/g, 'ka-ra-jor-jeh-vo'], [/\bVojvodina\b/g, 'voy-vo-dee-na'],
  [/\bLjubljana\b/g, 'lyoo-blyah-na'], [/\bBožur\b/g, 'bo-zhoor'], [/\bVečernje novosti\b/g, 'veh-cher-nyeh no-vo-stee'], [/\bVukovar\b/g, 'voo-ko-var'], [/\bTito\b/g, 'tee-toh'],
  [/\bJosip Broz\b/g, 'yo-sip broz'], [/\bŠest\b/g, 'shest'], [/\bBosniaks?\b/g, m => m.replace('Bosniak', 'bos-nee-ak')], [/\bGagnon\b/g, 'gan-yon'], [/\bJović\b/g, 'yo-vich'],
  [/\bZagreb\b/g, 'zah-greb'], [/\bKosovo\b/g, 'ko-so-vo'], [/\bSlovenes\b/g, 'slo-veens'], [/\bDEMOS\b/g, 'deh-mos'], [/\bYUGOSLAVIA\b/g, 'Yugoslavia']];
// \b does not see letters such as ć and Š as part of a word: rebuild each pattern with Unicode letter boundaries
SAY.forEach(r => { r[0] = new RegExp(r[0].source.replace(/\\b/g, '').replace(/^/, '(?<!\\p{L})').replace(/$/, '(?!\\p{L})'), 'gu'); });
const say = t => SAY.reduce((s, [a, b]) => s.replace(a, b), t).replace(/\s+/g, ' ').trim();
const cap = t => t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
const clips = [['welcome', S.welcome]];
S.intro.forEach((sl, i) => clips.push(['intro-' + (i + 1), cap(sl.title) + '. ' + sl.lines.map(l => l.text).join(' ')]));
S.events.forEach((e, i) => clips.push(['event-' + (i + 1), e.title + '. ' + e.text]));
const out = [];
VOICES.forEach(([v, sp, len, args, mix]) => clips.forEach(([n, t]) => out.push(['yugoslavia-escalation', v, sp, len, args, mix, n, say(t)].join('\t'))));
process.stdout.write(out.join('\n') + '\n'); console.error(clips.length + ' clips x ' + VOICES.length + ' voices');
