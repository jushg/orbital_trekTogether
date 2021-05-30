import React ,{useState} from 'react';
import {Button, TextInput} from "react-native-paper";
import { StyleSheet,Text, View, Pressable} from 'react-native';
import Screen from "../component/screen"

export default ({navigation}) => {
    return (
        <Screen>
            <View style={{justifyContent:"center", alignItems:"center"}}>
                <Text>Match screen</Text>
            </View>
        </Screen>
        
    )
}