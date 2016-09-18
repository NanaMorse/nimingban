import * as React from "react";
import { View } from 'react-native';
import { Provider } from 'react-redux';

import Article from './components/Article';

import SideMenuContainer from './containers/SideMenuContainer';
import HeaderContainer from './containers/HeaderContainer';

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
  
  onSideMenuToggled() {
    this.setState({
      showSideMenu: !this.state.showSideMenu
    });
  }

  render() {
    
    const sideMenuProps = {
      show: this.state.showSideMenu,
      onChange: (show, selectedForum?) => {
        if (show === this.state.showSideMenu) return;
        this.setState({
          showSideMenu: show
        });

        if (selectedForum) {
          this.setState({
            headerContent: selectedForum.name
          });
        }
      }
    };
    
    const headerProps = {
      content: this.state.headerContent,
      onSideMenuToggled: () => this.onSideMenuToggled()
    };
    
    return (
      <Provider store = { store }>
        <SideMenuContainer {...sideMenuProps}>
          <View style={{flex: 1}}>
            <HeaderContainer {...headerProps}/>
            <Article />
          </View>
        </SideMenuContainer>
      </Provider>
    );
  }
}
