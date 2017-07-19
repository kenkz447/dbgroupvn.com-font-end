import React, { Component } from 'react';

import $ from 'jquery'
import { default as classNames } from 'classnames'
import { connect } from 'react-redux'
import { toggleMobileSidebar } from '../_layout/actions'

class SideBarToggleStart extends Component {
    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this)
    }

    componentDidMount() {
        const { layoutParameters: { mediaSize } } = this.props
        if (mediaSize === 'md' || mediaSize === 'sm' || mediaSize == 'xs') {
            const $button = $('#sidebar-toggle-btn')
            const $content = $('#sidebar-toggle-content')

            const contentHeight = $content.outerHeight();
            $button.css('top', `-${Math.ceil(contentHeight / 2)}px`)
            $content.css('margin-left', '4rem')
        }
    }

    componentWillReceiveProps(nextProps) {
        const { layoutParameters: { header, breadcrumbs, mediaSize } } = nextProps
        if (mediaSize === 'md' || mediaSize === 'sm' || mediaSize == 'xs') {
            $('body').addClass('on-mobile')

            const $button = $('#sidebar-toggle-btn')
            const $content = $('#sidebar-toggle-content')
            const $wrapper = $('#sidebar-toggle-wrapper')
            const $window = $(window)
            const contentHeight = $content.outerHeight();
            const btnHeight = $button.height()
            const isWrapperFloat = $wrapper.hasClass('float')

            let toggleSidebarButtonOffsetTop = nextProps.layoutParameters.toggleSidebarButtonOffsetTop + 1

            if (nextProps.isMobileSidebarOpen == false)
                $button.removeClass('open').delay(500).queue(() => {
                    $button.removeClass('transition-advance')
                    $button.dequeue()
                })
            else
                $content.css('margin-left', '4rem')

            if (isWrapperFloat)
                toggleSidebarButtonOffsetTop = Math.ceil($wrapper.offset().top)

            if (!$wrapper.hasClass('static'))
                $(window).on('scroll.myscroll', function () {
                    const windowSrcollTop = $window.scrollTop()
                    if (windowSrcollTop > header.height) {
                        $button.css('position', 'fixed')
                        $button.css('top', toggleSidebarButtonOffsetTop)
                    }
                    else {
                        $button.css('position', 'absolute')
                        $button.css('top', `-${Math.ceil(contentHeight / 2 - 2)}px`)
                    }

                    if (windowSrcollTop > header.height + btnHeight)
                        $content.css('margin-left', '1rem')
                    else
                        $content.css('margin-left', '4rem')

                });
        }
        else {
            if ($('body').hasClass('on-mobile')) {
                $('body').removeClass('on-mobile')
                $(window).unbind('scroll.myscroll')
            }
        }

    }

    buttonClick(e) {
        const $button = $(e.target).parent()

        this.props.dispatch(toggleMobileSidebar(!$button.hasClass('open')))

        if ($button.hasClass('open')) {
            $button.removeClass('open').delay(500).queue(() => {
                $button.removeClass('transition-advance')
                $button.dequeue()
            })
        }
        else {
            $button.addClass('transition-advance')
            $button.addClass('open')
        }
    }

    render() {
        return (
            <div id="sidebar-toggle-wrapper" className={ classNames(this.props.className, 'sidebar-toggle-start') }>
                <div id="sidebar-toggle-content" className="sidebar-toggle-start-content transition-basic">
                    { this.props.children }
                </div>
                <div id="sidebar-toggle-btn" className="sidebar-toggle-btn d-lg-none text-primary">
                    <div className="w-100 h-100"  style={ {position: 'absolute'}} onClick={ this.buttonClick }></div>
                    <i className="fa fa-angle-double-right" aria-hidden="true" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isMobileSidebarOpen: state.layout.isMobileSidebarOpen,
        layoutParameters: state.layout.parameters
    }
}

export default connect(mapStateToProps)(SideBarToggleStart);