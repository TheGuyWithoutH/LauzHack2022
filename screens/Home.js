import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 
import Header from '../components/Header';

const Home = () => {
    return (
        <View style={styles.home}>
            <Header logo={true} />
            <View style={styles.content}>
                <View style={styles.searchDiv}>
                    <TextInput style={styles.textSearch}>Search an object</TextInput>
                    <TouchableOpacity style={styles.buttonSearch}>
                        <Fontisto name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchFilters}>
                    <TouchableOpacity style={styles.filter}>
                        <Text>Essentials</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter}>
                        <Text>Available now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter}>
                        <Text>Filters</Text>
                    </TouchableOpacity>
                </View>
                <FlatList>

                </FlatList>
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
    },
    searchFilters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 30,    
        marginTop: 20,
    },
    filter: {
        marginEnd: 10,
        backgroundColor: '#EEEBEB',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        fontSize: 12,
        borderRadius: 5,
    }

  });

export default Home;