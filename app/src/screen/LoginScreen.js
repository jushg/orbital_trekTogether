import React from 'react';
import {Button} from "react-native-paper";
import { StyleSheet,Text} from 'react-native';
import Screen from "../component/screen"
import { NavigationContainer } from '@react-navigation/native';
const LoginScreen = () =>{

    return (
      <Screen style={styles.container}>
        <Text style = {styles.title}> TrekTogether</Text>  
        <Text style={{marginTop:10}}>Placeholder for Username</Text>
        <Text style={{marginTop:10}}>Placeholder for Password</Text>
      <Button 
      mode="contained" 
      style={styles.loginBtn}
      >
          Log In
      </Button>
  </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#F0F3BD',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      paddingTop: 30,
      color:"#05668D"
    },
    loginBtn: {
      width:"30%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      backgroundColor:"#02C39A",
    },
  });

export default LoginScreen;