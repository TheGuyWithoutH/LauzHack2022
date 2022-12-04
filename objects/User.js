import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore";
import { COLLECTIONS } from "../Constants";
import { AbstractUser } from "./AbstractUser";

export class User extends AbstractUser {
  #uid;
  user;

  constructor(uid, user = null) {
    super();
    this.#uid = uid;
    this.user = user;
    // console.log(user)
  }

  /**
   *
   * @returns users uid
   */
  getUID() {
    return this.#uid;
  }

  /**
   *
   * @returns {boolean} true
   */
  isLoggedIn() {
    return true;
  }

  /**
   * signs user out
   * @returns {Promise<void>} empty promise
   */
  logout() {
    return signOut(getAuth());
  }

  getPersonalInformation() {
    console.log(this.#uid);
    return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (doc) => {
            if (doc.exists()) {
                // get the data as a string        
                return doc.data();
            } else {
            //console.log("No such document!");
            }
        }
        );
  }

  getFavorites() {
    return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (doc) => {
            if (doc.exists()) {
                // get the data as a string        
                console.log(doc.data().myFavoritesIds);
                return doc.data().myFavoritesIds;
            } else {
            console.log("No such document!");
            }
        }
        );
    
    //console.log(infos.then((doc) => doc.data().myFavoritesIds));
    
  }

  isFavorite(id) {
    var isFav = false;

    return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (doc) => {
            if (doc.exists()) {
                // get the data as a string  
                var favorites = doc.data().myFavoritesIds;
                console.log("favo:",favorites);
                console.log("id:",id);
                var isFavorite = favorites.includes(id);
                isFav=isFavorite;

                console.log("isFavorite?",isFavorite);      
                
                return isFavorite;
            } else {
            console.log("No such document!");
            }
        }
        )



    }

  addFavorite(id) {

    getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (docc) => {
            if (docc.exists()) {
                
                var newData = docc.data();
                if (newData.myFavoritesIds.includes(id)) {
                    newData.myFavoritesIds = newData.myFavoritesIds.filter((favorite) => favorite !== id);
                }
                newData.myFavoritesIds.push(id);
                
                setDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid),
                newData);
            } else {
            console.log("No such document!");
            }
        }
        ).catch((error) => {
            console.log("Error getting document add :", error.message);
        }
        );
        this.getFavorites();
        

  }

  removeFavorite(id) {
    getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (docc) => {
            if (docc.exists()) {
                // get the data as a string
                var favorites = docc.data().myFavoritesIds;
                favorites = favorites.filter((favorite) => favorite !== id);
                //console.log("favvv",favorites);
                setDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid), {
                    myFavoritesIds: favorites
                }, { merge: true });
            } else {
            console.log("No such document!");
            }
        }
        ).catch((error) => {
            console.log("Error getting document remove:", error);
        }
        );



  }

  getMyItems() {
    return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (docc) => {
            if (docc.exists()) {
                // get the data as a string
                console.log(docc.data().myPosts);
                return docc.data().myPosts;
            } else {
            console.log("No such document!");
            }
        }
        );
  }

  getName() {
    return getDoc(doc(getFirestore(), COLLECTIONS.REGULAR_USERS, this.#uid)).then(
        (docc) => {
            if (docc.exists()) {
                // get the data as a string
                console.log(docc.data().firstName+" "+docc.data().lastName);
                return docc.data().firstName+" "+docc.data().lastName;
            } else {
            console.log("No such document!");
            }
        }
        );
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
