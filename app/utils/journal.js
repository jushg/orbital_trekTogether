import firebase from "./firebase";

const db = firebase.firestore().collection('journals');

// export const getJournal = async (tripID) => {
//   return await db.doc(tripID).get();
// }

export const updateText = async (tripID, username, text) => {
  try {
    await db.doc(tripID).update({lastEditedBy: username, text: text});
    return true;
  } catch (e) {
    console.error(e);
  }
}

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
    return true;
  } catch (e) {
    console.error(e);
  }
}
