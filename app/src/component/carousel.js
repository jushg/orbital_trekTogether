import React from "react"
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"

export default (props) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // scrollEventThrottle={200}
      // decelerationRate="fast"
      pagingEnabled
    >
      {props.children}
    </ScrollView>
  )
}