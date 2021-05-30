import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"


const firebaseConfig = {
    //please add the key on your own or setup .env file here
    
}

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;
