import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ReactElement = __React.ReactElement;

const styles = StyleSheet.create({
  referenceText: {
    color: '#789922'
  }
});

function replaceStringToTextComponentsArray(str: string | any[], reg: RegExp, fn?: Function) {

  const resultArray: any[] = typeof str === 'string' ? str.split(reg) : str;

  for (let i = 1, len = resultArray.length; i < len; i += 2) {
    resultArray[i] = fn(resultArray[i], i)
  }

  return resultArray;
}

export function formatContent(content: string) {
  // remove <br />
  // todo how about user's input <br/> ?
  content = content.replace(/<br\s*\/>/ig, '');

  // todo replace <font> node


  // replace /&gt;&gt;No.\d+\b/
  const result = replaceStringToTextComponentsArray(content, /(&gt;&gt;No.\d+\b)/gi, function (match, i) {
    // todo: get reference content
    return <Text style={styles.referenceText} key={i}>{match.replace('&gt;&gt;', '>>')}</Text>
  });
  
  
  return (
    <View>
      <Text>
        {result}
      </Text>
    </View>
  );
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
