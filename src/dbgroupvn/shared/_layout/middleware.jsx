import $ from 'jquery'

import { LOCATION_CHANGE } from 'react-router-redux';

import {
    TOGGLE_MOBILE_SIDEBAR, UPDATE_LAYOUT,
    toggleMobileSidebar
} from './actions'


function onElementHeightChange(elm, callback) {
    let lastHeight = elm.clientHeight, newHeight;
    (function run() {
        newHeight = elm.clientHeight;
        if (lastHeight != newHeight)
            callback();
        lastHeight = newHeight;

        if (elm.onElementHeightChangeTimer)
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

//middle ware to update layout after switch page, etc...
const updateLayoutMiddleware = store => next => action => {
    if (action.type == UPDATE_LAYOUT) {
        const mainElement = document.getElementById('main');

        onElementHeightChange(document.body, function () {
            //Nếu height của body thay đổi thì refresh AOS
            global.AOS.refresh();
        });

        onElementHeightChange(mainElement, function () {
            store.dispatch(action)
        });

        const footerElement = document.getElementById('footer')
        const breadcrumbs = document.getElementById('breadcrumbs')

        const toggleSidebarWrapper = document.getElementById('sidebar-toggle-wrapper')

        const headerHeight = document.getElementById('header').clientHeight;
        const footerHeight = footerElement.clientHeight;
        const viewportHeight = window.innerHeight;

        const toggleSidebarButtonOffsetTop = toggleSidebarWrapper &&
            parseInt($(toggleSidebarWrapper).offset().top - $(toggleSidebarWrapper).outerHeight() -
                (toggleSidebarWrapper ? $(toggleSidebarWrapper).outerHeight() / 2 : 0) - (breadcrumbs ? breadcrumbs.clientHeight / 2 : 0))

        const layoutParameters = {
            header: { id: 'header', height: headerHeight },
            main: { id: 'main', minHeight: viewportHeight - footerHeight - headerHeight },
            footer: { id: 'footer', height: footerHeight },
            loading: { id: 'loading' },
            breadcrumbs: { height: breadcrumbs && parseInt(breadcrumbs.clientHeight) },
            toggleSidebarButtonOffsetTop,
            viewportHeight,
        }
        const windowWidth = parseInt(window.innerWidth)
        if (windowWidth > 1200)
            layoutParameters.mediaSize = 'xl'
        else if (windowWidth > 992)
            layoutParameters.mediaSize = 'lg'
        else if (windowWidth > 786)
            layoutParameters.mediaSize = 'md'
        else if (windowWidth > 579)
            layoutParameters.mediaSize = 'md'
        else
            layoutParameters.mediaSize = 'xs'

        if (layoutParameters.mediaSize == 'xl' || layoutParameters.mediaSize == 'lg')
            layoutParameters.isSmallDevice = false
        else
            layoutParameters.isSmallDevice = true

        $(mainElement).css('min-height', layoutParameters.main.minHeight)
        $(document.getElementById('layout')).fadeTo(500, 1)
        $(document.getElementById('loading')).css('height', layoutParameters.main.minHeight)
        action.parameters = layoutParameters;
    }
    if (action.type === TOGGLE_MOBILE_SIDEBAR) {
        if (action.toggle)
            $('html').css('overflow-y', 'hidden')
        else
            $('html').css('overflow-y', 'auto')
    }

    //hidden sidebar after navigated
    if (action.type === LOCATION_CHANGE) {
        store.dispatch(toggleMobileSidebar(false))
    }

    return next(action)
}

export default updateLayoutMiddleware