import React from "react"
import { StatusBar,FlatList,ScrollView } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context"

export default (props) =>{
    return (
            <SafeAreaView style = {{paddingTop : StatusBar.currentHeight, ...props.style}}>
                {props.children}
            </SafeAreaView>
        );
    
}


// export default Screen;