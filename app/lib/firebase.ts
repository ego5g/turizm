// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration!
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // The databaseURL you provided
  databaseURL: "https://turizm-ef808-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "turizm-ef808",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// We need to check if an app is already initialized to avoid errors on hot reloads.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
