# tldextract

Accurately separates the gTLD or ccTLD (generic or country code
top-level domain) from the registered domain and subdomains of a URL.

## How does it work?

``` javascript
var tldextract = require('tldextract');
tldextract('http://forums.news.cnn.com/', function (err, obj) {
  // {subdomain: 'forums.news', domain: 'cnn', tld: 'com'}
})
```

## tests

``` bash
make
```

## Disclaimer

This is module is a port of the python module [tldextract](https://github.com/john-kurkowski/tldextract).
