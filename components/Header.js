import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import logoImage from '../assets/Images/Logologo.png';
import illustration from '../assets/Images/shake-hands.png';

const Header = ({logo, header}) => {
    if(logo) {
        return (
            <View style={styles.header}>
                <Image style={styles.logo} source={logoImage} />
                <Image style={styles.illustration} source={illustration} />
            </View>
        ); 
    } else {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{header}</Text>
                <Image style={styles.illustration} source={illustration} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    logo: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 60,
        height: 60,
        objectFit: 'cover',
    },
    headerText: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: 60,
        marginTop: 100,
        fontSize: 32,
        color: '#4BAD80',
        fontWeight: 'bold',
    },
    illustration: {
        zIndex: -1,
        width: 250,
        height: 250,
    }

});

export default Header;