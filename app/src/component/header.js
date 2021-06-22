import React from "react"
import {View, Text} from "react-native"
import {IconButton, Headline} from "react-native-paper"

import Screen from "./screen"

export default header = ({navigation, screenname}) => {
    return (
        <Screen disableTop>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Headline>Dashboard</Headline>
        <IconButton
          onPress={() => navigation.navigate(screenname)}
          icon="cog"
          color="black"
          size={28}
        />
        </View>
        </Screen>
        
    )
}