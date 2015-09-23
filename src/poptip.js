import React, { Component, PropTypes } from 'react';
import { render, findDOMNode } from 'react-dom';
import elementPosition from './position';
import transitionDuration from './transition-duration';

export default class Poptip extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        onOutsideClick: PropTypes.func,
        baseClassName: PropTypes.string,         // Base Tooltip class name.
        typeClassName: PropTypes.string,         // Type Tooltip class name.
        effectClassName: PropTypes.string,       // Effect Tooltip class name.
        inClassName: PropTypes.string,           // Class used to transition stuff in.
        content: PropTypes.element.isRequired,   // Tooltip content (required).
        place: PropTypes.string,                 // Default place.
        spacing: PropTypes.number,               // Gap between target and Tooltip.
        trigger: PropTypes.oneOf(['hover', 'click', 'manual']),
        visible: PropTypes.bool
    }

    static defaultProps = {
        onClick() {},
        onOutsideClick() {},
        baseClassName: 'tooltip',
        typeClassName: null,
        effectClassName: null,
        inClassName: 'in',
        place: 'top',
        spacing: 0,
        trigger: 'hover',
        visible: false
    }

    componentDidMount() {
        this.hidden = true;
        this.createTooltip();
        this.renderContent();
        this.addListeners();
    }

    componentDidUpdate() {
        this.renderContent();
    }

    componentWillReceiveProps() {
        // Remove previous classes from tooltip
        this.removeTooltipClassNames();
    }

    componentWillUnmount() {
        this.removeListeners();
        if (!this.hidden) {
            document.body.removeChild(this.tooltip);
        }
        React.unmountComponentAtNode(this.tooltip);
    }

    render() {
        return this.props.children;
    }

    renderContent() {
        render(this.props.content, this.tooltip, () => {
            this.addTooltipClassNames();
            this.updateSize();
            this.removeListeners();
            this.addListeners();
        });
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
    }

    addListeners() {
        const {trigger, visible} = this.props;
        const element = findDOMNode(this);

        if (trigger === 'hover') {
            element.addEventListener('mouseenter', this.show, false);
            element.addEventListener('mouseleave', this.hide, false);
        } else if(trigger === 'click') {
            element.addEventListener('click', this.toogle, false);
        } else if (visible) {
            this.show();
        } else {
            this.hide();
        }

        document.addEventListener('click', this.handleOutsideClick, false);
        window.addEventListener('resize', this.position, false);
    }

    removeListeners() {
        const element = findDOMNode(this);
        element.removeEventListener('mouseenter', this.show);
        element.removeEventListener('mouseleave', this.hide);
        element.removeEventListener('click', this.toogle);
        document.removeEventListener('click', this.handleOutsideClick);
        window.removeEventListener('resize', this.position);
    }

    addTooltipClassNames() {
        const {baseClassName, typeClassName, effectClassName, place} = this.props;
        this.tooltip.classList.add(baseClassName, typeClassName, effectClassName, place);
    }

    removeTooltipClassNames() {
        const {baseClassName, typeClassName, effectClassName, place} = this.props;
        this.tooltip.classList.remove(baseClassName, typeClassName, effectClassName, place);
    }

    updateSize() {
        const {tooltip, hidden} = this;

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

    handleOutsideClick = (event) => {
        const element = findDOMNode(this);
        const tooltip = findDOMNode(this.tooltip);
        const {trigger, onClick, onOutsideClick} = this.props;

        if (!element.contains(event.target) && !tooltip.contains(event.target)) {
            if (trigger !== 'manual') this.hide();
            onOutsideClick(event);
        } else {
            onClick(event);
        }
    }

    position = () => {
        const {tooltip, height, width} = this;
        const {place, spacing} = this.props;
        const element = findDOMNode(this);
        const target = elementPosition(element);
        let top, left;

        switch(place) {
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
    }

    show = () => {
        const {tooltip, hidden} = this;
        const {inClassName, effectClassName} = this.props;

        // Clear potential ongoing animation
        clearTimeout(this.tdTimer);

        // Position the element
        this.position();

        if (hidden) {
            this.hidden = false;
            document.body.appendChild(tooltip);
        }

        // Trigger layout and kick in the transition
        if (inClassName) {
            if (effectClassName) void tooltip.clientHeight;
            tooltip.classList.add(inClassName);
        }
    }

    hide = () => {
        const {tooltip, hidden} = this;
        const {inClassName, effectClassName} = this.props;
        let duration = 0;

        if (hidden) return;

        // Remove .in class and calculate transition duration if any
        if (inClassName) {
            if (effectClassName) duration = transitionDuration(tooltip);
            tooltip.classList.remove(inClassName);
        }

        // Remove the tip from the DOM when transition is done
        clearTimeout(this.tdTimer);
        this.tdTimer = setTimeout(() => {
            this.tdTimer = 0;
            document.body.removeChild(tooltip);
            this.hidden = true;
        }, duration);
    }

    toogle = () => {
        return this.hidden ? this.show() : this.hide();
    }
}
