import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDE3vk42D3uHRy4xi74qn0XB_gSC3RMMRw",
    authDomain: "events-reg-app.firebaseapp.com",
    projectId: "events-reg-app",
    storageBucket: "events-reg-app.appspot.com",
    messagingSenderId: "6873385825",
    appId: "1:6873385825:web:74188e81125f4f416f5320"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app)

export { auth, db }