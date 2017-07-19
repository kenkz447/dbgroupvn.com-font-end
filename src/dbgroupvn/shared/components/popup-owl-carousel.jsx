import React, { Component } from 'react';
import classNames from 'classnames'

import OwlCarousel from 'react-owl-carousel2'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types';

class PopupOwlCarousel extends Component {

    owlOptions = {
        items: 1,
        nav: true,
        navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
        dots: false,
        rewind: false,
        autoplay: false,
    }

    static defaultProps = {
        currentItemIndex: null,
        items: []
    }

    render() {
        const { items, currentItemIndex, onClose } = this.props
        return (
            <div className={ classNames('owl-popup', { open: currentItemIndex != null }) }>
                <Container>
                    <div className="owl-popup-wrapper">
                        <Row className="pl-4 pr-4 pt-4 pb-2">
                            <Col className="clearfix">
                                <div className="close float-right" onClick={ () => {
                                    onClose()
                                } } />    
                            </Col>
                        </Row>
                        <OwlCarousel options={ this.owlOptions }>
                            { items }
                        </OwlCarousel>
                    </div>
                </Container>
            </div>
        );
    }
}

PopupOwlCarousel.propTypes = {
    items: PropTypes.array,
    currentItemIndex: PropTypes.number,
    onClose: PropTypes.func
};

export default PopupOwlCarousel;