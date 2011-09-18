var tldextract = require('../')
  , assert = require('assert');

tldextract('foo.bar.co.uk', function (error, obj) {
  assert.ifError(error);
  assert.deepEqual(obj, {subdomain: 'foo', domain: 'bar', tld: 'co.uk'});
});

tldextract('foo.bar.com', function (error, obj) {
  assert.ifError(error);
  assert.deepEqual(obj, {subdomain: 'foo', domain: 'bar', tld: 'com'});
});

tldextract('a.b.c.d.foo.ye.ye', function (error, obj) {
  assert.ifError(error);
  assert.deepEqual(obj, {subdomain: 'a.b.c.d', domain: 'foo', tld: 'ye.ye'});
});

tldextract('dali.portlligat.museum', function (error, obj) {
  assert.ifError(error);
  assert.deepEqual(obj, {subdomain: '', domain: 'dali', tld: 'portlligat.museum'});
});
