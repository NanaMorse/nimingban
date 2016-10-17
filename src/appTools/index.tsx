import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ReactElement = __React.ReactElement;

export const htmlContentStyles = StyleSheet.create({
  refer: {
    color: '#789922'
  }
});

export function formatContent(content: string) {
  let result;

  // replace /&gt;&gt;No.\d+\b/ to <refer>content</refer>
  result = content.replace(/(&gt;&gt;No.\d+\b)/gi, function (str) {
    return `<refer>${str}</refer>`
  });
  
  return result;
}

interface size {
  width: number;
  height: number;
}

export function getImageSuitableSize(imageOriginSize: size, containerSize: size): size {

  const { width: originWidth, height: originHeight } = imageOriginSize;

  const { width: containerWidth, height: containerHeight } = containerSize;

  const suitableSize = {width: 0, height: 0};

  if (originWidth >= originHeight || containerHeight * originWidth / originHeight > originWidth) {
    suitableSize.width = containerWidth;
    suitableSize.height = containerWidth * originHeight / originWidth;
  } else {
    suitableSize.width = containerHeight * originWidth / originHeight;
    suitableSize.height = containerHeight;
  }

  return suitableSize;
}
