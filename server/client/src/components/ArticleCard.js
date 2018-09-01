import React from 'react';

const ArticleCard = (props) => {
    return(<div className="card" onClick={() => props.onClick(props.article, props.history)}>
         <h5 className="headline-font">{props.article.headline.main.split(";").length > 1 ? props.article.headline.main.split(';')[0] : props.article.headline.main}</h5>
        <p className="typewriter-font">{props.article.snippet}</p>
    </div>);
}

export default ArticleCard; 