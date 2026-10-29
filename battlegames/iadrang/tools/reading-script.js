// Writes NARRATION-SCRIPT.md: a human reading script with one entry per clip.
// Usage: node tools/reading-script.js > NARRATION-SCRIPT.md
global.window = {}; require('../scenario.js'); const S = window.BATTLE_SCENARIO;
const plain = t => String(t).replace(/·/g, ',').replace(/\s+/g, ' ').trim();
const lines = [];
S.intro.forEach((sl, i) => lines.push([`intro-${i + 1}`, `Intro screen ${i + 1}: ${sl.title}`, plain(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' '))]));
S.parts.forEach(p => {
  p.events.forEach((e, i) => { lines.push([`event-${p.id}-${i + 1}`, `${p.title}, event ${i + 1}: ${e.title}`, plain(e.text)]); if (e.explain) lines.push([`explain-${p.id}-${i + 1}`, `${p.title}, explain this moment ${i + 1}: ${e.title}`, plain(e.explain)]); });
  lines.push([`outcome-${p.id}`, `${p.title}: historical outcome (debrief)`, plain(p.outcome.map(l => l.text).join(' '))]);
  Object.keys(p.commandLines || {}).forEach(k => lines.push([`cmd-${p.id}-${k}`, `${p.title}, command mode caption: ${k}`, plain(p.commandLines[k])]));
});
Object.keys(S.commandLines).forEach(k => lines.push([`cmd-${k}`, `Command mode caption: ${k}`, plain(S.commandLines[k])]));
const words = lines.reduce((n, l) => n + l[2].split(' ').length, 0);
console.log(`# Battle of the Ia Drang — narration reading script

## How to say the names

| Written | Say it |
|---|---|
| Ia Drang | EE-ah DRANG (ia means river) |
| Chu Pong | choo PONG |
| Plei Me | play MAY |
| Pleiku | PLAY-koo |
| An Khe | ahn KAY |
| Nguyen Huu An | nwen hoo AHN |
| Chu Huy Man | choo hwee MAHN |
| Jarai | jah-RYE |
| Diduryk | DID-er-ick |
| Geoghegan | GAY-gan |
| Nadal | nuh-DAHL |
| LZ | "L Z" (landing zone) |
| PAVN | say "North Vietnamese army" |
| 1/7 Cavalry | "first battalion, seventh cavalry" |
| Huey | HEW-ee |

Times are written 10:48 and read "ten forty-eight". Years are read "nineteen sixty-five".

${lines.length} clips, about ${words} words (roughly ${Math.round(words / 140)} minutes of reading).
Record each entry as one file named as shown, mono MP3, and put the files in audio/<your-voice-id>/ .
Then add your voice to the \`voices\` list in scenario.js.

`);
lines.forEach(([f, t, x]) => console.log(`## ${f}.mp3\n*${t}*\n\n${x}\n`));
