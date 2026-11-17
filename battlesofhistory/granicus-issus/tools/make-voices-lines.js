#!/usr/bin/env node
/* Granicus and Issus: the recording list (TSV for tools/record-voices.sh) from scenario.js, in the six English voices of
   the other battles. Each chapter clip starts with its title (S.spokenTitles), like the Six-Day War.
     node battlesofhistory/granicus-issus/tools/make-voices-lines.js > battlesofhistory/tools/granicus-issus-voices-lines.tsv
   SAY: spellings for the voice only (the page shows the real words); none adds or removes a full stop, so the caption
   timings still find every sentence. */
const path = require('path');
const S = require(path.join(__dirname, '..', '..', 'tools', 'load-scenario.js'))(path.join(__dirname, '..'));
const MIX = 'highpass=f=70,agate=threshold=0.035:ratio=6:attack=8:release=160:knee=2,volume=1.6,alimiter=limit=0.95';
const CMIX = 'highpass=f=90,lowpass=f=4800,bass=g=4:f=140,acompressor=threshold=0.25:ratio=3:attack=20:release=250,volume=1.4,alimiter=limit=0.95';
const VOICES = [['clear', 25, '1.08', '-', MIX], ['light', 60, '1.08', '-', MIX], ['bright', 0, '1.08', '-', MIX], ['deep', 400, '1.08', '-', MIX],
                ['warm', 7, '1.08', '-', MIX], ['computer', 500, '1.3', '--noise-scale 0.4 --noise-w 0.3', CMIX]];
const SAY = [[/\bHalicarnassus\b/g, 'Hal-ih-kar-nas-us'],
             [/\bSpithridates\b/g, 'Spith-rih-day-teez'],
             [/\bCallisthenes\b/g, 'Ka-lis-the-neez'],
             [/\bMithridates\b/g, 'Mith-rih-day-teez'],
             [/\bOrontobates\b/g, 'Or-on-tob-a-teez'],
             [/\bHephaestion\b/g, 'Heh-fees-tee-on'],
             [/\bTriballians\b/g, 'Try-bal-ee-anz'],
             [/\bAristobulus\b/g, 'A-ris-tob-yoo-lus'],
             [/\bMyriandrus\b/g, 'Mir-ee-an-drus'],
             [/\bSisygambis\b/g, 'Sis-ee-gam-bis'],
             [/\bAchaemenid\b/g, 'A-kee-meh-nid'],
             [/\bHellespont\b/g, 'Hel-es-pont'],
             [/\bhypaspists\b/g, 'Hy-pas-pists'],
             [/\bThessalian\b/g, 'Thes-say-lee-an'],
             [/\bParmenion\b/g, 'Par-mee-nee-on'],
             [/\bRhoesaces\b/g, 'Roy-sa-seez'],
             [/\bMithrenes\b/g, 'Mith-ree-neez'],
             [/\bPamphylia\b/g, 'Pam-fil-ee-a'],
             [/\bAcarnania\b/g, 'Ak-ar-nay-nee-a'],
             [/\bThymondas\b/g, 'Thy-mon-das'],
             [/\bGaugamela\b/g, 'Gaw-ga-mee-la'],
             [/\bAgrianian\b/g, 'Ag-ree-ay-nee-an'],
             [/\bAntipater\b/g, 'An-tip-a-ter'],
             [/\bBiga Çayı\b/g, 'Bee-ga chai-uh'],
             [/\bChaeronea\b/g, 'Ker-o-nee-a'],
             [/\bGranicus\b/g, 'Gran-eye-kus'],
             [/\bCilician\b/g, 'Sih-lish-an'],
             [/\bDeli Çay\b/g, 'Deh-lee chai'],
             [/\bKuru Çay\b/g, 'Koo-roo chai'],
             [/\bKardakes\b/g, 'Kar-dah-keez'],
             [/\bStateira\b/g, 'Sta-ty-ra'],
             [/\bMytilene\b/g, 'Mit-ih-lee-nee'],
             [/\bDiodorus\b/g, 'Dye-o-dor-us'],
             [/\bPolybius\b/g, 'Po-lib-ee-us'],
             [/\bSeleucus\b/g, 'Seh-loo-kus'],
             [/\bsarissas\b/g, 'Sa-ris-az'],
             [/\bThessaly\b/g, 'Thes-a-lee'],
             [/\bCleitus\b/g, 'Kly-tus'],
             [/\bArsites\b/g, 'Ar-sy-teez'],
             [/\bAmyntas\b/g, 'A-min-tas'],
             [/\bPinarus\b/g, 'Pin-a-rus'],
             [/\bsatraps\b/g, 'Say-traps'],
             [/\bCurtius\b/g, 'Kur-shus'],
             [/\bGordium\b/g, 'Gor-dee-um'],
             [/\bPtolemy\b/g, 'Tol-eh-mee'],
             [/\bZeleia\b/g, 'Zeh-lye-a'],
             [/\bSestos\b/g, 'Ses-tos'],
             [/\bAbydos\b/g, 'A-by-dos'],
             [/\bCydnus\b/g, 'Sid-nus'],
             [/\bSochoi\b/g, 'So-koy'],
             [/\bAradus\b/g, 'Ar-a-dus'],
             [/\bAlinda\b/g, 'A-lin-da'],
             [/\bsatrap\b/g, 'Say-trap'],
             [/\bBadian\b/g, 'Bad-ee-an'],
             [/\bByblos\b/g, 'Bib-los'],
             [/\bDarius\b/g, 'Da-rye-us'],
             [/\bPayas\b/g, 'Pie-as'],
             [/\bKörpe\b/g, 'Kur-peh'],
             [/\bChios\b/g, 'Ky-os'],
             [/\bLycia\b/g, 'Lish-a'],
             [/\bLade\b/g, 'Lah-dee'],
             [/\bAda\b/g, 'Ay-da']];
const say = t => SAY.reduce((s, [a, b]) => s.replace(a, b), t).replace(/\s+/g, ' ').trim();
const cap = t => t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
const clips = [['welcome', S.welcome]];
S.intro.forEach((sl, i) => clips.push(['intro-' + (i + 1), cap(sl.title) + '. ' + sl.lines.map(l => l.text).join(' ')]));
S.events.forEach((e, i) => clips.push(['event-' + (i + 1), e.title + '. ' + e.text]));
clips.push(['outcome', S.outcome.map(l => l.text).join(' ')]);
const out = [];
VOICES.forEach(([v, sp, len, args, mix]) => clips.forEach(([n, t]) => out.push(['granicus-issus', v, sp, len, args, mix, n, say(t)].join('\t'))));
process.stdout.write(out.join('\n') + '\n'); console.error(clips.length + ' clips x ' + VOICES.length + ' voices');
