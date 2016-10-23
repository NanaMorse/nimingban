import * as RNRF from 'react-native-router-flux';

export interface forumData {
  id: string
  // the id of this forum's group
  fgroup: string
  sort: string

  // if showName existed, display showName, otherwise display name
  name: string
  // showName contains HTML string
  showName: string
  msg: string

  // current forum's reply interval, the value is in the unit of second
  // todo need to be init
  interval: string

  createdAt: string
  updateAt: string
  status: string
}

export interface forumListData {
  id: string
  sort: string
  name: string
  forums: forumData[]
}

export interface replyData {
  id: string
  // combine img string and ext info, you can get the image url
  img: string
  ext: string

  // reply time
  now: string

  userid: string
  name: string
  email: string
  title: string

  // reply content, with HTML string
  content: string

  admin: '0' | '1'
}

export interface postData extends replyData {
  replyCount: string
  replys: replyData[]
} 

type props = Object;

export interface nmbActions extends RNRF.RNRFActions {
  replyForm(props: props): any
  imageViewer(props: props): any
  post(props: props): any
  loadingCover(props: props): any
}