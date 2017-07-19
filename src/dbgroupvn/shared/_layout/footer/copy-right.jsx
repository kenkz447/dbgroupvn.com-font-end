import React, { Component } from 'react'

const classNames = require('classnames');

module.exports = class extends Component {
    render(){
        return(
            <div className={classNames("copyright", this.props.className)}>
                C 2017 dbgroup. All rights reserved
            </div>
        )
    }
}