import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js'; 


function mapStateToProps(state) {
    return(
        {
            articleList: state.articleList
        }
    )
}

class DataAnalytics extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            currentCategory: "persons",
            currentMonth: "1"
        }
    }; 

    componentDidMount() {
        if (this.props.articleList.length > 0 ) {
            this.renderChart();
        }
         
    }

    
    placeKeyValuePairsIntoArrays(categoryData) {
        let catArr = []; 
        const keys = Object.keys(categoryData); 
        keys.forEach( key => {
            catArr.push({
                [key]: categoryData[key]
            })
        }); 

        // sort descending
        catArr = catArr.sort( function(a, b) {
            return Object.values(b)[0]["count"] - Object.values(a)[0]["count"]; 
        })

        return catArr; 
    }

    filterArticlesBasedOnCurrMonth(articleList) {
        return articleList.filter( article => {
           return ( parseInt(article.pub_date.month) === parseInt(this.state.currentMonth) )
        })
    }

    sortKeywordData(keywordData) {
        const keys = Object.keys(keywordData); 
        keys.forEach( key => {
            // console.log("KEY: ", key);
            // console.log("KEYWORD DATA[KEY]", keywordData[key]); 
            keywordData[key] = this.placeKeyValuePairsIntoArrays(keywordData[key]) 
        })
        
        // console.log("FULLY SORTED KEYWORD DATA: ", keywordData); 

        return keywordData; 
    }


    populateKeywordData(articleList) {
        const keywordData = {};
        articleList.forEach( (article) => {
            article.keywords.forEach( (keyword) => {
                if (keywordData[keyword.name] === undefined) {
                    keywordData[keyword.name] = {
                    };
                } 
                if (keywordData[keyword.name][keyword.value] === undefined) {
                    keywordData[keyword.name][keyword.value] = {
                        name: keyword.value,
                        count: 1
                    }
                } else {
                    keywordData[keyword.name][keyword.value]["count"] += 1; 
                }
            })
        })


        return keywordData; 
    }

    renderTopTenDataForChart(category) {
        const topTenResults = this.sortKeywordData(this.populateKeywordData(this.filterArticlesBasedOnCurrMonth(this.props.articleList)))[category].slice(0, 10); 
        const topTenResultNames = topTenResults.map(result => result[Object.keys(result)[0]].name)
        const topTenResultCounts = topTenResults.map( result => result[Object.keys(result)[0]].count); 
        return {
            labels: topTenResultNames,
            data: topTenResultCounts
        }
    }


    renderChart() {
        let ctx = document.getElementById("myChart").getContext('2d');


        /* TYPES: 
        creative_works, glocations, organizations, persons, subject 
        */

        const data = this.renderTopTenDataForChart("organizations"); 

        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Number of Article Appearances',
                    data: data.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(54, 162, 8, 0.2)',
                        'rgba(255, 206, 22, 0.2)',
                        'rgba(75, 20, 192, 0.2)',
                        'rgba(30, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)' 
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            autoSkip: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
            }
        })
    }

    
    render() {
        
        
            return(
            <canvas id="myChart" width="800" height="600"></canvas>
        ) 
    }
}

export default connect(mapStateToProps)(DataAnalytics); 