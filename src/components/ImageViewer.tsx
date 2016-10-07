import * as React from "react";
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { API_GET_IMAGE_FULL_URL } from '../constants/api';
import ViewStyle = __React.ViewStyle;

const RCTImageStoreManager = require('NativeModules').ImageStoreManager;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64
  } as ViewStyle
});

interface ImageViewerProps {
  imageLink: string;
  imageExt: string;

  width: number;
  height: number;
}

interface ImageViewerState {
  
}

class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
  constructor(props) {
    super();
  }

  render() {

    const { width, height } = this.props;

    const imageAreaWidth = windowWidth;
    const imageAreaHeight = windowHeight - 64;

    const imageStyle = {width: 0, height: 0};

    if (width >= height) {
      imageStyle.width = imageAreaWidth;
      imageStyle.height = imageAreaWidth * height / width;
    } else {
      imageStyle.width = imageAreaHeight * width / height;
      imageStyle.height = imageAreaHeight;
    }

    const imageProps = {
      style: imageStyle,
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

