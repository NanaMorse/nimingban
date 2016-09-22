import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import { API_GET_REPLY_LIST } from '../constants/api'

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
  }
});

interface postProps {
  postData: postData;
}

interface postState {
  replyDataSource?: any;
  onRequest?: boolean;
  onNetError?: boolean;
  replys?: replyData[]
}

class Post extends React.Component<postProps, postState> {
  constructor(props) {
    super();
    
    this.state = {
      replyDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      onRequest: false,
      onNetError: false,
      replys: []
    };
    
  }
  
  componentDidMount() {
    this.tryRequestReplys();
  }
  
  tryRequestReplys(page = 1) {
    // will render
    this.setState({ onRequest: true });
    
    fetch(API_GET_REPLY_LIST(this.props.postData.id, page))
      .then(response => response.json())
      .then((postData: postData) => {
        this.setState({ replys: postData.replys })
      })
      .catch(error => console.log(error));
  }
  

  renderReplyData(replayData) {
    return (
      <View style={styles.contentRow}>
        <View style={styles.contentRowInfo}>
          <Text style={styles.rowInfoText}>{`${replayData.userid} ${replayData.now}`}</Text>
          <Text style={styles.rowInfoText}>{`No：${replayData.userid}`}</Text>
        </View>
        <Text>{replayData.content}</Text>
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
      userid: postData.userid
    };
    
    const replyViewProps = {
      dataSource: this.state.replyDataSource.cloneWithRows([mainContent, ...this.state.replys]),
      renderRow: this.renderReplyData.bind(this)
    };

    return (
      <View style={{ flex: 1, marginTop: 64 }}>
        <ListView style={styles.listView} { ...replyViewProps }></ListView>
      </View>
    )
  }
}

export default Post;