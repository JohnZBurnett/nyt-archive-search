import React from 'react';
import { connect } from 'react-redux'; 
import Comment from './Comment'; 


function mapStateToProps(state) {
    return(
        {
            articleComments: state.articleComments,
            currentArticle: state.currentArticle,
            auth: state.auth
        }
    )
}

const CommentList = (props) => {

    renderAllComments = () => {
        const filteredComments = filterArticleComments(props.articleComments); 

        return(
            filteredComments.map( comment => {
                return <Comment commentInfo={comment} /> 
            })
        )
    }

    filterArticleComments = (articleComments) => {
        return articleComments.filter( comment => {
            return (comment.user === props.auth._id && comment.article === props.currentArticle._id)
        })
    }

    return(
        renderAllComments()
    )
}

export default connect(mapStateToProps)(CommentList); 