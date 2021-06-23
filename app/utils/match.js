import firebase from "./firebase";
import {getCurrentUser} from "./auth";

// pull all user data from firebase (this file)
// sort with a comparator (using a formula) (computeBuddy.js)
// partition + shuffle (computeBuddy.js)
// serve data to swiper (swiper import computeBuddy.js)

// We only work with userID here, which is a unique string identifying a user

const db = firebase.firestore().collection("users");
export const currUser = getCurrentUser().uid;

// returns an array where each element is the data of a user
export const getAllUsers = async () => {
  return await db.get();
  // return snapshot.docs.map(doc => doc.data());
};

export const getCurrentUserData = async () => {
  const snapshot = await db.doc(currUser).get();
  return snapshot.exists ? snapshot.data()
    : throw new Error("Data for current user does not exist");
};

export const getUserData = async (user) => {
  const snapshot = await db.doc(user).get();
  return snapshot.exists ? snapshot.data()
    : throw new Error(`Data for user ${user} does not exist`);
};

export const addLikeUser = async (newLike) => {
  await db.doc(currUser).update({
    like: firebase.firestore.FieldValue.arrayUnion(newLike)
  })
};

export const removeLikeUser = async (oldLike) => {
  await db.doc(currUser).update({
    like: firebase.firestore.FieldValue.arrayRemove(oldLike)
  })
};

export const addPassUser = async (newPass) => {
  await db.doc(currUser).update({
    pass: firebase.firestore.FieldValue.arrayUnion(newPass)
  })
};

export const removePassUser = async (oldPass) => {
  await db.doc(currUser).update({
    pass: firebase.firestore.FieldValue.arrayRemove(oldPass)
  })
};

export const addBuddy = async (newBuddy) => {
  await db.doc(currUser).update({
    buddies: firebase.firestore.FieldValue.arrayUnion(newBuddy)
  })
};

export const removeBuddy = async (oldBuddy) => {
  await db.doc(currUser).update({
    buddies: firebase.firestore.FieldValue.arrayRemove(oldBuddy)
  })
};