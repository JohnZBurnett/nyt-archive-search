import React from 'react';
import { getArticleCollectionsFromApi } from '../actions/index'; 
import { connect } from 'react-redux'; 

function mapStateToProps(state)  {
    return(
        {
            articleCollections: state.articleCollections
        }
    )
}
const SavedArticles = (props) => {
    getArticleCollectionsFromApi(); 
    return(
        <div>I am a SavedArticles placeholder.</div>
    )
}

export default connect(mapStateToProps)(SavedArticles); 