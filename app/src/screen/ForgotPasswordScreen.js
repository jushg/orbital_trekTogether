import React, { useState } from 'react';
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import {showMessage} from "react-native-flash-message";

import Screen from "../component/screen"
import TextBox from '../component/textbox';
import * as Auth from "../../utils/auth"
import image from "../../assets/app-icon.png"

export default ({ navigation }) => {
  const [email,setEmail] = useState("");
 
  const handleResetPassword = () =>{
    Auth.resetPassword(
      {email},
      () => {
        console.log('Password reset email sent successfully')
        navigation.navigate("Login")
      },
      (error) => {
        console.error(error);
        showMessage({
          "message": "Unable to reset your password.\nEmail may be incorrect.",
          type: "danger", icon: "auto", floating: true
        });
      }
    )
  }
  return (
    <Screen style={styles.container} >
        <ScrollView contentContainerStyle={{justifyContent:"center", alignItems:"center"}}>       
            <Image source={image} style={{ width: 305, height: 250 }}/>
            <TextBox
            label="Email"
            placeholder="johndoe@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={{marginBottom:10}}
            left={<TextInput.Icon name="email"/>}
            autoCapitalize="none"
            />
            <Button
            mode="contained"
            style={styles.loginBtn}
            onPress={handleResetPassword}
            >Reset Password
            </Button> 
        </ScrollView>
        

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: '2%'
  },
  title: {
    fontSize: 40,
    paddingBottom: 30,
  },
  loginBtn: {
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10
  },
  
});

