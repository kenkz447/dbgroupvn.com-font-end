


import { default as Title } from './components/section-title'
import { default as PageArticle } from './components/page-article'
import { default as Image } from './components/image'
import { default as RenderDelay } from './components/_commons/delay-render'

import { default as ConnectedBreacrumbs } from './components/connected-breacrumbs'
import { default as Sidebar } from './components/sidebar'
import { default as CategoryMenu } from './components/category-menu'
import { default as PageItem } from './components/page-item'
import { default as SidebarMenu } from './components/sidebar-menu'
import { default as SidebarWidget } from './components/sidebar-widget'
import { default as GoogleMap } from './components/gmap/google-map'
import { default as Pagination } from './components/pagination'
import { default as SideBarToggleStart } from './components/sidebar-toggle-start'

import LightBox from './components/light-box'
import SocialIcons from './components/social-icons'
import NavigationController from './components/navigation-controller'
import ImagesLightBox from './components/images-light-box'
import Sticky from './components/stick-in-parent/stick'

import renderProductItem, { ProductItem } from './components/e-commerce/product-item'
import renderProductQuickView, { ProductQuickView } from './components/e-commerce/product-quick-view'

const eCommerce = {
    renderProductItem, ProductItem,
    renderProductQuickView, ProductQuickView
}

export {
    RenderDelay,
    Title,
    PageArticle,
    Image,
    ConnectedBreacrumbs,
    Sidebar,
    CategoryMenu,
    PageItem,
    SidebarMenu,
    SidebarWidget,
    GoogleMap,
    Pagination,
    SideBarToggleStart,
    LightBox,
    SocialIcons,
    eCommerce,
    NavigationController,
    ImagesLightBox,
    Sticky
}