import * as $ from 'jquery'

import * as includes from 'lodash/includes'

import Action from '../core/interfaces/ReduxAction'

const REGISTER_SIDERBAR_ITEM = 'SIDEBAR@REGISTER_ITEM'
const TOGGLE_SIDERBAR_ITEMS = 'SIDEBAR@TOGGLE_ITEMS'
const TOGGLE_SIDERBAR_ITEM = 'SIDEBAR@TOGGLE_ITEM'

export {
    REGISTER_SIDERBAR_ITEM,
    TOGGLE_SIDERBAR_ITEMS,
    TOGGLE_SIDERBAR_ITEM
}

/**
 * Đăng ký item vào phần quản lý của Sidebar
 * @param item Guid Id
 */
const registerSidebarItem = (item: String) => ({
    type: REGISTER_SIDERBAR_ITEM,
    item
})

/**
 * Mở một lúc nhiều items
 * Nếu truyền vào một array rỗng sẽ đóng toàn bộ
 * @param items 
 */
const toggleSidebarItems = (items: Array<String>, closeOthers?: boolean) => ({
    type: TOGGLE_SIDERBAR_ITEMS,
    items,
    closeOthers
})

/**
 * Sử dụng action này để mở một item và đóng tất cả các item khác
 * @param item
 */
const toggleSidebarItem = (item: String) => ({
    type: TOGGLE_SIDERBAR_ITEM,
    item
})

export {
    registerSidebarItem,
    toggleSidebarItems,
    toggleSidebarItem
}

interface SidebarAction extends Action {
    readonly item?: String
    readonly items?: Array<String>,
    readonly closeOthers?: boolean
}

class SidebarState {
    items: Array<String> = []
    openedItems: Array<String> = []
}

const reducer = (state = new SidebarState(), action: SidebarAction) => {
    let newState = new SidebarState()
    switch (action.type) {
        case REGISTER_SIDERBAR_ITEM:
            newState = $.extend({}, state)
            newState.items.push(action.item)
            console.log(newState)

            return newState
        case TOGGLE_SIDERBAR_ITEMS:
            newState = $.extend(true, {}, state)

            if (action.closeOthers)
                newState.openedItems = []

            for (let i = 0; i < action.items.length; i++) {
                const index = newState.openedItems.indexOf(action.items[i])

                if (index >= 0)
                    newState.openedItems.splice(index, 1)
                else
                    newState.openedItems.push(action.items[i])
            }
            return newState
        case TOGGLE_SIDERBAR_ITEM:
            newState = $.extend({}, state)

            if (includes(newState.openedItems, action.item))
                newState.openedItems = []
            else
                newState.openedItems = [action.item]

            return newState
        default:
            return state
    }
}

export default reducer