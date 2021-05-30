import React from "react"
import { StatusBar,FlatList,ScrollView ,StyleSheet } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context"

export default (props) =>{
    return (
            <SafeAreaView style = {{paddingTop : StatusBar.currentHeight, ...props.style}}>
                {props.children}
            </SafeAreaView>
        );
    
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
        // backgroundColor: '#F0F3BD',
        justifyContent:"flex-start"
    },
  });
// export default Screen;