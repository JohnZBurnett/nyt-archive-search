import React from 'react';

const ArticleCard = (props) => {
    console.log("ARTICLE CARD PROPS: ", props); 
    return(<div>
        <h5>{props.article.headline.main}</h5>
        <p>{props.article.snippet}</p>
    </div>);
}

export default ArticleCard; 