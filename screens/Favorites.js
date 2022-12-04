import { useIsFocused } from "@react-navigation/native";
import { where } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Header from '../components/Header';
import ItemCard from "../components/ItemCard";
import { UserContext } from "../context";




const Favorites = ({navigation}) => {
    const { user, setUser } = useContext(UserContext);
    const isFocused = useIsFocused();


    const [items,setItems] = useState([])
    useEffect(() => {
        console.log("Favorites");
        user.getFavorites().then((res) => {
            console.log("res",res)
            if (res.length === 0) {
                setItems([])
            } else {
            user.getPublicPosts(where("id","in",res)).then((posts) => {
                console.log("posts",posts)
                setItems(posts)
            
            })
        }
        }).catch((err) => {
            console.log("Error:",err)
        })   
    }, [isFocused]);


    return (
        <View style={styles.favorites}>
            <Header header={"Favorites"} />
            <View style={styles.content}>
                   <FlatList
            data={items}
            renderItem={({ item }) => {
                console.log("item",item.data().information)
                return(
                
                <ItemCard itemImage={item.data().information.image[0]} itemName={item.data().information.name} itemAvailability={item.data().availability} itemPrice={item.data().information.price} action={() => {
                    navigation.navigate("Item", {item: {
                      image : item.data().information.image[0],
                      name : item.data().information.name,
                      description : item.data().description,
                      nextAvailability : item.data().availability,
                      price : item.data().information.price,
                      id: item.data().id,
                      owner: item.data().creatorName,
                    }}) 
                }
                }/>
            )}}
            showsVerticalScrollIndicator={false}
        />
        </View>
        </View>

    );
};

const styles = StyleSheet.create({
    favorites: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#F6FFFB',
    },
    content: {
        marginTop: 170,
        width: '80%',
        height: '100%',
    },
});

export default Favorites;