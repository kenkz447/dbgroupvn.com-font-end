import React, { Component } from 'react'
import { connect } from 'react-redux'

import replace from 'lodash/replace'
import map from 'lodash/map'

import PropTypes from 'prop-types'

//Components
import { Container } from 'reactstrap'

import OwlCarouselLightBox from '../../shared/components/owl-carowsel-light-box'
import { SocialIcons, Pagination, eCommerce, ImagesLightBox, SideBarToggleStart } from '../../shared/components'
import PopupOwlCarousel from '../../shared/components/popup-owl-carousel'

import { routeCategory, routeDetail, PATH_CATEGORY } from '../routes'

import { fetchSingleEntity } from '../../shared/utilities'
import { addRouteToRoutePath } from '../../shared/reducers/app-routes'

import pageConfiguration from '../configuration'

class DetailPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        route: PropTypes.object,
        match: PropTypes.object,
        onViewChange: PropTypes.func
    }

    static defaultProps = {
        match: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.updateView = this.updateView.bind(this)
        this.getFirstCategoryInList = this.getFirstCategoryInList.bind(this)
    }

    getFirstCategoryInList() {
        return this.state.taxonomyTypeViewModels[ 0 ].taxonomies[ 0 ]
    }

    updateView(entity) {
        const { dispatch } = this.props

        this.setState(entity)

        const firstCategory = entity.taxonomyTypeViewModels[ 0 ].taxonomies[ 0 ]

        dispatch(addRouteToRoutePath(routeCategory, { label: firstCategory.title, url: replace(PATH_CATEGORY, global.PATH_CATEGORY_SUFFIX, `/${firstCategory.name}`) }))
        dispatch(addRouteToRoutePath(routeDetail, { label: entity.details.title }))
    }

    componentWillMount() {
        const { match: { params: { entity } }, onViewChange } = this.props

        fetchSingleEntity(entity, pageConfiguration.mvcController).then(this.updateView)
        onViewChange()
    }

    componentDidMount() {

    }

    render() {
        if (!this.state)
            return null

        const { details: { coverPhotos, title, area, date, client, facebook, twitter, instagram, content, products } } = this.state
        return (
            <Container>
                <SideBarToggleStart className="static"/>
                <OwlCarouselLightBox className="mb-4" images={ coverPhotos } />
                <article className="entity-detail">
                    <h1 className="h5">{ `${title} | ${area || 40}m` }<sup>2</sup></h1>
                    <div className="entity-detail-meta mb-4">
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Ngày hoàn thành')}: ` }</span>
                            <date className="entity-detail-meta-text">{ date || '04.02.2017' }</date>
                        </div>
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Khách hàng')}: ` }</span>
                            <span className="entity-detail-meta-text">{ client || 'No data' }</span>
                        </div>
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Diện tích')}: ` }</span>
                            <span className="entity-detail-meta-text">{ `${area || 40}m` }<sup>2</sup></span>
                        </div>
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Loại công trình')}: ` }</span>
                            <span className="entity-detail-meta-text">{ this.getFirstCategoryInList().title }</span>
                        </div>
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Chia sẻ')}: ` }</span>
                            <SocialIcons className="d-inline ml-1 share" facebook={ facebook } twitter={ twitter } instagram={ instagram } />
                        </div>
                    </div>
                    <div className="entity-detail-content mb-5" dangerouslySetInnerHTML={ { __html: content } } />
                    <ImagesLightBox thumbnail imageViewModels={ coverPhotos } itemWrapClassName="col-6 col-sm-4 col-md-3 col-lg-2" />
                    <hr />
                    <div className="products">
                        <span className="title-slim">{ `${title}'s products` }</span>
                        <Pagination
                            items={ products }
                            layout={ { xs: 6, sm: 6, md: 6, lg: 4, xl: 4 } }
                            itemPerPage={ 30 }
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
                </article>
            </Container>
        )
    }
}

export default connect()(DetailPage)