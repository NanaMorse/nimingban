import * as React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import ViewStyle = __React.ViewStyle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  } as ViewStyle
});


interface LoadingCoverProps {
  show?: boolean;
  message?: string;
}

class LoadingCover extends React.Component<LoadingCoverProps, {}> {
  render() {
    if (this.props.show) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#eee"/>
        </View>
      );
    } else {
      return <View />
    }
  }
}

export default LoadingCover;