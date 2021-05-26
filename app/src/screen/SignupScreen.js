import React, { useState } from "react"
import Screen from "../component/screen"
import {StyleSheet,Text, View} from "react-native"
import {Button, TextInput} from "react-native-paper"

const SignupScreen = () =>{
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("");
    const [passwordVisible,setPasswordVisible] = useState(false);

    return (
        <Screen style ={styles.container}>
            <View style={{flex:2, backgroundColor:"red", justifyContent:"center", alignItems:"center"}}>
                <Text style = {styles.title}> TrekTogether</Text>
            </View>
            <View style={{flex:7, justifyContent:"center", alignItems:"center"}}>
                <TextInput 
                label="Email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChangeText={setEmail}
                style={{marginBottom:10, width:"90%"}}
                autoCapitalize="none"
                />
            
                <TextInput 
                label="Full Name"
                placeholder="John Doe"
                value={username}
                autoCapitalize="words"
                onChangeText={setUsername}
                style={{marginBottom:10, width:"90%"}}
                />

                <TextInput 
                label="Password"
                placeholder="123456"
                value={password}
                onChangeText={setPassword}
                secureTextEntry = {passwordVisible}
                right={<TextInput.Icon name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible((state) => !state)} />}
                style={{marginBottom:10, width:"90%"}}
                autoCapitalize="none"
                />

                <Button mode="contained" style={styles.signupBtn}>
                    Sign Up
                </Button>
                
            </View>
            <View style={{flex:1,backgroundColor:"cyan"}}>
                
            </View>   
            <View style={{flex:1,backgroundColor:"cyan"}}>

            </View>    
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
        width:"90%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#02C39A",
        
    },
    container: {
        flex:1,
      flexDirection:"column",
      backgroundColor: '#F0F3BD',

    },
  });

export default SignupScreen;