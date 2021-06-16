import React from "react";
import { StyleSheet, ActivityIndicator, Image, Text} from "react-native";

import Screen from "../component/screen";

export default () => {
    return (
      <Screen style={styles.screen}>
        {/* <Image source={require("../../assets/stolen_icon.jpg")} style={{width: "90%", height:"45%"}}/> */}
        <Text>Loading your journey...</Text>
        <ActivityIndicator animating size="large" color="black" />
      </Screen>
    )
  }

const styles = StyleSheet.create({
    screen: {
      justifyContent: "center",
      alignItems:"center",
      flex: 1
    }
  });