import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ReactElement = __React.ReactElement;

const styles = StyleSheet.create({
  referenceText: {
    color: '#789922'
  }
});

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


function replaceStringToTextComponentsArray(str: string | any[], reg: RegExp, fn?: Function) {

  const resultArray: any[] = typeof str === 'string' ? str.split(reg) : str;

  for (let i = 1, len = resultArray.length; i < len; i += 2) {
    resultArray[i] = fn(resultArray[i], i)
  }
  
  return resultArray;
}