import * as Types from '../constants/actionTypes';
import * as Api from '../constants/api';
import * as functionForumsId from '../constants/functionForumsId'

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

function receiveArticleList(articleList, isLoadMore) {
  return {
    type: Types.RECEIVE_ARTICLE_LIST,
    articleList,
    receiveAt: Date.now(),
    isLoadMore
  }
}

const testUUID = 'morse';

export function tryRequestArticleList(id, page = 1, isLoadMore) {

  return function (dispatch) {
    dispatch(requestArticleList());

    let fetchUrl = Api.API_GET_ARTICLE_LIST(id, page);

    if (id === functionForumsId.SUBSCRIBE_ID) fetchUrl = Api.API_QUERY_FEED(testUUID, page);

    return fetch(fetchUrl)
      .then(response => response.json())
      .then(articleList => {
        dispatch(receiveArticleList(articleList, isLoadMore));
      });
  }
}