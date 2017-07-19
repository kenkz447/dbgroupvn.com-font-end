import $ from 'jquery';
import ListToTree from 'list-to-tree'

const TAXONOMY_CONTROLLER = '/TaxonomyUI'
const GET_TAXONOMIES_ACTION = '/GetTaxonomies'

function fetchTaxonomiesByTaxonomyType(taxonomyTypeId) {
    return new Promise((executor) => {
        const requestUrl = `${global.APP_DOMAIN}${TAXONOMY_CONTROLLER}${GET_TAXONOMIES_ACTION}`

        $.ajax({
            url: requestUrl,
            data: { taxonomyTypeId },
            xhrFields: {
                withCredentials: true
            },
            success: (responseFlatCategoryArray) => {
                const ltt = new ListToTree(responseFlatCategoryArray, { key_parent: 'parentId', key_child: 'children' })
                const categories = ltt.GetTree()

                categories.unshift({
                    name: global.localizationString.getString('tat-ca'),
                    title: global.localizationString.getString('Tất cả'),
                })
                executor(categories)
            }
        })
    })
}

export default fetchTaxonomiesByTaxonomyType