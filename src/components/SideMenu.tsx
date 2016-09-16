import * as React from "react";
import { View, Animated, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import * as DefaultStyles from '../constants/defaultStyles';


import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const defaultMenuWidth = windowWidth - 80;

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle,

  appView: {
    flex: 1,
    width: windowWidth
  } as ViewStyle,

  sideMenu: {
    backgroundColor: '#333333',
    flex: 1,
    position: 'absolute',
    height: windowHeight
  } as ViewStyle,
  
  sideMenuHeader: {
    backgroundColor: '#404040',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  } as ViewStyle,

  sideMenuHeaderText: {
    color: '#ccc'
  } as TextStyle,

  ListHeader: {
    height: 40,
    padding: 10,
    paddingLeft: 15,
    borderTopColor: 'rgba(0,0,0,0.3)',
    borderTopWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  } as ViewStyle,

  ListHeaderText: {
    color: '#fff',
    flexWrap: 'nowrap'
  } as TextStyle,

  ListWrapper: {

  }
});

const SideMenuHeader = () => {
  return (
    <View style={[DefaultStyles.HEADER, styles.sideMenuHeader]}>
      <Text style={styles.sideMenuHeaderText}>板块列表</Text>
    </View>
  );
};

interface ForumListInfo {
  name: string
}

interface ListHeaderProps {
  listInfo: ForumListInfo
}

interface ListHeaderState {

}

class ListHeader extends React.Component<ListHeaderProps, ListHeaderState> {
  constructor() {
    super();

  }

  render() {

    return (
      <View style={styles.ListHeader}>
        <Text style={styles.ListHeaderText}>{this.props.listInfo.name}</Text>
      </View>
    );
  }
}

const ListWrapper = ({subForum}) => {

};


interface SideMenuProps {
  show: boolean;
  forumList: ForumListInfo[]
}

interface SideMenuState {
  slideAnimate: any;
}


class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  constructor() {
    super();

    this.state = {} as SideMenuState;
  }
  
  componentWillMount() {
    console.log(this.props);

    this.state.slideAnimate = new Animated.Value(this.props.show ? defaultMenuWidth : 0);
  }

  componentWillReceiveProps(props: SideMenuProps) {
    const toValue = props.show ? defaultMenuWidth : 0;
    
    Animated.timing(this.state.slideAnimate, {
      toValue,
      duration: 250
    } as any).start()
  }

  render() {

    const forumList = this.props.forumList;

    
    const sideMenuStyle = [styles.sideMenu, {width: this.state.slideAnimate}];
    const appViewStyle = [styles.appView, {marginLeft: this.state.slideAnimate}];
    
    return (
      <View style={styles.container}>
        <Animated.View style={sideMenuStyle}>
          <SideMenuHeader />
          <ScrollView>
            {generateForumListHeaders(forumList)}
          </ScrollView>
        </Animated.View>
        <Animated.View style={appViewStyle}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

function generateForumListHeaders(forumListData: ForumListInfo[]) {
  return forumListData.map((listInfo, index) => {
    return <ListHeader key={index} listInfo={listInfo} />
  });
}

export default SideMenu;