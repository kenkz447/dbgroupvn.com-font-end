import React, { Component } from 'react';

import { default as PropTypes } from 'prop-types'
import { default as classNames } from 'classnames'

import { default as Pager } from './pagination/pager'
import { default as ItemContainer } from './pagination/item-container'
import { default as PagerAjax } from './pagination/pager-ajax'

class componentName extends Component {
    static propTypes = {
        renderItem: PropTypes.func.isRequired,
        noItemWrapper: PropTypes.bool,
        items: PropTypes.any,
        className: PropTypes.string,
        layout: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
        itemWrapperClassName: PropTypes.string,
        itemPerPage: PropTypes.number,
        currentPage: PropTypes.number,
        totalPages: PropTypes.number,
        templatePath: PropTypes.string,
        pagerClassName: PropTypes.string,
        arrowsOnly: PropTypes.bool
    }

    static defaultProps = {
        items: [],
        itemPerPage: 9,
        layout: {
            xs: 12, sm: 6, md: 4, lg: 4, xl: 4
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1
        }
        this.onItemsChange = this.onItemsChange.bind(this)
    }

    onItemsChange(pageItems, currentPage, totalPages) {
        this.setState({ pageItems, currentPage, totalPages })
    }

    render() {
        const { className,
            items, layout, itemWrapperClassName, renderItem, noItemWrapper,
            itemPerPage, currentPage, templatePath, totalPages, pagerClassName, arrowsOnly
        } = this.props

        const isAjax = totalPages != undefined

        //ItemContainer will render current page item
        //Ajax pager render page list only
        return (
            <div className={ classNames(className, 'pagination-container clearfix') }>
                <ItemContainer className={ 'mb-4' }
                    noItemWrapper={ noItemWrapper }
                    items={ isAjax ? items : this.state.pageItems }
                    layout={ layout }
                    renderItem={ renderItem }
                    itemWrapperClassName={ itemWrapperClassName } />
                {
                    isAjax ?
                        <PagerAjax className={ classNames('float-right', pagerClassName) }
                            currentPage={ currentPage }
                            totalPages={ totalPages }
                            itemPerPage={ itemPerPage }
                            templatePath={ templatePath }
                            arrowsOnly={ arrowsOnly }
                        /> :
                        <Pager className={ classNames('float-right', pagerClassName) }
                            items={ items }
                            itemPerPage={ itemPerPage }
                            onItemsChange={ this.onItemsChange }
                            arrowsOnly={ arrowsOnly }
                        />
                }
            </div>
        );
    }
}

export default componentName;