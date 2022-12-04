import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Header from '../components/Header';
import { UserContext } from "../context";




const Favorites = () => {
    const { user, setUser } = useContext(UserContext);

    const [items,setItems] = useState([])
    useEffect(() => {
        user.getFavorites().then((res) => {
            console.log(res)
        })   
    }, []);


    return (
        <View style={styles.favorites}>
            <Header header={"Favorites"} />
            <View style={styles.content}>
                <FlatList></FlatList>
            </View>

            <FlatList
            data={items}
            renderItem={({ item }) => (
                
                <ItemCard itemImage={item.image} itemName={item.name} itemAvailability={item.nextAvailabitity} itemPrice={item.price} action={() => {
                    navigation.navigate("Item", {item: item}) 
                }
                }/>
            )}
        />
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