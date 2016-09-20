import { combineReducers } from 'redux';

import sideMenuReducer from './sideMenuReducer';
import articleReducer from './articleReducer';

export default combineReducers({
  sideMenu: sideMenuReducer,
  article: articleReducer
});