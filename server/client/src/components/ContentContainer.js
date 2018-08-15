import React from 'react';
import ArticleIndex from './ArticleIndex';
import SearchOptions from './SearchOptions'; 

const ContentContainer = (props) => {
    return(
        <div>
            <SearchOptions />
            <ArticleIndex />
        </div>
    );
}

export default ContentContainer; 