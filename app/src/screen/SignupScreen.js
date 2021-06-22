import React, { useState } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"
import * as Auth from "../../utils/auth"
import image from "../../assets/new_icon.png"

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
        return console.error(error)
      }
    )
  }

    return (
      <Screen style ={styles.container} >
        {/* <Button
          mode="flat"
          icon="arrow-left"
          color="black"
          compact="true"
          style={{marginBottom:10, width:"20%"}}
          onPress={() => navigation.navigate('Login')}>
          Back
        </Button> */}

        <View style={{ justifyContent:"center", alignItems:"center"}}>
          <Image source={image} style={{ width: 305, height: 220 }}/>
          <Text style = {styles.title}> Create new account</Text>
          <TextInput
          label="Email"
          placeholder="johndoe@gmail.com"
          keyboardType="email-address"
          mode="contained"
          value={email}
          onChangeText={setEmail}
          style={{marginBottom:10, width:"95%"}}
          left={<TextInput.Icon name="email"/>}
          autoCapitalize="none"
          />

          <TextInput
          label="Full Name"
          placeholder="John Doe"
          value={username}
          autoCapitalize="words"
          onChangeText={setUsername}
          left={<TextInput.Icon name="human-male"/>}
          style={{marginBottom:10, width:"95%"}}
          />

          <TextInput
          label="Password"
          placeholder="123456"
          mode="contained"
          value={password}
          onChangeText={setPassword}
          secureTextEntry = {passwordVisible}
          left={<TextInput.Icon name="lock"/>}
          right={<TextInput.Icon name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible((state) => !state)} />}
          style={{marginBottom:10, width:"95%"}}
          autoCapitalize="none"
          />
          <Button
          mode="contained"
          style={styles.signupBtn}
          onPress={handleSignup}
          >Sign Up
          </Button>
        </View>
      </Screen>
    )
}



const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 30,
    color:"#05668D"
  },
  signupBtn: {
    width:"35%",
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
  },
  container: {
    flex:1,
    flexDirection:"column",
    backgroundColor:"white",
    justifyContent:"flex-start"
  },
});

