import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js'; 
import { updateArticleStartMonthFilter, updateArticleEndMonthFilter } from '../actions/index';


function mapStateToProps(state) {
    return(
        {
            articleList: state.articleList,
            articleStartMonthFilter: state.articleStartMonthFilter,
            articleEndMonthFilter: state.articleEndMonthFilter
        }
    )
}

function mapDispatchToProps(dispatch) {
    return(
        {
            updateArticleStartMonthFilter: (newStartMonth) => dispatch(updateArticleStartMonthFilter(newStartMonth)),
            updateArticleEndMonthFilter: (newEndMonth) => dispatch(updateArticleEndMonthFilter(newEndMonth))
        }
    )
}

class DataAnalytics extends Component {

    constructor(props) {
        super(props); 

        let newChart = null;

        this.state = {
            currentCategory: "persons"
        }
    };  

    componentDidMount() {
        if (this.props.articleList.length > 0 ) {
            this.renderChart();
        }
         
    }

    componentDidUpdate() {
        if (this.props.articleList.length > 0 ) {
            document.getElementById('canvas-div').innerHTML = ''; 
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
           return ( parseInt(article.pub_date.month) >= parseInt(this.props.articleStartMonthFilter) && parseInt(article.pub_date.month) <= parseInt(this.props.articleEndMonthFilter) )
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
        const chartDiv = document.getElementById('canvas-div'); 
        chartDiv.innerHTML = '<canvas id="myChart" width="800" height="600"></canvas>'; 
        let ctx = document.getElementById("myChart").getContext('2d');
        /* TYPES: 
        creative_works, glocations, organizations, persons, subject 
        */

        const data = this.renderTopTenDataForChart(this.state.currentCategory); 

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

    handleCategoryChange = (event) => {
        this.setState({
            currentCategory: event.target.value
        })
    }

    generateMonthSelectOptions() {
        const countArr = [...Array(12).keys()];
        return countArr.map( num => {
            return <option value={num + 1}>{num + 1}</option>
        })
    }

     handleUpdatingStartMonthFilter = (event) => {
        // we need to update the end month if the current one precedes the new start month 
        if (parseInt(this.props.articleEndMonthFilter) < event.target.value) {
            this.props.updateArticleEndMonthFilter(event.target.value.toString()); 
        }

        this.props.updateArticleStartMonthFilter(event.target.value.toString()); 
    }

    handleUpdatingEndMonthFilter = (event) => {

        // we also need to update the start month if it's now after the new end month
        if (parseInt(this.props.articleStartMonthFilter) > event.target.value ) {
            this.props.updateArticleStartMonthFilter(event.target.value.toString()); 
        }

        this.props.updateArticleEndMonthFilter(event.target.value.toString()); 
    }

    
    render() {
        
        
            return(
            <div>
                <div class="analytics-search">
                    <label>Start Month: </label>
                    <select value={this.props.articleStartMonthFilter} onChange={this.handleUpdatingStartMonthFilter}>
                        {this.generateMonthSelectOptions()}
                    </select>
                    <label>End Month: </label>
                    <select value={this.props.articleEndMonthFilter} onChange={this.handleUpdatingEndMonthFilter}>
                        {this.generateMonthSelectOptions()}
                    </select>
                    <select onChange={this.handleCategoryChange} value={this.state.currentCategory}>
                        <option value="persons">Persons</option>
                        <option value="organizations">Organizations</option>
                        <option value="subject">Subject</option>
                        <option value="glocations">Location</option>
                    </select>
                </div>
                <div id="canvas-div">
                    
                </div> 
            </div>
        ) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataAnalytics); 