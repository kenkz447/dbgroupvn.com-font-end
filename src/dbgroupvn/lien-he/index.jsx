import $ from 'jquery'
//React/Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Popup from 'react-popup'

import lodashMap from 'lodash/map'
import replace from 'lodash/replace'

//Components
import basePage from '../shared/_layout/main/base-page'
import { GoogleMap, Image } from '../shared/components'
import { Container, Row, Col } from 'reactstrap'

//Helper function
const { getOptions } = require('../shared/utilities')

//Page configuration
const pageConfigure = require('./configuration.js')

class LienHe extends Component {
    static propTypes = {
        onDataFetch: PropTypes.func,
        dispatch: PropTypes.func,
        contactOptions: PropTypes.object,
        dataFetchProgress: PropTypes.number,
        constBodyStyle: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this)
    }


    componentWillMount() {
        const { onDataFetch, contactOptions } = this.props

        if (!contactOptions)
            getOptions('lien-he').then(function (contactOptions) {
                const constBodyStyle = { background: `url(${global.APP_DOMAIN}${contactOptions.cover_image.url})` }
                onDataFetch({ contactOptions, constBodyStyle }, 100)
            })
    }

    formSubmit(e) {
        const { contactOptions: { form } } = this.props;
        $.ajax({
            url: `${global.APP_DOMAIN}/form/contact`,
            data: $(e.target).serialize(),
            method: 'POST',
            success: (res) => {
                //Reset form
                $(e.target).find('input, textarea').val('');
                //Enable from
                $(e.target).find('input, textarea').prop('disabled', false)
                Popup.alert(form.submitPopupMessage || 'I am alert, nice to meet you');
            }
        })
        //Disable from while sending
        $(e.target).find('input, textarea').prop('disabled', true)

        e.preventDefault()
    }

    render() {
        if (this.props.dataFetchProgress != 100)
            return null

        const { constBodyStyle, contactOptions: { texts, address, call_us, form, google_map } } = this.props

        const map = {
            center: [ parseFloat(google_map.lat), parseFloat(google_map.lng) ],
            zoom: 15,
            markers: [
                {
                    id: 1,
                    lat: google_map.lat,
                    lng: google_map.lng
                }
            ]
        }

        return (
            <div id="contact" className="contact pt-lg-5">
                <div className="contact-body mb-5">
                    <div className="contact-body-content p-5" style={ constBodyStyle }>
                        <Container>
                            <h1 className="contact-title text-center h2 mb-3">{ texts.text1 }</h1>
                            <h4 className="text-center">{ texts.text2 }</h4>
                            <Row className="mt-5">
                                <Col xs={ 12 } lg={ 7 } className="mb-2 mb-lg-0">
                                    <p className="h5 mb-4"><strong>{ texts.text3 }</strong></p>
                                    <dl className="mb-4 pt-2">
                                        <dd>{ address.text1 }</dd>
                                        <dd><address className="m-0">{ address.text2 }</address></dd>
                                        <dd>{ address.text3 }</dd>
                                    </dl>
                                    <p className="h5 mb-4 pt-2"><strong>{ texts.text5 }</strong></p>
                                    <div className="pt-2">
                                        {
                                            lodashMap(call_us, (call, index) => {
                                                const tellNumber = replace(replace(replace(String(call), '(', ''), ')', ''), /\s/g, '')
                                                return (
                                                    <p key={ index } className="call-us">
                                                        <a href={ `tel:${tellNumber}` } title="Click here to call..."><span className="icon">{ index }</span> { call } </a>
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                </Col>
                                <Col xs={ 12 } lg={ 5 } className="pt-2 pt-lg-0">
                                    <p className="h5 mb-4"><strong>{ texts.text4 }</strong></p>
                                    <form onSubmit={ this.formSubmit } className="contact-from pt-4" method="POST">
                                        <div className="from-group mb-3">
                                            <input required className="form-control" name="fullName" placeholder={ form.full_name } />
                                        </div>
                                        <div className="from-group mb-3">
                                            <input required className="form-control" name="email" placeholder={ form.email } />
                                        </div>
                                        <div className="from-group mb-3">
                                            <input className="form-control" name="phone" placeholder={ form.phone } />
                                        </div>
                                        <div className="from-group mb-3">
                                            <textarea required className="form-control" name="message" placeholder={ form.message } />
                                        </div>
                                        <button className="send" type="submit">
                                            <Image className="w-100" url={ form.send_button_image_Url } description="Send you message" />
                                        </button>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Container className="">
                    <Row>
                        <div className="contact-map-container">
                            <div className="contact-map">
                                <GoogleMap {...map} renderMarkerContent={ () => {
                                    return (
                                        <div className="b-marker clearfix">
                                            <div className="d-inline-block float-left mr-1">
                                                <Image className="b-marker-logo" url={ '/img/logo.png' }/>
                                            </div>
                                            <div className="d-inline-block">
                                                <h4 className="h5" style={ { color: '#fff' } }>DB GROUP</h4>
                                                <span style={ { color: '#fff', lineHeight: '1.5' } }>{ google_map.marker_text }</span>
                                            </div>
                                        </div>
                                    )
                                } } />
                            </div>
                        </div>
                    </Row>
                </Container>
                <Popup />
            </div>
        );
    }
}

const ConnectedLienHe = connect()(LienHe)

export default basePage({ page: pageConfigure.page, showBreadcrumbs: pageConfigure.showBreadcrumbs })(ConnectedLienHe);