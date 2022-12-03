import { getFirestore } from "firebase/firestore";



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

}