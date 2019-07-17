import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { currencies, markets } from "./store/reducers";

const history = createBrowserHistory();
const rootReduser = combineReducers({
  currencies,
  markets
})

const store = createStore(rootReduser,
    applyMiddleware(thunk)
);

const app = (
  <Provider store={store} history={history}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
