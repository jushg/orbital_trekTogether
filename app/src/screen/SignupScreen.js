import React, { useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"
import * as Auth from "../../utils/auth"
import image from "../../assets/new_icon.png"
import TextBox from '../component/textbox'
import {showMessage} from "react-native-flash-message";

export default ({navigation}) =>{
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("");
  const [passwordVisible,setPasswordVisible] = useState(true);

  const handleSignup = () =>{
    Auth.createAccount(
      {email,username,password},
      (user) => navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: "Welcome",
        }]
      })),
      (error) => {
        console.error(error);
        showMessage({
          "message": error.message,
          type: "danger", icon: "auto", floating: true
        });
      }
    )
  }

    return (
      <Screen style ={styles.container} >
        <ScrollView>
        <View style={{ justifyContent:"center", alignItems:"center"}}>
          <Image source={image} style={{ width: 305, height: 300 }}/>
          <TextBox
          label="Email"
          placeholder="johndoe@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{marginBottom:15}}
          left={<TextInput.Icon name="email"/>}
          autoCapitalize="none"
          />

          <TextBox
          label="Full Name"
          placeholder="John Doe"
          value={username}
          autoCapitalize="words"
          onChangeText={setUsername}
          left={<TextInput.Icon name="human-male"/>}
          style={{marginBottom:15}}
          />

          <TextBox
          label="Password"
          placeholder="123456"
          value={password}
          onChangeText={setPassword}
          secureTextEntry = {passwordVisible}
          left={<TextInput.Icon name="lock"/>}
          right={<TextInput.Icon name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible((state) => !state)} />}
          style={{marginBottom:10}}
          autoCapitalize="none"
          />
          <Button
          mode="contained"
          style={styles.signupBtn}
          onPress={handleSignup}
          >Sign Up
          </Button>
        </View>
        </ScrollView>
      </Screen>
    )
}



const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  signupBtn: {
    width:"40%",
    height:50,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  container: {
    flex:1,
    padding: 10,
    flexDirection:"column",
    justifyContent:"flex-start"
  },
});

