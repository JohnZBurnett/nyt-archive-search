import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'; 

const store = createStore(reducers, {})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
