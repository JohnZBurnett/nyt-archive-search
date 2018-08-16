import React from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return(
        {
            articleList: state.articleList
        }
    )
}

const DataAnalytics = ({articleList}) => {

    
    function placeKeyValuePairsIntoArrays(categoryData) {
        let catArr = []; 
        const keys = Object.keys(categoryData); 
        keys.forEach( key => {
            catArr.push({
                [key]: categoryData[key]
            })
        }); 
        catArr = catArr.sort( function(a, b) {
            return Object.values(a)[0] - Object.values(b)[0]; 
        })
        console.log("CATEGORY ARR: ", catArr); 
    }

    function sortKeywordData(keywordData) {
        const keys = Object.keys(keywordData); 
        keys.forEach( key => {
            placeKeyValuePairsIntoArrays(keywordData[key]) 
        })

        return keywordData; 
    }

    const keywordData = {};

    articleList.forEach( (article) => {
        article.keywords.forEach( (keyword) => {
            if (keywordData[keyword.name] === undefined) {
                keywordData[keyword.name] = {
                };
            } 
            if (keywordData[keyword.name][keyword.value] === undefined) {
                keywordData[keyword.name][keyword.value] = 1 
            } else {
                keywordData[keyword.name][keyword.value] += 1; 
            }
        })
    })

    console.log("KEYWORD DATA: ", keywordData);
    console.log("SORTED KEYWORD DATA: ", sortKeywordData(keywordData)); 
    return(
        null
    ) 
}

export default connect(mapStateToProps)(DataAnalytics); 