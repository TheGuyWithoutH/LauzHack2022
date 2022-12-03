import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';

const Messages = () => {
    return (
        <View style={styles.messages}>
            <Header header={"Messages"} />
            <View style={styles.content}>
                <FlatList></FlatList>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messages: {
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

export default Messages;