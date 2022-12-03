import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification, signOut,updateEmail,updatePassword, updateProfile } from "firebase/auth"
import { setDoc } from "firebase/firestore"
import { AbstractUser } from "./AbstractUser"



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
        return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS,this.#uid))
    }

    getFavorites() {
        return this.getPersonalInformation().myFavoritesIds
    }

    isFavorite(id) {
        if (this.getFavorites().includes(id)) {
            return true
        }
    }

    addFavorite(id) {
        var favorites = this.getFavorites()
        favorites.push(id)
        setDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS,this.#uid), {myFavoritesIds: favorites}, {merge: true})
    }

    removeFavorite(id) {
        var favorites = this.getFavorites()
        favorites = favorites.filter(favorite => favorite !== id)
        setDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS,this.#uid), {myFavoritesIds: favorites}, {merge: true})
    }

}