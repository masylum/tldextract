# tldextract

Accurately separates the gTLD or ccTLD (generic or country code
top-level domain) from the registered domain and subdomains of a URL.

## How does it work?

``` javascript
const tldExtract = require('@jtwebb/tldextract');

try {
  const data1 = tldExtract('https://forums.news.cnn.com/');
  // data1 = { subdomain: 'forums.news', domain: 'cnn', tld: 'com' }
    
  const data2 = tldExtract('https://forums.news.cnn.com/');
  // data2 = { subdomain: 'ye', domain: 'ye', tld: 'ye.ye' }
} catch (e) {
  // e.message === 'No domain/IP detected' if there is an error
  console.error(e);
}
```

## tests

``` javascript
npm run test
```

## Disclaimer

This module is a port of the python module [tldextract](https://github.com/john-kurkowski/tldextract).
