import React ,{useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import { StyleSheet,Text, View} from 'react-native';
import Screen from "../component/screen"

import * as Auth from "../../api/auth"
const LoginScreen = ({ navigation }) =>{
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [passwordVisible,setPasswordVisible] = useState(true);
  const handleLoginEmail = () =>{

    Auth.loginEmail(
        {email,password},
        (user) => {
        return console.log(user)
        },

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
          <Text style={styles.signUp}>- Don't have an account ? -</Text>
          
          <Button 
          mode="contained" 
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Signup")}
          >Creat new account
          </Button>

          <Text style={styles.otherLogin}>- Or log in with -</Text>

        </View>
        
        <View style= {{flexDirection:"row", justifyContent:"center"}}>
          <Button 
            mode="contained" 
            color="blue"
            compact="true"
            >Facebook
            </Button> 

          <Text>  </Text>
          
          <Button 
            mode="contained" 
            color="red"
            compact="true"
            >Google
          </Button> 
        </View>
   
      
      
  </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F0F3BD',  
      justifyContent:"flex-start",
      
    },
    title: {
      fontSize: 30,
      paddingTop: 30,
      paddingBottom: 30,
      color:"#05668D"
    },
    loginBtn: {
      width:"90%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      backgroundColor:"#02C39A",
    },
    forgotPassword: {
      marginBottom: 20,
      marginTop: 10,
      fontStyle:"italic",
      fontSize: 16,
      textDecorationLine: "underline",
    },
    signUp: {
      fontSize: 16,
      fontStyle:"italic",
      marginTop:100, 
      marginBottom:5
    },
    otherLogin: {
      fontSize: 16,
      fontStyle:"italic",
      marginTop:5, 
      marginBottom:10
    }
  });

export default LoginScreen;