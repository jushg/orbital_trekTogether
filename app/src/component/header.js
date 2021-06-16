import React from "react"
import {View, Text} from "react-native"
import {IconButton, Headline} from "react-native-paper"

import Screen from "./screen"

export default header = ({navigation, screenname}) => {
    return (
        <Screen>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        {/* <View  style={{flexDirection: "row", alignItems:"center", paddingVertical: 15}}>
          <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
          <Text style={{paddingHorizontal: 10, fontSize: 25}}>Welcome, User</Text>
        </View> */}
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