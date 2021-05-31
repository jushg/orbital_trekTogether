import React from "react"
import { StatusBar,FlatList,ScrollView ,StyleSheet } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context"

export default (props) =>{
    // return (
    //         <SafeAreaView style = {{paddingTop : StatusBar.currentHeight, ...props.style}}>
    //             {props.children}
    //         </SafeAreaView>
    //     );
    if (props.scrollable) {
        return (
          <SafeAreaView style={{
            paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
            ...props.style
          }} {...props}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
              keyboardShouldPersistTaps="always"
            >
              {props.children}
            </ScrollView>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={{
            paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
            paddingBottom: 20,
            paddingHorizontal: 20,
            ...props.style
          }} {...props}>
              {props.children}
          </SafeAreaView>
        );
      }
}


