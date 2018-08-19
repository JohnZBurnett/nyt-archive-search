import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux'; 
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'; 
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension'; 
import logger from 'redux-logger'; 

const initialState = {
    currentArticle: {},
    userSavedArticles: {},
    articleList: [],
    articleCollections: [],
    articleComments: [],
    auth: null,
    titleFilter: "",
    articleStartMonthFilter: "1",
    articleEndMonthFilter: "12"
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger))); 

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, 
                document.getElementById('root')
               );
registerServiceWorker();
