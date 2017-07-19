import React from 'react'
import { Pagination } from '../../shared/components'
import renderItem from '../helper/render-items'
import replace from 'lodash/replace'

import { PATH_INDEX_CATEGORY } from '../routes'

const PagePagination = (props) => {
    const { items, totalPages, currentPage, category } = props

    return (
        <Pagination itemWrapperClassName="page-item" className="w-100 pl-2 pl-lg-0 pr-2 pr-lg-0"
            layout={ { xs: 6, sm: 6, md: 4, lg: 4, xl: 4 } }
            items={ items }
            totalPages={ totalPages }
            currentPage={ currentPage }
            renderItem={ renderItem }
            templatePath={ replace(PATH_INDEX_CATEGORY, global.PATH_CATEGORY_SUFFIX, `/${category}`) }
        />
    )
}

export default PagePagination