import * as React from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

const events = require('RCTDeviceEventEmitter');
import * as EventTags from '../constants/eventTags';

import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

// constants start
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const defaultMenuWidth = 100;

const animateDuration = 500;

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle,

  sideMenu: {
    backgroundColor: '#333333',
    flex: 1,
    position: 'absolute',
    height: windowHeight
  } as ViewStyle,
  
  sideMenuHeader: {
    height: 64,
    padding: 10,
    paddingTop: 20,
    paddingLeft: 15,
    backgroundColor: '#404040',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  } as ViewStyle,

  sideMenuHeaderText: {
    marginTop: 15,
    color: '#ccc'
  } as TextStyle,

  listWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  } as ViewStyle,

  listHeader: {
    flexDirection: 'row',
    width: windowWidth,
    height: 40,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#404040',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1
  } as ViewStyle,

  listHeaderText: {
    color: '#fff'
  } as TextStyle,

  subListAnimateWrapper: {
    flex: 1,
    width: windowWidth,
    height: 20,
    overflow: 'hidden'
  } as ViewStyle,

  subListWrapperShow: {
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1
  } as ViewStyle,

  subListItem: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  } as ViewStyle,

  subListItemText: {
    color: '#ccc',
    marginLeft: 15
  } as TextStyle
});

const SideMenuHeader = () => {
  return (
    <View style={styles.sideMenuHeader}>
      <Text style={styles.sideMenuHeaderText}>板块列表</Text>
    </View>
  );
};

interface ForumInfo {
  name: string;
}

interface ForumListInfo {
  forums: ForumInfo[];
  name: string;
}

let onCheckoutDispatch;

const SubListWrapper = (props) => {

  const listItems = props.forums.map((forumInfo, index) => {

    const onPress = () => {
      events.emit(EventTags.TOGGLE_DRAWER_DISPLAY);
      onCheckoutDispatch(forumInfo)
    };

    return (
      <TouchableHighlight key={index} onPress={onPress}>
        <View style={props.listItemStyle}>
          <Text style={styles.subListItemText}>{forumInfo.name}</Text>
        </View>
      </TouchableHighlight>
    );
  });

  return (
    <Animated.View style={props.wrapperStyle}>
      <View style={styles.subListWrapperShow}>
        {listItems}
      </View>
    </Animated.View>
  );
};

interface ListWrapperProps {
  forumListInfo: ForumListInfo;
}

interface ListWrapperState {
  showSubListWrapper?: boolean;
  dropDownAnimate?: any
}

class ListWrapper extends React.Component<ListWrapperProps, ListWrapperState> {
  constructor() {
    super();

    this.state = {
      showSubListWrapper: false,
      dropDownAnimate: new Animated.Value(0)
    }
  }

  onSubListWrapperToggled() {
    const toShow = !this.state.showSubListWrapper;

    this.setState({
      showSubListWrapper: toShow
    });

    const toValue = toShow ? this.props.forumListInfo.forums.length * 40 : 0;
    Animated.timing(this.state.dropDownAnimate, {
      toValue,
      duration: animateDuration
    } as any).start();
  }

  render() {

    const forumListInfo = this.props.forumListInfo;

    const ListHeader = () => {
      return (
        <TouchableHighlight onPress={() => this.onSubListWrapperToggled()}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{forumListInfo.name}</Text>
          </View>
        </TouchableHighlight>
      )
    };

    const subListWrapperProps = {
      wrapperStyle: [
        styles.subListAnimateWrapper,
        {height: this.state.dropDownAnimate}
      ],
      listItemStyle: [styles.subListItem],
      forums: forumListInfo.forums
    };

    return (
      <View style={styles.listWrapper}>
        <ListHeader />
        <SubListWrapper {...subListWrapperProps}/>
      </View>
    );
  }
}

interface SideMenuProps {
  show: boolean;
  forumList: ForumListInfo[];
  tryRequestForumList: Function;
  checkoutForumList: Function;
}

interface SideMenuState {
  
}

class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  constructor() {
    super();
  }

  componentDidMount() {
    // refresh forumList every time when application mounted
    this.props.tryRequestForumList();

    onCheckoutDispatch = this.props.checkoutForumList;
  }


  render() {
    const forumList = this.props.forumList;

    return (
      <View style={styles.container}>
        <View style={styles.sideMenu}>
          <SideMenuHeader />
          <ScrollView>
            {generateForumListWrappers(forumList)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

function generateForumListWrappers(forumListData: ForumListInfo[]) {
  return forumListData.map((forumListInfo, index) => {
    return <ListWrapper key={index} forumListInfo={forumListInfo}/>
  });
}

export default SideMenu;