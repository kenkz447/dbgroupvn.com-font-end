import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import map from 'lodash/map'
import startsWith from 'lodash/startsWith'
import filter from 'lodash/filter'
import replace from 'lodash/replace'

import { Sidebar, SidebarWidget, Image, LightBox, Pagination, eCommerce, SideBarToggleStart } from '../shared/components'
import PopupOwlCarousel from '../shared/components/popup-owl-carousel'

import { fetchSingleEntity, fetchMultiEntity, formatCurrency } from '../shared/utilities'
import { Container, Row, Col, Input } from 'reactstrap'
import OwlCarousel from 'react-owl-carousel2'

import pageConfiguration from './configuration'
import { default as basePage } from '../shared/_layout/main/base-page'

import { addRouteToRoutePath } from '../shared/reducers/app-routes'

import routeIndex, { routeDetail } from './routes'

class DetailView extends Component {
    static propTypes = {
        onDataFetch: PropTypes.func,
        match: PropTypes.object,
        entity: PropTypes.object,
        dataFetchProgress: PropTypes.number,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            lightBox: {

            }
        }

        this.owlOptions = {
            items: 1,
            nav: true,
            navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
            dots: false,
            rewind: false,
            autoplay: false,

        }

        this.owlEvents = {
            onChanged: this.onCollectionChange.bind(this)
        }

