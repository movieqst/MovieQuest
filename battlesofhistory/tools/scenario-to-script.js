// Writes a NARRATION-SCRIPT.md from a battle's scenario.js, in the format tools/script-to-narration.sh records.
// Usage: node tools/scenario-to-script.js waterloo/scenario.js > waterloo/NARRATION-SCRIPT.md
global.window = {}; require(require('path').resolve(process.argv[2]));
const S = window[Object.keys(window).find(k => /_SCENARIO$/.test(k))];
const out = [`# ${S.title.replace(/^Battle of /, '')} narration script`, '', 'Record each entry as one take. Clip names are shown in bold; use them exactly.', '',
  'Generated from scenario.js (tools/scenario-to-script.js): edit the scenario, not this file.', ''];
if (S.welcome) out.push('## **welcome**', S.welcome, '');
S.intro.forEach((sl, i) => { out.push(`## **intro-${i + 1}**: ${sl.title}${sl.subtitle ? '' : ''}`); sl.lines.forEach(l => out.push('- ' + l.text)); out.push(''); });
S.events.forEach((e, i) => { out.push(`## **event-${i + 1}**: ${e.title}`, e.text, ''); if (e.explain) out.push(`**explain-${i + 1}**: ${e.explain}`, ''); });
out.push('## **outcome**'); S.outcome.forEach(l => out.push('- ' + l.text)); out.push('');
out.push('## Command-mode captions'); Object.keys(S.commandLines).forEach(k => out.push(`- **cmd-${k}**: ${S.commandLines[k]}`)); out.push('');
process.stdout.write(out.join('\n'));
