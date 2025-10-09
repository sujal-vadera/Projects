// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCc9-sHhFTAJeD3GsxTM_BBh5hfDi39Am4",
  authDomain: "haruecom-765a0.firebaseapp.com",
  projectId: "haruecom-765a0",
  storageBucket: "haruecom-765a0.appspot.com",
  messagingSenderId: "417888239210",
  appId: "1:417888239210:web:fc8fa468d29ac05c5bd413",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Firestore
const db = getFirestore(app);

export { auth, provider, db };
