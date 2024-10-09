// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC70WURs_xBHGUo3hcjf0955sAi5A6aSqE",
  authDomain: "eco-gs.firebaseapp.com",
  databaseURL: "https://eco-gs-default-rtdb.firebaseio.com",
  projectId: "eco-gs",
  storageBucket: "eco-gs.appspot.com",
  messagingSenderId: "456656721097",
  appId: "1:456656721097:web:9ad6a3f28c7607f7b22918",
  measurementId: "G-Q4DHLVEM6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore
export const db = getFirestore(app);

// Initialize storage
export const storage = getStorage(app);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// // Verifica se o Firebase Analytics é suportado antes de tentar inicializar
// isSupported().then((supported) => {
//   if (supported) {
//     const analytics = getAnalytics(app);
//     console.log("Firebase Analytics inicializado com sucesso.");
//   } else {
//     console.warn("Firebase Analytics não é suportado neste ambiente.");
//   }
// });