import React from 'react'; 
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 

function mapStateToProps(state)  {
    return(
        {
            articleCollections: state.articleCollections,
            articles: state.articles
        }
    )
}

function renderAllArticleCollectionsForThisUser(articleCollections) {
    return(
        articleCollections.map( (articleCollection) => {
            return (
             <div>
                 <h1>Name: {articleCollection.name} </h1>
                {renderAllArticlesForThisCollection(articleCollection.articles)}
             </div>
            )
        })
    )
}

function renderAllArticlesForThisCollection(articleIdArr) {
    console.log("ARTICLE ID ARR: ", articleIdArr); 
}


const SavedArticles = (props) => {
    renderAllArticleCollectionsForThisUser(props.articleCollections); 
    return(
        <div>I am a SavedArticles placeholder.</div>
    )
}

export default connect(mapStateToProps)(SavedArticles); 