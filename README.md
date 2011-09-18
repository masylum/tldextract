# tldextract

Accurately separates the gTLD or ccTLD (generic or country code
top-level domain) from the registered domain and subdomains of a URL.

## How does it work?

``` javascript
var tldextract = require('tldextract');
tldextract('http://forums.news.cnn.com/', console.log);
//=> null {subdomain: 'forums.news', domain: 'cnn', tld: 'com'}

tldextract('http://ye.ye.ye.ye/', console.log);
//=> null {subdomain: 'ye', domain: 'ye', tld: 'ye.ye'}
```

## Tests

``` bash
make
```

## Disclaimer

This is module is a port of the python module [tldextract](https://github.com/john-kurkowski/tldextract).
