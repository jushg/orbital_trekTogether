import firebase from "firebase";
import {useContext} from "react";
import {UserContext} from "../src/feature/auth";

export const addTrip =
    async ({partner, notes, place, date}, onSuccess, onError) => {
  try {
    const userApi = useContext(UserContext);
    const uid = userApi.user;
    // add tripID to each user for the number of trips
    await db.collection("trips").doc(uid).set({
      tripID: 0,
      partner: partner,
      notes: notes,
      place: place.split(",").map(place => place.trim()).filter(place => place !== ''),
      date: date
    }, {merge: true});
    return onSuccess(uid);

    // else {
    //   throw new Error("No user found!");
    // }
  } catch (err) {
    return onError(err);
  }
};