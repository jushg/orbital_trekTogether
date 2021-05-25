import React from "react"
import Screen from "../component/screen"
import {StyleSheet,Text} from "react-native"
import {Button} from "react-native-paper"

const SignupScreen = () =>{
    return (
        <Screen style={styles.container}>
            <Text style = {styles.title}> TrekTogether</Text>
            <Text style={{marginTop:10}}>Placeholder for Email</Text>
            <Text style={{marginTop:10}}>Placeholder for Username</Text>
            <Text style={{marginTop:10}}>Placeholder for Password</Text>
            <Text style={{marginTop:10}}>Placeholder for Comfirm Password</Text>
            <Button mode="contained" style={styles.signupBtn}>
                Sign Up
            </Button>
        </Screen>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingTop: 30,
        color:"#05668D"
    },
    signupBtn: {
        width:"30%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#02C39A",
        
    },
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#F0F3BD',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SignupScreen;