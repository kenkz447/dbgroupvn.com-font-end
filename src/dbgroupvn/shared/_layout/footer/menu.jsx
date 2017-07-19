import sortBy from 'lodash/sortBy'
import map from 'lodash/map'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'

const stateToProps = (state) => ({
    menuItems: state.appRouter.menus[ 'footer' ]
});

class Menu extends Component {
    static propTypes = {
        className: PropTypes.string
    }

    constructor(props) {
        super(props);
        const sortedItems = sortBy(props.menuItems, 'order')
        this.state = {
            menuItems: sortedItems
        }
    }

    render() {
        const { className } = this.props
        return (
            <Row className={ classNames('text-uppercase pl-0 mb-0', className) }>
                {
                    map(this.state.menuItems, (menuItem, index) => {
                        return (
                            <Col key={ index } className="menu-item d-inline-block">
                                <Link to={ menuItem.url }>
                                    <span>{ menuItem.label }</span>
                                </Link>
                            </Col>)
                    })
                }
            </Row>
        );
    }
}

Menu.propTypes = {
    menuItems: PropTypes.array.isRequired
}

module.exports = connect(stateToProps)(Menu)