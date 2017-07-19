import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import startCase from 'lodash/startCase'
import camelCase from 'lodash/camelCase'

import PropTypes from 'prop-types'

class NavigationController extends Component {
    static propTypes = {
        next: PropTypes.object,
        pre: PropTypes.object
    }

    state = {

    }

    render() {
        const { next, pre } = this.props

        return (
            <div className="navigation-controller pager">
                <div className="float-right">
                    {
                        next && (
                            <div className={ classNames('pager-item pager-item-pre hint--bottom') } data-hint={ startCase(camelCase(pre.label)) } onMouseOver={ this.onMouseOver } onMouseLeave={ this.onMouseLeave }>
                                <Link className="page-link" to={ next.url }>
                                    <span className="navigation-controller-label " >
                                        <i className="fa fa-angle-left" />
                                    </span>
                                </Link>
                            </div>
                        )
                    }
                    {
                        pre && (
                            <div className={ classNames({ 'ml-3': next != undefined }, 'pager-item pager-item-pre hint--bottom') } data-hint={ startCase(camelCase(pre.label)) } onMouseOver={ this.onMouseOver } onMouseLeave={ this.onMouseLeave }>
                                <Link className="page-link" to={ pre.url }>
                                    <span className="navigation-controller-label">
                                        <i className="fa fa-angle-right" />
                                    </span>
                                </Link>
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
}

export default NavigationController