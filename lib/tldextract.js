var TLDEXTRACT = {}
  , request = require('request')
  , SCHEME_RE = new RegExp('^([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.]+:)?//')
  , _mozilla_list = 'http://mxr.mozilla.org/mozilla/source/netwerk/dns/src/effective_tld_names.dat?raw=1'
  , _cache
  ;

/**
 * Extracts the netloc against the list of tlds
 *
 * @param {Array} tlds
 * @param {String} netloc
 * @return {Object}
 */
function _extract(tlds, netloc) {
  var spl = netloc.split('.')
    , ret;

  spl.some(function (el, i) {
    var maybe_tld = spl.slice(i).join('.')
      , star_tld = '*.' + spl.slice(i + 1).join('.')
      , exception_tld = '!' + maybe_tld;

    if (tlds.indexOf(exception_tld) !== -1) {
      ret = { registered_domain: spl.slice(0, i + 1).join('.')
            , tld: spl.slice(i + 1).join('.')
            };
      return true;
    }

    if (tlds.indexOf(star_tld) !== -1 || tlds.indexOf(maybe_tld) !== -1) {
      ret = { registered_domain: spl.slice(0, i).join('.')
            , tld: maybe_tld
            };
      return true;
    }
  });

  return ret || {registered_domain: netloc, tld: ''};
}

/**
 * Gets the list of tld from mozilla or the cached snapshot
 *
 * @param {Function} callback
 */
function _getTLDList(callback) {
  if (_cache) return callback(null, _cache);

  request(_mozilla_list, function (error, resp, body) {
    if (error || resp.statusCode !== 200) {
      require('fs').readFile(__dirname + '/tld_snapshot', function (error, data) {
        if (error) return callback(error);
        _cache = data.toString().split('\n');
        callback(null, _cache);
      });
    } else {
      _cache = body.match(/^([.*!]*\w[\S]*)/gm);
      //require('fs').writeFileSync(__dirname + '/tld_snapshot', _cache.join('\n'));
      callback(null, _cache);
    }
  });
}

/**
 * Takes a string URL and splits it into its subdomain, domain, and
 * gTLD/ccTLD component. Ignores scheme, username, and path components.
 *
 * @param {String} url
 * @param {Function} callback
 * @return {Object}
 */
TLDEXTRACT.extract = function (url, callback) {
  var netloc = url.replace(SCHEME_RE, '').split('/')[0]
    , subdomain, domain, tld, registered_domain;

  netloc = netloc.split('@').slice(-1)[0].split(':')[0];
  _getTLDList(function (error, tlds) {
    if (error) return callback(error);

    var obj = _extract(tlds, netloc);
    tld = obj.tld;
    registered_domain = obj.registered_domain;

    if (!tld && netloc && +netloc[0] === +netloc[0]) {
      if (require('net').isIP(netloc)) {
        return callback(null, {subdomain: '', domain: netloc, tld: ''});
      } else {
        return callback(Error('No domain/IP detected'));
      }
    }

    domain = registered_domain.split('.').slice(-1)[0];
    subdomain = registered_domain.split('.').slice(0, -1).join('.');

    callback(null, {subdomain: subdomain, domain: domain, tld: tld});
  });
}

module.exports = TLDEXTRACT.extract;
