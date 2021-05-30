import React ,{useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import { StyleSheet,Text, View, Pressable} from 'react-native';
import { CommonActions } from "@react-navigation/native";


import Screen from "../component/screen"
import * as Auth from "../../api/auth"



export default ({ navigation }) =>{
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
    <Screen style={styles.container}  >
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <Text style = {styles.title}>TrekTogether</Text>

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

          <Text style={styles.forgotPassword}>Forgot password?</Text>

          
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
      // backgroundColor: '#F0F3BD',  
      justifyContent:"flex-start"
    },
    title: {
      fontSize: 30,
      paddingTop: 30,
      paddingBottom: 30,
      color:"#05668D"
    },
    loginBtn: {
      // width:"90%",
      // borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      // backgroundColor:"#02C39A",
    },
    forgotPassword: {
      marginBottom: 40,
      marginTop: 10,
      fontStyle:"italic",
      fontSize: 16,
      textDecorationLine: "underline",
    },
  });

