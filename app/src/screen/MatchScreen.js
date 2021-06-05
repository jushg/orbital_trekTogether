import React, { useState } from 'react'
import { Button, TextInput } from "react-native-paper"
import { StyleSheet, Text, View, Pressable } from 'react-native'


import Screen from "../component/screen"

//https://callstack.github.io/react-native-paper/avatar-image.html
export default ({navigation}) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Buddy Matching</Text>
      <Text>Your potential buddy's profile will appear here</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
    color:"#05668D"
  },
  button: {
    width:"70%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    backgroundColor:"#028090",
  },
  container: {
    flex: 1,
    flexDirection:"column",
    // backgroundColor: '#F0F3BD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});