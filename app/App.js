import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./src/screen/LoginScreen"
import HomeScreen from "./src/screen/HomeScreen"
import ViewProfileScreen from "./src/screen/ViewProfileScreen"

export default function App() {
  //Need to implement a reusable screen component
    //Need a logo design 
    //Need to have a constant Color Theme for all components
    //Add navigation routes
  return (
    <PaperProvider>
       <View style={styles.container}>
        <Text>Hi Corn! Please work on me :)))))</Text>
        <StatusBar style="auto" />
      </View>
     
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
