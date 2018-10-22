// ==UserScript==
// @name         Single Page Everything
// @namespace    https://github.com/leesei/userscripts
// @version      1.1
// @description  Load single page version of page for supported sites
// @author       leesei@gmail.com
// @supportURL   https://github.com/leesei/userscripts/issues
// @match        http*://*.howstuffworks.com/*.htm
// @match        http*://www.anandtech.com/show/*
// @match        http*://learn.adafruit.com/*
// @match        http*://arstechnica.com/*
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

  if (location.hostname.includes("howstuffworks")) {
    location.replace(location.pathname, location.pathname + "/printable/");
  } else if (location.hostname.includes("anandtech")) {
    location.replace(location.pathname.replace("/show", "/print"));
  } else if (location.hostname.includes("adafruit")) {
    // only handle articles, this may be category
    if (location.pathname.includes("/", 1)) return;

    if (!queries.view) {
      location.replace(location.pathname + "?view=all");
    }
  } else if (location.hostname.includes("arstechnica")) {
    // only handle articles, this may be category
    if (!location.pathname.includes("/", 1)) return;

    if (!queries.amp) {
      location.replace(location.pathname + "?amp=1");
    }
  }
})();
