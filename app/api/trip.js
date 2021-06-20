import firebase from "firebase";

export const addTrip =
    async ({partner, notes, place, date}, onSuccess, onError) => {
  try {
    // get currently signed in user, if no user signed in then user=null
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      // add tripID to each user for the number of trips
      await db.collection("trip").doc(uid).set({
        tripID: 0,
        partner: partner,
        notes: notes,
        place: place.split(",").map(place => place.trim()),
        date: date
      }, {merge: true});
      return onSuccess(user);
    }
    // else {
    //   throw new Error("No user found!");
    // }
  } catch (err) {
    return onError(err);
  }
};