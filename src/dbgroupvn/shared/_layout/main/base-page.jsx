import React, { Component } from 'react'

import ConnectedBasePage from './connected-base-page'
import { default as PropTypes } from 'prop-types'

export default (args = {}) => Element => class BasePage extends Component {
    static propsType = {
        page: PropTypes.string.require
    }

    render() {
        return (
            <ConnectedBasePage {...args} {...this.props} component={ Element } />
        )
    }
}