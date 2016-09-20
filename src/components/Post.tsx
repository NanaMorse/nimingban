import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import ViewStyle = __React.ViewStyle;

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

class Post extends React.Component<any, any> {
  constructor(props) {
    super();

    const postData = props.postData;
    const mainContent = {
      admin: postData.admin,
      content: postData.content,
      email: postData.email,
      id: postData.id,
      name: postData.name,
      now: postData.now,
      userid: postData.userid
    };

    const replyDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      replyDataSource: replyDataSource.cloneWithRows([mainContent, ...props.postData.replys]),
    };
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
    const replyViewProps = {
      dataSource: this.state.replyDataSource,
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