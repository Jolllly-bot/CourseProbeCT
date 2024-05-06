// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsk-pmu2AQhkIzJ5v8UNblFihFWvfBSJA",
  authDomain: "ctcourseprobe.firebaseapp.com",
  projectId: "ctcourseprobe",
  storageBucket: "ctcourseprobe.appspot.com",
  messagingSenderId: "623256184459",
  appId: "1:623256184459:web:2e3731422cea613bbf968e",
  measurementId: "G-VDEJRP3YDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export{ auth };