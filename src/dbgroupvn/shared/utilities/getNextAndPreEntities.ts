import * as $ from 'jquery'

/**
 * Get next and pre entities of current entity
 * @param currentEntityId 
 */
function getNextAndPreEntities(mvcController: String, currentEntityId: Number, taxonomies?: Array<Number>) {

    let url = `${(global as any).APP_DOMAIN}${mvcController}`
    if (taxonomies)
        url += '/GetNextAndPreEntityByTaxonomies'
    else
        url += `/GetNextAndPreEntity`
    
    return new Promise((excutor) => {

        $.ajax({
            url,
            data: { currentEntityId, taxonomies },
            xhrFields: {
                withCredentials: true
            },
            success: excutor
        })
    })
}

export default getNextAndPreEntities