import { COLLECTIONS } from "../Constants"

export const postConverter = {
    toFirestore: (post) => {
        return {
            id: post.getId(),
            availability: post.getAvailability(),
            information: post.getInformation(),
            description: post.getDescription(),
            creatorUID: post.getCreatorUID(),
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Post(data.information,data.availability,data.id,data.description,data.creatorUID)
    }
}
export class Post {

    //create private variables
    #id
    #information
    #description
    #availabitity
    #creatorUID

    constructor(information, availability, description="", creatorUID, id=null) {
        this.#information = information
        this.#description = description
        this.#availabitity = availability
        this.#creatorUID = creatorUID

        this.#id = id ? id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    }

    //create getters
    getInformation() { return this.#information }
    getDescription() { return this.#description }
    getAvailability() { return this.#availabitity }
    getCreatorUID() { return this.#creatorUID }
    getId() { return this.#id }

    //create data object    
    asDataObject() {
        return {
            id: this.#id,
            information: this.#information,
            description: this.#description,
            availability: this.#availabitity,
            creatorUID: this.#creatorUID
        }
    }


}