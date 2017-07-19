import { DEFAULT_MENU } from '../shared/reducers/app-routes'

import { page } from './configuration.js'

import Page from './index'

const ROUTE_BASE = global.localizationString.getString(page)
const PATH_BASE = `${global.PATH_BASE}/${ROUTE_BASE}`

const ROUTE_CATEGORY = `${ROUTE_BASE}@CATEGORY`
const ROUTE_CATEGORY_PAGE = `${ROUTE_BASE}@CATEGORY_PAGE`
const ROUTE_CATEGORY_DETAIL = `${ROUTE_BASE}@DETAIL`

const PATH_CATEGORY = `${PATH_BASE}${global.PATH_CATEGORY_SUFFIX}`
const PATH_CATEGORY_PAGE = `${PATH_CATEGORY}${global.PATH_CATEGORY_PAGE_SUFFIX}`
const PATH_CATEGORY_DETAIL = `${PATH_CATEGORY}${global.PATH_DETAIL_SUFFIX}`

const routeCategoryPage = {
    virtual: true,
    path: PATH_CATEGORY_DETAIL,
    name: ROUTE_CATEGORY,
}

const routeDetail = {
    virtual: true,
    path: PATH_CATEGORY_PAGE,
    name: ROUTE_CATEGORY_DETAIL,
}

const routeCategory = {
    path: PATH_CATEGORY,
    name: ROUTE_CATEGORY_PAGE,
    defaultLocation: `/${global.localizationString.getString('tat-ca')}`,
    childRoutes: [ routeCategoryPage, routeDetail ]
}

const routes = {
    path: PATH_BASE,
    name: ROUTE_BASE,
    defaultLabel: global.localizationString.getString('Thư viện'),
    menuOrders: {
        [ DEFAULT_MENU ]: 3,
    },
    component: Page,
    redirectToChild: 0,
    childRoutes: [ routeCategory ]
}

export {
    PATH_CATEGORY, PATH_CATEGORY_PAGE, PATH_CATEGORY_DETAIL,
    ROUTE_CATEGORY, ROUTE_CATEGORY_PAGE, ROUTE_CATEGORY_DETAIL,
    routeCategory, routeCategoryPage, routeDetail
}

export default routes