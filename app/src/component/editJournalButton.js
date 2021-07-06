import React from "react";
import {IconButton} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

export const EditJournalButton = ({navigation, trip}) => {
  return (
    <IconButton
      icon={'pencil'}
      onPress={() => navigation.dispatch(CommonActions.navigate({
          name: 'Edit Journal',
          params: {trip: trip} //otherName: otherUsername, otherID: otherID},
        })
      )}
    />
  )
}