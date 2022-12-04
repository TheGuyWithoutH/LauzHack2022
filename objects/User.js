import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification, signOut,updateEmail,updatePassword, updateProfile } from "firebase/auth"
import { arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import { COLLECTIONS } from "../Constants"
import { AbstractUser } from "./AbstractUser"
import { postConverter } from "./Post"



export class User extends AbstractUser{
    #uid
    user


    constructor(uid, user=null) {
        super()
        this.#uid = uid
        this.user = user
        // console.log(user)
    }

    /**
     * 
     * @returns users uid
     */
    getUID() { return this.#uid}

    /**
     * 
     * @returns {boolean} true
     */
    isLoggedIn() { return true }

    /**
     * signs user out
     * @returns {Promise<void>} empty promise
     */
    logout() { 
        return signOut(getAuth())
    }

    getPersonalInformation(){
        return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS,this.#uid)).then(doc => doc.data())
    }

    
    post(post) {
        const col = collection(getFirestore(), COLLECTIONS.AVAILABLE_OBJECTS)
        const postRef = doc(col, post.getId()).withConverter(postConverter)
        console.log("CHECK")
        setDoc(postRef, post)
        const userRef = doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)
        return updateDoc(userRef, {myPosts : arrayUnion(post.asDataObject())}).catch(err => {
            return setDoc(userRef, {myPosts : arrayUnion(post.asDataObject())})
        })
    }

}