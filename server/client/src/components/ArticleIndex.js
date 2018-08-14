import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 
import { updateCurrentArticle } from '../actions/index'; 
import { withRouter } from 'react-router-dom'; 

const mapStateToProps = (state) => {
    return {
        articleList: [...state.articleList],
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

        this.state = {
            min: 0,
            max: 20
        }
    }

    handleUpdatingCurrentArticle = (article) => {
        this.props.updateCurrentArticle(article); 
        this.props.history.push('/detail'); 
    }

    renderArticleCards = (articleList) => {
        console.log("ARTICLE LIST INSIDE RENDER FUNCTION: ", articleList); 
        return articleList.slice(this.state.min, this.state.max).map( article => <ArticleCard article={article} key={article._id} onClick={this.handleUpdatingCurrentArticle}/>);
    }
    
    
    render() {
        return(
            <div>{this.props.articleList.length > 0 ? this.renderArticleCards(this.props.articleList) : "Loading Articles"}</div>
        );
    }   
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex)); 