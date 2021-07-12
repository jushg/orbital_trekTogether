import React, {useState} from "react";
import { FAB, Portal } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";


export const DashboardFAB = ({navigation}) => {
  return (
      <FAB
        style={{ position: 'absolute', right: "3%", bottom: '2%' }}
        icon="plus"
        onPress={() =>  navigation.dispatch(CommonActions.navigate({
          name: 'Add Trip',            
          })
        )}
      />  
  )
}

