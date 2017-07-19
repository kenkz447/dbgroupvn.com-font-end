const { fetchEntities } = require('../../shared/utilities')

import { mvcController, ENTITY_TYPE_ID } from '../configuration'
import { PATH_DETAIL } from '../routes'

function pageFetchEntities(postParams, callback) {

    postParams.entityTypeId = ENTITY_TYPE_ID

    if (!postParams.page)
        postParams.page = 0
    if (!postParams.pageSize)
        postParams.pageSize = 9
    
    fetchEntities(mvcController, postParams, PATH_DETAIL, callback)
}

export default pageFetchEntities