// ==UserScript==
// @name        YouTube Embedded
// @namespace   urn:nx3d.org:userscripts
// @description Play YouTube videos in embedded mode
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     5.4
// @grant       none
// @downloadURL https://nx3d.org/scripts/youtube_embed.user.js
// ==/UserScript==

(function() {
    var rewriteAnchor = function(a) {
        var video_match = /^https?:\/\/www\.youtube\.com\/watch\?v=([^&#]*)([&#].*)?$/;
        var href = a.href;
        var m;

        if (href !== undefined && (m = href.match(video_match)) !== null) {
            href = 'https://www.youtube.com/embed/' + m[1];

            // Restore fragment or query string
            if (m[2]) {
                if (m[2][0] == '&') {
                    href += '?' + m[2].slice(1);
                } else {
                    href += m[2];
                }
            }

            a.href = href;
        }
    };

    var filterAll = function() {
        var a = document.getElementsByTagName('a');

        for (var i = 0; i < a.length; i++) {
            rewriteAnchor(a[i]);
        }
    }

    // FIXME: this is the dumb way to do it.
    var observer = new window.MutationObserver(filterAll);
    observer.observe(document, {childList: true, subtree: true/*, attributes: true*/});
    filterAll();
})();
