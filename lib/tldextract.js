const net = require('net');

const SCHEME_RE = new RegExp('^([abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.]+:)?//');
let cache;

function extract(tlds, netLoc) {
  const spl = netLoc.split('.');
  let ret;

  spl.some(function (el, i) {
    const maybeTld = spl.slice(i).join('.');
    const starTld = `*.${spl.slice(i + 1).join('.')}`;
    const exceptionTld = `!${maybeTld}`;

    if (tlds.includes(exceptionTld)) {
      ret = { registeredDomain: spl.slice(0, i + 1).join('.'), tld: spl.slice(i + 1).join('.') };
      return true;
    }

    if (tlds.includes(starTld) || tlds.includes(maybeTld)) {
      ret = { registeredDomain: spl.slice(0, i).join('.'), tld: maybeTld };
      return true;
    }
  });

  return ret || { registeredDomain: netLoc, tld: '' };
}

function getTLDList() {
  if (!cache) {
    cache = require('./tlds.json');
  }
  return cache;
}

module.exports = function(url) {
  const netLoc = url.replace(SCHEME_RE, '').split('/')[0].split('@').slice(-1)[0].split(':')[0];
  const tlds = getTLDList();
  const { registeredDomain, tld } = extract(tlds, netLoc);

  if(!tld && netLoc && +netLoc[0] === +netLoc[0]) {
    if (net.isIP(netLoc)) {
      return { subdomain: '', domain: netLoc, tld: '' };
    }
    throw new Error('No domain/IP detected');
  }

  return {
    subdomain: registeredDomain.split('.').slice(0, -1).join('.'),
    domain: registeredDomain.split('.').slice(-1)[0],
    tld
  };
}
