import $ from 'jquery';

const GET_SINGLE_ACTION = '/getsingle'
const PAGE_CONTROLLER = '/page'

function fetchSingleEntity(entityName, mvcController) {
    return new Promise((executor) => {
        const requestUrl = `${global.APP_DOMAIN}${mvcController}${GET_SINGLE_ACTION}?entityName=${entityName}`
        $.ajax({
            url: requestUrl,
            success: executor,
            xhrFields: {
                withCredentials: true
            }
        })
    })
}

function fetchPage(entityName) {
    return new Promise((executor) => {
        const requestUrl = `${global.APP_DOMAIN}${PAGE_CONTROLLER}${GET_SINGLE_ACTION}?entityName=${entityName}`
        $.ajax({
            url: requestUrl,
            xhrFields: {
                withCredentials: true
            },
            success: executor
        })
    })
}

export { fetchPage, fetchSingleEntity }