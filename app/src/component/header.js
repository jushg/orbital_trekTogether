import React, {useContext, useState} from "react";
import {View, Text} from "react-native"
import {IconButton, Headline, Menu, Appbar} from "react-native-paper"

import colorConst from "../constant/color"
import {UserContext} from "../../utils/context";
import * as Match from "../../utils/match";
import firebase from "../../utils/firebase";
import {showMessage} from "react-native-flash-message";

export const DashboardHeader = ({navigation, screenName}) => {
  const {user} = useContext(UserContext);
  return (
    <Appbar.Header>
      <Appbar.Content 
        title="Dashboard" 
        // subtitle={user.displayName}
       />
      <Appbar.Action icon="magnify"  disabled />
      <Appbar.Action icon="account-cog" onPress={() => navigation.navigate(screenName)} />
    </Appbar.Header>
  )
}

// to be put in a separate file
// NEED SOME MORE POLISHING
const unmatchBetween = async (user, otherID) => {
  const uid = user.uid;
  const chatID = uid < otherID ? `${uid}_${otherID}` : `${otherID}_${uid}`;
  try {
    await Promise.all([
      // remove buddy
      Match.removeBuddy(uid, otherID),
      Match.removeBuddy(otherID, uid),
      // deactivate chat
      firebase.firestore().collection("chats")
        .doc(chatID)
        .update({isActive: false})
    ]);
    return "unmatch done";
  } catch (error) {
    console.log(error);
  }
};

export const MessengerButtonHeader = ({navigation, otherName, otherID}) => {
  const {user} = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const unmatch = () => {
    // import function to remove buddy and delete chat
    unmatchBetween(user, otherID).then(result => {
        console.log(result);
        // bring user back to chat list
        navigation.navigate("Message");
        showMessage({
          "message": `Unmatched with ${otherName}`,
          type: "info", icon: "auto", floating: true
        });
      })
    // console.log("you want to unmatch this person?")
  };
  const report = () => {console.log("report this person")};
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton onPress={openMenu} icon="dots-vertical" color={colorConst.textHeader}/>}
      style={{paddingTop: 40}}
    >
      <Menu.Item onPress={unmatch} title="Unmatch" />
      <Menu.Item onPress={report} title="Report" disabled />
    </Menu>
  )
}