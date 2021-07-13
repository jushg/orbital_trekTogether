import React, {useState} from "react";
import {IconButton, Menu} from "react-native-paper";
import colorConst from "../constant/color";

export const EditJournalButton = ({navigation, trip}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onPressPhotos = () => {
    closeMenu();
    navigation.navigate("Edit Photos", {trip: trip})
  }

  const onPressText = () => {
    closeMenu();
    navigation.navigate("Edit Text", {trip: trip})
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton onPress={openMenu} icon="pencil" color={colorConst.textHeader}/>}
      style={{paddingTop: 40}}
    >
      <Menu.Item onPress={onPressPhotos} title="Photos" />
      <Menu.Item onPress={onPressText} title="Text" />
    </Menu>
  )
}