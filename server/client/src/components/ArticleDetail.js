import React from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios'; 


const mapStateToProps = (state) => {
    return(
        {
            article: state.currentArticle
        }
    )
}

const ArticleDetail = ({ article }) => {
    console.log("ARTICLE DETAIL ARTICLE: ", article); 

    const fetchPdfUrl = async() => {
        const results = await axios.post('http://localhost:5000/api/current_article', {
            web_url: article.web_url
        }); 
        console.log("NYT SCRAPE RESULTS: ", results); 
    }

    fetchPdfUrl(); 
    return(
        <div>
            <h1>{article.headline.main}</h1>
            <p>SNIPPET: {article.snippet}</p>

            <a href={article.web_url}>Click here to read the article on the NYT Website</a>
            <embed src="https://timesmachine.nytimes.com/timesmachine/1943/01/01/83892511.pdf" height="600" width="200"></embed>
        </div>
    );
}

export default connect(mapStateToProps)(ArticleDetail);