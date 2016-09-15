import * as React from "react";
import { View } from 'react-native';

import SideMenu from './components/SideMenu';
import Header from './components/Header'

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
  
  onSideMenuToggled() {
    this.setState({
      showSideMenu: !this.state.showSideMenu
    });
  }

  render() {
    
    const sideMenuProps = {
      show: this.state.showSideMenu
    };
    
    const headerProps = {
      content: this.state.headerContent,
      onSideMenuToggled: () => this.onSideMenuToggled()
    };
    
    return (
      <SideMenu {...sideMenuProps}>
        <View style={{flex: 1}}>
          <Header {...headerProps}/>
        </View>
      </SideMenu>
    );
  }
}
