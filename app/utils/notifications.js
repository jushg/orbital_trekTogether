import React from "react";
import {Platform} from "react-native";
import * as Notifications from "expo-notifications";
import firebase from "./firebase";

export const setForegroundNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  })
};


export const registerForPushNotificationsAsync = async (user) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Please enable push notifications!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  // console.log(token);
  firebase.firestore().collection("users").doc(user.uid).set({
    pushToken: token
  }, {merge: true});

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
};


export const sendPushNotificationToBuddy = async (otherID, currentUsername) => {
  let buddyPushToken;
  await firebase.firestore().collection("users").doc(otherID).get()
    .then(doc => buddyPushToken = doc.data().pushToken);
  if (!buddyPushToken) {
    alert('Buddy does not have a push token (old account)');
    return;
  }
  const badgeCount = await Notifications.getBadgeCountAsync();
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: buddyPushToken,
      sound: 'default',
      badge: badgeCount + 1,
      title: 'New Buddy',
      body: `It's a match with ${currentUsername} 🎉`,
      // data: { url: "myapp://messages" },
    })
  });
  console.log("fetched");
};
