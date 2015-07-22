"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (element) {

    var pos = element.getBoundingClientRect();
    var pageYOffset = window.pageYOffset;
    var pageXOffset = window.pageXOffset;
    var _document$documentElement = document.documentElement;
    var scrollTop = _document$documentElement.scrollTop;
    var clientTop = _document$documentElement.clientTop;
    var scrollLeft = _document$documentElement.scrollLeft;
    var clientLeft = _document$documentElement.clientLeft;

    var winTop = (pageYOffset || scrollTop) - clientTop;
    var winLeft = (pageXOffset || scrollLeft) - clientLeft;

    return {
        top: pos.top + winTop,
        left: pos.left + winLeft,
        right: pos.right + winLeft,
        bottom: pos.bottom + winTop,
        width: pos.width,
        height: pos.height
    };
};

module.exports = exports["default"];