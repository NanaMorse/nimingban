import * as React from "react";
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { API_GET_IMAGE_FULL_URL } from '../constants/api';

import { getImageSuitableSize } from '../appTools';

import ViewStyle = __React.ViewStyle;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// todo image scale
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
  constructor() {
    super();
  }

  render() {

    const containerSize = {
      width: windowWidth,
      height: windowHeight - 64
    };

    const imageSize = getImageSuitableSize(this.props, containerSize);

    const imageProps = {
      style: imageSize,
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

