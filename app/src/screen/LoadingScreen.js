import React from "react";
import { StyleSheet, ActivityIndicator, Image, Text} from "react-native";
import { Headline,Caption } from "react-native-paper";

import colorConst from "../constant/color";

import Screen from "../component/screen";

export default () => {
    return (
      <Screen style={styles.screen}>
        <Image source={require("../../assets/stock_cat_pict.jpg")} 
        style={{width: "70%", height:"50%"}}
        />
        <Headline>Loading your journey...</Headline>
        <Caption>Please look at this cute cat in the meantime</Caption>
        <ActivityIndicator animating size="large" color={colorConst.primary} />
      </Screen>
    )
  }

const styles = StyleSheet.create({
    screen: {
      justifyContent: "center",
      alignItems:"center",
      flex: 1,
    }
  });