import React, { Component } from 'react';
import classNames from 'classnames'

import map from 'lodash/map'

import { Row, Col } from 'reactstrap'

import PropTypes from 'prop-types';

import LightBox from './light-box'
import Image from './image'

class ImagesLightBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { imageViewModels, itemWrapClassName, thumbnail, imageClassNamePropName } = this.props

        return (
            <div className="gallery">
                <Row>
                    {
                        map(imageViewModels, ({ image }, index) => {
                            return (
                                <Col key={ index } className={ classNames(itemWrapClassName, imageClassNamePropName && image[ imageClassNamePropName ], 'mb-2') } onClick={ () => {
                                    this.setState({ lightBoxImageIndex: index })
                                } }>
                                    <div className="gallery-item">
                                        <Image className="pointer" {...image} thumbnail={ thumbnail } />
                                    </div>
                                </Col>
                            )
                        })
                    }

                    <LightBox
                        images={ map(imageViewModels, ({ image }) => `${global.APP_DOMAIN}/${image.url}`) }
                        photoIndex={ this.state.lightBoxImageIndex }
                        isOpen={ this.state.lightBoxImageIndex != null }
                        onClose={ () => { this.setState({ lightBoxImageIndex: null }) } }
                        onNext={ (next) => { this.setState({ lightBoxImageIndex: next }) } }
                        onPre={ (onPre) => { this.setState({ lightBoxImageIndex: onPre }) } }
                    />
                </Row>
            </div>
        );
    }
}

ImagesLightBox.propTypes = {
    imageViewModels: PropTypes.array,
    renderImage: PropTypes.func,
    itemWrapClassName: PropTypes.string,
    thumbnail: PropTypes.bool,
    imageClassNamePropName: PropTypes.string
};

export default ImagesLightBox;