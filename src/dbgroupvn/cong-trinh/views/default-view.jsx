import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

//Components
import { Row } from 'reactstrap'
import { Image, SideBarToggleStart } from '../../shared/components'

import Pagination from '../components/pagination'

//Helper functions
const { getCategoryByNameFromCatogires } = require('../../shared/utilities')

import fetchEntities from '../helper/fetchEntities'

const pageConfigure = require('../configuration.js')

class DefaultView extends Component {
    static propTypes = {
        match: PropTypes.object,
        categories: PropTypes.array,
        pageContent: PropTypes.object,
        items: PropTypes.array,
        totalPages: PropTypes.number,
        defaultPage: PropTypes.number,
        filtering: PropTypes.object
    }

    static defaultProps = {
        defaultPage: 1,
        categories: [],
        pageContent: {
            thumbnail: {}
        }
    }

    constructor(props) {
        super(props);
        this.updateViewProps = this.updateViewProps.bind(this)
    }

    updateViewProps(props) {
        const { categories, match: { params: { category, page } }, onDataFetch } = props
        const currentCategory = getCategoryByNameFromCatogires(category || 'tat-ca', categories)
        const currentPage = page || props.defaultPage

        const filtering = []
        if (props.filtering && props.filtering.status)
            filtering.push(
                {
                    id: 'status',
                    value: props.filtering.status,
                }
            )

        const postParams = {
            page: currentPage,
            pageSize: pageConfigure.ITEM_PER_PAGE,
            categories: currentCategory.id && { [ pageConfigure.TAXONOMY_TYPE_ID_CATEGORY ]: currentCategory.id },
            filtering
        }

        fetchEntities(postParams, category,(items, totalPages) => {
            onDataFetch({ items, totalPages }, 0)
        })
    }

    componentWillMount() {
        this.updateViewProps(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const filteringChanged = JSON.stringify(nextProps.filtering) != JSON.stringify(this.props.filtering)
        if (filteringChanged)
            this.updateViewProps(nextProps)
        else {
            if (filteringChanged || JSON.stringify(nextProps.match) != JSON.stringify(this.props.match) ||
                JSON.stringify(nextProps.categories) != JSON.stringify(this.props.categories)) {
                this.updateViewProps(nextProps, !filteringChanged)
            }
        }
    }

    render() {
        const { match, pageContent: { thumbnail, title }, categories, items, totalPages, defaultPage } = this.props

        const currentCategory = getCategoryByNameFromCatogires(match.params.category, categories)
        const currentPage = match.params.page ? parseInt(match.params.page) : defaultPage

        return (
            <Row>
                <Image className="h-100" {...thumbnail} />
                <SideBarToggleStart className="mt-4 mb-3">
                    <h1 className="page-titles">
                        <span className="page-title">{ title }</span>
                        <span>|</span>
                        <span className="page-title">{ currentCategory && currentCategory.title }</span>
                    </h1>
                </SideBarToggleStart>
                {
                    currentCategory &&
                        <Pagination items={ items } totalPages={ totalPages } currentPage={ currentPage } category={ currentCategory.name }/>
                }
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    const { totalPages, items, categories, pageContent } = state.connectedBasePage.pages[ pageConfigure.page ]
    return {
        totalPages,
        items,
        categories,
        pageContent
    }
}

export default connect(mapStateToProps)(DefaultView)