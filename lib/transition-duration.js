'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (element) {

    var computed = window.getComputedStyle(element);
    var duration = String(computed.transitionDuration || computed.webkitTransitionDuration || computed.mozTransitionDuration || computed.msTransitionDuration);
    var match = duration.match(/([0-9.]+)([ms]{1,2})/);

    if (match) {
        duration = Number(match[1]);
        if (match[2] === 's') duration *= 1000;
    }

    return duration | 0;
};

module.exports = exports['default'];