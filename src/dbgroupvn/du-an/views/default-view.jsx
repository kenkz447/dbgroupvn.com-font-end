import React, { Component } from 'react'
import { connect } from 'react-redux'

//lodash
import map from 'lodash/map'
import PropTypes from 'prop-types'

//Components
import { Row } from 'reactstrap'
import { Image, SideBarToggleStart } from '../../shared/components'
import Pagination from '../components/pagination'

//Helper functions
import fetchEntities from '../helper/fetchEntities'
import { getCategoryByNameFromCatogires } from '../../shared/utilities'

const pageConfigure = require('../configuration.js')

class DefaultView extends Component {
    static propTypes = {
        showMarkerBalloon: PropTypes.func,
        match: PropTypes.object,
        pageContent: PropTypes.object,
        categories: PropTypes.array,
        items: PropTypes.array,
        totalPages: PropTypes.number,
        defaultPage: PropTypes.number
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
        this.onItemHover = this.onItemHover.bind(this)
    }

    updateViewProps(props) {
        const { categories, match: { params: { category, page } }, onDataFetch, setMapMarkers, searchArea, searchCity } = props
        const currentCategory = getCategoryByNameFromCatogires(category, categories)
        const currentPage = page || props.defaultPage

        const filtering = []
        if (searchArea)
            filtering.push(
                {
                    id: 'area',
                    value: searchArea.from,
                    operator: '>='
                },
                {
                    id: 'area',
                    value: searchArea.to,
                    operator: '<='
                }
            )

        if (searchCity)
            filtering.push({
                id: 'city',
                value: searchCity,
                operator: '=='
            })

        const postParams = {
            page: currentPage,
            pageSize: pageConfigure.ITEM_PER_PAGE,
            categories: currentCategory && { [ pageConfigure.TAXONOMY_TYPE_ID_CATEGORY ]: currentCategory.id },
            additionalFields: [ 'mapLongitude', 'mapLatitude' ],
            filtering
        }

        fetchEntities(postParams, (items, totalPages) => {
            onDataFetch({ items, totalPages }, 0)

            const markers = map(items, ({ id, thumbnailUrl, moreDetails: { mapLongitude, mapLatitude }, title, path }) => {
                return {
                    id,
                    lat: mapLatitude,
                    lng: mapLongitude,
                    title,
                    thumbnailUrl: `/${thumbnailUrl}`,
                    redirect: path,
                    height: 98,
                }
            })
            setMapMarkers(pageConfigure.smallMapId, markers)
        })
    }

    componentWillMount() {
        this.updateViewProps(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps) != JSON.stringify(this.props)) {
            this.updateViewProps(nextProps)
        }
    }

    onItemHover(isHover, item) {
        const { showMarkerBalloon } = this.props
        const markerId = isHover ? item.id : null

        showMarkerBalloon(pageConfigure.smallMapId, markerId)
    }


    render() {
        const { match, pageContent: { thumbnail, title }, categories, items, totalPages, defaultPage } = this.props

        const currentCategory = getCategoryByNameFromCatogires(match.params.category, categories)
        const currentPage = match.params.page ? parseInt(match.params.page) : defaultPage

        return (
            <Row>
                <Image className="h-100" {...thumbnail} />
                <SideBarToggleStart className=" mt-4 mb-3">
                    <h1 className="page-titles">
                        <span className="page-title">{ title }</span>
                        <span>|</span>
                        <span className="page-title">{ currentCategory && currentCategory.title }</span>
                    </h1>
                </SideBarToggleStart>
                {
                    currentCategory && (
                        <Pagination
                            items={ items }
                            totalPages={ totalPages }
                            currentPage={ currentPage }
                            category={ currentCategory.name }
                        />
                    )
                }
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    const { totalPages, items, categories, pageContent, searchArea, searchCity } = state.connectedBasePage.pages[ pageConfigure.page ]
    return {
        totalPages,
        items,
        categories,
        pageContent,
        searchArea, searchCity
    }
}

export default connect(mapStateToProps)(DefaultView)