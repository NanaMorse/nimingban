import * as React from "react";
import { View, Text, TouchableHighlight, RefreshControl, StyleSheet, ListView, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
const events = require('RCTDeviceEventEmitter');
import { DRAWER_CLOSED } from '../constants/eventTags';
import * as AppTools from '../appTools';
import { API_GET_IMAGE_THUMB_URL } from '../constants/api'

import ListViewDataSource = __React.ListViewDataSource;
import ScrollViewStyle = __React.ScrollViewStyle;
import ViewStyle = __React.ViewStyle;
import { postData } from '../interface';

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
    marginTop: 10,
    width: Dimensions.get('window').width * 0.5,
    height: 200
  }
});

interface articleProps {
  articleList:any[];
  forumInfo:any;
  title:string;
  tryRequestArticleList: Function
}

interface articleState {
  dataSource?: ListViewDataSource;
  refreshing?: boolean;
  _listView_ref?: any
}

class Article extends React.Component<articleProps, articleState> {
  constructor() {
    super();

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      refreshing: false
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
          .then(() => this.state._listView_ref.scrollTo({ y: 0 }));
        events.removeAllListeners(DRAWER_CLOSED);
      });
    }
    
  }

  shouldComponentUpdate(props) {
    const beforeRefresh = props.forumInfo.name !== props.title;

    return !beforeRefresh;
  }

  shouldActionRefresh(props) {
    const titleChanged = props.forumInfo.name !== this.props.forumInfo.name;

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
    (Actions as any).post({
      postData,
      title: postData.id
    });
  }

  renderPostData(postData: postData) {
    return (
      <View style={styles.postRow}>
        <TouchableHighlight onPress={() => this.onPressPost(postData)}>
          <View style={styles.postRowPress}>
            <View style={styles.postRowInfo}>
              <Text style={styles.rowInfoText}>{`${postData.userid} ${postData.now}`}</Text>
              <Text style={styles.rowInfoText}>{`reply：${postData.replyCount}`}</Text>
            </View>
            {AppTools.formatContent(postData.content)}
            { postData.img ? 
              <Image style={styles.rowImage} source={{uri: API_GET_IMAGE_THUMB_URL(postData.img, postData.ext)}}/> 
              : null 
            }
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  onListEndReached() {
    console.log('reach end!');
  }

  render() {
    
    console.log('render article');

    const listViewProps = {
      dataSource: this.state.dataSource.cloneWithRows(this.props.articleList),
      renderRow: this.renderPostData.bind(this),
      refreshControl: this.generateRefreshControl(),
      style: styles.listView,
      ref: (listView) => { this.state._listView_ref = listView; },
      onEndReached: this.onListEndReached.bind(this)
    };

    return (
      <View style={{ flex: 1, marginTop: 64 }}>
        <ListView {...listViewProps}>
          <RefreshControl refreshing={false}/>
        </ListView>
      </View>
    );
  }
}

export default Article;