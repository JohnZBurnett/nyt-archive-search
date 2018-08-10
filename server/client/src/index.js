import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux'; 
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'; 
import thunk from 'redux-thunk'; 

const initialState = {
    currentArticle: {},
    userSavedArticles: {},
    articleList: [],
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk)); 

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, 
                document.getElementById('root')
               );
registerServiceWorker();
