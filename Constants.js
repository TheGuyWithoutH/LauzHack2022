export const COLLECTIONS = {
    // AVAILABLE_VISITS: "posts/notVisited/coutries",
    AVAILABLE_OBJECTS: "posts/notRented/objects",
    RENTED_OBJECTS: "posts/rented/objects",
    REGULAR_USERS: "users/regular/users",
    ADMIN_USERS: "users/admin/users",

    PROFILE_PICTURES: "images/profile_pictures",
    profile_picture: (imgUrl) => `${COLLECTIONS.PROFILE_PICTURES}/${imgUrl}`
    // profile_picture_URL: (uid) => {
    //     const supportedTypes = ['jpg', 'png', 'jpeg']
    //     for (let supportedType in supportedTypes) {
    //         try {
    //             let img = `${COLLECTIONS.profile_picture(uid)}.${supportedTypes[supportedType]}`
    //             return img
    //         } catch (e) {
    //             continue
    //         }
    //     }
    // }

}
