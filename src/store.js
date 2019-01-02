import { applyMiddleware, createStore } from 'redux';
import { allReducers } from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';

const Store = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default Store;