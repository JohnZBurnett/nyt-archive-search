import React from 'react';
import { getArticleCollectionsFromApi } from '../actions/index'; 

const SavedArticles = (props) => {
    getArticleCollectionsFromApi(); 
    return(
        <div>I am a SavedArticles placeholder.</div>
    )
}

export default SavedArticles; 