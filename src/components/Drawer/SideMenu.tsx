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
import { Actions } from 'react-native-router-flux';
import * as functionForumsId from '../../constants/functionForumsId';

const HTMLView = require('react-native-htmlview');

import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;
import { forumData, forumGroupData } from '../../interface';

// constants start
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const animateDuration = 500;

const functionForums = {
  name: '功能',
  forums: [
    // subscribe
    {
      id: functionForumsId.SUBSCRIBE_ID,
      name: "订阅",
      showName: "订阅"
    }
  ]
} as forumGroupData;

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

  groupWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  } as ViewStyle,

  groupHeader: {
    flexDirection: 'row',
    width: windowWidth,
    height: 40,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#404040',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1
  } as ViewStyle,

  groupHeaderText: {
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

let onCheckoutDispatch;

const SubListWrapper = (props) => {

  const listItems = props.forums.map((forumInfo: forumData, index) => {

    const onPress = () => {
      Actions.refresh({key: 'drawer', open: false});
      onCheckoutDispatch(forumInfo);
    };

    return (
      <TouchableHighlight key={index} onPress={onPress}>
        <View style={props.listItemStyle}>
          <Text style={styles.subListItemText}>
            <HTMLView value={forumInfo.showName || forumInfo.name}/>
          </Text>
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

interface GroupWrapperProps {
  forumGroup: forumGroupData;
}

interface GroupWrapperState {
  showSubListWrapper?: boolean;
  dropDownAnimate?: any
}

class GroupWrapper extends React.Component<GroupWrapperProps, GroupWrapperState> {
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

    const toValue = toShow ? this.props.forumGroup.forums.length * 40 : 0;
    Animated.timing(this.state.dropDownAnimate, {
      toValue,
      duration: animateDuration
    } as any).start();
  }

  render() {

    const forumGroupInfo = this.props.forumGroup;

    const ListHeader = () => {
      return (
        <TouchableHighlight onPress={() => this.onSubListWrapperToggled()}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupHeaderText}>{forumGroupInfo.name}</Text>
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
      forums: forumGroupInfo.forums
    };

    return (
      <View style={styles.groupWrapper}>
        <ListHeader />
        <SubListWrapper {...subListWrapperProps}/>
      </View>
    );
  }
}

interface SideMenuProps {
  show: boolean;
  forumList: forumGroupData[];
  tryRequestForumList: Function;
  checkoutForumList: Function;
}

class SideMenu extends React.Component<SideMenuProps, {}> {
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
    forumList.push(functionForums);
    
    return (
      <View style={styles.container}>
        <View style={styles.sideMenu}>
          <SideMenuHeader />
          <ScrollView>
            {generateForumGroups(forumList)}
          </ScrollView>
        </View>
      </View>
    );
  }
}


function generateForumGroups(forumList: forumGroupData[]) {
  return forumList.map((forumGroup, index) => {
    return <GroupWrapper key={index} forumGroup={forumGroup}/>
  });
}

export default SideMenu;