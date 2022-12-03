import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from '../components/Header';

const Favorites = () => {
    return (
        <View style={styles.home}>
            <Header header={"Favorites"} />
            <View style={styles.content}>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
});

export default Favorites;