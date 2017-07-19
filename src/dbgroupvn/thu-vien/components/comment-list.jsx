import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import map from 'lodash/map'
import first from 'lodash/first'
import take from 'lodash/take'


import CommentItem from './comment-item'

export default class CommentList extends Component {
    static propTypes = {
        className: PropTypes.string,
        comments: PropTypes.array,
        onCommentDelete: PropTypes.func
    }

    static defaultProps = {
        comments: []
    }

    state = {
        showCount: 0,
        showComments: []
    }
    constructor(props) {
        super(props);

        this.loadComments = this.loadComments.bind(this)
    }


    loadComments(comments, count) {
        if (!comments)
            comments = this.props.comments
        if (!count)
            count = this.state.showComments.length + 3

        const showComments = take(comments, count)
        this.setState({ showComments })
    }

    componentWillReceiveProps(nextProps) {
        const count = this.state.showComments.length == 0 ? 3 : this.state.showComments.length + 1
        this.loadComments(nextProps.comments, count)
    }

    render() {
        const { className, onCommentDelete } = this.props

        return (
            <div id="comment-list" className={ classNames(className, 'comment-list') }>
                <div className="title-slim">
                    comments
                </div>
                {
                    map(this.state.showComments, (comment) => <CommentItem key={ comment.id } onCommentDelete={ onCommentDelete }{...comment} />)
                }
                {
                    this.props.comments.length != this.state.showComments.length && (
                        <div className="mt-4">
                            <button className="btn-white border-0 text-black" onClick={ () => { this.loadComments() } }>
                                Load more comment
                            </button>
                        </div>
                    )
                }
            </div>
        )
    }
}