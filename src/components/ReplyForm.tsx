import * as React from "react";
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Image, Dimensions, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'react-native-image-picker';

import { getImageSuitableSize } from '../appTools';

import { API_POST_REPLY } from '../constants/api';
import TextInputProperties = __React.TextInputProperties;
import ViewStyle = __React.ViewStyle;

const myCookie = 'pgv_pvi=7859499008; userhash=v%5CUZ%DD%99%1F%22%DB%A0%9A%B9%F0f%7F%B0-%B78%A7%C8%8D%9E%09; PHPSESSID=5i6aat546n215nkipl3iji0n21; pgv_si=s497921024; _tc_iqsi5f1w_a=305431701.1476273774; _gat=1; _ga=GA1.2.1938008232.1474521214; Hm_lvt_f0fee27d995765b6fd4fc6aa45b0c668=1476151056,1476164222,1476185305,1476272083; Hm_lpvt_f0fee27d995765b6fd4fc6aa45b0c668=1476275774';

const rowHeight = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    marginBottom: 10,
    marginHorizontal: 10
  },

  replyEdit: {
    height: 160,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 6,
  } as ViewStyle,

  primaryBtn: {
    backgroundColor: '#428bca',
    borderColor: '#357ebd',
  },

  infoBtn: {
    backgroundColor: '#5bc0de',
    borderColor: '#46b8da',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});


interface FormRowProps {
  label: string;
  value: string;
  onChangeText: ( text: string ) => void
}

const FormInputRow = (props: FormRowProps) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.rowLabel}>{props.label}</Text>
      <TextInput autoCorrect={false} autoCapitalize="none" style={styles.rowInput} value={props.value} onChangeText={props.onChangeText}/>
    </View>
  );
};

interface FormSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void
}

const FormSwitchRow = (props: FormSwitchProps) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.rowLabel}>{props.label}</Text>
      <Switch value={props.value} onValueChange={props.onValueChange}/>
    </View>
  );
};

interface ButtonProps {
  text: string,
  onPress: () => void,
  type?: 'primary' | 'info'
}

const Button = (props: ButtonProps) => {

  const buttonStyle = [styles.button, styles[(props.type || 'primary') + 'Btn']];

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableHighlight style={{borderRadius: 6}} onPress={props.onPress}>
        <View style={buttonStyle}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

interface ReplyFormProps {
  replyTo: string;
}

interface imageInfo {
  uri: string;
  width: number;
  height: number;
}

interface ReplyFormState {
  name?: string;
  email?: string;
  title?: string;
  content?: string;
  water?: boolean;
  imageInfo?: imageInfo;
  showMore?: boolean;
}

class ReplyForm extends React.Component<ReplyFormProps, ReplyFormState> {

  constructor(props) {
    super();

    this.state = {
      name: '',
      email: '',
      title: '',
      // todo reply to the post, or reply to another reply
      content: `>>No.${props.replyTo}`,
      water: true,
      imageInfo: {
        uri: '',
        width: 0,
        height: 0
      },
      showMore: false
    }
  }

  generateFormInputRow(label: string, valueHolder: string) {
    const onChangeText = (text) => {
      this.setState({
        [valueHolder]: text
      });
    };

    return <FormInputRow label={label} value={this.state[valueHolder]} onChangeText={onChangeText}/>
  }

  generateImageRow(imageInfo: imageInfo) {
    const containerSize = {
      width: Dimensions.get('window').width - 20,
      height: 200
    };

    const imageSize = getImageSuitableSize(imageInfo, containerSize);

    const imageProps = {
      style: [imageSize, { marginBottom: 10 }],
      source: { uri: imageInfo.uri }
    };

    return <Image {...imageProps}/>
  }

  onPostReply() {
    const formData = new FormData();
    formData.append('resto', this.props.replyTo);
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    formData.append('water', this.state.water);
    // todo calculate hash
    formData.append('__hash__', 'dd3633b139d37facad7721a6c0196de6_65efc949b810f8a50090369dd28a016d');
    // todo add image uploader
    if (this.state.imageInfo.uri) {
      formData.append('image', {
        uri: this.state.imageInfo.uri,
        type: 'image/png',
        name: 'a.png',
      });
    }

    fetch(API_POST_REPLY(), {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
        "Cookie": myCookie
      },
      body: formData
    }).then(() => {
      Actions.pop();
      setTimeout(() => Actions.refresh({ key: 'post', needRequest: true }), 1);
    }).catch(e => console.error(e));
  }

  onChoiceImage() {
    var options = {
      title: '选择图片',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) return;

      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        return;
      }

      this.setState({
        imageInfo: {
          uri: response.uri.replace('file://', ''),
          width: response.width,
          height: response.height
        }
      });
    });
  }

  render() {
    const replyEditInputProps = {
      multiline: true,
      autoCorrect: false,
      style: styles.replyEdit,
      placeholder: '输入正文',
      value: this.state.content,
      onChangeText: (text) => {
        this.setState({
          'content': text
        });
      }
    };

    const waterFormSwitchProps = {
      label: '图片水印：',
      value: this.state.water,
      onValueChange: (value) => {
        this.setState({ water: value })
      }
    };

    const showMoreFormSwitchProps = {
      label: '更多选项：',
      value: this.state.showMore,
      onValueChange: (value) => {
        this.setState({ showMore: value })
      }
    };

    return (
      // todo fix KeyboardAwareScrollView's bug about 20px's marginTop
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInput autoCapitalize="none" {...replyEditInputProps}/>
          {
            this.state.imageInfo.uri ? this.generateImageRow(this.state.imageInfo) : null
          }
          <Button text="选择图片" type="info" onPress={this.onChoiceImage.bind(this)}/>
          <FormSwitchRow {...waterFormSwitchProps}/>
          <FormSwitchRow {...showMoreFormSwitchProps}/>
          { this.state.showMore ?
            <View>
            {this.generateFormInputRow('名称：', 'name')}
            {this.generateFormInputRow('E-mail：', 'email')}
            {this.generateFormInputRow('标题：', 'title')}
            </View> : null }
          <View style={{ marginVertical: 20 }}/>
          <Button text="提交" onPress={this.onPostReply.bind(this)}/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default ReplyForm;