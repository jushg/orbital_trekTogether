import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { View, StyleSheet} from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';

import firebase from "../../utils/firebase";
import Screen from "../component/screen"
import {UserContext} from "../feature/auth";

// https://github.com/amandeepmittal/react-native-examples

export default ({ route }) => {
  const [messages, setMessages] = useState([
    // example of system message
    // {
    //   _id: 0,
    //   text: 'New room created.',
    //   createdAt: new Date().getTime(),
    //   system: true
    // },
    // // example of chat message
    // {
    //   _id: 1,
    //   text: 'Henlo!',
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: 'Test User'
    //   }
    // }
  ]);

  const { chat } = route.params;
  const { user } = useContext(UserContext);
  // useEffect(() => {
  //   console.log(user);
  // })

  useEffect(() => {
    const messagesListener = firebase.firestore()
      .collection("chats")
      .doc(chat._id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  async function handleSend(messages) {
    const text = messages[0].text;
    const lastMessage = {
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    await firebase.firestore()
      .collection("chats")
      .doc(chat._id)
      .collection("messages")
      .add(lastMessage);

    await firebase.firestore()
      .collection("chats")
      .doc(chat._id)
      .update({lastMessage: lastMessage});
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee'
          },
          left: { backgroundColor: 'gray' }
        }}
        textStyle={{
          right: {
            color: '#fff'
          },
          left: { color: 'white' }
        }}
      />
    );
  }

  const renderLoading = () => {
    return (
      <Screen style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </Screen>
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send' size={30}/>
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} />
      </View>
    );
  }

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  return (
      <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: user.uid, name: user.displayName, avatar: user.photoURL }}
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});