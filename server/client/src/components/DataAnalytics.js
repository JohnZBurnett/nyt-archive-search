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

        // sort descending
        catArr = catArr.sort( function(a, b) {
            return Object.values(b)[0] - Object.values(a)[0]; 
        })

        return catArr; 
    }

    function sortKeywordData(keywordData) {
        const keys = Object.keys(keywordData); 
        keys.forEach( key => {
            console.log("KEY: ", key);
            console.log("KEYWORD DATA[KEY]", keywordData[key]); 
            keywordData[key] = placeKeyValuePairsIntoArrays(keywordData[key]) 
        })
        
        console.log("FULLY SORTED KEYWORD DATA: ", keywordData); 

        return keywordData; 
    }


    function populateKeywordData(articleList) {
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

        return keywordData; 
    }

    sortKeywordData(populateKeywordData(articleList)); 
    return(
        null
    ) 
}

export default connect(mapStateToProps)(DataAnalytics); 