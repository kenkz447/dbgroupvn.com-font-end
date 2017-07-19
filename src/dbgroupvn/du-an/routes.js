import { DEFAULT_MENU } from '../shared/reducers/app-routes'

import { page } from './configuration.js'

import Index from './index'
import Detail from './detail'

const ROUTE_BASE = global.localizationString.getString(page)
const PATH_BASE = `${global.PATH_BASE}/${ROUTE_BASE}`

const ROUTE_INDEX = `${ROUTE_BASE}@INDEX`
const PATH_INDEX = `${PATH_BASE}/index`

const ROUTE_INDEX_CATEGORY = `${ROUTE_INDEX}@CATEGORY`
const ROUTE_INDEX_CATEGORY_PAGE = `${ROUTE_INDEX}@CATEGORY_PAGE`
const ROUTE_INDEX_MAP_CATEGORY = `${ROUTE_INDEX}@MAP`

const PATH_INDEX_CATEGORY = `${PATH_INDEX}${global.PATH_CATEGORY_SUFFIX}`
const PATH_INDEX_CATEGORY_PAGE = `${PATH_INDEX_CATEGORY}${global.PATH_CATEGORY_PAGE_SUFFIX}`
const PATH_INDEX_MAP_CATEGORY = `${PATH_BASE}/${global.localizationString.getString('ban-do')}${global.PATH_CATEGORY_SUFFIX}`

const routeCategoryPage = {
    virtual: true,
    path: PATH_DETAIL,
    name: ROUTE_INDEX_CATEGORY,
}

const routeCategory = {
    path: PATH_INDEX_CATEGORY,
    name: ROUTE_INDEX_CATEGORY_PAGE,
    defaultLocation: `/${global.localizationString.getString('tat-ca')}`,
    childRoutes: [ routeCategoryPage ]
}

const routeMapCategory = {
    path: PATH_INDEX_MAP_CATEGORY,
    name: ROUTE_INDEX_MAP_CATEGORY,
}

const routeIndex = {
    path: PATH_INDEX,
    name: ROUTE_INDEX,
    component: Index,
    defaultLabel: global.localizationString.getString('Dự Án'),
    redirectFroms: [ PATH_BASE ],
    redirectToChild: 0,
    menuOrders: {
        [ DEFAULT_MENU ]: {
            order: 3,
            baseUrl: PATH_BASE
        },
    },
    childRoutes: [ routeCategory, routeMapCategory ]
}

const ROUTE_DETAIL = `${ROUTE_BASE}@DETAIL`
const PATH_DETAIL = `${PATH_BASE}${global.PATH_DETAIL_SUFFIX}`

const routeDetail = {
    exac: true,
    path: PATH_DETAIL,
    name: ROUTE_DETAIL,
    component: Detail
}

export {
    PATH_INDEX_CATEGORY, PATH_INDEX_CATEGORY_PAGE, PATH_DETAIL, PATH_INDEX_MAP_CATEGORY,
    ROUTE_INDEX_CATEGORY, ROUTE_INDEX_CATEGORY_PAGE, ROUTE_DETAIL, ROUTE_INDEX_MAP_CATEGORY,
    routeCategory, routeCategoryPage, routeDetail, routeMapCategory
}

export default routeIndex