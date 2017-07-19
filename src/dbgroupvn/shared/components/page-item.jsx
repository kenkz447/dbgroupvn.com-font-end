import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Image from'./image'

class PageItem extends Component {
    static propTypes = {
        path: PropTypes.string,
        data: PropTypes.any,
        extraText: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.renderLink = this.renderLink.bind(this);
    }

    renderLink(title) {
        const { path } = this.props
        return (
            <Link to={ path }><span>{ title }</span></Link>
        )
    }

    render() {
        const { data: { thumbnailUrl, title }, extraText } = this.props;

        return (
            <div className="page-item-wrapper">
                <div className="page-item-thumbnail">
                    <Image className="w-100" url={ thumbnailUrl } description={ title } />
                    <div className="overlay" />
                    { this.renderLink(global.localizationString.getString('Chi tiết')) }
                </div>
                <div className="page-item-title ">
                    { this.renderLink(title) }
                    <span className="extra-text" dangerouslySetInnerHTML={ { __html : extraText}}/>
                </div>
            </div>
        );
    }
}

PageItem.defautProps = {
    basePath: '/',
    extraText: '',
    data: {
        title: 'Missing title!',
        thumbnailUrl: '/img/default.png'
    }
}

module.exports = PageItem;