        this.dataFetchComplete = this.dataFetchComplete.bind(this)
        this.renderSidebar = this.renderSidebar.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.renderLayoutImage = this.renderLayoutImage.bind(this)
        this.fetchCollections = this.fetchCollections.bind(this)
    }

    onCollectionChange(e) {
        const { item: { count, index } } = e

        if (count === 0 || index === null)
            return

        const { currentRoom, currentCollection } = this.state
        if (currentCollection && currentRoom)
            setTimeout(() => {
                const nextCurrentCollection = currentRoom.collections[ index ]

                if (!nextCurrentCollection)
                    return

                if (nextCurrentCollection.collectionId != currentCollection.collectionId) {
                    this.setState({ currentCollection: currentRoom.collections[ index ] })
                }
            }, 250)
    }

    fetchCollections(currentRoom) {
        fetchMultiEntity(
            map(currentRoom.collections, ({ collectionId }) => + collectionId),
            '/collection').then((collections) => {
                this.setState({
                    currentRoom,
                    currentCollection: currentRoom.collections[ 0 ],
                    currentCollections: collections,
                })
            })
    }

    dataFetchComplete(entityResponse) {
        const { details: { title, towers } } = entityResponse
        if (towers) {
            const currentTower = towers[ 0 ]
            const currentFloors = entityResponse.details.towers[ 0 ][ 'floors' ]
            const currentFloor = currentFloors[ 0 ]
            const currentRooms = currentFloors[ 0 ][ 'rooms' ]
            const currentRoom = currentRooms[ 0 ]

            this.fetchCollections(currentRoom)
            this.setState({ currentTower, currentFloors, currentFloor, currentRooms })
        }
        this.props.onDataFetch({ entity: entityResponse }, 100)

        this.props.dispatch(addRouteToRoutePath(routeIndex))
        this.props.dispatch(addRouteToRoutePath(routeDetail, { label: title }))
    }

    componentWillMount() {
        const { entity, match: { params } } = this.props
        if (!entity)
            fetchSingleEntity(params.entity, pageConfiguration.mvcController).then(this.dataFetchComplete)
        else
            this.dataFetchComplete(entity)
    }

    componentWillUnmount() {
        this.props.onViewChange()
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.entity) {

            if (nextState.currentTower.tower != this.state.currentTower.tower) {
                if (nextState.currentTower && nextState.currentTower.floors) {
                    this.setState({
                        currentFloors: nextState.currentTower.floors,
                        currentFloor: nextState.currentTower.floors[ 0 ]
                    })
                }
            }

            if (nextState.currentFloor.floor != this.state.currentFloor.floor) {
                this.setState({ currentRooms: nextState.currentFloor.rooms })
            }
        }
    }


    renderSidebar() {
        const { entity: { details: { thumbnail, title, description, towers } } } = this.props
        const { currentFloors, currentRooms } = this.state

        return (
            <Sidebar>
                <Image {...thumbnail} className="mb-4" />
                <SidebarWidget title={ title } className="p-0" titleClassName="m-0">
                    <div className="project-description" dangerouslySetInnerHTML={ { __html: description } } />
                </SidebarWidget>

                <SidebarWidget title={ global.localizationString.getString('Mặt bằng') } className="p-0" titleClassName="m-0" noBorder noCollapse>
                    <div>
                        <Input type="select" onChange={ (e) => {
                            this.setState({ currentTower: filter(towers, { tower: e.target.value })[ 0 ] })
                        } }>
                            {
                                map(towers, ({ tower }, index) => {
                                    return (<option key={ index } value={ tower }>{ tower }</option>)
                                })
                            }
                        </Input>
                    </div>
                    {
                        currentFloors && <Input type="select" onChange={ (e) => {
                            this.setState({ currentFloor: e.target.value })
                        } }>
                            {
                                map(currentFloors, ({ floor }, index) => {
                                    return (<option key={ index } value={ floor }>{ floor }</option>)
                                })
                            }
                        </Input>
                    }
                    {
                        currentRooms &&
                        <div>
                            {
                                map(currentRooms, (roomObj, index) => {
                                    const { room, layoutImage } = roomObj
                                    return (
                                        <div key={ index } className="mb-2 project-layout-thumb" onClick={ () => {
                                            this.setState({ currentRoom: roomObj })
                                            this.fetchCollections(roomObj)
                                        } }>
                                            <Image {...layoutImage} />
                                            <div className="pt-2 pb-2 pl-3 pr-3">
                                                { room }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </SidebarWidget>
            </Sidebar>
        )
    }

    renderLayoutImage(LayoutInfo) {
        const { currentRoom: { layoutImage }, currentCollection, lightBox: { photoIndex } } = this.state
        const layoutData = JSON.parse(currentCollection.layoutData)

        const images = map(layoutData, ({ image }) => {
            return (startsWith(String(image), '/') || startsWith(String(image), 'http')) ? image : `${global.APP_DOMAIN}/${image}`
        })

        return (
            <div className="layout w-100">
                <Image {...layoutImage} />
                { LayoutInfo }
                {
                    map(layoutData, ({ image, rotate, x, y }, index) => {

                        const style = { left: `calc(${x}% - 10px)`, top: `calc(${y}% - 13px)` }
                        return (
                            <div key={ index } className="arrow" style={ style }>
                                <div className="arrow-bg" style={ { transform: `rotate(${rotate}deg)` } } onClick={ () => {
                                    this.setState({ lightBox: { photoIndex: index } })
                                } } />
                                <div className="arrow-image">
                                    <Image url={ image } />
                                </div>
                            </div>
                        )
                    })
                }
                {
                    <LightBox isOpen={ photoIndex != null || photoIndex != undefined } images={ images } photoIndex={ photoIndex }
                        onClose={ () => {
                            this.setState({ lightBox: { photoIndex: null } })
                        } }
                        onNext={ (nextIndex) => {
                            this.setState({ lightBox: { photoIndex: nextIndex } })
                        } }
                        onPre={ (preIndex) => {
                            this.setState({ lightBox: { photoIndex: preIndex } })
                        } }
                    />
                }
            </div >
        )
    }

    renderContent() {
        const { currentTower, currentFloor, currentRoom, currentCollections, currentCollection } = this.state

        if (!currentRoom || !currentCollection)
            return

        const collectionEntity = filter(currentCollections, { meta: { id: currentCollection.collectionId } })[ 0 ]

        if (!collectionEntity)
            return null

        let totalPrice = 0;
        const { products } = collectionEntity.details
        for (const index in products) {
            const pricte = +(replace(products[ index ].price, /\./g, ''))
            const quantity = +products[ index ].quantity
            totalPrice += pricte * quantity
        }

        const LayoutInfo = (
            <div className="layout-info">
                <strong>{ global.localizationString.getString('Căn hộ') }:{ ' ' }</strong> { `${currentTower.tower}, ${currentFloor.floor}, ` }
                <strong>{ global.localizationString.getString('Diện tích') }:{ ' ' }</strong> { currentRoom.area } m<sup>2</sup>
            </div>
        )

        return (
            <div>
                <Row>
                    { this.renderLayoutImage(LayoutInfo) }
                </Row>
                <Row>
                    <SideBarToggleStart className="mt-4 mb-3">
                        <h1 className="page-titles">
                            <span className="page-title m-0 text-black">{ `Set: ${collectionEntity.details.title}` }</span>
                        </h1>
                    </SideBarToggleStart>
                </Row>
                <Row>
                    <Col lg={ 6 }>
                        {
                            currentCollections &&
                            <OwlCarousel options={ this.owlOptions } events={ this.owlEvents }>
                                {

                                    map(currentCollections, (collection, index) => {
                                        return (
                                            <div key={ index } id={ `slide${index}` }>
                                                <Image {...collection.details.thumbnail} />
                                            </div>
                                        )
                                    })
                                }
                            </OwlCarousel>
                        }
                    </Col>
                    <Col lg={ 6 }>
                        <article className="ml-2">
                            <div dangerouslySetInnerHTML={ { __html: currentRoom.description } } />
                        </article>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <hr />
                        <SidebarWidget freeToggle title={ global.localizationString.getString('Sản phẩm trong set') }
                            toggleDefault={ false }
                            className="p-0"
                            titleClassName="ml-2"
                            extraText={ `${global.localizationString.getString('Tổng')} ${formatCurrency(totalPrice)} vnđ` } noBorder >
                            <table className="table table-striped m-0">
                                <thead>
                                    <tr>
                                        <th className="border-0">{ global.localizationString.getString('Tên sản phẩm') }</th>
                                        <th className="border-0">{ global.localizationString.getString('Đơn giá') }</th>
                                        <th className="border-0">{ global.localizationString.getString('Số lượng') }</th>
                                        <th className="border-0 text-right">{ global.localizationString.getString('Tổng') }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        map(products, ({ title, quantity, price }, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ title }</td>
                                                    <td>{ price }</td>
                                                    <td>{ quantity }</td>
                                                    <td className="text-right">{ formatCurrency(+(replace(price, /\./g, '')) * +quantity) }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </SidebarWidget>
                        <hr className="mt-0" />
                        <SidebarWidget freeToggle title={ global.localizationString.getString('Chi tiết sản phẩm') }
                            className="p-0"
                            titleClassName="ml-2"
                            extraText={ `${products.length} ${global.localizationString.getString('Items')}` } noBorder>
                            <div className="products">
                                <Pagination
                                    items={ products }
                                    layout={ { xs: 6, sm: 6, md: 6, lg: 4, xl: 4 } }
                                    itemPerPage={ 26 }
                                    renderItem={ (item, index) => {
                                        return (
                                            <eCommerce.ProductItem {...item}
                                                onClick={ () => {
                                                    this.setState({ productPopupIndex: index })
                                                } } />
                                        )
                                    } }
                                />
                                <PopupOwlCarousel onClose={ () => {
                                    this.setState({ productPopupIndex: null })
                                } } currentItemIndex={ this.state.productPopupIndex } items={ map(products, eCommerce.renderProductQuickView) } />
                            </div>
                        </SidebarWidget>
                        <div className="mt-3 mb-3 clearfix">
                            <button className="btn-white border-0 text-black float-right">{ global.localizationString.getString('Liên hệ để được giá tốt') }</button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        if (this.props.dataFetchProgress != 100)
            return null

        return (
            <Container>
                <Row>
                    <Col xs={ 12 } lg={ 3 }>
                        { this.renderSidebar() }
                    </Col>
                    <Col xs={ 12 } lg={ 9 }>
                        { this.renderContent() }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default basePage({ page: 'du-an-details', showBreadcrumbs: true, cleanPropsAfferLeave: true })(connect()(DetailView))