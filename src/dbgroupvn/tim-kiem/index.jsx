import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import basePage from '../shared/_layout/main/base-page'
import { page } from './configuraton'
import { Container, Row, Col } from 'reactstrap'

import { Sidebar, SidebarWidget, SideBarToggleStart } from '../shared/components'

import congtrinhFetch from '../cong-trinh/helper/fetchEntities'
import CongtrinhPagination from '../cong-trinh/components/pagination'

import bosuutapFetch from '../bo-suu-tap/helper/fetchEntities'
import BosuutapPagination from '../bo-suu-tap/components/pagination'

import duanFetch from '../du-an/helper/fetchEntities'
import DuanPagination from '../du-an/components/pagination'

import thuvienFetch from '../thu-vien/helper/fetchEntities'
import ThuVienPagination from '../thu-vien/components/pagination'

const CONGTRINH = 'CONGTRINH'
const BOSUUTAP = 'BOSUUTAP'
const DUAN = 'DUAN'
const THUVIEN = 'THUVIEN'

class TimKiem extends Component {
    constructor(props) {
        super(props);
        this.searchCongtrinh = this.searchCongtrinh.bind(this)
        this.getFitering = this.getFitering.bind(this)
    }

    state = {
        currentModule: CONGTRINH
    }

    componentWillMount() {
        const postParams = {
            filtering: this.getFitering(this.props.match)
        }
        this.searchCongtrinh(postParams)
    }

    searchCongtrinh(postParams, ) {
        congtrinhFetch(postParams, 'tat-ca', (items, totalPages) => {
            this.setState({ items, totalPages })
        })
    }

    getFitering(match) {
        const search = match.params[ 'title' ]

        const filtering = [
            {
                id: 'title',
                value: search,
                method: 'contains'
            }
        ]

        return filtering
    }

    componentWillUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.match) != JSON.stringify(this.props.match) || this.state.currentModule != nextState.currentModule) {
            const postParams = {
                filtering: this.getFitering(nextProps.match)
            }
            switch (nextState.currentModule) {
                case CONGTRINH:
                    this.searchCongtrinh(postParams)
                    break
                case BOSUUTAP:
                    bosuutapFetch(postParams, 'tat-ca', (items, totalPages) => {
                        this.setState({ items, totalPages })
                    })
                    break
                case DUAN:
                    duanFetch(postParams, (items, totalPages) => {
                        this.setState({ items, totalPages })
                    })
                    break
                case THUVIEN:
                    thuvienFetch(postParams, 'tat-ca', (items, totalPages) => {
                        this.setState({ items, totalPages })
                    })
                    break
            }

        }
    }

    contentSelect(moduleName) {
        const { items, totalPages } = this.state
        if (!items)
            return null

        if (moduleName == CONGTRINH)
            return <CongtrinhPagination items={ items } totalPages={ totalPages } currentPage={ 0 } />
        else if (moduleName === BOSUUTAP)
            return <BosuutapPagination items={ items } totalPages={ totalPages } currentPage={ 0 } />
        else if (moduleName === DUAN)
            return <DuanPagination items={ items } totalPages={ totalPages } currentPage={ 0 } />
        else if (moduleName === THUVIEN)
            return <ThuVienPagination items={ items } totalPages={ totalPages } currentPage={ 0 } />

        return null
    }

    renderSidebar() {
        return (
            <Sidebar className="mt-4">
                <SidebarWidget noBorder noCollapse
                    title={ global.localizationString.getString('Công trình') } onTitleClick={ () => {
                        this.setState({ items: null, currentModule: CONGTRINH })
                    } }
                    titleClassName={ classNames('pointer', { current: this.state.currentModule === CONGTRINH }) }
                />
                <SidebarWidget noBorder noCollapse
                    title={ global.localizationString.getString('Bộ sưu tập') } onTitleClick={ () => {
                        this.setState({ items: null, currentModule: BOSUUTAP })
                    } }
                    titleClassName={ classNames('pointer', { current: this.state.currentModule === BOSUUTAP }) }
                />
                <SidebarWidget noBorder noCollapse
                    title={ global.localizationString.getString('Dự án') } onTitleClick={ () => {
                        this.setState({ items: null, currentModule: DUAN })
                    } }
                    titleClassName={ classNames('pointer', { current: this.state.currentModule === DUAN }) }
                />
                <SidebarWidget noBorder noCollapse
                    title={ global.localizationString.getString('Thư viện') } onTitleClick={ () => {
                        this.setState({ items: null, currentModule: THUVIEN })
                    } }
                    titleClassName={ classNames('pointer', { current: this.state.currentModule === THUVIEN }) }
                />
            </Sidebar>
        )
    }

    render() {
        const { currentModule } = this.state

        return (
            <Container>
                <Row>
                    <Col xs='12' lg='4' xl='3'>
                        { this.renderSidebar() }
                    </Col>
                    <Col xs='12' lg='8' xl='9'>
                        <div>
                            <SideBarToggleStart className="mt-4 mb-3">
                                <h1 className="page-titles">
                                    <span className="page-title">{ global.localizationString.getString('Từ khóa') }</span>
                                    <span>:</span>
                                    <span className="page-title">{ this.props.match.params[ 'title' ] }</span>
                                </h1>
                            </SideBarToggleStart>
                        </div>
                        { this.contentSelect(currentModule) }
                    </Col>
                </Row>
            </Container>
        );
    }
}

TimKiem.propTypes = {
    match: PropTypes.object
};

export default basePage({ page, showBreadcrumbs: true })(TimKiem)