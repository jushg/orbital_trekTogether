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
        <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
        
        <Headline>{data.name}, {data.age}</Headline>
        <Caption>Level {data.level}</Caption>
        <View style={{alignItems:"baseline", alignSelf:"stretch"}}>
          <Paragraph>Some nice things to say about myself</Paragraph>
        </View>
        </View>
       
        
        <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"flex-start"}}>
          <View style={{flex:1, alignItems:"center"}}>
            <Subheading>Destination</Subheading>
            <Text>{data.place}</Text>
            <Text>{data.place}</Text>
            <Text>{data.place}</Text>
            <Text>{data.place}</Text>
            <Text>{data.place}</Text>
            <Text>{data.place}</Text>
            <Text>{data.place}</Text>
            
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{flex:1 , alignItems:"center"}}>
          {/* <Subheading>Availability</Subheading> */}
          <Subheading>{computeDate(data.date)} free day{computeDate(data.date) > 1 ? "s":" "}</Subheading>
            {/* <Text>{computeDate(data.date)} free day{computeDate(data.date) > 1 ? "s":" "}</Text> */}
            {data.date[0] && <Text>Monday</Text>}
            {data.date[1] && <Text>Tuesday</Text>}
            {data.date[2] && <Text>Wednesday</Text>}
            {data.date[3] && <Text>Thursday</Text>}
            {data.date[4] && <Text>Friday</Text>}
            {data.date[5] && <Text>Saturday</Text>}
            {data.date[6] && <Text>Sunday</Text>}
          </View>
        </View>


        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", alignSelf:"stretch"}}>
          <Button icon="arrow-left">Pass</Button>
         
          <Button icon="arrow-right" contentStyle={{flexDirection:"row-reverse"}}>Like</Button>
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