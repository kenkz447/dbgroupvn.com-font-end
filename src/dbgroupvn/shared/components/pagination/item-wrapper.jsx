import React, { Component } from 'react'
import { Col } from 'reactstrap'

class PagingItemWrapper extends Component {
    componentWillUnmount() {
    }

    render() {
        const { xs, sm, md, lg, xl, item, itemIndex, renderItem, className } = this.props
        return (
            <Col className={ className } xs={ xs } sm={ sm } md={ md } lg={ lg } xl={ xl }>
                { renderItem(item, itemIndex) }
            </Col>
        )
    }
}

export default PagingItemWrapper