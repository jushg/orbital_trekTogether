import firebaseApp from "./firebase";
import firebase from "firebase/app";

const db = firebaseApp.firestore().collection('journals');

// export const getJournal = async (tripID) => {
//   return await db.doc(tripID).get();
// }

export const updateText = async (tripID, username, text) => {
  try {
    await db.doc(tripID).update({lastEditedBy: username + " updated journal text", text: text});
    return "updated text";
  } catch (e) {
    console.error(e);
  }
}

// Might not need this
// export const updatePhotos = async (tripID, photos) => {
//   console.log(`trip.js  ${photos.length}`)
//   try {
//     const arr = [];
//     for (const photoUrl of photos) {
//      const response = await fetch(photoUrl);
//      const blob = await response.blob();
//      const fileRef = firebase.storage().ref().child(
//        tripID + "/" + photoUrl.substr(photoUrl.indexOf('ImagePicker/'))
//      );
//      await fileRef.put(blob);
//      const downloadUrl = await fileRef.getDownloadURL();
//      arr.push(downloadUrl);
//     }
//     await db.doc(tripID).update({photos: arr});
//     return "updated all photos";
//   } catch (e) {
//     console.error(e);
//   }
// }

// Might not need this
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
      lastEditedBy: username + " uploaded 1 photo",
      photos: firebase.firestore.FieldValue.arrayUnion(downloadUrl)
    });
    return "uploaded 1 photo";
  } catch (e) {
    console.error(e);
  }
}

export const uploadManyPhotos = async (tripID, username, photos) => {
  try {
    if (photos.length === 0) return "uploaded 0";

    const arr = [];
    for (const uri of photos) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = firebase.storage().ref().child(
        tripID + "/" + uri.substr(uri.indexOf('ImagePicker/'))
      );
      await fileRef.put(blob);
      const downloadUrl = await fileRef.getDownloadURL();
      arr.push(downloadUrl);
    }
    // Should put storage address for deletion?
    await db.doc(tripID).update({
      lastEditedBy: username + " uploaded " + photos.length + " photo(s)",
      photos: firebase.firestore.FieldValue.arrayUnion(...arr)
    });

    return "uploaded " + photos.length;
  } catch (e) {
    console.error(e);
  }
}

export const deleteManyPhotos = async (tripID, username, photos) => {
  try {
    if (photos.length === 0) return "deleted 0";
    await db.doc(tripID).update({
      lastEditedBy: username + " deleted " + photos.length + " photo(s)",
      photos: firebase.firestore.FieldValue.arrayRemove(...photos)
    });
    return "deleted " + photos.length;
  } catch (e) {
    console.error(e);
  }
}
