import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';  
import LandingPage from './LandingPage'; 
import ArticleIndex from './ArticleIndex'; 
import ArticleDetail from './ArticleDetail'; 
import SavedArticles from './SavedArticles'; 
import App from '../App'

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route path="/index" component={ArticleIndex} />
            <Route path="/detail" component={ArticleDetail} />
            <Route path="/saved" component={SavedArticles} />
            <Route component={ErrorPage}/>
        </Switch>
    )
}

export default Routes; 