import { connect } from 'react-redux'
import React, { Component } from 'react'

import replace from 'lodash/replace'
import map from 'lodash/map'


const { Row, Col } = require('reactstrap');
const { Link } = require('react-router-dom');

import { Title, Image } from '../../shared/components'

const { fetchEntities } = require('../../shared/utilities');

import projectPageConfigure from '../../du-an/configuration'
import renderItem from '../../du-an/helper/render-items'

import { PATH_DETAIL, PATH_INDEX_CATEGORY } from '../../du-an/routes'

const PROJECT_URL = replace(PATH_INDEX_CATEGORY, global.PATH_CATEGORY_SUFFIX, `/${global.localizationString.getString('tat-ca')}`)

class DuAn extends Component {
    static defaultProps = {
        projectItems: []
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { className } = this.props

        return (
            <section className={ className }>
                <div className="cong-trinh">
                    <div className="link link-du-an">
                        <Link className="title" to={ PROJECT_URL } dangerouslySetInnerHTML={ { __html: global.localizationString.getString("Dự án") } } />
                    </div>
                    <Image url="uploads/2/2017/7/home-01-2017-7-11-100.jpg" />
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { projectItems } = state.connectedBasePage.pages[ 'trang-chu' ]

    return {
        projectItems
    }
}

module.exports = connect(mapStateToProps)(DuAn);