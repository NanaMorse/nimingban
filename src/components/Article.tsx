import * as React from "react";
import { View, Text, TouchableHighlight, RefreshControl, StyleSheet, ListView, Image, Dimensions, ActionSheetIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
const events = require('RCTDeviceEventEmitter');
import { DRAWER_CLOSED } from '../constants/eventTags';
import * as AppTools from '../appTools';
import { API_GET_IMAGE_THUMB_URL } from '../constants/api';
import PullUpListView from 'react-native-pull-up-listview';

import ListViewDataSource = __React.ListViewDataSource;
import ScrollViewStyle = __React.ScrollViewStyle;
import ViewStyle = __React.ViewStyle;
import { postData, nmbActions } from '../interface';
import ReactElement = __React.ReactElement;

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#f2f2f2',
  },

  postRow: {
    padding: 5,
  },

  postRowPress: {
    backgroundColor: '#fff',
    borderColor: '#e8e9ea',
    borderWidth: 1,
    padding: 10
  },

  postRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  } as ViewStyle,

  rowInfoText: {
    color: '#94999e',
    fontSize: 12
  },
  
  rowImage: {
    width: Dimensions.get('window').width * 0.5,
    height: 200
  }
});

const actionSheetButtons = ['回应', '订阅', '举报', '取消'];
const replyButtonIndex = 0;
const subscribeButtonIndex = 1;
const reportButtonIndex = 2;
const cancelButtonIndex = 3;

interface articleProps {
  articleList:any[];
  forumInfo:any;
  title:string;
  tryRequestArticleList: Function
}

interface articleState {
  hasShowPages?: number;
  dataSource?: ListViewDataSource;
  refreshing?: boolean;
  loading?: boolean;
  _listView_ref?: any
}

class Article extends React.Component<articleProps, articleState> {
  constructor() {
    super();

    this.state = {
      hasShowPages: 1,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: false,
      loading: false
    };
  }

  componentDidMount() {
    this.props.tryRequestArticleList(this.props.forumInfo.id);
  }

  componentWillReceiveProps(props) {
    if (this.shouldActionRefresh(props)) {
      Actions.refresh({title: props.forumInfo.name});
      
      events.addListener(DRAWER_CLOSED, () => {
        this.props.tryRequestArticleList(props.forumInfo.id)
          .then(() => this.state._listView_ref.scrollTo({ y: 0, animated: false }));
        events.removeAllListeners(DRAWER_CLOSED);
      });
    }
    
  }

  shouldComponentUpdate(props) {
    const beforeRefresh = props.forumInfo.name !== props.title;

    return !beforeRefresh;
  }

  shouldActionRefresh(props) {
    const titleChanged = props.forumInfo.id !== this.props.forumInfo.id;

    return titleChanged;
  }

  generateRefreshControl() {
    return <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.tryRequestArticleList(this.props.forumInfo.id)
      .then(() => this.setState({ refreshing: false }));
  }

  onPressPost(postData) {
    (Actions as nmbActions).post({
      postData,
      title: postData.id
    });
  }

  onLongPressPost() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: actionSheetButtons,
      cancelButtonIndex
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case replyButtonIndex : {
          (Actions as nmbActions).replyForm({
            title: '回应'
          });
        }
      }
    });
  }

  onPressImageThumb(imageLink: string, imageExt: string) {
    const thumbUrl = API_GET_IMAGE_THUMB_URL(imageLink, imageExt);

    Image.getSize(thumbUrl, function (width, height) {
      (Actions as nmbActions).imageViewer({
        imageLink, imageExt, width, height,
        title: 'Image'
      });
    }, function () {
      console.log('get Size failure:', thumbUrl)
    });
  }

  renderImageThumb(imageLink: string, imageExt: string) {
    if (imageLink) {
      const touchAbleAreaProps = {
        style: styles.rowImage,
        onPress: () => this.onPressImageThumb(imageLink, imageExt)
      };
      
      const ImageProps = {
        style: styles.rowImage,
        source: { uri: API_GET_IMAGE_THUMB_URL(imageLink, imageExt) }
      };

      return (
        <TouchableHighlight {...touchAbleAreaProps}>
          <Image {...ImageProps}/>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }

  renderPostData(postData: postData) {

    const touchAbleAreaProps = {
      onPress: () => this.onPressPost(postData),
      onLongPress: () => this.onLongPressPost()
    };

    const isAdmin = postData.admin === '1';
    const userIdStyle = [styles.rowInfoText, isAdmin ? {
      color: 'red'
    } : null];

    return (
      <View style={styles.postRow}>
        <TouchableHighlight {...touchAbleAreaProps}>
          <View style={styles.postRowPress}>
            <View style={styles.postRowInfo}>
              <Text style={styles.rowInfoText}>
                <Text style={userIdStyle}>{`${postData.userid}`}</Text>
                {` ${postData.now}`}
              </Text>
              <Text style={styles.rowInfoText}>{`reply：${postData.replyCount}`}</Text>
            </View>
            {AppTools.formatContent(postData.content)}
            <View style={ postData.img ? {marginBottom: 10} : null }></View>
            {this.renderImageThumb(postData.img, postData.ext)}
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  onLoadMore() {
    this.setState({loading: true});

    this.props
      .tryRequestArticleList(this.props.forumInfo.id, ++this.state.hasShowPages, true)
      .then(() => this.setState({ loading: false }));
  }

  render() {

    const listViewProps = {
      dataSource: this.state.dataSource.cloneWithRows(this.props.articleList),
      renderRow: this.renderPostData.bind(this),
      refreshControl: this.generateRefreshControl(),
      style: styles.listView,
      ref: (listView) => { this.state._listView_ref = listView; },
      loading: this.state.loading,
      onLoadMore: this.onLoadMore.bind(this)
    };

    return (
      <View style={{ flex: 1, marginTop: 64 }}>
        <PullUpListView {...listViewProps}></PullUpListView>
      </View>
    );
  }
}

export default Article;