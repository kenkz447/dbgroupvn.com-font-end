
import React, { Component } from 'react'

import classNames from 'classnames'

//lỗi đéo gì đấy làm thằng này load trước jquery ._.
import OwlCarousel from 'react-owl-carousel2'

import PropTypes from 'prop-types'
import map from 'lodash/map'

import { Image } from '../../shared/components'
import LightBox from './light-box'


export default class OwlCarouselLightBox extends Component {
    static propTypes = {
        className: PropTypes.string,
        images: PropTypes.array
    }
    static defaultProps = {
        images: []
    }

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0
        }

        this.owlOptions = {
            items: 1,
            nav: true,
            navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
            dots: false,
            rewind: false,
            autoplay: true,
            autoplayTimeout: 3000
        }

        this.owlThumbnailOptions = {
            responsive: {
                0: {
                    items: 3,
                },
                768: {
                    items: 4,
                },
                1200: {
                    items: 6,
                },
            },
            margin: 15,
            nav: true,
            navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>' ],
            dots: false,
            rewind: false,
            autoplay: false,
        }

        this.onLightBoxClose = this.onLightBoxClose.bind(this)
    }

    onLightBoxClose() {
        this.setState({ isLightBoxOpen: false })
    }

    render() {
        const { images } = this.props

        if (!images.length)
            return null

        return (
            <div className={ classNames('owl-lightbox', this.props.className) }>
                <div className="owl-wrapper">
                    <div className="owl-display mb-3">
                        <OwlCarousel options={ this.owlOptions }>
                            {
                                map(images, ({ image }, index) => {
                                    return (
                                        <div key={ index } id={ `owl${index}` } onClick={ () => { this.setState({ photoIndex: index, isLightBoxOpen: true }) } }>
                                            <Image url={ `${image.url}` } description={ image.description } title={ image.title } />
                                        </div>
                                    )
                                })
                            }
                        </OwlCarousel>
                    </div>
                    <div className="owl-thumbnails">
                        <OwlCarousel options={ this.owlThumbnailOptions }>
                            {
                                map(images, ({ image }, index) => {
                                    return (
                                        <div key={ index } id={ `owl${index}` } onClick={ () => { this.setState({ photoIndex: index, isLightBoxOpen: true }) } }>
                                            <Image url={ `${image.urlThumb}` } description={ image.description } title={ image.title } />
                                        </div>
                                    )
                                })
                            }
                        </OwlCarousel>
                    </div>
                </div>


                <LightBox images={ map(images, ({ image }) => {
                    return `${global.APP_DOMAIN}/${image.url}`
                }) }
                    photoIndex={ this.state.photoIndex }
                    isOpen={ this.state.isLightBoxOpen }
                    onClose={ this.onLightBoxClose }
                    onNext={ (nextIndex) => { this.setState({ photoIndex: nextIndex }) } }
                    onPre={ (preIndex) => { this.setState({ photoIndex: preIndex }) } }
                />
            </div>
        );
    }
}