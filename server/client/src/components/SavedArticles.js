import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 

function mapStateToProps(state)  {
    return(
        {
            articleCollections: state.articleCollections,
            articles: state.articleList
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

    render() {
        return(
            <div>
                <input type="text" placeholder="Enter a new category name: " value={this.state.nameForm} onChange={this.handleNameFormChange}/>
                <div>
                    {props.articles.length > 0 ? renderAllArticleCollectionsForThisUser(props.articleCollections, props.articles) : null} 
                </div>
            </div>
        )
    }
    
}
    

export default connect(mapStateToProps)(SavedArticles); 