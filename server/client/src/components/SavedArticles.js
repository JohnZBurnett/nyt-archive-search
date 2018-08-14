import React from 'react'; 
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
    console.log("ARTICLE PROPS: ", articles);
    return(
        articleCollections.map( (articleCollection) => {
            return (
             <div>
                 <h1>Name: {articleCollection.name} </h1>
                {renderAllArticlesForThisCollection(articleCollection.articles, articles)}
             </div>
            )
        })
    )
}

function renderAllArticlesForThisCollection(articleIdArr, articleArr) {
 
    return(
        articleIdArr.map( articleId => {
            console.log("ARTICLE ID: ", articleId); 
            const thisArticle = articleArr.find( article => article._id === '5b6b46a5f013e485332a7108')
            console.log("THIS ARTICLE: ", thisArticle); 
        })
    )
    console.log("ARTICLE ID ARR: ", articleIdArr); 
}


const SavedArticles = (props) => {

    renderAllArticleCollectionsForThisUser(props.articleCollections, props.articles); 
    return(
        <div>I am a SavedArticles placeholder.</div>
    )
}

export default connect(mapStateToProps)(SavedArticles); 