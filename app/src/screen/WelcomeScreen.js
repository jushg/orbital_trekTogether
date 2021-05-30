import React from 'react';
import { Button} from "react-native-paper";
import { StyleSheet,  Text,  } from 'react-native';
import Screen from "../component/screen"
const WelcomeScreen = ({ navigation }) =>{
    return (
       <Screen style = {styles.container}>
            <Text style = {styles.title}> TrekTogether</Text>
            <Text>Discover Singapore 2021</Text>
            
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={styles.loginBtn}   
            >Get Started
            </Button>
           
       </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingTop: 30,
        color:"#05668D"
    },
    signupBtn: {
        width:"70%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#02C39A",
    },

    loginBtn: {
        width:"70%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#028090",
    },
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#F0F3BD',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default WelcomeScreen;