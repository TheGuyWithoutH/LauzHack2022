// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgG9_ik4vb0-Gi6RlSxiXAc3UVV6GyJRY",
  authDomain: "luoo-d1e3f.firebaseapp.com",
  projectId: "luoo-d1e3f",
  storageBucket: "luoo-d1e3f.appspot.com",
  messagingSenderId: "625518825098",
  appId: "1:625518825098:web:ff23988a3df7d183ce2773"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;