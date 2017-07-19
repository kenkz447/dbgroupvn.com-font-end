import React from 'react'
import startsWith from 'lodash/startsWith'

const Image = (props) => {
    const { url, urlThumb, title, description, className, thumbnail } = props;

    const urlSelected = thumbnail ? urlThumb : url
    const src = global.APP_DOMAIN + (startsWith(String(url), '/') ? urlSelected : `/${urlSelected}`)

    return (
        <img className={`w-100 ${className}`} src={src} title={title && title} alt={description && description}/>
    );
}

export default Image