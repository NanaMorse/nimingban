export interface replyData {
  admin: '0' | '1',
  content: string,
  email: string,
  id: string,
  name: string,
  now: string,
  userid: string
}

export interface postData extends replyData {
  title: string;
  replyCount: string;
  replys: replyData[]
}