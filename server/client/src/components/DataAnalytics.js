import React from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return(
        {
            articleList: this.state.articleList
        }
    )
}

const DataAnalytics = ({articleList}) => {
    const keywordData = {};

    articleList.forEach( (article) => {
        article.keywords.forEach( (keyword) => {
            if (keywordData[keyword.name] === false) {
                keywordData[keyword.name] = 1;
            } else {
                keywordData[keyword.name] += 1;
            }
        })
    })

    console.log("KEYWORD DATA: ", keywordData); 
}

export default connect(mapStateToProps)(DataAnalytics); 