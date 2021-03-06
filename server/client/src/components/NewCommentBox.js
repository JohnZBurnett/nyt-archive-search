import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios'; 
import { updateArticleComments } from '../actions/index'; 

function mapStateToProps(state) {
    return(
        {
            currentArticle: state.currentArticle,
            auth: state.auth,
            articleComments: state.articleComments
        }
    )
}

function mapDispatchToProps(dispatch) {
    return(
        {
            updateArticleComments: (articleComments) => dispatch(updateArticleComments(articleComments))
        }
    )
}

class NewCommentBox extends Component {
    
    constructor() {
        super();

        this.state = {
            newCommentForm: ""
        }
    }

    handleAddingNewComment = async (event) => {
        const body = {
            commentBody: this.state.newCommentForm,
            user: this.props.auth._id
        }

        const commentResult = await axios.post(`http://localhost:5000/api/articlecomments/${this.props.currentArticle._id}`, body);
        console.log("COMMENT RESULT: ", commentResult); 
        commentResult.data.user = {
            _id: this.props.auth._id,
            username: this.props.auth.username
        }
        this.props.updateArticleComments([...this.props.articleComments, commentResult.data]); 
        this.setState({
            newCommentForm: ""
        })
    }

    handleUpdatingCommentForm = (event) => {
        this.setState({
            newCommentForm: event.target.value
        }); 
    }

    render() {
        return(
            <div>
                <h3> Add a new comment: </h3>
                <textarea value={this.state.newCommentForm} onChange={this.handleUpdatingCommentForm}>
                </textarea>
                <br />
                <button onClick={this.handleAddingNewComment}>Submit</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentBox); 