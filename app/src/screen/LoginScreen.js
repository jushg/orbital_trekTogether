import React, { useState } from 'react';
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { CommonActions } from "@react-navigation/native"
import { useDispatch } from 'react-redux';

import Screen from "../component/screen"
import * as Auth from "../../utils/auth"
import * as AuthCommons from "../../utils/context"
import image from "../../assets/new_icon.png"
import {showMessage} from "react-native-flash-message";


export default ({ navigation }) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordVisible,setPasswordVisible] = useState(true);
  
  const handleLoginEmail = () =>{
    Auth.loginEmail(
      {email,password},
      (user) => {
        user.photoURL ? 
        console.log(user.displayName + " has logged in") 
        : navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{
            name: "Setup",  // params: { name: user.displayName }
          }]
        }))  
      },
      (error) => {
        console.error(error);
        showMessage({
          "message": "Unable to log in.\nEmail or Password may be incorrect.",
          type: "danger", icon: "auto", floating: true
        });
      }
    )
  }
  return (
    <Screen style={styles.container} >
      <ScrollView>

      <View style={{justifyContent:"center", alignItems:"center"}}>
      <Image source={image} style={{ width: 305, height: 300 }}/>
        {/* <Text style = {styles.title}>TrekTogether</Text> */}

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
        style={styles.loginBtn}
        onPress={handleLoginEmail}
        >Log In
        </Button>

        <View style= {{flexDirection:"row", justifyContent:"center"}}>
          <Pressable onPress={() => {}}>
            <Text
              style={styles.forgotPassword}
              onPress={() => navigation.navigate("Sign Up")}>
              Forgot password?
            </Text>
          </Pressable>
        </View>
          

          
        <View style= {{flexDirection:"row", justifyContent:"center"}}>
          <Text style={{fontSize:16}}>Don't have an account?  </Text>
          <Pressable onPress={() => {}}>
            <Text
              style={{fontSize:16, textDecorationLine: "underline"}}
              onPress={() => navigation.navigate("Sign Up")}>
              Sign Up
            </Text>
          </Pressable>
        </View>
          </View>  
      </ScrollView>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-start"
  },
  title: {
    fontSize: 40,
    paddingBottom: 30,
  },
  loginBtn: {
    width:"35%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10
  },
  forgotPassword: {
    marginBottom: 50,
    marginTop: 20,
    fontStyle:"italic",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

