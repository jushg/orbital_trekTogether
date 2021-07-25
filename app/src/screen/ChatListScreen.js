import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, FlatList, View} from 'react-native'
import {List, Avatar, ActivityIndicator, Divider, Appbar, Caption, Button } from "react-native-paper";
import { CommonActions } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {showMessage} from "react-native-flash-message";


import firebase from "../../utils/firebase";
import {UserContext} from "../../utils/context";
import colorConst from '../constant/color';
import * as Match from "../../utils/match";
import * as Trip from "../../utils/trip";

export default ({navigation}) => {
  const {user} = useContext(UserContext);
  const [chats, setChats] = useState(null);
  
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

  function renderRightActions(otherName, otherID) {
    const handleUnmatch = async () => {
      // Unmatch + Delete all trips with ex-buddy
      try {
        Promise.all([
          Match.unmatchBetween(user, otherID),
          Trip.deleteFutureTripWithUnmatchedBuddy(user, otherID)
        ]).then(console.log);
        showMessage({
          "message": `Unmatched with ${otherName}`,
          type: "info", icon: "auto", floating: true
        });
      } catch (e) {
        console.error(e);
      }
    }

    return (
      <Button
        onPress={handleUnmatch}
        compact={true}
        style={{justifyContent:"center", borderRadius:0, backgroundColor:colorConst.accent}}
        mode="contained"
        labelStyle={{paddingVertical:"100%"}}
      >
        Unmatch
      </Button>
    );
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
      <Swipeable renderRightActions={() => renderRightActions(otherUsername, otherID)} overshootRight={false} >
        <List.Item
          title={otherUsername}
          description={lastMessage}
          left={(props) => {
            return <Avatar.Image {...props} 
            size={70} 
            source={{uri: item.avatarURL[otherID]}}/>;
          }}
          onPress={() => navigation.dispatch(CommonActions.navigate({
              name: 'Chat',
              params: {chat: item, otherName: otherUsername, otherID: otherID},
            })
          )}
          titleNumberOfLines={1}
          descriptionNumberOfLines={1}
          titleStyle={item.lastMessage.system ? {fontWeight:'bold', color:'black'} : {}}
          descriptionStyle={item.lastMessage.system ? {fontWeight:'bold', color:'teal'} : {}}
        />
      </Swipeable>
    )
  };

  return (
      <>
        <Appbar.Header>
          <Appbar.Content title="Messages"  />
        </Appbar.Header>  
        {chats == null ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator  size="large" color="black"/>
          </View> 
          : chats.length === 0 ?
          <View style={styles.loadingContainer}>
            <Caption>You have no current chats.</Caption>
          </View> 
          :
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
    paddingHorizontal: 20,
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