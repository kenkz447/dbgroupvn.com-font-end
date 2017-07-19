if (process.env == 'production')
    global.APP_DOMAIN = 'http://dbgroupvn.com'
else
    global.APP_DOMAIN = 'http://localhost:51579'


//Import jquery
import $ from 'jquery'
global.$ = global.jQuery = $

//Import bootstrap
global.Tether = require('tether')
global.Bootstrap = require('bootstrap')

global.AOS = require('aos')

//
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import { default as LocalizationString } from './dbgroupvn/shared/_localization'
global.localizationString = new LocalizationString()

//Keys and action
import { actions as localizationAction } from './dbgroupvn/shared/reducers/localization'

//Components and middleware
import updateLayoutMiddleware from './dbgroupvn/shared/_layout/middleware'

import reducer from './dbgroupvn/shared/reducer'

$(document).ready(function () {

    const url = `${global.APP_DOMAIN}/DbGroupVn/GetSiteInitData`
    $.ajax({
        url,
        xhrFields: {
            withCredentials: true
        },
        success: (response) => {
            //Nếu trong response có chứa newUrl thì that thế address = newUrl
            //Sự việc này diễn ra vì thiếu culture trong url.
            if (response.newUrl)
                window.history.replaceState({}, 'dbgroupvn', '//localhost:3000/en-US');

            global.isUserAuthenticated = response.isUserAuthenticated

            global.AOS.init();
            global.localizationString.setLanguage(response.localization.currentLanguage)

            const language = global.localizationString.getDefaultLanguage() != response.localization.currentLanguage ?
                response.localization.currentLanguage : null

            global.PATH_BASE = language ? `/${language}` : ''

            global.PATH_ENTITY_SUFFIX = '/:entity'
            global.PATH_DETAIL_SUFFIX = `/${global.localizationString.getString('chi-tiet')}${global.PATH_ENTITY_SUFFIX}`
            global.PATH_CATEGORY_PAGE_SUFFIX = '/:page'
            global.PATH_CATEGORY_SUFFIX = '/:category'

            const { history, Root } = require('./dbgroupvn/root')
            const historyMiddleware = routerMiddleware(history)
            const store = createStore(reducer, applyMiddleware(historyMiddleware, updateLayoutMiddleware));

            store.dispatch(localizationAction.init(response.localization))

            const { INIT_ROUTES } = require('./dbgroupvn/shared/reducers/app-routes')
            const routes = require('./dbgroupvn/routes').default

            //Routes
            store.dispatch({ type: INIT_ROUTES, routes })

            render(
                <AppContainer>
                    <Root store={ store } />
                </AppContainer>
                ,
                document.getElementById('root')
            );
        }
    });
});