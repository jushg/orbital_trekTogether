import React, { useState } from 'react'
import { Button, Avatar } from "react-native-paper"
import Swiper from "react-native-deck-swiper"
import { StyleSheet, Text, View, Pressable } from 'react-native'


import Screen from "../component/screen"

//https://callstack.github.io/react-native-paper/avatar-image.html
export default ({navigation}) => {
  
  //This item include (User Info)
  const renderCard = ({item}) => {
    return(
      <View style={styles.card}>
        <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
        <Text style={{paddingHorizontal: 10, fontSize: 25}}>User</Text>
      </View>
    )
  }
  return (
    <Screen style={styles.container}>
        <Swiper
            cards={['1', '2', '3', '4', '5', '6', '7']}
            renderCard={renderCard}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize= {3}>
             {/* <Button
                onPress={() => {console.log('oulala')}}
                title="Press me">
                You can press me
            </Button> */}
        </Swiper>
       
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