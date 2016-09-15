import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingTop: 20,
    height: 55,
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  } as ViewStyle,

  headerBtn: {
    width: 25,
    height: 25
  } as ViewStyle,

  headerText: {
    color: '#fff'
  } as TextStyle,

  slideMenuToggleBtn: {
    backgroundColor: 'powderblue'
  } as ViewStyle,

  saySomeThingBtnShow: {
    backgroundColor: 'red'
  } as ViewStyle,

  saySomeThingBtnHide: {
    opacity: 0
  } as ViewStyle
});

interface Props {
  content: string;

  onSideMenuToggled: Function;
}

interface State {
  showSaySomethingBtn: boolean;
}

class Header extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      showSaySomethingBtn: false
    }
  }

  onSlideMenuToggled() {
    this.props.onSideMenuToggled();
  }

  render() {

    const saySomethingBtnStyle = [
      styles.headerBtn,
      this.state.showSaySomethingBtn ?
        styles.saySomeThingBtnShow : styles.saySomeThingBtnHide
    ];

    return (
      <View style={styles.header} >
        <TouchableHighlight onPress={() => this.onSlideMenuToggled()}>
          <View style={[styles.headerBtn, styles.slideMenuToggleBtn]}/>
        </TouchableHighlight>
        <Text style={styles.headerText}>{this.props.content}</Text>
        <View style={saySomethingBtnStyle} />
      </View>
    )
  }
}

export default Header;