import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth"

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