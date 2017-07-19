
import { default as basePage } from '../shared/_layout/main/base-page'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { Container, Row, Col } = require('reactstrap');
const Slider = require('./components/slider');
const ConTrinh = require('./components/cong-trinh');
const DuAn = require('./components/du-an');


class PageComponent extends Component {
    static propTypes = {
        onDataFetch: PropTypes.func,
    }

    componentWillMount() {

    }

    render() {
        const { onDataFetch } = this.props;

        return (
            <div id="trang-chu">
                <Slider className="mb-lg-5 mb-5" />
                <Container>
                    <Row className="mb-5 info mr-3 mr-lg-0 ml-3 ml-lg-0">
                        <Col xs={ 12 } md={ 4 }>
                            <div className="mr-0 mr-lg-2">
                                <h1 className="h4 mb-3 text-center text-lg-left text-uppercase">Lorem ipsum dolor sit amet<br /> dipiscing elit</h1>
                                <p>
                                    Nulla eleifend est eu purus tincidunt, rutrum mollis risus aliquam. Morbi eu varius ante. Sed suscipit, risus in vehicula maximus, sem orci mollis nunc, eu condimentum risus ante nec magna.
                                </p>
                            </div>
                        </Col>
                        <Col md={ 2 }>

                        </Col>
                        <Col xs={ 12 } md={ 6 }>
                            <div className="ml-0 ml-lg-2">
                                <p>
                                    Mauris maximus pretium magna, at consectetur nisi porttitor in. Sed sapien purus, faucibus nec sapien ut, dignissim euismod justo. Pellentesque sagittis sapien quis lectus egestas ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam sollicitudin et leo sit amet venenatis. Nulla nec bibendum elit.
                                </p>
                                <p>
                                    Suspendisse dictum condimentum tempor. Morbi cursus elit ac vehicula convallis. Cras luctus pharetra nisi, id porta urna dapibus id. Donec tincidunt mi mauris, nec auctor est viverra sit amet. Morbi viverra varius efficitur. Sed imperdiet commodo nunc nec suscipit.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <ConTrinh className="mb-md-5" />
                    <DuAn />
                </Container>
            </div>
        );
    }
}

module.exports = basePage({ page: 'trang-chu' })(PageComponent);