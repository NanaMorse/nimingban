const HOST: string = 'https://h.nimingban.com';

const APP_ID_QUERY: string = 'appid=nimingban';

export const API_GET_FORUM_LIST = () => `${HOST}/Api/getForumList?${APP_ID_QUERY}`;

export const API_GET_ARTICLE_LIST = (id, page) => `${HOST}/Api/showf?id=${id}&page=${page}&${APP_ID_QUERY}`;

export const API_GET_REPLY_LIST = (id, page) => `${HOST}/Api/thread?id=${id}&page=${page}&${APP_ID_QUERY}`;

export const API_GET_IMAGE_THUMB_URL = (imageLink, imageExt) => `http://img1.nimingban.com/thumb/${imageLink}${imageExt}`;

export const API_GET_IMAGE_FULL_URL = (imageLink, imageExt) => `http://img1.nimingban.com/image/${imageLink}${imageExt}`;

export const API_POST_REPLY = () => `${HOST}/Home/Forum/doReplyThread.html?${APP_ID_QUERY}`;

export const API_QUERY_FEED = (uuid, page) => `${HOST}/Api/feed?uuid=${uuid}&page=${page}`;

export const API_ADD_FEED = (uuid, tid) => `${HOST}/Api/addFeed?uuid=${uuid}&tid=${tid}&${APP_ID_QUERY}`;