import React, {useState} from "react"
import {View, Text} from "react-native"
import {IconButton, Headline, Menu, Appbar} from "react-native-paper"

import colorConst from "../constant/color"

export const DashboardHeader = ({navigation, screenname}) => {
    return (
        <Appbar.Header>
            <Appbar.Content title="Dashboard" subtitle="username" />
            <Appbar.Action icon="magnify"  disabled />
            <Appbar.Action icon="account-cog" onPress={() => navigation.navigate(screenname)} />
        </Appbar.Header>      
    )
}

export const MessengerButtonHeader = (props) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const unmatch = () => {console.log("you want to unmatch this dude ?")};
    const report = () => {console.log("report this dude")};
    return (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton onPress={openMenu} icon="dots-vertical"/>}
          style={{paddingTop: 30}}>
          <Menu.Item onPress={unmatch} title="Unmatch" />
          <Menu.Item onPress={report} title="Report" />
        </Menu>
    )
}