import * as Types from '../constants/actionTypes';

export default (state:any = {}, action: any) => {
  switch (action.type) {
    
    case Types.REQUEST_FORUM_LIST : {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
      
    case Types.RECEIVE_FORUM_LIST : {
      return Object.assign({}, state, {
        forumList: action.forumList,
        receiveAt: action.receiveAt
      });
    }
    
    default : {
      return state;
    }
  }
}
