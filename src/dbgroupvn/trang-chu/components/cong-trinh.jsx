
import React, { Component } from 'react'
import { default as classNames } from 'classnames'

import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Title } from '../../shared/components'

import { getCategoryUrl } from '../../cong-trinh/routes'

module.exports = class CongTrinh extends Component {
    render() {
        return (
            <section className={ classNames('cong-trinh', this.props.className) }>
                <Row className="mt-2">
                    <Col xs="12" md={ 6 } className="pr-1">
                        <Row>
                            <Col xs={ 12 } className="mb-2">
                                <div data-aos="fade-left">
                                    <div className="link link-khach-san">
                                        <Link className="title" to={ getCategoryUrl('hotel') } dangerouslySetInnerHTML={ { __html: global.localizationString.getString('Khách<br/>sạn') } } />
                                    </div>
                                    <img className="w-100" src={ '/img/khach-san-cover.jpg' } />
                                </div>
                            </Col>
                            <Col xs={ 12 } className="mb-2 mb-md-0">
                                <div data-aos="fade-left">
                                    <div className="link link-can-ho">
                                        <Link className="title" to={ getCategoryUrl('apartment') } dangerouslySetInnerHTML={ { __html: global.localizationString.getString("Căn<br/>hộ") } } />
                                    </div>
                                    <img className="w-100" src={ '/img/can-ho-cover.jpg' } />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" md={ 6 } className="pl-1">
                        <div className="h-100" data-aos="flip-left" data-aos-delay="300" >
                            <div className="link link-nha-o">
                                <Link className="title" to={ getCategoryUrl('home') } dangerouslySetInnerHTML={ { __html: global.localizationString.getString("Nhà ở") } } />
                            </div>
                            <img className="h-100 w-100" src={ '/img/nha-o-cover.jpg' } />
                        </div>
                    </Col>
                </Row>
            </section>
        );
    }
}