import * as Types from '../constants/actionTypes';

export default (state:any = {}, action: any) => {
  switch (action.type) {

    case Types.CHECK_OUT_FORUM : {
      return Object.assign({}, state, {
        forumInfo: {
          id: action.forumId,
          name: action.forumName
        }
      });
    }

    case Types.REQUEST_ARTICLE_LIST : {
      return Object.assign({}, state, {
        isFetching: true
      });
    }

    case Types.RECEIVE_ARTICLE_LIST : {
      return Object.assign({}, state, {
        articleList: action.articleList,
        receiveAt: action.receiveAt
      });
    }

    default : {
      return state;
    }
  }
}

