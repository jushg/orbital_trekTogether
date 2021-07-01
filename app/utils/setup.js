import firebase from "./firebase";

const db = firebase.firestore().collection("users");

// push profile data to db
export const setUpProfile = async ({age, level, about, place, date, avatar}, onSuccess, onError) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      // validate inputs
      // if (avatar == null) return onError("Please add a profile picture");

      age = Math.floor(parseInt(age));
      if (Number.isNaN(age) || age <= 0) return onError("Age must be a positive number");
      if (level === '') return onError("Please choose one level");
      if (about === '') return onError("Please provide a brief description of yourself")
      if (place.length === 0) return onError("Please provide some destination")
      // if (place === '') return onError("Please provide some destination");
      // place = place.split(",").map(place => place.trim()).filter(place => place !== "");
      // if (place == 0) return onError("Please provide some destination");
      if (date.every(day => day === false)) return onError("Please choose at least one free day");

      // inputs have passed validation, so parse them
      level = level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3;
      place = place.map(item => item.structured_formatting.main_text);

      const response = await fetch(avatar.uri);
      const blob = await response.blob();
      const fileRef = firebase.storage().ref().child(
          uid + "/" + avatar.uri.substr(avatar.uri.indexOf('ImagePicker/'))
      );
      await fileRef.put(blob);    // put avatar blob to Cloud Storage
      const avatarUrl = await fileRef.getDownloadURL();     // downloadURL to put in user profile

      // put data in Firestore
      await db.doc(uid).set({
        isProfileCompleted: true,
        photoURL: avatarUrl,
        uid: uid,
        age: age,
        level: level,
        about: about,
        // hobby: hobby,
        place: place,
        date: date,
        // trips: [],     // unnecessary
        buddies: [],
        like: [],
        pass: []
      }, {merge: true});
      // update user instance's default photoURL attribute
      await user.updateProfile({photoURL: avatarUrl});
      return onSuccess(user);
    } else {
      return onError("No user found!");
    }
  } catch (error) {
    return console.log(error);
  }
};