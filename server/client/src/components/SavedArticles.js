import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 
import axios from 'axios'; 
import { updateCurrentArticle } from '../actions/index'; 
import { withRouter } from 'react-router-dom'; 

function mapStateToProps(state)   {
    console.log("MAPPING STATE TO PROPS: ", state);
    console.log("USER IN STATE: ", state.auth);  
    return(
        {
            articleCollections: state.articleCollections,
            articles: state.articleList,
            userId: state.auth._id
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentArticle: (article) => {
            dispatch(updateCurrentArticle(article));
        }
        
    }
} ;

class SavedArticles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameForm: ""
        }
    }
    
    renderAllArticleCollectionsForThisUser = (articleCollections, articles) => {
        return(
            articleCollections.map( (articleCollection) => {
                return (
                 <div key={articleCollection._id}>
                     <h1>Category: {articleCollection.name} </h1>
                    {this.renderAllArticlesForThisCollection(articleCollection.articles, articles)}
                 </div>
                )
            })
        )
    }
    
    handleUpdatingCurrentArticle = (article) => {
        this.props.updateCurrentArticle(article); 
        this.props.history.push('/detail'); 
    }
    
    
    renderAllArticlesForThisCollection = (articleIdArr, articleArr) => {
     
        return(
            articleIdArr.map( articleId => {
                const thisArticle = articleArr.find( article => article._id === articleId); 
                return <ArticleCard article={thisArticle} key={thisArticle._id} onClick={this.handleUpdatingCurrentArticle}/>
            })
        )
    }
    

    handleNameFormChange = (event) => {
        this.setState({
            nameForm: event.target.value
        })
    }

    saveNewCategory = async () => {
        const body = {
            user: this.props.userId,
            name: this.state.nameForm
        }
        const result = await axios.post('http://localhost:5000/api/collections', body);
        console.log("NEW CAT RESULT: ", result);  
        this.props.articleCollections.push(result.data); 

        // some jank to re-render the page & display the new category
        this.setState({
            nameForm: ""
        })
    }

    render() {
        return(
            <div>
                <input type="text" placeholder="Enter a new category name: " value={this.state.nameForm} onChange={this.handleNameFormChange}/>
                <button onClick={this.saveNewCategory}>Save New Category</button>
                <div>
                    {this.props.articles.length > 0 ? this.renderAllArticleCollectionsForThisUser(this.props.articleCollections, this.props.articles) : null} 
                </div>
            </div>
        )
    }
    
}
    

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SavedArticles)); 