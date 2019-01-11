// ==UserScript==
// @name         Clean URL Query
// @namespace    https://github.com/leesei/userscripts
// @version      1.3.2
// @description  Trim tracking query params from URL
// @author       leesei@gmail.com
// @supportURL   https://github.com/leesei/userscripts/issues
// @match        http*://detail.tmall.com/item.htm*
// @match        http*://*.tmall.com/shop/view_shop.htm
// @match        http*://item.taobao.com/item.htm*
// @match        http*://*.taobao.com/shop/view_shop.htm
// @match        http*://*.carousell.com/p/*
// @match        http*://*.computerworld.com/*
// @match        http*://*.networkworld.com/*
// @match        http*://*.infoworld.com/*
// @run-at       document-start
// @grant        GM_log
// @grant        GM_info
// @noframes
// ==/UserScript==

function log(level, text) {
  GM_log(level + ": " + text);
}

function query2json(querystring) {
  // remove any preceding url and split
  var queries = querystring.substring(querystring.indexOf("?") + 1).split("&");
  var params = {},
    pair,
    d = decodeURIComponent;
  // match and parse
  for (var i = queries.length - 1; i >= 0; i--) {
    if (queries[i].length === 0) continue;
    pair = queries[i].split("=");
    params[d(pair[0])] = d(pair[1]);
  }

  return params;
}

function json2query(json) {
  var query = Object.keys(json)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");

  return query ? "?" + query : "";
}

// Convert sensible strings to Boolean, useful for parsing URL queries
function string2Boolean(string, defaultTrue) {
  // console.log('2bool:', String(string).toLowerCase());
  switch (String(string).toLowerCase()) {
    case "":
      return defaultTrue === undefined ? false : defaultTrue;
    case "true":
    case "1":
    case "yes":
    case "y":
      return true;
    case "false":
    case "0":
    case "no":
    case "n":
      return false;
    default:
      // you could throw an error, but 'undefined' seems a more logical value
      return undefined;
  }
}

(function() {
  "use strict";

  log(
    "info",
    ">>> [" + GM_info.script.namespace + "] " + GM_info.script.name + " <<<"
  );

  var queries = query2json(location.search);
  log("debug", "queries: " + JSON.stringify(queries));

  if (
    queries._skip_clean !== undefined &&
    string2Boolean(queries._skip_clean)
  ) {
    return;
  }

  // retain these query params
  var WHITE_LIST = [
    "id", // for taobao items
    "page" // for article pages
  ];
  var copy = Object.assign({}, queries);
  WHITE_LIST.forEach(key => delete copy[key]);
  log("debug", "copy: " + JSON.stringify(copy));

  // remove non-whitelisted queries
  if (Object.keys(copy).length) {
    var _q = {};
    WHITE_LIST.forEach(key => {
      if (queries[key]) _q[key] = queries[key];
    });
    log("debug", "_q: " + JSON.stringify(_q));
    location.replace(location.pathname + json2query(_q));
  }
})();
