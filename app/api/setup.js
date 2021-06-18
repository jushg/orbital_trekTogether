import firebase from "./firebase";

const db = firebase.firestore();

// push profile data to db
export const setUpProfile =
    async ({age, level, place, date}, onSuccess, onError) => {
  try {
    // get currently signed in user, if no user signed in then user=null
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      // parse inputs !!
      await db.collection("users").doc(uid).set({
        isProfileCompleted: true,
        age: Math.floor(parseInt(age)),
        level: level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3,
        // intro: intro,
        // hobby: hobby,
        place: place.split(",").map(place => place.trim()),
        date: date
      }, {merge: true});
      // finish setting up profile
      return onSuccess(user);
    }
    // else {
    //   throw new Error("No user found!");
    // }
  } catch (err) {
    return onError(err);
  }
};