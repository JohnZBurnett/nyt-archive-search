import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios'; 
import { updateCurrentArticleComments } from '../actions/index'; 

function mapStateToProps(state) {
    return(
        {
            currentArticle: state.currentArticle,
            auth: state.auth
        }
    )
}

function mapDispatchToProps(dispatch) {
    return(
        {
            updateCurrentArticleComments: (article) => dispatch(updateCurrentArticleComments(article))
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
        this.props.updateCurrentArticleComments(commentResult); 
    }

    handleUpdatingCommentForm = (event) => {
        this.setState({
            newCommentForm: event.target.value
        }); 
    }

    render() {
        return(
            <div>
                <textarea value={this.state.newCommentForm} onChange={this.handleUpdatingCommentForm}>
                </textarea>
                <button onClick={this.handleAddingNewComment}>Submit</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentBox); 