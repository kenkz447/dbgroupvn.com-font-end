import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SidebarWidget, GoogleMap } from '../../shared/components'
import { push } from 'react-router-redux'

import { default as classNames } from 'classnames'
const pageConfigures = require('../configuration.js')

class SmallMap extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onMarkerClick = this.onMarkerClick.bind(this)
    }

    onMarkerClick(marker) {
        const { layouttParameters: { mediaSize } } = this.props
        if (mediaSize == 'md' || mediaSize == 'sm' || mediaSize == 'xs')
            this.setState({ showBalloonForMarker: marker.id })
        else
            this.props.dispatch(push(marker.redirect))
    }

    renderMarkerContent(marker) {
        return (
            <div className="marker-info">
                <label className="label">
                    { marker.title || 'Missing Title' }
                </label>
                <br />
                <a className={ classNames('map-marker-hint__ap-link') }>
                    { global.localizationString.getString('Click to view more info') }
                </a>
            </div>
        )
    }

    render() {
        if (!this.props.map)
            return null;
        
        return (
            <SidebarWidget noBorder noCollapse title={ global.localizationString.getString('Bản đồ') }>
                <div className="no-left-space">
                    <div className="g-map">
                        <GoogleMap {...this.props.map}
                            onMarkerClick={ this.onMarkerClick }
                            showBalloonForMarker={ this.state.showBalloonForMarker }
                            renderMarkerContent={ this.renderMarkerContent } />
                    </div>
                    <div className={ classNames('mt-3', { 'd-none': this.props.hiddenBigMapLink }) }>
                        <Link className="btn btn-secondary" to={ this.props.linkToBigMap }>
                            { global.localizationString.getString('Xem bản đồ') }
                        </Link>
                    </div>
                </div>
            </SidebarWidget>
        );
    }
}

const mapStateToProps = (state) => {
    const { mediaSize, viewportHeight, header } = state.layout.parameters

    return {
        map: state.googleMap[ pageConfigures.smallMapId ],
        layouttParameters: { mediaSize, viewportHeight, headerHeight: header.height }
    }
}

export default connect(mapStateToProps)(SmallMap);