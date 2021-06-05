import React ,{useState} from 'react';
import { StyleSheet,Text, View, Pressable} from 'react-native';
import Screen from "../component/screen"

export default ({navigation}) => {
    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>Explore and Plan</Text>
            <Text>Search for routes and plan new trips here</Text> 
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