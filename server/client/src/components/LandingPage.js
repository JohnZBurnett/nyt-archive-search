import React from 'react';

const LandingPage = (props) => {
    return(
        <div>
            <p className="greeting-text" id="greeting">Welcome to 1943: A Year in the Times! To view articles, go to the Article Index. Log in to view your saved articles, or create a new account. For statistical analysis of articles, go to the Analytics page.</p>
            <img className = "nyt-attribution" src="http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_200c.png"></img>
        </div>
    )
}

export default LandingPage; 