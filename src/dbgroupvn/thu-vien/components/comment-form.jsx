import $ from 'jquery'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Row, Col } from 'reactstrap'

export default class CommentForm extends Component {
    static propTypes = {
        className: PropTypes.string,
        postCommentUrl: PropTypes.string,
        onAddCommentToList: PropTypes.func,
        entityId: PropTypes.number,
        replyToCommentId: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitCallBack = this.onSubmitCallBack.bind(this)
    }

    onSubmitCallBack(response) {
        const { onAddCommentToList } = this.props
        onAddCommentToList(response)
    }

    onSubmit(e) {
        const { postCommentUrl } = this.props

        if (postCommentUrl) {
            const data = $(e.target).serialize()
            $.post(
                postCommentUrl,
                data,
                (comment) => {
                    this.onSubmitCallBack(comment)
                    $(e.target).find('input, textarea').val('');
                    $(e.target).find('input, textarea').prop('disabled', false)
                }
            )
        }
        $(e.target).find('input, textarea').prop('disabled', true)

        e.preventDefault();
    }

    render() {
        const { className, entityId, replyToCommentId } = this.props
        return (
            <div className={ classNames(className, 'comment-form') }>
                <div className="title-slim">
                    Write as your think
                </div>
                <form onSubmit={ this.onSubmit } className="comment-box-from">
                    <input name="entityId" type="hidden" value={ entityId } />
                    <input name="replyToCommentId" type="hidden" value={ replyToCommentId } />

                    <Row className="mb-3">
                        <Col xs={ 12 } className="mb-2 mb-lg-0">
                            <div className="comment-box-field">
                                <textarea required name="content" className="w-100 pl-3 pr-3 d-block border-bottom-lg-0" placeholder={ `${global.localizationString.getString('Comment')} *` } />
                            </div>
                        </Col>
                        <Col xs={ 12 } md={ 6 } lg={ 4 } className="mb-2 mb-lg-0 pr-lg-0">
                            <div className="comment-box-field">
                                <input required name="author" className="w-100 pl-3 pr-3" placeholder={ `${global.localizationString.getString('Name')} *` } />
                            </div>
                        </Col>
                        <Col xs={ 12 } md={ 6 } lg={ 4 } className="mb-2 mb-lg-0 pl-lg-0 pr-lg-0">
                            <div className="comment-box-field">
                                <input required name="email" type="email" className="w-100 pl-3 pr-3" placeholder={ `${global.localizationString.getString('Email')} *` } />
                            </div>
                        </Col>
                        <Col xs={ 12 } md={ 12 } lg={ 4 } className="mb-2 mb-lg-0 pl-lg-0">
                            <div className="comment-box-field">
                                <input name="url" className="w-100 pl-3 pr-3" placeholder={ `${global.localizationString.getString('Url')}` } />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button className="btn btn-send" type="submit">{ global.localizationString.getString('Send') }</button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}