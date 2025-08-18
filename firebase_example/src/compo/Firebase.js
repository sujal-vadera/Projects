// src/compo/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5KQ1GUNnDDDhHqu-zVVtONt0xR-gugms",
  authDomain: "ecom-d7cb8.firebaseapp.com",
  projectId: "ecom-d7cb8",
  storageBucket: "ecom-d7cb8.firebasestorage.app",
  messagingSenderId: "546795672514",
  appId: "1:546795672514:web:1166ba593e8b8e862a3c5b",
  measurementId: "G-8J38RS83H5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
