import * as React from "react";
import SideMenuContainer from '../containers/SideMenuContainer';
import Drawer from 'react-native-drawer'
import { DefaultRenderer } from 'react-native-router-flux';
const events = require('RCTDeviceEventEmitter');
import { DRAWER_CLOSED } from '../constants/eventTags';

interface Props {
  navigationState: any;
  onNavigate: any;
  open: boolean;
}

class DrawerRouter extends React.Component<Props, any> {
  
  render(){
    
    const state = this.props.navigationState;
    const children = state.children;

    const drawerProps = {
      open: this.props.open,
      openDrawerOffset: 100,
      captureGestures: true,
      panOpenMask: 10,
      panCloseMask:0.2,
      content: <SideMenuContainer />,
      onClose: () => events.emit(DRAWER_CLOSED),
      styles: {
        mainOverlay: {
          top: 64
        }
      }
    };
    
    return (
      <Drawer { ...drawerProps }>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

export default DrawerRouter;