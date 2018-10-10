// ==UserScript==
// @name         Single Page Everything
// @namespace    http://leesei.github.io
// @version      0.1
// @description  Load a single page version of page for supported sites
// @author       leesei@gmail.com
// @match        http*://*.howstuffworks.com/*.htm
// @match        http*://www.anandtech.com/show/*
// @grant        GM_log
// @grant        GM_info
// ==/UserScript==

function log(level, text) {
    GM_log(level + ": " + text);
}

(function() {
    'use strict';

    log('info', '>>> [' + GM_info.script.namespace + '] Single Page Everything <<<')

    if (location.hostname.includes('howstuffworks')) {
        location.replace(location.pathname, location.pathname + '/printable/')
    }
    else if (location.hostname.includes('anandtech')) {
        location.replace(location.pathname.replace('/show','/print'))
    }
})();
