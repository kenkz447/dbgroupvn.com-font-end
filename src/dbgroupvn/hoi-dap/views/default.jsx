import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import renderItem from '../helpers/render-items'
import { Image } from '../../shared/components'
const pageConfigure = require('../configuration.js')

class DefaultView extends Component {
    static propTypes = {
        match: PropTypes.object,
        items: PropTypes.array,
        totalPages: PropTypes.number
    }

    static defaultProps = {
        items: []
    }

    render() {
        const { items } = this.props
        let i = 0;
        return (
            <article>
                <div className="mb-4">
                    <Image url={ 'uploads/2/2017/6/faq-2017-6-20-435.jpg' } />
                </div>
                {
                    map(items, ({ answer }, quest) => {
                        const open = (i === 0)
                        i++
                        return renderItem(open, quest, answer)
                    })
                }
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    const { items, totalPages } = state.connectedBasePage.pages[ pageConfigure.page ]
    return {
        items, totalPages
    }
}

export default connect(mapStateToProps)(DefaultView);