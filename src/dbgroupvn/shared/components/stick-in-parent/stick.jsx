import $ from 'jquery'

import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';

require('./stick-lib')

class Sticky extends Component {
    componentDidMount() {
        const elment = ReactDOM.findDOMNode(this.element)
        $(elment).stick_in_parent()
    }

    render() {
        return (
            <div ref={ (elm) => { this.element = elm } } className="sticky">
                { this.props.children }
            </div>
        );
    }
}

Sticky.propTypes = {
    children: PropTypes.any
};

export default Sticky;