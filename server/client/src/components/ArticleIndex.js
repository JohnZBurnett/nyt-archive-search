import React, { Component } from 'react';
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
class ArticleIndex extends Component  
  {
    constructor(props) {
        super(props); 
    }

    handleUpdatingCurrentArticle = (article) => {
        this.props.updateCurrentArticle(article); 
        this.props.history.push('/detail'); 
    }

    renderArticleCards = (articleList) => {
        console.log("ARTICLE LIST INSIDE RENDER FUNCTION: ", articleList); 
        return articleList.map( article => <ArticleCard article={article} key={article._id} onClick={this.handleUpdatingCurrentArticle}/>);
    }
    
    
    render() {
        return(
            <div>{this.props.articleList.length > 0 ? this.renderArticleCards(this.props.articleList) : "Loading Articles"}</div>
        );
    }   
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex)); 