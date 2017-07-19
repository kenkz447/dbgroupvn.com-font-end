
import $ from 'jquery'

/**
 * Get random entities
 * @param {String} mvcController 
 * @param {Number} count
 */
export default function fetchRandomEntities(mvcController, count) {
    return new Promise((excutor) => {
        $.ajax({
            url: `${global.APP_DOMAIN}${mvcController}/getrandomEntity`,
            data: { count },
            xhrFields: {
                withCredentials: true
            },
            success: excutor
        });
    })
}