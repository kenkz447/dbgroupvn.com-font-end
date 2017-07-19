
import lodashMap from 'lodash/map'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PropTypes from 'prop-types'
import replace from 'lodash/replace'

//Actions
import { setMapValue, setMapMarkers, showMarkerBalloon } from '../shared/reducers/google-map'

//Global Components
import { default as basePage } from '../shared/_layout/main/base-page'
import { Container, Row, Col } from 'reactstrap'
import { Sidebar, SidebarMenu } from '../shared/components'

//Local Components
import { default as SearchByArea } from './components/search-area';
import { default as SearchByCity } from './components/sreach-city';
import { default as SmallMap } from './components/small-map';

//Views
import BigMap from './views/big-map'
import DefaultView from './views/default-view'

//Helper and utilities
import {
    createCategoryUrlFromRoutePathAndCategoryName,
    fetchPage, fetchTaxonomiesByTaxonomyTypeId,
} from '../shared/utilities'

import { PATH_INDEX_CATEGORY, PATH_INDEX_CATEGORY_PAGE, PATH_INDEX_MAP_CATEGORY } from './routes'

//Page configures
const pageConfigure = require('./configuration.js')

class PageComponent extends Component {
    static propTypes = {
        onDataFetch: PropTypes.func,
        refreshRoutePath: PropTypes.func,
        categories: PropTypes.array,
        pageContent: PropTypes.any,
        setMapValue: PropTypes.func,
        searchArea: PropTypes.any,
        defaultMap: PropTypes.any,
        currentCategory: PropTypes.any,
        match: PropTypes.any,
        location: PropTypes.any,
        map: PropTypes.any,
        setMapMarkers: PropTypes.func,
        showMarkerBalloon: PropTypes.func,
        dataFetchProgress: PropTypes.number,
        onViewChange: PropTypes.func
    }

    static defaultProps = {
        map: {
            center: [ 15.866913899999986, 104.1218629 ],
            zoom: 5,
        },
        items: []
    }

    constructor() {
        super()
        this.renderSidebar = this.renderSidebar.bind(this)
        this.renderRoutes = this.renderRoutes.bind(this)
    }

    componentWillMount() {
        const { onDataFetch, categories, pageContent } = this.props

        if (!pageContent)
            fetchPage(pageConfigure.page).then((response) => {
                onDataFetch({ pageContent: response.details }, 50);

            })

        if (!categories)
            fetchTaxonomiesByTaxonomyTypeId(pageConfigure.TAXONOMY_TYPE_ID_CATEGORY).then((responseCategories) => {
                onDataFetch({ categories: responseCategories }, 50)
            })
    }

    componentWillUnmount() {
        this.props.onDataFetch({ searchArea: null, searchCity: null }, 0)
        this.props.onViewChange()
    }

    onSearchByArea(from, to) {
        let searchArea = { from, to }
        if (from === -1 || to === -1)
            searchArea = null
        this.props.onDataFetch({ searchArea }, 0)
    }

    onSearchByCity(city, map) {
        const { setMapValue, onDataFetch, defaultMap } = this.props;

        onDataFetch({ searchCity: city }, 0)

        setMapValue(pageConfigure.smallMapId, map || defaultMap)
    }

    renderSidebar() {
        const { categories, currentCategory, map } = this.props;

        const categoryMenuItems = lodashMap(categories, ({ name, title }) => {
            return { path: createCategoryUrlFromRoutePathAndCategoryName(PATH_INDEX_CATEGORY, name), title }
        })

        return (
            <Sidebar>
                <SidebarMenu title={ global.localizationString.getString('loại công trình') }
                    items={ categoryMenuItems }
                />
                <SearchByArea onSearch={ this.onSearchByArea.bind(this) } />
                <SearchByCity onCityChange={ this.onSearchByCity.bind(this) } />

                <SmallMap map={ map }
                    linkToBigMap={ replace(PATH_INDEX_MAP_CATEGORY, global.PATH_CATEGORY_SUFFIX, `/${currentCategory ? currentCategory.name : global.localizationString.getString('tat-ca')}`) }
                    hiddenBigMapLink={ false }
                />
            </Sidebar>
        )
    }

    renderRoutes() {
        const { onDataFetch, setMapMarkers, showMarkerBalloon, onViewChange } = this.props;

        const mainPageProps = {
            onDataFetch,
            setMapMarkers,
            showMarkerBalloon,
            onViewChange
        }

        return (
            <Switch>
                <Route path={ PATH_INDEX_MAP_CATEGORY } render={ (route) => <BigMap {...route} {...mainPageProps} /> } />
                <Route path={ PATH_INDEX_CATEGORY_PAGE } render={ (route) => <DefaultView {...route} {...mainPageProps} /> } />
                <Route path={ PATH_INDEX_CATEGORY } render={ (route) => <DefaultView {...route} {...mainPageProps} /> } />
            </Switch>
        )
    }

    render() {
        if (this.props.dataFetchProgress != 100)
            return null;

        return (
            <Container id={ pageConfigure.page }>
                <Row>
                    <Col lg="3">
                        { this.renderSidebar() }
                    </Col>
                    <Col xs="12" lg="9">
                        { this.renderRoutes() }
                    </Col>
                </Row>
            </Container>
        );
    }
}

const stateToProps = () => ({

})

const dispathToProps = (dispath) => (
    bindActionCreators({ setMapValue, setMapMarkers, showMarkerBalloon }, dispath)
)

const ConnectedPageComponent = connect(stateToProps, dispathToProps)(PageComponent)

module.exports = basePage({ page: pageConfigure.page, showBreadcrumbs: pageConfigure.showBreadcrumb })(ConnectedPageComponent);