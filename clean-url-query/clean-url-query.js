// ==UserScript==
// @name         Clean URL Query
// @namespace    http://leesei.github.io
// @version      0.1
// @description  Trim tracking query params from URL
// @author       leesei@gmail.com
// @match        http*://detail.tmall.com/item.htm*
// @match        http*://item.taobao.com/item.htm*
// @grant        GM_log
// @grant        GM_info
// ==/UserScript==

function log(level, text) {
    GM_log(level + ": " + text);
}

function query2json(querystring) {
    // remove any preceding url and split
    var queries = querystring.substring(querystring.indexOf('?')+1).split('&');
    var params = {}, pair, d = decodeURIComponent;
    // march and parse
    for (var i = queries.length - 1; i >= 0; i--) {
        pair = queries[i].split('=');
        params[d(pair[0])] = d(pair[1]);
    }

    return params;
}

(function() {
    'use strict';

    log('info', '>>> [' + GM_info.script.namespace + '] Trim URL Query <<<')

    var queries = query2json(location.search)
    // log('info', JSON.stringify(queries))
    log('info', Object.keys(queries))
    if (Object.keys(queries).length > 1) {
        location.replace(location.pathname + '?id=' + queries.id)
    }
})();
