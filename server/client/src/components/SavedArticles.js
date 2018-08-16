import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 
import axios from 'axios'; 
import { updateCurrentArticle, updateArticleCollections } from '../actions/index'; 
import { withRouter } from 'react-router-dom'; 

function mapStateToProps(state)   {
    console.log("MAPPING STATE TO PROPS: ", state);
    console.log("USER IN STATE: ", state.auth);  
    return(
        {
            articleCollections: state.articleCollections,
            articles: state.articleList,
            userId: state.auth._id,
            articleStartMonthFilter: state.articleStartMonthFilter,
            articleEndMonthFilter: state.articleEndMonthFilter
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentArticle: (article) => {
            dispatch(updateCurrentArticle(article));
        }, 
        updateArticleCollections: (articleCollections) => {
            dispatch(updateArticleCollections(articleCollections))
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

    handleDeletingCategory(collectionId) {
        console.log(collectionId); 
        axios.delete(`/api/collections/${collectionId}`); 
        const articleCollectionToDelete = this.props.articleCollections.find( articleCollection => articleCollection._id === collectionId);
        const indexToRemove = this.props.articleCollections.indexOf(articleCollectionToDelete); 
        const articleCollectionsMinusDeletedCollection = this.props.articleCollections.slice(0, indexToRemove).concat(this.props.articleCollections.slice(indexToRemove + 1));
        this.props.updateArticleCollections(articleCollectionsMinusDeletedCollection); 
        console.log(articleCollectionsMinusDeletedCollection);  

    }

    filterArticleCollectionsForCurrentUserId() {
        return this.props.articleCollections.filter( articleCollection => articleCollection.user === this.props.userId)
    }
    
    renderAllArticleCollectionsForThisUser = (articleCollections, articles) => {
        return(
            this.filterArticleCollectionsForCurrentUserId().map( (articleCollection) => {
                return (
                 <div key={articleCollection._id}>
                     <h1>Category: {articleCollection.name} </h1> <button onClick={() => this.handleDeletingCategory(articleCollection._id)}>Delete</button>
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

        // this is mutating Redux state - need to update so that it uses a dispatcher 
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