import React from "react"
import { StatusBar } from 'react-native';
import {SafeAreaView } from "react-native-safe-area-context"

export default (props) => {
  return (
    <SafeAreaView style={{
      paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
      ...props.style
    }} {...props}>
        {props.children}
    </SafeAreaView>
  );
}


