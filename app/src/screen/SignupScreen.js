import React, { useState } from "react"
import Screen from "../component/screen"
import {StyleSheet,Text, View} from "react-native"
import {Button, TextInput} from "react-native-paper"
import * as Auth from "../../api/auth"

 const SignupScreen = ({navigation}) =>{
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("");
    const [passwordVisible,setPasswordVisible] = useState(true);

    const handleSignup = () =>{

        Auth.createAccount(
            {email,username,password},
            (user) => {
            return console.log(user)
            },

            (error) => {
            return console.error(error)
            }
        )
    }

    return (
        <Screen style ={styles.container}>
           
                <Button 
                mode="flat" 
                icon="arrow-left"
                color="black"
                compact="true"
                style={{marginTop: 20,marginBottom:10, width:"20%"}}
                onPress={() => navigation.navigate('Login')}>
                Back
                </Button>
               
                
            
            <View style={{ justifyContent:"center", alignItems:"center"}}>
                <Text style = {styles.title}> TrekTogether</Text>
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
                onPress={() => navigation.navigate('Main')}
                >
                    Sign Up
                </Button>
                
            </View>
            
            
        </Screen>
    )
}



const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingTop: 30,
        paddingBottom: 30,
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
        justifyContent:"flex-start"
    },
  });

export default SignupScreen