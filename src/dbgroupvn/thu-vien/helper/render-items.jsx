import React from 'react'

import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import map from 'lodash/map'

import { Image } from '../../shared/components'

const pageConfigure = require('../configuration.js')

function renderItem(item) {

    const tags = item.taxonomyTypes[ pageConfigure.TAXONOMY_TYPE_ID_TAG ] || []
    const { title, moreDetails, path } = item

    return (
        <div className="liblary-item w-100 mb-4 mb-lg-5 pb-4 pb-lg-0">
            <Row>
                <Col xs="12" md="8">
                    <Image className="h-100" url={ item.thumbnailUrl } />
                </Col>
                <Col md={ 4 }>
                    <h6 className="mt-3 mt-lg-0">{ title }</h6>
                    <dl>
                        <dt className="d-inline">{ global.localizationString.getString('Thời gian') }: </dt>
                        <dd className="d-inline">5/08/2017 <br /></dd>

                        <dt className="d-inline">{ global.localizationString.getString('Đăng bởi') }: </dt>
                        <dd className="d-inline">Admin <br /></dd>

                        <dt className="d-inline">{ global.localizationString.getString('Tag') }: </dt>

                        <dd className="d-inline">
                            {
                                map(tags, (tag, index) =>
                                    <span key={ tag.id }>
                                        { (tags.length === index + 1) ? tag.title : `${tag.title}, ` }
                                    </span>
                                )
                            }
                            <br />
                            { moreDetails && moreDetails.excerpt }
                        </dd>
                    </dl>
                    <div>
                        <Link to={ path } className="read-more text-uppercase btn btn-secondary w-100 w-lg-auto">{ global.localizationString.getString('Read More') }</Link>
                    </div>
                </Col>
            </Row>
        </div>

    )
}

export default renderItem