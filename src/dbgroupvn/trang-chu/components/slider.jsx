

import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel2'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import { Image } from '../../shared/components'

import { fetchSingleEntity } from '../../shared/utilities'

class Slider extends Component {
    static propTypes = {
        className: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            slides: []
            /* Chú ý: slides không phải là một array của hình ảnh.
            Ví dụ cho 'slides'
                slides: [
                    {
                        "image": {
                            "urlThumb": "uploads/2/2017/6/slider-2-2017-6-9-310_thumb.jpg",
                            "dimension": "Size [ Width=1058, Height=463 ]",
                            "title": "slider-2",
                            "description": null,
                            "fileName": null,
                            "url": "uploads/2/2017/6/slider-2-2017-6-9-310.jpg",
                            "type": "Image",
                            "extension": ".jpg",
                            "size": "194 KB",
                            "taxonomyTypes": null
                        }
                    },...
                ]
            Hình ảnh('image') chỉ là một prop của 'slide', và còn một số prop khác như caption, etc... sẽ được thêm vào sau này nếu cần thiết.
            */,
            options: {
                items: 1,
                nav: false,
                rewind: false,
                autoplay: true
            }
        };
        fetchSingleEntity('home-slider', '/album').then((entity) => {
            this.setState({ slides: entity.details.images.reverse() })
        })
    }

    componentWillUpdate() {
    }

    render() {
        return (
            <div className={ this.props.className }>
                { this.state.slides.length &&
                    <OwlCarousel ref={ (owl) => { this.owl = owl; } } options={ this.state.options }>
                        {
                            map(this.state.slides, (slide, index) => {
                                return (
                                    <div key={ index } id={ `slide${index}` }>
                                        <Image url={ `${slide.image.url}` } description={ slide.image.description } title={ slide.image.title } />
                                    </div>
                                )
                            })
                        }
                    </OwlCarousel>
                }
            </div>
        );
    }
}

module.exports = Slider;