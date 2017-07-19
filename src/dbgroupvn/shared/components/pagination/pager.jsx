import React, { Component } from 'react'
import PropTypes from 'prop-types'

import range from 'lodash/range'
import map from 'lodash/map'

import { default as classNames } from 'classnames'

class Pager extends Component {
    static defaultProps = {
        initialPage: 1,
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        onItemsChange: PropTypes.func.isRequired,
        initialPage: PropTypes.number,
        itemPerPage: PropTypes.number,
        className: PropTypes.string,
        arrowsOnly: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager });

        // call change page function in parent component
        this.props.onItemsChange(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || this.props.itemPerPage;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    render() {
        const pager = this.state.pager
        const { arrowsOnly } = this.props

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className={ classNames('pager', this.props.className) }>
                {
                    arrowsOnly ?
                        <ul className='pagination'>
                            <li className={ classNames('pager-item pager-item-pre', { disabled: pager.currentPage === 1 }) }>
                                <a className='page-link' onClick={ () => this.setPage(pager.currentPage - 1) }><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                            </li>
                            <li className={ classNames('pager-item pager-item-next', { disabled: pager.currentPage === pager.totalPages }) }>
                                <a className='page-link ' onClick={ () => this.setPage(pager.currentPage + 1) }><i className="fa fa-angle-right" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                        :
                        <ul className='pagination'>

                            <li className={ classNames('pager-item', { disabled: pager.currentPage === 1 }) }>
                                <a className='page-link' onClick={ () => this.setPage(1) }>
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                </a>
                            </li>

                            { map(pager.pages, (page, index) =>
                                <li key={ index } className={ classNames('pager-item pager-number', { active: pager.currentPage === page }) }>
                                    <a className='page-link' onClick={ () => this.setPage(page) }>{ page }</a>
                                </li>
                            ) }
                            <li className={ classNames('pager-item', { disabled: pager.currentPage === pager.totalPages }) }>
                                <a className='page-link' onClick={ () => this.setPage(pager.totalPages) }>
                                    <i className="fa fa-angle-right" aria-hidden="true"/>
                                </a>
                            </li>
                        </ul>
                }

            </div>
        );
    }
}
export default Pager;