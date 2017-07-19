import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import guid from 'guid'
import includes from 'lodash/includes'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Collapse } from 'reactstrap'

import { registerSidebarItem, toggleSidebarItems, toggleSidebarItem } from './sidebar/reducer'

class SidebarWidget extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        toggleDefault: PropTypes.bool,
        extraText: PropTypes.string,
        noBorder: PropTypes.bool,
        titleClassName: PropTypes.string,
        children: PropTypes.any,
        className: PropTypes.string,
        link: PropTypes.string,
        noCollapse: PropTypes.bool,
        dispatch: PropTypes.func,
        openedSidebarItems: PropTypes.array,
        onTitleClick: PropTypes.func,
        freeToggle: PropTypes.bool
    };

    static defaultProps = {
        title: 'Missing title',
        toggleDefault: true
    }

    constructor(props) {
        super(props);

        //Tạo guidId để quản lý trên sidebar
        //Dùng ở componentDidMount
        this.guidId = guid.raw()

        this.widgetClassName = classNames('widget-item', { 'no-border': props.noBorder })
        this.toggle = this.toggle.bind(this)
        this.renderContent = this.renderContent.bind(this)
    }

    componentWillMount() {
        const { dispatch, toggleDefault } = this.props

        dispatch(registerSidebarItem(this.guidId))

        if (toggleDefault)
            dispatch(toggleSidebarItems([ this.guidId ]))
    }

    toggle() {
        if (!this.props.freeToggle)
            this.props.dispatch(toggleSidebarItem(this.guidId))
        else
            this.props.dispatch(toggleSidebarItems([ this.guidId ]))
    }

    renderContent() {
        const { children, className } = this.props

        return (
            <div className={ classNames(className, 'widget-item-content') }>
                { children }
            </div>
        )
    }

    render() {
        const { title, extraText, link, noCollapse, openedSidebarItems, onTitleClick, titleClassName } = this.props

        return (
            <div className={ this.widgetClassName } >
                <div className="widget-item-header">
                    {
                        link ? (
                            <NavLink to={ link } className={ classNames('widget-item-title', titleClassName) } activeClassName="current">
                                { title }
                            </NavLink>
                        ) :
                            <span className={ classNames('widget-item-title', titleClassName) } onClick={ () => { onTitleClick && onTitleClick() } }>
                                { title }
                            </span>
                    }
                    {
                        extraText && <span className="extra-text">{ extraText }</span>
                    }
                    {
                        noCollapse || (
                            <span className="chevron" onClick={ this.toggle }>
                                <i className="fa fa-angle-down" aria-hidden="true" />
                            </span>
                        )
                    }
                </div>
                <div className="widget-item-content-container">
                    {
                        noCollapse ? this.renderContent() :
                            (
                                <Collapse isOpen={ includes(openedSidebarItems, this.guidId) } >
                                    { this.renderContent() }
                                </Collapse>
                            )
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        openedSidebarItems: state.sidebar.openedItems
    }
}

export default connect(mapStateToProps)(SidebarWidget);