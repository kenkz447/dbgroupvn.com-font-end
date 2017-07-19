import $ from 'jquery'
const ACTION = '/getMulti'

function fetchMultiEntity(entityIds, mvcController) {
    return new Promise((executor) => {
        const requestUrl = `${global.APP_DOMAIN}${mvcController}${ACTION}`
        $.ajax({
            url: requestUrl,
            success: executor,
            traditional: true,
            data: { entityIds },
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        })
    })
}

export default fetchMultiEntity