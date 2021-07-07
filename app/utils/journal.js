import firebaseApp from "./firebase";
import firebase from "firebase/app";

const db = firebaseApp.firestore().collection('journals');

// export const getJournal = async (tripID) => {
//   return await db.doc(tripID).get();
// }

export const updateText = async (tripID, username, text) => {
  try {
    await db.doc(tripID).update({lastEditedBy: username, text: text});
    return "updated text";
  } catch (e) {
    console.error(e);
  }
}

// Might not need this
export const updatePhotos = async (tripID, photos) => {
  console.log(`trip.js  ${photos.length}`)
  try {
    const arr = [];
    for (const photoUrl of photos) {
     const response = await fetch(photoUrl);
     const blob = await response.blob();
     const fileRef = firebase.storage().ref().child(
       tripID + "/" + photoUrl.substr(photoUrl.indexOf('ImagePicker/'))
     );
     await fileRef.put(blob);
     const downloadUrl = await fileRef.getDownloadURL();
     arr.push(downloadUrl);
    }
    await db.doc(tripID).update({photos: arr});
    return "updated all photos";
  } catch (e) {
    console.error(e);
  }
}

export const uploadOnePhoto = async (tripID, username, photoUri) => {
  try {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const fileRef = firebase.storage().ref().child(
      tripID + "/" + photoUri.substr(photoUri.indexOf('ImagePicker/'))
    );
    await fileRef.put(blob);
    const downloadUrl = await fileRef.getDownloadURL();
    await db.doc(tripID).update({
      lastEditedBy: username,
      photos: firebase.firestore.FieldValue.arrayUnion(downloadUrl)
    });
    return "uploaded 1 photo";
  } catch (e) {
    console.error(e);
  }
}
