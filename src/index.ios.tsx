import * as React from "react";
import { Provider } from 'react-redux';
import Drawer from 'react-native-drawer'
import { Router, Scene } from 'react-native-router-flux';
const events = require('RCTDeviceEventEmitter');
import * as EventTags from './constants/eventTags';

import RouterContainer from './containers/RouterContainer';
import SideMenuContainer from './containers/SideMenuContainer';
import ArticleContainer from './containers/ArticleContainer';

import store from './store';

interface Props {

}

interface State {
  headerContent?: string;
  drawerRef?: any;
}

class App extends React.Component<Props, State> {
  constructor() {
    super();
    
    this.state = {
      headerContent: 'nimingban'
    }
  }

  componentDidMount() {
    events.addListener(EventTags.TOGGLE_DRAWER_DISPLAY, () => {
      this.toggleDrawer();
    });
  }

  toggleDrawer() {
    this.state.drawerRef.toggle();
  }

  render() {
    const drawerProps = {
      openDrawerOffset: 100,
      captureGestures: true,
      panOpenMask: 20,
      panCloseMask:0.2,
      content: <SideMenuContainer/>,
      ref: (ref) => this.state.drawerRef = ref,
      styles: {
        mainOverlay: {
          top: 64
        }
      }
    };

    const articleSceneProps = {
      key: 'article',
      component: ArticleContainer,
      title: (store.getState() as any).article.forumInfo.name,
      initial: true,
      drawerImage: require('../images/menu-icon.png'),
      leftButtonIconStyle: {
        width: 21,
        height: 24
      }
    };
    
    return (
      <Provider store = { store }>
        <Drawer { ...drawerProps }>
          <RouterContainer>
            <Scene key="root">
              <Scene { ...articleSceneProps }/>
            </Scene>
          </RouterContainer>
        </Drawer>
      </Provider>
    );
  }
}

export default App;