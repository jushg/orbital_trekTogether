import React, {useContext, useEffect, useState} from 'react';
import { Button, Avatar, Title, Paragraph, ActivityIndicator } from "react-native-paper"
import Swiper from "react-native-deck-swiper"
import { StyleSheet, Text, View, Pressable } from 'react-native'


import Screen from "../component/screen"
import { getAllPotentialBuddies } from "../../utils/computeBuddy";
import {UserContext} from "../feature/auth";


export default ({navigation}) => {
  
  //This item include (User Info)
  const renderCard = (doc) => {
    const data = doc.data();
    console.log("Item is " + data.email);
    return(
      <View style={styles.card}>
        <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
        
        <Text style={{ fontSize:20 }}>User, Age</Text>
        <Text>Beginner</Text>
        <Text>{data.email}</Text>
        <View style={{alignItems:"baseline", alignSelf:"stretch", paddingHorizontal: 10}}>
          <Paragraph>Say something nice ...</Paragraph>
          <Title>Preferred Destination</Title>

          <Title>Availability</Title>
        </View>
      </View>
    )
  }

  const { user, _ } = useContext(UserContext);

  const [buddies, setBuddies] = useState(null);
  let index = 0;

  useEffect(() => {
    getAllPotentialBuddies(user)
      .then(docArray => setBuddies(docArray))
  }, []);

  return (
    <Screen style={styles.container}>
      {buddies == null ? <ActivityIndicator/> :
        <Swiper
          verticalSwipe={false}
            cards={buddies}
          // cards={['1', '2', '3', '4', '5', '6']}
            renderCard={renderCard}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {index += 10;}}
            cardIndex={0}
            backgroundColor={'lightblue'}
            // stackSize= {3}
        >
        </Swiper>
      }
      {/* <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
        <Text style={{paddingHorizontal: 10, fontSize: 25}}>User</Text>
        <View style={{alignItems:"baseline"}}>
        <Text>Say something nice ...</Text>
       
        <Text>Preferred Place and Time</Text>
        </View> */}
       
    </Screen>
  ) 
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 30,
    paddingTop: 30,
    color:"#05668D"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});