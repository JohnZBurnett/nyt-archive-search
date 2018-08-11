import React from 'react';
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 

const mapStateToProps = (state) => {
    return {
        articleList: [...state.articleList.slice(0, 20)],
    }
}


const ArticleIndex = ({articleList}) => {

   
    const renderArticleCards = (articleList) => {
        console.log("ARTICLE LIST INSIDE RENDER FUNCTION: ", articleList); 
        return articleList.map( article => <ArticleCard article={article} />);
    }
    
    
    return(
        <div>{articleList.length > 0 ? renderArticleCards(articleList) : "Loading Articles"}</div>
    );
}

export default connect(mapStateToProps)(ArticleIndex); 