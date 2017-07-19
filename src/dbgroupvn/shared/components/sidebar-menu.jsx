import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { NavLink } from 'react-router-dom'
import { default as classNames } from 'classnames'

import { default as SidebarWidget } from './sidebar-widget'

export default class SidebarMenu extends Component {
    static propTypes = {
        toggleDefault: PropTypes.bool,
        noBorder: PropTypes.bool,
        title: PropTypes.string,
        titleLink: PropTypes.string,
        items : PropTypes.array
    }
    
    static defaultProps = {
        items: []
    }

    render() {
        const { toggleDefault, noBorder, title, titleLink, items } = this.props

        return (
            <SidebarWidget toggleDefault={ toggleDefault } noBorder={ noBorder } noCollapse={ !items.length } title={ title } link={ titleLink }>
                {
                    items && <ul className="sidebar-widget-menu">
                        {
                            map(items, (item, index) => (
                                <li className={ classNames('sidebar-widget-item') } key={ index }>
                                    <NavLink className={ classNames('sidebar-widget-link') } to={ item.path } activeClassName='current'>
                                        <span className="sidebar-widget-link-title">
                                            { item.title }
                                        </span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }
            </SidebarWidget>
        )
    }
}