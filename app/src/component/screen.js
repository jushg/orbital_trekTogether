import React from "react"
import {  SafeAreaView, StatusBar,FlatList,ScrollView } from 'react-native';

const Screen = (props) =>{
    return (
            <SafeAreaView style = {{paddingTop : StatusBar.currentHeight, ...props.style}}>
                {props.children}
            </SafeAreaView>
        );
    
}


export default Screen;