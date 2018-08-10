import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Routes from './components/Routes';

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
};

export default App; 

