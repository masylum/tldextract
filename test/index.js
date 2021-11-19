const tldextract = require('../');
const assert = require('assert');

const test1 = tldextract('foo.bar.co.uk');
assert.deepStrictEqual(test1, { subdomain: 'foo', domain: 'bar', tld: 'co.uk' });

const test2 = tldextract('foo.bar.com');
assert.deepStrictEqual(test2, { subdomain: 'foo', domain: 'bar', tld: 'com' });

const test3 = tldextract('a.b.c.d.foo.com.ye');
assert.deepStrictEqual(test3, { subdomain: 'a.b.c.d', domain: 'foo', tld: 'com.ye' });

const test4 = tldextract('dali.portlligat.museum');
assert.deepStrictEqual(test4, { subdomain: '', domain: 'dali', tld: 'portlligat.museum' });

assert.throws(() => tldextract('123456'), { name: 'Error', message: 'No domain/IP detected' });

console.log('Finished!');
