import React from 'react'
import {TextInput} from 'react-native-paper'
import { StyleSheet } from 'react-native'
import colorConst from '../constant/color'

export default  (props)  => {
    return (
        <TextInput
            // mode="outlined"
            underlineColor="transparent"
            {...props}
            style={{...styles.textInput, ...props.style}}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        backgroundColor: colorConst.secondaryLight,
        borderWidth: 1,
        borderRadius: 5
    }
});