import React, {useContext, useEffect, useState} from 'react';
import { Avatar, Paragraph, ActivityIndicator, Subheading ,Headline, Caption, IconButton, Button } from "react-native-paper"
import Swiper from "react-native-deck-swiper"
import {Image, StyleSheet, View} from 'react-native';
import { showMessage } from "react-native-flash-message";

import Screen from "../component/screen"
import { getAllPotentialBuddies } from "../../utils/computeBuddy";
import * as Match from '../../utils/match';
import {UserContext} from "../../utils/context";
import * as Notifications from "../../utils/notifications";
import colorConst from '../constant/color';


export default ({navigation}) => {

  const { user } = useContext(UserContext);
  const [swipedAll, setSwipedAll] = useState(false);
  const [buddies, setBuddies] = useState(null);   // array of potential buddy DOCUMENTS

  useEffect(() => {
    const setUpPushNotifications = async () => {
      await Notifications.registerForPushNotificationsAsync(user);
      Notifications.setForegroundNotificationHandler();
    };
    setUpPushNotifications();
  }, []);

  useEffect(() => {
    getAllPotentialBuddies(user)
      .then(docArray => setBuddies(docArray))
  }, []);

  const computeDate = (date) => {
    let value = 0;
    for (let index = 0; index < date.length; index++) {
      if (date[index]) value += 1;
    }
    return value;
  }

  const renderCard = (doc) => {
    const data = doc.data();
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
          <View style={styles.verticalLine} />
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

  function handleSwipeLeft(cardIndex) {
    const other = buddies[cardIndex];
    Match.addPassUser(user.uid, other.id);
  }

  async function handleSwipeRight(cardIndex) {
    const other = buddies[cardIndex];
    const otherData = other.data();
    if (!otherData.like.includes(user.uid)) {
      Match.addLikeUser(user.uid, other.id);
    } else {    // mutual like
      await Promise.all([
        Match.removeLikeUser(other.id, user.uid),
        Match.addBuddy(user.uid, other.id),
        Match.addBuddy(other.id, user.uid)
      ]);
      const chatCreated = await Match.createChatBetween(user, other);
      if (chatCreated) {
        Notifications.sendNewMatchNotification(other.id, user.displayName);
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

  return (
    <Screen style={styles.container}>
      {buddies == null ? <ActivityIndicator/>
        : (buddies.length === 0 || swipedAll)
          ? <Image style={{width: 250, height: 270}} source={require("../../assets/business_cat.png")}/>
          :
          <Swiper
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
          />
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
    borderWidth: 1,
    justifyContent: "space-around",
    alignItems:"center",
    backgroundColor: colorConst.background,
    padding:20,
    elevation:5
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
