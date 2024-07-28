// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyyRtdRVIdqF5CO99IOMTjN_t1pYsLVB4",
    authDomain: "learnquest-430005.firebaseapp.com",
    databaseURL: "https://learnquest-430005-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learnquest-430005",
    storageBucket: "learnquest-430005.appspot.com",
    messagingSenderId: "769364872874",
    appId: "1:769364872874:web:220cacb734118f79fc8ad3",
    measurementId: "G-J5X1PH4FNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
