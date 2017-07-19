import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import moment from 'moment'

class CommentItem extends React.Component {
    static propTypes = {
        author: PropTypes.string,
        content: PropTypes.string,
        time: PropTypes.any,
        email: PropTypes.string,
        url: PropTypes.string,
        onCommentDelete: PropTypes.func,
        id: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { id, author, content, time, email, url, onCommentDelete } = this.props

        //Convert utl time to local!
        const stillUtc = moment.utc(time).toDate();
        const localTime = moment(stillUtc).local().format('LLL');

        return (
            <div className="comment-item">
                <strong className="comment-author">{ author }</strong>
                {
                    global.isUserAuthenticated && (
                        <Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
                            <DropdownToggle caret />
                            <DropdownMenu>
                                <DropdownItem onClick={ () => { onCommentDelete(id) } }>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
                }

                <dl className="ml-2">
                    <dd>
                        <small><i><email className="comment-email">{ email }</email></i></small>
                        {
                            url && <small>{ ' | ' }<i><a className="comment-link" href={ url }>{ url }</a></i></small>
                        }
                    </dd>
                    <dd>
                        <small><i><span className="comment-time">{ localTime }</span></i></small>
                    </dd>
                </dl>
                <p className="comment-content">
                    { content }
                </p>
            </div>
        )
    }
}

export default CommentItem