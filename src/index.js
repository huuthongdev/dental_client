import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// STYLE
import './assets/style/bootstrap-grid.min.css';
import './assets/style/main.scss';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from "redux-thunk";
import { Routes, allReducers, isDev } from './refs';

const middleware = applyMiddleware(ReduxThunk);
const extension = isDev ? compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__()) : middleware;
const Store = createStore( allReducers, extension );
const rootNode = <Provider store={Store}><Routes /></Provider>

ReactDOM.render(rootNode, document.getElementById('root'));
serviceWorker.unregister();
