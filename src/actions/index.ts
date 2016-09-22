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
  return function (dispatch) {
    dispatch(requestForumList());
    return fetch(Api.API_GET_FORUM_LIST())
      .then(response => response.json())
      .then(forumList => {
        dispatch(receiveForumList(forumList));
      });
  }
}

export function checkoutForum(forumInfo) {
  return {
    type: Types.CHECK_OUT_FORUM,
    forumId: forumInfo.id,
    forumName: forumInfo.name
  }
}

function requestArticleList() {
  return {
    type: Types.REQUEST_ARTICLE_LIST
  }
}

function receiveArticleList(articleList) {
  return {
    type: Types.RECEIVE_ARTICLE_LIST,
    articleList,
    receiveAt: Date.now()
  }
}

export function tryRequestArticleList(id, page = 1) {
  return function (dispatch) {
    dispatch(requestArticleList());

    return fetch(Api.API_GET_ARTICLE_LIST(id, page))
      .then(response => response.json())
      .then(articleList => {
        dispatch(receiveArticleList(articleList));
      });
  }
}