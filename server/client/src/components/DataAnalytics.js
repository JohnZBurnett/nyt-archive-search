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
    }; 

    componentDidMount() {
        this.renderChart(); 
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
            return Object.values(b)[0] - Object.values(a)[0]; 
        })

        return catArr; 
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
                    keywordData[keyword.name][keyword.value] = 1 
                } else {
                    keywordData[keyword.name][keyword.value] += 1; 
                }
            })
        })


        return keywordData; 
    }

    renderChart() {
        let ctx = document.getElementById("myChart").getContext('2d');

        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)' 
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    }

    
    render() {
        
        console.log("FUNCTION RUN RESULTS: ", this.sortKeywordData(this.populateKeywordData(this.props.articleList))["persons"]);
            return(
            <canvas id="myChart" width="400" height="400"></canvas>
        ) 
    }
}

export default connect(mapStateToProps)(DataAnalytics); 