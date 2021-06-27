import React, {useContext, useState} from 'react';
import { Button, Checkbox, Avatar, Headline, Caption } from "react-native-paper"
import { StyleSheet,Text, View } from 'react-native'

import Screen from "../component/screen"
import * as Auth from "../../utils/auth"
import {UserContext} from "../../utils/context";

//https://callstack.github.io/react-native-paper/checkbox.html
//https://callstack.github.io/react-native-paper/switch.html
//https://callstack.github.io/react-native-paper/toggle-button.html

export default ({navigation}) => {
  const [checked1, setChecked1] = useState(true) 
  const [checked2, setChecked2] = useState(false) //example

  const handleLogout = () => {
    Auth.logout(
      () => {return console.log("logout")},
      (error) => {
        return console.error(error)
      }
    )
  }

  // const userApi = useContext(UserContext);

  return (
    <Screen style={styles.container}>
      <View style={{alignItems:"center"}}>
        <Headline >Customization</Headline>
        <Caption>Under Development</Caption>
        <Avatar.Image
          size={90}
          source={{ uri: Auth.getCurrentUser().photoURL }}
        />
        <Text>{Auth.getCurrentUser().displayName}</Text>
        <Button disabled>Change Your Profile</Button>
      </View>
      
      {/* <Checkbox.Item
        label="Under Development"
        status={checked1 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked1(!checked1);
        }}
      /> */}
      {/* <Checkbox.Item
        label="Under Development"
        status={checked2 ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked2(!checked2);
        }}
      /> */}
      <Button onPress={handleLogout} style={styles.button}>Log Out</Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 30,
  },
  button: {
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});