import React, {useContext, useEffect, useState} from 'react';
import { Avatar, Paragraph, ActivityIndicator, Subheading ,Headline, Caption, IconButton, Button } from "react-native-paper"
import Swiper from "react-native-deck-swiper"
import {Image, StyleSheet, Text, View} from 'react-native';
import { showMessage } from "react-native-flash-message";

import Screen from "../component/screen"
import { getAllPotentialBuddies } from "../../utils/computeBuddy";
import * as Match from '../../utils/match';
import {UserContext} from "../../utils/context";
import firebase from "../../utils/firebase";

import colorConst from '../constant/color';
export default ({navigation}) => {

  const computeDate = (date) => {
    let value = 0;
    for (let index = 0; index < date.length; index++) {
      if(date[index]) value += 1;
    }
    return value;
  }
  // doc is not data yet!
  const renderCard = (doc) => {
    const data = doc.data();
    // console.log("Item is " + data.email);
    return(
      <View style={styles.card}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        {data.photoURL && <Avatar.Image size={90} source={{uri : data.photoURL} } />}
        {!data.photoURL && <Avatar.Image size={90} source={require("../../assets/pain.jpg")} />}
        
        <Headline>{data.name}, {data.age}</Headline>
        {data.level === 1 && <Caption style={{fontSize:15}}>Beginner</Caption>}
        {data.level === 2 && <Caption style={{fontSize:15}}>Intermediate</Caption>}
        {data.level === 3 && <Caption style={{fontSize:15}}>Advanced</Caption>}
        <View style={{alignItems:"baseline", alignSelf:"stretch"}}>
          <Paragraph>{data.about || "No description"}</Paragraph>
        </View>
        </View>
       
        
        <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"flex-start"}}>
          <View style={{flex:1, alignItems:"center"}}>
            <Subheading style={{fontWeight:'bold'}}>Destination</Subheading>
            {data.place.map((place, i) => <Paragraph key={i} >{place}</Paragraph>)}
          
            
          </View>
          <View style={styles.verticalLine}></View>
          <View style={{flex:1 , alignItems:"center"}}>
          <Subheading style={{fontWeight:'bold'}}>{computeDate(data.date)} free day{computeDate(data.date) > 1 ? "s":" "}</Subheading>
            {data.date[0] && <Paragraph>Monday</Paragraph>}
            {data.date[1] && <Paragraph>Tuesday</Paragraph>}
            {data.date[2] && <Paragraph>Wednesday</Paragraph>}
            {data.date[3] && <Paragraph>Thursday</Paragraph>}
            {data.date[4] && <Paragraph>Friday</Paragraph>}
            {data.date[5] && <Paragraph>Saturday</Paragraph>}
            {data.date[6] && <Paragraph>Sunday</Paragraph>}
          </View>
        </View>


        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", alignSelf:"stretch"}}>
          <Button  icon="arrow-left" disabled>Pass</Button>
         
          <Button icon="arrow-right" contentStyle={{flexDirection:"row-reverse" }} disabled>Like</Button>
        </View>
      </View>
    )
  }

  
  const { user } = useContext(UserContext);
  const [swipedAll, setSwipedAll] = useState(false);
  const [buddies, setBuddies] = useState(null);   // array of potential buddy DOCUMENTS

  // Does not have a listener! One time use
  useEffect(() => {
    getAllPotentialBuddies(user)
      .then(docArray => setBuddies(docArray))
  }, []);

  function handleSwipeLeft(cardIndex) {
    const other = buddies[cardIndex];
    Match.addPassUser(user.uid, other.id).then(console.log);
  }

  async function handleSwipeRight(cardIndex) {
    const other = buddies[cardIndex];
    const otherData = other.data();
    if (!otherData.like.includes(user.uid)) {
      Match.addLikeUser(user.uid, other.id).then(console.log);
    } else {    // mutual like
      await Promise.all([
        Match.removeLikeUser(other.id, user.uid),
        Match.addBuddy(user.uid, other.id),
        Match.addBuddy(other.id, user.uid)
      ]);
      // create chat with new buddy
      const chatCreated = await createChatBetween(user, other);
      if (chatCreated) {
        showMessage({
          message: `It's a match!\nYou and ${otherData.name} are now buddies 🎉 `,
          type: "success",
          duration: 4000,
          floating: true,
          icon: "auto"
        });
      } else {
        throw new Error("Failed to create new chat");
      }
    }
  }

  // to be put in a separate file
  const createChatBetween = async (user, newBuddy) => {
    const [u1, u2] = [user.uid, newBuddy.id];
    const [n1, n2] = [user.displayName, newBuddy.data().name];
    let chatID, chatName;
    if (u1 < u2) {
      chatID = `${u1}_${u2}`;
      chatName = `${n1}_${n2}`;
    } else {
      chatID = `${u2}_${u1}`;
      chatName = `${n2}_${n1}`;
    }
    const announcement = {    // system message
      text: "You matched with a new buddy!",
      createdAt: new Date().getTime(),
      system: true,
    };
    try {
      await Promise.all([
        // set last message as the system message
        firebase.firestore().collection("chats")
          .doc(chatID)
          .set({
            lastMessage: {
              ...announcement,
              // user: { _id: newBuddy.id, name: newBuddy.name }
            },
            members: [u1, u2],
            avatarURL: {[u1]: user.photoURL, [u2]: newBuddy.data().photoURL},
            name: chatName,
            isActive: true
          }, {merge: true}),
        // initialize message history with the system message
        firebase.firestore().collection("chats")
          .doc(chatID)
          .collection("messages")
          .add(announcement)
      ]);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Screen style={styles.container}>
      {buddies == null ? <ActivityIndicator/>
        : (buddies.length === 0 || swipedAll)
          ? <Image style={{width: 250, height: 270}} source={require("../../assets/business_cat.png")}/>
          : <Swiper
            verticalSwipe={false}
            cards={buddies}
            renderCard={renderCard}
            // onSwipedLeft={handleSwipeLeft}
            onSwipedRight={handleSwipeRight}
            onSwipedAll={() => setSwipedAll(true)}
            cardIndex={0}
            backgroundColor={colorConst.backgroundCard}
            stackSize= {3}
            // marginBottom={30}
            // style={{cardVer}}
        >
        </Swiper>
      }

    </Screen>
  ) 
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  title: {
    fontSize: 30,
    paddingTop: 30,
    color:"#05668D"
  },
  card: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 2,
    // borderColor: "#E8E8E8",
    justifyContent: "space-around",
    alignItems:"center",
    backgroundColor: colorConst.background,
    padding:20
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});