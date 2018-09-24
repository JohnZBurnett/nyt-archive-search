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

    const renderAllComments = () => {
        console.log("ARTICLE COMMENTS: ", props.articleComments); 
        const filteredComments = filterArticleComments(props.articleComments); 
        console.log("FILTERED COMMENTS: ", filteredComments); 
        return(
            filteredComments.map( comment => {
                return <Comment commentInfo={comment} /> 
            })
        )
    }

    const filterArticleComments = (articleComments) => {
        return articleComments.filter( comment => {
            return (comment.user._id === props.auth._id && comment.article === props.currentArticle._id)
        })
    }

    return(
        renderAllComments()
    )
}

export default connect(mapStateToProps)(CommentList); 