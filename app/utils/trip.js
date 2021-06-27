import firebase from "firebase";
import {View} from "react-native";
import {Avatar, List} from "react-native-paper";
import React from "react";

const db = firebase.firestore().collection("trips");

export const addTrip =
    async ({user, buddy, place, date, notes}, onSuccess, onError) => {
  try {
    if (place === '') return onError("Please provide some destination");
    if (buddy === 'None') {   // individual trip
      const uid = user.uid;
      await db.add({
        members: [uid,],
        otherMemberName: {[uid]: ''},
        otherAvatarURL: {[uid]: ''},
        notes: notes,
        place: place,
        date: date
      })
    }
    else {    // trip with buddy
      const [u1, u2] = [user.uid, buddy.uid];
      await db.add({
        members: [u1, u2],
        otherMemberName: {[u1]: buddy.name, [u2]: user.displayName},   // cross-name!!
        otherAvatarURL: {[u1]: user.photoURL, [u2]: buddy.photoURL},     // cross-name!!
        notes: notes,
        place: place,
        date: date
      });
    }
    // decide where to route the user
    const today = new Date(new Date().toDateString());
    if (date < today) return onSuccess("Past");
    else              return onSuccess("Future");
  } catch (err) {
    return onError(err);
  }
};

export const renderTrip = ({item, user}) => {
  const date = item.date.toDate().toLocaleDateString();
  const hasBuddy = item.members.length === 2;
  let buddyDesc = '';
  if (hasBuddy) {
    buddyDesc += `${item.otherMemberName[user.uid]}`;
  }
  return (
    <View>
      <List.Item
        title={item.place + " - " + date } 
        // description={date + buddyDesc}
        description = {buddyDesc ? 'Buddy: ' + buddyDesc + '\n' + item.notes : 'Solo Trip \n' + item.notes}
        descriptionNumberOfLines = {2}
        // right={props => <List.Icon {...props} icon="account" />}
        right={(props) => {
          if (hasBuddy)
            return <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}}/>;
        }}
        onPress={() => {}}
      />
    </View>
  )
}