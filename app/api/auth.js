import firebase from "./firebase"

const auth = firebase.auth()
const db = firebase.firestore();

export const createAccount = async ({email, username, password}, onSuccess, onError) => {
  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password)
    if (user) {
      await user.updateProfile({displayName: username})
      await user.sendEmailVerification()
      // create user doc in Firestore
      await db.collection("users").doc(user.uid).set({
        name: username,
        email: email,
        isProfileCompleted: false
      });
      return onSuccess(user)
    }
  } catch (error) {
    return onError(error)
  }
}

export const loginEmail = async({email, password}, onSuccess, onError) => {
  try {
    const {user} = await auth.signInWithEmailAndPassword(email, password)
    return onSuccess(user)
  } catch (error) {
    return onError(error)
  }
}

export const logout = async(onSuccess, onError) => {
  try {
    await auth.signOut()
    return onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const getCurrentUser = () => {
  return auth.currentUser
}

export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) =>
  auth.onAuthStateChanged( async (user) => {
    if (user) {
      const userData = await db.collection("users").doc(user.uid).get();
      if (userData.data().isProfileCompleted) {
        return onUserAuthenticated(user);
      }
      else console.log("Need to setup the profile")
    } else {
      return onUserNotFound(user);
    }
  }
);


