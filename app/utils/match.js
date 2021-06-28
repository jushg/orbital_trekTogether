import firebaseApp from "./firebase";
import firebase from "firebase/app";

// pull all user data from firebaseApp (this file)
// sort with a comparator (using a formula) (computeBuddy.js)
// partition + shuffle (computeBuddy.js)
// serve data to swiper (swiper import computeBuddy.js)

// We only work with userID here, which is a unique string identifying a user
const db = firebaseApp.firestore().collection("users");

// returns a QuerySnapshot (an array of documents (not data yet!))
export const getAllUsers = async () => {
  try {
    let snapshot = await db.get();
    console.log(`3. match.js/getAllUsers()   snapshotSize=${snapshot.size}`);
    snapshot = snapshot.docs;
    return snapshot;
  } catch (err) {
    console.log("match.js/getAllUsers(): " + err);
  }
};

// export const getCurrentUserData = async () => {
//   const snapshot = await db.doc(Auth.getCurrentUser().uid).get();
//   if (snapshot.exists) {
//     console.log("currData= " + snapshot.data());
//     return snapshot.data();
//   }
//   else throw new Error("Data for current user does not exist");
// };

export const getUserData = async (user) => {
  const snapshot = await db.doc(user).get();
  if (snapshot.exists) return snapshot.data();
  else throw new Error(`Data for user ${user} does not exist`);
};

export const addLikeUser = async (user, newLike) => {
  try {
    await db.doc(user).update({
      like: firebase.firestore.FieldValue.arrayUnion(newLike)
    });
    return "added Like user";
  } catch (error) {
    console.log(error);
  }
};

export const removeLikeUser = async (user, oldLike) => {
  try {
    await db.doc(user).update({
      like: firebase.firestore.FieldValue.arrayRemove(oldLike)
    });
    return "removed Like user";
  } catch (error) {
    console.log(error);
  }
};

export const addPassUser = async (user, newPass) => {
  try {
    await db.doc(user).update({
      pass: firebase.firestore.FieldValue.arrayUnion(newPass)
    });
    return "added Pass user";
  } catch (error) {
    console.log(error);
  }
};

// When to use this?
export const removePassUser = async (user, oldPass) => {
  await db.doc(user).update({
    pass: firebase.firestore.FieldValue.arrayRemove(oldPass)
  })
};

export const addBuddy = async (user, newBuddy) => {
  try {
    await db.doc(user).update({
      buddies: firebase.firestore.FieldValue.arrayUnion(newBuddy)
    });
    return "added Buddy";
  } catch (error) {
    console.log(error)
  }
};

export const removeBuddy = async (user, oldBuddy) => {
  try {
    await db.doc(user).update({
      buddies: firebase.firestore.FieldValue.arrayRemove(oldBuddy)
    });
    return "removed Buddy";
  } catch (error) {
    console.log(error);
  }
};

export const unmatchBetween = async (user, otherID) => {
  const uid = user.uid;
  const chatID = uid < otherID ? `${uid}_${otherID}` : `${otherID}_${uid}`;
  try {
    await Promise.all([
      // remove buddy
      removeBuddy(uid, otherID),
      removeBuddy(otherID, uid),
      // deactivate chat
      firebase.firestore().collection("chats")
        .doc(chatID)
        .update({isActive: false})
    ]);
    return "unmatch done";
  } catch (error) {
    console.log(error);
  }
};