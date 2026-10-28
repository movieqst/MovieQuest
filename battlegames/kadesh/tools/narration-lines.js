// Dumps every narration line of scenario.js as JSON: [{file, text}], using the
// same file-name convention the engine expects (see scenario.audioBase).
// Usage: node tools/narration-lines.js > /tmp/lines.json
global.window = {}; require('../scenario.js'); const S = window.KADESH_SCENARIO;
const say = t => String(t)
  .replace(/c\. (\d{3,4}) BCE/g, 'around $1 B C E').replace(/\bBCE\b/g, 'B C E')
  .replace(/\bRamesses II\b/g, 'Ramesses the Second').replace(/\bMuwatalli II\b/g, 'Muwatalli the Second').replace(/\bHattusili III\b/g, 'Hattusili the Third')
  .replace(/\bRe\b/g, 'Ray').replace(/\bPtah\b/g, 'Ptah').replace(/\bNe’arin\b/g, 'Nay arin').replace(/\bShasu\b/g, 'Shah soo').replace(/\bMuwatalli\b/g, 'Moo wah tah lee').replace(/\bOrontes\b/g, 'Oh ron tees').replace(/\bAmurru\b/g, 'Ah moo roo').replace(/\bHattusa\b/g, 'Hah too sah')
  .replace(/(\d+) km\b/g, '$1 kilometres').replace(/·/g, ',').replace(/’/g, "'").replace(/“|”/g, '"').replace(/–/g, ' to ').replace(/\s+/g, ' ').trim();
const out = [];
S.intro.forEach((sl, i) => out.push({ file: `intro-${i + 1}`, text: say(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' ')) }));
S.events.forEach((e, i) => { out.push({ file: `event-${i + 1}`, text: say(e.text) }); if (e.explain) out.push({ file: `explain-${i + 1}`, text: say(e.explain) }); });
out.push({ file: 'outcome', text: say(S.outcome.map(l => l.text).join(' ')) });
Object.keys(S.commandLines).forEach(k => out.push({ file: `cmd-${k}`, text: say(S.commandLines[k]) }));
console.log(JSON.stringify(out, null, 1));
