// Dumps every narration line of scenario.js as JSON: [{file, text}], using the
// same file-name convention the engine expects (see scenario.audioBase).
// Usage: node tools/narration-lines.js > /tmp/lines.json
global.window = {}; require('../scenario.js'); const S = window.KADESH_SCENARIO;
// Respellings checked against the engine's phonemizer so names come out right
// (Ramesses -> RAM-eh-seez, Kadesh -> KAH-desh, Muwatalli -> MOO-wa-tah-lee, Orontes -> OR-on-teez ...).
const say = t => String(t)
  .replace(/c\. (\d{3,4}) BCE/g, 'around $1 B C E').replace(/\bBCE\b/g, 'B C E')
  .replace(/\bRamesses II\b/g, 'Rammeseez the Second').replace(/\bMuwatalli II\b/g, 'Moowatahlee the Second').replace(/\bHattusili III\b/g, 'Hattooseelee the Third')
  .replace(/\bRamesses\b/g, 'Rammeseez').replace(/\bMuwatalli\b/g, 'Moowatahlee').replace(/\bHattusili\b/g, 'Hattooseelee').replace(/\bHattusa\b/g, 'Hattoosah')
  .replace(/\bKadesh\b/gi, 'Kahdesh').replace(/\bOrontes\b/gi, 'Orontees').replace(/\bAmurru\b/g, 'Amooroo').replace(/\bAmun\b/g, 'Ahmoon').replace(/\bRe\b/g, 'Ray')
  .replace(/\bNe\u2019arin\b/g, 'Neyahrin').replace(/\bShasu\b/g, 'Shahsoo').replace(/\bUpi\b/g, 'Oopee').replace(/\bAbu Simbel\b/g, 'Ahboo Simbel').replace(/\bLuxor\b/g, 'Luxore')
  .replace(/(\d+) km\b/g, '$1 kilometres').replace(/\u00b7/g, ',').replace(/\u2019/g, "'").replace(/\u201c|\u201d/g, '"').replace(/\u2013/g, ' to ').replace(/\s+/g, ' ').trim();
const out = [];
S.intro.forEach((sl, i) => out.push({ file: `intro-${i + 1}`, text: say(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' ')) }));
S.events.forEach((e, i) => { out.push({ file: `event-${i + 1}`, text: say(e.text) }); if (e.explain) out.push({ file: `explain-${i + 1}`, text: say(e.explain) }); });
out.push({ file: 'outcome', text: say(S.outcome.map(l => l.text).join(' ')) });
Object.keys(S.commandLines).forEach(k => out.push({ file: `cmd-${k}`, text: say(S.commandLines[k]) }));
console.log(JSON.stringify(out, null, 1));
