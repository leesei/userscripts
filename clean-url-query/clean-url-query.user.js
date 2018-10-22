// ==UserScript==
// @name         Clean URL Query
// @namespace    https://github.com/leesei/userscripts
// @version      1.1
// @description  Trim tracking query params from URL
// @author       leesei@gmail.com
// @supportURL   https://github.com/leesei/userscripts/issues
// @match        http*://detail.tmall.com/item.htm*
// @match        http*://*.tmall.com/shop/view_shop.htm
// @match        http*://item.taobao.com/item.htm*
// @match        http*://*.taobao.com/shop/view_shop.htm
// @match        http*://*.computerworld.com/*
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
  // march and parse
  for (var i = queries.length - 1; i >= 0; i--) {
    pair = queries[i].split("=");
    params[d(pair[0])] = d(pair[1]);
  }

  return params;
}

(function() {
  "use strict";

  log(
    "info",
    ">>> [" + GM_info.script.namespace + "] " + GM_info.script.name + " <<<"
  );

  var queries = query2json(location.search);
  log("debug", JSON.stringify(queries));
  if (Object.keys(queries).length > 1) {
    location.replace(
      // retain id for Taobao items
      location.pathname + (queries.id ? "?id=" + queries.id : "")
    );
  }
})();
