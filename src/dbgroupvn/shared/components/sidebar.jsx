import $ from 'jquery'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import classNames from 'classnames'
import { toggleMobileSidebar } from '../_layout/actions'

class Sidebar extends Component {
    static propTypes = {
        isMobileSidebarOpen: PropTypes.bool,
        layoutParameters: PropTypes.object,
        dispatch: PropTypes.func,
        children: PropTypes.array,
        collapsenChildOnceByOnce: PropTypes.bool
    }

    static defaultProps = {
        children: []
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMobileSidebarOpen) {
            const { layoutParameters: { header, breadcrumbs } } = nextProps

            const scrollTop = Math.ceil($(window).scrollTop())
            this.setState({
                sidebarMobileStyle: {
                    height: Math.ceil(window.innerHeight),
                    top: scrollTop - header.height - breadcrumbs.height
                }
            })
        }
    }

    onChildToggle() {
        if (this.props.collapsenChildOnceByOnce)
            this.props.dispatch()
    }

    render() {
        const { className, children, isMobileSidebarOpen, layoutParameters: { isSmallDevice } } = this.props
        return (
                <div className={ classNames('mr-lg-4', className) }>
                    {
                        isSmallDevice ?
                            (
                                <aside className={ classNames('transition-advance sidebar sidebar-mobile', { open: isMobileSidebarOpen }) }
                                    style={ this.state.sidebarMobileStyle }
                                >
                                    <div className="sidebar-mobile-wrapper">
                                        <div className="transition-advance sidebar-mobile-overlay overlay" onClick={ () => {
                                            this.props.dispatch(toggleMobileSidebar(false))
                                        } } />

                                        <div className="sidebar-mobile-content transition-advance">
                                            {
                                                children
                                            }
                                        </div>
                                    </div>
                                </aside>
                            ) :
                            (
                                <aside className="sidebar">
                                    { children }
                                </aside>
                            )
                    }
                </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isMobileSidebarOpen: state.layout.isMobileSidebarOpen,
        layoutParameters: state.layout.parameters
    }
}

export default connect(mapStateToProps)(Sidebar)