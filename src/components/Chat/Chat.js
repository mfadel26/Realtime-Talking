import React, {Component} from 'react'
import { GiftedChat,Send, } from 'react-native-gifted-chat'
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import {
  Header,
  Content,
  Item,
  Button,
  Icon,
  Container,
  Left,
  Right,
  Fab,
  Body
} from 'native-base';
import { Bubble, } from 'react-native-gifted-chat';
import database, { firebase } from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export class Chat extends Component {
  state = {
    message: '',
    messageList: [],
    person: this.props.navigation.getParam('item'),
    userId: '',
    userName: '',
    userAvatar: '',
  };

  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
        this.state.userId +
        '/' +
        this.state.person.id +
        '/' +
        msgId
      ] = message;
      updates[
        'messages/' +
        this.state.person.id +
        '/' +
        this.state.userId +
        '/' +
        msgId
      ] = message;
      firebase.database()
        .ref()
        .update(updates);
      this.setState({ message: '' });
    }
  };

  async componentDidMount() {
    const { displayName, uid, photoURL } = await firebase.auth().currentUser;
    const userId = uid;
    const userName = displayName;
    const userAvatar = photoURL;
    console.log(userId)
    this.setState({ userId, userName, userAvatar });
    database()
      .ref('messages')
      .child(userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
  };
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#ffffff",
          },
        }}
        textStyle={{
          right: {
            color: "black",
          }

        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 20,
            marginBottom: 5,
          }}>
          <MaterialCommunityIcons name='send-circle' size={35} color={"#B3C8DB"} />
        </View>
      </Send>
    );
  }
  //keyboard

  render() {
    return (
      <Container style={{ backgroundColor: "#B3C8DB" }}>
      <Header transparent>
          <StatusBar backgroundColor="#9BACBE" barStyle="light-content" />
          <Left> 
            <Text style={{ paddingHorizontal: 20, color: 'black', fontSize: 20, fontWeight: 'bold' }}>ok</Text>
          </Left>
          <Right>
      </Right>
      </Header>

      <View style={{flex: 1, backgroundColor:"#B3C8DB" }}>
        <GiftedChat
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
          text={this.state.message}
          onInputTextChanged={val => {
            this.setState({ message: val });
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.userId,
          }}
        />
      </View>
      </Container>
    );
  }
}
export default Chat