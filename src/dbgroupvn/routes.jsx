
import map from 'lodash/map'
import startWiths from 'lodash/startsWith'

import TrangChu from './trang-chu/index'
import VeChungToi from './gioi-thieu/index'
import HoiDap from './hoi-dap/index'
import LienHe from './lien-he/index'

//routes
import CongTrinh from './cong-trinh/routes.js'
import BoSuuTap from './bo-suu-tap/routes.js'
import ThuVien from './thu-vien/routes.js'
import DuAn, { routeDetail as DuAnDetail } from './du-an/routes.js'
import TimKiem from './tim-kiem/routes.js'

import { DEFAULT_MENU } from './shared/reducers/app-routes'

const { PATH_BASE } = global

const childRoutes = [
    {
        exact: true,
        path: `/${global.localizationString.getString('ve-chung-toi')}`,
        name: 've-chung-toi',
        defaultLabel: global.localizationString.getString('Về chúng tôi'),
        menuOrders: {
            [ DEFAULT_MENU ]: 2,
        },
        component: VeChungToi
    },
    CongTrinh,
    BoSuuTap,
    DuAnDetail, DuAn,
    ThuVien,
    {
        path: `/${global.localizationString.getString('hoi-dap')}`,
        name: 'hoi-dap',
        defaultLabel: global.localizationString.getString('Hỏi đáp'),
        menuOrders: {
            [ DEFAULT_MENU ]: 7,
            footer: 2
        },
        component: HoiDap
    },
    {
        path: `/${global.localizationString.getString('lien-he')}`,
        name: 'lien-he',
        defaultLabel: global.localizationString.getString('Liên hệ'),
        menuOrders: {
            [ DEFAULT_MENU ]: 8,
            footer: 1
        },
        component: LienHe
    },
    TimKiem
];

function modifyRoutesPath(routes) {
    return map(routes, (route) => {
        if (PATH_BASE && !startWiths(route.path, PATH_BASE))
            route.path = `${PATH_BASE}${route.path}`
        if (route.childRoutes)
            route.childRoutes = modifyRoutesPath(route.childRoutes)
        return route
    })
}

const mainRoute = ({
    exact: true,
    path: PATH_BASE || '/',
    name: 'trang-chu',
    label: global.localizationString.getString('Trang chủ'),
    menuOrders: {
        [ DEFAULT_MENU ]: 1,
        footer: 3
    },
    component: TrangChu,
    childRoutes: modifyRoutesPath(childRoutes)
})

export default mainRoute