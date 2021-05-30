import React  from 'react';
import {Button} from "react-native-paper";
import { Text, View  } from 'react-native';

export default ({navigation}) => {
    return (
        
        <View>
            <Text>Test Screen, inside home screen</Text>
            <Button onPress={() => navigation.navigate('Home')}>Home</Button>
        </View>
        
    )
}
