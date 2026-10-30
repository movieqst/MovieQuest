// Dumps every narration line of scenario.js as JSON: [{file, text}], using the
// same file-name convention the engine expects (see scenario.audioBase).
// Usage: node tools/narration-lines.js > /tmp/lines.json
global.window = {}; require('../scenario.js'); const S = window.GAUGAMELA_SCENARIO;
// Respellings so the synthesiser says the names correctly (Gaugamela -> gow-guh-MEE-luh, Darius -> duh-RY-us ...).
const say = t => String(t)
  .replace(/c\. (\d{3,4}) BCE/g, 'around $1 B C E').replace(/\bBCE\b/g, 'B C E')
  .replace(/\bGaugamela\b/g, 'Gowguhmeeluh').replace(/\bDarius\b/g, 'Duhryus').replace(/\bAlexander\b/g, 'Aligzander')
  .replace(/\bParmenion\b/g, 'Parmenyon').replace(/\bArrian\b/g, 'Airreeun').replace(/\bBessus\b/g, 'Bessus')
  .replace(/\bMazaeus\b/g, 'Muhzayus').replace(/\bArbela\b/g, 'Arbuhluh').replace(/\bBabylon\b/g, 'Babuhlon')
  .replace(/\bPtolemy\b/g, 'Tollumee').replace(/\bAristobulus\b/g, 'Airihstobyoolus').replace(/\bpezhetairoi\b/g, 'pezetyroy')
  .replace(/\bhypaspists\b/g, 'highpuhspists').replace(/\bsarissa\b/g, 'suhrissuh').replace(/\bCompanions\b/g, 'Kumpanyunz')
  .replace(/\bIranica\b/g, 'Eyeranikuh')
  .replace(/(\d+) km\b/g, '$1 kilometres').replace(/\u00b7/g, ',').replace(/\u2019/g, "'").replace(/\u201c|\u201d/g, '"').replace(/\u2013/g, ' to ').replace(/\s+/g, ' ').trim();
const out = [];
S.intro.forEach((sl, i) => out.push({ file: `intro-${i + 1}`, text: say(sl.title + '. ' + (sl.subtitle ? sl.subtitle + '. ' : '') + sl.lines.map(l => l.text).join(' ')) }));
S.events.forEach((e, i) => { out.push({ file: `event-${i + 1}`, text: say(e.text) }); if (e.explain) out.push({ file: `explain-${i + 1}`, text: say(e.explain) }); });
out.push({ file: 'outcome', text: say(S.outcome.map(l => l.text).join(' ')) });
Object.keys(S.commandLines).forEach(k => out.push({ file: `cmd-${k}`, text: say(S.commandLines[k]) }));
console.log(JSON.stringify(out, null, 1));
