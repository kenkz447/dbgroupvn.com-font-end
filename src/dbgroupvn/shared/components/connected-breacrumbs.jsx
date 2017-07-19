import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import map from 'lodash/map'

const ConnectedBreadcrumbs = (props) => {
    const { routes, containerClassName, className, id } = props;

    if (routes)
        return (
            <Container className={ containerClassName }>
                <nav id={ id } className={ className }>
                    {
                        map(routes, (route, index) => {
                            const isLast = (route.path === routes[ routes.length - 1 ].path)

                            return (
                                <span key={ index } className="">
                                    {
                                        !isLast ? <Link to={ route.url || route.path }>{ route.label }</Link>
                                            : <a>{ route.label }</a>
                                    }
                                </span>
                            )
                        })
                    }
                </nav>
            </Container>
        )
    else
        return null
}

ConnectedBreadcrumbs.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string.isRequired
    })),
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string
}

ConnectedBreadcrumbs.defaultProps = {
    routes: [],
    id: 'breadcrumbs',
    className: 'breadcrumbs'
}

const stateToProps = (state) => ({
    routes: state.appRouter.routePath
});

export default connect(stateToProps)(ConnectedBreadcrumbs)