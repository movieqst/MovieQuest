// Writes NARRATION-SCRIPT.md: a human reading script with one entry per clip.
// Usage: node tools/reading-script.js > NARRATION-SCRIPT.md
global.window = {}; require('../scenario.js'); const S = window.GAUGAMELA_SCENARIO;
const plain = t => String(t).replace(/·/g, ',').replace(/\s+/g, ' ').trim();
const lines = [];
S.intro.forEach((sl, i) => lines.push([`intro-${i + 1}`, `Intro screen ${i + 1}: ${sl.title}`, plain(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' '))]));
S.events.forEach((e, i) => { lines.push([`event-${i + 1}`, `Battle event ${i + 1}: ${e.title}`, plain(e.text)]); if (e.explain) lines.push([`explain-${i + 1}`, `Explain this moment ${i + 1}: ${e.title}`, plain(e.explain)]); });
lines.push(['outcome', 'Historical outcome (debrief)', plain(S.outcome.map(l => l.text).join(' '))]);
Object.keys(S.commandLines).forEach(k => lines.push([`cmd-${k}`, `Command mode caption: ${k}`, plain(S.commandLines[k])]));
const words = lines.reduce((n, l) => n + l[2].split(' ').length, 0);
console.log(`# Battle of Kadesh — narration reading script

## How to say the names

| Written | Say it |
|---|---|
| Ramesses | RAM-eh-seez |
| Muwatalli | moo-wah-TAH-lee |
| Kadesh | KAH-desh |
| Orontes | oh-RON-teez |
| Amun | AH-moon |
| Re | RAY |
| Ptah | p-TAH (the p is almost silent) |
| Seth | SETH |
| Ne'arin | neh-AH-rin |
| Shasu | SHAH-soo |
| Amurru | ah-MOO-roo |
| Hittite, Hatti | HIT-tite, HAT-ee |
| Hattusili, Hattusa | hat-too-SEE-lee, hat-TOO-sah |
| Shabtuna | shab-TOO-nah |
| Aleppo | ah-LEP-oh |
| Carchemish, Arzawa, Dardany | KAR-keh-mish, ar-ZAH-wah, DAR-dah-nee |
| Upi | OO-pee |
| BCE | say the letters: B C E |

## Part 1 — ten sentences for voice cloning (about two minutes)

Read these in the voice you want for the narrator: unhurried, warm, like a documentary.
They cover every English speech sound plus the names above.

1. Three thousand years ago, two great kings marched their armies toward a walled city on the river Orontes.
2. Ramesses the Second, pharaoh of Egypt, believed the enemy was far away; Muwatalli, Great King of the Hittites, was waiting behind the walls of Kadesh.
3. Chariots thundered across the ford, wheels biting the shallow water, as the archers drew their bows.
4. The divisions of Amun, Re, Ptah and Seth were strung out along the road, each a day's march from the next.
5. Nobody knows exactly how many men fought that day; the Egyptian texts claim thirty-seven thousand, and most historians doubt it.
6. The judge quickly asked whether the young boy had ever seen a zebra, a giraffe or a vulture at the zoo.
7. Fresh troops, the Ne'arin, appeared from the west in the late afternoon, and the pendulum began to swing.
8. Joyful children splashed through the shallow brook while their mother measured the thick purple cloth.
9. Fifteen years later, the two kingdoms sealed a peace treaty, the oldest of its kind that survives from both sides.
10. This is a reconstruction. What the stones tell us is one thing; what historians have pieced together is another.

**Recording tips.** A quiet room, no music, phone or microphone about a hand's width from your mouth, the same distance for every take. Record as WAV or the highest-quality MP3 your app offers. Leave half a second of silence before and after each take. Don't whisper and don't shout: an even, relaxed reading clones best. If you stumble, pause and read the whole sentence again; it is easy to cut.

## Part 2 — the full script (${lines.length} clips, about ${words} words)

Read every entry as one take and save it with the file name shown, as MP3, in a folder named after you inside \`audio/\`, for example \`audio/jb/intro-1.mp3\`. Then add \`{ id: 'jb', name: 'JB' }\` to \`voices\` in \`scenario.js\` and the narrator picker will offer it.

` + lines.map(([f, title, text]) => `### ${f}.mp3 — ${title}\n\n${text}\n`).join('\n'));
