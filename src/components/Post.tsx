import * as React from "react";
import { View, Text, TouchableHighlight, RefreshControl, StyleSheet, ListView, Image, Dimensions } from 'react-native';
import { API_GET_REPLY_LIST } from '../constants/api'
import * as AppTools from '../appTools';
import { API_GET_IMAGE_THUMB_URL } from '../constants/api'
import { Actions } from 'react-native-router-flux';
import PullUpListView from 'react-native-pull-up-listview';

import ViewStyle = __React.ViewStyle;
import { postData, replyData } from '../interface';

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#ffffff'
  },

  contentRow: {
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    borderBottomColor: '#e8e9ea',
    borderBottomWidth: 1,
  },

  contentRowInfo: {
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

interface postProps {
  postData: postData;
}

interface postState {
  replyDataSource?: any;
  refreshing?: boolean;
  loading?: boolean;
  replys?: replyData[];
  currentPage?: number;
}

class Post extends React.Component<postProps, postState> {
  constructor() {
    super();
    
    this.state = {
      replyDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: false,
      loading: false,
      replys: [],
      currentPage: 1
    };
    
  }
  
  componentDidMount() {
    this.tryRequestReplys();
  }
  
  tryRequestReplys(page = 1, loadMore?) {
    return fetch(API_GET_REPLY_LIST(this.props.postData.id, page))
      .then(response => response.json())
      .then((postData: postData) => {

        if (postData.replys.length && loadMore) {
          this.state.currentPage ++;
        }

        this.setState({ replys: loadMore ? [...this.state.replys, ...postData.replys] : postData.replys })
      })
      .catch(error => console.log(error));
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.tryRequestReplys().then(() => {
      this.setState({ refreshing: false });
    });
  }

  generateRefreshControl() {
    return <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>
  }

  onLoadMore() {
    this.setState({ loading: true });
    this.tryRequestReplys(this.state.currentPage + 1, true).then(() => {
      this.setState({ loading: false });
    });
  }

  onPressImageThumb(imageLink: string, imageExt: string) {
    const thumbUrl = API_GET_IMAGE_THUMB_URL(imageLink, imageExt);

    Image.getSize(thumbUrl, function (width, height) {
      (Actions as any).imageViewer({
        imageLink, imageExt, width, height,
        title: 'show Image'
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
        source: { uri: API_GET_IMAGE_THUMB_URL(imageLink, imageExt) },
        //onLoad: this.onImageLoad.bind(this)
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


  renderReplyData(replayData: replyData) {
    return (
      <View style={styles.contentRow}>
        <View style={styles.contentRowInfo}>
          <Text style={styles.rowInfoText}>{`${replayData.userid} ${replayData.now}`}</Text>
          <Text style={styles.rowInfoText}>{`No：${replayData.id}`}</Text>
        </View>
        {AppTools.formatContent(replayData.content)}
        <View style={ replayData.img ? {marginBottom: 10} : null }></View>
        {this.renderImageThumb(replayData.img, replayData.ext)}
      </View>
    )
  }
  
  render() {
    
    const postData = this.props.postData;
    const mainContent = {
      admin: postData.admin,
      content: postData.content,
      email: postData.email,
      id: postData.id,
      name: postData.name,
      now: postData.now,
      userid: postData.userid,
      img: postData.img,
      ext: postData.ext
    };
    
    const replyViewProps = {
      dataSource: this.state.replyDataSource.cloneWithRows([mainContent, ...this.state.replys]),
      renderRow: this.renderReplyData.bind(this),
      refreshControl: this.generateRefreshControl(),
      style: styles.listView,

      loading: this.state.loading,
      onLoadMore: this.onLoadMore.bind(this)
    };

    return (
      <View style={{ flex: 1, marginTop: 64 }}>
        <PullUpListView { ...replyViewProps }></PullUpListView>
      </View>
    )
  }
}

export default Post;