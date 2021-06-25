import React from "react";
import { FAB } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";


export const DashboardFAB = ({navigation}) => {

    return (
        <FAB
            style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
            }}
            icon="plus"
            onPress={() =>  navigation.dispatch(CommonActions.navigate({
              name: 'Add Trip',            
              })
            )}
          /> 
    )
}

