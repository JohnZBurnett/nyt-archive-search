import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { fetchArticlesFromApi } from './actions/index'; 
import { connect } from 'react-redux'; 
import Routes from './components/Routes';

const mapStateToProps = function (state) {
  return {};
}
const mapDispatchToProps = function(dispatch) {
  return (
    {
      fetchArticlesFromApi: () => dispatch(fetchArticlesFromApi)
    }
  )
}
class App extends Component {
  
  componentDidMount() {
    this.props.fetchArticlesFromApi(); 
  }

  render() {
    return(<div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>)
  }
    
} 


export default connect(mapStateToProps, mapDispatchToProps)(App); 

