import firebase from "firebase";

const db = firebase.firestore().collection("trips");

export const addTrip =
    async ({user, buddy, place, date, notes}, onSuccess, onError) => {
  try {
    if (place === '') return onError("Please provide some destination");
    if (buddy === 'None') {   // individual trip
      const uid = user.uid;
      await db.add({
        members: [uid,],
        otherMemberName: {[uid]: ''},
        avatarURL: {[uid]: user.photoURL},
        notes: notes,
        place: place,
        date: date
      })
    }
    else {    // trip with buddy
      const [u1, u2] = [user.uid, buddy.uid];
      await db.add({
        members: [u1, u2],
        otherMemberName: {[u1]: buddy.name, [u2]: user.displayName},   // cross-name!!
        avatarURL: {[u1]: user.photoURL, [u2]: buddy.photoURL},
        notes: notes,
        place: place,
        date: date
      });
    }
    return onSuccess(user);
  } catch (err) {
    return onError(err);
  }
};

export const getAllTrip = (uid) => {
  
}