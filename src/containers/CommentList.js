import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

// CommentLIstContainer
// A Smart component that is responsible for loading comments,
// initializing, adding, and deleting comments, and that connects CommentList with State
class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }
    
    componentWillMount () {
        // Initialize comments
        this._loadComments()
    }

    _loadComments () {
        // Load comments from LocalStorage
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        // this.props.initComments is passed from connect,
        // and can help us initialize the state with data
        this.props.initComments(comments)
    }

    handleDeleteComment (index) {
        const { comments } = this.props
        // props cannot be changed, so we create a comment
        // list without the comment of a specific index
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]
        // Save the lastest comment list to LocalStorage
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            // this.props.onDeleteComment is passed from connect,
            // and will dispatch an action to delete a comment
            this.props.onDeleteComment(index)
        }
    }

    render () {
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)} />
        )
    }
}

// The comment list is acquired from state.comments
const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // For CommentListContainer.
        // This method will initialize the state with
        // the comment list loaded from LocalStorage.
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        // Delete a comment
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}

// Connecting CommentListContainer with store will pass comments,
// initComments, onDeleteComment to CommentListContainer
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)