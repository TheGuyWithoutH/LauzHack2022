//The item componnent is a component that displays the item's image and the description, user lending it, and the price.
//It also contains a button to Rent the item.
// It takes as parameters the item's image, description, user lending it, the id, and the price.
// Contains as well a back button on the top left corner to go back to the previous screen.
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";



const styles = StyleSheet.create({
    container: {
        //paddingTop: 50,
        marginTop: 0,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: 300,
        //borderWidth : 1,
    },
}
);

export default function Item({navigation, image, description, user, id, price}) {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image}/>
            <Text>{description}</Text>
            <Text>{user}</Text>
            <Text>{price}.-</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Rent", {id: id})}>
                <Text>Rent</Text>
            </TouchableOpacity>
        </View>
    );
}