/* Node helper: a battle's scenario, optionally in another language, exactly as the page shows it (via ../lang.js).
     const S = require('./load-scenario.js')('/path/to/battlesofhistory/waterloo', 'fr');   */
const fs = require('fs'), path = require('path');
module.exports = (dir, lang) => {
  const win = {}; global.window = win; global.location = { search: lang ? '?lang=' + lang : '', href: 'http://x/' };
  global.localStorage = { getItem: () => null, setItem() {} }; global.document = { documentElement: {}, title: '' }; global.addEventListener = () => {};
  const run = f => { new Function('window', fs.readFileSync(f, 'utf8'))(win); };
  run(path.join(dir, 'scenario.js'));
  if (lang && lang !== 'en') { run(path.join(dir, 'lang-' + lang + '.js')); new Function('window', 'location', 'localStorage', 'document', 'addEventListener', fs.readFileSync(path.join(dir, '..', 'lang.js'), 'utf8'))(win, global.location, global.localStorage, global.document, () => {}); }
  return win[Object.keys(win).find(k => /_SCENARIO$/.test(k))];
};
