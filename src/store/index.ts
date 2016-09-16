import { createStore } from 'redux';
import fakeData from '../fakeData';
import reducer from '../reducers/index';

const initialState = fakeData;

const store = createStore(reducer, initialState);

export default store;