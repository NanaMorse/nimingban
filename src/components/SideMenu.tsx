import * as React from "react";
import { View, Animated, StyleSheet, Dimensions, ScrollView, Text, TouchableHighlight } from 'react-native';
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
    paddingLeft: 15,
    backgroundColor: '#404040',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  } as ViewStyle,

  sideMenuHeaderText: {
    color: '#ccc'
  } as TextStyle,

  listWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  } as ViewStyle,

  listHeader: {
    flexDirection: 'row',
    width: defaultMenuWidth,
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
    width: defaultMenuWidth,
    height: 20,
    overflow: 'hidden'
  } as ViewStyle,

  subListWrapperShow: {
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    paddingLeft: 15
  } as ViewStyle,

  subListItem: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  } as ViewStyle,

  subListItemText: {
    color: '#ccc'
  } as TextStyle
});

const SideMenuHeader = () => {
  return (
    <View style={[DefaultStyles.HEADER, styles.sideMenuHeader]}>
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

interface ListWrapperProps {
  forumListInfo: ForumListInfo
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
      duration: 250
    } as any).start()
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



const SubListWrapper = (props) => {

  const listItems = props.forums.map((forumInfo, index) => {
    return (
      <View key={index} style={props.listItemStyle}>
        <Text style={styles.subListItemText}>{forumInfo.name}</Text>
      </View>
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
  return forumListData.map((forumListInfo, index) => {
    return <ListWrapper key={index} forumListInfo={forumListInfo} />
  });
}

export default SideMenu;