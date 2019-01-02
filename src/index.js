import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// STYLE
import './assets/style/bootstrap-grid.min.css';
import './assets/style/main.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { Provider } from 'react-redux';
import { Routes, Store } from './refs';

// const Store = createStore( allReducers, extension );
const rootNode = <Provider store={Store}><Routes /></Provider>

ReactDOM.render(rootNode, document.getElementById('root'));
serviceWorker.unregister();
