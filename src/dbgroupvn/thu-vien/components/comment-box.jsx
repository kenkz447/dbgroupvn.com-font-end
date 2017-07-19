import $ from 'jquery'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import findIndex from 'lodash/findIndex'

import CommentList from './comment-list'
import CommentForm from './comment-form'

function getComments(getCommentUrl) {
    return new Promise((excutor) => {
        $.get(getCommentUrl, excutor)
    })
}

class CommentBox extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        mvcController: PropTypes.string,
        entityId: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {

        }
        this.onAddCommentToList = this.onAddCommentToList.bind(this)
        this.onCommentDelete = this.onCommentDelete.bind(this)
        this.onDeleteComplete = this.onDeleteComplete.bind(this)
    }

    componentWillMount() {
        const { mvcController, entityId } = this.props

        if (mvcController)
            getComments(`${global.APP_DOMAIN}${mvcController}/Get?entityId=${entityId}`).then((comments = []) => {
                this.setState({ comments: comments.reverse() })
            })
    }

    onAddCommentToList(comment) {
        const comments = $.extend([], this.state.comments)
        comments.unshift(comment)
        this.setState({ comments })
        
        $('html,body').animate({
            scrollTop: $('#comment-list').offset().top
        }, 'slow');
    }

    onDeleteComplete(commentId) {
        const comments = $.extend([], this.state.comments)
        const commentIndex = findIndex(comments, { id: commentId })
        comments.splice(commentIndex, 1)

        this.setState({ comments })
    }

    onCommentDelete(commentId) {
        const { mvcController } = this.props
        $.ajax({
            url: `${global.APP_DOMAIN}${mvcController}/Delete`,
            data: { id: commentId },
            method: 'DELETE',
            xhrFields: {
                withCredentials: true
            },
            success: (isSuccess) => {
                if (isSuccess)
                    this.onDeleteComplete(commentId)
            }
        })
    }

    render() {
        const { mvcController, className, entityId } = this.props
        const { comments } = this.state

        return (
            <div className={ classNames(className, 'comment-box') }>
                <CommentList className="mb-5" comments={ comments } onCommentDelete={ this.onCommentDelete } />
                <CommentForm onAddCommentToList={ this.onAddCommentToList }
                    postCommentUrl={ `${global.APP_DOMAIN}${mvcController}/Create` }
                    entityId={ entityId } />
            </div>
        )
    }
}

export default CommentBox