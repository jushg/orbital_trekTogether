import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native'
import {List, Avatar, ActivityIndicator, Divider, Searchbar, Appbar, Caption, } from "react-native-paper";
import { CommonActions } from '@react-navigation/native'

// https://docs.expo.io/versions/latest/sdk/permissions/
// TO CACHE AVATARS ?
// https://github.com/DylanVann/react-native-fast-image

import Screen from "../component/screen"
import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import { Headline } from 'react-native-paper';
import colorConst from '../constant/color';

export default ({navigation}) => {
  const {user} = useContext(UserContext);
  const [chats, setChats] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState(''); 
  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    const unsubscribeChatListener = firebase.firestore()
      .collection("chats")
      .where("isActive", "==", true)
      .where("members", "array-contains", user.uid)
      .orderBy("lastMessage.createdAt", 'desc')
      .onSnapshot(querySnapshot => {
        const allChats = querySnapshot.docs.map(doc => {
          return {
            _id: doc.id,
            // give defaults
            name: '',
            latestMessage: {
              text: ''
            },
            ...doc.data()
          };
        });
        setChats(allChats);
      });

    return () => unsubscribeChatListener();
  }, []);

  function getChatName(itemID, itemName) {
    const x = itemID.split("_");
    const s = itemName.split("_");
    return (x[0] !== user.uid)
      ? { otherID: x[0], otherUsername: s[0]}
      : { otherID: x[1], otherUsername: s[1]};
  }
  const renderChat = ({item}) => {
    let {otherID, otherUsername} = getChatName(item._id, item.name);
    if (item.lastMessage.system) otherUsername += " 👋";   // new buddy? Add an emoji :)
    let lastMessage;
    if (item.lastMessage.system) lastMessage = item.lastMessage.text;  // system message, no sender
    else lastMessage =
      (item.lastMessage.user.name === otherUsername
        ? otherUsername
        : "You")
      + `: ${item.lastMessage.text}`;
    return (

      <List.Item
        title={otherUsername}
        description={lastMessage}
        // left={props => <List.Icon {...props} icon="account"/>}
        left={(props) => {
          return <Avatar.Image {...props} 
          size={70} 
          source={{uri: item.avatarURL[otherID]}}/>;
        }}
        onPress={() => navigation.dispatch(CommonActions.navigate({
            name: 'Chat',
            //use this to pass in the name of other user
            params: {chat: item, otherName: otherUsername, otherID: otherID},
          })
        )}
        titleNumberOfLines={1}
        descriptionNumberOfLines={1}
        titleStyle={item.lastMessage.system ? {fontWeight:'bold', color:'black'} : {}}
        // titleStyle={{fontWeight:"bold"}}
        descriptionStyle={item.lastMessage.system ? {fontWeight:'bold', color:'teal'} : {}}
        // style={{backgroundColor:colorConst}}
      />

    )
  };

  return (
      <>
        <Appbar.Header>
          <Appbar.Content title="Messages"  />
            <Appbar.Action icon="magnify" disabled  />
            <Appbar.Action icon="cog" disabled/>
        </Appbar.Header>  

        {chats == null ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator  size="large" color="black"/>
          </View> :

        chats.length === 0 ?
          <View style={styles.loadingContainer}>
            <Caption>You have no current chats.</Caption>
          </View> :

          <View style={{flex: 1}}>
            <FlatList
              data={chats}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={ () => <Divider/> }
              renderItem={renderChat}
            />
          </View>
        }
      </>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop:5,
    paddingBottom:10,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  searchBar: {
    marginBottom: 5,
    borderRadius:20,
    width:"100%"
  }
});