import { combineReducers } from 'redux';

import sideMenuReducer from './sideMenuReducer';

export default combineReducers({
  sideMenu: sideMenuReducer
});