import * as React from "react";
import { View } from 'react-native';

import Header from './components/Header'

interface Props {

}

interface State {

}

export default class extends React.Component<Props, State> {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header/>
      </View>
    );
  }
}
