// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQPxddKVtHPOomyS90E19beA8XKiJr4jw",
  authDomain: "bi-materyal.firebaseapp.com",
  databaseURL: "https://bi-materyal-default-rtdb.firebaseio.com",
  projectId: "bi-materyal",
  storageBucket: "bi-materyal.appspot.com",
  messagingSenderId: "896018026964",
  appId: "1:896018026964:web:0da7c031770291fb888641",
  measurementId: "G-C6HM55H087",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
