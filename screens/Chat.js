import React from 'react';
import { useCallback } from 'react';
import { useLayoutEffect, useContext } from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import { UserContext } from "../context";

const Chat = ({navigation, chatId}) => {
    const [messages, setMessages] = React.useState([]);
    const { user } = useContext(UserContext);

    useLayoutEffect(() => {
        user.getMessageFromChat(chatId, setMessages);
    }, [])

    const onSend = useCallback((messages = []) => {
        user.sendMessage(chatId, setMessages, messages);
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user.getUID(),
                avatar: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }}
            messagesContainerStyle={{backgroundColor: "#F6FFFB"}}
        />
    );
};

export default Chat;