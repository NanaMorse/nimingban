import * as React from "react";
import { View, Text, StyleSheet } from 'react-native';

// todo make toast usable and beautiful
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    opacity: 0
  },

  toast: {
    width: 200,
    height: 30
  }
});

class Toast extends React.Component<any, any> {

  constructor() {
    super();
  }

  render() {
    return (
      <View pointerEvents="none" style={styles.container}>
        <View style={styles.toast}>
          <Text>Toast</Text>
        </View>
      </View>
    );
  }
}

export default Toast;