import React from "react"
import {  SafeAreaView, Platform, StatusBar } from 'react-native';

const Screen = (props) =>{
    return (
        <SafeAreaView style = {{paddingTop : StatusBar.currentHeight, ...props.style}}>
            {props.children}
        </SafeAreaView>
    );
}


export default Screen;