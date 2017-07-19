import $ from 'jquery'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    TOGGLE_MOBILE_SIDEBAR, UPDATE_LAYOUT, TOGGLE_PAGE_LOADING,
    toggleMobileSidebar, updateLayout, togglePageLoading
} from './_layout/actions'

import Header from './_layout/header';
const Footer = require('./_layout/footer');
const OutNav = require('./_layout/mobile/menu');
const PageLoading = require('./_layout/main/page-loading');

const initState = {
    loadingFadeOutTime: 500,
}

const reducer = (state = initState, action) => {
    let newState = {};
    switch (action.type) {
        case UPDATE_LAYOUT:
            newState = $.extend(true, {}, state);
            newState.parameters = action.parameters;
            return newState;
        case TOGGLE_PAGE_LOADING:
            newState = $.extend(true, {}, state);
            newState.isPageLoadingVisible = action.toggle;
            return newState;
        case TOGGLE_MOBILE_SIDEBAR:
            newState = $.extend(true, {}, state);
            newState.isMobileSidebarOpen = action.toggle
            return newState
        default:
            return state;
    }
}

class LayoutController extends Component {
    componentDidUpdate() {
        const { layoutLoaded } = this.props;
        if (layoutLoaded) {
            const { updateLayout } = this.props;
            updateLayout();
        }
    }

    render() {
        return <div className="layout-controller" />;
    }
}

const stateToProps = (state) => ({
});

const reducerToProps = (reducer) => (
    bindActionCreators({ updateLayout, togglePageLoading }, reducer)
);

const ConnectedLayoutController = connect(stateToProps, reducerToProps)(LayoutController);

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }

        this.elementRefs = {
            layout: 'layout',
            header: 'header',
            main: 'main',
            footer: 'footer',
            loading: 'loader'
        }
    }

    componentDidMount() {
        this.setState({ loaded: true });
    }

    render() {
        const { children } = this.props;
        return (
            <div id={ this.elementRefs.layout } className="layout perspective" style={ { opacity: 0 } }>
                <div className="wrapper">
                    <Header id={ this.elementRefs.header } className="pl-1 pr-1 pt-3 pb-3 p-lg-3 pt-lg-4 pb-lg-4" />
                    <div id={ this.elementRefs.main } className="main pb-5 mt-lg-3">
                        { children }
                        <PageLoading id={ this.elementRefs.loading } />
                    </div>
                    <Footer id={ this.elementRefs.footer } className="p-2 p-md-4" />
                </div>
                <OutNav />
                <ConnectedLayoutController {...this.elementRefs} layoutLoaded={ this.state.loaded } />
            </div>
        );
    }
}

const actions = { toggleMobileSidebar, updateLayout, togglePageLoading }

export {
    actions,
    reducer,
}

export default Layout
