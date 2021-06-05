import React  from 'react';
import {Button} from "react-native-paper";
import { StyleSheet,Text, View, StatusBar  } from 'react-native';

import Screen from "../component/screen"
export default ({navigation}) => {
    return (       
        <Screen style={styles.container}>
            <Text style={styles.title}>Setting Screen</Text>
            <Text>Change your user preferences and app settings here</Text>
            <Button onPress={() => navigation.navigate('Home')}>Home</Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingTop: 30,
        color:"#05668D"
    },
    button: {
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
    //   backgroundColor: '#F0F3BD',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });