import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// STYLE
import './assets/style/bootstrap-grid.min.css';
import './assets/style/main.scss';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from "redux-thunk";
import { Routes, AllReducers, isDev } from './refs';

const middleware = applyMiddleware(ReduxThunk);
const extension = isDev ? compose(middleware, window.devToolsExtension()) : middleware;
const Store = createStore( AllReducers, extension );
const rootNode = <Provider store={Store}><Routes /></Provider>

ReactDOM.render(rootNode, document.getElementById('root'));
serviceWorker.unregister();
