import React ,{useState, } from 'react';
import {Button, TextInput} from "react-native-paper";
import { StyleSheet,Text, View, StatusBar  } from 'react-native';

export default ({navigation}) => {
    return (
        
        <View>
            <Text>Setting Screen, inside home screen</Text>
            <Button onPress={() => navigation.navigate('Home')}>Home</Button>
        </View>
        
    )
}