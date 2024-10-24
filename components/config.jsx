import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = auth;
export const FIRESTORE_DB = db;
