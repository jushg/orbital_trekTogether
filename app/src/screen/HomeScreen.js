import React from 'react';
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from 'react-native';
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"
import * as Auth from "../../api/auth"

//https://callstack.github.io/react-native-paper/avatar-image.html

export default ({navigation}) => {
  const handleLogout = () => {
    Auth.logout(
      () => navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{
        name: "Login",
        // params: { name: user.displayName }
      }]
    })),
      (error) => {
        return console.error(error)
      }
    )
  }
  return (
    <Screen style={styles.container}>


      <View style={{flexDirection:"row", justifyContent:"space-around"}}>
        <Text style={styles.title}>Home Screen</Text>
        <Button
          onPress={() => navigation.navigate('Setting')}
          icon="cog"
          color="black"
          compact="true"
        >
        </Button>
      </View>

      <Button onPress={handleLogout}>Log Out</Button>
    </Screen>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 0,
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
  //   backgroundColor: '#F0F3BD',
  //   alignItems: 'center',
    justifyContent: 'flex-start',
  },
});