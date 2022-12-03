import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Header from '../components/Header';

const Favorites = () => {
    return (
        <View style={styles.favorites}>
            <Header header={"Favorites"} />
            <View style={styles.content}>
                <FlatList></FlatList>
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