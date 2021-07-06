import React from "react";
import {View} from "react-native";
import {Avatar, List} from "react-native-paper";
import firebase from "firebase";
import {CommonActions} from "@react-navigation/native";

const db = firebase.firestore();

export const addTrip =
    async ({user, buddy, place, date, notes}, onSuccess, onError) => {
  try {
    if (place === '') return onError("Please provide some destination");
    let docRef;
    if (buddy === 'None') {   // individual trip
      const uid = user.uid;
      docRef = await db
        .collection('trips')
        .add({
          members: [uid,],
          otherMemberName: {[uid]: ''},     // Key-this user; value-other user
          otherAvatarURL: {[uid]: ''},      // Key-this user; value-other user
          notes: notes,
          place: place,
          date: date
        });
    }
    else {    // trip with buddy
      const [u1, u2] = [user.uid, buddy.uid];
      docRef = await db
        .collection('trips')
        .add({
          members: [u1, u2].sort(),
          otherMemberName: {[u1]: buddy.name, [u2]: user.displayName},   // cross-name!!
          otherAvatarURL: {[u1]: buddy.photoURL, [u2]: user.photoURL},     // cross-name!!
          notes: notes,
          place: place,
          date: date
        });
    }
    await db.collection('journals')
      .doc(docRef.id)
      .set({
        lastEditedBy: "None",
        text: "",
        photos: []
      })
    // decide where to route the user
    const today = new Date(new Date().toDateString());
    if (date < today) return onSuccess("Past");
    else              return onSuccess("Future");
  } catch (err) {
    return onError(err);
  }
};

export const renderTrip = ({item, user, rootNavigation}) => {
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
            return (
              <View style={{justifyContent:'center'}}>
                <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}}/>
              </View>
            );
        }}

        onPress={ rootNavigation ? () => rootNavigation.dispatch(CommonActions.navigate({
            name: 'View Journal',
            params: {trip: item, otherName: buddyDesc,} //otherID: otherID},
          })
        ) : null}
      />
    </View>
  )
};

export const deleteFutureTripWithUnmatchedBuddy = async (user, otherID) => {
  try {
    const uid = user.uid;
    const today = new Date(new Date().toDateString());
    const querySnapshot = await
      db.where("members", "==", [uid, otherID].sort())
      // .where("members", "array-contains", otherID)
      .where("date", ">=", today)
      .get();
    querySnapshot.forEach(doc => doc.ref.delete());
    return "deleted future trips with ex buddy";
  } catch (e) {
    console.error(e);
  }
}