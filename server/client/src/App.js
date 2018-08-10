import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router';
import ErrorPage from './components/ErrorPage';  

const App = () => {
  return(
    <div>
      My App
      <BrowserRouter>
        <Switch>
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
};

export default App; 

