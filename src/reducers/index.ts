import { combineReducers } from 'redux';

import routerReducer from './routersReducer';
import sideMenuReducer from './sideMenuReducer';
import articleReducer from './articleReducer';

export default combineReducers({
  sideMenu: sideMenuReducer,
  article: articleReducer,
  routers: routerReducer
});