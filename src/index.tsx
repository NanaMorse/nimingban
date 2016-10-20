import * as React from "react";
import { Provider } from 'react-redux';
import { Scene, Modal } from 'react-native-router-flux';

import RouterContainer from './containers/RouterContainer';
import ArticleContainer from './containers/ArticleContainer';
import Drawer from './components/Drawer/Drawer';
import Post from './components/Post';
import ReplyForm from './components/ReplyForm';
import ImageViewer from './components/tools/ImageViewer';
import LoadingCover from './components/tools/LoadingCover';

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
    
    const imageViewerSceneProps = {
      key: 'imageViewer',
      component: ImageViewer
    };

    const replyFormSceneProps = {
      key: 'replyForm',
      component: ReplyForm
    };

    const loadingCoverSceneProps = {
      key: 'loadingCover',
      component: LoadingCover
    };

    return (
      <Provider store={store}>
          <RouterContainer>
            <Scene key="modal" component={Modal}>
              <Scene key="root">
                <Scene {...drawerSceneProps}>
                  <Scene key="main">
                    <Scene {...articleSceneProps}/>
                  </Scene>
                </Scene>
                <Scene {...postSceneProps}/>
                <Scene {...imageViewerSceneProps}/>
                <Scene {...replyFormSceneProps}/>
              </Scene>
              <Scene {...loadingCoverSceneProps} />
            </Scene>
          </RouterContainer>
      </Provider>
    );
  }
}

export default App;