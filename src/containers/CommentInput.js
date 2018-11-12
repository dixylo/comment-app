import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'

// CommentInputContainer
// Used to load and save username, and post comment
class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor () {
        super()
        this.state = { username: ''}
    }

    componentWillMount () {
        // Initialize username
        this._loadUsername()
    }

    _loadUsername () {
        // Load username from LocalStorage
        // and pass it to CommentInput in render
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({ username })
        }
    }

    _saveUsername (username) {
        // See onUserNameInputBlur in render
        // this method will be invoked to save username
        // when the textarea for username is on blur
        localStorage.setItem('username', username)
    }

    handleSubmitComment (comment) {
        // authentication of comment data
        if (!comment) return
        if (!comment.username) return alert('Please enter username')
        if (!comment.content) return alert('Please enter comment')
        // Save new comments to LocalStorage
        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        // this.props.onSubmit is passed by connect
        // and will dispatch an action to add a new comment
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render () {
        return (
            <CommentInput
                username={this.state.username}
                onUserNameInputBlur={this._saveUsername.bind(this)}
                onSubmit={this.handleSubmitComment.bind(this)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)