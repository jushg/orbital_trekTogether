import React, { useState } from 'react';
import { Button, TextInpu } from "react-native-paper";
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { CommonActions } from "@react-navigation/native"


import Screen from "../component/screen"
import * as Auth from "../../api/auth"
import image from "../../assets/new_icon.png"


export default ({ navigation }) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordVisible,setPasswordVisible] = useState(true);
  const handleLoginEmail = () =>{
    Auth.loginEmail(
      {email,password},
      (user) => navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{
          name: "Home",
          // params: { name: user.displayName }
        }]
      })),
      (error) => {
        return console.error(error)
      }
    )
  }
  return (
    <Screen style={styles.container} scrollable >
        
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
              onPress={() => navigation.navigate("Signup")}>
              Forgot password?
            </Text>
          </Pressable>
        </View>
          

          
        <View style= {{flexDirection:"row", justifyContent:"center"}}>
          <Text style={{fontSize:16}}>Don't have an account?  </Text>
          <Pressable onPress={() => {}}>
            <Text
              style={{fontSize:16, textDecorationLine: "underline"}}
              onPress={() => navigation.navigate("Signup")}>
              Sign Up
            </Text>
          </Pressable>
        </View>
          </View>  

      {/* <Text style={styles.otherLogin}>- Or log in with -</Text>
        <View style= {{borderWidth: 5, borderColor: "red",flexDirection:"row", justifyContent:"center"}}>
          <Button 
            mode="contained" 
            //color="blue"
            compact="true"
            >Facebook
            </Button> 
          <Text>  </Text>
          <Button 
            mode="contained" 
            //color="red"
            compact="true"
            >Google
          </Button> 
        </View> */} 
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:"flex-start"
  },
  title: {
    fontSize: 40,
    // paddingTop: 30,
    paddingBottom: 30,
    color:"#05668D"
  },
  loginBtn: {
    width:"35%",
    // borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    // backgroundColor:"#02C39A",
  },
  forgotPassword: {
    marginBottom: 50,
    marginTop: 20,
    fontStyle:"italic",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

