import React  from 'react';
import { StyleSheet,Text} from 'react-native'
import {Button} from "react-native-paper"
import { CommonActions } from "@react-navigation/native";

import Screen from "../component/screen"

export default ({navigation}) => {
    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>Setup Screen</Text>
            <Button
                mode="contained"
                onPress={() => navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{
                      name: "Home",
                    //   params: { name: user.displayName }
                    }]
                  })
                  )
                }
                style={styles.button}   
            >Finish
            </Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingTop: 5,
        color:"#05668D"
    },
    button: {
        // width:"70%",
        // borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        // backgroundColor:"#028090",
    },
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems: "center",
      justifyContent: 'center',
    },
  });