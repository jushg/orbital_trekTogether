import React, {useContext, useState} from "react";
import {IconButton, Headline, Menu, Appbar} from "react-native-paper"

import colorConst from "../constant/color"
import {UserContext} from "../../utils/context";
import * as Match from "../../utils/match";
import * as Trip from "../../utils/trip";
import {showMessage} from "react-native-flash-message";

export const DashboardHeader = ({navigation, screenName}) => {
  const {user} = useContext(UserContext);
  return (
    <Appbar.Header>
      <Appbar.Content 
        title="Dashboard" 
        // subtitle={user.displayName}
       />
      {/* <Appbar.Action icon="magnify"  disabled /> */}
      <Appbar.Action icon="account-cog" onPress={() => navigation.navigate(screenName)} />
    </Appbar.Header>
  )
}

export const MessengerButtonHeader = ({navigation, otherName, otherID}) => {
  const {user} = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleUnmatch = async () => {
    // Unmatch + Delete all trips with ex-buddy
    try {
      const result = await Promise.all([
        Match.unmatchBetween(user, otherID),
        Trip.deleteFutureTripWithUnmatchedBuddy(user, otherID)
      ]);
      console.log(result);
      navigation.navigate("Message");   // bring user back to chat list
      showMessage({
        "message": `Unmatched with ${otherName}`,
        type: "info", icon: "auto", floating: true
      });
    } catch (e) {
      console.error(e)
    }
  }

  const report = () => {console.log("report this person")};

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton onPress={openMenu} icon="dots-vertical" color={colorConst.textHeader}/>}
      style={{paddingTop: 40}}
    >
      <Menu.Item onPress={handleUnmatch} title="Unmatch" />
      <Menu.Item onPress={report} title="Report" disabled />
    </Menu>
  )
}