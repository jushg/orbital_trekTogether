import React, {useContext, useEffect, useState} from 'react';
import { Avatar, Paragraph, ActivityIndicator, Subheading ,Headline, Caption, IconButton, Button } from "react-native-paper"
import Swiper from "react-native-deck-swiper"
import { StyleSheet, Text, View} from 'react-native'


import Screen from "../component/screen"
import { getAllPotentialBuddies } from "../../utils/computeBuddy";
import { getUserData } from '../../utils/match';
import {UserContext} from "../feature/auth";


export default ({navigation}) => {
  
  //This item include (User Info)
  const renderCard = (doc) => {
    const data = doc.data();
    console.log("Item is " + data.email);
    return(
      <View style={styles.card}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        {data.photoURL && <Avatar.Image size={90} source={{uri : data.photoURL} } />}
        {!data.photoURL && <Avatar.Image size={90} source={require("../../assets/pain.jpg")} />}
        
        <Headline>{data.name}, {data.age}</Headline>
        {data.level == 1 && <Caption style={{fontSize:15}}>Beginner</Caption>}
        {data.level == 2 && <Caption style={{fontSize:15}}>Intermediate</Caption>}
        {data.level == 3 && <Caption style={{fontSize:15}}>Advanced</Caption>}
        <View style={{alignItems:"baseline", alignSelf:"stretch"}}>
          <Paragraph>Some nice things to say about myself</Paragraph>
        </View>
        </View>
       
        
        <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"flex-start"}}>
          <View style={{flex:1, alignItems:"center"}}>
            <Subheading>Destination</Subheading>
            <Paragraph>{data.place}</Paragraph>
          
            
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{flex:1 , alignItems:"center"}}>
          <Subheading>{computeDate(data.date)} free day{computeDate(data.date) > 1 ? "s":" "}</Subheading>
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
          <Button  icon="arrow-left" col>Pass</Button>
         
          <Button icon="arrow-right" contentStyle={{flexDirection:"row-reverse" }}>Like</Button>
        </View>
      </View>
    )
  }

  
  const { user, _ } = useContext(UserContext);


  const computeDate = (date) => {
    let value = 0;
    for (let index = 0; index < date.length; index++) {
      if(date[index]) value += 1;   
    }
    return value;
  }
  let index = 0;
  const [buddies, setBuddies] = useState(null);

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
            renderCard={renderCard}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {index += 10;}}
            cardIndex={0}
            backgroundColor={'white'}
            stackSize= {3}
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
    borderColor: "#E8E8E8",
    justifyContent: "space-around",
    alignItems:"center",
    backgroundColor: "aquamarine",
    padding:20
  },
  verticleLine: {
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