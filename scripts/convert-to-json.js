const fs = require('fs');
const path = require('path');
const https = require('https');

(async () => {
  const data = (await request('https://publicsuffix.org/list/public_suffix_list.dat'))
    .split('\n')
    .filter(d => !d.startsWith('//') && d !== '');

  fs.writeFileSync(path.resolve(__dirname, '../lib/tlds.json'), JSON.stringify(data, null, 2));

  console.log('Finished!');
})();

function request(url) {
  return new Promise((resolve, reject) => {
    https.get(url, resp => {
      let data = '';

      resp.on('data', chunk => data += chunk);
      resp.on('end', () => resolve(data));
    })
      .on('error', reject);
  });
}
