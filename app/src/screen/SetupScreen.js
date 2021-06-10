import React, {useState}  from 'react';
import { StyleSheet,Text, Image, View, ScrollView} from 'react-native'
import {Button, TextInput} from "react-native-paper"
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"

//This screen is use for setup user personal info
//https://callstack.github.io/react-native-paper/chip.html

export default ({navigation}) => {
  const [age,setAge] = useState("")
  const [job,setJob] = useState("")
  const [intro,setIntro] = useState("")
  const [hobby,setHobby] = useState("")
  const [place,setPlace] = useState("")
  const [time,setTime] = useState("")
  return (
    <Screen style={styles.container}>
 
      <Image source={require("../../assets/stolen_icon.jpg")} style={{width: "90%", height:"45%"}}/>
      <TextInput
        label="Age"
        placeholder="21"
        keyboardType="numeric"
        mode="contained"
        value={age}
        onChangeText={setAge}
        style={{marginBottom:10, width:"95%"}}
        // left={<TextInput.Icon name="email"/>}
        />
      <Button
        mode="contained"
        onPress={ () => navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
              name: "Home",
              // params: { name: user.displayName }
              }]
            })
            )
        }
        style={styles.button}
      >Get Started
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