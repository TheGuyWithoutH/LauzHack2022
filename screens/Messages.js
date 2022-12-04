import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Contact from '../components/Contact';
import Header from '../components/Header';
import ValidateRent from '../components/ValidateRent';

const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "70%",
          marginHorizontal: "15%",
          marginVertical: 20,
          backgroundColor: "#4BAD8026",
        }}
      />
    );
  }

const Messages = ({navigation}) => {
    const contacts = [
        {
            id: 1,
            name: 'John Doe',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastMessage: 'Hello, how are you?',
            lastViewed: '2h',
        },
        {
            id: 2,
            name: 'Jane Doe',
            photo: 'https://randomuser.me/api/portraits/women/32.jpg',
            lastMessage: 'Hello, how are you?',
            lastViewed: '2h',
        }
    ]

    return (
        <View style={styles.messages}>
            <Header header={"Messages"} />
            <View style={styles.content}>
                <FlatList 
                    data={contacts} 
                    renderItem={({item}) => (<Contact navigation={navigation} id={item.id} photo={item.photo} name={item.name} lastMessage={item.lastMessage} lastViewed={item.lastViewed}/>)}
                    ItemSeparatorComponent={ItemDivider}
                    style={styles.contacts}
                />
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
        width: '100%',
        height: '100%',
    },
    contacts: {
        marginTop: 20,
        width: '100%',
    }
});

export default Messages;