import * as RNRF from 'react-native-router-flux';

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

type props = Object;

export interface nmbActions extends RNRF.RNRFActions {
  replyForm(props: props): any
  imageViewer(props: props): any
  post(props: props): any
  loadingCover(props: props): any
}