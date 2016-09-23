import * as React from "react";
import { Provider } from 'react-redux';
import { Scene } from 'react-native-router-flux';

import RouterContainer from './containers/RouterContainer';
import Drawer from './components/Drawer';
import ArticleContainer from './containers/ArticleContainer';
import Post from './components/Post';

import store from './store';

class App extends React.Component<any, any> {
  constructor() {
    super();
    
  }
  
  render() {
    
    const drawerSceneProps = {
      key: 'drawer',
      component: Drawer,
      initial: true,
      passProps: true,
      open: false
    };
    
    const articleSceneProps = {
      key: 'article',
      component: ArticleContainer,
      title: (store.getState() as any).article.forumInfo.name,
      drawerImage: require('../images/menu-icon.png'),
      leftButtonIconStyle: {
        width: 21,
        height: 24
      }
    };
    
    const postSceneProps = {
      key: 'post',
      component: Post
    };
    
    return (
      <Provider store = { store }>
          <RouterContainer>
            <Scene key="root">
              <Scene {...drawerSceneProps}>
                <Scene key="main">
                  <Scene { ...articleSceneProps }/>
                </Scene>
              </Scene>
              <Scene { ...postSceneProps }/>
            </Scene>
          </RouterContainer>
      </Provider>
    );
  }
}

export default App;