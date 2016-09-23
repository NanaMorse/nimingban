import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ReactElement = __React.ReactElement;


export function formatContent(content: string) {
  // remove <br />
  // todo how about user's input <br/> ?
  content = content.replace(/<br\s*\/>/ig, '');

  // todo replace <font> node

  // todo check 
  
  return (
    <View>
      <Text>{content}</Text>
    </View>
  );
}