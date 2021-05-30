import React from 'react';
import {Button} from "react-native-paper";
import { Text, View} from 'react-native';

export default ({navigation}) => {
    return (
        <View>
            <Text>This is the home screen</Text>
            <Button onPress={() => navigation.navigate('Test')}>Test</Button>
            <Button onPress={() => navigation.navigate('Setting')}>Setting</Button>
        </View>
        
    )
}