// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGMCg5dSXwow4oDfhRyenxtaBPHl-IGus",
  authDomain: "luo2-8440a.firebaseapp.com",
  projectId: "luo2-8440a",
  storageBucket: "luo2-8440a.appspot.com",
  messagingSenderId: "487415320687",
  appId: "1:487415320687:web:889915226f77fa699bfd9a",
  measurementId: "G-H99DDV7XT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;