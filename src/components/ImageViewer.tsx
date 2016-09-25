import * as React from "react";
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { API_GET_IMAGE_FULL_URL } from '../constants/api';
import ViewStyle = __React.ViewStyle;

const RCTImageStoreManager = require('NativeModules').ImageStoreManager;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  image: {
    width: Dimensions.get('window').width,
    height: 400
  }
});

interface ImageViewerProps {
  imageLink: string;
  imageExt: string;
}

interface ImageViewerState {
  
}

class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
  constructor(props) {
    super();
    
    console.log('to here!');
  }

  render() {

    const imageProps = {
      style: styles.image,
      source: { uri: API_GET_IMAGE_FULL_URL(this.props.imageLink, this.props.imageExt) }
    };

    return (
      <View style={styles.wrapper}>
        <Image {...imageProps}/>
      </View>
    );
  }
}

export default ImageViewer;

