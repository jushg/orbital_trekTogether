import firebase from "./firebase";

const db = firebase.firestore();

// push profile data to db
export const setUpProfile = async ({age, level, place, date, avatar}, onSuccess, onError) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      // parse inputs
      if (avatar == null) return onError("Please add a profile picture");
      // const response = await fetch(avatar.uri);
      // const blob = await response.blob();
      const fileRef = firebase.storage().ref().child(uid + "/avatar/");
      fileRef.put(avatar.uri);
      const avatarUrl = await fileRef.getDownloadURL();

      age = Math.floor(parseInt(age));
      if (Number.isNaN(age)) return onError("Age must be a positive number");

      if (level === '') return onError("Please choose one level");
      level = level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3;

      if (place === '') return onError("Please input some destination");
      place = place.split(",").map(place => place.trim()).filter(place => place !== "");

      if (date.every(day => day === false)) return onError("Please choose at least one free day");

      // inputs have passed validation
      await db.collection("users").doc(uid).set({
        isProfileCompleted: true,
        avatar: avatarUrl,
        age: age,
        level: level,
        // intro: intro,
        // hobby: hobby,
        place: place,
        date: date,
      }, {merge: true});
      // finish setting up profile
      return onSuccess(user);
    } else {
      return onError("No user found!");
    }
  } catch (error) {
    return onError(error);
  }
};