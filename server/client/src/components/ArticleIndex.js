import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import ArticleCard from './ArticleCard'; 
import { updateCurrentArticle } from '../actions/index'; 
import { withRouter } from 'react-router-dom'; 

const mapStateToProps = (state) => {
    return {
        articleList: [...state.articleList],
        titleFilter: state.titleFilter,
        articleStartMonthFilter: state.articleStartMonthFilter,
        articleEndMonthFilter: state.articleEndMonthFilter
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

    filterArticleListFromSearchTerms = (articleList) => {
        return articleList.filter( article => article.headline.main.toLowerCase().includes(this.props.titleFilter.toLowerCase()))
    }

    filterArticleListFromStartAndEndMonth = (articleList) => {
        return articleList.filter( article => parseInt(article.pub_date.month) >= parseInt(this.props.articleStartMonthFilter) && parseInt(article.pub_date.month) <= parseInt(this.props.articleEndDateFilter) )
    }

    handleFilteringArticleListBySearchOptions = () => {
        const listFilteredByTitle = this.filterArticleListFromSearchTerms(this.props.articleList); 
        const listFilteredByDatesAndTitle = this.filterArticleListFromStartAndEndMonth(listFilteredByTitle); 
        return listFilteredByDatesAndTitle; 
    }

    renderArticleCards = (articleList) => {
        // console.log("ARTICLE LIST INSIDE RENDER FUNCTION: ", articleList); 
        return this.handleFilteringArticleListBySearchOptions().slice(this.state.min, this.state.max).map( article => <ArticleCard article={article} key={article._id} onClick={this.handleUpdatingCurrentArticle}/>);
    }

    goToNextPageOfArticles = () => {
        if (this.state.max > this.filterArticleListFromSearchTerms().length - 20) {
            return null;
        } else {
            this.setState({
                min: this.state.min + 20,
                max: this.state.max + 20
            })
        }
    }

    goToPreviousPageOfArticles = () => {
        if (this.state.min < 20) {
            return null;
        } else {
            this.setState({
                min: this.state.min - 20,
                max: this.state.max - 20
            })
        }
    }
    
    
    render() {
        return(
            <div>
                <button onClick={this.goToPreviousPageOfArticles}>Previous Page</button>
                <button onClick={this.goToNextPageOfArticles}>Next Page</button>
                {this.props.articleList.length > 0 ? this.renderArticleCards(this.props.articleList) : "Loading Articles"}
            </div>
        );
    }   
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleIndex)); 