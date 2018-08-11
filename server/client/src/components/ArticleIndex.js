import React from 'react';
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 
import { updateCurrentArticle } from '../actions/index'; 
import { withRouter } from 'react-router-dom'; 

const mapStateToProps = (state) => {
    return {
        articleList: [...state.articleList.slice(0, 20)],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentArticle: (article) => {
            dispatch(updateCurrentArticle(article));
        }
        
    }
} ; 

const ArticleIndex = ({articleList, updateCurrentArticle, history}) => {

    const handleUpdatingCurrentArticle = (article) => {
        updateCurrentArticle(article); 
        history.push('/detail'); 
    }

    const renderArticleCards = (articleList) => {
        console.log("ARTICLE LIST INSIDE RENDER FUNCTION: ", articleList); 
        return articleList.map( article => <ArticleCard article={article} key={article._id} onClick={handleUpdatingCurrentArticle}/>);
    }
    
    
    return(
        <div>{articleList.length > 0 ? renderArticleCards(articleList) : "Loading Articles"}</div>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex)); 