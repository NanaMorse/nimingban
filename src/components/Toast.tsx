import * as React from "react";
import { View, Text, StyleSheet, Dimensions, Animated, setTimeout } from 'react-native';
import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// todo make toast usable and beautiful
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center'
  } as ViewStyle,

  toastAndroidStyle: {
    minWidth: 200,
    maxWidth: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(100,100,100, 0.8)',
    alignItems: 'center',
    marginTop: windowHeight - 100
  } as ViewStyle,

  toastMsgText: {
    maxWidth: 260,
    color: '#fff',
    fontSize: 16
  } as TextStyle
});


type animationType = 'fade' | '';

interface animationOption {
  type: animationType,
  speed: 'slow' | 'fast' | number
}

interface ToastProps {

}

interface ToastState {
  toastMsg?: string;
  animatedOpacity?: Animated.Value;
}

class Toast extends React.Component<ToastProps, ToastState> {

  constructor() {
    super();

    this.state = {
      toastMsg: '',
      animatedOpacity: new Animated.Value(0)
    };
  }

  startShowToastAnimate(animationOption: animationOption = { type: 'fade', speed: 'fast' }) {
    switch (animationOption.type) {
      case 'fade': {
        const optionSpeed = animationOption.speed;
        let fadeDuration;
        if (typeof optionSpeed === 'string') {
          if (optionSpeed === 'slow') fadeDuration = 800;
          if (optionSpeed === 'fast') fadeDuration = 300;
        } else if (typeof optionSpeed === 'number'){
          fadeDuration = optionSpeed;
        }

        return this.startSimpleFadeAnimate(fadeDuration);
      }

      default: {
        return;
      }
    }
  }

  startSimpleFadeAnimate(fadeDuration: number = 300, persistedTime: number = 1000) {

    const getSimpleFadeFunc = (toValue) => {
      return (callback?) => {
        Animated.timing(this.state.animatedOpacity, {
          toValue,
          duration: fadeDuration
        }).start(callback);
      }
    };

    const startFadeIn = getSimpleFadeFunc(1);

    const startFadeOut = getSimpleFadeFunc(0);

    startFadeIn(() => setTimeout(startFadeOut, persistedTime));
  }

  show(msg: string = 'default msg', animationOption?: animationOption) {
    this.setState({ toastMsg: msg }, () => {
      this.startShowToastAnimate(animationOption);
    });
  }

  render() {
    const containerStyle = [styles.container, {
      opacity: this.state.animatedOpacity
    }];

    return (
      <Animated.View pointerEvents="none" style={containerStyle}>
        <View style={styles.toastAndroidStyle}>
          <Text style={styles.toastMsgText}>{this.state.toastMsg}</Text>
        </View>
      </Animated.View>
    );
  }
}

export default Toast;