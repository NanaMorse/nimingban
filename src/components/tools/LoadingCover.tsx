import * as React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
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
    justifyContent: 'center'
  } as ViewStyle,

  indicatorWrapper: {
    width: 70,
    height: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  } as ViewStyle
});


interface LoadingCoverProps {
  show?: boolean;
}

class LoadingCover extends React.Component<LoadingCoverProps, {}> {
  render() {
    if (this.props.show) {
      // todo react native's activityIndicator has some wrong about it's position
      return (
        <View style={styles.container}>
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" color="#eee"/>
          </View>
        </View>
      );
    } else {
      return <View />
    }
  }
}

export default LoadingCover;