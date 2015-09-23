'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _position = require('./position');

var _position2 = _interopRequireDefault(_position);

var _transitionDuration = require('./transition-duration');

var _transitionDuration2 = _interopRequireDefault(_transitionDuration);

var Poptip = (function (_Component) {
    _inherits(Poptip, _Component);

    function Poptip() {
        var _this = this;

        _classCallCheck(this, Poptip);

        _get(Object.getPrototypeOf(Poptip.prototype), 'constructor', this).apply(this, arguments);

        this.handleOutsideClick = function (event) {
            var element = (0, _reactDom.findDOMNode)(_this);
            var tooltip = (0, _reactDom.findDOMNode)(_this.tooltip);
            var _props = _this.props;
            var trigger = _props.trigger;
            var onClick = _props.onClick;
            var onOutsideClick = _props.onOutsideClick;

            if (!element.contains(event.target) && !tooltip.contains(event.target)) {
                if (trigger !== 'manual') _this.hide();
                onOutsideClick(event);
            } else {
                onClick(event);
            }
        };

        this.position = function () {
            var tooltip = _this.tooltip;
            var height = _this.height;
            var width = _this.width;
            var _props2 = _this.props;
            var place = _props2.place;
            var spacing = _props2.spacing;

            var element = (0, _reactDom.findDOMNode)(_this);
            var target = (0, _position2['default'])(element);
            var top = undefined,
                left = undefined;

            switch (place) {
                case 'top':
                    top = target.top - height - spacing;
                    left = target.left + target.width / 2 - width / 2;
                    break;
                case 'top-left':
                    top = target.top - height - spacing;
                    left = target.right - width;
                    break;
                case 'top-right':
                    top = target.top - height - spacing;
                    left = target.left;
                    break;

                case 'bottom':
                    top = target.bottom + spacing;
                    left = target.left + target.width / 2 - width / 2;
                    break;
                case 'bottom-left':
                    top = target.bottom + spacing;
                    left = target.right - width;
                    break;
                case 'bottom-right':
                    top = target.bottom + spacing;
                    left = target.left;
                    break;

                case 'left':
                    top = target.top + target.height / 2 - height / 2;
                    left = target.left - width - spacing;
                    break;
                case 'left-top':
                    top = target.bottom - height;
                    left = target.left - width - spacing;
                    break;
                case 'left-bottom':
                    top = target.top;
                    left = target.left - width - spacing;
                    break;

                case 'right':
                    top = target.top + target.height / 2 - height / 2;
                    left = target.right + spacing;
                    break;
                case 'right-top':
                    top = target.bottom - height;
                    left = target.right + spacing;
                    break;
                case 'right-bottom':
                    top = target.top;
                    left = target.right + spacing;
                    break;
            }

            tooltip.style.top = Math.round(top) + 'px';
            tooltip.style.left = Math.round(left) + 'px';
        };

        this.show = function () {
            var tooltip = _this.tooltip;
            var hidden = _this.hidden;
            var _props3 = _this.props;
            var inClassName = _props3.inClassName;
            var effectClassName = _props3.effectClassName;

            // Clear potential ongoing animation
            clearTimeout(_this.tdTimer);

            // Position the element
            _this.position();

            if (hidden) {
                _this.hidden = false;
                document.body.appendChild(tooltip);
            }

            // Trigger layout and kick in the transition
            if (inClassName) {
                if (effectClassName) void tooltip.clientHeight;
                tooltip.classList.add(inClassName);
            }
        };

        this.hide = function () {
            var tooltip = _this.tooltip;
            var hidden = _this.hidden;
            var _props4 = _this.props;
            var inClassName = _props4.inClassName;
            var effectClassName = _props4.effectClassName;

            var duration = 0;

            if (hidden) return;

            // Remove .in class and calculate transition duration if any
            if (inClassName) {
                if (effectClassName) duration = (0, _transitionDuration2['default'])(tooltip);
                tooltip.classList.remove(inClassName);
            }

            // Remove the tip from the DOM when transition is done
            clearTimeout(_this.tdTimer);
            _this.tdTimer = setTimeout(function () {
                _this.tdTimer = 0;
                document.body.removeChild(tooltip);
                _this.hidden = true;
            }, duration);
        };

        this.toogle = function () {
            return _this.hidden ? _this.show() : _this.hide();
        };
    }

    _createClass(Poptip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.hidden = true;
            this.createTooltip();
            this.renderContent();
            this.addListeners();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderContent();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            // Remove previous classes from tooltip
            this.removeTooltipClassNames();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeListeners();
            if (!this.hidden) {
                document.body.removeChild(this.tooltip);
            }
            _react2['default'].unmountComponentAtNode(this.tooltip);
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            (0, _reactDom.render)(this.props.content, this.tooltip, function () {
                _this2.addTooltipClassNames();
                _this2.updateSize();
                _this2.removeListeners();
                _this2.addListeners();
            });
        }
    }, {
        key: 'createTooltip',
        value: function createTooltip() {
            this.tooltip = document.createElement('div');
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _props5 = this.props;
            var trigger = _props5.trigger;
            var visible = _props5.visible;

            var element = (0, _reactDom.findDOMNode)(this);

            if (trigger === 'hover') {
                element.addEventListener('mouseenter', this.show, false);
                element.addEventListener('mouseleave', this.hide, false);
            } else if (trigger === 'click') {
                element.addEventListener('click', this.toogle, false);
            } else if (visible) {
                this.show();
            } else {
                this.hide();
            }

            document.addEventListener('click', this.handleOutsideClick, false);
            window.addEventListener('resize', this.position, false);
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            var element = (0, _reactDom.findDOMNode)(this);
            element.removeEventListener('mouseenter', this.show);
            element.removeEventListener('mouseleave', this.hide);
            element.removeEventListener('click', this.toogle);
            document.removeEventListener('click', this.handleOutsideClick);
            window.removeEventListener('resize', this.position);
        }
    }, {
        key: 'addTooltipClassNames',
        value: function addTooltipClassNames() {
            var _props6 = this.props;
            var baseClassName = _props6.baseClassName;
            var typeClassName = _props6.typeClassName;
            var effectClassName = _props6.effectClassName;
            var place = _props6.place;

            this.tooltip.classList.add(baseClassName, typeClassName, effectClassName, place);
        }
    }, {
        key: 'removeTooltipClassNames',
        value: function removeTooltipClassNames() {
            var _props7 = this.props;
            var baseClassName = _props7.baseClassName;
            var typeClassName = _props7.typeClassName;
            var effectClassName = _props7.effectClassName;
            var place = _props7.place;

            this.tooltip.classList.remove(baseClassName, typeClassName, effectClassName, place);
        }
    }, {
        key: 'updateSize',
        value: function updateSize() {
            var tooltip = this.tooltip;
            var hidden = this.hidden;

            if (hidden) {
                tooltip.style.visability = 'hidden';
                document.body.appendChild(tooltip);
            }

            this.width = tooltip.offsetWidth;
            this.height = tooltip.offsetHeight;

            if (hidden) {
                document.body.removeChild(tooltip);
                tooltip.style.visibility = '';
            } else {
                this.position();
            }
        }
    }], [{
        key: 'propTypes',
        value: {
            onClick: _react.PropTypes.func,
            onOutsideClick: _react.PropTypes.func,
            baseClassName: _react.PropTypes.string, // Base Tooltip class name.
            typeClassName: _react.PropTypes.string, // Type Tooltip class name.
            effectClassName: _react.PropTypes.string, // Effect Tooltip class name.
            inClassName: _react.PropTypes.string, // Class used to transition stuff in.
            content: _react.PropTypes.element.isRequired, // Tooltip content (required).
            place: _react.PropTypes.string, // Default place.
            spacing: _react.PropTypes.number, // Gap between target and Tooltip.
            trigger: _react.PropTypes.oneOf(['hover', 'click', 'manual']),
            visible: _react.PropTypes.bool
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {
            onClick: function onClick() {},
            onOutsideClick: function onOutsideClick() {},
            baseClassName: 'tooltip',
            typeClassName: null,
            effectClassName: null,
            inClassName: 'in',
            place: 'top',
            spacing: 0,
            trigger: 'hover',
            visible: false
        },
        enumerable: true
    }]);

    return Poptip;
})(_react.Component);

exports['default'] = Poptip;
module.exports = exports['default'];