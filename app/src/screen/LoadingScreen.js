import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

import Screen from "../component/screen";

export default () => {
    return (
      <Screen style={styles.screen}>
        <ActivityIndicator animating size="large" color="black" />
      </Screen>
    )
  }

const styles = StyleSheet.create({
    screen: {
      justifyContent: "center",
      flex: 1
    }
  });