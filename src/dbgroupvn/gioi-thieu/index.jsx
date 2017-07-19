import React, { Component } from 'react'
import PropTypes from 'prop-types'

import basePage from '../shared/_layout/main/base-page'

import { PageArticle } from '../shared/components'
import QuyTrinh from './components/quy-trinh'

import { fetchPage, getOptions } from '../shared/utilities'

class PageComponent extends Component {
    static propTypes = {
        onDataFetch: PropTypes.func,
        article: PropTypes.object,
        procedure: PropTypes.object,
        dataFetchProgress: PropTypes.number
    }

    constructor() {
        super();
    }

    componentWillMount() {
        const { onDataFetch, article, procedure } = this.props;

        if (!article)
            fetchPage('ve-chung-toi').then(function (response) {
                onDataFetch({ article: response }, 50);
            })

        if (!procedure)
            getOptions('quy-trinh').then(function (response) {
                onDataFetch({ procedure: response }, 50);
            })
    }

    render() {
        if (this.props.dataFetchProgress != 100)
            return null;

        const { article, procedure } = this.props;

        return (
            <div id="gioi-thieu">
                <PageArticle className="mb-5" {...article.details} />
                <QuyTrinh items={ procedure } title={ procedure.title } />
            </div>
        );
    }
}

export default basePage({ page: 'gioi-thieu' })(PageComponent);