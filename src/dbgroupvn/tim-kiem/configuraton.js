export const page = 'tim-kiem'

export const ROUTE_BASE = page

export const PATH_TITLE = '/:title'

export const GET_PATH_BASE = () => {
    return `${global.PATH_BASE}/${global.localizationString.getString(page)}${PATH_TITLE}`
}