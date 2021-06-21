import firebase from "./firebase";
import {getCurrentUser} from "./auth";

// pull all user data from firebase (this file)
// sort with a comparator (using a formula) (maybe src)
// partition + shuffle (maybe src)
// serve data to swiper (swiper import & call a function -> screen)

const db = firebase.firestore().collection("users");

// returns an array where each element is the data of a user
const getAllUsers = async () => {
  const snapshot = await db.get();
  return snapshot.docs.map(doc => doc.data());
}

const getCurrentUserData = async () => {
  const snapshot = await db.doc(getCurrentUser().uid).get();
  return snapshot.exists ? snapshot.data() : error("Data for current user does not exist");
}

const getUserData = async (userID) => {
  const snapshot = await db.doc(userID).get();
  return snapshot.exists ? snapshot.data() : error(`Data for user ${userID} does not exist`);
}

export {getAllUsers, getCurrentUserData, getUserData};