// ==UserScript==
// @name         Single Page Everything
// @namespace    https://github.com/leesei/userscripts
// @version      1.0
// @description  Load single page version of page for supported sites
// @author       leesei@gmail.com
// @supportURL   https://github.com/leesei/userscripts/issues
// @match        http*://*.howstuffworks.com/*.htm
// @match        http*://www.anandtech.com/show/*
// @run-at       document-start
// @grant        GM_log
// @grant        GM_info
// @noframes
// ==/UserScript==

function log(level, text) {
    GM_log(level + ": " + text);
}

(function() {
    'use strict';

    log("info", ">>> [" + GM_info.script.namespace + "] " + GM_info.script.name + " <<<");

    if (location.hostname.includes('howstuffworks')) {
        location.replace(location.pathname, location.pathname + '/printable/')
    }
    else if (location.hostname.includes('anandtech')) {
        location.replace(location.pathname.replace('/show','/print'))
    }
})();
