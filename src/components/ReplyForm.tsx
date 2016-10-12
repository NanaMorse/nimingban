import * as React from "react";
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { API_POST_REPLY } from '../constants/api';
import TextInputProperties = __React.TextInputProperties;
import ViewStyle = __React.ViewStyle;

const myCookie = 'pgv_pvi=7859499008; userhash=v%5CUZ%DD%99%1F%22%DB%A0%9A%B9%F0f%7F%B0-%B78%A7%C8%8D%9E%09; PHPSESSID=5i6aat546n215nkipl3iji0n21; pgv_si=s497921024; _tc_iqsi5f1w_a=305431701.1476273774; _gat=1; _ga=GA1.2.1938008232.1474521214; Hm_lvt_f0fee27d995765b6fd4fc6aa45b0c668=1476151056,1476164222,1476185305,1476272083; Hm_lpvt_f0fee27d995765b6fd4fc6aa45b0c668=1476275774';

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

interface ReplyFormProps {
  replyTo: number;
}

interface ReplyFormState {
  name?: string;
  email?: string;
  title?: string;
  content?: string;
}

class ReplyForm extends React.Component<ReplyFormProps, ReplyFormState> {

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      title: '',
      content: ''
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
    const formData = new FormData();
    formData.append('resto', this.props.replyTo);
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    // todo aad checkbox
    formData.append('water', true);
    // todo calculate hash
    formData.append('__hash__', 'dd3633b139d37facad7721a6c0196de6_65efc949b810f8a50090369dd28a016d');
    // todo add image uploader

    fetch(API_POST_REPLY(), {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        "Cookie": myCookie
      },
      body: formData
    }).catch(function (e) {
      console.log(e);
    });
  }

  render() {
    const replyEditInputProps = {
      multiline: true,
      autoCorrect: false,
      style: styles.replyEdit,
      placeholder: '输入正文',
      value: this.state.content,
      onChange: (e) => {
        this.setState({
          'content': e.nativeEvent.text
        });
      }
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