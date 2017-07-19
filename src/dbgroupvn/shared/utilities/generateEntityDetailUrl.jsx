import map from 'lodash/map'
import replace from 'lodash/replace'
import isArray from 'lodash/isArray'

/**
 * Create link to entity detail page
 * @param {Array} entities 
 * @param {String} routePath 
 * @param {String} paramKey 
 */

function generateEntityDetailUrl(entities, routePath, paramKey = ':entity') {
    if (!isArray(entities))
        return []
    
    entities = map(entities, (entity) => {
        entity.path = replace(String(routePath), paramKey, entity.name)
        return entity
    })
    return entities
}

export default generateEntityDetailUrl