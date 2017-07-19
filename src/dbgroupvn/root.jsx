import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { Provider, connect } = require('react-redux')
const { createBrowserHistory } = require('history')

const history = createBrowserHistory()

// Pages:
import Layout from'./shared/_layout'

import ExtendConnectedRouter from './shared/components/_commons/extended-ConnectedRouter';

class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    
    constructor(props) {
        super(props);
        global.AOS.init();
    }

    render() {
        const { store } = this.props;
        return (
            <Provider store={ store }>
                <ExtendConnectedRouter history={ history } wrapper={ Layout } />
            </Provider>
        );
    }
}

const stateToProps = (state) => ({
    menuItems: state.menu.menuItems
})

module.exports = {
    Root: connect(stateToProps)(Root),
    history
};

export default exports