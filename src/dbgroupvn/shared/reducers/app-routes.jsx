
import $ from 'jquery'
import assign from 'lodash/assign'

const DEFAULT_MENU = 'PRIMARY'

const INIT_ROUTES = 'APP_ROUTE@INIT_ROUTES'
const REFRESH_ROUTE_PATH = 'APP_ROUTE@REFRESG_ROUTE_PATH'
const ADD_ROUTE_TO_ROUTE_PATH = 'APP_ROUTE@ADD_ROUTE_TO_ROUTE_PATH'

const popularMenusFromRoute = (menus, route) => {
    const { exact, path, label, defaultLabel, menuOrders } = route

    //Nếu menuOrders không được định nghĩa thì không thêm route vào menu
    if (!menuOrders)
        return

    for (const menuLocation in menuOrders) {
        //Tạo menu nếu trong route được định nghĩa menuOrders
        if (!menus[ menuLocation ])
            menus[ menuLocation ] = []

        //Thứ tự của 
        const menuOrder = menuOrders[ menuLocation ]

        let menuItems = { exact, url: path, label: label || defaultLabel, order: menuOrder }

        if (Number.isInteger(menuOrder))
            menuItems.order = menuOrder
        else
            menuItems = assign(menuItems, menuOrder)

        menus[ menuLocation ].push(menuItems)
    }

    return menus
}

const menuFormRootRoute = (rootRoute) => {
    //menus là một object tập hợp của nhiều menu, với property là têm menu và value và array menu item
    //Mặc định cho menu của app là 'PRIMARY' được định nghĩa bởi const 'DEFAULT_MENU'
    let menus = {
        [ DEFAULT_MENU ]: []
    }

    //tạo menu item cho  trang chủ (root route)
    menus = popularMenusFromRoute(menus, rootRoute);

    const { childRoutes } = rootRoute

    //tạo menu item cho các route con
    for (const childIndex in childRoutes) {
        if (childRoutes[ childIndex ].menuOrders)
            menus = popularMenusFromRoute(menus, childRoutes[ childIndex ])
    }

    return menus
}

const getRoutePath = (routes = [], currentRouteName, labels) => {
    let resultRoutePath = []

    for (const routeIndex in routes) {
        const route = routes[ routeIndex ]

        if (labels && labels[ route.name ])
            route.label = labels[ route.name ]
        else
            route.label = route.defaultLabel
        if (route.name == currentRouteName) {
            resultRoutePath.push(route)
            return resultRoutePath
        } else if (route.childRoutes) {
            resultRoutePath.push(route)
            const nextRoute = getRoutePath(route.childRoutes, currentRouteName, labels);
            if (nextRoute.length) {
                resultRoutePath = resultRoutePath.concat(nextRoute)
                return resultRoutePath
            } else
                resultRoutePath = []
        } else {
            resultRoutePath = []
        }
    }

    return resultRoutePath
}

const refreshRoutePath = (currentRouteName, replaceRouteDefaultLabels) => ({
    type: REFRESH_ROUTE_PATH,
    currentRouteName,
    replaceRouteDefaultLabels
})

const addRouteToRoutePath = (route, overrideProps) => ({
    type: ADD_ROUTE_TO_ROUTE_PATH,
    route,
    overrideProps
})

const reducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case INIT_ROUTES:
            newState = {
                routes: action.routes,
                menus: menuFormRootRoute(action.routes)
            }
            return newState
        case REFRESH_ROUTE_PATH:
            newState = $.extend(true, {}, state)
            newState.routePath = getRoutePath(state.routes.childRoutes, action.currentRouteName, action.routeLabels);
            newState.routePath.unshift(state.routes)
            return newState
        case ADD_ROUTE_TO_ROUTE_PATH:
            newState = $.extend(true, {}, state)
            newState.routePath.push($.extend(action.route, action.overrideProps))
            return newState
        default:
            return state
    }
}

export { reducer, refreshRoutePath, addRouteToRoutePath, INIT_ROUTES, DEFAULT_MENU }