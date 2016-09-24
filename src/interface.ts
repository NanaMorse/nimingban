export interface replyData {
  admin: '0' | '1',
  img: string;
  ext: string;
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