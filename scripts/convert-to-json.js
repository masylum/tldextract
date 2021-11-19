const fs = require('fs');
const path = require('path');

(async () => {
  const data = fs.readFileSync(path.resolve(__dirname, './tlds'), 'utf8')
    .split('\n')
    .filter(d => !d.startsWith('//') && d !== '');

  fs.writeFileSync(path.resolve(__dirname, '../lib/tlds.json'), JSON.stringify(data, null, 2));

  console.log('Finished!');
})();
