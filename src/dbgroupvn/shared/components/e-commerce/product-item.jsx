import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Image from '../image'

class ProductItem extends React.Component {
    constructor(props) {
        super(props)

        this.renderLink = this.renderLink.bind(this)

    }
    renderLink(url, title) {
        const { onClick } = this.props

        return (
            <a onClick={ () => {
                onClick()
            } }>
                <span>{ title || global.localizationString.getString('Chi tiết') }
                </span>
            </a>
        )
    }

    render() {
        const { className, thumbnail, title, price, url } = this.props
        return (
            <div className={ classNames(className, 'product-item') }>
                <div className="product-item-thumbnail">
                    <Image className="w-100" {...thumbnail} />
                    <div className="overlay" />
                    {
                        this.renderLink(url)
                    }
                </div>
                <div className="product-item-title p-3 p-lg-4">
                    <h6>
                        {
                            this.renderLink(url, title)
                        }
                    </h6>
                    <span className="price" dangerouslySetInnerHTML={ { __html: price } } />
                </div>
            </div>
        )
    }
}

ProductItem.propTypes = {
    className: PropTypes.string,
    thumbnail: PropTypes.object,
    title: PropTypes.string,
    price: PropTypes.string,
    path: PropTypes.string,
    data: PropTypes.any,
    url: PropTypes.string
}

ProductItem.defautProps = {
    basePath: '/',
    title: 'Unknow',
    price: '0.000',
}

export { ProductItem }

export default function renderProductItem(product) {
    return <ProductItem { ...product } />
}

