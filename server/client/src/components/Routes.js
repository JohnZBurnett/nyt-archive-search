import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './ErrorPage';  
import LandingPage from './LandingPage'; 
import App from '../App'

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
}

export default Routes; 