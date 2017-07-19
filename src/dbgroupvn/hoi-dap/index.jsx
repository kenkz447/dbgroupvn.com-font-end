//React/Redux
import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import PropTypes from 'prop-types'

//Components
import basePage from '../shared/_layout/main/base-page'
import { Container } from 'reactstrap'

//Views
import { default as DefaultView } from './views/default'

//Helper function
import { getOptions } from '../shared/utilities'

//Page configuration
const pageConfigure = require('./configuration.js')

class HoiDap extends Component {
    static propTypes = {
        match: PropTypes.object,
        items: PropTypes.array,
        onDataFetch: PropTypes.func,
        dataFetchProgress: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.renderRoutes = this.renderRoutes.bind(this)
    }

    componentWillMount() {
        const { onDataFetch, items } = this.props

        if (!items) {
            getOptions('faq').then((items) => {
                onDataFetch({ items }, 100)
            })
        }
    }

    renderRoutes() {
        const { match } = this.props
        return (
            <Switch>
                <Route exact={ true } path={ `${match.path}` } component={ DefaultView } />
                <Route path={ `${match.path}/:page` } component={ DefaultView } />
            </Switch>
        )
    }

    render() {
        const { dataFetchProgress } = this.props
        if (dataFetchProgress != 100)
            return null

        return (
            <Container id="thu-vien">
                { this.renderRoutes() }
            </Container>
        );
    }
}

module.exports = basePage({ page: pageConfigure.page, showBreadcrumbs: pageConfigure.showBreadcrumbs })(HoiDap);