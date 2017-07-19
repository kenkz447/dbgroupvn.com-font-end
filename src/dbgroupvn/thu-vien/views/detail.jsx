import React, { Component } from 'react'
import { connect } from 'react-redux'

import replace from 'lodash/replace'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'

import PropTypes from 'prop-types'
import classNames from 'classnames'

//Components
import { Container, Row, Col } from 'reactstrap'
import CommentBox from '../components/comment-box'

import OwlCarouselLightBox from '../../shared/components/owl-carowsel-light-box'
import { SocialIcons, Image } from '../../shared/components'

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
        this.setState(entity)
    }

    componentWillMount() {
        const { match: { params: { entity } }, onViewChange } = this.props

        fetchSingleEntity(entity, pageConfiguration.mvcController).then(this.updateView)
        onViewChange()
    }

    componentDidMount() {
        const { dispatch, match: { params: { entity, category } } } = this.props

        //Add Category and Detail to breadcrumb
        dispatch(addRouteToRoutePath(routeCategory, { label: category, url: replace(PATH_CATEGORY, global.PATH_CATEGORY_SUFFIX, `/${category}`) }))
        dispatch(addRouteToRoutePath(routeDetail, { label: entity }))
    }

    renderPhoto(photo) {
        return (
            <div key={ photo.photoImage.url } className={ classNames(photo.htmlClasss, 'mb-2') }>
                <Image {...photo.photoImage} />
            </div>
        );
    }

    render() {
        if (!this.state)
            return null

        const { meta, taxonomyTypeViewModels, details: { coverPhotos, title, area, writer, facebook, twitter, instagram, content } } = this.state

        //Get Tags
        const taxonomyTypeTagIndex = findIndex(taxonomyTypeViewModels, { id: pageConfiguration.TAXONOMY_TYPE_ID_TAG })
        const tags = taxonomyTypeViewModels[ taxonomyTypeTagIndex ].taxonomies || []

        return (
            <Container>
                <OwlCarouselLightBox className="mb-4" images={ coverPhotos } />
                <article className="entity-detail mb-5">
                    <h1 className="h5">{ `${title} | ${area || 40}m` }<sup>2</sup></h1>
                    <div className="entity-detail-meta mb-4">
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Tác giả')}: ` }</span>
                            <span className="entity-detail-meta-text">{ writer || 'No data' }</span>
                        </div>
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Danh mục')}: ` }</span>
                            <span className="entity-detail-meta-text">{ this.getFirstCategoryInList().title }</span>
                        </div>
                        <div className="entity-detail-meta-line">
                            <span className="entity-detail-meta-text">{ `${global.localizationString.getString('Chia sẻ')}: ` }</span>
                            <SocialIcons className="d-inline ml-1 share" facebook={ facebook } twitter={ twitter } instagram={ instagram } />
                        </div>
                    </div>
                    <div className="entity-detail-content mb-5" dangerouslySetInnerHTML={ { __html: content } } />
                    <div className="tag-wrapper">
                        <ul className="tag-list">
                            {
                                map(tags, (tag) => {
                                    return (
                                        <li key={ tag.id } className="tag-item">
                                            { tag.title }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </article>
                <CommentBox className=""
                    entityId={ meta.id }
                    mvcController={ '/PostComment'
                    }
                />
            </Container>
        )
    }
}

export default connect()(DetailPage)