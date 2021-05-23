import React from 'react';
import { StyleSheet,  Text, View,  } from 'react-native';
import Screen from "../component/screen"
const LoginScreen = () =>{

    return (
       <Screen>
           <View style = {styles.container}>
                <Text> This is the login screen</Text>
                <Text> USe Firebase to make this work</Text>
            </View>
       </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LoginScreen;