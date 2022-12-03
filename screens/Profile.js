// The profile screen contains the user's profile information and allows them to edit it.
// It also contains buttons to the user's items, manage his account, report a user, legal mentions, and logout.

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


export function Profile({ navigation }) {

    return (
        <View >
            <Text >My account</Text>
            <Text >John Doe</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Items')}>
                <Text >My Objects</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate('Account')}>
                <Text >Manage Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Report')}>
                <Text >Report User</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate('Legal')}>
                <Text >Legal Mentions</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
                <Text >Logout</Text>
            </TouchableOpacity>
        </View>
    );

}
