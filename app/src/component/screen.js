import React from "react"
import {  SafeAreaView, Platform, StatusBar } from 'react-native';

const Screen = (props) =>{
    const paddingValue = Platform.OS ==="android" ? StatusBar.currentHeight:0;
    return (
        <SafeAreaView style = {{paddingTop : paddingValue}}>
            {props.children}
        </SafeAreaView>
    );
}


export default Screen;