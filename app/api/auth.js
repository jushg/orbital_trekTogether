import firebase from "./firebase"

const auth = firebase.auth()

export const createAccount = async({email,username,password},onSuccess,onError) => {
    try {
        const {user} = await auth.createUserWithEmailAndPassword(email,password)
        if (user){
            await user.updateProfile({displayName: username})
            await user.sendEmailVerification()
            return onSuccess(user)
        }
    } catch (error) {
        return onError(error)
    }
}

export const loginEmail = async({email,password},onSuccess,onError) => {
    try {
        const {user} = await auth.signInWithEmailAndPassword(email, password)
        return onSuccess(user)
    } catch (error) {
        return onError(user)
        
    }
}
   
