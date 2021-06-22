import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { GiftedChat, Send } from 'react-native-gifted-chat'

export default () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const renderSend= (props) => {
    return (
      <Send {...props} >
          <View style={{marginRight: 10, marginBottom: 5}}>
              <IconButton icon="send" />
          </View>
      </Send>
    );
  }
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderSend={renderSend}
    />
  )
}

