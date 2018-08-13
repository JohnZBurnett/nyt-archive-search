import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios'; 


const mapStateToProps = (state) => {
    return(
        {
            article: state.currentArticle
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return(
        {
            updateArticlePdf: (pdfUrl) => dispatch(pdfUrl) 
        }
    )
}

class ArticleDetail extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            pdfUrl: ""
        }
    }

    componentDidMount() {
        this.fetchPdfUrl(); 
    }



    fetchPdfUrl = async() => {
        const results = await axios.post('http://localhost:5000/api/current_article', {
            web_url: this.props.article.web_url
        }); 
        this.setState({
            pdfUrl: results.data.pdfUrl 
        })
        console.log("NYT SCRAPE RESULTS: ", results); 
    }

    render() {
        return(
            <div>
                <h1>{this.props.article.headline.main}</h1>
                <p>SNIPPET: {this.props.article.snippet}</p>
    
                <a href={this.props.article.web_url}>Click here to read the article on the NYT Website</a>
                <embed src={this.state.pdfUrl} height="600" width="200"></embed>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);