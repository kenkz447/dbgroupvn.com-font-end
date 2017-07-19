import $ from 'jquery'
import classNames from 'classnames'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap'
import { GET_PATH_BASE as getSearchPagePath, PATH_TITLE } from '../../../tim-kiem/configuraton'

import noop from 'lodash/noop'
import replace from 'lodash/replace'

class Search extends Component {
    state = {
        searchBoxOpen: false
    }

    static defaultProps = {
        toggleSearchBox: noop
    }

    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    buttonClick() {
        this.setState({ searchBoxOpen: true })
        this.props.toggleSearchBox(true)
    }


    onSubmit(e) {
        if (this.state.searchContent)
            this.props.dispatch(push(replace(getSearchPagePath(), PATH_TITLE, `/${this.state.searchContent}`)))
        e.preventDefault()
    }

    componentDidUpdate() {
        if (this.state.searchBoxOpen)
            setTimeout(() => {
                document.getElementById('search-input').focus()
            }, 500)
    }


    render() {
        return (
            <div className={ classNames('search', { open: this.state.searchBoxOpen }) }>
                <div className={ classNames('search-box') }>
                    {
                        <form onSubmit={ this.onSubmit }>
                            <Input id="search-input"
                                onBlur={ () => {
                                    this.props.toggleSearchBox(false)
                                    this.setState({ searchBoxOpen: false })
                                } } onChange={ (e) => {
                                    this.setState({ searchContent: e.target.value })
                                } }
                                placeholder={ global.localizationString.getString('Tìm kiếm') }
                                ref={ (element) => { this.input = element } }
                            />
                        </form>
                    }
                </div>
                {
                    <Button color="link" className="btn-search search-button text-uppercase pl-0 pr-0 border-0" onClick={ this.buttonClick }>
                        <i className="fa fa-search mr-2" aria-hidden="true" /> 
                        {global.localizationString.getString('Tìm kiếm')}
                    </Button>
                }

            </div>
        )
    }
}

Search.propTypes = {
    toggleSearchBox: PropTypes.func,
    dispatch: PropTypes.func
};

export default connect()(Search);
