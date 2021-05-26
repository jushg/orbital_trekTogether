import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyC54vmqCUg4J9ixbszOLTeMu5hLIKWdHhE",
    authDomain: "orbital-e52ec.firebaseapp.com",
    projectId: "orbital-e52ec",
    storageBucket: "orbital-e52ec.appspot.com",
    messagingSenderId: "166615541916",
    appId: "1:166615541916:web:9152754be14d1195912559",
    measurementId: "G-0QH2DDJGPE"
}

// const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// export default firebaseApp;
firebase.initializeApp(firebaseConfig);