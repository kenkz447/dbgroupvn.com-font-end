//React/Redux
import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import map from 'lodash/map'
//Actions

//Components
import basePage from '../shared/_layout/main/base-page'

import { Sidebar, SidebarMenu, SidebarWidget } from '../shared/components'
import { Container, Row, Col } from 'reactstrap'

import FilterByStatus from './components/filter-by-status'

//Routes component
import DefaultView from './views/default-view'
import DetailView from './views/detail'

import { PATH_CATEGORY_PAGE, PATH_CATEGORY_DETAIL } from './routes.js'

//Page configuration
const pageConfigure = require('./configuration.js')

import { fetchPage, fetchTaxonomiesByTaxonomyTypeId, createCategoryUrlFromRoutePathAndCategoryName } from '../shared/utilities'

class PageComponent extends Component {
    static propTypes = {
        categories: PropTypes.array,
        match: PropTypes.object,
        onDataFetch: PropTypes.func,
        pageContent: PropTypes.object,
        dataFetchProgress: PropTypes.number,
        refreshRoutePath: PropTypes.func,
        pageRoute: PropTypes.object,
        onViewChange: PropTypes.func
    }

    static defaultProps = {
        categories: []
    }

    constructor(props) {
        super(props);
        this.state = {

        }
        
        this.renderSidebar = this.renderSidebar.bind(this)
    }

    componentWillMount() {
        const { onDataFetch, categories, pageContent } = this.props

        if (!pageContent)
            fetchPage(pageConfigure.page).then((response) => {
                onDataFetch({ pageContent: response.details }, 50);
            })

        if (!categories.length)
            fetchTaxonomiesByTaxonomyTypeId(pageConfigure.TAXONOMY_TYPE_ID_CATEGORY).then(function (categories) {
                onDataFetch({ categories }, 50)
            })
    }

    renderSidebar() {
        const { categories, match: { path } } = this.props;

        return (
            <Sidebar>
                {
                    categories && map(categories, (categoryTree, index) => {

                        const categoryMenuItems = categoryTree.children && map(categoryTree.children, ({ name, title }) => {
                            return { path: createCategoryUrlFromRoutePathAndCategoryName(path, name), title }
                        })

                        return (
                            <SidebarMenu toggleDefault={ index == 1 } key={ categoryTree.name } title={ categoryTree.title }
                                titleLink={ createCategoryUrlFromRoutePathAndCategoryName(path, categoryTree.name) }
                                items={ categoryMenuItems }
                            />
                        )
                    })
                }
                <br />
                <SidebarWidget title={ global.localizationString.getString('STATUS') } noCollapse noBorder>
                    <FilterByStatus onFilter={ (statusCode) => { 
                        this.setState({filtering: {status: statusCode}})
                    } } />
                </SidebarWidget>
            </Sidebar>
        )
    }

    renderRoutes() {
        const { match: { path }, onDataFetch, onViewChange } = this.props;

        const mainPageProps = {
            onViewChange,
            onDataFetch
        }

        return (
            <Switch>
                <Route path={ PATH_CATEGORY_DETAIL } render={ (viewRoute) => <DetailView {...viewRoute} {...mainPageProps} /> } />
                <Route path={ PATH_CATEGORY_PAGE } render={ (route) => <DefaultView {...route} filtering={this.state.filtering} {...mainPageProps} /> } />
                <Route exact={ true } path={ path } render={ (route) => <DefaultView {...route} filtering={this.state.filtering} {...mainPageProps} /> } />
            </Switch>
        )
    }

    render() {
        const { dataFetchProgress } = this.props

        if (dataFetchProgress != 100)
            return null

        return (
            <Container id="thu-vien">
                <Row>
                    <Col xs="12" lg="4" xl="3">
                        { this.renderSidebar() }
                    </Col>
                    <Col xs="12" lg="8" xl="9">
                        { this.renderRoutes() }
                    </Col>
                </Row>
            </Container>
        );
    }
}

const ConnectedPageComponent = connect()(PageComponent);

export default basePage({ page: pageConfigure.page, showBreadcrumbs: pageConfigure.showBreadcrumbs })(ConnectedPageComponent);