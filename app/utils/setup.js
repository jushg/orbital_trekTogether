import firebase from "./firebase";
import { uploadImage } from "./imagepicker";

const db = firebase.firestore();

export const getCurrentUserData = async (currID) => {
  const snapshot = await db.collection("users").doc(currID).get();
  if (snapshot.exists) {
    return snapshot.data();
  }
  throw new Error("Data for current user does not exist");
};


// push profile data to db
export const setUpProfile = async ({age, level, about, place, date, avatar}, onSuccess, onError) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      // validate inputs
      if (avatar == null) return onError("Please add a profile picture");

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
      const uniquePlace = [... new Set(
        place.map(item => item.structured_formatting.main_text)
      )].sort();

      const avatarUrl = await uploadImage(uid, avatar);

      // put data in Firestore
      await db.collection("users").doc(uid).set({
        isProfileCompleted: true,
        photoURL: avatarUrl,
        uid: uid,
        age: age,
        level: level,
        about: about,
        // hobby: hobby,
        place: uniquePlace,
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

export const updateProfile = async ({currUser, age, level, about, place, date, avatar, isAvatarChanged}, onSuccess, onError) => {
  try {
    const uid = currUser.uid;
    const toBeUpdated = {};
    const promisesArray = [];

    age = Math.floor(parseInt(age));
    if (!Number.isNaN(age) && age > 0) toBeUpdated['age'] = age;
    toBeUpdated['level'] = level;
    if (about !== '') toBeUpdated['about'] = about;
    if (place.length !== 0) {
      toBeUpdated['place'] = [...new Set(
        place.map(item => item.structured_formatting.main_text)
      )].sort();
    }
    if (!date.every(day => day === false)) toBeUpdated['date'] = date;

    if (isAvatarChanged) {
      const avatarUrl = await uploadImage(uid, avatar);

      const batch = db.batch();

      const userDocRef = db.collection("users").doc(uid);
      batch.update(userDocRef, { photoURL: avatarUrl });

      const addToBatchResult = await Promise.all([
        db.collection("chats")
          .where("isActive", "==", true)
          .where("members", "array-contains", uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
              const docRef = db.collection("chats").doc(doc.id);
              const fieldName = "avatarURL." + uid;
              batch.update(docRef, { [fieldName]: avatarUrl });
              // no need to update lastMessage.user.avatar ??
            })
            return "chats done (add to batch)"
          }),

        db.collection("trips")
          .where("members", "array-contains", uid)
          // .where("hasBuddy", "==", true)
          .get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
              const trip = doc.data();
              if (trip.members.length === 1) return;
              const otherID = trip.members[0] === uid ? trip.members[1] : trip.members[0];
              const docRef = db.collection("trips").doc(doc.id);
              const fieldName = "otherAvatarURL." + otherID;
              batch.update(docRef, { [fieldName]: avatarUrl });
            })
            return "trips done (add to batch)"
          })
      ]);
      console.log(addToBatchResult);

      promisesArray.push(
        batch.commit().then(currUser.updateProfile({ photoURL: avatarUrl }))
      );

    }
    promisesArray.push(db.collection("users").doc(uid).update(toBeUpdated));
    await Promise.all(promisesArray);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};
