const HOST: string = 'https://h.nimingban.com';

const APP_ID_QUERY: string = 'appid=nimingban';

export const API_GET_FORUM_LIST = () => `${HOST}/Api/getForumList?${APP_ID_QUERY}`;

export const API_GET_ARTICLE_LIST = (id, page) => `${HOST}/Api/showf/?id=${id}&page=${page}&${APP_ID_QUERY}`;

export const API_GET_REPLY_LIST = (id, page) => `${HOST}/Api/thread/?id=${id}&page=${page}&${APP_ID_QUERY}`;

export const API_GET_IMAGE_THUMB_URL = (imageHash, imageExt) => `http://img1.nimingban.com/thumb/${imageHash}${imageExt}`;