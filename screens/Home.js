import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 

import logo from '../assets/Images/Logologo.png';
import illustration from '../assets/Images/shake-hands.png';

const Home = () => {
    return (
        <View style={styles.home}>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Image source={illustration} />
            </View>
            <View style={styles.content}>
                <View style={styles.searchDiv}>
                    <TextInput style={styles.textSearch} source={logo}>Search an object</TextInput>
                    <TouchableOpacity style={styles.buttonSearch}>
                        <Fontisto name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#F6FFFB',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 60,
        height: 60,
        objectFit: 'cover',
        margin: 40,
    },
    content: {
        marginTop: 150,
        width: '80%',
    },
    searchDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 45
    },
    textSearch: {
        flex: 5,
        backgroundColor: '#E3F4EA',
        color: '#4BAD80',
        marginEnd: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    buttonSearch: {
        flex: 1,
        backgroundColor: '#FF6E6C',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

  });

export default Home;