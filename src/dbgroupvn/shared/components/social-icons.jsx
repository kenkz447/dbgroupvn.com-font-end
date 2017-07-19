import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default class SocialIcons extends Component {
    static propTypes = {
        className: PropTypes.string,
        facebook: PropTypes.string,
        twitter: PropTypes.string,
        instagram: PropTypes.string,
    }

    render() {
        const { className, facebook, twitter, instagram } = this.props
        return (
            <ul className={ classNames('socials pl-0', className) }>
                <li className="facebook"><a href={ facebook }><i className="fa fa-facebook-official" /></a></li>
                <li className="twitter"><a href={ twitter }><i className="fa fa-twitter" /></a></li>
                <li className="instagram"><a href={ instagram }><i className="fa fa-instagram" /></a></li>
            </ul>
        )
    }
}