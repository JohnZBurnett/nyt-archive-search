import React from 'react';
import { connect } from 'react-redux'; 


const mapStateToProps = (state) => {
    return(
        {
            article: state.currentArticle
        }
    )
}

const ArticleDetail = ({ article }) => {
    console.log("ARTICLE DETAIL ARTICLE: ", article); 
    return(
        <div>I am an ArticleDetail placeholder.</div>
    );
}

export default connect(mapStateToProps)(ArticleDetail);