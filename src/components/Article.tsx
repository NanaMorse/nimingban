import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux'

import ListViewDataSource = __React.ListViewDataSource;
import ScrollViewStyle = __React.ScrollViewStyle;
import ViewStyle = __React.ViewStyle;

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
  }
});

interface articleProps {
  articleList:any[];
  forumInfo:any;
  title:string;
  tryRequestArticleList: Function
}

interface articleState {
  dataSource:ListViewDataSource
}

class Article extends React.Component<articleProps, articleState> {
  constructor() {
    super();

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    this.props.tryRequestArticleList(this.props.forumInfo.id, 1);
  }

  componentWillReceiveProps(props) {
    if (this.shouldActionRefresh(props)) {
      Actions.refresh({title: props.forumInfo.name});
      this.props.tryRequestArticleList(props.forumInfo.id, 1);
    }
  }

  shouldActionRefresh(props) {
    const titleChanged = props.forumInfo.name !== this.props.forumInfo.name;

    return titleChanged;
  }

  shouldComponentUpdate(props) {
    const beforeRefresh = props.forumInfo.name !== props.title;

    return !beforeRefresh;
  }

  onViewPost(postData) {
    (Actions as any).post({
      postData,
      title: postData.id
    });
  }

  renderPostData(postData) {
    return (
      <View style={styles.postRow}>
        <TouchableHighlight onPress={() => this.onViewPost(postData)}>
          <View style={styles.postRowPress}>
            <View style={styles.postRowInfo}>
              <Text style={styles.rowInfoText}>{`${postData.userid} ${postData.now}`}</Text>
              <Text style={styles.rowInfoText}>{`reply：${postData.replyCount}`}</Text>
            </View>
            <Text>{postData.content}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    
    console.log('article render!', this.props);

    const listViewProps = {
      dataSource: this.state.dataSource.cloneWithRows(this.props.articleList),
      renderRow: this.renderPostData.bind(this)
    };

    return (
      <View style={{ flex: 1, marginTop: 64 }}>
        <ListView style={styles.listView} {...listViewProps}></ListView>
      </View>
    );
  }
}

export default Article;