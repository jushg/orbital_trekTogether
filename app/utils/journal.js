import firebase from "./firebase";

const db = firebase.firestore().collection('journals');

// export const getJournal = async (tripID) => {
//   return await db.doc(tripID).get();
// }

export const updateJournal = async (tripID, username, text) => {
  try {
    await db.doc(tripID).update({lastEditedBy: username, text: text});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}