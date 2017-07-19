import $ from 'jquery'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Swipeable } from 'react-touch'

import PropTypes from 'prop-types'

//Actions
import { togglePageLoading, updateLayout } from '../actions'

//Components
import { ConnectedBreacrumbs, RenderDelay } from '../../components'
import { refreshRoutePath, addRouteToRoutePath } from '../../reducers/app-routes'

import searchTree from '../../utilities/search-tree'

const keys = {
  createNewPage: 'CREATE_NEW_PAGE',
  onDataFetch: 'ON_PAGE_FETCH_DATA',
  refresh: 'REFRESH_PAGE'
}

const actions = {
  createNewPage: (page) => ({
    type: keys.createNewPage,
    page
  }),

  //progress: 0 - 100.
  onDataFetch: (page, data, progress = 100) => ({
    type: keys.onDataFetch,
    page,
    data,
    progress
  }),

  refresh: (page) => ({
    type: keys.refresh,
    page
  })
}

const initState = {
  pages: {} //data of all page
}

const reducer = (state = initState, action) => {
  let newState = {};
  switch (action.type) {
    case keys.onDataFetch:
      newState = $.extend(true, {}, state);
      let pages = newState.pages;
      let currentPageData = $.extend(pages[ action.page ], action.data);

      if (!currentPageData.dataFetchProgress)
        currentPageData.dataFetchProgress = 0

      currentPageData.dataFetchProgress += action.progress;

      if (currentPageData.dataFetchProgress > 100)
        console.error(`'dataFetchProgress' phải từ 0 đến 100, hiện tại ${currentPageData.dataFetchProgress}.`);

      newState.pages[ action.page ] = currentPageData;
      return newState;
    case keys.createNewPage:
      newState = $.extend(true, {}, state);
      newState.pages[ action.page ] = {
        dataFetchProgress: 0
      };
      return newState;
    case keys.refresh:
      newState = $.extend(true, {}, state);
      newState.pages[ action.page ] = {};
      return newState;
    default:
      return state;
  }
}

class BasePage extends Component {
  static propTypes = {
    refreshRoutePath: PropTypes.func,
    addRouteToRoutePath: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.baseDelay = 1000;

    const { component, routes, page } = this.props;

    this.route = searchTree(routes, 'childRoutes', (node) => {
      return node.name == page
    })[ 0 ]

    this.swipeLeft = this.swipeLeft.bind(this)
    this.onDataFetch = this.onDataFetch.bind(this)
    this.onViewChange = this.onViewChange.bind(this)

    this.ElementWithDelayRender = RenderDelay({
      delay: this.baseDelay,
      onRender: this.onPageComponentRender.bind(this)
    })(component);
  }

  componentWillUnmount() {
    const { page, togglePageLoading, cleanPropsAfferLeave, refresh } = this.props;
    //updateLayout();
    togglePageLoading(true);
    if (cleanPropsAfferLeave)
      refresh(page)
  }

  swipeLeft() {
    global.openMenu();
  }

  onDataFetch(data, progress) {
    const { onDataFetch, page } = this.props;
    onDataFetch(page, data, progress);
  }

  onPageComponentRender() {
    const { togglePageLoading, loadingFadeOutTime } = this.props;
    const $element = $(ReactDOM.findDOMNode(this));

    togglePageLoading(false);
    $element.delay(this.baseDelay).fadeTo(500, 1);
  }

  componentWillMount() {
    const { refreshRoutePath, createNewPage,
      pages,
      page } = this.props;
    const pageData = pages[ page ]

    if (!pageData)
      createNewPage(page)

    refreshRoutePath(page);

    $(window).scrollTop(0);
  }

  onViewChange() {
    const { refreshRoutePath, page } = this.props
    refreshRoutePath(page)

    $(window).scrollTop(0);
  }

  render() {
    const { pages, page, //page name of component
      match, showBreadcrumbs, location } = this.props;

    const pageData = pages[ page ];
    if (!pageData)
      return null;

    return (
      <div className="base-page" style={ { opacity: 0 } }>
        <Swipeable onSwipeRight={ this.swipeLeft }>
          <div className="swipeable" />
        </Swipeable>
        {
          showBreadcrumbs && <ConnectedBreacrumbs containerClassName="d-none d-lg-block mb-lg-4"/>
        }
        <this.ElementWithDelayRender {...pageData} route={ this.route } onViewChange={ this.onViewChange } location={ location } match={ match } onDataFetch={ this.onDataFetch } />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return ({
    layoutParameter: state.layout.parameters,//remove will take no effect!
    loadingFadeOutTime: state.layout.loadingFadeOutTime,
    pages: state.connectedBasePage.pages,
    routes: state.appRouter.routes
  })
}

const dispathToProps = (dispath) => (
  bindActionCreators({
    togglePageLoading,
    updateLayout,
    refreshRoutePath,
    addRouteToRoutePath,
    ...actions
  }, dispath)
);

export { actions, reducer }

export default connect(stateToProps, dispathToProps)(BasePage)