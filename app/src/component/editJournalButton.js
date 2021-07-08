import React from "react";
import {IconButton} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import colorConst from "../constant/color";
export const EditJournalButton = ({navigation, trip}) => {
  return (
    <IconButton
      icon={'pencil'}
      color={colorConst.textHeader}
      onPress={() => navigation.dispatch(CommonActions.navigate({
          name: 'Edit Journal',
          params: {trip: trip} //otherName: otherUsername, otherID: otherID},
        })
      )}
    />
  )
}