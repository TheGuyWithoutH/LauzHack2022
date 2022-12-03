import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, Timestamp, collection, getFirestore, ref, getStorage } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";
// import { COLLECTIONS } from "../Constants";
import { AbstractUser } from "./AbstractUser";

export class Guest extends AbstractUser{
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

    /**
     * Creates a new user and logs user in after creation.
     * Creation of user in auth service and in database 
     * @param {Object} userObject 
     * @param {Object} adressObject 
     * @returns {Promise<>} promise
     */
     signUp(userObject) {

        return createUserWithEmailAndPassword(getAuth(), userObject.email, userObject.password)
            .then(userCred => {
                let collectionRef = collection(getFirestore(), COLLECTIONS.REGULAR_USERS)
                let userRef = doc(collectionRef, userCred.user.uid)
                return setDoc(
                            userRef,
                            {
                                uid: userCred.user.uid,
                                createdAt: Timestamp.now(),
                                email: userObject.email,
                                firstName: userObject.firstName,
                                lastName: userObject.lastName,
                                myPosts: [],
                            })
                    })
                    // .then(() => {
                    //     return sendEmailVerification(userCred.user).then(() => console.log("Sent verification mail"))
                    // })
    }
            

    

    /**
     * 
     * @param {*} pictureFile 
     * @returns {Promise<UploadResult>} promise containing an UploadResult
     */
     uploadProfilePicture(pictureFile, uid) {
        let storageRef = ref(getStorage(), COLLECTIONS.profile_picture(uid))
        return uploadBytes(storageRef, pictureFile)
    }
}