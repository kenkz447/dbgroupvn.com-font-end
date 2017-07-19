import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { Input } from 'reactstrap'

const statusCodes = {
    0: 'Lên ý tưởng',
    1: 'Đang thi công',
    2: 'Đã hoàn thành'
}

export default class FilterByStatus extends Component {
    static propTypes = {
        onFilter: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            currentChecked: null
        }

        this.renderInput = this.renderInput.bind(this)
    }

    radioCheck(value) {
        this.props.onFilter(value)
        this.setState({ currentChecked: value })
    }

    renderInput(code, label) {
        return (
            <label className="custom-control custom-radio d-block">
                <Input type="radio" checked={ code === this.state.currentChecked } radioGroup="filter-status" className="custom-control-input" onClick={ () => {
                    this.radioCheck(code)
                } } />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                    { global.localizationString.getString(label) }
                </span>
            </label>
        )
    }

    render() {
        return (
            <div className="filter">
                { this.renderInput(null, 'Tất cả') }
                { map(statusCodes, (status, code) => (this.renderInput(code, status))) }
            </div>
        )
    }
}