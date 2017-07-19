import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter, } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import startsWith from 'lodash/startsWith'

import reject from 'lodash/reject'

const renderRoute = (route) => {
    const { name, childRoutes, redirectToChild, redirectFroms, component, path } = route
    const childRoutesNotVirtual = reject(childRoutes, { virtual: true })

    if (redirectToChild != null || redirectToChild != undefined) {
        const switcH = (
            <Switch key={ name }>
                {
                    map(childRoutesNotVirtual, (child) => {
                        if (!child.defaultLabel)
                            child.defaultLabel = route.defaultLabel

                        if (startsWith(String(child.path), '/:'))
                            child.path = path + child.path

                        if (!child.component)
                            child.component = component

                        return renderRoute(child)
                    })
                }
                <Redirect from={ path } to={ path + childRoutes[ redirectToChild ].defaultLocation } />
                {
                    map(redirectFroms, (from) => <Redirect key={ from } exact={ true } from={ from } to={ path + childRoutes[ redirectToChild ].defaultLocation } />)
                }
            </Switch>
        )
        return switcH
    }


    return <Route key={ name } {...route} path={ path } />
}

const renderRoutes = ({ path, exact, component, childRoutes }) => {
    const routeComponents = map(childRoutes, renderRoute);

    //Root route
    routeComponents.unshift(<Route exact={ exact } key={ path } path={ path } component={ component } />)

    return routeComponents;
}

const ExtendedConnectedRouter = ({ routes, history, wrapper }) => {
    const Wrapper = wrapper
    return (
        <ConnectedRouter history={ history }>
            <Wrapper>
                {
                    routes && renderRoutes(routes)
                }
            </Wrapper>
        </ConnectedRouter>
    )
}

ExtendedConnectedRouter.propTypes = {
    routes: PropTypes.any,
    history: PropTypes.any,
    wrapper: PropTypes.any
}

const stateToProps = (state) => ({
    routes: state.appRouter.routes
})

export default connect(stateToProps)(ExtendedConnectedRouter)