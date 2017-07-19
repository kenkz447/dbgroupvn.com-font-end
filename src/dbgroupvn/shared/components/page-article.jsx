import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import { Container, Row } from 'reactstrap'

import Title from './section-title'
import Image from './image'

const renderArticle = (props) => {
    const { className, thumbnail, title, content } = props;
    return (
        <article className={classnames(className)}>
            <Container fluid className="mb-5">
                <Row>
                    <Image className="h-100" {...thumbnail} />
                </Row>
            </Container>
            <Container>
                <Title>{title}</Title>
                <div className="ml-3 mr-3 ml-lg-0 mr-lg-0" dangerouslySetInnerHTML={{ __html: content }} />
            </Container>
        </article>
    );
}

renderArticle.propTypes = {
    className: PropTypes.string,
    thumbnail: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string
}

export default renderArticle;