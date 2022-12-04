import { COLLECTIONS } from "../Constants"

export const postConverter = {
    toFirestore: (post) => {
        return {
            id: post.getId(),
            nonAvailability: post.getNonAvailability(),
            information: post.getInformation(),
            description: post.getDescription(),
            creatorUID: post.getCreatorUID(),
            creatorName: post.getCreatorName(),
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Post(data.information,data.nonAvailability,data.id,data.description,data.creatorUID,data.creatorName)
    }
}
export class Post {

    //create private variables
    #id
    #information
    #description
    #nonAvailability
    #creatorUID
    #creatorName

    constructor(information, nonAvailability, description="", creatorUID, creatorName, id=null) {
        this.#information = information
        this.#description = description
        this.#nonAvailability = nonAvailability
        this.#creatorUID = creatorUID
        this.#creatorName = creatorName

        this.#id = id ? id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    }

    //create getters
    getInformation() { return this.#information }
    getDescription() { return this.#description }
    getNonAvailability() { return this.#nonAvailability }
    getCreatorUID() { return this.#creatorUID }
    getId() { return this.#id }
    getCreatorName() {
        return this.#creatorName
    }

    //create data object    
    asDataObject() {
        return {
            id: this.#id,
            information: this.#information,
            description: this.#description,
            nonAvailability: this.#nonAvailability,
            creatorUID: this.#creatorUID,
            creatorName : this.#creatorName
        }
    }

    
     uploadPostImages(pictureFile, uid) {
        let storageRef = ref(getStorage(), COLLECTIONS.profile_picture(uid))
        return uploadBytes(storageRef, pictureFile)
    }


}