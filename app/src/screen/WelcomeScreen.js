import React  from 'react';
import { StyleSheet,Text, Image } from 'react-native'
import {Button } from "react-native-paper"
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"


export default ({navigation}) => {
  return (
    <Screen style={styles.container}>
      <Image source={require("../../assets/stolen_icon.jpg")} style={{width: "90%", height:"45%"}}/>
       <Text style = {styles.title}>Welcome [USER] </Text>
      <Button
        mode="contained"
        onPress={ () => navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
              name: "Setup",
              // params: { name: user.displayName }
              }]
            })
            )
        }
        style={styles.button}
      >Start your journey here
      </Button>
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
    // width:"70%",
    // borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    // backgroundColor:"#028090",
  },
  container: {
    flex: 1,
    flexDirection:"column",
    alignItems: "center",
    justifyContent: 'center',
  },
});