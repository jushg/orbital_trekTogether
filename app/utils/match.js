import firebase from "./firebase";

// pull all user data from firebase (this file)
// sort with a comparator (using a formula) (computeBuddy.js)
// partition + shuffle (computeBuddy.js)
// serve data to swiper (swiper import computeBuddy.js)

// We only work with userID here, which is a unique string identifying a user
const db = firebase.firestore().collection("users");

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
  await db.doc(user).update({
    like: firebase.firestore.FieldValue.arrayUnion(newLike)
  })
};

export const removeLikeUser = async (user, oldLike) => {
  await db.doc(user).update({
    like: firebase.firestore.FieldValue.arrayRemove(oldLike)
  })
};

export const addPassUser = async (user, newPass) => {
  await db.doc(user).update({
    pass: firebase.firestore.FieldValue.arrayUnion(newPass)
  })
};

export const removePassUser = async (user, oldPass) => {
  await db.doc(user).update({
    pass: firebase.firestore.FieldValue.arrayRemove(oldPass)
  })
};

export const addBuddy = async (user, newBuddy) => {
  await db.doc(user).update({
    buddies: firebase.firestore.FieldValue.arrayUnion(newBuddy)
  })
};

export const removeBuddy = async (user, oldBuddy) => {
  await db.doc(user).update({
    buddies: firebase.firestore.FieldValue.arrayRemove(oldBuddy)
  })
};