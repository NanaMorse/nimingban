import * as React from "react";
import { View, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import ViewStyle = __React.ViewStyle;
import TimingAnimationConfig = __React.Animated.TimingAnimationConfig;

const fakeData = [
  {
    "id": "4",
    "sort": "1",
    "name": "综合",
    "status": "n",
    "forums": [
      {
        "id": "4",
        "fgroup": "4",
        "sort": "1",
        "name": "综合版1",
        "showName": "",
        "msg": "msg",
        "interval": "15",
        "createdAt": "2011-10-21 15:49:28",
        "updateAt": "2015-06-23 17:26:28",
        "status": "n"
      },
      {
        "id": "20",
        "fgroup": "4",
        "sort": "2",
        "name": "欢乐恶搞",
        "showName": "",
        "msg": "msg",
        "interval": "15",
        "createdAt": "2011-10-21 15:48:43",
        "updateAt": "2014-11-05 00:27:52",
        "status": "n"
      },
      {
        "id": "11",
        "fgroup": "4",
        "sort": "3",
        "name": "推理",
        "showName": "",
        "msg": "•微小说、图片推理、解谜。<br/>•本版发文间隔为15秒。",
        "interval": "15",
        "createdAt": "2011-10-29 16:38:23",
        "updateAt": "2014-08-02 04:54:09",
        "status": "n"
      }
    ]
  }
];

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
  } as ViewStyle
});

interface Props {
  show: boolean;
}

interface State {
  slideAnimate: any;
}

class SideMenu extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      slideAnimate: new Animated.Value(0)
    }
  }

  componentWillReceiveProps(props: Props) {
    const toValue = props.show ? defaultMenuWidth : 0;

    Animated.timing(this.state.slideAnimate, {
      toValue,
      duration: 250,
      easing: Easing.in
    } as any).start()
  }

  render() {
    
    const sideMenuStyle = [styles.sideMenu];
    const appViewStyle = [styles.appView];
    if (this.props.show) {
      sideMenuStyle.push({width: defaultMenuWidth});
      appViewStyle.push({marginLeft: defaultMenuWidth});
    }
    
    return (
      <View style={styles.container}>
        <View style={sideMenuStyle}></View>
        <View style={appViewStyle}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default SideMenu;