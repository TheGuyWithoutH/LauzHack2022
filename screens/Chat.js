import React from 'react';
import { useCallback } from 'react';
import { useLayoutEffect, useContext } from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import { UserContext } from "../context";

import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const Chat = ({route, navigation}) => {
    const [messages, setMessages] = React.useState([]);
    const { user } = useContext(UserContext);
    const { chatId, contact } = route.params

    useLayoutEffect(() => {
        user.getMessageFromChat(chatId, setMessages);
    }, [])

    const onSend = useCallback((messages = []) => {
        user.sendMessage(chatId, setMessages, messages);
    }, [])

    const alert = () => {
        Alert.alert(
            "Good to Go!",
            "You can now contact the owner to finalize the rental details about the location.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    }

    return (
        <View style={styles.messages}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.arrowBackContainer}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign style={styles.arrowBack} name="arrowleft" size={32} />
                </TouchableOpacity>
                <Text style={styles.name}>{contact.name}</Text>
                <Image style={styles.profilePicture} source={{uri: contact.avatar}}/>
            </View>
            <View style={styles.confirm}>
                <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => navigation.goBack()}
                    >
                    <Text style={[styles.textButtons, {color: "#fff", backgroundColor:"#FF6E6C"}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => alert()}
                >
                    <Text style={[styles.textButtons, {color: "#4BAD80", fontWeight: "bold"}]}>Put in a Box</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => alert()}
                >
                    <Text style={[styles.textButtons, {color: "#4BAD80", fontWeight: "bold"}]}>Give it myself</Text>
                </TouchableOpacity>
            </View>
            
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user.getUID(),
                    avatar: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }}
                messagesContainerStyle={{backgroundColor: "#F6FFFB", width: "100%"}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    messages: {
        flex: 1,
        backgroundColor: "#F6FFFB",
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    header: {
        marginTop: 50,
        paddingHorizontal: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    arrowBack: {
        color: "#4BAD80",
      },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    confirm: {
        width: "100%",
        height: 100,
        backgroundColor: "#F6FFFB",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttons: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    textButtons: {
        fontSize: 16,
        fontWeight: "light",
        padding: 10,
        borderRadius: 10,
    }
});

export default Chat;