import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const Contact = ({navigation, id, photo, name, lastMessage, lastViewed}) => {
    return (
        <TouchableOpacity 
            style={styles.contact}
            onPress={() => {
                navigation.navigate('Chat', {contact: {id: id, name: name, photo: photo}});
            }}
        >
            <Image source={{uri: photo}} style={styles.contactPhoto} />
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{name}</Text>
                <View style={styles.lastMessage}>
                    <Text style={styles.contactLastMessage}>{lastMessage}</Text>
                    <Text style={styles.contactLastViewed}>{lastViewed}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
        paddingHorizontal: "10%",
        height: 80,
    },
    contactPhoto: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 50,
    },
    contactInfo: {
        flex: 3,
        marginLeft: 20,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contactLastMessage: {
        fontSize: 14,
    },
    contactLastViewed: {
        fontSize: 12,
        fontWeight: 'light',
    }
});

export default Contact;