import React, { Component } from 'react'
import { connect } from 'react-redux'

import replace from 'lodash/replace'
import filter from 'lodash/filter'

import PropTypes from 'prop-types'

//Components
import { Container } from 'reactstrap'

import OwlCarouselLightBox from '../../shared/components/owl-carowsel-light-box'
import { SocialIcons, NavigationController, ImagesLightBox, SideBarToggleStart } from '../../shared/components'

import { routeCategory, routeDetail, PATH_CATEGORY } from '../routes'

import { fetchSingleEntity, getNextAndPreEntities } from '../../shared/utilities'
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
        this.setState(entity)

        const firstCategory = entity.taxonomyTypeViewModels[ 0 ].taxonomies[ 0 ]

        this.props.dispatch(addRouteToRoutePath(routeCategory, { label: firstCategory.title, url: replace(PATH_CATEGORY, global.PATH_CATEGORY_SUFFIX, `/${firstCategory.name}`) }))
        this.props.dispatch(addRouteToRoutePath(routeDetail, { label: entity.details.title }))

        getNextAndPreEntities(pageConfiguration.mvcController, entity.meta.id).then((entities) => {
            const nextAndPre = {}
            if (entities.next) {
                const taxonomyType = filter(entities.next.taxonomyTypeViewModels, { id: pageConfiguration.TAXONOMY_TYPE_ID_CATEGORY })[ 0 ]
                const taxonomy = taxonomyType.taxonomies[ 0 ].name;

                const baseUrl = replace(routeDetail.path, global.PATH_CATEGORY_SUFFIX, `/${taxonomy}`)
                nextAndPre.next = {
                    url: replace(baseUrl, global.PATH_ENTITY_SUFFIX, `/${entities.next.meta[ 'name' ]}`),
                    label: entities.next.details[ 'title' ]
                }
            }
            if (entities.pre) {
                const taxonomyType = filter(entities.pre.taxonomyTypeViewModels, { id: pageConfiguration.TAXONOMY_TYPE_ID_CATEGORY })[ 0 ]
                const taxonomy = taxonomyType.taxonomies[ 0 ].name;

                const baseUrl = replace(routeDetail.path, global.PATH_CATEGORY_SUFFIX, `/${taxonomy}`)
                nextAndPre.pre = {
                    url: replace(baseUrl, global.PATH_ENTITY_SUFFIX, `/${entities.pre.meta[ 'name' ]}`),
                    label: entities.pre.details[ 'title' ]
                }
            }
            this.setState({ nextAndPre })
        })
    }

    componentWillMount() {
        const { match: { params: { entity } }, onViewChange } = this.props

        fetchSingleEntity(entity, pageConfiguration.mvcController).then(this.updateView)
        onViewChange()
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params: { entity } }, onViewChange } = nextProps

        if (entity != this.props.match.params.entity) {
            fetchSingleEntity(entity, pageConfiguration.mvcController).then(this.updateView)
            onViewChange()
        }
    }
    render() {
        if (!this.state)
            return null
        const { details: { coverPhotos, title, area, date, client, facebook, twitter, instagram, content } } = this.state
        return (
            <Container>
                <SideBarToggleStart className="static"/>
                <OwlCarouselLightBox className="mb-4" images={ coverPhotos } />
                <article className="entity-detail mb-3">
                    <h1 className="h5">{ title }</h1>
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
                    <ImagesLightBox thumbnail imageViewModels={ coverPhotos } itemWrapClassName="col-6 col-sm-4 col-md-3 col-lg-2"/>
                </article>

                <NavigationController {...this.state.nextAndPre} />
            </Container>
        )
    }
}

export default connect()(DetailPage)