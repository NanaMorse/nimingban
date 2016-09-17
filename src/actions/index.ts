import * as Types from '../constants/actionTypes';
import * as Api from '../constants/api';

function requestForumList() {
  return {
    type: Types.REQUEST_FORUM_LIST
  }
}

function receiveForumList(forumList) {
  return {
    type: Types.RECEIVE_FORUM_LIST,
    forumList,
    receiveAt: Date.now()
  }
}

export function tryRequestForumList() {

  // todo check lastFetchDate
  return function (dispatch, getState) {
    dispatch(requestForumList());

    fetch(Api.API_GET_FORUM_LIST)
      .then(response => response.json())
      .then(forumList => {
        receiveForumList(forumList);
        console.log(forumList);
      });
  }
}