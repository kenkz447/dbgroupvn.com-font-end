import React, { Component } from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import filter from 'lodash/filter'
import isArray from 'lodash/isArray'
import includes from 'lodash/includes'

import { Row } from 'reactstrap'
import { default as PagingItemWrapper } from './item-wrapper'
import $ from 'jquery'
import { default as classNames } from 'classnames'

class PagingItemContainer extends Component {
    static propTypes = {
        items: PropTypes.array,
        className: PropTypes.string,
        renderItem: PropTypes.func,
        layout: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        itemWrapperClassName: PropTypes.string,
        noItemWrapper: PropTypes.bool
    }

    static defaultProps = {
        items: []
    }

    constructor(props) {
        super(props);

        this.state = {
            itemToDisplay: []
        }
        this.refreshContainerView = this.refreshContainerView.bind(this)
        this.displayNewItems = this.displayNewItems.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.items) != JSON.stringify(this.props.items)) {
            this.refreshContainerView(nextProps.items)
        }
    }

    displayNewItems() {
        this.setState({ displayNewItems: this.itemToDisplay })
    }

    refreshContainerView(itemToDisplay) {
        this.itemToDisplay = itemToDisplay
        
        $('.paging-item-wrapper.on-display').addClass('fade-left').delay(500).queue(this.displayNewItems)
    }

    render() {
        const { className, items, renderItem, layout, itemWrapperClassName, noItemWrapper } = this.props
        return (
            <div className={ classNames('paging-wrapper', className) } ref={(container) => this.container = container}>
                <Row className='paging-item-container'>
                    {
                        map(items, (item, index) => {
                            let itemLayout = layout;
                            if (isArray(itemLayout)) {
                                itemLayout = filter(itemLayout, (layout) => {
                                    if (isArray(layout.at) && includes(layout.at, index + 1))
                                            return true
                                    return (layout.at - 1) === index
                                })[ 0 ]
                                if (!itemLayout)
                                  itemLayout = layout[0]  
                            }
                            
                            if (noItemWrapper)
                                return renderItem(item)
                            
                            return <PagingItemWrapper key={ index } className={ classNames('paging-item-wrapper', itemWrapperClassName) } {...itemLayout} item={ item } itemIndex={index} renderItem={ renderItem } />
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default PagingItemContainer