import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, Timestamp, collection, getFirestore } from "firebase/firestore";
// import { COLLECTIONS } from "../Constants";
import { AbstractUser } from "./AbstractUser";

export class Guest extends AbstractUser{
    //Create constructor for Guest class
    constructor() {
        super()
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<UserCredential>} promise with user credentials
     */
    login(email, password) {
        console.log(email)
        return signInWithEmailAndPassword(getAuth(), email, password)
    }

    isLoggedIn() {
        return false
    }
    
}