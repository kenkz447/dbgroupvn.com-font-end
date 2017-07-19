import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import replace from 'lodash/replace'

import { default as classNames } from 'classnames'

class Pager extends Component {

    static propTypes = {
        initialPage: PropTypes.number,
        templatePath: PropTypes.string,
        paramKey: PropTypes.string,
        currentPage: PropTypes.number,
        totalPages: PropTypes.number,
        basePath: PropTypes.string,
        className: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = { pager: {} };
        this.renderPage = this.renderPage.bind(this)
        this.renderPageLink = this.renderPageLink.bind(this)
        this.getPageUrl = this.getPageUrl.bind(this)
    }

    getPageUrl(pageNumber) {
        let templatePath = String(this.props.templatePath)
        const paramKey = String(this.props.paramKey || ':page')

        if (templatePath.indexOf(paramKey) >= 1)
            return replace(templatePath, paramKey, pageNumber)

        return templatePath += `/${pageNumber}`
    }

    renderPageLink(page, label) {
        return (<Link className='page-link' to={ this.getPageUrl(page) } dangerouslySetInnerHTML={ { __html: label || page } } />)
    }

    renderPage() {
        const { currentPage, totalPages } = this.props
        const pageComonents = []

        for (let page = 1; page <= totalPages; page++) {
            pageComonents.push(
                <li key={ page } className={ classNames('pager-item', { active: currentPage === page }) }>
                    { this.renderPageLink(page) }
                </li>
            )
        }

        return pageComonents
    }

    render() {
        const { totalPages, currentPage } = this.props

        if (!totalPages || totalPages <= 1) {
            return null;
        }

        return (
            <div className={ classNames('pager', this.props.className) }>
                <ul className='pagination m-0'>
                    <li className={ classNames('pager-item', { disabled: currentPage === 1 }) }>
                        { this.renderPageLink(1, '<i class="fa fa-angle-left" aria-hidden="true"></i>') }
                    </li>
                    { this.renderPage() }
                    <li className={ classNames('pager-item', { disabled: currentPage === totalPages }) }>
                        { this.renderPageLink(totalPages, '<i class="fa fa-angle-right" aria-hidden="true"></i>') }
                    </li>
                </ul>
            </div>
        );
    }
}

export default Pager;