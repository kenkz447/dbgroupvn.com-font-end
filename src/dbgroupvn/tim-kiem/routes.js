import { ROUTE_BASE, GET_PATH_BASE as getSearchPagePath } from './configuraton'
import PageComponent from './index'


const routes = {
    exact: true,
    name: ROUTE_BASE,
    path: getSearchPagePath(),
    defaultLabel: global.localizationString.getString('Tìm kiếm'),
    component: PageComponent
}

export default routes