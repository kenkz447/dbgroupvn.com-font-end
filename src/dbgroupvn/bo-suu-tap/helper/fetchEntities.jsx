const { fetchEntities } = require('../../shared/utilities')

import replace from 'lodash/replace'

import { mvcController, ENTITY_TYPE_ID } from '../configuration'
import { PATH_CATEGORY_DETAIL } from '../routes'

function pageFetchEntities(postParams, category, callback) {

    postParams.entityTypeId = ENTITY_TYPE_ID

    if (!postParams.page)
        postParams.page = 0
    if (!postParams.pageSize)
        postParams.pageSize = 9
    
    const baseItemPath = replace(PATH_CATEGORY_DETAIL, global.PATH_CATEGORY_SUFFIX, `/${category}`)

    fetchEntities(mvcController, postParams, baseItemPath, callback)
}

export default pageFetchEntities