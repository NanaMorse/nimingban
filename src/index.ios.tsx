import * as React from "react";
import { Provider } from 'react-redux';
import Drawer from 'react-native-drawer'
import { Router, Scene } from 'react-native-router-flux';
const events = require('RCTDeviceEventEmitter');
import * as EventTags from './constants/eventTags';

import Article from './components/Article';

import SideMenuContainer from './containers/SideMenuContainer';

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
      panOpenMask: 60,
      captureGestures: true,
      content: <SideMenuContainer/>,
      ref: (ref) => this.state.drawerRef = ref
    };
    
    return (
      <Provider store = { store }>
        <Drawer { ...drawerProps }>
          <Router>
            <Scene key="root">
              <Scene key="main" component={Article} title={this.state.headerContent} initial={true} />
            </Scene>
          </Router>
        </Drawer>
      </Provider>
    );
  }
}

export default App;