import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { fetchArticlesFromApi, fetchUser } from './actions/index'; 
import { getArticleCollectionsFromApi } from './actions/index';
import { connect } from 'react-redux'; 
import Routes from './components/Routes';

const mapStateToProps = function (state) {
  return {};
}
const mapDispatchToProps = function(dispatch) {
  return (
    {
      fetchArticlesFromApi: () => dispatch(fetchArticlesFromApi),
      fetchUser: () => dispatch(fetchUser),
      getArticleCollectionsFromApi: () => dispatch(getArticleCollectionsFromApi)
    }
  )
}
class App extends Component {
  
  componentDidMount() {
    this.props.fetchArticlesFromApi(); 
    this.props.fetchUser();
    this.props.getArticleCollectionsFromApi(); 
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

