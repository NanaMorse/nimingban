import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import ViewStyle = __React.ViewStyle;
import TextStyle = __React.TextStyle;

const styles = StyleSheet.create({
  headerStyle: {
    padding: 10,
    paddingTop: 20,
    height: 55,
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  } as ViewStyle,

  headerBtnStyle: {
    width: 25,
    height: 25
  } as ViewStyle,

  headerTextStyle: {
    color: '#fff'
  } as TextStyle,

  slideMenuToggleBtnStyle: {
    backgroundColor: 'powderblue'
  } as ViewStyle,

  saySomeThingBtnShowStyle: {
    backgroundColor: 'red'
  } as ViewStyle,

  saySomeThingBtnHideStyle: {
    opacity: 0
  } as ViewStyle
});

interface headerState {
  showSaySomethingBtn: boolean;
}

class Header extends React.Component<any, headerState> {
  constructor() {
    super();

    this.state = {
      showSaySomethingBtn: false
    }
  }

  onSlideMenuToggled() {
    this.setState({
      showSaySomethingBtn: !this.state.showSaySomethingBtn
    })
  }

  render() {

    const saySomethingBtnStyle = [
      styles.headerBtnStyle,
      this.state.showSaySomethingBtn ?
        styles.saySomeThingBtnShowStyle : styles.saySomeThingBtnHideStyle
    ];

    return (
      <View style={styles.headerStyle} >
        <TouchableHighlight onPress={() => this.onSlideMenuToggled()}>
          <View style={[styles.headerBtnStyle, styles.slideMenuToggleBtnStyle]}/>
        </TouchableHighlight>
        <Text style={styles.headerTextStyle}>nimingban</Text>
        <View style={saySomethingBtnStyle} />
      </View>
    )
  }
}

export default Header;