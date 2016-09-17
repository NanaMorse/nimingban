import * as React from "react";
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import * as DefaultStyles from '../constants/defaultStyles';


import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

// constants start
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const barrierForward = windowWidth / 4;

const defaultMenuWidth = windowWidth - 80;

const animateDuration = 500;

const toleranceX = 10;
const toleranceY = 10;

const edgeHitWidth = 60;
// constants end

const absoluteStretch = {
  position: 'absolute',
  top: 50,
  left: 0,
  bottom: 0,
  right: 0,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle,

  appView: {
    flex: 1,
    width: windowWidth
  } as ViewStyle,

  overlay: {
    backgroundColor: 'transparent'
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
    width: defaultMenuWidth,
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

const SubListWrapper = (props) => {

  const listItems = props.forums.map((forumInfo, index) => {

    const onPress = () => {
      props.onSubForumSelected(forumInfo);
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
  onSubForumSelected: Function
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
      forums: forumListInfo.forums,
      onSubForumSelected: this.props.onSubForumSelected
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
  onChange: Function;
}

interface SideMenuState {
  slideAnimate?: any;
  prevLeft?: number;
  responder?: any;
}

class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  constructor(props) {
    super();

    this.state = {
      prevLeft: props.show ? defaultMenuWidth : 0,
      slideAnimate: new Animated.Value(props.show ? defaultMenuWidth : 0)
    };
  }

  componentWillMount() {
    this.state.responder = PanResponder.create({
      onStartShouldSetResponderCapture: this.onStartShouldSetResponderCapture.bind(this),
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this.onPanResponderMove.bind(this),
      onPanResponderRelease: this.onPanResponderRelease.bind(this)
    } as any);
  }

  componentWillReceiveProps(props: SideMenuProps) {
    this.openSideMenu(props.show);
  }

  // pan event start
  onStartShouldSetResponderCapture() {
    return true;
  }

  onMoveShouldSetPanResponder(e, gestureState) {
    const x = Math.round(Math.abs(gestureState.dx));
    const y = Math.round(Math.abs(gestureState.dy));

    const touchMoved = x > toleranceX && y < toleranceY;

    if (this.props.show) {
      return touchMoved;
    }

    // swipe in right area
    const withinEdgeHitWidth = gestureState.moveX < edgeHitWidth;

    // swipe to right direction
    const swipingToOpen = gestureState.dx > 0;

    return touchMoved && withinEdgeHitWidth && swipingToOpen;
  }

  onPanResponderMove(e, gestureState) {
    if (this.state.slideAnimate.__getValue() >= 0) {
      let newLeft = this.state.prevLeft + gestureState.dx;
      // fix for appView's margin left
      if (newLeft < 0) newLeft = 0;
      this.state.slideAnimate.setValue(newLeft);
    }
  }

  onPanResponderRelease(e, gestureState) {
    const offsetLeft = this.state.slideAnimate.__getValue() + gestureState.dx;
    
    this.openSideMenu(shouldOpenMenu(offsetLeft));
  }
  // pan event end
  
  openSideMenu(isOpen, forumInfo?) {

    const newOffSet = isOpen ? defaultMenuWidth : 0;

    Animated.timing(this.state.slideAnimate, {
      toValue: newOffSet,
      duration: animateDuration,
    }).start();

    this.state.prevLeft = newOffSet;
    this.forceUpdate();
    this.props.onChange(isOpen, forumInfo);
  }

  onSubForumSelected(subForumInfo) {
    this.openSideMenu(false, subForumInfo);
  }

  wrapperTouchContentView() {
    let overlay = null;
    if (this.props.show) {
      overlay = (
        <TouchableWithoutFeedback onPress={() => this.openSideMenu(false)}>
          <View style={[styles.overlay, absoluteStretch]} />
        </TouchableWithoutFeedback>
      );
    }

    const style = [styles.appView, {marginLeft: this.state.slideAnimate}];

    return (
      <Animated.View style={style} {...this.state.responder.panHandlers}>
        {this.props.children}
        {overlay}
      </Animated.View>
    );
  }

  render() {
    const forumList = this.props.forumList;
    
    const sideMenuStyle = [styles.sideMenu, {width: this.state.slideAnimate}];

    return (
      <View style={styles.container}>
        <Animated.View style={sideMenuStyle}>
          <SideMenuHeader />
          <ScrollView>
            {generateForumListWrappers(forumList, this.onSubForumSelected.bind(this))}
          </ScrollView>
        </Animated.View>
        {this.wrapperTouchContentView()}
      </View>
    );
  }
}

function generateForumListWrappers(forumListData: ForumListInfo[], onSubForumSelected) {
  return forumListData.map((forumListInfo, index) => {
    return <ListWrapper key={index} forumListInfo={forumListInfo} onSubForumSelected={onSubForumSelected}/>
  });
}

function shouldOpenMenu(dx: Number) {
  return dx > barrierForward;
}

export default SideMenu;