import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image, Dimensions } from 'react-native';

import { API_POST_REPLY } from '../constants/api';

class ReplyForm extends React.Component<any, any> {

  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Text>I am Reply Form!</Text>
      </View>
    )
  }
}

export default ReplyForm;