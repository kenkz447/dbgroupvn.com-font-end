import React, { Component } from 'react';
import ReactLightbox from 'react-image-lightbox';
import PropTypes from 'prop-types'

import noop from 'lodash/noop'

export default class Lightbox extends Component {
    static propTypes = {
        images: PropTypes.array,
        photoIndex: PropTypes.number,
        isOpen: PropTypes.bool,
        onNext: PropTypes.func,
        onPre: PropTypes.func,
        onClose: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
        this.onMovePrevRequest = this.onMovePrevRequest.bind(this)
        this.onMoveNextRequest = this.onMoveNextRequest.bind(this)
    }

    onMovePrevRequest() {
        const { photoIndex, images, onPre } = this.props
        const prePhotoIndex = (photoIndex + images.length - 1) % images.length
        
        onPre(prePhotoIndex)
    }

    onMoveNextRequest() {
        const { photoIndex, images, onNext } = this.props
        const nextPhotoIndex = (photoIndex + 1) % images.length

        onNext(nextPhotoIndex)
    }

    render() {
        const { images, photoIndex, isOpen, onClose } = this.props
        return (
            <div>
                { isOpen &&
                    <ReactLightbox
                        mainSrc={ images[ photoIndex ] }
                        nextSrc={ images[ (photoIndex + 1) % images.length ] }
                        prevSrc={ images[ (photoIndex + images.length - 1) % images.length ] }

                        onCloseRequest={ onClose || noop }
                        onMovePrevRequest={ this.onMovePrevRequest }
                        onMoveNextRequest={ this.onMoveNextRequest }
                    />
                }
            </div>
        );
    }
}