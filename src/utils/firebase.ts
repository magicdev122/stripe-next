// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_1iysEHzVyD2Motefy_cOfohleBkFi_I",
    authDomain: "almafit-4c407.firebaseapp.com",
    databaseURL: "https://almafit-4c407-default-rtdb.firebaseio.com",
    projectId: "almafit-4c407",
    storageBucket: "almafit-4c407.appspot.com",
    messagingSenderId: "28637759212",
    appId: "1:28637759212:web:1954aaa758e03fb17087c9",
    measurementId: "G-7S02FBEJ94"
  };
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)


export const db=getFirestore(app)
export const storage=getStorage(app)
export const database=getDatabase(app)