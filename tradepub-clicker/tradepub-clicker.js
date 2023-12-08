// ==UserScript==
// @name         TradePub Clicker
// @namespace    https://github.com/leesei/userscripts
// @version      1.0.0
// @description  Click the download button on TradePub automatically, so you don't have to
// @author       leesei@gmail.com
// @license      MIT
// @supportURL   https://github.com/leesei/userscripts/issues
// @match        http*://*.tradepub.com/*
// @run-at       document-start
// @grant        GM_log
// @grant        GM_info
// @noframes
// ==/UserScript==

function log(level, text) {
  GM_log(level + ": " + text);
}

(function () {
  "use strict";

  log(
    "info",
    ">>> [" + GM_info.script.namespace + "] " + GM_info.script.name + " <<<"
  );

  setTimeout(() => {
    const downloadButton = document.querySelector(
      "input[type=submit][value=DOWNLOAD]"
    );
    log("debug", "button: " + downloadButton);
    if (downloadButton) {
      downloadButton.click();
      log("debug", "clicked");
    }
  }, 1000);
})();
