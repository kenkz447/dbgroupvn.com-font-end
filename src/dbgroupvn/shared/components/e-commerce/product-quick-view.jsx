import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap'
import Image from '../image'

class ProductQuickView extends Component {
    render() {
        const { thumbnail, title, code, price, size, description } = this.props
        return (
            <Container >
                <div className="product-quick-view p-4 p-lg-5">
                    <Row>
                        <Col xs={ 12 } lg={ 6 } className="mb-4 mb-lg-0">
                            <Image {...thumbnail} />
                        </Col>
                        <Col xs={ 12 } lg={ 6 }>
                            <div className="pl-lg-4">
                                <h5 className="text-uppercase">{ title }<br/>
                                    <small>
                                        { code }
                                    </small>
                                </h5>
                                <br/>
                                <dl>
                                    <dd className="price"> <span className="h5">{ price }</span></dd>
                                    <dt><strong >SIZE</strong></dt>
                                    <dd className="size"><span>{ size }</span>
                                    </dd><dt><strong>FULL DESCRIPTION</strong></dt>
                                    <dd>{ description }</dd>
                                </dl>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

ProductQuickView.propTypes = {
    thumbnail: PropTypes.object,
    title: PropTypes.string,
    code: PropTypes.string,
    price: PropTypes.string,
    size: PropTypes.string,
    description: PropTypes.string
};

export { ProductQuickView }

export default function renderProductQuickView(product) {
    return <ProductQuickView {...product} />
}