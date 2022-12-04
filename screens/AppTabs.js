import React, { useContext } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Favorites from './Favorites';
import Messages from './Messages';
import Profile from './Profile';
import AddItem from './AddItem';

import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { UserContext } from '../context';

const AppTabs = ({navigation}) => {
    const Tab = createBottomTabNavigator();
    const { user, setUser } = useContext(UserContext);

    return (
        <Tab.Navigator tabBarOptions={{showLabel: false, inactiveTintColor: "#4BAD80",activeTintColor: "#4BAD80"}} screenOptions={{headerShown : false, tabBarStyle: { height: 78 },}}>
            <Tab.Screen default name="Home" 
                component={Home}
                options={
                    { tabBarIcon: ({color, focused}) => { if(focused) {
                        return (<Ionicons name="ios-home" size={24} color={color} />)
                     } else {
                        return (<Ionicons name="ios-home-outline" size={24} color={color} />)
                     }}}
                }
            />
            <Tab.Screen name="Favorites" 
                component={Favorites}
                options={
                    { tabBarIcon: ({color, focused}) => {
                         if(focused) {
                            return ( <AntDesign name="heart" size={24} color={color} /> )
                         } else {
                            return ( <AntDesign name="hearto" size={24} color={color} /> )
                         }
                    }}
                }
             />
            <Tab.Screen name="Add" 
                component={AddItem} 
                options={
                    { tabBarIcon: ({color}) => ( <Ionicons name="add-circle" size={85} style={{width: 85, height: 85, marginBottom: 50}} color={color} /> ) }
                }
            />
            <Tab.Screen name="Messages" 
                component={Messages} 
                options={
                    { tabBarIcon: ({color, focused}) => {
                        if(focused) {
                            return ( <Ionicons name="chatbubbles" size={24} color={color} /> ) 
                        } else {
                            return ( <Ionicons name="chatbubbles-outline" size={24} color={color} /> ) 
                        }
                    }}
                }
            />
            <Tab.Screen name="Account" 
                component={Profile} 
                options={
                    { tabBarIcon: ({color, focused}) => {
                        if(focused) {
                            return ( <Ionicons name="person" size={24} color={color} /> ) 
                        } else {
                            return ( <Ionicons name="person-outline" size={24} color={color} /> ) 
                        }
                    }}
                }
                
            />
        </Tab.Navigator>
        
    );
};

const styles = StyleSheet.create({
    
});

export default AppTabs;