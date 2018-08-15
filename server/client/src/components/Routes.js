import React, { Fragment }from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';  
import LandingPage from './LandingPage'; 
import ArticleIndex from './ArticleIndex'; 
import ArticleDetail from './ArticleDetail'; 
import SavedArticles from './SavedArticles';
import ContentContainer from './ContentContainer';  
import Login from './Login';
import Register from './Register';
import App from '../App';
import Navbar  from './Navbar'; 

const Routes = () => {
    return(
        <Fragment>
        <Navbar />
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route path="/index" component={ContentContainer} />
            <Route path="/detail" component={ArticleDetail} />
            <Route path="/saved" component={SavedArticles} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={ErrorPage}/>
        </Switch>
        </Fragment>
    )
}

export default Routes; 