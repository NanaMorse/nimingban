import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import fakeData from '../fakeData';
import reducer from '../reducers/index';

const initialState = fakeData;

const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

export default store;