import * as React from "react";
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Drawer from 'react-native-drawer'

import Article from './components/Article';

import SideMenuContainer from './containers/SideMenuContainer';

import store from './store';

interface Props {

}

interface State {
  showSideMenu?: boolean
  
  headerContent?: string
}

export default class extends React.Component<Props, State> {
  constructor() {
    super();
    
    this.state = {
      showSideMenu: false,
      headerContent: 'nimingban'
    }
  }

  render() {
    const drawerProps = {
      openDrawerOffset: 100,
      panOpenMask: 60,
      captureGestures: true,
      content: <SideMenuContainer/>
    };

    return (
      <Provider store = { store }>
        <Drawer { ...drawerProps }>
          <View style = {{ flex: 1 }}>
            <Article />
          </View>
        </Drawer>
      </Provider>
    );
  }
}
