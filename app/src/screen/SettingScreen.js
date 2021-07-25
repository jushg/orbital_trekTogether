import React, {useContext, useState} from 'react';
import { Button, Checkbox, Avatar, Headline, Caption, Subheading } from "react-native-paper"
import { StyleSheet,Text, View } from 'react-native'

import Screen from "../component/screen"
import * as Auth from "../../utils/auth"
import {UserContext} from "../../utils/context";

//https://callstack.github.io/react-native-paper/checkbox.html
//https://callstack.github.io/react-native-paper/switch.html
//https://callstack.github.io/react-native-paper/toggle-button.html

export default ({navigation}) => {

  const handleLogout = () => {
    Auth.logout(
      () => {return console.log("logout")},
      (error) => {
        return console.error(error)
      }
    )
  }

  const handleEditProfile = () => navigation.navigate("Edit Profile");

  return (
    <Screen style={styles.container}>
      <View style={{alignItems:"center", alignSelf: "stretch"}}>
        <Avatar.Image
          size={100}
          source={{ uri: Auth.getCurrentUser().photoURL }}
        />
        <Subheading style={{fontWeight:"bold"}}>{Auth.getCurrentUser().displayName}</Subheading>
        <Button
          onPress={handleEditProfile}
          mode="contained"
          style={styles.button}
        >
          Edit Profile
        </Button>
        {/*<Caption>Under Development</Caption>*/}
        <Button onPress={handleLogout} style={styles.button} mode="contained">Log Out</Button>
      </View>
      
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
  },
  button: {
    width:"50%",
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
});