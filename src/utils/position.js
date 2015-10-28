export default function (element) {

    var pos = element.getBoundingClientRect();
    var {pageYOffset, pageXOffset} = window;
    var {scrollTop, clientTop, scrollLeft, clientLeft} = document.documentElement;
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
}
