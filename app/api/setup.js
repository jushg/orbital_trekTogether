import firebase from "./firebase";

const db = firebase.firestore();

// push profile data to db
export const setUpProfile = async ({age, level, place, date}, onSuccess, onError) => {

    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      // parse inputs
      age = Math.floor(parseInt(age));
      if (Number.isNaN(age)) return onError("Age must be a positive number");
      if (level === '') return onError("Must choose one level");
      level = level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3;
      if (place === '') return onError("Must input some destination");
      place = place.split(",").map(place => place.trim()).filter(place => place !== "");
      if (date.every(day => day === false)) return onError("Must choose at least one free day");
      // inputs have passed validation
      await db.collection("users").doc(uid).set({
        isProfileCompleted: true,
        age: age,
        level: level,
        // intro: intro,
        // hobby: hobby,
        place: place,
        date: date
      }, {merge: true});
      // finish setting up profile
      return onSuccess(user);
    }
    else {
      return onError("No user found!");
    }

};