import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 
import axios from 'axios'; 

function mapStateToProps(state)  {
    return(
        {
            articleCollections: state.articleCollections,
            articles: state.articleList,
            userId: state.auth._id
        }
    )
}

function renderAllArticleCollectionsForThisUser(articleCollections, articles) {
    return(
        articleCollections.map( (articleCollection) => {
            return (
             <div key={articleCollection._id}>
                 <h1>Category: {articleCollection.name} </h1>
                {renderAllArticlesForThisCollection(articleCollection.articles, articles)}
             </div>
            )
        })
    )
}

function renderAllArticlesForThisCollection(articleIdArr, articleArr) {
 
    return(
        articleIdArr.map( articleId => {
            const thisArticle = articleArr.find( article => article._id === articleId); 
            return <ArticleCard article={thisArticle} key={thisArticle._id}/>
        })
    )
}


class SavedArticles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameForm: ""
        }
    }

    handleNameFormChange = (event) => {
        this.setState({
            nameForm: event.target.value
        })
    }

    saveNewCategory = async () => {
        const body = {
            user: this.state.userId,
            name: this.state.nameForm
        }
        const result = await axios.post('http://localhost:5000/api/collections', body); 
    }

    render() {
        return(
            <div>
                <input type="text" placeholder="Enter a new category name: " value={this.state.nameForm} onChange={this.handleNameFormChange}/>
                <button onClick={this.saveNewCategory}>Save New Category</button>
                <div>
                    {this.props.articles.length > 0 ? renderAllArticleCollectionsForThisUser(this.props.articleCollections, this.props.articles) : null} 
                </div>
            </div>
        )
    }
    
}
    

export default connect(mapStateToProps)(SavedArticles); 