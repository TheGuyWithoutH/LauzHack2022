import React, {useContext, useEffect} from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Contact from '../components/Contact';
import Header from '../components/Header';
import ValidateRent from '../components/ValidateRent';
import { UserContext } from "../context";

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
    const [contacts, setContacts] = React.useState([]);
    const { user, _ } = useContext(UserContext);

    React.useEffect(() => {
        if(user.isLoggedIn()) {
            user.getChats().then((chats) => {
                return Promise.all(Object.entries(chats).map((chat) => {
                    return user.getUserInformation(chat[0]).then((userInfo) =>{
                         return({
                            id: userInfo.uid,
                            name: userInfo.firstName + " " + userInfo.lastName,
                            avatar: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
                            chatId: chat[1],
                        })
                    }
                )
            }))
            }).then((contacts) => setContacts(contacts)).catch((error) => console.log(error));
    }});



    if(!user.isLoggedIn()) {
        return (
            <View style={styles.messages}>
                <Header header={"Messages"} />
                <View style={styles.content}>
                    <Text style={styles.text}>You must be logged in to access this page.</Text>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.messages}>
                <Header header={"Messages"} />
                <View style={styles.content}>
                    <FlatList 
                        data={contacts} 
                        renderItem={({item}) => (<Contact navigation={navigation} id={item.id} photo={item.avatar} name={item.name} lastMessage={"Hello I was wondering if ..."} lastViewed={"2h"} chatId={item.chatId}/>)}
                        ItemSeparatorComponent={ItemDivider}
                        style={styles.contacts}
                    />
                </View>
            </View>
        );
    }
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
    },
    text: {
        fontSize: 13,
        textAlign: 'center',
        color: '#4BAD80',
        width: '100%',
        marginTop: 50,
    },
});

export default Messages;