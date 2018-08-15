import React from 'react';

const ArticleCard = (props) => {
    console.log("ARTICLE CARD PROPS: ", props); 
    return(<div className="card" onClick={() => props.onClick(props.article, props.history)}>
        <h5 className="headline-font">{props.article.headline.main}</h5>
        <p className="typewriter-font">{props.article.snippet}</p>
    </div>);
}

export default ArticleCard; 