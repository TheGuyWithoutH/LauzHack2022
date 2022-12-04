import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";



export class AbstractUser {
    db
    constructor() {
        if (this.constructor === AbstractUser) {
            throw new Error('Cannot instantiate abstract user');
        }
        this.db = getFirestore();
    }

    /**
     * return true if user is of type User and false if of type Guest
     */
    isLoggedIn() {
        throw new Error('method must be implemented')
    }

    userExistsByEmail(email) {
        const q = query(collection(this.db,COLLECTIONS.REGULAR_USERS), where("email","==",email))
        return getDocs(q).then(snapshot => {
            return snapshot.docs.length != 0} )
    }

    getPublicPosts(...queryConstraints) {
        const q = query(collection(this.db, COLLECTIONS.AVAILABLE_OBJECTS), ...queryConstraints)

        return getDocs(q).then(snapshot => {
                return snapshot.docs
            })
    }



}