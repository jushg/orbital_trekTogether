import React from "react";
import {View} from "react-native";
import {Avatar, List} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

import firebase from "../utils/firebase";
import * as Notifications from "../utils/notifications";
import colorConst from "../src/constant/color";

const db = firebase.firestore();

export const addTrip =
    async ({user, buddy, place, routeName, date, notes}, onSuccess, onError) => {
  try {
    if (routeName === '') return onError("Please provide the trip name");
    if (place.length === 0) return onError("Please provide some destination")
    const uniquePlace = [... new Set(
      place.map(item => item.structured_formatting.main_text)
    )].sort();

    const uid = user.uid;
    const obj = {
      members: [uid],
      otherMemberName: {[uid]: user.displayName},   // Both key and value are data of this user
      otherAvatarURL: {[uid]: user.photoURL},   // Later if a buddy is added, then change to cross data
      notes: notes,
      place: uniquePlace,
      routeName: routeName,
      date: date
    };
    if (buddy !== "None") {
      obj.inviting = {uid: buddy.uid, name: buddy.name};
      Notifications.sendInviteTripNotification(buddy.uid, user.displayName);
    }

    const docRef = await db.collection("trips").add(obj);

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

export const updateTrip = async (
    {tripID, user, date, isBuddyChanged, buddyStatus, buddy, originalBuddyID, routeName, place, notes},
    onSuccess,
    onError
) => {
  try {
    if (routeName === "") return onError("Please provide a trip name");
    if (place.length === 0) return onError("Please provide a destination");
    const uniquePlace = [... new Set(
      place.map(item => item.structured_formatting.main_text)
    )].sort();

    const obj = {
      date: date,
      routeName: routeName,
      place: uniquePlace,
      notes: notes
    };

    if (isBuddyChanged) {   // no => yes, yes => another buddy, yes => None
      if (buddy !== "None") {
        obj.inviting = {uid: buddy.uid, name: buddy.name};
        Notifications.sendInviteTripNotification(buddy.uid, user.displayName);
      }
      if (buddyStatus === "yes") {
        // revert trip to pre-buddy state
        const uid = user.uid;
        obj.members = [uid];
        obj.otherMemberName = {[uid]: user.displayName};
        obj.otherAvatarURL = {[uid]: user.photoURL};
        // Notifications.sendCancelTripNotification(originalBuddyID, user.displayName);
      }
    }

    await db.collection("trips")
      .doc(tripID)
      .update(obj);
    console.log("update trip done")
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

export const getCurrentTripData = async (tripID) => {
  const snapshot = await db.collection("trips").doc(tripID).get();
  if (snapshot.exists) {
    return snapshot.data();
  }
  throw new Error("Data for current trip does not exist");
};

// export const renderTrip = ({item, user, navigation}) => {
//   const date = item.date.toDate().toLocaleDateString();
//   const hasBuddy = item.members.length === 2;
//   let buddyDesc = '';
//   if (hasBuddy) {
//     buddyDesc += `${item.otherMemberName[user.uid]}`;
//   }
//   return (
//     <View>
//       <List.Item
//         title={item.routeName?item.routeName+ " - " + date:"Somewhere nice"  }
//         // description={date + buddyDesc}
//         description = {buddyDesc ? 'Buddy: ' + buddyDesc + '\n' + item.notes : 'Solo Trip \n' + item.notes}
//         descriptionNumberOfLines = {2}
//         // right={props => <List.Icon {...props} icon="account" />}
//         right={(props) => {
//           if (hasBuddy)
//             return (
//               <View style={{justifyContent:'center'}}>
//                 <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}}/>
//               </View>
//             );
//         }}
//         style={{marginVertical:"1.5%", backgroundColor:"white", borderWidth:0.5, borderRadius:10, elevation:5}}
//         onPress={ navigation ? () => navigation.dispatch(CommonActions.navigate({
//             name: 'View Journal',
//             params: {trip: item, otherName: buddyDesc,} //otherID: otherID},
//           })
//         ) : null}
//       />
//     </View>
//   )
// };

export const deleteFutureTripWithUnmatchedBuddy = async (user, otherID) => {
  try {
    const uid = user.uid;
    const today = new Date(new Date().toDateString());
    const querySnapshot = await db.collection("trips")
      .where("members", "==", [uid, otherID].sort())
      .where("date", ">=", today)
      .get();
    querySnapshot.forEach(doc => doc.ref.delete());
    return "deleted future trips with ex buddy";
  } catch (e) {
    console.error(e);
  }
}

export const acceptInvitations = async (user, array) => {
  try {
    const promises = [];
    array.forEach(trip => {
      const addedMembers = [trip.members[0], user.uid].sort();

      const crossAvatarURL = {...trip.otherAvatarURL};
      crossAvatarURL[user.uid] = crossAvatarURL[trip.inviterID];
      crossAvatarURL[trip.inviterID] = user.photoURL;

      const crossMemberName = {...trip.otherMemberName};
      crossMemberName[user.uid] = crossMemberName[trip.inviterID];
      crossMemberName[trip.inviterID] = user.displayName;

      const updateAction = db.collection("trips")
        .doc(trip.id)
        .update({
          members: addedMembers,
          inviting: {},
          otherAvatarURL: crossAvatarURL,
          otherMemberName: crossMemberName
        });

      promises.push(updateAction);
    });
    await Promise.all(promises);
    array.forEach(trip => {
      Notifications.sendInvitationAcceptedNotification(trip.inviterID, user.displayName);
    })
    return "accept updated " + array.length;
  } catch (e) {
    console.error(e);
  }
};

export const declineInvitations = async (user, array) => {
  try {
    const promises = [];
    array.forEach(trip => {
      const updateAction = db.collection("trips")
        .doc(trip.id)
        .update({
          inviting: {}
        });
      promises.push(updateAction);
    });
    await Promise.all(promises);
    return "decline updated " + array.length;
  } catch (e) {
    console.error(e);
  }
};