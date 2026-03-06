// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAffpPbXbKXDh3UYsR1TvtMS_9CncSb_bE",
  authDomain: "web-wedding-soom-nook.firebaseapp.com",
  projectId: "web-wedding-soom-nook",
  storageBucket: "web-wedding-soom-nook.firebasestorage.app",
  messagingSenderId: "130477432885",
  appId: "1:130477432885:web:fcd96de1942316c2d7d17c",
  measurementId: "G-G2W0FSY78W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };