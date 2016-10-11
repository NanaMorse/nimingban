import * as React from "react";
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { API_POST_REPLY } from '../constants/api';
import TextInputProperties = __React.TextInputProperties;
import ViewStyle = __React.ViewStyle;


const rowHeight = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 74,
    marginHorizontal: 10
  },

  replyEdit: {
    height: 160,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16
  },

  formRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: rowHeight,
  } as ViewStyle,

  rowLabel: {
    lineHeight: rowHeight,
    height: rowHeight,
  },

  rowInput: {
    width: 300,
    height: rowHeight,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 16
  },

  button: {
    width: Dimensions.get('window').width - 20,
    height: rowHeight,
    backgroundColor: '#428bca',
    borderColor: '#357ebd',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 6
  } as ViewStyle,

  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});


interface FormRowProps {
  label: string;
  value: string;
  onChange: ( event: {nativeEvent: {text: string}} ) => void
}

const FormRow = (props: FormRowProps) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.rowLabel}>{props.label}</Text>
      <TextInput autoCorrect={false} autoCapitalize="none" style={styles.rowInput} value={props.value} onChange={props.onChange}/>
    </View>
  );
};

interface ButtonProps {
  text: string,
  onPress: () => void
}

const Button = (props: ButtonProps) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableHighlight style={{borderRadius: 6}} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

interface ReplyFormState {
  name?: string;
  email?: string;
  title?: string;
}

class ReplyForm extends React.Component<any, ReplyFormState> {

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      title: ''
    }
  }

  generateFormRow(label: string, valueHolder: string) {
    const onChange = (e) => {
      this.setState({
        [valueHolder]: e.nativeEvent.text
      });
    };

    return <FormRow label={label} value={this.state[valueHolder]} onChange={onChange}/>
  }

  onPostReply() {
    console.log('post!');

    Actions.pop();
  }

  render() {
    const replyEditInputProps = {
      multiline: true,
      autoCorrect: false,
      style: styles.replyEdit,
      placeholder: '输入正文'
    };

    return (
      <View style={styles.container}>
        <TextInput autoCapitalize="none" {...replyEditInputProps}/>
        {this.generateFormRow('名称：', 'name')}
        {this.generateFormRow('E-mail：', 'email')}
        {this.generateFormRow('标题：', 'title')}
        <View style={{ marginVertical: 20 }}/>
        <Button text="提交" onPress={this.onPostReply.bind(this)}/>
      </View>
    )
  }
}

export default ReplyForm;